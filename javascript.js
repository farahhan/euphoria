function checkLoginStatus() {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
        const authArea = document.getElementById('auth-nav-area');
        if (authArea) {
            authArea.innerHTML = `
                <div class="nav-profile-box" onclick="openModal('profile-modal')">
                    <span style="font-weight:700; color:white;">${savedUser}</span>
                    <div class="nav-avatar">${savedUser[0].toUpperCase()}</div>
                </div>`;
        }
        if(document.getElementById('p-name')) document.getElementById('p-name').innerText = savedUser;
        if(document.getElementById('p-avatar')) document.getElementById('p-avatar').innerText = savedUser[0].toUpperCase();
    }
}

function simulateLogin(name, email) {
    localStorage.setItem('username', name);
    closeModal('login-modal');
    closeModal('google-picker');
    checkLoginStatus();
    showToast("Welcome, " + name + "!");
}

function updateDateTime() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');
    if(clock) clock.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    if(date) {
        const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        date.innerText = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
    }
}

function setupPayment() {
    
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.onclick = function() {
            const plan = this.getAttribute('data-plan');
            document.getElementById('planSelect').value = plan;
            document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
        };
    });

    const payBtn = document.getElementById('payBtn');
    if(payBtn) {
        payBtn.onclick = function() {
            
            const nameInput = document.getElementById('p-full-name');
            
            if(!nameInput || nameInput.value.trim() === "") {
                alert("Please enter your Full Name.");
                return;
            }

            
            this.innerText = "Processing...";
            this.disabled = true;

            setTimeout(() => {
                alert("Payment Successful! Thank you, " + nameInput.value);
                this.innerText = "Proceed to Payment";
                this.disabled = false;
                nameInput.value = "";
            }, 2000);
        };
    }
}


window.onload = () => {
    checkLoginStatus();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setupPayment();
};
window.onload = () => {
    checkLoginStatus();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setupPayment();
};

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg; t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 2000);
}

window.onclick = (e) => { if(e.target.className === 'overlay') e.target.style.display = 'none'; }
