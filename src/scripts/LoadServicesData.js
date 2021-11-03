var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "ap-southeast-1"
});

console.log("Writing entries to Services table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var servicesData = 
  JSON.parse(fs.readFileSync('../components/data/services_checklist.json', 'utf8'));

servicesData.forEach(function(services) {
  var params = {
    TableName: "lil-landon-services",
    Item: {
      "item": services.item
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for services",
                    services.item, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", services.item, "to table.")
  })
});