var express = require('express');
var mongo = require("mongoskin");
var router = express.Router();

/* 返回文章页面. */
router.get('/articlesManage', function(req, res) {
    
    //文章总数
    var db = req.db;

    db.collection('articles').count(function(err, data) {
         res.render('articlesManage',{'totalRecords':data,size:7});
    });
   

    
});

/*获取文章*/
router.get('/articleList', function(req, res) {

    //获取分页参数
    var pageNumber = parseInt(req.query.pageNumber);
    var nPerPage = parseInt(req.query.nPerPage);
    var skip = pageNumber > 0 ? ((pageNumber-1)*nPerPage) : 0;

    var db = req.db;
    db.collection('articles').find().skip(skip).limit(nPerPage).toArray(function(err,items){
        for (var i = 0,l = items.length; i < l; i++) {
            items[i].articleIndex = i+skip+1;
        };            
        res.json(items);
    });

    

});

/*查找文章*/
router.get('/searchArticle/:articleName',function(req,res){
    
    //获取分页参数
    var pageNumber = parseInt(req.query.pageNumber);
    var nPerPage = parseInt(req.query.nPerPage);
    var skip = pageNumber > 0 ? ((pageNumber-1)*nPerPage) : 0;
    
    var db = req.db;
    var articleName = req.params.articleName;  
    //正则匹配模糊查询 
    var reg = new RegExp(articleName,"i");
    db.collection('articles').find({title:reg}).skip(skip).limit(nPerPage).toArray(function(err,items){
        for (var i = 0,l = items.length; i < l; i++) {
            items[i].articleIndex = i+skip+1;
        };            
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


/*编辑文章*/
router.post('/updateArticle/:id',function(req,res){

	var db = req.db;

  var articleToUpdate = req.params.id;

	db.collection('articles').update({_id: mongo.helper.toObjectID(articleToUpdate)},{'$set':req.body},function(err,result){

         res.send((result === 1) ? {msg:''} : {msg:'error:'+err}); 

	});

});


/*删除文章*/
router.delete('/deleteArticle/:id',function(req,res){
      
      var db = req.db;

      var articleToDelete = req.params.id;

      db.collection('articles').removeById(articleToDelete,function(err,result){
      		res.send((result === 1) ? {msg:''} : {msg:'error:'+err});
      })

});

module.exports = router;
