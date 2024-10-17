
  const swiperno1 = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.custom-swiper-pagination',
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
  
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  var swiper = new Swiper(".listmySwiper", {
    slidesPerView: 5,
    spaceBetween: 20,
  });
  
  const icons = document.querySelectorAll('.icon-bar a');
  
  // Loop through all icons and add a click event listener
  icons.forEach((icon) => {
    icon.addEventListener("click", function () {
      // Remove the 'active' class from all icons
      icons.forEach((i) => i.classList.remove("active"));
  
      // Add the 'active' class to the clicked icon
      this.classList.add("active");
    });
  });
  
  // Get all the icons in the icon bar
  const iconLinks = document.querySelectorAll(".icon-bar a");
  
  // Function to show the relevant section and hide others
  function showContent(targetId) {
    // Hide all content sections
    const sections = document.querySelectorAll(
      ".game-wrapper, .support-wrapper, .qr-wrapper, .ticket-wrapper, .profile-wrapper"
    );
    sections.forEach((section) => {
      section.classList.add("hidden"); // Add 'hidden' class to hide the section
    });
  
    // Show the selected section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove("hidden"); // Remove 'hidden' class to show the section
    }
  
    // Remove 'active' class from all icons
    iconLinks.forEach((icon) => icon.classList.remove("active"));
  
    // Add 'active' class to the clicked icon
    const clickedIcon = document.querySelector(`a[data-target="${targetId}"]`);
    if (clickedIcon) {
      clickedIcon.classList.add("active");
    }
  }
  
  // Add event listeners to all the icons
  iconLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("data-target");
      showContent(targetId);
    });
  });
  
  // Initially show the games section (or any default section)
  showContent("games");
  
  const ticketowned = document.getElementById("ownedticketsShower");
  
  ticketowned &&
    ticketowned.addEventListener("click", () => {
      document.getElementById("ticket").style.display = "none";
      document.getElementById("ownedticket").style.display = "block";
    });
  const walletArrow = document.getElementById("walletarrow");
  
  // Wait for the DOM content to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Wallet Arrow Logic
  const walletArrow = document.getElementById("walletarrow");

  if (walletArrow) {
      walletArrow.addEventListener("click", function () {
          if (walletArrow.src.includes("_content-right.png")) {
              // Set image to arrow-up and display the other payment section
              walletArrow.src = walletArrow.dataset.upArrow;
              document.getElementById("otherpayment").style.display = "block";
          } else if (walletArrow.src.includes("arrow-up.png")) {
              // Set image to _content-right and hide the other payment section
              walletArrow.src = walletArrow.dataset.rightArrow;
              document.getElementById("otherpayment").style.display = "none";
          }
      });
  }

  // Payment Arrow Logic
  const paymentArrow = document.getElementById("paymentarrow");

  if (paymentArrow) {
      paymentArrow.addEventListener("click", function () {
          if (paymentArrow.src.includes("arrow-up.png")) {
              // Set image to _content-right and hide the payment details section
              paymentArrow.src = paymentArrow.dataset.rightArrow;
              document.getElementById("paymentdetails").style.display = "none";
          } else if (paymentArrow.src.includes("_content-right.png")) {
              // Set image to arrow-up and display the payment details section
              paymentArrow.src = paymentArrow.dataset.upArrow;
              document.getElementById("paymentdetails").style.display = "block";
          }
      });
  }
});

  
    const settingsLink = document.getElementById("moreoption");
    const settingsDrawer = document.getElementById('settingsDrawer');
    const overlay = document.getElementById('overlay');
    
  
    // Open the drawer when clicking the settings link
    settingsLink && settingsLink.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default anchor behavior
      settingsDrawer.classList.add('open');
      overlay.classList.remove('hidden');
      settingsDrawer.classList.remove('hidden');
    });
  
    // Close the drawer and overlay when clicking outside the drawer (on the overlay)
    overlay && overlay.addEventListener('click', function () {
      settingsDrawer.classList.remove('open');
      setTimeout(() => {
        overlay.classList.add('hidden');
        settingsDrawer.classList.add('hidden');
      }); // Wait for the transition to finish before hiding
    });
  
  const gamesTab = document.getElementById('gamesTab');
  const ticketsTab = document.getElementById('tickets');
  const gameunderline = document.getElementById("gameunderline");
  const ticketunderline = document.getElementById("ticketunderline");
  const gamecontent = document.getElementById("gamecontent")
  const ticketcontent = document.getElementById("ticketcontent")
  
  ticketsTab &&  ticketsTab.addEventListener('click', function () {
  gameunderline.classList.remove("underline");
  gamecontent.style.display="none"
  ticketunderline.classList.add("underline");
  ticketcontent.style.display="block"
  
  });
  
  // Event listener for Games tab click
  gamesTab && gamesTab.addEventListener('click', function () {
    ticketcontent.style.display="none"
    ticketunderline.classList.remove("underline");
    gameunderline.classList.add("underline");
    gamecontent.style.display="block"
  });
  
  const locationActive = document.getElementById("locationActive")
  locationActive && locationActive.addEventListener("click",()=>{
    locationActive.classList.add("font-bold")
  })
  
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken'); 
  
  // Support tab functionality
  const support = document.getElementById('supportForm');
support.addEventListener('submit', function (e) {
    e.preventDefault();  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const fileInput = document.getElementById('fileInput');
    const attachment = fileInput.files[0];

    // Use FormData to handle form submission
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('attachment', attachment);  // Assuming the backend expects 'attachment' key

    fetch('submitTicket', {  
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken  // Only CSRF token needed, don't set Content-Type
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Ticket submitted successfully!');
        } else {
            alert('Failed to submit the ticket: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the ticket.');
    });
});


// Edit profile functionality

function loadFile(event) {
  const reader = new FileReader();
  reader.onload = function() {
      const output = document.getElementById('avatar');
      output.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

const editForm = document.getElementById('editForm')

editForm && editForm.addEventListener('submit',(e)=>{
  e.preventDefault()

const fname = document.getElementById('fname').value
const username = document.getElementById('username').value
const date = document.getElementById('date').value
const email = document.getElementById('email').value
const fileInputs = document.getElementById('fileInput')
const fileInput = fileInputs.files[0]
const currentPassword = document.getElementById('currentPassword').value
const newPassword = document.getElementById('newPassword').value
const confirmPassword = document.getElementById('confirmPassword').value
  
const formData = new formData()
formData.append('fname',fname)
formData.append('username',username)
formData.append('date',date)
formData.append('email',email)
formData.append('fileInput',fileInput)
formData.append('currentPassword',currentPassword)
formData.append('newPassword',newPassword)
formData.append('confirmPassword',confirmPassword)

fetch('editProfile', {  
  method: 'POST',
  headers: {
      'X-CSRFToken': csrftoken 
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  if (data.status === 'success') {
      alert('Profile updated successfully!');
  } else {
      alert('Failed to update the profile: ' + data.message);
  }
})
.catch(error => {
  console.error('Error:', error);
  alert('An error occurred while updating the profile.');
});


})

var swiper = new Swiper(".gamesmySwiper", {
  effect: "coverflow",
  grabCursor: true,

  slidesPerView: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 20,
    modifier: 1,
  },
});
window.addEventListener("load", function () {
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      const ticketavailability = document.getElementById("ticketavailability");
      const appBody = document.body; // Assuming the entire page should blur

      // Log the detected QR code value
      alert(`QR Code detected: ${decodedText}`);

      if (decodedText === "Arcade plaza") {
          // Add the class to animate the ticketavailability div
          ticketavailability.classList.add("ticket-animate");
          // Add the blur class to blur the background
          appBody.classList.add("blur-background");
      }
  };

  const config = {
      fps: 10,
      qrbox: {
          width: 250,
          height: 250
      }
  };

  // Create an instance of the QR scanner
  const qrCodeScanner = new Html5Qrcode("qr-video-container");

  // Start scanning the QR code
  qrCodeScanner.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
  ).catch((err) => {
      console.error("QR Code scanning failed", err);
  });
});

    

  