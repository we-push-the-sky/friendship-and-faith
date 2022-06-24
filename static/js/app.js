
function togglePlay() {
	var video = document.querySelector("#video-player");
	var toggleBtn = document.querySelector("#play-pause");
	if (video.paused) {
	   video.play();
	   toggleBtn.innerHTML = "Pause";
	 } else {
	   video.pause();
	   toggleBtn.innerHTML = "Play";
	 }
}

function isInView(domRef) {
	var box = document.querySelector(domRef);
	var rect = box.getBoundingClientRect();

	var isInViewport = rect.left >= 0 &&
	        rect.left <= (window.innerWidth || document.documentElement.clientWidth);

	return isInViewport;
}

function playMedia() {
	var video = document.querySelector("#video-player");
	var toggleBtn = document.querySelector("#play-pause");
	var audio = document.querySelector("#audio-player");
	//play video when el in view
	if(isInView('#video')){
		video.play();
		toggleBtn.innerHTML = "Pause";
	} else {
		video.pause();
		toggleBtn.innerHTML = "Play";
	}

	if(isInView('#audio')){
		audio.play();
		//toggleBtn.innerHTML = "Pause";
	} else {
		audio.pause();
		//toggleBtn.innerHTML = "Play";
	}
}

function playAudio() {
	var audio = document.querySelector("#audio-player");
	//var toggleBtn = document.querySelector("#play-pause");
	//play video when el in view
	if(isInView('#audio')){
		audio.play();
		//toggleBtn.innerHTML = "Pause";
	} else {
		audio.pause();
		//toggleBtn.innerHTML = "Play";
	}
}{

}

$(document).ready(function(e) {

	timeoutID = setTimeout(() => {
		playMedia();
		clearTimeout(timeoutID);
	}, 1000);

});