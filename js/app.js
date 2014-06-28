// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

/**
* fading-header
*/
var timeout_fadingHeader;
var is_fadingHeader = false;

/**
* JQuery onReady
*/
$(function(){
	initFadingHeaderEvents();
});

/**
* fading-header
*/
function initFadingHeaderEvents(){
	$homeSection = $('#section-home');

	setInterval(function(){
		if(!isElementInViewport($homeSection)){
			$header = $('.fading-header');

			if($header.css("opacity") == '1' && is_fadingHeader){
				console.log('if 1');
				clearTimeout(timeout_fadingHeader);
				is_fadingHeader = false;
			}
			else if($header.css("opacity") == '0'){
				console.log('if 2');
				$header.animate({
					opacity: 1,
					marginTop: '0px', 
				}, 250);
			}
		}
		else{
			$header = $('.fading-header');
			
			if($header.css("opacity") == '1' && !is_fadingHeader){
				is_fadingHeader = true;
				timeout_fadingHeader = setTimeout(function(){
					$header.animate({
						opacity: 0,
						marginTop: '-45px',
					}, 250);
					is_fadingHeader = false;
				}, 500);
			}
		}
	}, 100);
}

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();
    
    return rect.y > -(rect.height - 50);
}