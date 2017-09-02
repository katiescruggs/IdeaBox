//on page load
clearInputs();

//save button event listener (also runs on Enter key press)
$('.button').on('click', function(e) {
	e.preventDefault();

	//call Thomas's creation function here 
	//we could just use ($('.title-input').val(), $('.body-input').val()) as parameters?
	//or we could assign them to variables in this click function
	var title = $('.title-input').val();
	var body = $('.body-input').val();

	$('.cardHolder').append(`<article>
					<h2 contenteditable="true"> ${body} </h2> <div class="icon delete"></div>  <br>
					<h3 contenteditable="true"> ${title} </h3> <br>
					<div class="icon upvote"></div> <div class="icon downvote"> </div>
					<p> quality: <span class="quality">swill</span></p>
					<hr>
				</article>`);


	clearInputs();
});

//input event listeners (enable button only when both inputs have values)
$('.title-input, .body-input').on('keyup', function(e) {
	if($('.title-input').val() && $('.body-input').val()) {
		$('.button').prop('disabled', false);
	}
});

//event listener for .cardHolder section so that we can use event bubbling
$('.cardHolder').on('click', function(e) {
	e.preventDefault();
	if(e.target.className === 'icon delete') {
		e.target.closest('article').remove();
		//will need to remove from local storage here as well
	}

	if(e.target.className === 'icon upvote') {
		var article = $(e.target.closest('article'));
		var span = $(article).find('.quality');
		
		if (span.text() === 'swill'){
			span.text('plausible');
		}else {
			span.text('genius');	
		}
}

	if(e.target.className === 'icon downvote') {
		var article = $(e.target.closest('article'));
		var span = $(article).find('.quality');
		
		if (span.text() === 'genius'){
			span.text('plausible');
		}else {
			span.text('swill');	
		}
}
		
		// console.log(span.text());

	// 	if(console.log(span.text)){
	// 	//I can't figure out how to change the text of span based on what the text says right now
	// 	}
	// }
	// if(e.target.className === 'icon downvote') {
	// 	console.log('downvote');
	// }

});

//return inputs to empty strings, focus to first input, & button to disabled
function clearInputs() {
	$('.title-input').val('');
	$('.body-input').val('');
	$('.title-input').focus();
	$('.button').prop('disabled', true);
}

