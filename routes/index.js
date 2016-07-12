var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/invader', function(req, res, next) {
  // return res.sendFile( __base + 'public/index.html' );
  return res.sendFile( __base + 'asssets/index.html' );
});

router.get('/flight', function(req, res, next) {
  // return res.sendFile( __base + 'public/index.html' );
  return res.sendFile( __base + 'asssets/flight/index.html' );
});

router.get('/attack', function(req, res, next) {
  // return res.sendFile( __base + 'public/index.html' );
  return res.sendFile( __base + 'asssets/attack/index.html' );
});

// router.get('/test', function(req, res, next) {
//   // return res.sendFile( __base + 'public/index.html' );
//   return res.sendFile( __base + 'asssets/index.html' );
// });

// router.get('/gallery', function(req, res, next) {
//   return res.sendFile( __base + 'public/an/index5.html' );
// });

module.exports = router;
