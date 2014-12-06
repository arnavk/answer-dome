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
	// not implemented yet.
});

module.exports = router;
