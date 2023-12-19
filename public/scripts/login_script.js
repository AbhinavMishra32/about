const form = document.getElementById('login-form');
form.addEventListener('submit', loginUser);

function signUpButtonFunc(event){
    event.preventDefault();
    window.location.href = '/register';
}

async function loginUser(event){
    event.preventDefault();
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

    try{
        const result = await fetch('/api/login', options);
        const json = await result.json();
        let p = document.getElementById('message');
            if(!p){
                p.document.createElement('p');
                p.id = 'message';
                p.innerHTML = json.message;
                document.getElementById('login-box').appendChild(p);
            }
            p.innerHTML = json.message;
        if(!result.ok){
            // throw new Error('Network response was not OK. (abhinav messsage)');
            
            console.log(json.message);
        }
        else{
            console.log(json.message);
            window.location.href = '/dashboard';
        }
        
        // console.log(json.error)
    }
    catch(err){
        console.error('Error: ', err);
    }
    // try{
    //     const result = await fetch('/api/login', options);
    //     const json = await result.json();
    //     if(!result.ok){
    //         console.log(json.message)
    //         let p = document.getElementById('message');
    //         if(!p){
    //             p.document.createElement('p');
    //             p.id = 'message';
    //             p.innerHTML = json.message;
    //             document.getElementById('login-box').appendChild(p);
    //         }
    //         p.innerHTML = json.message;
    //         // throw new Error('Network response was not OK. (abhinav messsage)');
    //     }
    // }
    // catch(err){
    //     console.error('Error: ', err);
    // }
}

// const signUpButton = document.getElementById('signup-button');
// signUpButton.addEventListener('signup-button', signUpButtonFunc);

