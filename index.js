import express,{ response } from "express"
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb" 


const app = express();
const port = process.env.PORT || 5000;  


app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://sadikhasan13255:zjVHSM7Ek8Mevqyi@cluster0.5ecdf2f.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,}});





//GET multiple data
const getMultipleData = async (collectionName) => {
  //collectionName = send the collection name
  const cursor = await collectionName.find({});
  const data = await cursor.toArray();
  return data;
};

//GET single data
const getSingleData = async (collection, query, options = {}) => {
  /*
    query = data(obj) you want to find
    options = optional parameter and by default it is empty
    example ->   const options = {
            _sort matched documents in descending order by rating
                sort: { "imdb.rating": -1 },
            _Include only the `title` and `imdb` fields in the returned document
                projection: { _id: 0, title: 1, imdb: 1 },
                      };
  */
  const data = await collection.findOne(query, options);
  return data 
};

//POST insert single data
const insertSingleData = async (collectionName, data) => {
  /*
    collectionName -> collection name of the database
    data -> the data wanted to store
    */
    let result = await collectionName.insertOne(data)
  return result;
};

//POST insert multiple data
const insertMultipleData = async (collectionName, data, options = {}) => {
  /* collectionName = name of the collection where to insert
       data = the data want to insert and this data should be inside an array
            example :  
              const data = [
                              { name: "cake", healthy: false },
                              { name: "lettuce", healthy: true },
                              { name: "donut", healthy: false }
                          ];
      __this option prevents additional documents from being inserted if one fails
      const options = { ordered: true };  
    */
  return result = await collectionName.insertMany(data, options);
};

//PUT update single data
const updateSinlgeData = async ( collectionName,  filter, dataTobeUpdated,option = true ) => {
  /*
      collectionName = name of the collection name
      filter = create a filter to update. Example:
              const filter = { title: "Random Harvest" };
      dataTobeUpdated = data you want to update
      options = this option is used if the data is absent then it will insert the data otherwise it will update it
                 const options = { upsert: true };
      */
  const options = { upsert: option };
  const updateDoc = { $set: dataTobeUpdated };
  let result = await collectionName.updateOne(filter, updateDoc, options);
  return result 
};

//PUT update multiple data
const updateMultipleData = async (collectionName, filter, dataTobeUpdated) => {
  /*
    collectionName = the collection name where the data will be updated
    filter = filter the data means where the datas will be updated. 
            example: create a filter to update all movies with a 'G' rating
                    const filter = { rated: "G" };
    
    dataTobeUpdated = data that will be update
    */
  const updateDoc = {
    $set: { dataTobeUpdated },
  };
  return result = await collectionName.updateMany(filter, updateDoc);
};

//POST replace single data
const replaceOneData = async (collectionName, filter, replacement) => {
  /*
    collectionName = collection where the data will be replaced 😪
    filter = the data need to be replaced. Here you can use regex. Example
              const filter = { title: "The Cat from Sector XYZ" }; (without regex)
              const filter = { title: { $regex: "The Cat from" } }; (with regex)
    replacement =  create a new document that will be used to replace the existing document. Example:
                      const replacement = {
                        title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
                      };
    */ const query = filter;
  return result = await collectionName.replaceOne(query, replacement);
};

//DELETE delete single data
const deleteSingleData = async (collectionName, query) => {
  /*
    collectionName = the collection where data will be deleted -_-
    query = the data will be delete. Example
            const query = { title: "Annie Hall" };
    */
  const deleteData = query._id;
  const x = { _id: new ObjectId(deleteData) };
  // console.log("________x : ",x)
  const result = await collectionName.deleteOne(x);
  if (result.deletedCount === 1) {
    // console.log("Successfully deleted one document.");
    return true;
  } else{
    // console.log("No documents matched the query. Deleted 0 documents.");
    return false;
  }
};

//DELETE delete multiple data
const deleteMultipleData = async (collectionName, filter) => {
  /*
    collectionName = eta colection tar name -__-
    filter = the data need to be replaced. Here you can use regex. Example
              const filter = { title: "The Cat from Sector XYZ" }; (without regex)
              const filter = { title: { $regex: "The Cat from" } }; (with regex)
      */
  const query = filter;
  const result = await collectionName.deleteMany(query);
  if (result.deletedCount === 0) {
    // console.log("Nothing deleted.");
    return false;
  } else {
    // console.log("Successfully deleted");
    return false;
  }
};

//GET estimated data count and count the specific category data











async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // const CompanyInfo = client.db("users").collection("companyInfo")
    // const EmployeeInfo = client.db("users").collection("employeeInfo")
    // const UserRole = client.db("users").collection("role")
    // const Jobs = client.db("jobs").collection("jobsInfo")


    



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





//----------------get apis

//----------------post apis

// app.post("/set-role",async(req,res)=>{

// })

//----------------update or patch apis

//-----------------delete apis








app.get("/", (req, res) => {
    res.send("Hello from  bd jobs from port -> ");
  });
  
  app.listen(port, () => {
    console.log(`please do it quick please on port `,port);
  });
