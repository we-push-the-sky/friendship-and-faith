
function togglePlay() {
	var video = document.querySelector("#video-player");

	if (video.paused) {
	   video.play();

	 } else {
	   video.pause();

	 }
}

function isInView(domRef) {
	var box = document.querySelector(domRef);
	var rect = box.getBoundingClientRect();

	var isInViewport = rect.left >= 0 &&
	        rect.left <= (window.innerWidth || document.documentElement.clientWidth);

	return isInViewport;
}

function sliderSlided() {
	var video = document.querySelector("#video-player");
	const audioPlayer = OpenPlayerJS.instances['audio-player'];
	var audio = document.querySelector("#audio-player");
	var interactiveEmbed = document.querySelector('iframe');
	var bannerImg = document.querySelector('#banner .banner-img');
	var credits1 = document.querySelector('#credits-1');
	var credits2 = document.querySelector('#credits-2');
	var scrollOptions = {behavior: "smooth", block: "center", inline: "center"}

	//play video when el in view
	if(isInView('#video')){
		video.scrollIntoView(scrollOptions);
		video.play();
		gtag('event', 'video_play', {'method': 'Google'});

	} else {
		video.pause();

	}

	if(isInView('#audio')){
		audio.scrollIntoView(scrollOptions);
		audioPlayer.play();
		gtag('event', 'audio_play', {'method': 'Google'});

	} else {
		audioPlayer.pause();
	}

	if(isInView('#interactive-img')){
		interactiveEmbed.scrollIntoView(scrollOptions);
	}

	if(isInView('#credits-1')){
		credits1.scrollIntoView();
	}
	if(isInView('#credits-2')){
		credits2.scrollIntoView();
	}

	if(isInView('#testimonials')){
		
		_.debounce(initGsheet(), 1000, false);
	}

	if(isInView('#audio-testimonials')) {
		_.debounce(initAudioGsheet(), 1000, false);
	}
		
}

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

function playAudio() {

	const audioPlayer = OpenPlayerJS.instances['audio-player']; 
	//play video when el in view
	if(isInView('#audio')){
		audioPlayer.play();
		//toggleBtn.innerHTML = "Pause";
	} else {
		audioPlayer.pause();
		//toggleBtn.innerHTML = "Play";
	}
}

function sendTxtMsg(event) {
	event.preventDefault();
	const targetEl = event.target;
	const formData = new FormData(targetEl);

	fetch(targetEl.action, {
		method: 'post',
		body: formData
	})
	.then((responseJson) => {
	  // Do something with the response
	  console.log("success", responseJson);
	  if(responseJson.status === 200) {
	  	targetEl.reset();
	  	alert("Your message is sent successfully.")
	  }
	})
	.catch((error) => {
	  console.log("error", error);
	});
	console.log(event, event.currentTarget, "https://script.google.com/macros/s/AKfycbydCmLuN9zUeT0aele2QkO8CsnOqxHL8674P374cHFqzlAA9qWf5-80B10c-4mIL8oOvQ/exec");
}

window.addEventListener('load', function() {
	var sliderWrapper = document.querySelector('#slides-wrap')
	sliderWrapper.onscroll = _.debounce(sliderSlided, 100, false);
	var msgForm = document.querySelector('#txt-msg');
	msgForm.addEventListener('submit', sendTxtMsg);


	timeoutID = setTimeout(() => {
		sliderSlided();
		clearTimeout(timeoutID);
	}, 1000);

	// audio player initialize
	const audioPlayer = new OpenPlayerJS('#audio-player', {
		mode: 'responsive',
	});
	audioPlayer.init();

	audioPlayer.getElement().addEventListener('playererror', function(e) {
		gtag('event', 'playerror', {'method': 'Google'});
	});

});