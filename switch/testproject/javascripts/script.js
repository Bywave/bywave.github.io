/* Author:

*/


// Global Variables

var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

(function($) {
	function initMobile() {
		$('body').prepend('<div class="mobile-menu-bg"></div>');
		var navbar = $('.nav-bar');
		$('.nav-bar').each(function() {
			var $this = $(this);
			var navSwitch =  $this.find('.nav-switch');
			var navFold = $this.find('.nav-fold');
			var $navList = $this.find('.nav li');
			navSwitch.on('click', function(event) {
				if (navFold.height() === 0) {
					var curHeight = navFold.height();
					var autoHeight = navFold.css('height', 'auto').height();
					navFold.height(curHeight).animate({
						height : autoHeight									 
					}, 200, function() {
						navFold.css('height', 'auto');
						
					});	
					$('.mobile-menu-bg').fadeIn();
				} else {
					navFold.height(curHeight).animate({
						height : 0								 
					}, 200);
					$('.mobile-menu-bg').hide();
				}
				event.stopPropagation();
				return false;
			});
			if (isMobile) {
				$navList.on('click', function() {
					navFold.height(navFold.height()).animate({
						height : 0								 
					}, 200);
					$('.mobile-menu-bg').hide();
					return false;
				});
				navSwitch.on('click', function(event) {
					if (navFold.height() === 0) {
						var curHeight = navFold.height();
						var autoHeight = navFold.css('height', 'auto').height();
						navFold.height(curHeight).animate({
							height : autoHeight									 
						}, 200, function() {
							navFold.css('height', 'auto');
						});	
						$('.mobile-menu-bg').fadeIn();
					} else {
						navFold.height(curHeight).animate({
							height : 0								 
						}, 200);
						navbar.removeClass('open');
						$('.mobile-menu-bg').hide();
					}
					event.stopPropagation();
					return false;
				});
				$(document).on('click', function() {
					navFold.height(navFold.height()).animate({
						height : 0								 
					}, 200);
					$('.mobile-menu-bg').hide();
					return false;
				});
			}
		});
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


	// Switch Scroll
	function SwitchScroll(element, options) {
		this.element = $(element);

		this.config = {
			scrollSpeed: 1000, // milliseconds
			offsetTop: 20, // Offset from menu to top
		};

		this.settings = {
			scroll: this.element,
			scrollAnchor: this.element.find('a')
		};

		this.prop = $.extend({}, this.config, this.settings, options);
		this.init();
	};

	SwitchScroll.prototype = {
		init: function() {
			var $el = this.prop;
			this.addEvent();
		},

		addEvent: function() {
			var $el = this.prop,
				lastId,
				$scrollOffset = $el.scroll.offset().top,
				$scrollElement = $el.scrollAnchor.map(function() {
					var $attr = $($(this).attr('href'));
					if ($attr.length) {
						return $attr;
					}
				});
			$el.scrollAnchor.on('click', function() {
				$el.scrollAnchor.parent().removeClass('active');
				$(this).parent().addClass('active');
				var $href = $(this).attr('href');
				$('html, body').animate({
					scrollTop: $($href).offset().top
				}, $el.scrollSpeed);
				return false;
			});

			$(window).on('scroll', function() {
				var $windowOffset = $(window).scrollTop() + $el.offsetTop,
					$currentItem = $scrollElement.map(function(){
					    if ($windowOffset > $(this).offset().top) {
					    	return this;
					    }
					});
				$currentItem = $currentItem.get($currentItem.length - 1);
   				if ($currentItem && $currentItem.length) {
   					$id = $currentItem.get(0).id;
   				} 
   				
				if ($windowOffset < $scrollOffset) {
					$el.scrollAnchor.parent().removeClass("active")
				} else {
					$el.scrollAnchor.parent().removeClass("active").end().filter("[href=#"+$id+"]").parent().addClass("active");
				}
			});
		}
	};


	$.fn.switchScroll = function(options) {
		return this.each(function() {
			var scroll = new SwitchScroll(this, options);
			$.data(this, scroll);
		});
	};


	// Switch Fixed
	function SwitchFixed(element, options) {
		this.element = $(element);

		this.config = {

		};

		this.settings = {
			fixedElement: this.element,

		};

		this.prop = $.extend({}, this.config, this.settings, options);
		this.init();
	}

	SwitchFixed.prototype = {
		init: function() {
			var $el = this.prop;
			this.addEvent();
			this.windowResize();
		},

		addEvent: function() {
			var $el = this.prop;
			var $elementOffset = $el.fixedElement.offset().top;

			$(window).on('scroll', function() {
				var $windowOffset = $(window).scrollTop();
				if ($windowOffset >= $elementOffset) {
					$el.fixedElement.css({
						'position': 'fixed',
						'top': 0,
						'width': $el.fixedElement.parent().width()
					});
				} else {
					$el.fixedElement.removeAttr('style');
				}
			});
		},

		windowResize: function() {
			var $el = this.prop;
			$(window).on('resize', function() {
				$el.fixedElement.css({
					'width': $el.fixedElement.parent().width()
				});
			})
		}
	}


	$.fn.switchFixed = function(options) {
		return this.each(function() {
			var fixed = new SwitchFixed(this, options)
			$.data(this, fixed);
		});
	};

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
		$('.switch-scroll').switchScroll();
		$('.switch-fixed').switchFixed();
	});
	
})(jQuery);