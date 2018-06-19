/*
 General idea of implementation taken from :
 1. https://codepen.io/Meghh/pen/QmXPVK
 2. https://www.youtube.com/watch?v=c_ohDPWmsM0
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let array_star=[];
let seconds=00;
let minutes=00;
let secondsHTML=document.getElementById('seconds');
let minutesHTML=document.getElementById('minutes');
let cards=document.getElementsByClassName("card");
let faceUpCards=0;
let faceUpArray=[];
let numOfMoves=0;
let moves=document.querySelector("#moves");
let star=document.getElementsByClassName("fa fa-star");
let counter=0;
let cardCounter=[];
let timesup=[];
let interval;
const array=document.querySelector(".deck");
const allCards=document.querySelectorAll(".card");
const after_moves=" Move(s)";
const resetTimer=document.getElementById('restartButton');

// Shuffle function from http://stackoverflow.com/a/2450976
//Modified to for loop for my understanding
function shuffle(array) {
    var currentIndex, randomIndex;

   for (var currentIndex = array.children.length; currentIndex >= 0; currentIndex--) {
   	randomIndex=Math.floor(Math.random()*currentIndex);
   	array.appendChild(array.children[randomIndex]);
   };
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //adding eventlistener to each card
allCards.forEach(function init(card){
	card.addEventListener("click",function(){
		if(faceUpCards<2){
			if (
				card.classList.contains("open")==false &&
				card.classList.contains("show")==false &&
				card.classList.contains("match")==false
				) {
					faceUpCards++;
					card.classList.add("open","show");
					faceUpArray.push(card);
					clearInterval(interval);
					interval=setInterval(startTimer,1000);
					if (faceUpCards===2) {
						if (
							(faceUpArray[0].querySelector("i").classList.value==
							faceUpArray[1].querySelector("i").classList.value)==
							false
							) {
								faceUpArray[0].classList.add("mismatch");
								faceUpArray[1].classList.add("mismatch");
								numOfMoves++;
								moves.innerHTML=numOfMoves;
								stars();
								my_moves();
								timesup.push(setTimeout(function(){
									faceUpArray[0].classList.add("animate");
									faceUpArray[1].classList.add("animate");
								},1400))
								timesup.push(setTimeout(function(){
									faceUpArray[0].classList.remove("show");
									faceUpArray[0].classList.remove("animate");
									faceUpArray[0].classList.remove("open");
									faceUpArray[0].classList.remove("mismatch");
									faceUpArray[1].classList.remove("animate");
									faceUpArray[1].classList.remove("open");
									faceUpArray[1].classList.remove("show");
									faceUpArray[1].classList.remove("mismatch");
									faceUpArray=[];
									faceUpCards=0;
								},1800));
						}
						else {
							counter++;
							cardCounter.push(counter);
							timesup.push(setTimeout(function(){
								faceUpArray[0].classList.remove("open");
								faceUpArray[0].classList.remove("show");
								faceUpArray[1].classList.remove("open");
								faceUpArray[1].classList.remove("show");
								faceUpArray[0].classList.add("complete");
								faceUpArray[0].classList.add("match");
								faceUpArray[1].classList.add("complete");
								faceUpArray[1].classList.add("match");
								faceUpArray[0].classList.add("animation");
								faceUpArray[1].classList.add("animation");
								numOfMoves++;
								moves.innerHTML=numOfMoves;
								stars();
								my_moves();
							},1000));
							timesup.push(setTimeout(function(){
								faceUpArray[0].classList.add("deanimation");
								faceUpArray[1].classList.add("deanimation");
								faceUpArray[0].classList.remove("animation");
								faceUpArray[1].classList.remove("animation");
								faceUpArray=[];
								faceUpCards=0;
							},1750));
						}
					}
				}
			}
		})
	});
//checking if total number of cards are 8 and then clearing time interval
document.addEventListener('click',function(){
	if(cardCounter.length===8){
		clearInterval(interval);
	}
});
//reseting time on hitting restart button
resetTimer.addEventListener('click',function(){
	clearInterval(interval);
	seconds='00';
	minutes='00';
	secondsHTML.innerHTML=seconds;
	minutesHTML.innerHTML=minutes;
});
//function to start timer again
function startTimer(){
	seconds++;
	if (seconds<10) {
		secondsHTML.innerHTML='0'+seconds;
	}
	if (seconds>9) {
		secondsHTML.innerHTML=seconds;
	}
	if (seconds>59) {
		minutes++;
		minutesHTML.innerHTML='0'+minutes;
		seconds=0;
		secondsHTML.innerHTML='0'+seconds;
	}
	if (minutes>10) {
		minutesHTML.innerHTML=minutes;
	}
}
//sweet alert to display message as game gets over 
//idea of its usage taken from https://codepen.io/mkryad/pen/aYdyEV
function gameOver(){
	swal({
		allowEscapeKey:false,
		allowOutsideClick: false,
		title:'Great! '+starMessage(),
		text:'Hey there...You used ' + numOfMoves + ' moves and ' + document.getElementById('minutes').innerHTML
		+ ':' + document.getElementById('seconds').innerHTML + '!',
		type:'success',
		confirmButtonText:'Play again!',
	})
	
};
//setting cardCounter again to zero as number of card get full i.e 8
array.addEventListener('click',function(e){
	if (cardCounter.length==8) {
		setTimeout(function(){
			gameOver();
			cardCounter=0;
		},2500);
	}
});
//adding event listener on clicking restart button
document.getElementById('restartButton').addEventListener('click',function(e){
	let hold_array=Array.from(document.getElementsByClassName('card'));
	for (each of hold_array) {
		each.className='card';
	}
	for (var i = 0; i < timesup.length; i++) {
		clearTimeout(timesup[i]);
	}
	array_star=[];
	faceUpArray=[];
	counter=0;
	cardCounter=[];
	faceUpCards=0;
	numOfMoves=0;
	my_moves();
	shuffle(array);
	for (var i = 0; i < 3; i++) {
		star[i].style.color='orange';
	};
});
//function to set moves
function my_moves(){
	document.getElementById('moves').innerHTML=numOfMoves;
	document.getElementById('setMoves').innerHTML=after_moves;
};
//function to decrease star rating
function stars(){
	if (numOfMoves==15) {
		star[2].style.color='#ccc';
	}
	if (numOfMoves==24) {
		star[1].style.color='#ccc';
	}
};
//function to display star message used when game is over
function starMessage(){
	for (var i = 0; i < 3; i++) {
		if (star[i].style.color=='orange') {
			array_star.push(i);
		}
	}
	return('You scored '+array_star.length+' star(s)');
};
