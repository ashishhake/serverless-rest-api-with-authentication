## Prerequisites

To run and deploy this project locally, you will need:
* **An AWS Account** with an IAM User configured for programmatic access.
* **[AWS CLI](https://aws.amazon.com/cli/)** installed and configured (`aws configure`).
* **[Node.js](https://nodejs.org/)** installed (includes npm).
* **[Serverless Framework](https://www.serverless.com/)** installed globally (`npm install -g serverless`).

## Architecture: Database & Compute
* **Database:** Amazon DynamoDB (Serverless NoSQL). Configured with a single Partition Key (`id`) using On-Demand billing (`PAY_PER_REQUEST`).
* **Compute:** AWS Lambda running Node.js 20.x.
* **SDK:** AWS SDK v3 for JavaScript (`@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`) for modular, lightweight execution.
* **IAM Security:** Lambda functions are scoped with Least Privilege IAM roles, granting specific CRUD access only to the target DynamoDB table.