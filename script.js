(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Year
  $("#year").textContent = new Date().getFullYear();

  // Theme
  const storageKey = "pref-theme";
  const toggle = $("#themeToggle");
  const applyTheme = (t) => {
    document.documentElement.classList.toggle("light", t === "light");
  };
  const getSystem = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark";
  const saved = localStorage.getItem(storageKey);
  applyTheme(saved || getSystem());
  toggle.addEventListener("click", () => {
    const current = document.documentElement.classList.contains("light") ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(storageKey, next);
  });

  // Mobile nav toggle
  const navToggle = $(".nav-toggle");
  const navMenu = $("#nav-menu");
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
  $$("#nav-menu a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));

  // Smooth scroll active link (scrollspy lite)
  const sections = ["home","about","skills","experience","portfolio","projects","contact"].map(id => $("#"+id));
  const links = $$("#nav-menu a");
  const spy = () => {
    const y = window.scrollY + 120;
    let active = sections[0].id;
    for(const s of sections){
      if (s.offsetTop <= y) active = s.id;
    }
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#"+active));
  };
  window.addEventListener("scroll", spy); spy();

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    })
  }, {threshold:.18});
  $$(".reveal").forEach(el => io.observe(el));
})();

// Rotate role words
// Typing animation for role words
(()=> {
  const el = document.querySelector('.subtitle .role .word');
  if (!el) return;

  const words = (el.getAttribute('data-words') || '').split('|').filter(Boolean);
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    el.textContent = currentWord.substring(0, charIndex);

    let delay = 100; // typing speed

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1500; // pause before deleting
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300; // pause before typing next word
    }

    setTimeout(type, delay);
  }

  type();
})();


