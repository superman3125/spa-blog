var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    db.collection('spa').find().toArray(function(err,items){
    		res.json(items);
    });
});

/*保存用户信息*/
router.post('/adduser',function(req,res){

	var db = req.db;

	db.collection('spa').insert(req.body,function(err,result){

          res.send(
          		(err === null) ? {msg : ''} : {msg : err}
          	);

	});

});

/*删除用户*/
router.delete('/deluser/:id',function(req,res){
      
      var db = req.db;

      var userToDelete = req.params.id;

      db.collection('spa').removeById(userToDelete,function(err,result){
      		res.send((result === 1) ? {msg:''} : {msg:'error:'+err});
      })

});

module.exports = router;
