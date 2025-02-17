const url = "http://localhost:3000";

async function login(username, password) {
    try {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const json = await response.json();
        if (response.status >= 400) {
            alert(json.message);
            return false;
        }
        console.log(json);
        alert("Berhasil Login");
        localStorage.setItem("username", username);
        localStorage.setItem("token", json.token);
        document.cookie = `token=${json.token}; path=/;`;
        return true;
    } catch (error) {
        console.error("Error during login:", error);
        return false;
    }
}