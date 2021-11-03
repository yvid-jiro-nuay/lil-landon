var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "ap-southeast-1"
});

console.log("Writing entries to Arrival table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var arrivalData = 
  JSON.parse(fs.readFileSync('../components/data/arrival_checklist.json', 'utf8'));

  arrivalData.forEach(function(arrivalInfo) {
  var className = arrivalInfo.className;

  var params = {
    TableName: "lil-landon-arrival",
    Item: {
      "item": arrivalInfo.item,
      "detail": arrivalInfo.detail,
      "className": className
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery table.",
                    arrivalInfo.item, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", arrivalInfo.item, "to table.")
  });
});