

$(function(){
	
	var i = false;
		
	$('#open_menu').hide();
	
	$('#spicon,.page_link a').click(function(){

		if(i === false) {
			i = true;
			if($('#spicon').hasClass('m_active') === false) {
				$('#spicon').addClass('m_active');
				$('#open_menu').fadeIn(100, 'linear',function(){
					$("#close").stop().animate({
						opacity:"1"
					},{
						duration: 100,
						easing: 'easeOutCubic',
						complete:function(){
							i = false;
						}
					});
				});
			}else {
				$('#spicon').removeClass('m_active');
				$('#open_menu').fadeOut(100, 'linear',function(){
					$("#close").stop().animate({
						opacity:"1"
					},{
						duration: 100,
						easing: 'easeOutCubic',
						complete:function(){
							i = false;
						}
					});

				});
			}
		}
	});
});
$(function(){
  // #で始まるa要素をクリックした場合に処理（"#"←ダブルクォーテンションで囲むのを忘れずに。忘れるとjQueryのバージョンによっては動かない。。）
  $('.nav_sc a[href^="#"]').click(function(){
    // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
    var adjust = 0;
    // スクロールの速度（ミリ秒）
    var speed = 400;
    // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
    var href= $(this).attr("href");
    // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
    var position = target.offset().top + adjust;
    // スムーススクロール linear（等速） or swing（変速）
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});