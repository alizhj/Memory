var clicked = [], pics = [], players = [], happySounds = [], badSounds = [];
var opened = 0, points= 0,timerCount = 0, hasWinner = 0, playerTurn = 0;
var clickable = true;
var card1, card2, timer, currentPlayer;
var player1Name="" , player2Name="", turn = "";

	// array med alla bilder
	pics.push({name:'mario.jpeg', id:1 }); 
	pics.push({name:'mario.jpeg', id:1 });
	pics.push({name:'bowser.jpeg', id:2 });
	pics.push({name:'bowser.jpeg', id:2 });
	pics.push({name:'shell.jpeg', id:3 });
	pics.push({name:'shell.jpeg', id:3 });
	pics.push({name:'brun.jpeg', id:4 });
	pics.push({name:'brun.jpeg', id:4 });
	pics.push({name:'yoshi.jpeg', id:5 });
	pics.push({name:'yoshi.jpeg', id:5 });
	pics.push({name:'peach.jpeg', id:6 });
	pics.push({name:'peach.jpeg', id:6 });
	pics.push({name:'coin.jpeg', id:7 });
	pics.push({name:'coin.jpeg', id:7 });
	pics.push({name:'princess.jpeg', id:8 });
	pics.push({name:'princess.jpeg', id:8 });
	pics.push({name:'toad.jpeg', id:9 });
	pics.push({name:'toad.jpeg', id:9 });
	pics.push({name:'luigi.jpeg', id:10 });
	pics.push({name:'luigi.jpeg', id:10 });
	pics.push({name:'flower.jpeg', id:11 });
	pics.push({name:'flower.jpeg', id:11 });
	pics.push({name:'skeleton.jpeg', id:12 });
	pics.push({name:'skeleton.jpeg', id:12 });

	//array med glada ljud
	happySounds.push('yippie.wav', 'allright.wav', 'wheehe.wav', 'wooho.wav');

	//array med arga ljud
	badSounds.push('ow-wow.wav', 'owwow.wav', 'bowserfire.wav', 'doorstop.wav');



$(document).ready(function() {
	//gömmer rutan som visas när spelet är slut
	$('.theEnd').hide();

	//knappen som startar spelet
	$("#playButton").click(function (){

	    player1Name = $("#player1").val();
	    player2Name = $("#player2").val();

	    if(player1Name=="" || player2Name==""){
	        alert("Please set player all the names.");
	        return;
	    }
	    else {
	    	$('#panel').hide();
			$('.theBeginning').hide();
	    	//hämtar ljud när spelet sätts igång
	    	$('#sound_element').html(
				"<embed src='sound/hereWeGo.wav' hidden=true autostart=true loop=false>"
			);	
	    }

		//array med spelare
		players.push({player:player1Name, score:0});
		players.push({player:player2Name, score:0});

		//hämtar funktonen för att sätta aktuell spelare
	    currentPlayer = players[setTurn()];

	    //hämtar funktionen som sätter namnen
	    setName();
	
	});

	//shufflar korten genom functionen shuffle
	Shuffle(pics);

	//skriver ut korten i playarea genom funktionen showCards
	showCards();

    //hämtar funktionen som flippar korten
	flip('.card');


	$('.card').click(function(){

		$(this).addClass('active');
		
		if(clickable === false)
			return;

		clicked[opened] = $(this);
		//console.log(opened);
		
		if(opened === 0){
			opened++;
			return;
		}
			
		var card1 = $(clicked[opened]);
		var card2 = $(clicked[opened-1]);

		//om det är ett par
		if ( card1.data('imgid') == card2.data('imgid')){
			happySound();
			//animationen på parade kort
			pair(card1, card2);
			updateScore();
			boardMsg(currentPlayer.player + "'s tur!");
		}

		else {
			badSound();
			//flippar tilbaka oäkta par
			noPair(card1, card2);
			nextPlayer();
			boardMsg(currentPlayer.player + "'s tur!");

		}
	});
	
});

//funktionen gör så att det blir nästa spelares tur
function nextPlayer() {
	playerTurn++;

	if(playerTurn >= players.length) {
		playerTurn = 0;
	}
	currentPlayer = players[playerTurn];
}

//funktionen uppdaterar poängen för den aktuella spelaren
function updateScore() {
	for (var i = 0; i<players.length; i++) {

		//points = 0 + 1 första på första playern, andra gången arrayen gås igenom har i plussats på med i så
		//points = 1+1 på andra playern i loopen
	 	$('.points'+(i+1)).html( players[i].score );	
	};
}

//funktion för att shuffla korten
function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

//läser av arrayen och skriver ut dom i playarea
function showCards() {
	
    for (var i = 0; i<pics.length; i++) {
		var id = pics[i].id;

   		//gör så att bilderna visas i rätt div och ger den ett unikt id med data-imgid
   		var contentCard ='<div class="card" data-imgid="'+ id +'"><div class="front"><img src="img/cover.jpeg" /></div><div class="back"><img src="img/' + pics[i].name + '" /></div>';
		
		//skriver ut varje kort i playarea
      	$(".playarea").append(contentCard);

    }
}

//functionen gör så att man flippar korten när man klickar på dom 
function flip(card) {
	$(card).flip({
		trigger: 'click',
		axis: 'y',
		reverse: false
	});
}

//functionen fade:ar ut paret med animation
function pair(card1, card2) {
	currentPlayer.score++;

	setTimeout( function() {
		//de två korten som bildar ett par fade:ar ut
		card1.fadeTo(300, 0.3).removeClass('card');
		card2.fadeTo(300, 0.3).removeClass('card');
	
		opened=0;
	},300);

	if($('.active').length == 24) {
		 
		 $('#sound_element').html(
			"<embed src='sound/gameEnd.wav' hidden=true autostart=true loop=false>"
	);
		 setTimeout(winner, 7500);
		
	}
}

//funktionen vänder tillbaka korten om de inte är ett par och tar bort klassen active
function noPair(card1, card2) {
	
	setTimeout( function() {		
		card1.flip('toggle').removeClass('active');
		card2.flip('toggle').removeClass('active');

		opened=0;
	}, 700);
}

//funktionen slumpar fram vem som ska börja spela
function setTurn(){
    var r = Math.floor((Math.random() * 2));
	boardMsg( players[r].player + "'s tur!");
    return r;
}

//funktionen sätter in den text som ska visas i diven med id board
function boardMsg(x){
    return $("#board").text(x);
}

//funktionen sätter in de namn man skrivit i input i scoreboarden
function setName() {
	$('.name1').html(player1Name + ":");
	$('.name2').html(player2Name + ":");
}

//funktionen räknar ut vem som vunnit
function winner() {
	$('.theEnd').show();

	if(players[0].score > players[1].score) {
		console.log(players[0].player + ' vann');
		$('.winner').html('Grattis ' + '</br>' + players[0].player + '!');
	}

	else if (players[0].score == players[1].score) {
		console.log('Det blev oavgjort');
		$('.winner').html('Grattis' + '</br>' + ' BÅDA vann!');
	}

	else {
		console.log(players[1].player + ' vann');
		$('.winner').html('Grattis ' + '</br>' + players[1].player + '!');
	}

	//startar om spelet när man trycker på knappen spela igen
	$('#reload').click(function() {
	    location.reload();
	});
}

//funktionen slumpar fram ljud från arrayen happySounds
function happySound() {
	var sound = happySounds[Math.floor(Math.random() * happySounds.length)];
	console.log(sound);
	$('#sound_element').html(
		"<embed src='sound/" + sound + "' hidden=true autostart=true loop=false>"
	);
}

//funktionen slumpar fram ljud från arrayen badSounds
function badSound() {
	var sound = badSounds[Math.floor(Math.random() * badSounds.length)];
	$('#sound_element').html(
		"<embed src='sound/" + sound + "' hidden=true autostart=true loop=false>"
	);
}


