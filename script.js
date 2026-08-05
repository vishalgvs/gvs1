const burger=document.getElementById('burger'),menu=document.getElementById('menu');
  burger&&burger.addEventListener('click',()=>menu.classList.toggle('open'));
  menu&&menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Highlight the navigation item for the section currently being viewed.
  const navLinks=[...document.querySelectorAll('#menu a[href^="#"]')];
  const navSections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);

  function updateActiveNav(){
    const marker=window.scrollY+140; // header height + a little viewing space
    let current='';
    navSections.forEach(section=>{
      if(section.offsetTop<=marker) current=section.id;
    });

    // At the bottom of the page, always activate Contact.
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-5){
      current='contact';
    }

    navLinks.forEach(link=>{
      link.classList.toggle('active',link.getAttribute('href')==='#'+current);
    });
  }

  window.addEventListener('scroll',updateActiveNav,{passive:true});
  window.addEventListener('resize',updateActiveNav);
  updateActiveNav();
