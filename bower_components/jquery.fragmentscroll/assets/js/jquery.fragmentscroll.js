/*!
 * jQuery Fragment Scroll v1.2.0
 *
 * Copyright 2014 miWebb
 * Released under the MIT license
 */

(function($, window, undefined) {
	'use strict';

	$.fn.fragmentScroll = function(options) {
		// Options
		var options = $.extend({}, $.fn.fragmentScroll.defaults, options);

		// Init
		return this.each(function() {
			fragmentScroll(this, options);
		});
	}

	$.fn.fragmentScroll.defaults = {
		// Animation
		frame: 'html, body', // body for webkit browsers
		offset: 0,
		speed: 'slow',
		easing: 'swing', // http://www.easings.net

		// Options
		enableFragment: false,
		enableAnimationChain: false,

		// Events
		onStart: function() {},
		onComplete: function() {}
	}

	function fragmentScroll(element, options) {
		// On click event
		$(element).find('[href^="#"]').on('click', function(event) {
			// Prevent default behavior
			event.preventDefault();

			// Check active
			if ($(':animated').length && options.enableAnimationChain) {
				return false;
			}

			// Variables
			var fragment = this.href.substring(this.href.indexOf('#'));
			var frame = $(options.frame);

			// onStart
			if (typeof(options.onStart) == "function") {
				options.onStart.call();
			}

			// Animation
			frame.animate({
				scrollTop: $(fragment).offset().top + $(options.frame).offset().top - options.offset
			}, options.speed, options.easing);

			// onComplete
			if (typeof(options.onStart) == "function") {
				frame.promise().done(options.onComplete);
			}

			// Show fragment
			if(options.enableFragment) {
				window.location.hash = fragment;
			}
		});
	}
})(jQuery, window);
