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
let text = " Game Developer | Designer | Coder";
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
document.addEventListener("click", function (event) {
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

// Language Switcher Logic with comprehensive translations
const translations = {
  en: {
    // Hero Section
    heroGreeting: "Hi, I'm",
    heroLocation: "From India",
    heroTitle: "Full-Stack Web |",
    heroButton: "Contact Me",
    callMe: "Call Me",
    messageMe: "Message Me",
    
    // Sections
    about: "About Me",
    aboutText: "Hi, I'm Dipu K Raj, a passionate full-stack web and game developer who loves bringing ideas to life through code. I enjoy creating sleek, responsive front-end designs, powerful back-end systems, and immersive game experiences that connect creativity with technology. With a strong eye for design and a love for problem-solving, I aim to build projects that are both visually appealing and technically strong. Whether it's web development or game design, I'm always excited to learn, experiment, and create something meaningful. For me, coding isn't just a profession — it's a passion.💻🔥",
    
    skills: "Skills🔛",
    contact: "Contact Me",
    email: "Email:  websitedeveloper108@gmail.com",
    
    // Navigation
    navHome: "Home",
    navAbout: "About",
    navProjects: "My Projects",
    navWork: "My Work",
    navContact: "Contact",
    navCertificate: "Certificate",
    navWebsite: "Website",
    navGames: "Games"
  },
  hi: {
    // Hero Section
    heroGreeting: "नमस्ते, मैं हूँ",
    heroLocation: "भारत से",
    heroTitle: "फुल-स्टैक वेब |",
    heroButton: "संपर्क करें",
    callMe: "कॉल करें",
    messageMe: "मैसेज करें",
    
    // Sections
    about: "परिचय",
    aboutText: "नमस्ते, मैं दिपू के राज हूँ, एक उत्साही फुल-स्टैक वेब और गेम डेवलपर, जो कोड के माध्यम से विचारों को साकार करना पसंद करता है। मुझे आकर्षक, रिस्पॉन्सिव फ्रंट-एंड डिज़ाइन, शक्तिशाली बैक-एंड सिस्टम और इमर्सिव गेम अनुभव बनाने में मज़ा आता है जो रचनात्मकता को तकनीक से जोड़ते हैं। डिज़ाइन के प्रति गहरी समझ और समस्या-समाधान के प्रति प्रेम के साथ, मेरा लक्ष्य ऐसे प्रोजेक्ट बनाना है जो देखने में आकर्षक और तकनीकी रूप से मज़बूत हों। चाहे वेब डेवलपमेंट हो या गेम डिज़ाइन, मैं हमेशा सीखने, प्रयोग करने और कुछ सार्थक बनाने के लिए उत्साहित रहता हूँ। मेरे लिए, कोडिंग सिर्फ़ एक पेशा नहीं है - यह एक जुनून है!💻🔥",
    
    skills: "कौशल🔛",
    contact: "संपर्क करें",
    email: "ईमेल:  websitedeveloper108@gmail.com",
    
    // Navigation
    navHome: "होम",
    navAbout: "परिचय",
    navProjects: "मेरे प्रोजेक्ट",
    navWork: "मेरा काम",
    navContact: "संपर्क",
    navCertificate: "प्रमाणपत्र",
    navWebsite: "वेबसाइट",
    navGames: "गेम्स"
  },
  bho: {
    // Hero Section
    heroGreeting: "प्रणाम, हम बानी",
    heroLocation: "भारत से",
    heroTitle: "फुल-स्टैक वेब |",
    heroButton: "हमरा से बात करीं",
    callMe: "कॉल करीं",
    messageMe: "मैसेज करीं",
    
    // Sections
    about: "हमार बारे में",
    aboutText: "हम Dipu K Raj बानी, एगो जोशिला full-stack web आ game developer. हमरा के कोडिंग के माध्यम से आइडिया के हकीकत में बदलल बहुते अच्छा लागेला। हम responsive आ सुंदर web design बनावे में, मजबूत backend system तैयार करे में, आ मजेदार game experience डेवलप करे में माहिर बानी। डिजाइन पर हमारा नजर तेज बा, आ समस्या के हल निकालल हमरा के बहुते पसंद बा। हम चाहीला कि हमार हर प्रोजेक्ट देखे में नीक लागो आ तकनीकी रूप से मजबूत होखो। चाहे web development होखे चाहे game design, हम हर नया चीज सीखे, प्रयोग करे आ कुछ न कुछ नया बनावे में हमेशा तैयार रहेली। हमरा खातिर coding खाली पेशा ना, एकर नाम जुनून ह!💻🔥",
    
    skills: "कौशल🔛",
    contact: "संपर्क करीं",
    email: "ईमेल:  websitedeveloper108@gmail.com",
    
    // Navigation
    navHome: "घर",
    navAbout: "हमार बारे में",
    navProjects: "हमार प्रोजेक्ट",
    navWork: "हमार काम",
    navContact: "संपर्क",
    navCertificate: "प्रमाणपत्र",
    navWebsite: "वेबसाइट",
    navGames: "गेम"
  },
  mai: {
    // Hero Section
    heroGreeting: "प्रणाम, हम छी",
    heroLocation: "भारत सँ",
    heroTitle: "फुल-स्टैक वेब |",
    heroButton: "हमरा संगे जुड़ू",
    callMe: "कॉल करू",
    messageMe: "संदेश भेजू",
    
    // Sections
    about: "हमर बारे में",
    aboutText: "हम Dipu K Raj छी, एकटा उत्साही full-stack web आ game developer। हमरा coding मार्फत विचार केँ हकीकत बनाब'मे बहुत आनंद भेटैत अछि। हम responsive आ आकर्षक front-end design बनाबै छी, मजबूत back-end system तैयार करैत छी, आ मनोरंजक game अनुभव बनाब'मे रुचि राखैत छी — जत' सृजनशीलता आ तकनीक एक संग जुड़ि जाइत अछि। डिजाइन पर हमर नजर पैघ अछि, आ समस्या समाधान कर'मे हमरा बहुत नीक लगैत अछि। हमर उद्देश्य एहेन project बनाब'क अछि जे देखबा में सुन्दर होआय आ तकनीकी रूप सँ मजबूती सेहो रखैत होआय। वेब development हो कि game design — हम सदा नया सीखबाक, प्रयोग करबाक आ कुछ अर्थपूर्ण बनाब'क उत्साह राखैत छी। हमर लेल coding खाली पेशा नहि, एकटा जुनून अछि।💻🔥",
    
    skills: "कौशल🔛",
    contact: "संपर्क करू",
    email: "ईमेल:  websitedeveloper108@gmail.com",
    
    // Navigation
    navHome: "मुखपृष्ठ",
    navAbout: "हमर बारे में",
    navProjects: "हमर प्रोजेक्ट",
    navWork: "हमर काम",
    navContact: "संपर्क",
    navCertificate: "प्रमाणपत्र",
    navWebsite: "वेबसाइट",
    navGames: "गेम"
  }
};

function updateLanguage(lang) {
  // Get the translations for the selected language, default to English if not found
  const t = translations[lang] || translations['en'];
  
  // Update hero section
  const heroGreeting = document.querySelector('#hero-name-color');
  if (heroGreeting) heroGreeting.textContent = t.heroGreeting;
  
  const heroLocation = document.querySelector('#hero h2 span');
  if (heroLocation) heroLocation.textContent = t.heroLocation;
  
  const heroTitle = document.querySelector('.typewriter');
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  
  const heroButton = document.querySelector('.get-in-touch-btn');
  if (heroButton) heroButton.textContent = t.heroButton;
  
  const callMe = document.querySelector('.call-btn');
  if (callMe) callMe.innerHTML = `<i class="fas fa-phone"></i> ${t.callMe}`;
  
  const messageMe = document.querySelector('.message-btn');
  if (messageMe) messageMe.innerHTML = `<i class="fas fa-comment"></i> ${t.messageMe}`;
  
  // Update about section
  const aboutH2 = document.querySelector('#about h2');
  if (aboutH2) aboutH2.textContent = t.about;
  
  const aboutP = document.querySelector('#about p');
  if (aboutP) aboutP.textContent = t.aboutText;
  
  // Update skills section heading
  const skillsH2 = document.querySelector('#skills h2');
  if (skillsH2) skillsH2.textContent = t.skills;
  
  // Update contact section
  const contactH2 = document.querySelector('#contact h2');
  if (contactH2) contactH2.textContent = t.contact;
  
  const contactEmail = document.querySelector('#contact p');
  if (contactEmail) contactEmail.innerHTML = t.email;
  
  // Update navigation links
  const navLinks = {
    'navHome': 'a[href="#hero"]',
    'navAbout': 'a[href="#about"]',
    'navProjects': 'a[href="#projects"]',
    'navWork': 'a[href="#work"]',
    'navContact': 'a[href="#contact"]',
    'navCertificate': 'a[href="#certificate"]',
    'navWebsite': 'a[href="#website"]',
    'navGames': 'a[href="#games"]'
  };
  
  Object.entries(navLinks).forEach(([key, selector]) => {
    const element = document.querySelector(selector);
    if (element && t[key]) {
      element.textContent = t[key];
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Save selected language to localStorage
  localStorage.setItem('preferredLanguage', lang);
  
  // Debug log
  console.log(`Language changed to: ${lang}`);
}

// Language switcher event listener
function initializeLanguageSwitcher() {
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    // Load saved language or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    
    // Set the selected value
    languageSwitcher.value = savedLanguage;
    
    // Update the UI immediately
    updateLanguage(savedLanguage);
    
    // Add change event listener
    languageSwitcher.addEventListener('change', function(e) {
      const lang = e.target.value;
      updateLanguage(lang);
    });
  }
}

// Load saved language or default to English
function loadPreferredLanguage() {
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  updateLanguage(savedLanguage);
  
  // Update the dropdown to reflect the current language
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    languageSwitcher.value = savedLanguage;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize language switcher
  initializeLanguageSwitcher();
  
  // Load preferred language
  loadPreferredLanguage();
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
    langSwitcher.addEventListener('change', function () {
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
    toggleBtn.addEventListener('click', function () {
      if (document.body.classList.contains('light-mode')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  }
  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener('click', function () {
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
    settingsIcon.addEventListener('click', function () {
      colorPalette.classList.toggle('active');
    });
    document.querySelectorAll('.color-option').forEach(opt => {
      opt.addEventListener('click', function () {
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

// Live Chat System
let chatListenerRegistered = false; // Prevent duplicate listener registration

function initializeLiveChat() {
  // Prevent multiple initializations
  if (chatListenerRegistered) {
    return;
  }
  
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatInput = document.getElementById('chat-input');
  const sendMessage = document.getElementById('send-message');
  const chatMessages = document.getElementById('chat-messages');

  // Chat toggle functionality
  chatToggle.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    if (chatWindow.style.display === 'flex') {
      chatInput.focus();
    }
  });

  // Close chat
  closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
  });

  // Send message functionality
  function sendChatMessage() {
    const message = chatInput.value.trim();
    // Basic rate limit: 1 message per 2 seconds
    const lastSent = Number(localStorage.getItem('lastChatSentTs') || 0);
    const now = Date.now();
    if (now - lastSent < 2000) {
      showNotification('Please wait a moment before sending again.', 'warning');
      return;
    }
    if (message) {
      // Add message to Firebase
      const chatRef = database.ref('chatMessages');
      const newMessage = {
        text: message,
        sender: 'visitor',
        timestamp: Date.now(),
        visitorId: generateVisitorId()
      };

      chatRef.push(newMessage);
      localStorage.setItem('lastChatSentTs', String(now));
      chatInput.value = '';
    }
  }

  // Send button click
  sendMessage.addEventListener('click', sendChatMessage);

  // Enter key press
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });

  // Generate unique visitor ID
  function generateVisitorId() {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
  }

  // Track processed messages to prevent duplicate responses
  const processedMessages = new Set();
  
  // Listen for real-time messages (single listener for both display and auto-response)
  const chatRef = database.ref('chatMessages');
  
  // Register listener only once
  if (!chatListenerRegistered) {
    chatRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      const messageId = snapshot.key;
      
      // Display all messages
      displayMessage(message);
      
      // Auto-response only for visitor messages (and only once per message)
      if (message.sender === 'visitor' && !processedMessages.has(messageId)) {
        processedMessages.add(messageId);
        
        // Add auto-response after 2 seconds
        setTimeout(() => {
          const autoResponse = {
            text: addAutoResponse(message.text),
            sender: 'admin',
            timestamp: Date.now()
          };
          chatRef.push(autoResponse);
        }, 2000);
      }
    });
    
    chatListenerRegistered = true; // Mark as registered
  }

  // Display message in chat
  function displayMessage(message) {
    // Check if message already displayed (prevent duplicates)
    const messageId = 'msg_' + message.timestamp + '_' + (message.text || '').substring(0, 20);
    if (document.getElementById(messageId)) {
      return; // Already displayed
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.id = messageId;
    messageDiv.className = `message ${message.sender}`;

    const messageP = document.createElement('p');
    messageP.textContent = message.text;
    messageDiv.appendChild(messageP);

    chatMessages.appendChild(messageDiv);

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add timestamp
    const timestamp = new Date(message.timestamp).toLocaleTimeString();
    const timeSpan = document.createElement('span');
    timeSpan.style.fontSize = '0.7rem';
    timeSpan.style.opacity = '0.7';
    timeSpan.style.marginTop = '5px';
    timeSpan.style.display = 'block';
    timeSpan.textContent = timestamp;
    messageDiv.appendChild(timeSpan);
  }

  // Auto-response system (improved, multi-language & intent-based with priority)
  function addAutoResponse(message) {
    const lower = (message || '').toLowerCase();

    // Priority-based matching (first match wins - prevents multiple responses)
    
    // 1) Greetings / small talk (highest priority)
    if (
      /\b(hi|hello|hey|hii|namaste|namaskar|pranam|pranam ji)\b/.test(lower)
    ) {
      return 'Namaste! 😊 Main Dipu ka auto‑chat assistant hoon. Aap jo bhi poochhna chahte hain, seedhe likhiye (English / Hindi / Hinglish), main uske hisaab se help karne ki koshish karunga.';
    }

    // 2) Help / support
    if (
      lower.includes('help') ||
      lower.includes('madad') ||
      lower.includes('sahayta') ||
      lower.includes('problem') ||
      lower.includes('issue') ||
      lower.includes('error')
    ) {
      return 'Bilkul, main madad ke liye yahan hoon. Aap apni problem thoda detail mein likhiye (kis page / section mein dikkat aa rahi hai), main aapko clear steps mein guide karunga. Agar bahut complex ho, to Dipu aapko personally email ya WhatsApp se reply karenge. 🙂';
    }

    // 3) Contact details
    if (
      lower.includes('contact') ||
      lower.includes('sampark') ||
      lower.includes('phone') ||
      lower.includes('mobile') ||
      lower.includes('number') ||
      lower.includes('call') ||
      lower.includes('whatsapp') ||
      lower.includes('email')
    ) {
      return 'Aap Dipu se directly in details par contact kar sakte hain:\n\n📧 Email: websitedeveloper108@gmail.com\n📱 WhatsApp / Call: +91 72958 08100\n\nYa upar wale "Contact Me" form se bhi apna message bhej sakte hain.';
    }

    // 4) About / who are you
    if (
      lower.includes('who are you') ||
      lower.includes('tum kaun') ||
      lower.includes('aap kaun') ||
      lower.includes('kya karte') ||
      lower.includes('about you') ||
      lower.includes('portfolio') ||
      lower.includes('about me')
    ) {
      return 'Main Dipu K Raj hoon – full‑stack web & game developer. 😊 Is portfolio mein aapko mere projects, skills, certificates aur contact details sab mil jayenge. Aap "About Me" aur "Projects" sections zaroor dekhiye.';
    }

    // 5) Skills / technologies
    if (
      lower.includes('skill') ||
      lower.includes('technology') ||
      lower.includes('tech stack') ||
      lower.includes('stack') ||
      lower.includes('language') ||
      lower.includes('programming')
    ) {
      return 'Main mainly in cheezon par kaam karta hoon:\n\n- Frontend: HTML, CSS, JavaScript, TypeScript\n- Backend: Node.js, Express, MongoDB, Firebase\n- Programming: C/C++, Python, Java, C#, MATLAB, Go, Rust, PHP, Ruby, Scala\n- Games: Unity (C#) 2D/3D\n\nDetail mein dekhne ke liye "Skills" aur "My Tech Skills" section kholiye. 💻';
    }

    // 6) Projects / websites / games
    if (
      lower.includes('project') ||
      lower.includes('website') ||
      lower.includes('site') ||
      lower.includes('game') ||
      lower.includes('portfolio')
    ) {
      return 'Aap mere real projects "Projects", "Website" aur "Games" sections mein dekh sakte hain. Har card par "Visit Site" / link diya hai, usse aap live project open kar sakte hain. Agar kisi specific project ke baare mein poochhna hai, uska naam likh ke poochhiye. 🚀';
    }

    // 7) Price / charges / freelancing
    if (
      lower.includes('price') ||
      lower.includes('charge') ||
      lower.includes('fees') ||
      lower.includes('kitna') ||
      lower.includes('cost') ||
      lower.includes('paisa') ||
      lower.includes('bhada') ||
      lower.includes('website bana') ||
      lower.includes('portfolio bana')
    ) {
      return 'Project ki cost aapki requirement par depend karti hai (kitne pages, features, design complexity, backend, etc.). Aap short mein likhiye ki aapko kaisa website / app chahiye – main aapko approx range bata sakta hoon, aur exact discussion ke liye Dipu aapko WhatsApp / email par contact karenge. 💼';
    }

    // 8) Location / where are you from
    if (
      lower.includes('where are you from') ||
      lower.includes('kaha se ho') ||
      lower.includes('kahan se ho') ||
      lower.includes('location') ||
      lower.includes('city') ||
      lower.includes('from india')
    ) {
      return 'Main India se hoon 🇮🇳. Aap kahaan se dekh rahe hain, woh bhi likh sakte hain – mujhe bhi jaan kar accha lagega. 🙂';
    }

    // 9) Thanks / appreciation
    if (
      lower.includes('thank') ||
      lower.includes('shukriya') ||
      lower.includes('dhanyavaad') ||
      lower.includes('thanks')
    ) {
      return 'Aapka bahut‑bahut dhanyavaad! 😊 Agar aapko mera portfolio pasand aaya ho to feedback section mein rating zaroor dijiye, aur agar aur koi sawal ho to poochhiye.';
    }

    // 10) Default fallback – be honest about limitations
    return 'Aapka message mil gaya, dhanyavaad! 🙂 Ye chat ek simple auto‑reply system hai, isliye har question ko bilkul human jaisa samajh nahi pata. Aap apna sawal thoda clear points mein likhiye, ya directly email / WhatsApp par contact kijiye:\n\n📧 Email: websitedeveloper108@gmail.com\n📱 WhatsApp / Call: +91 72958 08100\n\nDipu aapko jald hi personally reply dene ki koshish karenge. 📝';
  }
}

// Initialize live chat when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Lazy-init live chat on first interaction
  const chatToggleBtn = document.getElementById('chat-toggle');
  if (chatToggleBtn) {
    let chatInitialized = false;
    const initChatOnce = () => {
      if (!chatInitialized) {
        initializeLiveChat();
        chatInitialized = true;
      }
    };
    chatToggleBtn.addEventListener('pointerdown', initChatOnce, { once: true });
    chatToggleBtn.addEventListener('click', initChatOnce, { once: true });
  }
});

// Live Notifications System
function showNotification(message, type = 'info', duration = 5000) {
  const container = document.getElementById('notifications-container');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `<p>${message}</p>`;

  container.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
      container.removeChild(notification);
    }, 300);
  }, duration);
}

// Live Analytics System
function initializeAnalytics() {
  const analyticsToggle = document.getElementById('analytics-toggle');
  const analyticsPanel = document.getElementById('analytics-panel');
  const closeAnalytics = document.getElementById('close-analytics');

  analyticsToggle.addEventListener('click', () => {
    analyticsPanel.style.display = analyticsPanel.style.display === 'none' ? 'block' : 'none';
    if (analyticsPanel.style.display === 'block') {
      updateAnalytics();
    }
  });

  closeAnalytics.addEventListener('click', () => {
    analyticsPanel.style.display = 'none';
  });

  // Update analytics data
  function updateAnalytics() {
    // Total visitors
    const visitorRef = database.ref('visitorCount');
    visitorRef.once('value', (snapshot) => {
      const count = snapshot.val() || 0;
      document.getElementById('total-visitors').textContent = count;
    });

    // Online now (active in last 5 minutes)
    const onlineRef = database.ref('onlineUsers');
    onlineRef.once('value', (snapshot) => {
      const onlineCount = snapshot.numChildren() || 0;
      document.getElementById('online-now').textContent = onlineCount;
    });

    // Page views
    const pageViewsRef = database.ref('pageViews');
    pageViewsRef.once('value', (snapshot) => {
      const views = snapshot.val() || 0;
      document.getElementById('page-views').textContent = views;
    });

    // Chat messages
    const chatRef = database.ref('chatMessages');
    chatRef.once('value', (snapshot) => {
      const chatCount = snapshot.numChildren() || 0;
      document.getElementById('chat-count').textContent = chatCount;
    });
  }

  // Track page view
  const pageViewsRef = database.ref('pageViews');
  pageViewsRef.transaction((currentViews) => {
    return (currentViews || 0) + 1;
  });

  // Track online status
  const visitorId = generateVisitorId();
  const onlineRef = database.ref(`onlineUsers/${visitorId}`);
  onlineRef.set({
    timestamp: Date.now(),
    userAgent: navigator.userAgent
  });

  // Remove from online users when page unloads
  window.addEventListener('beforeunload', () => {
    onlineRef.remove();
  });

  // Clean up old online users (older than 5 minutes)
  setInterval(() => {
    const cutoff = Date.now() - (5 * 60 * 1000);
    onlineRef.orderByChild('timestamp').startAt(0).endAt(cutoff).remove();
  }, 60000); // Check every minute
}

// Live Status Indicator
function initializeStatusIndicator() {
  const statusIndicator = document.getElementById('status-indicator');
  const statusDot = statusIndicator.querySelector('.status-dot');
  const statusText = statusIndicator.querySelector('.status-text');

  // Update status based on connection
  function updateStatus() {
    if (navigator.onLine) {
      statusDot.style.background = '#10b981';
      statusText.textContent = 'Online';
      statusText.style.color = '#10b981';
    } else {
      statusDot.style.background = '#ef4444';
      statusText.textContent = 'Offline';
      statusText.style.color = '#ef4444';
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

// Live Comments/Feedback System
function initializeFeedback() {
  const feedbackToggle = document.getElementById('feedback-toggle');
  const feedbackPanel = document.getElementById('feedback-panel');
  const closeFeedback = document.getElementById('close-feedback');
  const stars = document.querySelectorAll('.star');
  const feedbackText = document.getElementById('feedback-text');
  const submitFeedback = document.getElementById('submit-feedback');

  let selectedRating = 0;

  feedbackToggle.addEventListener('click', () => {
    feedbackPanel.style.display = feedbackPanel.style.display === 'none' ? 'block' : 'none';
  });

  closeFeedback.addEventListener('click', () => {
    feedbackPanel.style.display = 'none';
  });

  // Star rating functionality
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      selectedRating = index + 1;
      stars.forEach((s, i) => {
        if (i < selectedRating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });

    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.style.opacity = '1';
        }
      });
    });

    star.addEventListener('mouseleave', () => {
      stars.forEach((s, i) => {
        if (i >= selectedRating) {
          s.style.opacity = '0.3';
        }
      });
    });
  });

  // Submit feedback
  submitFeedback.addEventListener('click', () => {
    const text = feedbackText.value.trim();
    // Basic rate limit: 1 feedback per 30 seconds
    const lastFeedback = Number(localStorage.getItem('lastFeedbackTs') || 0);
    const nowTs = Date.now();
    if (nowTs - lastFeedback < 30000) {
      showNotification('Please wait before submitting another feedback.', 'warning');
      return;
    }

    if (selectedRating === 0) {
      showNotification('Please select a rating!', 'warning');
      return;
    }

    if (text.length < 10) {
      showNotification('Please write at least 10 characters!', 'warning');
      return;
    }

    const feedback = {
      rating: selectedRating,
      text: text,
      timestamp: Date.now(),
      visitorId: generateVisitorId(),
      userAgent: navigator.userAgent
    };

    const feedbackRef = database.ref('feedback');
    feedbackRef.push(feedback).then(() => {
      showNotification('Thank you for your feedback! 😊', 'success');
      feedbackText.value = '';
      selectedRating = 0;
      stars.forEach(star => star.classList.remove('active'));
      feedbackPanel.style.display = 'none';
      localStorage.setItem('lastFeedbackTs', String(nowTs));
    }).catch((error) => {
      showNotification('Error submitting feedback. Please try again.', 'error');
    });
  });
}

// Generate unique visitor ID (reuse from chat)
function generateVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}

// Initialize all systems when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Lazy-init analytics on first open
  const analyticsToggle = document.getElementById('analytics-toggle');
  if (analyticsToggle) {
    let analyticsInitialized = false;
    const initAnalyticsOnce = () => {
      if (!analyticsInitialized) {
        initializeAnalytics();
        analyticsInitialized = true;
      }
    };
    analyticsToggle.addEventListener('pointerdown', initAnalyticsOnce, { once: true });
    analyticsToggle.addEventListener('click', initAnalyticsOnce, { once: true });
  }

  // Always-on, lightweight
  initializeStatusIndicator();

  // Lazy-init feedback on first open
  const feedbackToggle = document.getElementById('feedback-toggle');
  if (feedbackToggle) {
    let feedbackInitialized = false;
    const initFeedbackOnce = () => {
      if (!feedbackInitialized) {
        initializeFeedback();
        feedbackInitialized = true;
      }
    };
    feedbackToggle.addEventListener('pointerdown', initFeedbackOnce, { once: true });
    feedbackToggle.addEventListener('click', initFeedbackOnce, { once: true });
  }

  // Show welcome notification
  setTimeout(() => {
    showNotification('Welcome to my portfolio! Feel free to explore! 🚀', 'success', 3000);
  }, 1000);

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => { });
  }
});

// Certificate functions are now handled in HTML inline scripts