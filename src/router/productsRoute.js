let express=require('express');
let productRouter=express.Router();
let mongo=require('mongodb');
let mongodb=mongo.MongoClient;
let url=process.env.mongoUrl;

//products Route
function routing(routes){
    productRouter.route('/')
        .get(async function(req,res){
            try {
                const client = await mongodb.connect(url);
                const dbObj = client.db('myfullstackapp');
                const data = await dbObj.collection('products').find().toArray();
                res.render('products',{title:'Product Page',data:data,routes:routes})
                client.close(); // Close the MongoDB connection
            } catch (err) {
                console.log(err);
                res.status(500).send('Error occurred');
            }         
    })

    productRouter.route('/category/:id')
    .get(async function(req,res){
        console.log(">>>",req.params.id)
        let id=Number(req.params.id);
        try {
            const client = await mongodb.connect(url);
            const dbObj = client.db('myfullstackapp');
            const data = await dbObj.collection('products').find({category_id:id}).toArray();
            res.render('products',{title:'Product Page',data:data,routes:routes})
            client.close(); // Close the MongoDB connection
        } catch (err) {
            console.log(err);
            res.status(500).send('Error occurred');
        }    
        
    })

    productRouter.route('/details/:id')
        .get(async function(req,res){
            let id=new mongo.ObjectId(req.params.id);
            try {
                const client = await mongodb.connect(url);
                const dbObj = client.db('myfullstackapp');
                const data = await dbObj.collection('products').find({_id:id}).toArray();
                res.render('productDetails',{title:data.product_name,data:data,routes:routes})
                client.close(); // Close the MongoDB connection
            } catch (err) {
                console.log(err);
                res.status(500).send('Error occurred');
            }    
    })
    return productRouter;
}

module.exports=routing;