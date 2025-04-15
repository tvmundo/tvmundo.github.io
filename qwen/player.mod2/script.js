let players = {};

function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.video-container').forEach((container, index) => {
    const videoId = container.getAttribute('data-initial-video');
    const playerDiv = container.querySelector('.player');
    const playerId = `player-${index + 1}`;
    playerDiv.id = playerId;

    players[playerId] = new YT.Player(playerId, {
      height: '315',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1
      },
      events: {
        onStateChange: (event) => handlePlayerStateChange(event, playerId)
      }
    });

    const restartBtn = container.querySelector('.restartVideo');
    restartBtn.addEventListener('click', () => {
      container.querySelector('.end-screen').style.display = 'none';
      players[playerId].seekTo(0);
      players[playerId].playVideo();
    });

    const menuToggle = container.querySelector('.menuToggle');
    const videoMenu = container.querySelector('.video-menu-overlay');
    const closeMenu = container.querySelector('.closeMenu');

    menuToggle.addEventListener('click', () => {
      videoMenu.style.display = videoMenu.style.display === 'block' ? 'none' : 'block';
      menuToggle.textContent = videoMenu.style.display === 'block' ? 'Ocultar Lista de Vídeos' : 'Mostrar Lista de Vídeos deste canal';
    });

    closeMenu.addEventListener('click', () => {
      videoMenu.style.display = 'none';
      menuToggle.textContent = 'Mostrar Lista de Vídeos deste canal';
    });

    videoMenu.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const newVideoId = item.getAttribute('data-video-id');
        players[playerId].loadVideoById(newVideoId);
        container.querySelector('.end-screen').style.display = 'none';
        videoMenu.style.display = 'none';
        menuToggle.textContent = 'Mostrar Lista de Vídeos deste canal';
      });
    });
  });
}

function handlePlayerStateChange(event, playerId) {
  if (event.data === YT.PlayerState.ENDED) {
    const container = document.getElementById(playerId).closest('.video-container');
    const endScreen = container.querySelector('.end-screen');
    endScreen.style.display = 'flex';
  }
}
