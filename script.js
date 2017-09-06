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
				<div class="container">
        <div class="icon upvote"></div> <div class="icon downvote"> </div>
				<p> quality: <span class="quality">${objOfCards[key].quality}</span></p> </div>
				<hr>
				</article>`);
	}
}

var objOfCards = restoreCards();
reCreateCards();

//save button event listener (also runs on Enter key press)
$('.button').on('click', function(e){
	e.preventDefault();
	submitCard(e);
}
	);


function submitCard(e) {
	e.preventDefault();

	var storeCardValues = new StoreCard();

	$('.cardHolder').prepend(`<article id=${storeCardValues.id}>
					<h2 contenteditable="true"> ${storeCardValues.title} </h2> <div class="icon delete"></div>  <br>
					<h3 contenteditable="true"> ${storeCardValues.body} </h3> <br> 
         			<div class="container"> <div class="icon upvote"></div> <div class="icon downvote"> </div>
					<p> quality: <span class="quality">${storeCardValues.quality}</span></p> </div>
					<hr>
				</article>`);

	addCard();
	setLocalStorage();
	clearInputs();
};

function StoreCard(){
	var title = $('.title-input').val();
	var body = $('.body-input').val();

	this.title = title;
	this.body = body;
	this.quality = 'swill';
	this.id = Date.now();
}

function addCard(){
	var newCard = new StoreCard();
	objOfCards[newCard.id] = {
		'title': newCard.title,
		'body': newCard.body,
		'quality': newCard.quality
	}
	return newCard;
}

$('.title-input, .body-input').on('keyup', function(e) {
	if($('.title-input').val() && $('.body-input').val()) {
		$('.button').prop('disabled', false);
	}
	if(e.keyCode === 13 && ($('.title-input').val() && $('.body-input').val())){
		submitCard(e);
	}


});

$('.cardHolder').on('click', function(e) {
	e.preventDefault();
		var $currentArticle = $(e.target.closest('article'));
		var $currentId = $currentArticle.attr('id');
		var span = $($currentArticle).find('.quality');
	if(e.target.className === 'icon delete') {
		deleteCard($currentId,$currentArticle);
	}

	else if(e.target.className === 'icon upvote') {
		upvote(span,$currentId);
	}

	else if(e.target.className === 'icon downvote') {
		downvote(span,$currentId);
	}

	else if($(e.target).is('h2')){
		editTitle($currentArticle,$currentId,e);
	}

	else if($(e.target).is('h3')){
		editBody($currentArticle,$currentId,e);
	}
	setLocalStorage();

});

function deleteCard ($currentId,$currentArticle){
	delete objOfCards[$currentId];
	$currentArticle.remove();
	setLocalStorage();
}

function upvote(span,$currentId) {
	if (span.text() === 'swill'){
			span.text('plausible');
		}else {
			span.text('genius');
		}
	objOfCards[$currentId].quality = span.text();
}

function downvote(span, $currentId) {
	if (span.text() === 'genius'){
			span.text('plausible');
	}else {
		span.text('swill');
	}	
	objOfCards[$currentId].quality = span.text();
}

function editTitle($currentArticle,$currentId,e){
	$(e.target).on('blur', function(e){
		e.preventDefault();
		console.log('blur running');

		objOfCards[$currentId].title = $($currentArticle).find('h2').text();
			});	
}
function editBody($currentArticle,$currentId,e){
	$(e.target).on('blur', function(e){
		e.preventDefault();
		console.log('blur running');

		objOfCards[$currentId].body = $($currentArticle).find('h3').text();
			});
}

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


