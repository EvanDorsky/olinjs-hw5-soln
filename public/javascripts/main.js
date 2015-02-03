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
			$('#tweet-container').prepend(tweet);

			$tweetInput.val('').focus();
		})
		.error(console.error);
	})
})()