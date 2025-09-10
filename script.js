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
document.addEventListener("DOMContentLoaded", function () {
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
function initializeLiveChat() {
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

  // Listen for real-time messages
  const chatRef = database.ref('chatMessages');
  chatRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    displayMessage(message);
  });

  // Display message in chat
  function displayMessage(message) {
    const messageDiv = document.createElement('div');
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

  // Auto-response system
  function addAutoResponse(message) {
    const responses = {
      'hello': 'Hello! How can I help you today? 😊',
      'hi': 'Hi there! Welcome to my portfolio! 👋',
      'help': 'I\'m here to help! What would you like to know? 🤔',
      'contact': 'You can contact me via email: kumardipu1436@gmail.com or through the contact form above! 📧',
      'project': 'Check out my projects section to see my work! 🚀',
      'skill': 'I specialize in web development, Python, and design. Check my skills section for details! 💻',
      'thank': 'You\'re welcome! Feel free to ask anything else! 😊'
    };

    const lowerMessage = message.toLowerCase();
    for (let key in responses) {
      if (lowerMessage.includes(key)) {
        return responses[key];
      }
    }
    return 'Thanks for your message! I\'ll get back to you soon! 📝';
  }

  // Listen for visitor messages and add auto-response
  chatRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    if (message.sender === 'visitor') {
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

//Certificate display function
function showCertificate(certNumber) {
  const modal = document.getElementById('certificateModal');
  const img = document.getElementById('certificateImg');

  // Certificate image mapping
  const certificateImages = {
    1: 'image certificate/certificate1.jpg',
    2: 'image certificate/certificate2.jpg',
    3: 'image certificate/certificate3.jpg',
    4: 'image certificate/certificate4.jpg',
    5: 'image certificate/certificate5.jpg',
    6: 'image certificate/certificate6.jpg',
    7: 'image certificate/certificate7.jpg',
    8: 'image certificate/certificate8.jpg',
    9: 'image certificate/certificate9.jpg',
    10: 'image certificate/certificate10.jpg',
    11: 'image certificate/certificate11.jpg',
    12: 'image certificate/certificate12.jpg',
    13: 'image certificate/certificate13.jpg',
    14: 'image certificate/certificate14.jpg',
    15: 'image certificate/certificate15.jpg',
    16: 'image certificate/certificate16.jpg',
    17: 'image certificate/certificate17.jpg',
    18: 'image certificate/certificate18.jpg',
    19: 'image certificate/certificate19.jpg',
    20: 'image certificate/certificate20.jpg',
    21: 'image certificate/certificate21.jpg',
    22: 'image certificate/certificate22.jpg',
    23: 'image certificate/certificate23.jpg',
    24: 'image certificate/certificate24.jpg',
    25: 'image certificate/certificate25.jpg',
    26: 'image certificate/certificate26.jpg',
    27: 'image certificate/certificate27.jpg',
    28: 'image certificate/certificate28.jpg',
    29: 'image certificate/certificate29.jpg',
    30: 'image certificate/certificate30.jpg',
    31: 'image certificate/certificate31.jpg',
    32: 'image certificate/certificate32.jpg',
    33: 'image certificate/certificate33.jpg',
    34: 'image certificate/certificate34.jpg',
    35: 'image certificate/certificate35.jpg',
    36: 'image certificate/certificate36.jpg',
    37: 'image certificate/certificate37.jpg',
    38: 'image certificate/certificate38.jpg',
    39: 'image certificate/certificate39.jpg',
    40: 'image certificate/certificate40.jpg',
    41: 'image certificate/certificate41.jpg',
    42: 'image certificate/certificate42.jpg',
    43: 'image certificate/certificate43.jpg',
    44: 'image certificate/certificate44.jpg',
    45: 'image certificate/certificate45.jpg',
    46: 'image certificate/certificate46.jpg',
    // New certificates
    47: 'image certificate/1- cyber deloitte.jpg',
    48: 'image certificate/2- cybersecurity tata.jpg',
    49: 'image certificate/3- cybersecurity telstra.jpg',
    50: 'image certificate/4- Data Analytics deloitte.jpg',
    51: 'image certificate/5-Software forage.jpg',
    52: 'image certificate/6- solutions Architecture Amazon.jpg',
    53: 'image certificate/7- Technology deloitte.jpg'
  };

  if (certificateImages[certNumber]) {
    img.src = certificateImages[certNumber];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

// Close certificate modal
function closeCertificate() {
  const modal = document.getElementById('certificateModal');
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside the image
document.addEventListener('click', function (event) {
  const modal = document.getElementById('certificateModal');
  const img = document.getElementById('certificateImg');

  if (event.target === modal && !img.contains(event.target)) {
    closeCertificate();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeCertificate();
  }
});