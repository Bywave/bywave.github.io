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
* Contact form
*/
var nameVal; 
var email; 
var msg;
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

        /**
	* Contact Form
	*/
	// initContactForm();
	ContacForm.init();
	google.maps.event.addDomListener(window, 'load', initGoogleMap);
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

/**
* General Functions
*/
function isElementInViewport (el) {
    if (el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return rect.bottom > 50;
}

function isEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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

/**
* Contact Form -- create object
*/

var ContacForm = {
	init: function(){

	if(!nameVal){
		nameVal = $('#nameVal');
		email = $('#email');
		msg = $('#msg');
	}

 	$('#contact-form').submit(function(e){
		if(this.checkValidity()){
			e.preventDefault();
	 		if(nameVal.val() && email.val() && msg.val() && isEmail(email.val())){
	 			$.ajax({
	 				type: "POST",
	 				url: 'https://docs.google.com/a/bywave.com.au/forms/d/1IYvB6JIlq6hqqlh2NGv40N8LF03dSexc_yaBc9HMrZg/formResponse',
	 				data: $(this).serializeArray(),
	 				dataType: 'xml',
	 				statusCode: {
	 					0: function (){
	 						ContacForm.clearContactFields();
	 						ContacForm.displaySuccess();
	                        //Success message
	                    },
	                    200: function (){
	                    	ContacForm.clearContactFields();
	                        //Success Message
	                       	ContacForm.displaySuccess();
	                    }
	                }	
	            });
	 		}
	 		else{
	 			if(!nameVal.val()){
	 				nameVal.addClass('show-error');
	 				$('.error.prompt.reqname').animate({opacity: 1}, 'fast');
	 			}
				if(!email.val()){
					email.addClass('show-error');
					$('.error.prompt.reqemail').animate({opacity: 1}, 'fast')
				}
				else if(!isEmail(email.val())){
					email.addClass('show-error');
					$('.error.prompt.invemail').animate({opacity: 1}, 'fast');
				}
 				if(!msg.val()){
 					msg.addClass('show-error');
 					$('.error.prompt.reqmsg').animate({opacity: 1}, 'fast');
 				}
	 			
	 			ContacForm.setTimeoutError();
			}
		}
 	});
	},
	displaySuccess: function(){
		$('.success-message').fadeIn();
	},
	setTimeoutError: function(){
		setTimeout(function(){
				nameVal.removeClass('show-error');
				email.removeClass('show-error');
				msg.removeClass('show-error');
			$('.error.prompt').animate({opacity: 0}, 'fast');
		}, 3000);
	},
	clearContactFields: function(){
		nameVal.val("");
		email.val("");
		msg.val("");
		$('#contact-form').animate({opacity: 0}, 'fast');
	},
	validateEmail : function(emailVal){
		if(!isEmail(emailVal) && email != ''){		
			email.addClass('show-error');
			$('.error.prompt.invemail').animate({opacity: 1}, 'fast');
			ContacForm.setTimeoutError();
		}
	},
};





// function clearContactFields(){
// 	nameVal.val("");
// 	email.val("");
// 	msg.val("");
// 	$('#contact-form').animate({opacity: 0}, 'fast');
// }


// function validateEmail(email){
// 	if(!isEmail(email) && email != '')
// 	{		
// 		$('#email').addClass('show-error');
// 		$('.error.prompt.invemail').animate({opacity: 1}, 'fast');
// 		setTimeout(function(){
// 			$('#email').removeClass('show-error');
// 	 		$('.error.prompt').animate({opacity: 0}, 'fast');
//     		},3000
//     	);
// 	}
// }

// function initContactForm(){
//     nameVal = $('#nameVal');
// 	email = $('#email');
// 	msg = $('#msg');

//  	$('#contact-form').submit(function(e){
// 		if(this.checkValidity()){
// 			e.preventDefault();
// 			console.log(nameVal.val());
// 	 		if(nameVal.val() && email.val() && msg.val() && isEmail(email.val())){
// 	 			$.ajax({
// 	 				type: "POST",
// 	 				url: 'https://docs.google.com/a/bywave.com.au/forms/d/1IYvB6JIlq6hqqlh2NGv40N8LF03dSexc_yaBc9HMrZg/formResponse',
// 	 				data: $(this).serializeArray(),
// 	 				dataType: 'xml',
// 	 				statusCode: {
// 	 					0: function (){
// 	 						clearContactFields();
// 	                        //Success message
// 	                        $('.success-message').fadeIn();
// 	                    },
// 	                    200: function (){
// 	                    	clearContactFields();
// 	                        //Success Message
// 	                        $('.success-message').fadeIn();
// 	                    }
// 	                }	
// 	            });
// 	 		}
// 	 		else
// 	 		{

// 	 		   	$('.field').css("borderColor", "red");
// 	 			if(!nameVal.val()){
// 	 				nameVal.addClass('show-error');
// 	 				$('.error.prompt.reqname').animate({opacity: 1}, 'fast');
// 	 			}
// 				if(!email.val()){
// 					email.addClass('show-error');
// 					$('.error.prompt.reqemail').animate({opacity: 1}, 'fast')
// 				}
// 				else if(!isEmail(email.val())){
// 					email.addClass('show-error');
// 					$('.error.prompt.invemail').animate({opacity: 1}, 'fast');
// 				}
//  				if(!msg.val()){
//  					msg.addClass('show-error');
//  					$('.error.prompt.reqmsg').animate({opacity: 1}, 'fast');
//  				}
	 			
// 	 			setTimeout(function(){
// 	 				nameVal.removeClass('show-error');
// 	 				email.removeClass('show-error');
// 	 				msg.removeClass('show-error');
// 					$('.error.prompt').animate({opacity: 0}, 'fast');
// 				}, 3000);
	 		
// 	 			// 	$('.error.prompt.reqname').animate({opacity: 1}, 'fast');
//  				// 	$('.error.prompt.reqemail').animate({opacity: 1}, 'fast');
//  				// 	$('.error.prompt.reqmsg').animate({opacity: 1}, 'fast');
// 					// setError();

// 	 		  	// $('.field').css('borderColor','transparent').fadeIn();
// 			}
// 		}
//  	});
// }

/**
* GoogleMaps
*/
function initGoogleMap(){
	var mapProp = {
		  center:new google.maps.LatLng(51.508742,-0.120850),
		  zoom:5,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  disableDefaultUI: true
	  };
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

