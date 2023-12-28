let express=require('express');
let app=express();
const fs=require('fs');
let dotenv=require('dotenv');
dotenv.config();
let port=process.env.PORT || 9700;
let morgan=require('morgan');

let routes=[
    {path:'/',key:'Home'},
    {path:'/category',key:'Category'},
    {path:'/products',key:'Products'}
]

let categoryRouter=require('./src/router/categoryRoute')(routes);
let productRouter=require('./src/router/productsRoute')(routes);

app.use(morgan('short',{stream: fs.createWriteStream('./app.logs')}));
//static file path
app.use(express.static(__dirname+'/public'));
//html file path
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');
//default rout
app.get('/', function(req, res){
    res.render('index',{title:'Welcome To Shopping',routes:routes});
})

app.use('/category',categoryRouter);
app.use('/products',productRouter);

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on ${port}`);
});