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

	console.log('title= ' + title + ', body= ' + body);
	clearInputs();
});

//input event listeners (enable button only when both inputs have values)
$('.title-input, .body-input').on('keyup', function(e) {
	if($('.title-input').val() && $('.body-input').val()) {
		$('.button').prop('disabled', false);
	}
});

//return inputs to empty strings, focus to first input, & button to disabled
function clearInputs() {
	$('.title-input').val('');
	$('.body-input').val('');
	$('.title-input').focus();
	$('.button').prop('disabled', true);
}

