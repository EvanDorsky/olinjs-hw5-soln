(function() {
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
			var $tweet = $(tweet).addClass('new');
			$('#tweet-container').prepend($tweet);
			setTimeout(function() {
				$tweet.removeClass('new');
			}, 200);

			$tweetInput.val('').focus();
		})
		.error(console.error);
	})
})()