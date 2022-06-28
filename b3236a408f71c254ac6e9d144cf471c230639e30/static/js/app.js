
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
	var scrollOptions = {behavior: "smooth", block: "center", inline: "center"}

	//play video when el in view
	if(isInView('#video')){
		video.scrollIntoView(scrollOptions);
		video.play();

	} else {
		video.pause();

	}

	if(isInView('#audio')){
		audio.scrollIntoView(scrollOptions);
		audioPlayer.play();
	} else {
		audioPlayer.pause();
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
	const audioPlayer = OpenPlayerJS.instances['audio-player']; 
	//play video when el in view
	if(isInView('#audio')){
		audioPlayer.play();
		//toggleBtn.innerHTML = "Pause";
	} else {
		audioPlayer.pause();
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

	// audio player initialize
	const audioPlayer = new OpenPlayerJS('#audio-player', {
		mode: 'responsive',
	});
	audioPlayer.init();
});