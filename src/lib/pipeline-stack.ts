import { Stack, StackProps, pipelines } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new pipelines.CodePipeline(this, 'Pipeline', {
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.connection('blakegreendev/projen-party', 'main', {
                    connectionArn: 'arn:aws:codestar-connections:us-east-1:987092829714:connection/610326a5-0252-4e15-9b7e-af31f5b36201'
                }),
            commands: [
                'yarn build',
                'yarn synth'
            ]
            })
        })
    }
}