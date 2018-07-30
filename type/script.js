
//HTML document needs to fully load before running js or errors may occur
window.onload=function() {

// Global Variables
// -------------------------------------------
var a = document.querySelector("#sub-button");
var restartbtn = document.querySelector("#restart");
var text = document.querySelector("#typing-box");
var textbtn = document.querySelector("#new-text");
var quoteurl = "https://talaikis.com/api/quotes/random/";
var minutes = 0, seconds=0, ms = 0; // starting value for the timer

// Function Defitions
// ------------------------------------------------
function sendRequest() {
	//console.log(restartbtn);
	var AJAXrequest = new XMLHttpRequest();
	AJAXrequest.open('GET', quoteurl);
	AJAXrequest.onload = function(){
		var AJAXdata = JSON.parse(AJAXrequest.responseText);
		renderHTML(AJAXdata);
	};
	AJAXrequest.send();
}

// changes the test text whenever the "new text" button is clicked
function renderHTML(data){
	console.log(data)
	document.querySelector("#quote-api").innerHTML = data.quote;
}

function logTextInput() {
	console.log(text.value);
}

// adds the leading zeros to the timer
function displayZero(time){
	if(time <= 9) {
		time = "0" + time;
	}
	return time;
}

// concatenates the different timer values with colons to display timer up to minutes
function runTimer(){
	document.querySelector(".timer").innerHTML= displayZero(minutes) + ":" + displayZero(seconds) + ":" + displayZero(ms);
	ms++;

	// time conversions
	if(seconds == "60"){
		seconds = "0";
		minutes++;
	}

	if(ms === 100){
		ms=0;
		seconds++;
	}
}

// checks when user begins typing, then calls runTimer to start the timer
function startTimer(){
	let textLength = text.value.length;
	if(textLength === 0){
		setInterval(runTimer, 10) // run function every hundred of a second
	}
}

// main()
// ----------------------------------------------------
//restartbtn.addEventListener("click", , false);
text.addEventListener("keyup", logTextInput, false);
text.addEventListener("keypress", startTimer, false);
textbtn.addEventListener("click", sendRequest, false);
}