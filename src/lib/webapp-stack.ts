import { Stack, StackProps, aws_ec2 as ec2 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WebAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new ec2.Vpc(this, 'Vpc', {
            maxAzs: 2,
            natGateways: 1
        })
    }
}