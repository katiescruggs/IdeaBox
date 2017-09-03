//on page load
clearInputs();

var objOfObj = {};

//save button event listener (also runs on Enter key press)
$('.button').on('click', function(e) {
	e.preventDefault();

	//call Thomas's creation function here 
	//we could just use ($('.title-input').val(), $('.body-input').val()) as parameters?
	//or we could assign them to variables in this click function
	// var title = $('.title-input').val();
	// var body = $('.body-input').val();
	var storeCardValues = new StoreCard();

	$('.cardHolder').append(`<article id=${storeCardValues.id}>
					<h2 contenteditable="true"> ${storeCardValues.title} </h2> <div class="icon delete"></div>  <br>
					<h3 contenteditable="true"> ${storeCardValues.body} </h3> <br>
					<div class="icon upvote"></div> <div class="icon downvote"> </div>
					<p> quality: <span class="quality">${storeCardValues.quality}</span></p>
					<hr>
				</article>`);

	addCard();
	clearInputs();
});

var size = 0;

function StoreCard(){
	var title = $('.title-input').val();
	var body = $('.body-input').val();

	this.title = title;
	this.body = body;
	this.quality = 'swill';
	this.id();
}

StoreCard.prototype.id = function() {
	var counter = 0;
	for (key in objOfObj){
		if (objOfObj.hasOwnProperty(key)){
			counter++;
		}}
	this.id = counter;
};

function addCard(){
	var newCard = new StoreCard();
	objOfObj[newCard.id] = {
		'title': newCard.title,
		'body': newCard.body,
		'quality': newCard.quality
	}
	return newCard;
}

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

});

//return inputs to empty strings, focus to first input, & button to disabled
function clearInputs() {
	$('.title-input').val('');
	$('.body-input').val('');
	$('.title-input').focus();
	$('.button').prop('disabled', true);
}

var searchField = document.querySelector('.search-input');

searchField.addEventListener('keyup',searchFiltering);


function searchFiltering(){
	var searchValue = searchField.value.toUpperCase();
	var searchableItems = $('article');

	for (var i = 0 ; i < $('article').length ; i++){
		var currentArticle = searchableItems[i];
		if (currentArticle.innerHTML.toUpperCase().indexOf(searchValue) > -1){
			searchableItems[i].style.display = "";
		}else{
			searchableItems[i].style.display = "none";
		}
	}
}

