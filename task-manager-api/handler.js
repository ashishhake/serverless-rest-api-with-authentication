const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("node:crypto"); // Brilliant optimization here!

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

module.exports.createTask = async (event) => {
  try {
    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);
    const id = randomUUID(); 

    const command = new PutCommand({
      TableName: "TasksTable",
      Item: {
        id: id,
        title: requestBody.title,
        createdAt: new Date().toISOString(),
        completion: requestBody.completion
      },
    });

    await docClient.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Task created", taskId: id }),
    };
  } 
  catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create task", error: error.message }),
    };
  }
};