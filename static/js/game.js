
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
  
    // And if we need scrollbar
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
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
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
  
  
  
  