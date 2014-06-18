/* Author:

*/


// Global Variables

var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

(function($) {
	function initMobile() {
		$('body').prepend('<div class="mobile-menu-bg"></div>');
		var navbar = $('.navbar');
		var navToggle =  $('.nav-switch');
		var navCollapse = $('.nav-collapse');
		var $navList = $('.nav').find('li');
		navToggle.on('click', function(event) {
			if (navCollapse.height() === 0) {
				var curHeight = navCollapse.height();
				var autoHeight = navCollapse.css('height', 'auto').height();
				navCollapse.height(curHeight).animate({
					height : autoHeight									 
				}, 200, function() {
					navCollapse.css('height', 'auto');
					
				});	
				$('.mobile-menu-bg').fadeIn();
			} else {
				navCollapse.height(curHeight).animate({
					height : 0								 
				}, 200);
				$('.mobile-menu-bg').hide();
			}
			event.stopPropagation();
		});
		if (isMobile) {
			$navList.on('click', function() {
				navCollapse.height(navCollapse.height()).animate({
					height : 0								 
				}, 200);
				$('.mobile-menu-bg').hide();
			});
			navToggle.on('click', function(event) {
				if (navCollapse.height() === 0) {
					var curHeight = navCollapse.height();
					var autoHeight = navCollapse.css('height', 'auto').height();
					navCollapse.height(curHeight).animate({
						height : autoHeight									 
					}, 200, function() {
						navCollapse.css('height', 'auto');
					});	
					$('.mobile-menu-bg').fadeIn();
				} else {
					navCollapse.height(curHeight).animate({
						height : 0								 
					}, 200);
					navbar.removeClass('open');
					$('.mobile-menu-bg').hide();
				}
				event.stopPropagation();
			});
			$(document).on('click', function() {
				navCollapse.height(navCollapse.height()).animate({
					height : 0								 
				}, 200);
				$('.mobile-menu-bg').hide();
			});
		}
	}


	function initDropdown() {
		$('.dropdown').each(function() {
			var $this = $(this);
			var $dropdown = $this.find('.dropdown-content');
			$this.on('mouseenter', function() {
				$dropdown.fadeIn('fast');
				$this.addClass('active');
			}).on('mouseleave', function() {
				$dropdown.fadeOut('fast');
				$this.removeClass('active');
			});
			if (isMobile) {
				$this.unbind('mouseenter mouseleave');
				$this.on('click', function() {
					$this.toggleClass('dropdown-open');
					$this.toggleClass('active');
				});
			}
		});
	}


	function heroImg() {
		var $hero = $('.hero-full, .image-content');
		for (var i = 0; i < $hero.length; i++) {
			var $heroBanner = $hero.eq(i).find('.hero-banner, .image-banner');
			var $heroImg = $heroBanner.find('img').attr('src');
			$heroBanner.find('img').css({
				opacity: 0
			});
			//console.log(i);
			$heroBanner.css({
				'background' : 'url('+ $heroImg +') no-repeat'
			});
		}
	}

	function htmlTags() {
		// $('.html-tags').each(function() {
		// 	var $this = $(this);
		// 	var tags = $this.html().replace(/</g, '&lt;').replace(/>/g, '&gt;');
		// 	$this.html(tags);
		// });
	}

	function scrollTop() {
		$('.btt').on('click', function() {
			$('html, body').animate({
				scrollTop: 0
			}, 'slow');
			return false;
		});
	}

	$(document).ready(function() {
		htmlTags();
		scrollTop();
		$('input, textarea').placeholder();
		initMobile();
		initDropdown();
		heroImg();
		$('.icheck').iCheck({
	 		checkboxClass: 'icheckbox',
	        radioClass: 'iradio'
		});
		$(function() {
		    FastClick.attach(document.body);
		});
	});
	
})(jQuery);