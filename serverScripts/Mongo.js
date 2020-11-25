const { MongoClient } = require("mongodb");

class Mongo {
    constructor(){
        // Connection URI
        uri = "mongodb+srv://sample-hostname:27017/?poolSize=20&w=majority";
        client = new MongoClient(this.uri);
    }

    async StartDB(){
        try {
            // Connect the client to the server
            await this.client.connect()
            // Establish and verify connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Connected successfully to server");
          } finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
          }
    }
}
