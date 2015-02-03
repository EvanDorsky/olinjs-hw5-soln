(function() {
	var $tweetForm = $('#tweet-form');
	// binding
	$tweetForm.submit(function(event) {
		event.preventDefault();

		var text = $tweetForm.find('[name="tweettext"]').val();

		$.post("/tweet/create", {
			tweettext: text
		})
		.success(function(tweet) {
			$('#tweet-container').prepend(tweet);

			$tweetForm.find('[name="tweettext"]').val('');
		})
		.error(console.error);
	})
})()