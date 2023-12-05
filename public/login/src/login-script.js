const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {username, password}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    // const result = await fetch('/api/register', options);
    // const json = await result.json();
    // console.log(json);

    try {
        const result = await fetch('api/register', options);
        if (!result.ok) {
            throw new Error('Network response was not ok.');
        }
        const json = await result.json();
        // Handle successful response
    } catch (error) {
        console.error('Error:', error);
        // Handle error scenarios (e.g., display an error message to the user)
    }
    }

//7 dec or 8 dec continue login and notes app.