var articleListData = [];
var article;
$(document).ready(function(){

    //初始化富文本编辑器
    article = CKEDITOR.replace( 'articleContent' );

    //显示文章列表
    populateArticleTable(1);

    //分页初始化
    pagation();

    //编辑文章
    $(".blog-articles").on('click','a.linkshowuser',modArticle)

    //搜索
    $(".blog-articles").on('keyup',"input#searchArticle",searchArticle)

    //保存
    $(".blog-articles").on('click',"span#addArticle",saveArticle)

    //删除
    $(".blog-articles").on('click',"a.linkdeletearticle",deleteArticle);

    //清空
	$(".blog-articles").on('click',"span#clearArticle",clearArticle)

});

function pagation(){
    $('#pager').bootpag({
    total: Math.ceil($("#totalRecords").val()/$("#size").val()),
    page : 1,
    maxVisible : 10,
    href: "#page-{{number}}",
    }).on("page", function(event, /* page number here */ num) {
        populateArticleTable(num);    
    });
}

//显示文章
function populateArticleTable(page){

    //表格内容
    var tableContent = '';

    var articleName = $("input#searchArticle").val();

    var url =  articleName ? "/articles/searchArticle/"+articleName : "/articles/articleList";

    //console.log(url);

    //ajax请求数据
    $.getJSON(url,{pageNumber:page,nPerPage:$("#size").val()},function(data){

        //保存用户数据到全局
        articleListData = data;

        $.each(data,function(){
            tableContent += '<tr>';
            tableContent += '<td class="text-center">'+this.articleIndex+'</td>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="'+this.title+'">'+this.title+'</a></td>';
            tableContent += '<td class="text-center">'+this.createDate+'</td>';          
            tableContent += '<td class="text-center">'+this.modifiedDate+'</td>';          
            tableContent += '<td class="text-center"><a href="#" class="linkdeletearticle" rel="'+this._id+'">delete</a></td>';
            tableContent += '</tr>';
        });

        //填充表格
        $("#articlelist tbody").html(tableContent);

    });

}
//搜索文章
function searchArticle(){

    populateArticleTable();

}
//编辑文章
function modArticle(){

   //取消默认事件
    event.preventDefault();

    //从连接的rel属性中获取文章标题
    var thisArticleTitle = $(this).attr('rel');

    //获取下标
    var arrayPosition = articleListData.map(function(arrayItem){
        return arrayItem.title;
    }).indexOf(thisArticleTitle);

    //获取当前文章
    var thisArticleObject = articleListData[arrayPosition];
   
    //console.log(thisArticleObject);
    
    //标识当前文章
    $("#articleForm").attr('article-id',thisArticleObject._id);
    //显示数据
    $("#articleTitle").val(thisArticleObject.title);
    article.setData(thisArticleObject.content);
}
//新增和编辑文章
function saveArticle(event){

    event.preventDefault();  

    //获取
    if($("#articleTitle").val() === ''){
        alert("请填写文章标题！");
        return false;
    };
    
    if(article.getData().length === 0 ){
        alert("请填写文章内容！");
         return false;
    }

    //将所有表单数据放到一个对象里面
    var newArticle = {
        'title': $('#articleForm input#articleTitle').val(),
        'content': article.getData(),
        'createDate': tools.customDateTime(),
        'modifiedDate': tools.customDateTime(),
        'author':'',
        'tag':''
    }

    var modArticle = {
        'title': $('#articleForm input#articleTitle').val(),
        'content': article.getData(),
        'modifiedDate': tools.customDateTime(),
        'tag':''
    }

    var articleId = $("#articleForm").attr('article-id');

    if(articleId){//更新文章

        //使用ajax提交到我们的 updateuser 服务
        $.ajax({
            type:'POST',
            data:modArticle,
            url:'/articles/updateArticle/'+articleId,
            dataType:'JSON'
        }).done(function(response){

            //如果提交成功(返回空白)
            if(response.msg === ''){

                //清空页面的表单
                //$("#articleTitle").val('');
                //article.setData('');
                alert("更新成功！！");

                //更新文章列表
                populateArticleTable();
            }
            else{

                alert("错误："+response.msg);

            }

        });
       
    }else{//新增文章

        //使用ajax提交到我们的 adduser 服务
        $.ajax({
            type:'POST',
            data:newArticle,
            url:'/articles/addArticle',
            dataType:'JSON'
        }).done(function(response){

            //如果提交成功(返回空白)
            if(response.msg === ''){

                //清空页面的表单
                $("#articleTitle").val('');
                article.setData('');

                //更新文章列表
                populateArticleTable(1);
            }
            else{

                alert("错误："+response.msg);

            }

        });

    }

}


//删除文章
function deleteArticle(event){

    event.preventDefault();
    
    var confirmation = confirm("你确定要删除这条数据吗？");

    if(confirmation){

    $.ajax({
        type: 'DELETE',
        url: '/articles/deleteArticle/' + $(this).attr('rel')
    }).done(function(response){

        if(response.msg === ""){
            
        }else{
            alert("error："+response.msg);
        }

        //更新表格
        populateArticleTable(1);
        
    });


    }else{
        return false;
    }
}


function clearArticle(){
    //清除标题
    $("#articleTitle").val('');
    //清除正文
    article.setData('');
    //清除标记
    $('#articleForm').attr('article-id','');
}

