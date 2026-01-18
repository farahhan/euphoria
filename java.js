function updateDateTime() {
    const now = new Date();
    
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', timeOptions);
    
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    const dayName = days[now.getDay()];
    const dateNum = now.getDate();
    const monthName = months[now.getMonth()];
    
    document.getElementById('date').innerText = dayName + ", " + dateNum + " " + monthName;
}

setInterval(updateDateTime, 1000);
updateDateTime();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 130, 
                behavior: 'smooth'
            });
        }
    });
});

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function simulateLogin(name, email) {
    closeModal('login-modal');
    closeModal('google-picker');
    closeModal('register-modal');

    const authArea = document.getElementById('auth-nav-area');
    authArea.innerHTML = `
        <div class="nav-profile-box" style="display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="openModal('profile-modal')">
            <span style="font-weight:700; color:white;">${name}</span>
            <div class="nav-avatar" style="width:35px; height:35px; background:var(--primary-pink); border-radius:50%; display:flex; justify-content:center; align-items:center; font-weight:bold; color:white;">
                ${name[0]}
            </div>
        </div>`;

    document.getElementById('p-name').innerText = name;
    document.getElementById('p-avatar').innerText = name[0];

    showToast("Welcome, " + name + "!");
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 3000);
}

window.onclick = function(event) {
    if (event.target.className === 'overlay') {
        event.target.style.display = 'none';
    }
}