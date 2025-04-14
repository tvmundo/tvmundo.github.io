// script.js
let players = {};

function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.video-container').forEach((container) => {
        const playerId = container.querySelector('.youtube-player').id;

        // Verifica se o ID do player é único
        if (!playerId) {
            console.error('Player ID não encontrado:', container);
            return;
        }

        // Define o vídeo inicial para cada player
        let initialVideoId = '';
        if (playerId === 'player-1') {
            initialVideoId = 's9O56TVQm2A'; // Vídeo inicial para o primeiro player
        } else if (playerId === 'player-2') {
            initialVideoId = 'qvJ6R2gQegw'; // Vídeo inicial para o segundo player
        }

        // Inicializa o player do YouTube
        players[playerId] = new YT.Player(playerId, {
            height: '450',
            width: '800',
            videoId: initialVideoId, // Define o vídeo inicial
            playerVars: {
                controls: 1,
                rel: 0, // Desativa vídeos relacionados
                showinfo: 0, // Remove informações extras
                modestbranding: 1, // Remove o logo do YouTube
                fs: 1, // Permite tela cheia
                iv_load_policy: 3, // Desativa cards anotados
                autoplay: 0,
                enablejsapi: 1
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });

        // Configura o menu suspenso
        const dropdownButton = container.querySelector('.dropdown-button');
        const dropdownMenu = container.querySelector('.dropdown-menu');

        dropdownButton.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        dropdownMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const videoId = event.target.getAttribute('data-video-id');
                players[playerId].loadVideoById(videoId);
                dropdownMenu.style.display = 'none';
                dropdownButton.textContent = event.target.textContent + ' ▼'; // Atualiza o texto do botão
            }
        });
    });
}

function onPlayerReady(event) {
    console.log('Player pronto:', event.target.getIframe().id);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        event.target.stopVideo(); // Para o vídeo ao finalizar
    }
}