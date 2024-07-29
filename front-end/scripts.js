function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        fetchUserPosts(response.authResponse.accessToken);
    } else {
        console.log('User cancelled login or did not fully authorize.');
    }
}

function fetchUserPosts(accessToken) {
    FB.api('/me/posts', function(response) {
        if (response && !response.error) {
            console.log('User Posts:', response.data);
            sendPostsToServer(response.data, accessToken);
        } else {
            console.error('Error fetching user posts:', response.error);
        }
    });
}

function sendPostsToServer(posts, accessToken) {
    fetch('http://127.0.0.1:5000/save-posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ posts: posts })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
    });

    fetch('http://127.0.0.1:5000/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accessToken: accessToken })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User info from server:', data);
    });
}
