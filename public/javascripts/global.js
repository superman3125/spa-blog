var tools = {};

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
}