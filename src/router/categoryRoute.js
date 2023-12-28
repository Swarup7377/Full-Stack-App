const express = require('express');
const categoryRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const url = process.env.mongoUrl;

// Category Route
function routing(routes) {
    categoryRouter.route('/')
        .get(async function (req, res) {
            try {
                const client = await mongodb.connect(url);
                const dbObj = client.db('myfullstackapp');
                const data = await dbObj.collection('category').find().toArray();
                res.render('category', { title: 'Category Page', data: data, routes: routes });
                client.close(); // Close the MongoDB connection
            } catch (err) {
                console.log(err);
                res.status(500).send('Error occurred');
            }
        });

    categoryRouter.route('/details')
        .get(function (req, res) {
            res.send('Category Details');
        });

    return categoryRouter;
}

module.exports = routing;
