/**
 * tab navigation
 * 
 * @copyright   RaNa design associates, inc.
 * @author      keisuke YAMAMOTO <keisukey@ranadesign.com>
 * @link        http://kaelab.ranadesign.com/
 * @link        http://ranagram.com/
 * @version     1.0
 * @date        2012
 *
 */
(function($) {

	$(function() {

		var url = location.href;
		var param = url.split("#");
		var pos;

		if(param[1] === "" || param[1] === null || param[1] === undefined){
			pos = 1;
		}
		else{

			pos = param[1].substr(-1);
		}

		$('.tab > ul > li').removeClass('active');
		$('.tab > ul > li').eq(pos-1).addClass('active');

		var n = $(".page").length;

		for(var i = 0; i < n; i++){
			if(i == (pos-1)){
				$('.page').eq(i).show();
			}
			else{
				$('.page').eq(i).hide();
			}
		}
        
        $('.page').hide();

        $(".tab li").eq(0).addClass("active");
        $('.page').eq(0).show();

		$(".tab a").hover(function(event) {

			$(".tab li").removeClass("active");

			$(this).parent().addClass("active");
			// ページ切替
			// position:absoluteで同じ場所に重ねてあるページを、fadeOut/fadeInメソッドで切り替える。
			// まずページをすべてフェードアウトさせる。
			$(".page").stop(true).fadeOut();
			// 次に表示させたいページをフェードインさせる。
			$(this.hash).stop(true).fadeIn();
			
			// a要素のデフォルト処理（リンク遷移）をキャンセルさせる。
			event.preventDefault();

			var n = $(".page").length;
			var index = $(".tab a").index(this);

			
			for(var i = 0; i < n; i++){
				if(i == index){
					$('.page').eq(i).show();
				}
				else{
					$('.page').eq(i).hide();
				}
			}

		});

		$(".tab a").click(function(event) {
			event.preventDefault();
		});
		

		var obj;

		var fin = document.referrer.indexOf('index');

		if(fin != -1) {
			$(".tab a").eq(pos-1).trigger("click");
		}

	});



	$(function() {

		var url = location.href;
		var param = url.split("#");
		var pos;

		if(param[1] === "" || param[1] === null || param[1] === undefined){
			pos = 1;
		}
		else{

			pos = param[1].substr(-1);
		}

		$('.tab2 > ul > li').removeClass('active');
		$('.tab2 > ul > li').eq(pos-1).addClass('active');

		var n = $(".page2").length;

		for(var i = 0; i < n; i++){
			if(i == (pos-1)){
				$('.page2').eq(i).show();
			}
			else{
				$('.page2').eq(i).hide();
			}
		}

        $(".tab2 li").eq(0).addClass("active");
        $('.page2').eq(0).show();

		$(".tab2 .termigi a").click(function(event) {

			$(".tab2 li").removeClass("active");

			$(this).parent().addClass("active");
			// ページ切替
			// position:absoluteで同じ場所に重ねてあるページを、fadeOut/fadeInメソッドで切り替える。
			// まずページをすべてフェードアウトさせる。
			$(".page2").stop(true).fadeOut();
			// 次に表示させたいページをフェードインさせる。
			$(this.hash).stop(true).fadeIn();
			
			// a要素のデフォルト処理（リンク遷移）をキャンセルさせる。
			event.preventDefault();

			var n = $(".page2").length;
			var index = $(".tab2 .termigi a").index(this);

			
			for(var i = 0; i < n; i++){
				if(i == index){
					$('.page2').eq(i).show();
				}
				else{
					$('.page2').eq(i).hide();
				}
			}

		});
		

		var obj;

		var fin = document.referrer.indexOf('index');

		if(fin != -1) {
			$(".tab2 a").eq(pos-1).trigger("click");
		}

	});

    
    
})(jQuery);
/*
$(function(){
  // #で始まるa要素をクリックした場合に処理（"#"←ダブルクォーテンションで囲むのを忘れずに。忘れるとjQueryのバージョンによっては動かない。。）
  $('.tab a[href^="#"]').click(function(){
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
*/
