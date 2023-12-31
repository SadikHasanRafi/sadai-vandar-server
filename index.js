// const express = require("express");
import express, { response } from "express"
// const cors = require("cors");
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb" 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://sadikhasan13255:zjVHSM7Ek8Mevqyi@cluster0.5ecdf2f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,},});



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
const countAmountData = async (collectionName, estimateCount = false, query) => {
  /*
    collectionName = eta collection name
    estimateCount = true means it will give estimate count of data means count of all data and false means it will give the amount of specific categories' of data
    query = filtered data Query for movies from Canada. Example:
            const query = { countries: "Canada" };
    */
  const filter = query;
  if (estimateCount) {
    let estimate = 0
    return estimate = await collectionName.estimatedDocumentCount();
  } else {
    let count = 0
    return  count = await collectionName.countDocuments(filter);
  }
};












//you can watch the change of the data base which is kinda high level but a needed feature
//check it from below link asd
//https://www.mongodb.com/docs/drivers/node/current/usage-examples/changeStream/

async function run() {
  try {
    await client.connect();








    //here collection and database will be added
    // const Users = client.db("users").collection("roleMailUID");
    const anonymousBuyerCollection = client.db("sadaiVandarDatabase").collection("anonymousBuyer")
    const productsCollection = client.db("sadaiVandarDatabase").collection("products")
    const registeredBuyersCollection = client.db("sadaiVandarDatabase").collection("registeredBuyers")
    const rolesAndReviewsCollection = client.db("sadaiVandarDatabase").collection("rolesAndReviews")
    const shopkeeperCollection = client.db("sadaiVandarDatabase").collection("shopkeeper")
    const transactionsCollection = client.db("sadaiVandarDatabase").collection("transactions")













    //**********************GET********************************** */
   
app.get('/shopkeeper/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    console.log(uid)

    // Search for shopkeeper by UID in the shopkeeperCollection
    const shopkeeper = await shopkeeperCollection.findOne({ uid:uid });
    console.log(shopkeeper)
    res.send(shopkeeper)
    
  } catch (error) {
    console.error('Error searching for shopkeeper:', error);
    // res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/user-type/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    console.log(uid)

    // Search for shopkeeper by UID in the shopkeeperCollection
    const userType = await rolesAndReviewsCollection.findOne({ uid:uid });
    // console.log(userType)
    res.send(userType)
    
  } catch (error) {
    console.error('Error searching for shopkeeper:', error);
    // res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/products/:uid', async (req, res) => {
  const { uid } = req.params;
  // console.log(uid)
  try {
    // Find all products associated with the provided uid
    const products = await getMultipleData(productsCollection);
    console.log(products.data)

    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
})


app.get('/products', async (req, res) => {
  try {
    // Retrieve all documents from the productsCollection
    const data = await productsCollection.find({}).toArray();

    res.send(data);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
});

app.get('/registered-users', async (req, res) => {
  try {
    // Retrieve all documents from the productsCollection
    const data = await registeredBuyersCollection.find({}).toArray();

    res.send(data);
  } catch (error) {
    console.error('Failed to fetch registered users:', error);
    res.status(500).json({ message: 'Failed to fetch registered users.' });
  }
});

app.get('/roles-and-reviews', async (req, res) => {
  try {
    // Retrieve all documents from the productsCollection
    const data = await rolesAndReviewsCollection.find({}).toArray();

    res.send(data);
  } catch (error) {
    console.error('Failed to fetch roles and reviews:', error);
    res.status(500).json({ message: 'Failed to fetch roles and reviews.' });
  }
});

app.get('/shopkeepers', async (req, res) => {
  try {
    // Retrieve all documents from the productsCollection
    const data = await shopkeeperCollection.find({}).toArray();

    res.send(data);
  } catch (error) {
    console.error('Failed to fetch shopkeeper:', error);
    res.status(500).json({ message: 'Failed to fetch shopkeeper.' });
  }
});

app.get('/transactions', async (req, res) => {
  try {
    // Retrieve all documents from the productsCollection
    const data = await transactionsCollection.find({}).toArray();
    res.send(data);
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions.' });
  }
});












































    //**********************POST********************************** */
    
    app.post("/roles-and-reviews", async (req, res) => {
      try {
        const data = req.body; // Assuming the data to be inserted is passed in the request body
    
        // Insert the data into the rolesAndReviewsCollection
        const result = await insertSingleData(rolesAndReviewsCollection, data);
    
        res.status(201).json({ success: true, message: "Data inserted successfully" });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ success: false, error: "Failed to insert data" });
      }
    });

    app.post("/registered-buyers", async (req, res) => {
      try {
        const data = req.body; // Assuming the data to be inserted is passed in the request body
    
        // Insert the data into the registeredBuyersCollection
        const result = await insertSingleData(registeredBuyersCollection, data);
    
        res.status(201).json({ success: true, message: "Data inserted successfully" });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ success: false, error: "Failed to insert data" });
      }
    });
    

// Assuming you have the necessary imports and setup for Express and MongoDB

// POST route for inserting data into shopkeeperCollection
app.post("/shopkeeper", async (req, res) => {
  try {
    // Retrieve the data from the request body
    // const { location, preciseLocation, name, phoneNumber } = req.body;

    // Create a new document to insert into the shopkeeperCollection

    // Insert the document into the shopkeeperCollection
    const result = await shopkeeperCollection.insertOne(req.body);

    // Return a success response with the inserted document's ID
    res.status(201).json({ message: "Data inserted successfully", id: result.insertedId });
  } catch (error) {
    // Return an error response if the insertion fails
    console.error("Failed to insert data:", error);
    res.status(500).json({ message: "Failed to insert data" });
  }
});



app.post("/products", async (req, res) => {
  try {

    const savedProduct = await insertSingleData(productsCollection,req.body);

    res.status(201).send(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/transactions',async (req, res) => {
  const transactionData = req.body;
  const insert = await insertSingleData(transactionsCollection,transactionData)

  console.log("🚀 ~ file: index.js:445 ~ app.post ~ insert.insertedId:", insert.insertedId)

  res.json({ message: insert });
});





















    //************************!Delete*********************************
    app.delete('/delete_products/:id', async (req, res) => {
      const productId = req.params.id;
    
      try {
        // Delete the document from the productsCollection
        const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
    
        if (result.deletedCount === 1) {
          return res.json({ message: `Product with ID ${productId} has been deleted.` });
        } else {
          return res.status(404).json({ message: 'Product not found.' });
        }
      } catch (error) {
        console.error('Failed to delete product:', error);
        res.status(500).json({ message: 'Failed to delete product.' });
      }
    });
























    //**********************UPDATE / PUT********************************** */

    app.put("/shopkeeper/:uid",async(req,res) => {
      const uid = req.params
      const response = await updateSinlgeData(shopkeeperCollection,{uid},req.body,true)
      res.send(res.body) 
    })
    

























  } finally {
    // await client.close();

  }
}
run().catch(console.dir);


    app.get("/", (req, res) => {
      res.send("Hello from  bd jobs from port -> ");
    });
    
    app.listen(port, () => {
      console.log(`example app kahini -_- on port `,port);
    });

