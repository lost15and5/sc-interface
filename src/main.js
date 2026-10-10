import './styles.css';
import archiveIcon from './assets/icons/logs_inactive.png';
import homeIcon from './assets/icons/home_inactive.png';
import playIcon from './assets/icons/play_inactive.png';
import slidersIcon from './assets/icons/settings_inactive.png';
import starIcon from './assets/icons/star_inactive.png';
import themeIcon from './assets/icons/theme_inactive.png';

const iconImage = (source) => `<img src="${source}" alt="" aria-hidden="true">`;

const pages = [
  { id: 'home', label: 'Home', tooltip: 'Main', icon: homeIcon, title: 'Home', extraClass: 'sidebar-home' },
  { id: 'reviews', label: 'Reviews', icon: starIcon, title: 'Reviews' },
  { id: 'settings', label: 'Settings', icon: slidersIcon, title: 'Settings' },
  { id: 'sessions', label: 'Sessions', icon: archiveIcon, title: 'Sessions' },
];

const pageContent = (page) => `
  <header class="page-header">
    <h1 class="page-title">${page.title}</h1>
  </header>
  <section class="page-body">
    <div class="page-card">
      <h2 class="page-card-title">Welcome to ${page.title}</h2>
      <p class="page-card-text">This is the ${page.title.toLowerCase()} page. Content goes here.</p>
    </div>
  </section>
`;

const render = (activeId) => {
  const activePage = pages.find((p) => p.id === activeId) ?? pages[0];

  document.querySelector('#app').innerHTML = `
    <aside class="sidebar" aria-label="Application sidebar">
      <button class="sidebar-button sidebar-play" type="button" aria-label="Play">${iconImage(playIcon)}</button>
      <nav class="sidebar-nav" aria-label="Primary navigation">
        ${pages
          .map(
            (page) => `
          <button
            class="sidebar-button${page.extraClass ? ' ' + page.extraClass : ''}${page.id === activeId ? ' is-selected' : ''}"
            type="button"
            data-page="${page.id}"
            aria-label="${page.label}"
            data-tooltip="${page.label}"
            ${page.id === activeId ? 'aria-current="page"' : ''}
          >${iconImage(page.icon)}<span class="tooltip-bubble" aria-hidden="true">${page.tooltip ?? page.label}</span></button>`
          )
          .join('')}
      </nav>
      <div class="theme-control">
        <button class="sidebar-button sidebar-theme" type="button" aria-label="Theme">${iconImage(themeIcon)}</button>
      </div>
    </aside>
    <main class="app-surface" aria-label="${activePage.title}">${pageContent(activePage)}</main>
  `;

  document.querySelectorAll('.sidebar-nav .sidebar-button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.page;
      if (target && target !== activeId) render(target);
    });
  });
};

render('home');
