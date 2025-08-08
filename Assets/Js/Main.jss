// main.js — small helpers for mobile nav and search
document.addEventListener('DOMContentLoaded', function(){
  // set year placeholders
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(y => y.textContent = new Date().getFullYear());

  // Mobile nav toggles
  function initNav(toggleId, navId){
    const t = document.getElementById(toggleId);
    const n = document.getElementById(navId);
    if(!t || !n) return;
    t.addEventListener('click', () => {
      const expanded = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', (!expanded).toString());
      n.style.display = expanded ? 'none' : 'flex';
    });
    if(window.innerWidth <= 900) n.style.display = 'none';
    window.addEventListener('resize', () => { if(window.innerWidth > 900) n.style.display = 'flex'; else n.style.display = 'none'; });
  }
  initNav('navToggle','siteNav');
  initNav('navToggle2','siteNav2');

  // search on blog
  const searchInput = document.getElementById('searchInput');
  const postsContainer = document.getElementById('postsContainer');
  if(searchInput && postsContainer){
    searchInput.addEventListener('input', function(){
      const q = this.value.trim().toLowerCase();
      const items = postsContainer.querySelectorAll('.post-list-item');
      items.forEach(it => {
        const text = (it.textContent || '').toLowerCase() + ' ' + (it.dataset.tags || '');
        it.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
});
