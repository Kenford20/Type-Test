
//HTML document needs to fully load before running js or errors may occur
window.onload=function() {

// Global Variables
// -------------------------------------------
var timer = document.querySelector("#sub-button");
var restartbtn = document.querySelector("#restart");
var text = document.querySelector("#typing-box");
var textbtn = document.querySelector("#new-text");
var quoteurl = "https://talaikis.com/api/quotes/random/";

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

function renderHTML(data){
	console.log(data)
	document.querySelector("#quote-api").innerHTML = data.quote;
	// add the quote from api stored in a var in place of "abcd"
}

function logTextInput() {
	console.log(text);
	console.log(text.value);
}


// main()
// ----------------------------------------------------
//restartbtn.addEventListener("click", , false);
text.addEventListener("keyup", logTextInput, false);
textbtn.addEventListener("click", sendRequest)
}