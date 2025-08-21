// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVlZh8IrDTfnt9zUhdmqyjd3T2JJNKE94",
  authDomain: "dipu-portfolio.firebaseapp.com",
  databaseURL: "https://dipu-portfolio-default-rtdb.firebaseio.com",
  projectId: "dipu-portfolio",
  storageBucket: "dipu-portfolio.firebasestorage.app",
  messagingSenderId: "845529374157",
  appId: "1:845529374157:web:bec00f53d20e4f1d67f884",
  measurementId: "G-V8QBNCK2QX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Global variables
let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.getElementById("navLinks");
let text = " Web Developer | Designer | Coder";
let index = 0;

// Real-time Visitor Counter
function updateVisitorCount() {
  const visitorRef = database.ref('visitorCount');
  
  // Increment visitor count
  visitorRef.transaction((currentCount) => {
    return (currentCount || 0) + 1;
  });
  
  // Listen for real-time updates
  visitorRef.on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    const counterDiv = document.getElementById('visitor-counter');
    if (counterDiv) {
      counterDiv.textContent = `Visitor Count: ${count}`;
    }
  });
}

// Typewriter effect with improved performance
function typeEffect() {
  const typewriter = document.querySelector('.typewriter');
  if (typewriter && index < text.length) {
    typewriter.innerHTML += text.charAt(index);
    index++;
    requestAnimationFrame(() => setTimeout(typeEffect, 100));
  }
}

// Improved menu toggle functionality
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    menuToggle.innerHTML = "☰";
    document.body.style.overflow = "";
  } else {
    navLinks.classList.add("active");
    menuToggle.innerHTML = "✕";
    document.body.style.overflow = "hidden";
  }
}

// Close menu when clicking outside
document.addEventListener("click", function(event) {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target) && navLinks.classList.contains("active")) {
    toggleMenu();
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

  requestAnimationFrame(() => {
    if (panel.style.display === "block") {
      panel.style.display = "none";
      btn.classList.remove("active");
    } else {
      panel.style.display = "block";
      btn.classList.add("active");
    }
  });
}

// Function to switch work images
function switchWorkImage(imageId) {
  // Hide all images
  const images = document.querySelectorAll('.work-image');
  images.forEach(img => {
    img.classList.remove('active');
  });
  
  // Show selected image
  const selectedImage = document.getElementById(imageId);
  selectedImage.classList.add('active');
  
  // Update button states
  const buttons = document.querySelectorAll('.image-switch-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Activate the clicked button
  const clickedButton = document.querySelector(`.image-switch-btn[onclick*="${imageId}"]`);
  clickedButton.classList.add('active');
}

// Improved profile image change
function changeProfileImage(imagePath) {
  const profileImage = document.getElementById('profile-img');
  if (profileImage) {
    profileImage.style.opacity = '0';
    setTimeout(() => {
      profileImage.src = imagePath;
      profileImage.style.opacity = '1';
    }, 300);
  }
}

// Function to highlight projects
function highlightProject(projectId) {
  // Remove highlight from all projects
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.classList.remove('highlighted');
  });
  
  // Add highlight to the selected project
  const project = document.querySelector(`.project:nth-child(${projectId.charAt(projectId.length - 1)})`);
  project.classList.add('highlighted');
}

// Language Switcher Logic
const translations = {
  en: {
    about: "I'm a passionate web designer and developer who loves bringing ideas to life through code. Whether it's crafting beautiful websites, designing intuitive user interfaces, or writing clean and efficient code — I enjoy every step of the journey. I also have a strong interest in graphic design, which helps me create visually striking and user-friendly web experiences. From layout to functionality, I love combining creativity with technology to build things that not only work well but also look great. Designing websites isn't just something I do — it's something I genuinely love. If you're someone who shares the same excitement for creativity and tech, we'll definitely get along!",
    skills: "Skills🔛▼",
    contact: "Contact Me",
    email: "Email: kumardipu1436@gmail.com"
  },
  hi: {
    about: "मैं एक जुनूनी वेब डिज़ाइनर और डेवलपर हूँ, जिसे कोड के ज़रिए विचारों को जीवन में लाना पसंद है। सुंदर वेबसाइट बनाना, सहज यूज़र इंटरफेस डिज़ाइन करना, या साफ़ और कुशल कोड लिखना — मुझे इस यात्रा का हर कदम पसंद है। मुझे ग्राफ़िक डिज़ाइन में भी गहरी रुचि है, जिससे मैं आकर्षक और यूज़र-फ्रेंडली वेब अनुभव बना पाता हूँ। रचनात्मकता और तकनीक को मिलाकर ऐसी चीज़ें बनाना जो न सिर्फ़ अच्छी दिखें बल्कि बेहतरीन काम भी करें, यही मेरा जुनून है। वेबसाइट डिज़ाइन करना मेरे लिए सिर्फ़ काम नहीं, बल्कि मेरा शौक़ है। अगर आप भी रचनात्मकता और तकनीक के लिए उत्साहित हैं, तो हम ज़रूर अच्छे दोस्त बन सकते हैं!",
    skills: "कौशल🔛▼",
    contact: "संपर्क करें",
    email: "ईमेल: kumardipu1436@gmail.com"
  },
  bho: {
    about: "हम एक जोशिला वेब डिज़ाइनर आ डेवलपर बानी, जेकरा के कोड से नया-नया आइडिया के जिनगी देवे में मजा आवेला। सुंदर वेबसाइट बनावल, बढ़िया यूज़र इंटरफेस डिज़ाइन करे, आ साफ-सुथरा कोड लिखे — हमके ई सब काम बहुते पसंद बा। हमके ग्राफ़िक डिज़ाइन में भी गहरी दिलचस्पी बा, जेसे हम आकर्षक आ यूज़र-फ्रेंडली वेबसाइट बना सकी। रचनात्मकता आ तकनीक के मिलाके कुछ नया बनावल हमार शौक बा। वेबसाइट डिज़ाइन हमार पेशा ना, हमार जूनून बा। अगर रउआ के भी रचनात्मकता आ तकनीक में रुचि बा, त हमनी के जरूर बनेम!",
    skills: "कौशल🔛▼",
    contact: "संपर्क करीं",
    email: "ईमेल: kumardipu1436@gmail.com"
  },
  mai: {
    about: "हम एक उत्साही वेब डिज़ाइनर आ डेवलपर छी, जे कोड के माध्यम सऽ विचार के जीवन दैत छी। सुंदर वेबसाइट बनब, सहज यूज़र इंटरफेस डिज़ाइन करब, आ साफ-सुथरा कोड लिखब — हम अहि यात्रा के हर पग के आनंद लैत छी। हम ग्राफ़िक डिज़ाइन में सेहो गहरी रुचि रखैत छी, जे सऽ हम आकर्षक आ यूज़र-फ्रेंडली वेब अनुभव बना सकी। रचनात्मकता आ तकनीक के जोड़ि कऽ किछु नव बनब हमरा बहुत पसंद अछि। वेबसाइट डिज़ाइन करब हमर पेशा नहि, हमर शौक अछि। जँ अहाँ के सेहो रचनात्मकता आ तकनीक में रुचि अछि, तऽ हम सभ जरूर मिलब!",
    skills: "कौशल🔛▼",
    contact: "संपर्क करू",
    email: "ईमेल: kumardipu1436@gmail.com"
  }
};

function updateLanguage(lang) {
  // About section
  const aboutP = document.querySelector('#about p');
  if (aboutP) aboutP.textContent = translations[lang].about;
  // Skills section heading
  const skillsH2 = document.querySelector('#skills h2');
  if (skillsH2) skillsH2.textContent = translations[lang].skills;
  // Contact section heading
  const contactH2 = document.querySelector('#contact h2');
  if (contactH2) contactH2.textContent = translations[lang].contact;
  // Contact email
  const contactEmail = document.querySelector('#contact p');
  if (contactEmail) contactEmail.textContent = translations[lang].email;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Show first image by default
  const firstImage = document.getElementById('workImage1');
  if (firstImage) {
    firstImage.classList.add('active');
  }
  
  // Start typewriter effect
  typeEffect();
  
  // Add event listener for menu toggle
  const menuToggleBtn = document.querySelector(".menu-toggle");
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", toggleMenu);
  }
  
  // Initialize all accordion panels
  const panels = document.querySelectorAll(".panel");
  panels.forEach(panel => {
    panel.style.display = "none";
  });

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          toggleMenu();
        }
      }
    });
  });

  // Animated Welcome overlay with multiple languages
  /*
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const welcomeMessage = document.getElementById('welcome-message');
  const messages = [
    'Welcome',
    'स्वागत है',
    'रउआ के स्वागत बा',
    'अहाँ के स्वागत छै'
  ];
  let msgIndex = 0;

  function showNextMessage() {
    if (msgIndex >= messages.length) {
      welcomeOverlay.classList.add('hide');
      setTimeout(() => {
        welcomeOverlay.style.display = 'none';
      }, 700);
      return;
    }
    welcomeMessage.textContent = messages[msgIndex];
    welcomeMessage.classList.add('show');
    setTimeout(() => {
      welcomeMessage.classList.remove('show');
      setTimeout(() => {
        msgIndex++;
        showNextMessage();
      }, 400); // fade out duration
    }, 1000); // show each message for 1s
  }

  if (welcomeOverlay && welcomeMessage) {
    showNextMessage();
  }
  */

  // Real-time Visitor Counter
  updateVisitorCount();

  const langSwitcher = document.getElementById('language-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('change', function() {
      updateLanguage(this.value);
    });
  }

  // Restore theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  // Toggle on both buttons
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      if (document.body.classList.contains('light-mode')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  }
  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener('click', function() {
      if (document.body.classList.contains('light-mode')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  }

  // Restore saved color and backgrounds
  const savedColor = localStorage.getItem('primaryColor');
  const savedBgColor = localStorage.getItem('mainBgColor');
  const savedNavbarColor = localStorage.getItem('navbarBgColor');
  if (savedColor) setPrimaryColor(savedColor);
  if (savedBgColor && document.body.classList.contains('light-mode')) {
    document.documentElement.style.setProperty('--main-bg-color', savedBgColor);
  }
  if (savedNavbarColor && document.body.classList.contains('light-mode')) {
    document.documentElement.style.setProperty('--navbar-bg-color', savedNavbarColor);
  }

  // Settings FAB logic
  const settingsIcon = document.getElementById('settings-icon');
  const colorPalette = document.getElementById('color-palette');
  if (settingsIcon && colorPalette) {
    settingsIcon.addEventListener('click', function() {
      colorPalette.classList.toggle('active');
    });
    document.querySelectorAll('.color-option').forEach(opt => {
      opt.addEventListener('click', function() {
        if (document.body.classList.contains('light-mode')) {
          setPrimaryColor(this.getAttribute('data-color'));
        }
        colorPalette.classList.remove('active');
      });
    });
  }
});

// Dark/Light Mode Toggle
function setTheme(mode) {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
  if (mode === 'light') {
    body.classList.add('light-mode');
    // Use saved or default color for backgrounds
    const savedBgColor = localStorage.getItem('mainBgColor');
    const savedNavbarColor = localStorage.getItem('navbarBgColor');
    document.documentElement.style.setProperty('--main-bg-color', savedBgColor || '#f1f5f9');
    document.documentElement.style.setProperty('--navbar-bg-color', savedNavbarColor || '#e0e7ef');
    if (toggleBtn) toggleBtn.textContent = '☀️';
    if (toggleBtnMobile) toggleBtnMobile.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-mode');
    document.documentElement.style.setProperty('--main-bg-color', '#0f172a');
    document.documentElement.style.setProperty('--navbar-bg-color', '#1e293b');
    if (toggleBtn) toggleBtn.textContent = '🌙';
    if (toggleBtnMobile) toggleBtnMobile.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
}

// Floating Settings Color Palette Logic
function setPrimaryColor(color) {
  document.documentElement.style.setProperty('--primary-color', color);
  if (document.body.classList.contains('light-mode')) {
    document.documentElement.style.setProperty('--main-bg-color', color);
    document.documentElement.style.setProperty('--navbar-bg-color', color);
    localStorage.setItem('mainBgColor', color);
    localStorage.setItem('navbarBgColor', color);
  }
  localStorage.setItem('primaryColor', color);
  // Update selected state
  document.querySelectorAll('.color-option').forEach(opt => {
    if (opt.getAttribute('data-color') === color) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });
  // Change the color of the 'Hi, I\'m' text only in light mode
  var heroName = document.getElementById('hero-name-color');
  if (heroName) {
    if (document.body.classList.contains('light-mode')) {
      heroName.style.color = color;
    } else {
      heroName.style.color = '#fff';
    }
  }
}
