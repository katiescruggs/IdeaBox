//on page load

clearInputs();


function restoreCards(){
	var restoredCards = JSON.parse(localStorage.getItem('storedObject')) || {};
	return restoredCards;
}

function reCreateCards(){
	for (key in objOfCards){
		$('.cardHolder').prepend(`<article id=${key}>
				<h2 contenteditable="true"> ${objOfCards[key].title} </h2> <div class="icon delete"></div>  <br>
				<h3 contenteditable="true"> ${objOfCards[key].body} </h3> <br>
				<div class="icon upvote"></div> <div class="icon downvote"> </div>
				<p> quality: <span class="quality">${objOfCards[key].quality}</span></p>
				<hr>
				</article>`);
	}
}

var objOfCards = restoreCards();
reCreateCards();

//save button event listener (also runs on Enter key press)
$('.button').on('click', function(e) {
	e.preventDefault();

	var storeCardValues = new StoreCard();

	$('.cardHolder').prepend(`<article id=${storeCardValues.id}>
					<h2 contenteditable="true"> ${storeCardValues.title} </h2> <div class="icon delete"></div>  <br>
					<h3 contenteditable="true"> ${storeCardValues.body} </h3> <br>
					<div class="icon upvote"></div> <div class="icon downvote"> </div>
					<p> quality: <span class="quality">${storeCardValues.quality}</span></p>
					<hr>
				</article>`);

	addCard();
	setLocalStorage();
	clearInputs();
});

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
	for (key in objOfCards){
		if (objOfCards.hasOwnProperty(key)){
			counter++;
		}}
	this.id = counter;
};

function addCard(){
	var newCard = new StoreCard();
	objOfCards[newCard.id] = {
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
		var $currentArticle = $(e.target.closest('article'));
		var $currentId = $currentArticle.attr('id');
		var span = $($currentArticle).find('.quality');
	if(e.target.className === 'icon delete') {
		delete objOfCards[$currentId];
		$currentArticle.remove();
		setLocalStorage();
	}

	if(e.target.className === 'icon upvote') {
		if (span.text() === 'swill'){
			span.text('plausible');
		}else {
			span.text('genius');
		}
	
	}

	if(e.target.className === 'icon downvote') {
		if (span.text() === 'genius'){
			span.text('plausible');
		}else {
			span.text('swill');
		}		
	}
		objOfCards[$currentId].quality = span.text();

	if($(e.target).is('h2')){
		$(e.target).on('blur', function(e){
		e.preventDefault();
		console.log('blur running');
		var $currentArticle = $(e.target.closest('article'));
		var $currentId = $currentArticle.attr('id');

		objOfCards[$currentId].title = $($currentArticle).find('h2').text();
			});
	}

	if($(e.target).is('h3')){
		$(e.target).on('blur', function(e){
		e.preventDefault();
		console.log('blur running');
		var $currentArticle = $(e.target.closest('article'));
		var $currentId = $currentArticle.attr('id');

		objOfCards[$currentId].body = $($currentArticle).find('h3').text();
			});
	}
	setLocalStorage();

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
	var searchableItems = $('h2, h3');

	for (var i = 0 ; i < $('article').length ; i++){
		var currentArticle = searchableItems[i];
		if (currentArticle.innerHTML.toUpperCase().indexOf(searchValue) > -1){
			$('article')[i].style.display = "";
		}else{
			$('article')[i].style.display = "none";
		}
	}
}

function setLocalStorage(){
	var jsonObject = JSON.stringify(objOfCards);
	localStorage.setItem('storedObject',jsonObject);
	console.log('reset local storage value');
}


