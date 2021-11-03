var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-1"
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "lil-landon-arrival",
  KeySchema: [
    // Partition Key
    { AttributeName: "item", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "detail", KeyType: "RANGE"}  
  ],
  AttributeDefinitions: [
    { AttributeName: "item", AttributeType: "S" },
    { AttributeName: "detail", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "item", KeyType: "HASH" },
        { AttributeName: "detail", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))
});