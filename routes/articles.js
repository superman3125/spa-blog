var express = require('express');
var router = express.Router();

/* 返回文章页面. */
router.get('/articlesManage', function(req, res) {

    res.render('articlesManage');
    
});

/*获取文章*/
router.get('/articleList', function(req, res) {
    var db = req.db;
    db.collection('articles').find().toArray(function(err,items){
        res.json(items);
    });
});

/*新增文章*/
router.post('/addArticle',function(req,res){

	var db = req.db;

	db.collection('articles').insert(req.body,function(err,result){

          res.send(
          		(err === null) ? {msg : ''} : {msg : err}
          );

	});

});

/*删除文章*/
router.delete('/delArticle/:id',function(req,res){
      
      var db = req.db;

      var articleToDelete = req.params.id;

      db.collection('articles').removeById(articleToDelete,function(err,result){
      		res.send((result === 1) ? {msg:''} : {msg:'error:'+err});
      })

});

module.exports = router;
