//for first time using the database:-
// credentialArray = {
//     "default": "default_pass125"
// };
// localStorage.setItem('credentials', JSON.stringify(credentialArray));
// let credentialArray = JSON.parse(localStorage.getItem('credentials'));

// let credentialArray = JSON.parse(localStorage.getItem('credentials'));


function createUser(userID, pass){
    let credentialArray = JSON.parse(localStorage.getItem('credentials'));
    if(credentialArray[userID]){
        console.log("User already exists");
    }
    else{
        //checks the strength of the password
        if(checkStrength(pass)){
            credentialArray[userID] = pass;
            console.log("User created successfully");
            console.log(credentialArray);
            localStorage.setItem('credentials', JSON.stringify(credentialArray));
        }
        else{
            console.log("User not created.");
        }
    }
}
/*
 todo: for now the deleteUser function is in code only, will make it in UI later on... (could use prompts to get values)
 todo: how to get value from alerts: https://stackoverflow.com/questions/51578629/how-can-i-put-an-input-in-the-alert-box 
*/
function deleteUser(userID, pass){
    let credentialArray = JSON.parse(localStorage.getItem('credentials'));
    if(credentialArray[userID] == pass){
        delete credentialArray.userID;
        localStorage.setItem('credentials', JSON.stringify(credentialArray));
    }
    else{
        alert("Enter the correct username or password to delete your account.");
    }
    // document.querySelector(".password-field").value = "";
}

// Algorithm that determines if the password has a special character, 
// numerical value, does not include the username as it is somewhere 
// in between it, or does not have repeated values more than 3-4 digits,
// like: 0000, 1111.

function checkStrength(pass){
    let hasInt = false;
    let hasSpclChr = false;
    let hasPattern = false;

    const checkPattern = /(\d)\1{3}/;
    const specialCharactersRegex = /[!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/;
    
    for(let i = 0; i<=pass.length; i++){
        if(parseInt(pass[i])){
            hasInt = true;
        }
        if(specialCharactersRegex.test(pass[i])){
            hasSpclChr = true;
        }
        if(checkPattern.test(pass)){
            hasPattern = true;
        }
    }
    if(hasInt && hasSpclChr && !hasPattern){
        // console.log("Has a special character and a number.");
        return true;
    }
    // FOR DEBUG:
    
    // if(!hasInt){
    //     console.log("Password must contain a number.")
    // }
    // if(!hasSpclChr){
    //     console.log("Password must contain a special character.")
    // }
    // if(hasPattern){
    //     console.log("Password cannot contain repeating values.")
    // }
}

createUser("Abhinav", "my_passAbhinav123");
createUser("Abhinav", "sdfds@#Ainav123");




//Able to click edit button after entering the correct credentials
//and after that a div apears showing the input fields to fill out the necesarry
//parameters of a blog post.

const editButton = document.getElementById('myButton');
//sign in or edit
//! NON FUNCTIONING
//! takes in values from input fields. (YET TO IMPLEMENT)
function editValidate(){
    const username = document.querySelector(".username-field").value;
    const password = document.querySelector(".password-field").value;

    if(credentialArray[username] == password){
        alert("logged in"); 
        window.location = "login-accepted.html";
    }
    else{
        alert("wrong username or password");
    }
    document.querySelector(".password-field").value = "";
}
button.addEventListener('click', editValidate);