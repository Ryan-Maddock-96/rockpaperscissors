var button = document.querySelectorAll(".item")
	step1 = document.getElementById("step1"),
	step2 = document.getElementById("step2"),
	score = document.getElementById("updateScore");
	
	if(!localStorage.getItem("savedScore") == 0 ){
		score.innerHTML = localStorage.getItem('savedScore');
	}
	
	console.log(localStorage.getItem('savedScore'));

function showSelected(selected) {
	var userOptions = document.querySelectorAll('.userOption');
	
	for(var x = 0; x < userOptions.length; x++) {
		if (selected == userOptions[x].getAttribute('data-action')) {
			userOptions[x].style.display = "block";
			
		}
	}
}

function returnRandomNum (max){
	return Math.floor(Math.random() * Math.floor(max));
}

function handleCompsTurn(selected){
		var compOptions = document.querySelectorAll('.compOption');
	
	for(var x = 0; x < compOptions.length; x++) {
		if (selected == compOptions[x].getAttribute('data-actionnum')) {
			compOptions[x].style.display = "block";
			
		}
	}
}

function handleWhoWon(selected, compSelected){
	
	var newScore = parseInt(score.innerHTML,10),
		result = document.createElement("h1"),
		highlight = document.createElement("div");
		
		highlight.classList.add('circle');
		
	if((selected == 'paper' && compSelected == 0) || (selected == 'scissors' && compSelected == 1) || (selected == 'rock' && compSelected == 2)){
		result.innerHTML = "ITS A DRAW!";
	}
	else if((selected == 'paper' && compSelected == 2) || (selected == 'scissors' && compSelected == 0) || (selected == 'rock' && compSelected == 1)) {
		newScore++;
		result.innerHTML = "YOU WIN!";
		highlight.classList.add(selected);
		document.getElementById('userSelected').append(highlight);
	}else {
		result.innerHTML = "YOU LOSE";
		highlight.classList.add("option_" + compSelected);
		document.getElementById('compSelected').append(highlight);
	}
	
	
	document.getElementById("results").prepend(result);
	
	document.getElementById("playAgain").style.display = 'block';
	document.getElementById("playAgain").classList.add('fade-in');
	
	score.innerHTML = newScore;
	
	localStorage.setItem('savedScore', newScore);
}



//Handle computer selection
for(var i = 0; i < button.length; i++){
	
	button[i].addEventListener('click', function(){
		var selected = this.getAttribute("data-action"),
			compSelected = returnRandomNum(3);
			
		step1.classList.add("fade-out");
		
		setTimeout(function(){ 
			step1.style.display = "none" 
			
			step2.style.display = "flex";
			step2.classList.add('fade-in');
			
			showSelected(selected);
		}, 200);
		
		
		setTimeout(function (){
			
			
			handleCompsTurn(compSelected);
			
			
		}, 1000);
		
		
		setTimeout(function(){
			handleWhoWon(selected, compSelected);
		}, 1300);
		
	});
	
	
	console.log(button[i].getAttribute('data-action'));
}

document.getElementById("playAgain").addEventListener('click', function(){
	location.reload();
});

document.getElementById('showRules').addEventListener('click', function(){
	document.getElementById('modalBG').style.display = 'block';
	document.getElementById('rulesPopout').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', function() {
	document.getElementById('modalBG').style.display = 'none';
	document.getElementById('rulesPopout').style.display = 'none';
});

document.getElementById('resetScore').addEventListener('click', function() {
	localStorage.clear();
	location.reload();
});