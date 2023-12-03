const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const data = {username, password}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    const result = await fetch('/api/register', options);
    const json = await result.json();
    console.log(json);
    }