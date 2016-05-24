
$(".app-footer a").each(function(){
  var path = document.location.pathname.split('/');
  var page = path[path.length - 1];//总是最后
  var href = $(this).attr("href");
  if(href === page){
    $(this).addClass("active");
    return false;
  }
});

$(".sidebar a").each(function(){
  var path = document.location.pathname.split('/');
  var page = path[path.length - 1];
  var href = $(this).attr("href");
  if(page === href){
    $(this).addClass("active");
    return false;
  }
});

function goBack(){
  window.history.back();
};

//function nightMode(){
  //$("#nightNode").addClass("night");//自动刷新
  //$("#nightmode").css("color","red")//依然自动刷新
  //return false;
//};
$("#switch").click(function(){   //保持效果
  $("#nightMode").toggleClass("night");
  return false;
});