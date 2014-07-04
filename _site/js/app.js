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
/**
* Contact form
*/
var nameVal; 
var email; 
var msg;

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
	
	/**
	* Contact Form
	*/
	initContactForm();
	google.maps.event.addDomListener(window, 'load', initGoogleMap);
	
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


// validate email
function isEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function setError() {
    setTimeout(function(){
		$('.error.prompt').animate({opacity: 0}, 'fast');
    		},3000
    	);
}

function validateEmail(email){
	if(!isEmail(email) && email != '')
	{
		$('.error.prompt.email').animate({opacity: 1}, 'fast');
		setError();
	}
}

function clearContactFields(){
	nameVal.val("");
	email.val("");
	msg.val("");
	$('#contact-form').animate({opacity: 0}, 'fast');
}

// Contact Form
function initContactForm(){
    nameVal = $('#nameVal');
	email = $('#email');
	msg = $('#msg');

 	$('#contact-form').submit(function(e){
		if(this.checkValidity()){
			e.preventDefault();
			console.log(nameVal.val());
	 		if(nameVal.val() && email.val() && msg.val()){
	 			$.ajax({
	 				type: "POST",
	 				url: 'https://docs.google.com/a/bywave.com.au/forms/d/1IYvB6JIlq6hqqlh2NGv40N8LF03dSexc_yaBc9HMrZg/formResponse',
	 				data: $(this).serializeArray(),
	 				dataType: 'xml',
	 				statusCode: {
	 					0: function (){
	 						clearContactFields();
	                        //Success message
	                        $('.message').fadeIn();
	                    },
	                    200: function (){
	                    	clearContactFields()
	                        //Success Message
	                        $('.message').fadeIn();
	                    }
	                }	
	            });
	 		}
	 		else
	 		{
	 			$('.error.prompt.reqname').animate({opacity: 1}, 'fast');
	 			$('.error.prompt.reqemail').animate({opacity: 1}, 'fast');
	 			$('.error.prompt.reqmsg').animate({opacity: 1}, 'fast');
				setError();
			}
		}
 	});
}

// google maps
function initGoogleMap(){
	var mapProp = {
	  center:new google.maps.LatLng(51.508742,-0.120850),
	  zoom:5,
	  mapTypeId:google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: true
	  };
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

}

