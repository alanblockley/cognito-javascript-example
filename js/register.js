// Function to register new user in Cognito Pool
// HTML Form inputs are emailInputRegister, passwordInputRegister and confirmationPassword

function registerUser() {

    var email = document.getElementById("emailInputRegister").value;
    var password = document.getElementById("passwordInputRegister").value;
    var confirmationPassword = document.getElementById("confirmationPassword").value;
    
    if (password != confirmationPassword) {
        alert("Passwords do not match");
        return;
    }

    alert("Registering user with email: " + email + " and password: " + password);

    poolData = {
        UserPoolId : _config.cognito.userPoolId,
        ClientId : _config.cognito.userPoolClientId
    }

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email
    }

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(email.replace("@", "_"), password, attributeList, null, function(err, result){
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        alert('User registered successfully');
        document.getElementById("successMsg").innerHTML = "Check email for verification code";
        $('#successMsg').show();

    }); 
    
}
