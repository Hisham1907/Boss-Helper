
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("teamVideo");
    const playPauseBtn = document.getElementById("playPauseBtn");

    playPauseBtn.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause fa-xl"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play fa-xl"></i>';
        }
    });

    video.addEventListener("ended", function() {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play fa-xl"></i>';
    });
});
