const { awscdk } = require("projen");
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.0.0",
  defaultReleaseBranch: "main",
  name: "projen-party",

  // cdkDependencies: undefined,  /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  deps: [
    "@aws-sdk/client-dynamodb",
    "dynamodb-onetable",
    "@aws-cdk/aws-apigatewayv2-alpha",
    "@aws-cdk/aws-apigatewayv2-integrations-alpha",
    "react",
    "react-dom",
  ],
  // description: undefined,      /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    "@types/aws-lambda",
    "esbuild",
    "@types/react-dom",
    "@vitejs/plugin-react-refresh",
    "vite",
  ] /* Build dependencies for this module. */,
  // packageName: undefined,      /* The "name" in package.json. */
  // release: undefined,          /* Add release management to this project. */
});
project.synth();
