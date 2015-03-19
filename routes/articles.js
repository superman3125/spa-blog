var express = require('express');
var router = express.Router();

/* 显示所有文章. */
router.get('/articlesManage', function(req, res) {

    res.render('articlesManage');
    
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
