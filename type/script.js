//HTML document needs to fully load before running js or errors may occur
window.onload=function() {

// Global Variables
// -------------------------------------------
const subbtn = document.querySelector("#sub-button")
const restartbtn = document.querySelector("#restart");
const textbtn = document.querySelector("#new-text");
const text = document.querySelector("#typing-box");
const dropdownChoice = document.querySelector(".select-box");

var testText = document.querySelector("#quote-api");
var APIurl = " "; // change the API url to request from based on user input
var minutes = 0, seconds = 0, ms = 0; // starting value for the timer
var alertMessage = "Congratulations, you completed the test in " + minutes.value + " minutes and " + seconds + "." + ms + " seconds";
var interval;
var AJAXrequest;
var AJAXdata;

// Function Defitions
// ------------------------------------------------
function dropdownSelection() {
	console.log(dropdownChoice.value);
	
	switch(dropdownChoice.value){
		case '1':
			APIurl = "https://talaikis.com/api/quotes/random/";
			break;
		case '2':	
			APIurl = " ";
			//createRandomText();
			break;
		case '3':
			APIurl = " ";
			break;
		}
}

function changeTestText() {
	//console.log(restartbtn);
	restartTest();
	dropdownSelection();

	if(dropdownChoice.value == '1'){
		AJAXrequest = new XMLHttpRequest();
		AJAXrequest.open('GET', APIurl);
		AJAXrequest.onload = function(){
			testText.innerHTML = JSON.parse(AJAXrequest.responseText).quote;
			//AJAXdata = JSON.parse(AJAXrequest.responseText);
			//renderHTML(AJAXdata);
		};
		AJAXrequest.send();
	}
	
	else if(dropdownChoice.value == '2')
		createRandomText();
}

// changes the test text whenever the "new text" button is clicked
function renderHTML(data){
	//console.log(data);
	if(dropdownChoice.value == '1')
		testText.innerHTML = data.quote;
	else if(dropdownChoice.value == '2')
		createRandomText();
}

// check if input text equals test text, then changes border color accordingly
function checkStringEquality() {
//	console.log(AJAXdata.quote);
//	console.log(text.value);

	let textInput = text.value;
	let completeTestText = document.querySelector("#quote-api").innerHTML;
	let parsedTestText = document.querySelector("#quote-api").innerHTML.substring(0,textInput.length);
	console.log(parsedTestText);	

	//console.log(parsedText);

	if(textInput == completeTestText){
		text.style.border = "6px solid green";
		clearInterval(interval);
		alert(alertMessage);
	}
		else if(textInput == parsedTestText){
			text.style.border = "6px solid blue";
		}
		else{
			text.style.border = "8px solid red";
		}
}

// adds the leading zeros to the timer when they're single digit
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
		interval = setInterval(runTimer, 10) // run function every hundred of a second
	}
}

// reset timer and input box when button is pressed
function restartTest(){
	clearInterval(interval);
	document.querySelector(".timer").innerHTML = "00:00:00";
	text.value = "";
	minutes = 0; seconds = 0; ms = 0;
	text.style.border = "6px solid grey";
}

// function creates a string a random alphanumberic characters
// change the value of the second parameter of the for loop to control length
function createRandomText() {
  var text2 = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 50; i++) {
   		 text2 += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	console.log(text2);
	document.querySelector("#quote-api").innerHTML = text2;
}


// main()
// ----------------------------------------------------
text.addEventListener("keyup", checkStringEquality, false);
text.addEventListener("keypress", startTimer, false);
textbtn.addEventListener("click", changeTestText, false);
restartbtn.addEventListener("click", restartTest, false);
//restartbtn.addEventListener("click", createRandomText, false);
}
