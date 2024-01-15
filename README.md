# cognito-javascript-example

This repo contains supporting scripts to help build and use Amazon Cognito via a simple Javascript interface. 

This repo is designed for people like me who are front-end challenge. 

Function over form?  I got you! 

Disclaimer: This is an example repo and not a working product.  The contents of this repo are designed to be a guide.

# What's included?

* Registration
* Login
* Refresh token
* Example HTML files
* Cloudformation Templates for creating basic resources

# Registration

This is an example on how to enter user information and register it with Cognito

* `html/register.html`
* `js/register.js`

# Login

This is an example of how to accept username and password and authenticate against Cognito.

* `html/login.html`
* `js/login.js`

This returns 3 tokens to be used.

- id_token
- access_token
- refresh_token

# Refresh session

This is designed to be used in response to 401 response from Cognito where by the token has expired. 

Calling this function will send your refresh token to cognito and reply with a set of tokens.

* `js/refresh.js`




