const logoutButt = document.getElementById('logout-button');
logoutButt.addEventListener('click', logoutButtonFunc);

async function logoutButtonFunc(){
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.status == "OK"){
        window.location.href = '/login';
    }
}

