var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("locationDatabase");
  console.log("Database Connnected Successfully");

  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });



dbo.collection("locationData").insertMany( [
    {
       name: "Sector 75 Noida",
       location: { type: "Point", coordinates: [ 28.5760229, 77.3775701 ] },
       category: "Parks"
    },
    {
       name: "Mobcoder",
       location: { type: "Point", coordinates: [ 28.6155995, 77.3723252 ] },
       category: "Parks"
    },
    {
       name: "Sector 62 Noida",
       location: { type: "Point", coordinates: [ 28.6201523, 77.3515899] },
       category: "Stadiums"
    },
    {
        name: "Sector 61 Noida",
        location: { type: "Point", coordinates: [ 28.5960909, 77.3631066 ] },
        category: "Stadiums"
     },
     {
        name: "Sector 71 Noida",
        location: { type: "Point", coordinates: [ 28.5948639, 77.3717691 ] },
        category: "Stadiums"
     },
     {
        name: "Sector 18 Noida",
        location: { type: "Point", coordinates: [ 28.5697095, 77.3205204 ] },
        category: "Stadiums"
     },
     {
        name: "Sector 1 Noida",
        location: { type: "Point", coordinates: [ 28.5901045, 77.3099944 ] },
        category: "Stadiums"
     },
     {
        name: "Gaur City Mall Noida",
        location: { type: "Point", coordinates: [ 28.6060242, 77.4274728 ] },
        category: "Stadiums"
     },
     {
        name: "Sector 126 Noida",
        location: { type: "Point", coordinates: [ 28.539503, 77.3354151 ] },
        category: "Stadiums"
     },
     {
        name: "Sector 59 Noida",
        location: { type: "Point", coordinates: [ 28.6082054, 77.3656899 ] },
        category: "Stadiums"
     }
 ] )
dbo.collection("locationDatabse").createIndex( { location: "2dsphere" } );


dbo.collection("locationData").find({ location:
    { $geoWithin:
       { $centerSphere: [ [ 28.6082054, 77.3656899], 5 / 3963.2 ] } } });


       dbo.collection('locationData').aggregate([
           {
               $match: {category: "Stadiums"}
           },
           {
               $group: {_id: "$name",}
           }
       ])
});
console.log("Data inserted successfully");