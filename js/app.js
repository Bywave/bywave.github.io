// Foundation
$(document).foundation();

// set up hover panels
// although this can be done without JavaScript, we've attached these events
// because it causes the hover to be triggered when the element is tapped on a touch device
$('.hover').hover(function(){
    this.classList.toggle('flip');
});

// Fading header
var timeoutFadingHeader;
var isFadingHeader = false;

$(function(){
	initFadingHeaderEvents();
});

// Fading header
function initFadingHeaderEvents(){
	$homeSection = $('#section-home');

	setInterval(function(){
		if(!isElementInViewport($homeSection)){
			$header = $('.fading-header');

			if($header.css("opacity") == '1' && isFadingHeader){
				console.log('if 1');
				clearTimeout(timeoutFadingHeader);
				isFadingHeader = false;
			}
			else if($header.css("opacity") == '0'){
				console.log('if 2');
				$header.animate({
					opacity: 1,
					marginTop: '0px'
				}, 250);
			}
		}
		else{
			$header = $('.fading-header');
			
			if($header.css("opacity") == '1' && !isFadingHeader){
				isFadingHeader = true;
				timeoutFadingHeader = setTimeout(function(){
					$header.animate({
						opacity: 0,
						marginTop: '-45px',
					}, 250);
					isFadingHeader = false;
				}, 500);
			}
		}
	}, 100);
}

function isElementInViewport (el) {
    if (el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return rect.y > -(rect.height - 50);
}
