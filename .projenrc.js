const { awscdk } = require("projen");
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.0.0",
  defaultReleaseBranch: "main",
  name: "projen-party",

  deps: [
    "@aws-sdk/client-dynamodb",
    "dynamodb-onetable",
    "@aws-cdk/aws-apigatewayv2-alpha",
    "@aws-cdk/aws-apigatewayv2-integrations-alpha",
    "react",
    "react-dom",
  ],

  devDeps: [
    "@types/aws-lambda",
    "esbuild",
    "@types/react-dom",
    "@vitejs/plugin-react-refresh",
    "vite",
  ],
  tsconfig: {
    compilerOptions: {
      jsx: "react",
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      lib: ["DOM", "es2018"],
    },
  },
});
project.synth();
