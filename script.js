// Responsive navigation.
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
// Native dialog: Escape closes it and focus returns to the selected artwork.
const dialog = document.querySelector('#lightbox');
const artworks = Array.from(document.querySelectorAll('[data-lightbox]'));
let current = 0;
let previousFocus;
function showArtwork(index) {
  current = (index + artworks.length) % artworks.length;
  const link = artworks[current];
  const image = dialog.querySelector('img');
  image.src = link.href;
  image.alt = link.querySelector('img').alt;
  dialog.querySelector('.counter').textContent = `${current + 1} / ${artworks.length}`;
}
artworks.forEach((link, index) => link.addEventListener('click', event => {
  if (!dialog?.showModal) return;
  event.preventDefault();
  previousFocus = link;
  showArtwork(index);
  dialog.showModal();
}));
if (dialog) {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.previous').addEventListener('click', () => showArtwork(current - 1));
  dialog.querySelector('.next').addEventListener('click', () => showArtwork(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showArtwork(current - 1);
    if (event.key === 'ArrowRight') showArtwork(current + 1);
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => previousFocus?.focus());
}
