var express = require('express');
var router = express.Router();

/*获取配置. */
router.get('/getsetup', function(req, res) {
    var db = req.db;
    db.collection('spa').find().toArray(function(err,items){
    		res.json(items);
    });
});

/*保存配置*/
router.post('/addsetup',function(req,res){

	var db = req.db;

	db.collection('spa').insert(req.body,function(err,result){

          res.send(
          		(err === null) ? {msg : ''} : {msg : err}
          	);

	});

});

/*删除配置*/
router.delete('/delsetup/:id',function(req,res){
      
      var db = req.db;

      var userToDelete = req.params.id;

      db.collection('spa').removeById(userToDelete,function(err,result){
      		res.send((result === 1) ? {msg:''} : {msg:'error:'+err});
      })

});

module.exports = router;
