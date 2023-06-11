const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
=======

>>>>>>> 02beb6579fe4f5060434839a31a9ec11ce6ead95
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}

=======
>>>>>>> 02beb6579fe4f5060434839a31a9ec11ce6ead95
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aobh34k.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
<<<<<<< HEAD
    const userCollection = client.db("sk-sports").collection("users");
    const classesCollection = client.db("sk-sports").collection("classes");
    const cartCollection = client.db("sk-sports").collection("carts");
//jwt token 
app.post('/jwt', (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

  res.send({ token })
})


//user related apis
app.get("/users", async (req, res) => {
  const result = await userCollection.find({}).toArray()
  res.send(result);
});

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const query = {email: user.email}
    const preUser = await userCollection.findOne(query);
    if(preUser){
      return res.send({m: "exist"})
    }
    const result = await userCollection.insertOne(user);
    res.send({ insertedId: result.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating user');
  }
});

app.patch('/users/admin/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: 'admin'
    },
  };

  const result = await userCollection.updateOne(filter, updateDoc);
  res.send(result);

})

    //  { GET ALL CLASSES} 
    app.get("/classes", async (req, res) => {
      const result = await classesCollection.find({}).toArray()
      res.send(result);
    });
    //  { CART SYSTEM UPDATE)
    
    app.get("/carts",verifyJWT, async (req, res) => {
      const email = req.query.email;
      if(!email) {
       return([]);
      }
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ error: true, message: 'forbidden access' })
      }
      const query = {userEmail: email}
      
        const result = await cartCollection.find(query).toArray();
        res.send(result);
      
    });
    app.post("/carts", async (req, res) => {
      const item = req.body;

      const result = await cartCollection.insertOne(item);
      res.send(result);
    });
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(query);
      res.send(result);

    });
=======

    const db = client.db("sk-sports");
    const courseCollection = db.collection("course")
    app.get('/course', async (req, res) => {
        const result = await courseCollection.find().toArray;
        res.send(result);
    }
    )

>>>>>>> 02beb6579fe4f5060434839a31a9ec11ce6ead95
    //creating connetction with beckend


    // Send a ping to confirm a successful connection
<<<<<<< HEAD
    await client.db("admin").command({ ping: 1 });            
=======
    await client.db("admin").command({ ping: 1 });
>>>>>>> 02beb6579fe4f5060434839a31a9ec11ce6ead95
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});