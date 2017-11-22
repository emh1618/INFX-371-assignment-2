var express=require('express');
var app=express();
var handlebars=require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 8000);

var users = [{name:'Belle',email:'beastcastle@disney.com'}, {name:'Yin Sid',email:'mysterioustower@disney.com'}
];

app.get('/', function(req, res) {
    res.render('home', {layout:false});
});

app.post('/', function(req, res){
    var object = {name: req.body.username, email: req.body.userEmail};
    users.push(object);
    res.render('userlist', {users, layout:false});
});

app.get('/userlist', function(req, res) {
     res.render('userlist', {users, layout:false});
});

app.get('/user', function(req, res) {
   res.render('user', {name: req.query.name, email: req.query.email, layout:false});
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.listen(app.get('port'), function(){
    console.log('express started');
});
