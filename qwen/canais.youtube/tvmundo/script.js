// Variável global para o player
let player;

// Função chamada automaticamente pela API do YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '100%',
    videoId: 's9O56TVQm2A', // Vídeo inicial
    playerVars: {
      autoplay: 0,         // Autoplay ativado
      controls: 0,         // Controles desativados
      rel: 0,              // Sugestões limitadas ao mesmo canal
      modestbranding: 1,   // Remove o logo do YouTube
      showinfo: 0          // Remove informações extras
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// Quando o player estiver pronto
function onPlayerReady(event) {
  console.log("Player pronto!");
}

// Quando o estado do player mudar
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    console.log("Vídeo terminado.");
    document.getElementById('player').style.display = 'none';
    document.getElementById('endScreen').style.display = 'flex';
  }
}

// Reiniciar o vídeo
document.getElementById('restartVideo').addEventListener('click', () => {
  resetPlayer();
  player.playVideo();
});

// Função para resetar o player
function resetPlayer() {
  document.getElementById('player').style.display = 'block';
  document.getElementById('endScreen').style.display = 'none';
}

// Selecionar elementos
const menuToggle = document.getElementById('menuToggle');
const videoMenu = document.getElementById('videoMenu');
const closeMenu = document.getElementById('closeMenu');

// Função para abrir o menu
function openMenu() {
  videoMenu.style.display = 'block';
  menuToggle.textContent = 'Ocultar Lista de Vídeos';
}

// Função para fechar o menu
function closeMenuOverlay() {
  videoMenu.style.display = 'none';
  menuToggle.textContent = 'Mostrar Lista de Vídeos';
}

// Alternar visibilidade do menu overlay
menuToggle.addEventListener('click', () => {
  if (videoMenu.style.display === 'block') {
    closeMenuOverlay();
  } else {
    openMenu();
  }
});

// Fechar menu ao clicar no botão "✕"
closeMenu.addEventListener('click', closeMenuOverlay);

// Alterar o vídeo ao clicar em um item do menu
document.querySelectorAll('#videoMenu li').forEach(item => {
  item.addEventListener('click', () => {
    const videoId = item.getAttribute('data-video-id');
    resetPlayer(); // Reseta o player antes de carregar o novo vídeo
    player.loadVideoById(videoId); // Carrega o novo vídeo no player
    closeMenuOverlay();            // Ocultar o menu após a seleção
  });
});