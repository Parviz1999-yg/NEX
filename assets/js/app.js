(() => {
  const title = document.getElementById('projectTitle');
  const headline = document.getElementById('headline');
  const preview = document.getElementById('preview');
  const previewHeadline = preview.querySelector('.preview-copy strong');
  const status = document.getElementById('statusText');
  let accent = '#b6ff4a';

  document.querySelectorAll('.swatch').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      accent = button.dataset.color;
      document.documentElement.style.setProperty('--accent', accent);
    });
  });

  document.getElementById('applyBtn').addEventListener('click', () => {
    const words = (headline.value.trim() || 'YOUR STORY.').split(/\s+/);
    const first = words.shift() || 'YOUR';
    const rest = words.join(' ');
    previewHeadline.innerHTML = `${escapeHtml(first)}${rest ? `<br><em>${escapeHtml(rest)}</em>` : ''}`;
    preview.querySelector('.preview-tag').textContent = `NEX / ${escapeHtml((title.value.trim() || 'PROJECT').slice(0, 18).toUpperCase())}`;
    status.textContent = 'Ko‘rinish yangilandi. Bu hozircha interfeys sinovi; eski Studio funksiyalari keyingi bosqichda ulanadi.';
  });

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  window.NEX = Object.freeze({ version: '0.1.0', get accent() { return accent; } });
})();
