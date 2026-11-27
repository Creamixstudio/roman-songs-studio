/* CREAMIX STUDIO — два видео из студии. Подключать перед </body>. */
(() => {
  if (document.getElementById('studio-behind-scenes')) return;
  const anchor = document.querySelector('#featured-video')
    || document.querySelector('#official-releases')
    || document.querySelector('#about');
  if (!anchor) return;

  const css = document.createElement('style');
  css.textContent = `
    #studio-behind-scenes { padding: 55px 0 60px; }
    #studio-behind-scenes h2 { margin: 12px 0 26px; }
    .creamix-video-grid { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; }
    .creamix-video-card { width: min(100%, 290px); margin: 0; }
    .creamix-video-card video {
      display: block; width: 100%; aspect-ratio: 9 / 16;
      background: #101116; object-fit: cover; border-radius: 14px;
      border: 1px solid rgba(232,168,188,.30);
      box-shadow: 0 14px 38px rgba(0,0,0,.28);
    }
    .creamix-video-card figcaption { margin-top: 12px; font-size: 15px; color: #e9e8ed; }
    @media(max-width:650px) {
      .creamix-video-grid { gap: 14px; }
      .creamix-video-card { width: calc(50% - 7px); }
      .creamix-video-card figcaption { font-size: 12px; }
    }
  `;
  document.head.appendChild(css);

  anchor.insertAdjacentHTML('afterend', `
    <section id="studio-behind-scenes" aria-label="Видео из студии">
      <div class="eyebrow">Студийные моменты</div>
      <h2>За кадром</h2>
      <div class="creamix-video-grid">
        <figure class="creamix-video-card">
          <video controls playsinline preload="none" poster="creamix-recording.jpg"
                 aria-label="Запись вокала">
            <source src="creamix-recording.mp4" type="video/mp4">
            Ваш браузер не поддерживает видео.
          </video>
          <figcaption>Запись вокала</figcaption>
        </figure>
        <figure class="creamix-video-card">
          <video controls playsinline preload="none" poster="creamix-behind-scenes.jpg"
                 aria-label="Момент из студии">
            <source src="creamix-behind-scenes.mp4" type="video/mp4">
            Ваш браузер не поддерживает видео.
          </video>
          <figcaption>Момент из студии</figcaption>
        </figure>
      </div>
    </section>
  `);

  document.querySelectorAll('#studio-behind-scenes video').forEach(video => {
    video.addEventListener('play', () => {
      document.querySelectorAll('audio,video').forEach(other => {
        if (other !== video) other.pause();
      });
    });
  });
})();
