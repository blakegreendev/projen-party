import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { BillingMode, AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class WebAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Table(this, 'Table', {
      partitionKey: { name: 'pk', type: AttributeType.STRING},
      sortKey: { name: 'sk', type: AttributeType.STRING},
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: 'NotesTable'
    })


  }
}