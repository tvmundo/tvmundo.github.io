// Função para carregar os posts do arquivo posts.json e gerar prévias
async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        const previewContainer = document.getElementById('post-previews');

        posts.forEach(post => {
            const preview = document.createElement('a');
            preview.classList.add('preview');
            preview.href = post.path;

            preview.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <div class="preview-content">
                    <h2>${post.title}</h2>
                    <p>${post.description}</p>
                </div>
            `;

            previewContainer.appendChild(preview);
        });
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
    }
}

// Carrega os posts ao iniciar a página
document.addEventListener('DOMContentLoaded', loadPosts);