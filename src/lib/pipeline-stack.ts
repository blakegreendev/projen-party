import { Stack, StackProps, Stage, StageProps, pipelines } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebAppStack } from './webapp-stack';
import { DataStack } from './data-stack';

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

export class WebAppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    new WebAppStack(this, 'WebAppStack');
  }
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection('blakegreendev/projen-party', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:987092829714:connection/610326a5-0252-4e15-9b7e-af31f5b36201',
        }),
        commands: [
          'yarn',
          'yarn build',
          'yarn synth',
        ],
      }),
    });

    pipeline.addStage(new WebAppStage(this, 'WebAppStage', {
      env: devEnv,
    }));
  }
}