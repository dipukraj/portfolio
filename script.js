// Global variables
let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.getElementById("navLinks");
let text = " | Web Developer | Designer | Coder";
let index = 0;

// Typewriter effect
function typeEffect() {
  const typewriter = document.querySelector('.typewriter');
  if (typewriter && index < text.length) {
    typewriter.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}

// Menu toggle functionality
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  
  navLinks.classList.toggle("active");
  
  if (navLinks.classList.contains("active")) {
    menuToggle.innerHTML = "✕";
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  } else {
    menuToggle.innerHTML = "☰";
    document.body.style.overflow = ""; // Restore scrolling
  }
}

// Close menu when clicking outside
document.addEventListener("click", function(event) {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target) && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    menuToggle.innerHTML = "☰";
    document.body.style.overflow = "";
  }
});

// Skills section toggle
function toggleSkills() {
  const content = document.getElementById("skillsContent");
  content.style.display = content.style.display === "none" ? "block" : "none";
}

// Experience section toggle
function toggleExperience() {
  const content = document.getElementById("experienceContent");
  content.style.display = content.style.display === "none" ? "block" : "none";
}

// Education section toggle
function toggleEducation() {
  const content = document.getElementById("educationContent");
  content.style.display = content.style.display === "none" ? "block" : "none";
}

// Accordion section toggle
function toggleSection(id) {
  const panel = document.getElementById(id);
  const btn = panel.previousElementSibling;

  if (panel.style.display === "block") {
    panel.style.display = "none";
    btn.classList.remove("active");
  } else {
    panel.style.display = "block";
    btn.classList.add("active");
  }
}

// Function to change profile image
function changeProfileImage(imagePath) {
  const profileImage = document.getElementById('profile-img');
  if (profileImage) {
    profileImage.src = imagePath;
    console.log('Image changed to:', imagePath);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Start typewriter effect
  typeEffect();
  
  // Add event listener for menu toggle
  menuToggle.addEventListener("click", toggleMenu);
  
  // Initialize all accordion panels to be hidden
  const panels = document.querySelectorAll(".panel");
  panels.forEach(panel => {
    panel.style.display = "none";
  });
});
