//HTML document needs to fully load before running js or errors may occur
window.onload=function() {

// Global Variables
// -------------------------------------------
const subbtn = document.querySelector("#sub-button")
const restartbtn = document.querySelector("#restart");
const textbtn = document.querySelector("#new-text");
const text = document.querySelector("#typing-box");
const dropdownChoice = document.querySelector(".select-box");
const wpmHTML = document.querySelector(".WPM");
const cpmHTML = document.querySelector(".CPM");

var testText = document.querySelector("#quote-api");
var APIurl = " "; // change the API url to request from based on user input
var minutes = 0, seconds = 0, ms = 0; // starting value for the timer
var alertMessage = "Congratulations, you completed the test in "  + minutes + " minutes and " + seconds + "." + ms + " seconds";
var interval;
var APItextData = "abc";
var WPM = 0;
var CPM = 0;
var numWords = 0;


// Function Defitions
// -------------------------------------------------------
function dropdownSelection() {
	console.log(dropdownChoice.value);
	
	switch(dropdownChoice.value){
		case 'quote':
			APIurl = "https://talaikis.com/api/quotes/random/";
			break;
		case 'alphanumeric':	
			APIurl = "https://talaikis.com/api/quotes/random/";
			break;
		case 'paragraph':
			APIurl = "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1";
			break;
		case 'jokes':
			APIurl = "https://geek-jokes.sameerkumar.website/api";
			break;
		}
}

// check if input text equals test text, then changes border color accordingly
function checkStringEquality() {
	let textInput = text.value;
	let completeTestText = testText.innerHTML;
	let parsedTestText = testText.innerHTML.substring(0,(textInput.length));

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

	displayWPM_and_CPM(minutes, seconds);

	// time conversions
	if(seconds == "60"){
		seconds = "0";
		minutes++;
	}

	if(ms === 100){
			ms=0;
		seconds++;
		//console.log(seconds);
	}
}

// counts the number of words by counting spaces (may be slightly inaccurate)
// - have not accounted for backspaces (will add an extra word if included a space)
//   and last word of the entire text (ends with a period, but so do all sentences)
function countWords(){
	let textLength = text.value.length;
	// create a substring that checks if each new key typed is a space	
	if(text.value.substring((textLength-1), (textLength)) == " "){
		numWords++;
		console.log(numWords);
	}
}

function displayWPM_and_CPM(mins, secs){
	let totalSeconds = (mins*60) + secs;
	let textInput = text.value;
	let numChars = textInput.length;
	let wpmHTML2 = "CPM: " + CPM;
	let cpmHTML2 = "WPM: " + WPM;
	CPM = Math.floor((numChars / totalSeconds) * 60); // characters per min
	WPM = Math.floor((numWords / totalSeconds) * 60); // words per min
	wpmHTML.innerHTML = wpmHTML2;
	cpmHTML.innerHTML = cpmHTML2;	
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
	wpmHTML.innerHTML = "WPM: 00";
	cpmHTML.innerHTML = "CPM: 00";
}

// function creates a string a random alphanumberic characters
// change the value of the second parameter of the for loop to control length
function createRandomText() {
  let randomText = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 50; i++) {
   		 randomText += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	console.log(randomText);
	testText.innerHTML = randomText;
}

function changeTestText() {
	restartTest();

	// changes innerHTML based on what is selected from the dropdown menu
	if(dropdownChoice.value == 'quote')
		testText.innerHTML = APItextData.quote;
	else if(dropdownChoice.value == 'alphanumeric')
		createRandomText();
	else if(dropdownChoice.value == 'paragraph')
		testText.innerHTML = APItextData;
	else if(dropdownChoice.value == 'jokes')
		testText.innerHTML = APItextData;
}

// changes the test text whenever the "new text" button is clicked
function renderHTML(callback){
	dropdownSelection();
	let AJAXrequest = new XMLHttpRequest();
	AJAXrequest.onload = function(){	
		APItextData = JSON.parse(AJAXrequest.responseText);
		console.log(APItextData);
		callback();
	};
	AJAXrequest.open('GET', APIurl);
	AJAXrequest.send();
}

// main()
// ----------------------------------------------------
text.addEventListener("keyup", checkStringEquality, false);
text.addEventListener("keypress", startTimer, false);
text.addEventListener("keyup", countWords, false);
textbtn.addEventListener("click", function(){ renderHTML(changeTestText)});
restartbtn.addEventListener("click", restartTest, false);
}
