# Serverless Task Manager API

A production-ready REST API built entirely on AWS serverless infrastructure — no servers to manage, secure by default, and designed to scale automatically. Built to demonstrate real-world cloud architecture, security patterns, and Infrastructure as Code practices.

---

## What It Does

A fully authenticated task management API where users can create and manage tasks. Every request is validated against a JWT token before any compute or database resources are touched — unauthorized requests are rejected at the edge.

**Live Endpoint:** `POST /tasks` — Creates a task, persists it to DynamoDB, returns a UUID-keyed confirmation.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Compute | AWS Lambda (Node.js 20.x) | Serverless, auto-scaling, pay-per-use |
| Database | Amazon DynamoDB (On-Demand) | NoSQL, millisecond latency, zero capacity planning |
| Routing | Amazon API Gateway (HTTP API) | Managed routing with built-in JWT authorization |
| Auth | Amazon Cognito + JWT Authorizer | Industry-standard auth flow, zero custom auth code |
| IaC | Serverless Framework | Full infrastructure defined and deployed as code |
| SDK | AWS SDK v3 (modular) | Tree-shakeable, smaller bundles, faster cold starts |
| Observability | Amazon CloudWatch | Centralized logs, remote debugging via `serverless logs` |

---

## Architecture

```
Client Request
     │
     ▼
API Gateway  ──► JWT Authorizer (Cognito) ──► 401 Unauthorized (if invalid)
     │
     ▼ (valid token only)
AWS Lambda (createTask)
     │
     ▼
Amazon DynamoDB (TasksTable)
```

**Key design decisions:**

- **Zero-trust compute** — Lambda functions are scoped with least-privilege IAM roles. Each function can only access the exact DynamoDB table it needs, and only the specific operations it requires (PutItem, GetItem, etc.).
- **Edge authentication** — The Cognito JWT Authorizer rejects unauthenticated requests *before* invoking Lambda, protecting both compute costs and database capacity.
- **Modular SDK** — Uses AWS SDK v3's modular imports (`@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`) instead of the monolithic v2, keeping the deployment package lean and reducing cold start times.
- **Native UUID generation** — Uses Node.js's built-in `crypto.randomUUID()` instead of a third-party package, eliminating an unnecessary dependency.

---

## Infrastructure as Code

The entire AWS infrastructure — Lambda functions, DynamoDB table, API Gateway routes, Cognito User Pool, IAM roles, and JWT Authorizer — is defined in a single `serverless.yml` file. Zero manual console configuration required.

**Deployed resources (all provisioned automatically on `serverless deploy`):**
- DynamoDB table with on-demand billing
- Cognito User Pool + App Client with password/refresh token auth flows
- API Gateway HTTP API with Cognito JWT Authorizer
- Lambda execution role with scoped DynamoDB permissions
- CloudWatch log groups

---

## Security Model

Authentication flow:
1. User authenticates against Cognito User Pool with username/password
2. Cognito issues a signed JWT
3. Client includes JWT in the `Authorization` header of each request
4. API Gateway validates the token signature, issuer, and audience *before* invoking Lambda
5. Invalid or missing tokens receive a `401 Unauthorized` — no Lambda invocation, no DB hit

IAM scoping (from `serverless.yml`):
```yaml
- Effect: Allow
  Action:
    - dynamodb:PutItem
    - dynamodb:GetItem
    - dynamodb:Scan
    - dynamodb:UpdateItem
    - dynamodb:DeleteItem
  Resource:
    - Fn::GetAtt: [tasksTable, Arn]  # Only this specific table
```

---

## Getting Started

**Prerequisites:**
- AWS account with IAM user configured for programmatic access
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured (`aws configure`)
- [Node.js](https://nodejs.org/) (v20+)
- [Serverless Framework](https://www.serverless.com/) (`npm install -g serverless`)

**Deploy:**
```bash
git clone <repo-url>
cd task-manager-api
npm install
serverless deploy
```

**Create a task** (after authenticating with Cognito to get a JWT):
```bash
curl -X POST https://<api-id>.execute-api.ap-south-1.amazonaws.com/tasks \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task", "completion": false}'
```

**View logs:**
```bash
serverless logs -f createTask
```

---

## Project Structure

```
.
├── task-manager-api/
│   ├── handler.js        # Lambda function logic
│   ├── serverless.yml    # Full infrastructure definition (IaC)
│   └── package.json
└── README.md
```

---

## Skills Demonstrated

- Serverless architecture design on AWS
- Infrastructure as Code with Serverless Framework and CloudFormation
- Secure API design with JWT authentication at the edge
- Least-privilege IAM policy authoring
- AWS SDK v3 patterns and Lambda optimization
- NoSQL data modeling with DynamoDB
- Remote debugging and observability with CloudWatch