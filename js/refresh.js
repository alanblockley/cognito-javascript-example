// Function to refresh the Amazon Cognito authentication token
function refreshToken() {

    let id_token = sessionStorage.getItem("id_token");
    let refresh_token = sessionStorage.getItem("refresh_token");

    if (id_token) {
        poolData = {
            UserPoolId : _config.cognito.userPoolId,
            ClientId : _config.cognito.userPoolClientId
        }

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username : id_token,
            Pool : userPool
        }

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        var cognitoRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: refresh_token});

        cognitoUser.refreshSession(cognitoRefreshToken, (err, session) => {
            if (err) {
                console.log(err);
                return;
            }

            id_token = session.getIdToken().getJwtToken();
            access_token = session.getAccessToken().getJwtToken();
            sessionStorage.setItem("id_token", id_token);
            sessionStorage.setItem("access_token", access_token);

            // Now we have new tokens, do something
            // ...

            alert('auth token refreshed');
        });
    }
}
