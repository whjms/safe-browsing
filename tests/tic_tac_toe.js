var safeBrowsing = {
	getPopup : function() {
		return document.getElementById('safe-popup');
	},

	hidePopup : function() {
		this.getPopup().style.display = 'none';
	}
}


var xmlHttp = null;

xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", chrome.extension.getURL("tests/tic_tac_toe.html"), false );
xmlHttp.send( null );

var inject  = document.createElement("div");
inject.innerHTML = xmlHttp.responseText;
safeBrowsing.getPopup().insertBefore(inject, safeBrowsing.getPopup().firstChild);

var painted;
var content;
var winningCombinations;
var turn = 0;
var theCanvas;
var c;
var cxt;
var squaresFilled = 0;
var w;
var y;


	painted = new Array(9);
	content = new Array(9);
	winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

	for(var i = 0; i < 9; i++){
		painted[i] = 0;
		content[i] = '';
	}


canvas1.addEventListener('click', function(){
	console.log("Herro");
	canvasClicked(1);
});

canvas2.addEventListener('click', function(){
	console.log("Herro2");
	canvasClicked(2);
});

canvas3.addEventListener('click', function(){
	console.log("Herro3");
	canvasClicked(3);
});

canvas4.addEventListener('click', function(){
	console.log("Herro4");
	canvasClicked(4);
});

canvas5.addEventListener('click', function(){
	console.log("Herro5");
	canvasClicked(5);
});

canvas6.addEventListener('click', function(){
	console.log("Herro6");
	canvasClicked(6);
});

canvas7.addEventListener('click', function(){
	console.log("Herro7");
	canvasClicked(7);
});

canvas8.addEventListener('click', function(){
	console.log("Herro8");
	canvasClicked(8);
});

canvas9.addEventListener('click', function(){
	console.log("Herro9");
	canvasClicked(9);
});


function canvasClicked(canvasNumber){
	theCanvas = "canvas"+canvasNumber;
	c = document.getElementById(theCanvas);
	cxt = c.getContext("2d");

	if(painted[canvasNumber-1]==0){
		if(turn%2==0){
			cxt.beginPath();
			cxt.strokeStyle="white";
			cxt.moveTo(10,10);
			cxt.lineTo(40,40);
			cxt.moveTo(40,10);
			cxt.lineTo(10,40);
			cxt.stroke();
			cxt.closePath();
			content[canvasNumber-1] = 'X';
		}

		turn++;
		painted[canvasNumber-1] = 1;
		squaresFilled++;
		checkForWinners(content[canvasNumber-1]);

		dumbAI();

		if(squaresFilled==9){
			alert("The Trials is Over!");
			location.reload(true);
		}
	}

	else{
		alert("That Space is already Occupied Dumbass!")
	}

}

function checkForWinners(symbol){

	for(var j = 0; j < winningCombinations.length; j++){
		if(content[winningCombinations[j][0]]==symbol&&content[winningCombinations[j][1]]==symbol&&content[winningCombinations[j][2]]==symbol){
			alert(symbol+ "Won!");
			if(symbol == 'X'){
			safeBrowsing.hidePopup();
			}
			else{
			alert("You Lose Bye-Bye!");
			}
		}
	}

}

function dumbAI(){
	var x = Math.floor(Math.random()*8)+1;

	theCanvas = "canvas"+x;
	c = document.getElementById(theCanvas);
	cxt = c.getContext("2d");


	if(painted[x-1]==0){
		cxt.beginPath();
			cxt.strokeStyle="white";
			cxt.arc(25,25,20,0,Math.PI*2,true);
			cxt.stroke();
			cxt.closePath();
			content[x-1] = 'O';

		turn++;
		painted[x-1] = 1;
		squaresFilled++;
		checkForWinners(content[x-1]);
	}
	else{
		dumbAI();
	}


}

function lock_out(){
	y=confirm("Play Again?");
	if(y==true){
		alert("OKAY! ^^/>");
		location.reload(true);
	}
	else{
		alert("YOU SUCK!");
	}
}