/**
* Config
*/
var viewportHeight;
/**
* Fading header
*/
var timeoutFadingHeader,
	isHeaderFading = false,
	fadingHeader,
	durationNavAnim = 250,
	durationNavHide = 500;
/**
* Page Loader
*/
var pageloadDelay = 1000,
	documentScrollTop,
	mainPageId = '#main-page';

/**
* On Ready
*/
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
	viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	FadingHeader.init();

	/**
	* PageLoader
	*/
	initPageLoader();
});

/**
* Fading header
*/
var FadingHeader = {
	init: function(){
		fadingHeader = $('.fading-header');
		viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		setInterval(function(){
			if(!isElementInViewport(document.documentElement)){

				if(fadingHeader.css("opacity") == '1' && isHeaderFading){
					clearTimeout(timeoutFadingHeader);
					isHeaderFading = false;
				}
				else if(fadingHeader.css("opacity") == '0'){
					FadingHeader.show();
				}
			}
			else{
				if(fadingHeader.css("opacity") == '1' && !isHeaderFading){
					isHeaderFading = true;
					clearTimeout(timeoutFadingHeader);
					timeoutFadingHeader = setTimeout(function(){
						FadingHeader.hide();
						isHeaderFading = false;
					}, durationNavHide);
				}
			}
		}, 100);
	},
	hide: function(){
		fadingHeader.animate({
			opacity: 0,
			marginTop: '-45px',
		}, durationNavAnim);
	},
	show: function(){
		fadingHeader.animate({
			opacity: 1,
			marginTop: '0px'
		}, durationNavAnim);
	},
};

function isElementInViewport (el) {
    if (el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return rect.bottom > 50;
}

/**
* Page Loader
*/
var pageWrap = $('.wrap')[0],
	pages = [].slice.call( pageWrap.querySelectorAll( '.page' ) ),
	currentPage = 0,
	triggerLoading = [].slice.call( pageWrap.querySelectorAll( '.pageload-link' ) ),
	loader = new SVGLoader($('#loader')[0], { speedIn : 400, easingIn : mina.easeinout } );
	
/**
* Case Studies
*/
function initPageLoader() {
	$('.pageload-link').on('click', function(ev){
		ev.preventDefault();
		loader.show();
		$thisObj = $(this);

		// after some time hide loader
		setTimeout( function() {
			loader.hide();

			var origin = $thisObj.data('pageOrigin');
			if(origin == mainPageId) documentScrollTop = $(document).scrollTop();
			$origin = $(origin)[0].classList.toggle('show');

			var destination = $thisObj.data('pageDestination');
			$destination = $(destination)[0].classList.toggle('show');
			if(destination == mainPageId) $(document).scrollTop(documentScrollTop);
		}, pageloadDelay);
	});

	var tmpSpeedIn = loader.options.speedIn;
	loader.options.speedIn = 0;
	loader.show();
	setTimeout(function(){
		loader.options.speedIn = tmpSpeedIn;
		loader.hide();
		$('#main-page')[0].classList.toggle('show');
	}, pageloadDelay);
}