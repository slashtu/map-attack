var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // return res.sendFile( __base + 'public/index.html' );
  return res.sendFile( __base + 'asssets/index.html' );
});

// router.get('/test', function(req, res, next) {
//   // return res.sendFile( __base + 'public/index.html' );
//   return res.sendFile( __base + 'asssets/index.html' );
// });

// router.get('/gallery', function(req, res, next) {
//   return res.sendFile( __base + 'public/an/index5.html' );
// });

module.exports = router;
