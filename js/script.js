document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const setTheme = (theme) => {
      document.body.classList.toggle('dark-mode', theme === 'dark');
      localStorage.setItem('theme', theme);
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };
  
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      setTheme(newTheme);
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    document.body.appendChild(mobileMenu);
    
    mobileMenu.innerHTML = `
      <div class="mobile-menu-header">
        <button class="close-menu">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="mobile-menu-links">
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    `;
    
    const openMenu = () => mobileMenu.classList.add('active');
    const closeMenu = () => mobileMenu.classList.remove('active');
  
    mobileMenuBtn.addEventListener('click', openMenu);
    mobileMenu.querySelector('.close-menu').addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('.mobile-menu-links a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Show/hide functionality for projects, awards, certs
    // const setupToggleButton = (buttonId, sectionClass, hiddenClass) => { ... };
    
    // Xin chao animation effect
    // const greetingText = document.querySelector('.greeting span'); ...
    
    // vCard functionality
    // const saveVcardBtn = document.getElementById('saveVcard'); ...
    
    // Send email functionality
    // const sendEmailBtn = document.getElementById('sendEmail'); ...
    
    // --- Header Scroll --- 
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // --- Typing Animation --- 
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
      new Typed(typingElement, {
        strings: ["Relationship Manager.", "Partner Operations Specialist.", "Social Media Strategist.", "Problem Solver."],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 1500
      });
    }
    
    // --- Scroll Animations (GSAP & ScrollTrigger) ---
    gsap.registerPlugin(ScrollTrigger);
  
    // Hero animation
    gsap.from(".hero-content h1", { duration: 1, y: 50, opacity: 0, delay: 0.2, ease: "power3.out" });
    gsap.from(".hero-content .lead-text", { duration: 1, y: 50, opacity: 0, delay: 0.4, ease: "power3.out" });
    gsap.from(".hero-content .tagline", { duration: 1, y: 50, opacity: 0, delay: 0.6, ease: "power3.out" });
    gsap.from(".hero-cta", { duration: 1, y: 50, opacity: 0, delay: 0.8, ease: "power3.out" });
    gsap.from(".hero-image .image-wrapper", { duration: 1.2, scale: 0.9, opacity: 0, delay: 0.5, ease: "elastic.out(1, 0.75)" });
  
    // Section Reveal Animation
    const sections = gsap.utils.toArray('section:not(.hero)');
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // Trigger when 80% of the section enters viewport
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out'
      });
    });
  
    // Experience Timeline Animation
    const timelineItems = gsap.utils.toArray('.experience-item');
    timelineItems.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleClass: 'visible' // Add 'visible' class when triggered
        }
      });
    });
  
    // Skill Bar Animation
    const skillProgressBars = gsap.utils.toArray('.skill-progress');
    skillProgressBars.forEach((bar) => {
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
        },
        width: bar.style.width, // Animate to the width defined inline
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  
    // Project Card Animation
    const projectCards = gsap.utils.toArray('.project-card');
    projectCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: (index % 3) * 0.1, // Stagger animation
        ease: 'power3.out'
      });
    });
  
    // --- Custom Cursor --- 
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
  
    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        
        gsap.set(follower, {
          css: {
            left: posX - 15,
            top: posY - 15
          }
        });
        
        gsap.set(cursor, {
          css: {
            left: mouseX - 5,
            top: mouseY - 5
          }
        });
      }
    });
  
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  
    const hoverElements = document.querySelectorAll('a, button, .project-card, .stat-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        follower.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('cursor-hover');
      });
    });
  
    // --- Contact Form Submission (Example) --- 
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here (e.g., using Fetch API or an email service)
            alert('Form submitted (this is a demo)!'); 
            contactForm.reset();
        });
    }
  }); 