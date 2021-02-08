var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:no', function(req, res, next) {
  res.send(`respond with a resource ${req.params.no}`);
});

module.exports = router;
