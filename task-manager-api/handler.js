const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.createTask = async (event) => {
  const { title, description } = JSON.parse(event.body);
  const id = uuidv4();

  const command = new PutCommand({
    TableName: "TasksTable",
    Item: {
      id,
      title,
      description,
      createdAt: new Date().toISOString(),
      status: "OPEN",
    },
  });

  try {
    await docClient.send(command);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Task created successfully!",
        task: command.input.Item,
      }),
    };
  } catch (error) {
    console.error("Error creating task:", error);
  return {
      statusCode: 500,
    body: JSON.stringify({
        message: "Error creating task",
        error: error.message,
    }),
  };
  }
};

