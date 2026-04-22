
document.addEventListener('DOMContentLoaded', () => {

/*** 🌄 reveal Effect ***/

  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.2
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }


/*** 🌄 Parallax Scroll Effect ***/

window.addEventListener('scroll', () => {

  document.querySelectorAll('.parallax-hero, .parallax-bg').forEach(el => {

    const rect = el.getBoundingClientRect();

    // Different speeds
    let speed = 0.15; // default (hero subtle)

    if (el.classList.contains('parallax-bg')) {
      speed = 0.3; // stronger for image section
    }

    const offset = rect.top * speed;

    el.style.backgroundPosition = `center ${offset}px`;

  });

}, { passive: true });





 /*** 🎞️ Horizontal Storytelling Scroll — Stable Version ***/
const storytelling = document.querySelector('.storytelling');
const scrollContainer = document.querySelector('.scroll-container');
const track = document.querySelector('.project-track');

if (storytelling && scrollContainer && track) {
  function setStoryHeight() {
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    if (trackWidth <= viewportWidth) {
      storytelling.style.height = `${window.innerHeight}px`;
      track.style.transform = 'translateX(0)';
      return;
    }

    const horizontalScrollLength = trackWidth - viewportWidth;
    storytelling.style.height = `${window.innerHeight + horizontalScrollLength}px`;
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const start = storytelling.offsetTop;
    const maxScroll = storytelling.offsetHeight - window.innerHeight;

    if (scrollTop < start || maxScroll <= 0) {
      track.style.transform = 'translateX(0)';
      return;
    }

    const progress = Math.min(Math.max((scrollTop - start) / maxScroll, 0), 1);
    const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
    const translateX = -progress * maxTranslate;
    track.style.transform = `translateX(${translateX}px)`;
  }

  // Recalculate after images fully load
  function initAfterImages() {
    setStoryHeight();
    handleScroll();
  }

  // ✅ Run after all content + images have loaded
  window.addEventListener('load', initAfterImages);

  // ✅ Also run after small delay to catch late layout shifts
  setTimeout(initAfterImages, 800);

  // ✅ Smoothly recalc on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setStoryHeight();
      handleScroll();
    }, 200);
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
}




    
    

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      });
    });
  

  /*** ✨ Fade/Slide Animations for Scrolling Sections ***/
  const animatedEls = document.querySelectorAll('.animate');
  const projects = document.querySelectorAll('.storytelling .project');
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('reveal')) {
          entry.target.classList.add('visible');
        }
        if (entry.target.classList.contains('animate')) {
          entry.target.classList.add('show');
        }
        if (entry.target.classList.contains('project')) {
          entry.target.classList.add('show');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  [...animatedEls, ...projects, ...reveals].forEach(el => observer.observe(el));






// Project Filter System (supports multiple categories)
const filterItems = document.querySelectorAll('.filter-item');
const projectCards = document.querySelectorAll('.project-card');

filterItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active class from all, then add to clicked
    filterItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    const filterValue = item.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');

      if (filterValue === 'all' || categories.includes(filterValue)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});



function setMobileVH() {
  if (window.innerWidth <= 768) {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  } else {
    // Reset on desktop so nothing changes
    document.documentElement.style.removeProperty('--vh');
  }
}

setMobileVH();
window.addEventListener('resize', setMobileVH);







// Process Section Toggle (Discover / Explore / Build)
const processButtons = document.querySelectorAll('.service-titles button');
const processTexts = document.querySelectorAll('.service-text');

if (processButtons.length > 0) {
  processButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      // Remove active state from all buttons
      processButtons.forEach(btn => btn.classList.remove('active'));

      // Hide all text blocks
      processTexts.forEach(text => text.classList.remove('active'));

      // Activate clicked button
      button.classList.add('active');

      // Show corresponding text
      const targetText = document.getElementById(targetId);
      if (targetText) {
        targetText.classList.add('active');
      }
    });
  });
}



//scroll detection for navbar

window.addEventListener('scroll', () => {

  const navbar = document.querySelector('.navbar');

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

});


// service section on Homepage - hover-over changes images
const items = document.querySelectorAll('.service-item');
const imageA = document.getElementById('imageA');
const imageB = document.getElementById('imageB');

let showingA = true;

items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const newImage = item.getAttribute('data-image');

    if (showingA) {
      imageB.src = newImage;

      setTimeout(() => {
        imageB.classList.add('active');
        imageA.classList.remove('active');
      }, 120); // small delay = softer feel

    } else {
      imageA.src = newImage;

      setTimeout(() => {
        imageA.classList.add('active');
        imageB.classList.remove('active');
      }, 120);
    }

    showingA = !showingA;

    // update active text
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});



  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });


  

  });

