/*
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



Dropzone.autoDiscover = false;

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);

$(document).on("ready", function(){

	var jsmediatags = window.jsmediatags;

	var id = "#my-dropzone";
	var myDropzone = new Dropzone(id, {thumbnailWidth:"500px", acceptedFiles: "audio/*"});
	myDropzone.on("addedfile", function(file) {


		Array.prototype.map.call(document.querySelector(id).children, function(node){
			if(node.classList.contains("dz-message")){
				node.remove();
				document.getElementById('my-dropzone').style.backgroundImage = "none";
				document.getElementById('my-dropzone').style.paddingTop = "30vh";

			}

		});

		if (!file.type.match(/image.*/)) {
		 // This is not an image, so Dropzone doesn't create a thumbnail.
		 // Set a default thumbnail:
		 console.log("running")
		 jsmediatags.read(file, {
			 onSuccess: function(tag){
				 var image = tag.tags.picture;
				 if(image){
					console.log("hoge");
				 	var base64String = "";
					for (var i = 0; i < image.data.length; i++) {
					    base64String += String.fromCharCode(image.data[i]);
					}
					var base64 = `data:${image.format};base64,${window.btoa(base64String)}`;
						myDropzone.emit("thumbnail", file, base64);
				 }
			 }
		 });
	 }
	});

})









// yipan design
