 const cursor=document.getElementById('cursor');
    const ring=document.getElementById('cursorRing');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{ mx=e.clientX;my=e.clientY;cursor.style.transform=`translate(${mx-5}px,${my-5}px)`; });
    function animateRing(){ rx+=(mx-rx-18)*0.15;ry+=(my-ry-18)*0.15;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(animateRing); }
    animateRing();
    document.querySelectorAll('a,button,.mini-card,.tech-item,.progress-item,.screenshot-thumb').forEach(el=>{
      el.addEventListener('mouseenter',()=>ring.classList.add('hovered'));
      el.addEventListener('mouseleave',()=>ring.classList.remove('hovered'));
    });
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting)e.target.classList.add('visible'); }),{threshold:0.1});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // ── Light / Dark mode toggle ───────────────────────────────
// Saves preference to localStorage so it persists across pages
const themeBtn = document.getElementById('themeToggle');

// Apply saved preference on page load
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeBtn.textContent = '🌙';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});