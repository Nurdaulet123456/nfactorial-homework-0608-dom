// import fetch from 'node-fetch'


const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const volumeBar = document.querySelector('.volume');
const restart = document.querySelector('.btn')
//
// const canvasElement = document.querySelector('canvas');
// const canvasCtx = canvasElement.getContext('2d');
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();


const songs = ['Neffer-cold', 'Akylbek-kyzyl', 'AlanWalker-unity'];

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `assets/music/${song}.mp3`;
  cover.src = `assets/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	function get_sec (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	}

	get_sec (currentTime,sec);

	currTime.innerHTML = min +':'+ sec;

	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	}


	get_sec_d (duration);

	durTime.innerHTML = min_d +':'+ sec_d;

};

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function onVolumeSeek(evt) {
    audio.volume = evt.target.value / 100;
    document.getElementById("text").innerHTML = Math.floor(audio.volume * 100) + "%"
    console.log(audio.volume);
}



prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate',DurTime);
volumeBar.addEventListener('input', onVolumeSeek);
restart.addEventListener('click', function() {
  audio.currentTime = 0;
})


// const WIDTH = canvasElement.clientWidth;
// const HEIGHT = canvasElement.clientHeight;
// volumeBar.value = 100;
// let audioState = {
//     isReplay : false,
//     isPaused : true,
// };
//
//
// const source = audioCtx.createMediaElementSource(audioElement);
// const analyser = audioCtx.createAnalyser();
// analyser.fftSize = 256;
//
// source.connect(analyser);
// analyser.connect(audioCtx.destination);
//
// const bufferLength = analyser.frequencyBinCount;
// const dataArray = new Uint8Array(bufferLength);
//
// function draw() {
//     analyser.getByteFrequencyData(dataArray);
//     canvasCtx.fillStyle = 'rgb(2, 2, 2)';
//     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
//
//     const barWidth = (WIDTH / bufferLength) * 2.5;
//     let barHeight;
//     let x = 0;
//
//     for(let i = 0; i < bufferLength; i++) {
//         barHeight = dataArray[i] / 2.8;
//         canvasCtx.fillStyle = `rgb(50,50, 200)`;
//         canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
//
//         x += barWidth + 1;
//     }
//
//     requestAnimationFrame(draw);
// }
//
// draw()
