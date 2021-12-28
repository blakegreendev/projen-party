import { CorsHttpMethod, HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { BillingMode, AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class WebAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, 'Table', {
      partitionKey: { name: 'pk', type: AttributeType.STRING},
      sortKey: { name: 'sk', type: AttributeType.STRING},
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: 'NotesTable'
    })

    const readFunction = new NodejsFunction(this, "ReadNotesFn", {
      architecture: Architecture.ARM_64,
      entry: `${__dirname}/fns/readFunction.ts`,
      logRetention: RetentionDays.ONE_WEEK
    })

    const writeFunction = new NodejsFunction(this, "WriteNotesFn", {
      architecture: Architecture.ARM_64,
      entry: `${__dirname}/fns/writeFunction.ts`,
      logRetention: RetentionDays.ONE_WEEK
    })

    table.grantReadData(readFunction);
    table.grantWriteData(writeFunction);

    const api = new HttpApi(this, 'NotesApi', {
      corsPreflight: {
        allowHeaders: ['Content-Type'],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST],
        allowOrigins: ['*']
      }
    })

    const readIntegration = new HttpLambdaIntegration('ReadIntegration', readFunction)
    const writeIntegration = new HttpLambdaIntegration('WriteIntegration', writeFunction)

    api.addRoutes({
      integration: readIntegration,
      methods: [HttpMethod.GET],
      path: '/notes'
    })

    api.addRoutes({
      integration: writeIntegration,
      methods: [HttpMethod.POST],
      path: '/notes'
    })

    new CfnOutput(this, 'HttpApiUrl', {value: api.apiEndpoint})
  }
}