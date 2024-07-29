Integrating Facebook Login into your website involves using the Facebook Login API. Here’s a step-by-step guide to help you set it up:

Step 1: Set Up a Facebook App
Create a Facebook Developer Account if you don’t already have one at Facebook Developers.
Create a New App:
Go to the App Dashboard.
Click "Create App" and follow the prompts to create a new app.
Step 2: Configure Your Facebook App
Set Up Facebook Login:
In the App Dashboard, find your app and select it.
On the left sidebar, click "Set Up" under "Facebook Login".
Add a Platform:
Click "Add Platform" and select "Website".
Enter the URL of your website.
Step 3: Add Facebook Login Code to Your Website


Include the Facebook SDK for JavaScript in your HTML:

html

<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 'YOUR_APP_ID',
      cookie     : true,
      xfbml      : true,
      version    : 'v16.0'
    });
    FB.AppEvents.logPageView();   
  };
</script>
Add the Login Button:

html

<fb:login-button 
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button>

Handle the Login Response:

html

<script>
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      FB.api('/me?fields=name,email', function(response) {
        console.log('Successful login for: ' + response.name);
        console.log('Email: ' + response.email);
        // You can now send the user's data to your server or use it as needed
      });
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log('User cancelled login or did not fully authorize.');
    }
  }
</script>

Step 4: Backend Integration
Send the Access Token to Your Server:
html

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    const accessToken = response.authResponse.accessToken;
    // Send the access token to your server
    fetch('/your-backend-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accessToken: accessToken })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
    });
  } else {
    console.log('User cancelled login or did not fully authorize.');
  }
}

Verify the Access Token on Your Server:
On your server, use the Facebook SDK or make a request to the Facebook Graph API to verify the access token.
python

{
  import requests

  def verify_access_token(access_token):
    response = requests.get(f'https://graph.facebook.com/me?access_token={access_token}')
    user_info = response.json()
    # Use user_info as needed
    return user_info
}
