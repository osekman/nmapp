module.exports = {
    getCurrentTime: function(type){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        if(m<10) m = "0"+m;
        if(d<10) d = "0"+d;
        if(h<10) h = "0"+h;
        if(i<10) i = "0"+i;
        if(s<10) s = "0"+s;
      
        if(type == 0)
        return  y + "-" +m+ "-" + d;
        else
        return  y + "-" +m+ "-" + d + " "+h+":"+i+":"+s;
    }
}
 
