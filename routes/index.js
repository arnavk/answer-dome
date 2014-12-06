var express = require('express');
var router = express.Router();
var http = require('http');
var options = {
  host: 'www.google.com',
  path: '/index.html'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/update', function(req, res){
});

router.get('/question', function (req, res) {
	var v = "why does everyone";
  res.json(v);
});

var list = [1, 2, 3, 4];

module.exports = router;
