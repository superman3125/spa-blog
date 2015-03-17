var express = require('express');
var router = express.Router();

/* 获取主页数据. */
router.get('/gohome', function(req, res) {
    var db = req.db;
    db.collection('panels').find().toArray(function(err,panels){
    		res.json(panels);
    });
});

module.exports = router;
