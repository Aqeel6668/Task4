// DOM Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const muteBtn = document.getElementById('mute');
const playlistEl = document.getElementById('playlist');
const albumArt = document.getElementById('album-art');

// Song List
const songs = [
    {
        name: 'song1',
        title: 'Song One',
        artist: 'Artist One',
        albumArt: 'album1.jpg',
    },
    {
        name: 'song2',
        title: 'Song Two',
        artist: 'Artist Two',
        albumArt: 'album2.jpg',
    },
    {
        name: 'song3',
        title: 'Song Three',
        artist: 'Artist Three',
        albumArt: 'album3.jpg',
    },
];

let songIndex = 0;
let isShuffle = false;
let isRepeat = false;

// Load Song
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `${song.name}.mp3`;
    albumArt.src = song.albumArt;
    updatePlaylist();
}

// Play Song
function playSong() {
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    audio.play();
}

// Pause Song
function pauseSong() {
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    audio.pause();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update time display
    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
}

// Format Time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Set Progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Toggle Shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
}

// Toggle Repeat
function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
}

// Update Playlist
function updatePlaylist() {
    playlistEl.innerHTML = songs
        .map(
            (song, index) => `
                <li class="${index === songIndex ? 'active' : ''}" onclick="playSongFromPlaylist(${index})">
                    ${song.title} - ${song.artist}
                </li>
            `
        )
        .join('');
}

// Play Song from Playlist
function playSongFromPlaylist(index) {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.querySelector('i').classList.contains('fa-pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
audio.addEventListener('timeupdate', updateProgress);
progressBar.parentElement.addEventListener('click', setProgress);
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});
muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.querySelector('i').classList.toggle('fa-volume-up', !audio.muted);
    muteBtn.querySelector('i').classList.toggle('fa-volume-mute', audio.muted);
});

// Load First Song
loadSong(songs[songIndex]);