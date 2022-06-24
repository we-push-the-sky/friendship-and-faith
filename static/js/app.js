
function togglePlay() {
	var video = document.querySelector("video");
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
	var video = document.querySelector("video");
	var toggleBtn = document.querySelector("#play-pause");
	var audio = document.querySelector("audio");
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
	var audio = document.querySelector("audio");
	//var toggleBtn = document.querySelector("#play-pause");
	//play video when el in view
	if(isInView('#audio')){
		audio.play();
		//toggleBtn.innerHTML = "Pause";
	} else {
		audio.pause();
		//toggleBtn.innerHTML = "Play";
	}
}

$(document).ready(function(e) {
	$('img[usemap]').rwdImageMaps();
	var inputForm = document.querySelector(".input-form");
	var submitBtn = document.querySelector("#submit-btn");
	var template = document.querySelector('#user-input-display');
	
	$('area').on('click', function(e) {
		e.preventDefault();
		var coords = e.currentTarget.coords.split(',');
		console.log(e.target, e.currentTarget, e)
		inputForm.style.position = 'absolute';
		// +25 is xoffsett and -21 is y offset 
		inputForm.style.left = Number(coords[0])+25+'px';
		inputForm.style.top = Number(coords[3])-21+'px';
		$(inputForm).toggleClass('show');
		//alert($(this).attr('alt') + ' clicked');
	});

	$('#submit-btn').on('click', function(e){
		e.preventDefault();
		var clone = template.content.cloneNode(true);
		var clonedDiv = clone.querySelector("span");

		var inputVal = document.querySelector("input").value;
		console.log("submitted", inputVal, inputForm);
		clonedDiv.textContent = inputVal;
		clonedDiv.style = inputForm.getAttribute('style');
		document.body.appendChild(clone);
		document.querySelector("input").value = "";
		$(inputForm).toggleClass('show');
	});

	timeoutID = setTimeout(() => {
		playMedia();
		clearTimeout(timeoutID);
	}, 1000);

});