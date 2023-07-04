import express,{ response } from "express"
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb" 
import {
  getMultipleData,
  getSingleData,
  insertSingleData,
  insertMultipleData,
  updateSingleData,
  updateMultipleData,
  replaceOneData,
  deleteSingleData,
  deleteMultipleData,
  countAmountData,
} from './dbFunctions.js';

const app = express();
const port = process.env.PORT || 5000;  


app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://sadikhasan13255:zjVHSM7Ek8Mevqyi@cluster0.5ecdf2f.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,}});




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

app.post("/set-role",async(req,res)=>{

})

//----------------update or patch apis

//-----------------delete apis








app.get("/", (req, res) => {
    res.send("Hello from  bd jobs from port -> ");
  });
  
  app.listen(port, () => {
    console.log(`please do it quick please on port `,port);
  });
