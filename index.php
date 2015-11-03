<!DOCTYPE html>
<html>
	<head>
		<title>Memory</title>
		<link rel="stylesheet" href="style.css">
		<link href='https://fonts.googleapis.com/css?family=Carter+One' rel='stylesheet' type='text/css'>
	</head>
	<body>
		

		<div class="playarea"></div>
		<!-- <div class="clearfix"></div> -->
		<div class="scoreboard">
			
			<!-- <div class="clearfix"></div> -->
			<div class="player">
				<h1 class="name1">Spelare 1:</h1>
				<h1 class="points1">0 p</h1>
				<div class="clearfix"></div>
			</div>
			<div class="player">
				<h1 class="name2">Spelare 2:</h1>
				<h1 class="points2">0 p</h1>
				<div class="clearfix"></div>
			</div>
			<h1 id="board"></h1>
			<div class="luigi"></div>
		</div>

<!-- 		 -->
		
	
		<div class="theEnd">
			<div class="winner"></div>
			<button id="reload">Spela igen!</button>
		</div>
		<div class="theBeginning">
			<div id="panel">
			    <input type="text" id="player1" placeholder="Namn spelare 1">
			    <input type="text" id="player2" placeholder="Namn spelare 2">
			    <button id="playButton">Play!</button></br>
			    
			</div>
		</div>

		<div id="sound_element"></div>
		<!-- 
		<button onClick="javascript:soundEffect(yippie.wav);">Play jBeep!</button> -->
                <!-- Sample: Using your WAV file:
                        <button onClick="javascript:jBeep('your.wav');">Play Wav!</button>
                -->
		



		<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
		<script src="https://cdn.rawgit.com/nnattawat/flip/v1.0.16/dist/jquery.flip.min.js"></script>
		<script src="mainPierre.js"></script>
	</body>
</html>
