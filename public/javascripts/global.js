var spa = {};
/*var tools = {};

tools.customDateTime = function(){
    
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1 >= 10 ? d.getMonth() : "0"+d.getMonth();
    var vDay = d.getDate() >= 10 ? d.getDate() : "0"+d.getDate();
    var h = d.getHours() >= 10 ? d.getHours() : "0"+d.getHours(); 
    var m = d.getMinutes() >= 10 ? d.getMinutes() : "0"+d.getMinutes(); 
    var se = d.getSeconds() >= 10 ? d.getSeconds() : "0"+d.getSeconds(); 

    var datetime = vYear + ":" + vMon + ":" + vDay + "  " + h + ":" + m +":" + se;
    
    return datetime;
}*/
$(function(){

	//contentScroll height
	spa.init_contextScrollHeight();

});

/*
* 在样式去除主体body滚动条后，为contextScroll盒子增加滚动条，已消除切换导航栏时带来的闪动
*/
spa.init_contextScrollHeight = function(){

	var height = $(document).height()-41;

	$(".contentScroll").css('height',height);

}