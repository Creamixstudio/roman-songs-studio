/* CREAMIX STUDIO — компактный каталог в эстетике 90-х.
   Подключается после основного скрипта сайта. Никакие MP3 не заменяет. */
(() => {
  if (document.getElementById('creamix-90s-styles')) return;

  const css = document.createElement('style');
  css.id = 'creamix-90s-styles';
  css.textContent = `
    .retro90s-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 26px 22px;
      max-width: 1100px;
      margin: 18px auto 40px;
    }
    .retro90s-grid .track {
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      padding: 0;
      border: 0;
      background: none !important;
      box-shadow: none !important;
    }
    .retro90s-grid .track:hover {
      background: none !important;
      box-shadow: none !important;
    }
    .retro90s-grid .song-cover {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
      position: relative;
      overflow: hidden;
      border: 0;
      border-radius: 17px;
      background-image: var(--cover-image) !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: center !important;
      box-shadow: 0 12px 23px rgba(0,0,0,.28) !important;
      transition: transform .22s ease, box-shadow .22s ease;
    }
    .retro90s-grid .track:hover .song-cover {
      transform: translateY(-3px);
      box-shadow: 0 17px 30px rgba(0,0,0,.42) !important;
    }
    .retro90s-grid .retro90s-play {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
      padding: 0;
      background: transparent;
      color: white;
      display: grid;
      place-items: center;
      font-size: clamp(60px, 8vw, 94px);
      font-weight: 700;
      cursor: pointer;
      touch-action: manipulation;
    }
    .retro90s-grid .retro90s-play:hover { background: rgba(0,0,0,.10); }
    .retro90s-grid .track.is-playing .retro90s-play {
      background: rgba(17,11,24,.67);
      text-shadow: 0 3px 9px #000;
    }
    .retro90s-grid .retro90s-play:focus-visible {
      outline: 4px solid #fff;
      outline-offset: -6px;
    }
    .retro90s-grid .track > div:nth-child(2) {
      text-align: center;
      padding: 0 4px;
    }
    .retro90s-grid .track > div:nth-child(2) .tag,
    .retro90s-grid .track > div:nth-child(2) .sold-badge,
    .retro90s-grid .track > div:nth-child(2) > p { display: none !important; }
    .retro90s-grid .track h3 {
      margin: 0 0 10px !important;
      color: #f4f0ed !important;
      font-size: clamp(16px,1.8vw,21px) !important;
      font-weight: 600;
      line-height: 1.25;
    }
    .retro90s-grid .track .choose {
      font-size: 11px;
      color: #e8a8bc;
      display: inline-block;
    }
    .retro90s-grid .player { display: none !important; }
    @media(max-width:650px) {
      .retro90s-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 20px 11px; }
      .retro90s-grid .song-cover { border-radius: 12px; }
      .retro90s-grid .retro90s-play { font-size: 60px; }
      .retro90s-grid .track h3 { font-size: 16px !important; }
      .retro90s-grid .track .choose { font-size: 10px; }
    }
    @media(prefers-reduced-motion:reduce){
      .retro90s-grid .song-cover { transition: none; }
    }
  `;
  document.head.appendChild(css);

  // Каждый трек получает свой собственный файл обложки.
  const covers = {
    'babushka':          'cover-babushka.webp',
    'na-povtore':        'cover-na-povtore.webp',
    'kukla':             'cover-kukla.webp',
    'eto-moy-stil':      'cover-eto-moy-stil.webp',
    'kapibara':          'cover-kapibara.webp',
    'u-menya-est-mama':  'cover-u-menya-est-mama.webp',
    'mama-kupi':         'cover-mama-kupi.webp',
    'podruzhki':         'cover-podruzhki.webp',
    'noviy-god':         'cover-noviy-god.webp'
  };

  ['music', 'sold'].forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const tracks = [...section.querySelectorAll(':scope > article.track')];
    if (!tracks.length) return;

    const grid = document.createElement('div');
    grid.className = 'retro90s-grid';
    const anchor = section.querySelector(':scope > h3') || section.querySelector(':scope > .section-head');
    if (!anchor) return;
    anchor.insertAdjacentElement('afterend', grid);

    tracks.forEach(track => {
      const cover = track.querySelector('.song-cover');
      const audio = track.querySelector('audio');
      const title = track.querySelector('h3')?.textContent.trim() || 'песню';
      const imageFile = covers[track.id];
      if (!cover || !audio || !imageFile) return;

      cover.style.setProperty('--cover-image', `url("${imageFile}")`);
      cover.replaceChildren(); // Убираем старую эмблему внутри квадрата.

      const play = document.createElement('button');
      play.type = 'button';
      play.className = 'retro90s-play';
      play.setAttribute('aria-label', `Воспроизвести «${title}»`);
      cover.appendChild(play);
      audio.controls = false;
      audio.preload = 'none';

      play.addEventListener('click', () => {
        if (audio.paused) {
          document.querySelectorAll('audio').forEach(other => {
            if (other !== audio) other.pause();
          });
          audio.play().catch(error => console.warn('Не удалось запустить аудио:', error));
        } else {
          audio.pause();
        }
      });
      const sync = () => {
        const playing = !audio.paused && !audio.ended;
        track.classList.toggle('is-playing', playing);
        // В состоянии паузы большой треугольник уже нарисован на обложке.
        // Во время воспроизведения затемняем плитку и показываем знак паузы.
        play.textContent = playing ? 'Ⅱ' : '';
        play.setAttribute('aria-label', `${playing ? 'Пауза' : 'Воспроизвести'} «${title}»`);
      };
      audio.addEventListener('play', sync);
      audio.addEventListener('pause', sync);
      audio.addEventListener('ended', sync);
      grid.appendChild(track);
    });
  });
})();
