/* ================= MUSIC DATA ================= */
const musicData = {
    malay: {
        "Dato Siti Nurhaliza": [
            { title: "i. Menamakanmu Cinta", file: "menamakanmu.mp3" },
            { title: "ii. Dirgahayu", file: "dirgahayu.mp3" }
        ],
        "Ernie Zakri": [
            { title: "i. Masing-masing", file: "masing.mp3" },
            { title: "ii. Aura", file: "aura.mp3" }
        ],
        "Hael Husaini": [
            { title: "i. Peluk", file: "peluk.mp3" },
            { title: "ii. Hari Ini", file: "hariini.mp3" }
        ],
        "Insomniacks": [
            { title: "i. Igauan Malam", file: "igauan.mp3" },
            { title: "ii. Reminisensi", file: "reminisensi.mp3" }
        ],
        "Inteam": [
            { title: "i. Setanggi Syurga", file: "setanggi.mp3" },
            { title: "ii. Nur Kasih", file: "nurkasih.mp3" }
        ]
    },
    indonesian: {
        "Yovie Widianto & Tiara Andini": [
            { title: "i. Tanpa Cinta", file: "tanpacinta.mp3" }
        ],
        "Nadhif Basalamah": [
            { title: "i. Kota Ini Tak Sama Tanpamu", file: "kota.mp3" },
            { title: "ii. Penjaga Hati", file: "penjagahati.mp3" }
        ],
        "Rizky Febian": [
            { title: "i. Alamak", file: "alamak.mp3" },
            { title: "ii. Malam Rawan", file: "malamrawan.mp3" }
        ]
    },
    pop: {
        "Taylor Swift": [
            { title: "i. Back to December", file: "btd.mp3" },
            { title: "ii. Wildest Dream", file: "wildest.mp3" }
        ],
        "Ariana Grande": [
            { title: "i. 7 Rings", file: "7rings.mp3" },
            { title: "ii. One Last Time", file: "onelasttime.mp3" }
        ],
        "Olivia Rodrigo": [
            { title: "i. Traitor", file: "traitor.mp3" },
            { title: "ii. Vampire", file: "vampire.mp3" }
        ],
        "Sam Smith": [
            { title: "i. Unholy", file: "unholy.mp3" },
            { title: "ii. Writing's on the Wall", file: "writing.mp3" }
        ]
    },
    kpop: {
        "Treasure": [
            { title: "i. Jikjin", file: "jikjin.mp3" },
            { title: "ii. Yellow", file: "yellow.mp3" }
        ],
        "NMIXX": [
            { title: "i. Blue Valentine", file: "bluev.mp3" },
            { title: "ii. Dice", file: "dice.mp3" }
        ],
        "Taeyeon": [
            { title: "i. I", file: "i.mp3" },
            { title: "ii. UR", file: "ur.mp3" }
        ]
    }
};

/* ================= GLOBAL ================= */
let activeGenre = "";
const audio = document.getElementById("main-audio-player");

/* ================= BROWSE ================= */
function showArtists(genre) {
    activeGenre = genre;
    const display = document.getElementById("playlist-display");
    const title = document.getElementById("current-title");
    const list = document.getElementById("content-list");

    const titles = {
        malay: "Malay Singers",
        indonesian: "Indonesian Singers",
        pop: "Pop Singers",
        kpop: "K-Pop Singers"
    };

    title.innerText = titles[genre];
    list.innerHTML = "";

    Object.keys(musicData[genre]).forEach(artist => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <strong>${artist}</strong>
            <span style="color:var(--primary-pink)">View Songs →</span>
        `;
        row.onclick = () => showSongs(artist);
        list.appendChild(row);
    });

    display.style.display = "block";
    display.scrollIntoView({ behavior: "smooth" });
}

function showSongs(artist) {
    const title = document.getElementById("current-title");
    const list = document.getElementById("content-list");

    title.innerText = "Songs by " + artist;
    list.innerHTML = `<button class="btn-back" onclick="showArtists(activeGenre)">← Back</button>`;

    musicData[activeGenre][artist].forEach(song => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <span>${song.title}</span>
            <button class="btn-main"
                onclick="playSong('${song.file}','${song.title}','${artist}')">
                PLAY
            </button>
        `;
        list.appendChild(row);
    });
}

/* ================= PLAYER ================= */
function playSong(file, title, artist) {
    audio.src = file;
    audio.play();

    document.getElementById("btm-title").innerText = title;
    document.getElementById("btm-artist").innerText = artist;
    document.getElementById("bottom-player").style.display = "flex";
    document.getElementById("btm-play-btn").innerText = "⏸️";
}

function togglePlay() {
    const btn = document.getElementById("btm-play-btn");
    if (audio.paused) {
        audio.play();
        btn.innerText = "⏸️";
    } else {
        audio.pause();
        btn.innerText = "▶️";
    }
}

function closePlayer() {
    audio.pause();
    document.getElementById("bottom-player").style.display = "none";
}

/* ================= TIMELINE ================= */
audio.ontimeupdate = () => {
    if (!audio.duration) return;
    document.getElementById("btm-bar").style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
    document.getElementById("btm-current").innerText = formatTime(audio.currentTime);
    document.getElementById("btm-duration").innerText = formatTime(audio.duration);
};

function seekAudio(e) {
    const bar = e.currentTarget;
    const percent = e.offsetX / bar.offsetWidth;
    audio.currentTime = percent * audio.duration;
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
}

/* ================= CLOCK ================= */
function updateDateTime() {
    document.getElementById("clock").innerText =
        new Date().toLocaleTimeString();
    document.getElementById("date").innerText =
        new Date().toDateString();
}
setInterval(updateDateTime, 1000);
updateDateTime();
