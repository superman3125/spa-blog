var userListData = [];

$(document).ready(function(){


	//显示表格
	populateTable();

	//注册显示用户信息事件
	$("#userList table tbody").on('click','td a.linkshowuser',showUserInfo);

	//注册提交新增用户事件
    $("#btnAddUser").on('click',addUser);

    //删除事件
    $("#userList table tbody").on('click','td a.linkdeleteuser',delUser);

});

//显示表格函数
function populateTable(){

	//表格内容
	var tableContent = '';

	//ajax请求数据
	$.getJSON('/users/userlist',function(data){

		//保存用户数据到全局
		userListData = data;

		$.each(data,function(){
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="'+this.username+'">'+this.username+'</a></td>';
			tableContent += '<td>'+this.email+'</td>';			
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="'+this._id+'">delete</a></td>';
			tableContent += '</tr>';
		});

		//填充表格
		$("#userList table tbody").html(tableContent);

	});
}

//显示用户信息
function showUserInfo(event){
    
    //取消默认事件
    event.preventDefault();

    //从连接的rel属性中获取用户名
    var thisUserName = $(this).attr('rel');

    //获取下标
    var arrayPosition = userListData.map(function(arrayItem){
    	return arrayItem.username;
    }).indexOf(thisUserName);

    //获取当前用户
    var thisUserObject = userListData[arrayPosition];

    //显示到信息框
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
}


function addUser(event){
    
    event.preventDefault();

    //基本验证  如果有任何空白， errorCount 的值会增加
    var errorCount = 0 ;
    //获取每一个 input
    $('#addUser input').each(function(index,val){
    		if($(this).val() === ''){ errorCount++;}
    });

    //如果错误数 errorCount = 0
    if(errorCount === 0){
      
        //将所有表单数据放到一个对象里面
        var newUser = {
        	'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        //使用ajax提交到我们的 adduser 服务
        $.ajax({
        	type:'POST',
        	data:newUser,
        	url:'/users/adduser',
        	dataType:'JSON'
        }).done(function(response){

        	//如果提交成功(返回空白)
        	if(response.msg === ''){
        		//清空页面的表单
        		$("#addUser fieldset input").val('');

        		//更新表格
        		populateTable();
        	}
        	else{

        		alert("错误："+response.msg);

        	}

        });


    } else{
    	alert("请填写所有表单!!");
    	return false;
    }
}

function delUser(event){
    
    event.preventDefault();
    
    var confirmation = confirm("你确定要删除这条数据吗？");

    if(confirmation){

    $.ajax({
    	type: 'DELETE',
        url: '/users/deluser/' + $(this).attr('rel')
    }).done(function(response){

    	if(response.msg === ""){
    		
    	}else{
    		alert("error："+response.msg);
    	}

    	//更新表格
        populateTable();
        
    });


    }else{
    	return false;
    }
}