const url = "http:// 10.3.5.181:3000"; // Ganti dengan IP lokal Anda

async function main() {
    const data = await fetch(`${url}/mahasiswa`);
    const json = await data.json();
    console.log(json);
}

async function login(username, password) {
    const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    const json = await response.json();
    if (response.status >= 400) return alert(json.message);
    console.log(json);
    alert("Berhasil Login");
    localStorage.setItem('username', username);
    localStorage.setItem('token', json.token);
    window.location.href = 'menu.html';
    return json;
}

async function register(username, password) {
    const response = await fetch(`${url}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    const json = await response.json();
    if (response.status >= 400) return alert(json.message);
    alert("Berhasil Register");
    console.log(json);
    return json;
}

// Handle welcome message and logout on menu.html
if (window.location.pathname.endsWith('menu.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const username = localStorage.getItem('username');
        if (username) {
            document.getElementById('welcomeMessage').innerText = `Welcome, ${username}!`;
        } else {
            window.location.href = 'menulogin.html';
        }
    });

    function logout() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.href = 'menulogin.html';
    }

    window.logout = logout;
}

//fungsi ini akan dijalankan ketika halaman selesai dimuat dan token telah di hapus di local storage
window.addEventListener('storage', (event) => {
    if (event.key === 'username' || event.key === 'token') {
        if (!localStorage.getItem('username') || !localStorage.getItem('token')) {
            alert('sesi akan berakhir.');
            window.location.href = 'menulogin.html';
        }
    }
});