// Namespace para o player tvmundo1
const TVMundo1 = {
  // Variável para o player
  player: null,
  
  // Inicializar o player
  init: function() {
    // Verificar se a API do YouTube já está carregada
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      // Se a API ainda não estiver carregada, adicionar um callback para quando estiver pronta
      window.onYouTubeIframeAPIReady = (window.onYouTubeIframeAPIReady || function() {}).bind(window);
      
      // Adicionar nosso próprio callback para quando a API estiver pronta
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function() {
        originalCallback();
        TVMundo1.createPlayer();
      };
      
      // Carregar a API do YouTube se ainda não estiver carregada
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    } else {
      // Se a API já estiver carregada, criar o player diretamente
      this.createPlayer();
    }
    
    // Configurar os eventos dos botões
    this.setupEventListeners();
  },
  
  // Criar o player do YouTube
  createPlayer: function() {
    this.player = new YT.Player('tvmundo1-player', {
      height: '315',
      width: '100%',
      videoId: 's9O56TVQm2A', // Vídeo inicial
      playerVars: {
        autoplay: 0,         // Autoplay desativado
        controls: 0,         // Controles desativados
        rel: 0,              // Sugestões limitadas ao mesmo canal
        modestbranding: 1,   // Remove o logo do YouTube
        showinfo: 0          // Remove informações extras
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this)
      }
    });
  },
  
  // Quando o player estiver pronto
  onPlayerReady: function(event) {
    console.log("TVMundo1 Player pronto!");
  },
  
  // Quando o estado do player mudar
  onPlayerStateChange: function(event) {
    if (event.data === YT.PlayerState.ENDED) {
      console.log("TVMundo1 Vídeo terminado.");
      document.getElementById('tvmundo1-player').style.display = 'none';
      document.getElementById('tvmundo1-endScreen').style.display = 'flex';
    }
  },
  
  // Reiniciar o vídeo
  resetPlayer: function() {
    document.getElementById('tvmundo1-player').style.display = 'block';
    document.getElementById('tvmundo1-endScreen').style.display = 'none';
  },
  
  // Função para abrir o menu
  openMenu: function() {
    document.getElementById('tvmundo1-videoMenu').style.display = 'block';
    document.getElementById('tvmundo1-menuToggle').textContent = 'Ocultar Lista de Vídeos';
  },
  
  // Função para fechar o menu
  closeMenuOverlay: function() {
    document.getElementById('tvmundo1-videoMenu').style.display = 'none';
    document.getElementById('tvmundo1-menuToggle').textContent = 'Mostrar Lista de Vídeos deste canal';
  },
  
  // Configurar os event listeners
  setupEventListeners: function() {
    // Botão para reiniciar o vídeo
    document.getElementById('tvmundo1-restartVideo').addEventListener('click', () => {
      this.resetPlayer();
      this.player.playVideo();
    });
    
    // Botão para alternar o menu
    document.getElementById('tvmundo1-menuToggle').addEventListener('click', () => {
      if (document.getElementById('tvmundo1-videoMenu').style.display === 'block') {
        this.closeMenuOverlay();
      } else {
        this.openMenu();
      }
    });
    
    // Botão para fechar o menu
    document.getElementById('tvmundo1-closeMenu').addEventListener('click', () => {
      this.closeMenuOverlay();
    });
    
    // Itens do menu para selecionar vídeos
    document.querySelectorAll('#tvmundo1-videoMenu li').forEach(item => {
      item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video-id');
        this.resetPlayer();
        this.player.loadVideoById(videoId);
        this.closeMenuOverlay();
      });
    });
  }
};

// Inicializar o player quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  TVMundo1.init();
});
