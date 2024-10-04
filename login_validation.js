class Validation {

    validateEmail(enteredEmail) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
        return emailRegex.test(enteredEmail);    
    }

    isNumber(event) {
        return /^\d$/.test(event.key);  
    }


    //validation of user email and password
    validateCredentials(existingUsersCredentials, enteredEmail, enteredPassword, enteredPin) {

        let userFound = existingUsersCredentials.find(user => user.email === enteredEmail);
        if (userFound) {
            if (userFound.password === enteredPassword || userFound.pin === enteredPin)
                return true;
            return false
        }   
        return false;
    }
}
