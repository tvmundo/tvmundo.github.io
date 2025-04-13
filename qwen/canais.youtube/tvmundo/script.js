// Variável global para o player
let player;

// Função chamada automaticamente pela API do YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player1', {
    height: '450',
    width: '100%',
    videoId: 'CYP0rHKXo-8', // Vídeo inicial
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      showinfo: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// Quando o player estiver pronto
function onPlayerReady(event) {
  console.log("Player tvmundo1 pronto!");
}

// Quando o estado do player mudar
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    document.getElementById('player1').style.display = 'none';
    document.querySelector('#tvmundo1 .end-screen').style.display = 'flex';
  }
}

// Reiniciar o vídeo
document.querySelector('#tvmundo1 .restart-video').addEventListener('click', () => {
  resetPlayer();
  player.playVideo();
});

// Função para resetar o player
function resetPlayer() {
  document.getElementById('player1').style.display = 'block';
  document.querySelector('#tvmundo1 .end-screen').style.display = 'none';
}

// Alternar visibilidade do menu overlay
const menuToggle = document.querySelector('#tvmundo1 .menu-toggle');
const menuOverlay = document.querySelector('#tvmundo1 .video-menu-overlay');

menuToggle.addEventListener('click', () => {
  if (menuOverlay.style.display === 'block') {
    menuOverlay.style.display = 'none';
    menuToggle.textContent = 'Mostrar Lista de Vídeos';
  } else {
    menuOverlay.style.display = 'block';
    menuToggle.textContent = 'Ocultar Lista de Vídeos';
  }
});

// Fechar menu ao clicar no botão "✕"
const closeMenu = document.querySelector('#tvmundo1 .close-menu');
closeMenu.addEventListener('click', () => {
  menuOverlay.style.display = 'none';
  menuToggle.textContent = 'Mostrar Lista de Vídeos';
});

// Alterar o vídeo ao clicar em um item do menu
const menuItems = document.querySelectorAll('#tvmundo1 .video-menu-overlay li');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const videoId = item.getAttribute('data-video-id');
    resetPlayer();
    player.loadVideoById(videoId);
    menuOverlay.style.display = 'none';
    menuToggle.textContent = 'Mostrar Lista de Vídeos';
  });
});