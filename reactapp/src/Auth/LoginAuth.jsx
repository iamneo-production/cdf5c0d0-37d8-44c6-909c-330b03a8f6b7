function LoginAuth(values){
    let errorMsg = {}
    const password_pattern = /^[a-zA-Z0-9]{2,}$/
    //const password_pattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === "") {
        errorMsg.email="Email should not be empty"
    }
     else {
        errorMsg.email=""
    }

    if(values.password === ""){
        errorMsg.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        errorMsg.password = "Password should be 2 letters long."
    } else {
        errorMsg.password=""
    }

    return errorMsg;
}

export default LoginAuth