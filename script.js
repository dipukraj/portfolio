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

// Firebase Auth setup
let isUserAuthenticated = false;
let authCallbacks = [];

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    firebase.auth().signInAnonymously().catch((err) => {
      console.error("Anonymous authentication error:", err);
    });
  } else {
    isUserAuthenticated = true;
    localStorage.setItem('visitorId', user.uid);
    
    // Execute deferred callbacks
    while (authCallbacks.length > 0) {
      const cb = authCallbacks.shift();
      try { cb(user); } catch (e) { console.error(e); }
    }
  }
});

function runWithAuth(callback) {
  if (isUserAuthenticated) {
    callback(firebase.auth().currentUser);
  } else {
    authCallbacks.push(callback);
  }
}

// Global variables
let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.getElementById("navLinks");
let text = "   Game Developer | Coder | Graphics Designer ";
let index = 0;
let typewriterTimeout = null;

// Real-time Visitor Counter
function updateVisitorCount() {
  runWithAuth(() => {
    const visitorRef = database.ref('visitorCount');

    // Increment visitor count
    visitorRef.transaction((currentCount) => {
      return (currentCount || 0) + 1;
    });

    // Listen for real-time updates
    visitorRef.on('value', (snapshot) => {
      const count = snapshot.val() || 0;
      const counterNum = document.querySelector('#visitor-counter .visitor-number');
      if (counterNum) {
        counterNum.textContent = count;
      } else {
        const counterDiv = document.getElementById('visitor-counter');
        if (counterDiv) {
          counterDiv.textContent = `Visitor Count: ${count}`;
        }
      }
    });
  });
}

// Typewriter effect with improved performance
function startTypewriter(prefix, suffix) {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }

  const typewriter = document.querySelector('.typewriter');
  if (!typewriter) return;

  typewriter.textContent = prefix;

  let index = 0;
  function type() {
    if (index < suffix.length) {
      typewriter.textContent += suffix.charAt(index);
      index++;
      typewriterTimeout = setTimeout(type, 100);
    }
  }
  type();
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
function switchWorkImage(imageId, clickedButton) {
  // Hide all images
  const images = document.querySelectorAll('.work-image');
  images.forEach(img => {
    img.classList.remove('active');
  });

  // Show selected image
  const selectedImage = document.getElementById(imageId);
  if (selectedImage) {
    selectedImage.classList.add('active');
  }

  // Update button states
  const buttons = document.querySelectorAll('.image-switch-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Activate the clicked button
  if (clickedButton) {
    clickedButton.classList.add('active');
  } else {
    const btn = document.querySelector(`.image-switch-btn[onclick*="${imageId}"]`);
    if (btn) btn.classList.add('active');
  }
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
    heroEducation: "MCA Student @ IIT Patna & IIIT Ranchi",
    heroTitle: "MCA @ IIT Patna |",
    heroSubTitle: " Full-Stack Web | Game Developer | Coder | Graphics Designer ",
    heroButton: "Contact Me",
    callMe: "Call Me",
    messageMe: "Message Me",
    
    // Sections
    about: "About <span class=\"text-accent\">Me.</span>",
    aboutText1: "I am a Full Stack Developer currently pursuing an MCA through the collaborative program offered by IIIT Ranchi & IIT Patna. I have hands-on experience in building modern, scalable web applications using the MERN stack, with expertise in responsive frontend development, secure backend APIs, database management, and complete end-to-end application development.",
    aboutText2: "Alongside my technical journey, I gained one year of professional experience at NTPC Limited in Corporate Communication, where I worked on digital magazines, branding materials, creative designs, and corporate communication initiatives. This experience strengthened my creativity, communication, teamwork, and problem-solving abilities while providing valuable exposure to real-world organizational workflows.",
    aboutText3: "I am passionate about building technology that solves real-world problems and delivers meaningful user experiences. I enjoy learning new technologies, optimizing application performance, and writing clean, maintainable code. My goal is to continuously grow as a developer while creating reliable, scalable, and impactful digital products that make a difference.",
    
    servicesHeading: "My <span class=\"text-accent\">Services.</span>",
    skills: "Technical <span class=\"text-accent\">Skills.</span>",
    contact: "Contact <span class=\"text-accent\">Me.</span>",
    email: "Have a question, want to discuss a project, or just want to say hello? My inbox is always open. Drop me a message and I'll get back to you as soon as possible!",
    
    // Navigation
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "My Projects",
    navWork: "My Work",
    navContact: "Contact",
    navCertificate: "Certificate",
    navWebsite: "Website",
    navGames: "Games",
    navGraphics: "Graphics Design"
  },
  hi: {
    // Hero Section
    heroGreeting: "नमस्ते, मैं हूँ",
    heroLocation: "भारत से",
    heroEducation: "MCA छात्र @ IIT Patna & IIIT Ranchi",
    heroTitle: "IIT Patna से MCA |",
    heroSubTitle: " फुल-स्टैक वेब | गेम डेवलपर | कोडर | ग्राफ़िक्स डिज़ाइन ",
    heroButton: "संपर्क करें",
    callMe: "कॉल करें",
    messageMe: "मैसेज करें",
    
    // Sections
    about: "मेरे <span class=\"text-accent\">बारे में.</span>",
    aboutText1: "मैं एक फुल स्टैक डेवलपर हूँ और वर्तमान में IIIT रांची और IIT पटना द्वारा संचालित सहयोगात्मक कार्यक्रम के माध्यम से MCA कर रहा हूँ। मेरे पास MERN स्टैक का उपयोग करके आधुनिक, स्केलेबल वेब एप्लिकेशन बनाने का व्यावहारिक अनुभव है, जिसमें रिस्पॉन्सिव फ्रंटएंड डेवलपमेंट, सुरक्षित बैकएंड APIs, डेटाबेस मैनेजमेंट और एंड-टू-एंड एप्लिकेशन डेवलपमेंट में विशेषज्ञता शामिल है।",
    aboutText2: "अपनी तकनीकी यात्रा के साथ-साथ, मैंने NTPC लिमिटेड में कॉर्पोरेट कम्युनिकेशन विभाग में एक वर्ष का व्यावसायिक अनुभव प्राप्त किया है, जहाँ मैंने डिजिटल पत्रिकाओं, ब्रांडिंग सामग्रियों, रचनात्मक डिज़ाइनों और कॉर्पोरेट संचार पहलों पर काम किया। इस अनुभव ने मेरी रचनात्मकता, संचार कौशल, टीमवर्क और समस्या-समाधान क्षमताओं को मजबूत किया, साथ ही वास्तविक संगठनात्मक कार्यप्रणालियों का बहुमूल्य अनुभव भी प्रदान किया।",
    aboutText3: "मैं ऐसी तकनीक बनाने के लिए जुनूनी हूँ जो वास्तविक दुनिया की समस्याओं का समाधान करे और सार्थक उपयोगकर्ता अनुभव प्रदान करे। मुझे नई तकनीकों को सीखने, एप्लिकेशन प्रदर्शन को अनुकूलित करने और साफ, रखरखाव योग्य कोड लिखने में आनंद आता है। मेरा लक्ष्य एक डेवलपर के रूप में लगातार आगे बढ़ना है और ऐसे विश्वसनीय, स्केलेबल और प्रभावशाली डिजिटल उत्पाद बनाना है जो बदलाव ला सकें।",
    
    servicesHeading: "हमारी <span class=\"text-accent\">सेवाएं.</span>",
    skills: "तकनीकी <span class=\"text-accent\">कौशल.</span>",
    contact: "संपर्क <span class=\"text-accent\">करें.</span>",
    email: "कोई सवाल है, किसी प्रोजेक्ट पर चर्चा करना चाहते हैं, या बस नमस्ते कहना चाहते हैं? मेरा इनबॉक्स हमेशा खुला है। मुझे संदेश भेजें और मैं जल्द से जल्द आपसे संपर्क करूँगा!",
    
    // Navigation
    navHome: "होम",
    navAbout: "परिचय",
    navServices: "सेवाएं",
    navSkills: "कौशल",
    navExperience: "अनुभव",
    navProjects: "मेरे प्रोजेक्ट",
    navWork: "मेरा काम",
    navContact: "संपर्क",
    navCertificate: "प्रमाणपत्र",
    navWebsite: "वेबसाइट",
    navGames: "गेम्स",
    navGraphics: "ग्राफिक्स डिजाइन"
  },
  bho: {
    // Hero Section
    heroGreeting: "प्रणाम, हम बानी",
    heroLocation: "भारत से",
    heroEducation: "MCA छात्र @ IIT Patna & IIIT Ranchi",
    heroTitle: "IIT Patna से MCA |",
    heroSubTitle: " फुल-स्टैक वेब | गेम डेवलपर | कोडर | ग्राफ़िक्स डिज़ाइन ",
    heroButton: "हमरा से बात करीं",
    callMe: "कॉल करीं",
    messageMe: "मैसेज करीं",
    
    // Sections
    about: "हमरा <span class=\"text-accent\">बारे में.</span>",
    aboutText1: "हम एगो फुल स्टैक डेवलपर बानी आ वर्तमान में IIIT रांची आ IIT पटना द्वारा संचालित सहयोगात्मक कार्यक्रम के माध्यम से MCA करत बानी। हमरा MERN स्टैक के प्रयोग से आधुनिक आ स्केलेबल वेब एप्लीकेशन बनावे के व्यावहारिक अनुभव बा, जवना में रिस्पॉन्सिव फ्रंटएंड डेवलपमेंट, सुरक्षित बैकएंड APIs, डेटाबेस मैनेजमेंट आ एंड-टू-एंड एप्लिकेशन डेवलपमेंट में विशेषज्ञता बा।",
    aboutText2: "अपना तकनीकी यात्रा के साथ-साथ, हम NTPC लिमिटेड में कॉर्पोरेट कम्युनिकेशन विभाग में एक साल के व्यावसायिक अनुभव प्राप्त कइले बानी, जहाँ हम डिजिटल पत्रिका, ब्रांडिंग सामग्री, रचनात्मक डिज़ाइन आ कॉर्पोरेट संचार पहल पर काम कइलीं। एहि अनुभव से हमार रचनात्मकता, बातचीत करे के तरीका, टीमवर्क आ समस्या-समाधान के क्षमता अउरी मजबूत भइल, आ साथ ही संगठन के असली कामकाज के सीखे के मौका मिलल।",
    aboutText3: "हम अइसन तकनीक बनावे खातिर जुनूनी बानी जे असल दुनिया के समस्या के समाधान करे। हमरा नया तकनीक सीखल, एप्लिकेशन के परफॉर्मेंस बेहतर बनावल आ साफ़, रखरखाव योग्य कोड लिखल बहुत पसंद बा। हमार लक्ष्य एगो डेवलपर के रूप में लगातार आगे बढ़ल बा आ अइसन विश्वसनीय, स्केलेबल आ प्रभावशाली डिजिटल उत्पाद बनावल बा जे बदलाव ला सके।",
    
    servicesHeading: "हमार <span class=\"text-accent\">सेवा.</span>",
    skills: "तकनीकी <span class=\"text-accent\">कौशल.</span>",
    contact: "संपर्क <span class=\"text-accent\">करीं.</span>",
    email: "कोनो सवाल बा, कवनो प्रोजेक्ट पर चर्चा करे के बा, चाहे खाली प्रणाम करे के बा? हमार इनबॉक्स हमेशा खुलल बा। हमरा के संदेश भेजीं आ हम जल्द से जल्द रउआ से संपर्क करब!",
    
    // Navigation
    navHome: "घर",
    navAbout: "हमार बारे में",
    navServices: "सेवा",
    navSkills: "कौशल",
    navExperience: "अनुभव",
    navProjects: "हमार प्रोजेक्ट",
    navWork: "हमार काम",
    navContact: "संपर्क",
    navCertificate: "प्रमाणपत्र",
    navWebsite: "वेबसाइट",
    navGames: "गेम",
    navGraphics: "ग्राफिक्स डिजाइन"
  },
  mai: {
    // Hero Section
    heroGreeting: "प्रणाम, हम छी",
    heroLocation: "भारत स",
    heroEducation: "MCA छात्र @ IIT Patna & IIIT Ranchi",
    heroTitle: "IIT Patna सँ MCA |",
    heroSubTitle: " फुल-स्टैक वेब | गेम डेवलपर | कोडर | ग्राफ़िक्स डिज़ाइन ",
    heroButton: "हमरा संगे जुड़ू",
    callMe: "कॉल करू",
    messageMe: "संदेश भेजू",
    
    // Sections
    about: "हमर <span class=\"text-accent\">बारे में.</span>",
    aboutText1: "हम एकटा फुल स्टैक डेवलपर छी आ वर्तमान में IIIT रांची आ IIT पटना द्वारा संचालित सहयोगात्मक कार्यक्रमक माध्यम स MCA क रहल छी। हमरा MERN स्टैक क प्रयोग स आधुनिक आ स्केलेबल वेब एप्लीकेशन बनेबाक व्यावहारिक अनुभव अछि, जाहि में रिस्पॉन्सिव फ्रंटएंड डेवलपमेंट, सुरक्षित बैकएंड APIs, डेटाबेस मैनेजमेंट आ एंड-टू-एंड एप्लिकेशन डेवलपमेंट में विशेषज्ञता अछि।",
    aboutText2: "अपन तकनीकी यात्रा क संग-संग, हम NTPC लिमिटेड में कॉर्पोरेट कम्युनिकेशन विभाग में एक वर्षक व्यावसायिक अनुभव प्राप्त कयने छी, जतय हम डिजिटल पत्रिका, ब्रांडिंग सामग्री, रचनात्मक डिज़ाइन आ कॉर्पोरेट संचार पहल पर काज कयलों। एहि अनुभव स हमर रचनात्मकता, संचार कौशल, टीमवर्क आ समस्या-समाधान क्षमता आओर मजबूत भेल, संगहि संगठनक असली कार्यप्रणाली क सीखबाक मौका भेटल।",
    aboutText3: "हम एहेन तकनीक बनेबाक लेल जुनूनी छी जे असल दुनियाक समस्या सभ क समाधान करैत अछि। हमरा नव तकनीक सीखब, एप्लिकेशन क परफॉर्मेंस बेहतर बनाबब आ साफ़, रख-रखाव योग्य कोड लिखब बहुत नीक लगैत अछि। हमर लक्ष्य एकटा डेवलपर क रूप में लगातार आगा बढ़ब अछि आ एहेन विश्वसनीय, स्केलेबल आ प्रभावशाली डिजिटल उत्पाद बनेब अछि जे बदलाव आनि सकय।",
    
    servicesHeading: "हमर <span class=\"text-accent\">सेवा.</span>",
    skills: "तकनीकी <span class=\"text-accent\">कौशल.</span>",
    contact: "सम्पर्क <span class=\"text-accent\">करू.</span>",
    email: "कोनो प्रश्न अछि, ककरो प्रोजेक्ट पर विमर्श करय चाहैत छी, या बस प्रणाम करय चाहैत छी? हमर इनबॉक्स सदा खुजल अछि। हमरा संदेश पठाउ आ हम जल्द स जल्द अहाँ स सम्पर्क करब!",
    
    // Navigation
    navHome: "मुख्यपृष्ठ",
    navAbout: "हमर बारे में",
    navServices: "सेवा",
    navSkills: "कौशल",
    navExperience: "अनुभव",
    navProjects: "हमर प्रोजेक्ट",
    navWork: "हमर काम",
    navContact: "संपर्क",
    navCertificate: "प्रमाणपत्र",
    navWebsite: "वेबसाइट",
    navGames: "गेम",
    navGraphics: "ग्राफिक्स डिजाइन"
  }
};

function updateLanguage(lang) {
  // Get the translations for the selected language, default to English if not found
  const t = translations[lang] || translations['en'];
  
  // Update hero section
  const heroGreeting = document.querySelector('#hero-greeting-text');
  if (heroGreeting) heroGreeting.textContent = t.heroGreeting;
  
  const heroLocation = document.getElementById('hero-location-text');
  if (heroLocation) heroLocation.textContent = t.heroLocation;
  
  const heroEducation = document.getElementById('hero-education-text');
  if (heroEducation) heroEducation.textContent = t.heroEducation;
  
  startTypewriter(t.heroTitle, t.heroSubTitle);
  
  const heroButtonText = document.querySelector('.get-in-touch-btn span');
  if (heroButtonText) heroButtonText.textContent = t.heroButton;
  
  const callMe = document.querySelector('.call-btn');
  if (callMe) callMe.innerHTML = `<i class="fas fa-phone"></i> ${t.callMe}`;
  
  const messageMe = document.querySelector('.message-btn');
  if (messageMe) messageMe.innerHTML = `<i class="fas fa-comment"></i> ${t.messageMe}`;
  
  // Update about section
  const aboutH2 = document.querySelector('#about h2');
  if (aboutH2) aboutH2.innerHTML = t.about;
  
  const aboutP1 = document.getElementById('about-description-1');
  if (aboutP1) aboutP1.textContent = t.aboutText1;
  
  const aboutP2 = document.getElementById('about-description-2');
  if (aboutP2) aboutP2.textContent = t.aboutText2;

  const aboutP3 = document.getElementById('about-description-3');
  if (aboutP3) aboutP3.textContent = t.aboutText3;
  
  // Update services section heading
  const servicesH2 = document.querySelector('#services h2');
  if (servicesH2) servicesH2.innerHTML = t.servicesHeading;
  
  // Update skills section heading
  const skillsH2 = document.querySelector('#skills h2');
  if (skillsH2) skillsH2.innerHTML = t.skills;
  
  // Update contact section
  const contactH2 = document.querySelector('#contact h2');
  if (contactH2) contactH2.innerHTML = t.contact;
  
  const contactEmail = document.querySelector('#contact p');
  if (contactEmail) contactEmail.innerHTML = t.email;
  
  // Update navigation links
  const navLinks = {
    'navHome': '.nav-links a[href="#hero"]',
    'navAbout': '.nav-links a[href="#about"]',
    'navServices': '.nav-links a[href="#services"]',
    'navSkills': '.nav-links a[href="#skills"]',
    'navExperience': '.nav-links a[href="#experience"]',
    'navProjects': '.nav-links a[href="#projects"]',
    'navWork': '.nav-links a[href="#work"]',
    'navContact': '.nav-links a[href="#contact"]',
    'navCertificate': '.nav-links a[href="#certificate"]',
    'navWebsite': '.nav-links a[href="#website"]',
    'navGames': '.nav-links a[href="#games"]',
    'navGraphics': '.nav-links a[href*="graphics.html"]'
  };
  
  Object.entries(navLinks).forEach(([key, selector]) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element && t[key]) {
        element.textContent = t[key];
      }
    });
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Save selected language to localStorage
  localStorage.setItem('preferredLanguage', lang);
  
  // Debug log
  console.log(`Language changed to: ${lang}`);
}

function initializeLanguageSwitcher() {
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    languageSwitcher.value = savedLanguage;
    languageSwitcher.addEventListener('change', function (e) {
      updateLanguage(e.target.value);
    });
  }

  const languageSwitcherMobile = document.getElementById('language-switcher-mobile');
  if (languageSwitcherMobile) {
    languageSwitcherMobile.value = savedLanguage;
    languageSwitcherMobile.addEventListener('change', function (e) {
      updateLanguage(e.target.value);
    });
  }

  // Update the UI immediately
  updateLanguage(savedLanguage);
}

// Load saved language or default to English
function loadPreferredLanguage() {
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  updateLanguage(savedLanguage);
  
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    languageSwitcher.value = savedLanguage;
  }

  const languageSwitcherMobile = document.getElementById('language-switcher-mobile');
  if (languageSwitcherMobile) {
    languageSwitcherMobile.value = savedLanguage;
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

  // Real-time Visitor Counter
  updateVisitorCount();

  const langSwitcher = document.getElementById('language-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('change', function () {
      updateLanguage(this.value);
    });
  }
  const langSwitcherMobile = document.getElementById('language-switcher-mobile');
  if (langSwitcherMobile) {
    langSwitcherMobile.addEventListener('change', function () {
      updateLanguage(this.value);
    });
  }

  // Restore theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  // Toggle on both buttons
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleBtnInMenu = document.getElementById('theme-toggle-in-menu');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (document.body.classList.contains('light-mode')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  }
  if (toggleBtnInMenu) {
    toggleBtnInMenu.addEventListener('click', function () {
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
        setPrimaryColor(this.getAttribute('data-color'));
        colorPalette.classList.remove('active');
      });
    });
  }
});

// Dark/Light Mode Toggle
function setTheme(mode) {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleBtnInMenu = document.getElementById('theme-toggle-in-menu');
  if (mode === 'light') {
    body.classList.add('light-mode');
    // Use saved or default color for backgrounds
    const savedBgColor = localStorage.getItem('mainBgColor');
    const savedNavbarColor = localStorage.getItem('navbarBgColor');
    document.documentElement.style.setProperty('--main-bg-color', savedBgColor || '#f1f5f9');
    document.documentElement.style.setProperty('--navbar-bg-color', savedNavbarColor || '#e0e7ef');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    if (toggleBtnInMenu) toggleBtnInMenu.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('theme', 'light');
    const savedPrimary = localStorage.getItem('primaryColor');
    if (savedPrimary) {
      document.documentElement.style.setProperty('--primary-color', savedPrimary);
    }
  } else {
    body.classList.remove('light-mode');
    document.documentElement.style.setProperty('--main-bg-color', '#0f172a');
    document.documentElement.style.setProperty('--navbar-bg-color', '#1e293b');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    if (toggleBtnInMenu) toggleBtnInMenu.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', 'dark');
  }
}

/** Pick dark or light text for readability on a solid hex background (WCAG-ish luminance). */
function readableTextOnHex(bgHex) {
  if (!bgHex || typeof bgHex !== 'string') return '#0f172a';
  var hex = bgHex.replace('#', '').trim();
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6 || /[^0-9a-f]/i.test(hex)) return '#0f172a';
  var r = parseInt(hex.slice(0, 2), 16) / 255;
  var g = parseInt(hex.slice(2, 4), 16) / 255;
  var b = parseInt(hex.slice(4, 6), 16) / 255;
  var lin = function (c) {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  var R = lin(r),
    G = lin(g),
    B = lin(b);
  var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  return L > 0.45 ? '#0f172a' : '#f8fafc';
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
  // Hero greeting only: settings color (name stays white via CSS)
  var heroName = document.getElementById('hero-name-color');
  if (heroName) {
    heroName.style.setProperty('color', color, 'important');
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
      runWithAuth((user) => {
        const visitorId = user.uid;
        const chatRef = database.ref('chatMessages/' + visitorId);
        const newMessage = {
          text: message,
          sender: 'visitor',
          timestamp: Date.now(),
          visitorId: visitorId
        };

        chatRef.push(newMessage);
        localStorage.setItem('lastChatSentTs', String(now));
        chatInput.value = '';
      });
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
    const user = firebase.auth().currentUser;
    return user ? user.uid : (localStorage.getItem('visitorId') || 'visitor_anonymous');
  }

  // Track processed messages to prevent duplicate responses
  const processedMessages = new Set();
  
  // Register listener and setup auto-response after auth
  runWithAuth((user) => {
    const visitorId = user.uid;
    const sessionStartTime = Date.now();
    const chatRef = database.ref('chatMessages/' + visitorId);

    // Register listener only once
    if (!chatListenerRegistered) {
      chatRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        const messageId = snapshot.key;
        
        // Display message
        displayMessage(message);
        
        // Auto-response only for visitor messages sent in the current session (and only once per message)
        if (message.sender === 'visitor' && 
            message.timestamp >= sessionStartTime && 
            !processedMessages.has(messageId)) {
          processedMessages.add(messageId);
          
          // Add auto-response after 2 seconds
          setTimeout(() => {
            const autoResponse = {
              text: addAutoResponse(message.text),
              sender: 'admin',
              timestamp: Date.now(),
              visitorId: visitorId
            };
            chatRef.push(autoResponse);
          }, 2000);
        }
      });
      
      chatListenerRegistered = true; // Mark as registered
    }
  });

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
    runWithAuth((user) => {
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

      // Chat messages (only count this visitor's messages since they cannot access others)
      const chatRef = database.ref('chatMessages/' + user.uid);
      chatRef.once('value', (snapshot) => {
        const chatCount = snapshot.numChildren() || 0;
        document.getElementById('chat-count').textContent = chatCount;
      });
    });
  }

  // Track page view
  runWithAuth(() => {
    const pageViewsRef = database.ref('pageViews');
    pageViewsRef.transaction((currentViews) => {
      return (currentViews || 0) + 1;
    });
  });

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

    runWithAuth((user) => {
      const visitorId = user.uid;
      const feedback = {
        rating: selectedRating,
        text: text,
        timestamp: Date.now(),
        visitorId: visitorId,
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
  });
}

// Generate unique visitor ID (reuse from chat)
function generateVisitorId() {
  const user = firebase.auth().currentUser;
  return user ? user.uid : (localStorage.getItem('visitorId') || 'visitor_anonymous');
}

// Detect visitor details (device, OS, browser)
function getVisitorDetails() {
  const ua = navigator.userAgent;
  let device = "Desktop";
  let os = "Unknown OS";
  let browser = "Unknown Browser";

  /* Device detect */
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    device = "Mobile";
  } else if (/Tablet|iPad/i.test(ua)) {
    device = "Tablet";
  }

  /* OS detect */
  if (ua.indexOf("Android") !== -1) {
    os = "Android";
  } else if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1 || ua.indexOf("iPod") !== -1) {
    os = "iOS";
  } else if (ua.indexOf("Windows") !== -1) {
    os = "Windows";
  } else if (ua.indexOf("Mac") !== -1) {
    os = "MacOS";
  } else if (ua.indexOf("Linux") !== -1) {
    os = "Linux";
  }

  /* Browser detect */
  if (ua.indexOf("Chrome") !== -1) {
    browser = "Google Chrome";
  } else if (ua.indexOf("Firefox") !== -1) {
    browser = "Mozilla Firefox";
  } else if (ua.indexOf("Safari") !== -1) {
    browser = "Safari";
  } else if (ua.indexOf("Edge") !== -1) {
    browser = "Microsoft Edge";
  }

  return { device, os, browser };
}

// Track visitor in database (both permanent visitorHistory and temporary onlineUsers)
function trackVisitor() {
  runWithAuth((user) => {
    try {
      const visitorId = user.uid;
      const details = getVisitorDetails();
      const timestamp = Date.now();

      // 1. Save visitor details permanently
      database.ref(`visitorHistory/${visitorId}`).set({
        timestamp: timestamp,
        device: details.device,
        os: details.os,
        browser: details.browser,
        userAgent: navigator.userAgent
      });

      // 2. Set online status temporarily (only storing timestamp to hide user details publicly)
      const onlineRef = database.ref(`onlineUsers/${visitorId}`);
      onlineRef.set({
        timestamp: timestamp
      });

      // Remove from online users when page unloads or client disconnects
      onlineRef.onDisconnect().remove();
    } catch (e) {
      console.error("Error in tracking visitor:", e);
    }
  });
}

// Initialize all systems when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Always-on tracking of visitor details
  trackVisitor();

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