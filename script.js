const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

const bar = document.getElementById("musicBar");
const status = document.getElementById("musicStatus");
const eq = document.getElementById("eq");

let isPlaying = false;

/* OPEN SECTION */
function openSection(id){
  document.getElementById("overlay").style.display = "flex";

  document.querySelectorAll(".content-box").forEach(el=>{
    el.style.display = "none";
  });

  document.getElementById(id).style.display = "block";
}

/* CLOSE */
document.getElementById("overlay").addEventListener("click", function(e){
  if(e.target.id === "overlay"){
    this.style.display = "none";
  }
});

/* FORMAT TIME */
function formatTime(time){
  let m = Math.floor(time/60);
  let s = Math.floor(time%60);
  return `${m}:${s<10?'0'+s:s}`;
}

/* PLAY */
function toggleMusic(){
  if(!isPlaying){
    audio.play().then(()=>{
      isPlaying = true;
      playBtn.innerText = "⏸";
      status.innerText = "Now Playing 🎵";
      bar.classList.add("show");
      eq.classList.add("active");
    }).catch(()=>{
      alert("Klik lagi untuk play musik");
    });
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.innerText = "▶";
    status.innerText = "Paused";
    eq.classList.remove("active");
  }
}

/* UPDATE */
audio.addEventListener("timeupdate", ()=>{
  progress.value = (audio.currentTime/audio.duration)*100;
  current.innerText = formatTime(audio.currentTime);
});

/* DURATION */
audio.addEventListener("loadedmetadata", ()=>{
  duration.innerText = formatTime(audio.duration);
});

/* SEEK */
progress.addEventListener("input", ()=>{
  audio.currentTime = (progress.value/100)*audio.duration;
});

/* VOLUME */
volume.value = 0.5;
audio.volume = 0.5;

volume.addEventListener("input", ()=>{
  audio.volume = volume.value;
});