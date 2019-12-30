const MongoClient = require('mongodb').MongoClient;



function connect(){
    return new Promise((resolve, reject) => {
        const url = 'mongodb://localhost:27017';
        MongoClient.connect(url, (err, client) => {
            const db = client.db('myps');
            const coll = db.collection('questions');
            resolve(coll, client);
            console.log(coll);
            reject();
        })

    })
}

function getAll() {
    return connect().then(({coll, client}) => {
        return new Promise((resolve, reject) => {
            coll.find({}).toArray((error, docs) =>{
                if(error){
                    reject(error);
                    // console.log(docs);
                } else{
                    resolve(docs);
                    console.log(docs);

                }
                client.close();
            })
        })})
}

module.exports ={
    getAll
}