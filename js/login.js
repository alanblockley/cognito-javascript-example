
function userLoginCookie() {
    
    // See if the id_token already exists
    let id_token = sessionStorage.getItem("id_token");

    if (id_token) {
        // we're already logged in
        alert("already logged in");
    } else {

        var email = document.getElementById("emailInputSignin").value;
        var password = document.getElementById("passwordInputSignin").value;

        poolData = {
            UserPoolId : _config.cognito.userPoolId,
            ClientId : _config.cognito.userPoolClientId
        }

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username : email,
            Pool : userPool
        }

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(new AmazonCognitoIdentity.AuthenticationDetails({
            Username : email,
            Password : password
        }), {
            onSuccess: function (result) {

                console.log('Successfully logged in');

                access_token = result.getAccessToken().getJwtToken();
                id_token = result.getIdToken().getJwtToken();
                refresh_token = result.refreshToken.token;

                // Store the relative tokens in session storage
                sessionStorage.setItem("id_token", id_token);
                sessionStorage.setItem("access_token", access_token);
                sessionStorage.setItem("refresh_token", refresh_token);

                alert("Successfully logged in");
                
                // from here do things
                
            },
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
                return
            
            }
        })
    }
}
