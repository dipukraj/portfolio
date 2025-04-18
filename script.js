// Simple typing effect for typewriter class
// const text = "Web Developer | Designer | Coder";
// let index = 0;
let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.getElementById("navLinks");
function typeEffect() {
  const typewriter = document.querySelector('.typewriter');
  if (typewriter && index < text.length) {
    typewriter.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
  
}



menuToggle.addEventListener("click", function() {
  if (this.innerHTML === "☰") {
    this.innerHTML = "X";
    navLinks.style.display = "block"; // or use classList.toggle()
  } else {
    this.innerHTML = "☰";
    navLinks.style.display = "none";
  }
});


window.onload = typeEffect;
