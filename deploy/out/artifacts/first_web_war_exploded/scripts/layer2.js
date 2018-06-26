// JavaScript Document

function _(id) { 
  return document.getElementById(id); 
} 
var ti = null; 
function loading(){ 
    var tmd = 0; 
    var x1 = document.documentElement.clientWidth;  
    var y1 = document.body.offsetHeight; 
    var y2=document.documentElement.clientHeight;//���ҳ��ĸ߶� 
    with(_("layer")){ 
       style.width=x1+"px"; 
       if(y2>y1){ 
       style.height=y2+20+"px"; 
       }else{ 
       style.height=y1+20+"px"; 
       } 
       style.overflowX="hidden"; 
       style.overflowY="hidden"; 
	   style.display="block"; 
    }
   // _("layer2").style.left = ($(".w3 .sx").offset().left)-100 +"px";
	_("layer2").style.display="block"; 
    ti = setInterval("hei()",10); 
} 
var x = 30; 
function hei(){ 
    x+=10; 
    if(x<31){ 
        if(document.all){ 
            _("layer").style.filter='Alpha(Opacity='+x+')'; 
        }else{ 
            _("layer").style.opacity=""+x/100+"";     
        } 
    } 
} 
function unload(){ 
_("layer").style.display="none"; 
_("layer2").style.display="none"; 
clearInterval(ti); 
x=0; 
} 