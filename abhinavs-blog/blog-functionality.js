credentialArray = {
    "admin":"admin_pass"
}

function createUser(userID, pass){
    if(credentialArray[userID]){
        console.log("User already exists");
    }
    else{
        if(checkStrenth(pass)){
            credentialArray[userID] = pass;
            console.log("User created successfully");
        }
        else{
            console.log("User not created.");
        }
    }
}

// Algorithm that determines if the password has a special character, 
// numerical value, does not include the username as it is somewhere 
// in between it, or does not have repeated values more than 3-4 digits,
// like: 0000, 1111, 123, 1234, 123456.

function checkStrenth(pass){
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
        console.log("Has a special character and a number.");
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
