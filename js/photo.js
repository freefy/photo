var total = 15,
    h_w = $(window).height()/$(window).width(),//window的高度与宽度正常比例
    activeIndex ;

//生成li
function render(total){
    var str ='';
    for(var i = 0 ;i < total;i++){
        str += '<li><img src="./images/'+i+'.png"></li>';//一般在html写好样式。再删除写到js中
    }
    // $('.wrapper').append(str);
    $(str).appendTo($('.wrapper')).animate({opacity:1},500);
}
render(total);
//点击事件绑定在li还是绑定在ul
//绑定在ul好,事件委托,监听事件,对于后来生成的li同样有点击事件,而且省性能,不需要对每个li循环遍历

$('ul').on('tap','li',function(){
    var num =activeIndex=$(this).index();
    loadImage(num);
    // var img ='<img src="./images/'+num+'.png" alt="">';
    // $('.showImage').append($(img)).show().on('tap',function(){
    //         $(this).html('').hide();
    //     });
   
   
})
function loadImage(num){
    $('.showImage').html('').show();
    var oImg=new Image();
    var img_src = './images/'+num +'.png';
    oImg.src = img_src;
    oImg.onload=function(){
        // 若图片超过屏幕尺寸,高度100%;
        var w = this.width,
            h = this.height;
        if(h/w > h_w){
            //竖图
            // $('.showImage').append($(this));
            // $(this).css({'height':'100%'});
            $(this).appendTo($('.showImage')).css({'height':'100%'}).animate({opacity:1},500);
        }
        else{
            $(this).appendTo($('.showImage')).css({'width':'100%'}).animate({opacity:1},500);}       
    }
}
$('.showImage')
    .on('tap',function(){
        $(this).hide();
    })
    .on('swipeLeft',function(){
        // $(this).html('').hide();
        if(activeIndex == 0){
            activeIndex = 0;
        }else{
            activeIndex--;
        }
        loadImage(activeIndex);
    })
    .on('swipeRight',function(){
        // $(this).html('').hide();
        if(activeIndex == total-1){
            activeIndex = total-1;
        }else{
            activeIndex ++;
        }
        loadImage(activeIndex);
    })
  