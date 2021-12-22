import '@aws-cdk/assert/jest';
import { App } from 'aws-cdk-lib';
import { PipelineStack } from '../src/lib/pipeline-stack';

test('Snapshot', () => {
  const app = new App();
  const stack = new PipelineStack(app, 'test');

  //expect(stack).not.toHaveResource('AWS::S3::Bucket');
  expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});