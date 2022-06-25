
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

function sliderSlided() {
	var video = document.querySelector("#video-player");
	var toggleBtn = document.querySelector("#play-pause");
	var audio = document.querySelector("#audio-player");
	var interactiveEmbed = document.querySelector('iframe');
	var bannerImg = document.querySelector('#banner .banner-img');
	var scrollOptions = {behavior: "smooth", block: "center", inline: "center"}

	if(isInView('#banner')){
		bannerImg.scrollIntoView(scrollOptions);
	} 

	//play video when el in view
	if(isInView('#video')){
		video.scrollIntoView(scrollOptions);
		video.play();
		toggleBtn.innerHTML = "Pause";
	} else {
		video.pause();
		toggleBtn.innerHTML = "Play";
	}

	if(isInView('#audio')){
		audio.scrollIntoView(scrollOptions);
		audio.play();
		//toggleBtn.innerHTML = "Pause";
	} else {
		audio.pause();
		//toggleBtn.innerHTML = "Play";
	}

	if(isInView('#interactive-img')){
		interactiveEmbed.scrollIntoView();
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

window.addEventListener('load', function() {
	var sliderWrapper = document.querySelector('#slides-wrap')
	sliderWrapper.onscroll = _.debounce(sliderSlided, 100, false);

	timeoutID = setTimeout(() => {
		sliderSlided();
		clearTimeout(timeoutID);
	}, 1000);

});