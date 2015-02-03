(function() {
	var $flash = function($el, className) {
		$el.addClass(className);
		setTimeout(function() {
			$el.removeClass(className);
		}, 200);

		return $el
	}
	
	var $tweetForm = $('#tweet-form');
	// binding
	$tweetForm.submit(function(event) {
		event.preventDefault();

		var $tweetInput = $tweetForm.find('[name="tweettext"]');
		var text = $tweetInput.val();

		$.post("/tweet/create", {
			tweettext: text
		})
		.success(function(tweet) {
			$('#tweet-container')
			.prepend($flash($(tweet), 'new'));

			$tweetInput.val('').focus();
		})
		.error(console.error);
	})
})()