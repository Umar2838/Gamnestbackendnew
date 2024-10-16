// Function to load the selected image
function loadFile(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('avatar');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Function to get CSRF token
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
// Form Validation
function validateForm() {
    // Get current values from the form
    const user_profile = document.getElementById('fileInput').files[0];
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;

    // Clear previous errors
    document.getElementById('avatarError').textContent = '';
    document.getElementById('nameError').textContent = '';
    document.getElementById('dobError').textContent = '';
    document.getElementById('genderError').textContent = '';

    // Flag for form validity
    let isValid = true;

    // Validate avatar
    if (!user_profile) {
        document.getElementById('avatarError').textContent = 'Please choose an avatar.';
        isValid = false;
    }

    // Validate name
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
    }

    // Validate date of birth
    if (!dob) {
        document.getElementById('dobError').textContent = 'Date of birth is required.';
        isValid = false;
    }

    // Validate gender
    if (!gender) {
        document.getElementById('genderError').textContent = 'Gender is required.';
        isValid = false;
    }

    // Return true if the form is valid, false otherwise
    return isValid;
}

// Add event listener to the form
document.getElementById('donebtn').addEventListener("click", (event) => {
    event.preventDefault();

    // Check if the form is valid
    if (validateForm()) {
        const user_profile = document.getElementById('fileInput').files[0];
        const name = document.getElementById('name').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked').value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('avatar', user_profile);
        formData.append('dob', dob);
        formData.append('gender', gender);

        fetch('/userdetails', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken  // CSRF token added
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert('Profile updated successfully!');
                window.location.href = '/gamepage01';  // Redirect to game page
            } else {
                alert('Failed to update profile.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
