    // Function to load the selected image
    function loadFile(event) {
        const reader = new FileReader();
        reader.onload = function() {
            const output = document.getElementById('avatar');
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Check if this cookie string begins with the name we want
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    

    const csrftoken = getCookie('csrftoken'); 

    // Add event listener to the form
    document.getElementById('userDetailsForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const user_profile = document.getElementById('fileInput').files[0];
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    
        const formData = new FormData();
        if (user_profile) formData.append('avatar', user_profile);
        if (dob) formData.append('dob', dob);
        if (gender) formData.append('gender', gender);
    
        // Fetch request with the CSRF token in the headers
        fetch('/userdetails/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken // Ensure this token is added to the request headers
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Expect JSON response from the server
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Profile updated successfully!');
            }
        })
        .catch(error => {
            console.error('Error:',error);
        });
    });
    