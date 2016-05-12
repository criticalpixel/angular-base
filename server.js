/* Server.js */

// set up ======================

var express 	= require('express'),				//express
	app  		= express(),						//define express
	mongoose	= require('mongoose'),				//mongoose for mongodb
	morgan		= require('morgan'),				//log req for console (express4)
	bodyParser	= require('body-parser'),			//pull info from HTML POST (express4)
	methodOverride = require('method-override');	//simulate DELETE & PUT (express4)

// configuration ===============

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));
// app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
// app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));
app.use(methodOverride());


// define model ================

var Todo = mongoose.model('Todo', {
	text : String
});


// routes ======================

//get all todos
app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos) {
		if(err){
			res.send(err);
		}
		else {
			res.json(todos);
		}
	});
});

//create a todoa nd send back all todos after creation
app.post('api/todos', function(req,res){
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo){
		if(err){
			res.send(err);
		}
		else{
			res.json(todos);
		}
	});
});


// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err){
                res.send(err);
            }
            else{
            	res.json(todos);
            }
        });
    });
});








// application =================

app.get('*', function(req, res){
	res.sendFile('/public/index.html', function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
	    else {
	      console.log('Sent:', fileName);
	    }
  	});
});

//Error Handleq
app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500).send("Upps, we broke it :(");
});

//Listening
app.listen(3000, function(){
	console.log('Server app listening on port 3000!');
});