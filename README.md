# Serverless Task Manager API 🚀

A production-ready, fully serverless REST API built on AWS. This project demonstrates modern cloud-native architecture, Infrastructure as Code (IaC), and secure authentication flows.

## Core Technologies
* **Compute:** AWS Lambda (Node.js 20.x, AWS SDK v3)
* **Database:** Amazon DynamoDB (On-Demand, NoSQL)
* **Routing:** Amazon API Gateway (HTTP API)
* **Security:** Amazon Cognito (User Pools, JWT Authorizers), AWS IAM (Least Privilege Roles)
* **Infrastructure as Code:** Serverless Framework
* **Observability:** Amazon CloudWatch

## Architecture Highlights
* **Zero-Trust Compute:** Lambda functions are securely scoped with granular IAM roles to only access specific DynamoDB resources.
* **Secured Endpoints:** API routes are protected by a Cognito JWT Authorizer, rejecting unauthorized requests at the edge before invoking compute resources.
* **Modular Code:** Utilizes the AWS SDK v3 for highly optimized, lightweight Lambda deployment packages to minimize cold starts.

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

## API Endpoints & Routing
* **Framework:** Serverless Framework
* **Routing:** Amazon API Gateway (HTTP API)
* **Testing:** Validated local execution and database integration using `serverless dev`.

**Current Routes:**
* `POST /tasks` - Creates a new task item in DynamoDB with an auto-generated UUID.

## Security & Authentication
* **Identity Provider:** Amazon Cognito (User Pools).
* **API Protection:** API Gateway JWT Authorizer configured to validate Cognito-issued JSON Web Tokens.
* **Flow:** Unauthenticated requests are immediately rejected at the API Gateway layer (`401 Unauthorized`), protecting downstream Lambda compute and DynamoDB read/write capacity.

## Observability & Debugging
* **Logging:** Integrated with Amazon CloudWatch for centralized log management.
* **Operations:** Utilized Serverless Framework CLI (`serverless logs`) for remote debugging and stack trace analysis to resolve runtime execution errors.