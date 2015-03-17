
$(document).ready(function(){
    
    //显示主页
    showHome();

    //为导航注册事件
    $(".blog-header").on('click','.nav a',navigateTo);
	
});

//通过ajax请求桌面内容
function navigateTo(event){

	//阻止默认事件
    event.preventDefault();

    //激活当前导航
    $(this).parent().addClass('active').siblings().removeClass('active');

    //
    var link = $(this).attr('rel');
    
    switch(link){
    	case 'home':
    		showHome();
    		break;
        case 'article':
    		showArticle();
    		break;
    	case 'userlist':
    		showUserlist();
    		break;
        case 'system':
    		showSystem();
    		break;
    	default:
    		showHome();
    }
    

}


//首页
function showHome(){
    
    var panelsContent = '<div class="row blog-home"><ul class="thumbnails"></ul></div>';

    $(".blog-body").html('').append(panelsContent);

    var panels = '';
    
	$.getJSON('/home/gohome',function(data){
               

        $.each(data,function(){
        	panels +='<li class="span3">';
            panels +='<a href="#" rel='+this.link+' class="thumbnail">';
            panels +='<img src="'+this.src+'" alt="'+this.title+'"/>';
            panels +='<h3>'+this.title+'</h3>';
            panels +='</a>';
            panels +='</li>';
        });
        
        $('.blog-home .thumbnails').html(panels);
         
	})

}

//文章管理
function showArticle(){
    

}

//用户管理
function showUserlist(){

    $.ajax({
        type:'get',
        url:'users/user'
    }).done(function(html){

        $(".blog-body").html(html);
        
    });

}

//系统配置
function showSystem(){

}
