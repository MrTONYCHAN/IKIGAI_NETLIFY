// Initialize Variables
let songIndex = 0;
const audioElement = new Audio('songs/1.mp3');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));
 
// Song data array
const songs = [
    { songName: "On & On", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Invincible", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    // Add more songs here...
];
 
// Function to play a specific song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
audioElement.play();
    togglePlayPause(true);
gif.style.opacity = 1;
};
 
// Function to handle play/pause toggle
const togglePlayPause = (isPlaying) => {
    if (isPlaying) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
gif.style.opacity = 0;
    }
};
 
// Handle master play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        togglePlayPause(false);
    }
});
 
// Function to play the next song in the list
const playNextSong = () => {
    songIndex = (songIndex < songs.length - 1) ? songIndex + 1 : 0;
    playSong();
};
 
// Event listener to play the next song when the current one ends
audioElement.addEventListener('ended', playNextSong);
 
// Function to initialize song items and add click listeners
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.querySelector("img").src = songs[i].coverPath;
        element.querySelector(".songName").innerText = songs[i].songName;
        
        element.querySelector(".songItemPlay").addEventListener('click', (e) => {
            resetAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};
 
// Function to reset all song items to play state
const resetAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};
 
// Search Functionality
const filterSongs = () => {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    songItems.forEach(item => {
        const songName = item.querySelector('.songName').textContent.toLowerCase();
item.style.display = songName.includes(searchValue) ? 'flex' : 'none';
    });
};
 
// Initialize song items
initializeSongItems();