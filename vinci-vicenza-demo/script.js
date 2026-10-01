const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const videos = [...document.querySelectorAll('video:not(.exhibition-slide)')];
function startVideos() {
  videos.forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.play().catch(() => {});
  });
}
startVideos();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) videos.forEach(video => video.pause());
  else startVideos();
});
document.addEventListener('pointerdown', startVideos, { once: true, passive: true });
document.addEventListener('keydown', startVideos, { once: true });
const exhibition = document.querySelector('.exhibition-player');
if (exhibition) {
  const slides = [...exhibition.querySelectorAll('video')];
  let active = 0;
  const counter = exhibition.querySelector('[data-slide-count]');
  function playActive() {
    if (!document.hidden) slides[active].play().catch(() => {});
  }
  function showSlide(index) {
    slides[active].pause();
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== active;
      slide.muted = true;
      slide.loop = false;
      if (i !== active) slide.pause();
    });
    slides[active].currentTime = 0;
    counter.textContent = `${active + 1} / ${slides.length}`;
    playActive();
  }
  slides.forEach((slide, i) => {
    slide.addEventListener('ended', () => { if (i === active) showSlide(active + 1); });
  });
  exhibition.querySelector('[data-next]').addEventListener('click', () => showSlide(active + 1));
  exhibition.querySelector('[data-previous]').addEventListener('click', () => showSlide(active - 1));
  exhibition.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) slides[active].pause();
    else playActive();
  });
  document.addEventListener('pointerdown', playActive, { once: true, passive: true });
  showSlide(0);
}
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('motion');
}
