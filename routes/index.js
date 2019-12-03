var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

/* GET cities */
router.get('/getcity', function(req, res, next) {
    console.log("In getcity route");
    
    var fs = require('fs');
    fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
        if(err) throw err;
      
        var cities = data.toString().split("\n");
        
        var myRe = new RegExp("^" + req.query.q);
      
        var jsonresult = [];
        for(var i = 0; i < cities.length; i++) {
          var result = cities[i].search(myRe); 
          if(result != -1) {
            jsonresult.push({city:cities[i]});
          } 
        }   
        res.status(200).json(jsonresult);
    });
  });
  
/* GET definition from OwlBot */
router.get('/api/v1/dictionary/owl', function(req, res, next) {
  console.log("In OwlBot route");
});

module.exports = router;
