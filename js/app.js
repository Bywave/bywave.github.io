/**
* Config
*/
var durationNavAnim = 250;
var durationNavHide = 500;
/**
* Fading header
*/
var timeoutFadingHeader;
var isFadingHeader = false;

$(function(){
	// Foundation
	$(document).foundation();

	// set up hover panels
	// although this can be done without JavaScript, we've attached these events
	// because it causes the hover to be triggered when the element is tapped on a touch device
	$('.hover').hover(function(){
	    this.classList.toggle('flip');
	});

	/**
	* Fading header
	*/
	initFadingHeaderEvents();
});

/**
* Fading header
*/
function initFadingHeaderEvents(){
	$homeSection = $('#section-home');

	setInterval(function(){
		if(!isElementInViewport($homeSection)){
			$header = $('.fading-header');

			if($header.css("opacity") == '1' && isFadingHeader){
				clearTimeout(timeoutFadingHeader);
				isFadingHeader = false;
			}
			else if($header.css("opacity") == '0'){
				$header.animate({
					opacity: 1,
					marginTop: '0px'
				}, durationNavAnim);
			}
		}
		else{
			$header = $('.fading-header');
			
			if($header.css("opacity") == '1' && !isFadingHeader){
				isFadingHeader = true;
				console.log('fade hedaer');
				clearTimeout(timeoutFadingHeader);
				timeoutFadingHeader = setTimeout(function(){
					$header.animate({
						opacity: 0,
						marginTop: '-45px',
					}, durationNavAnim);
					isFadingHeader = false;
				}, durationNavHide);
			}
		}
	}, 100);
}

function isElementInViewport (el) {
    if (el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return rect.bottom > 50;
}
