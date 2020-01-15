const express           = require('express');
const path              = require('path');
const bodyParser        = require('body-parser');
const methOverride      = require('method-override');
const _                 = require('lodash');
const redis             = require('redis');
const client            = redis.createClient();
const port              = 3000; 


client.on('connect', function(){
    console.log('Connected to Redis');
});
client.on("error", function (err) {
    console.log("Error " + err);
});

const app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methOverride('method'));


//find by Id
app.get('/api/v1/gear/find/:id', function(req,res,next){
    let id = req.params.id;
    console.log(id);

    client.hgetall(id,function(err,items){
        if(err){
            res.status(201).send('no item found')
        }
        else{
            res.json(items)
        }
    })
})


app.post('/api/v1/gear/',function(req, res, next){
    let id              = req.body.id; 
    let type            = req.body.type;
    let item_name       = req.body.item_name
    let value           = req.body.value; 

    client.hmset(id,[
        'type',type,
        'item_name', item_name,
        'value', value,
    ],function(err,reply){
        if(err){
            console.log(err)
        }
        else{
            res.json({'msg': 'accepted'}).send(200)
        }
    });
    client.quit();
})

app.delete('/api/v1/gear/remove/:id',function(req, res, next){
   client.del(req.params.id);
   res.status(200).send('Deleted Item from locker');
})

app.get('/api/v1/gear/hello',function(req, res, next){
    res.json({"msg":"my gearlocker api is working"});
})

app.get('/api/v1/gear/all',function(req, res, next){
    client.hgetall('items',function(err,items){
        if(err){
            console.log(err)
        }
        else{
         console.log(items)
         res.json(items);
        }
    });
    client.quit();
})

app.listen(port,function(){
    console.log('listing on port: '+ port);
})

