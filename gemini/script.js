document.addEventListener('DOMContentLoaded', () => {
    const previewsContainer = document.getElementById('previews');
    const postsPath = 'posts/2025/jan/1/'; // Caminho base dos posts

    fetchPosts(postsPath)
        .then(posts => {
            posts.forEach(post => {
                createPreview(post, previewsContainer);
            });
        })
        .catch(error => console.error('Erro ao buscar posts:', error));
});

async function fetchPosts(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Erro ao buscar posts em ${path}: ${response.status}`);
    }
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'))
        .map(link => link.href)
        .filter(href => href.endsWith('.html'));
    return links;
}

function createPreview(postUrl, container) {
    fetch(postUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const title = doc.querySelector('h1').textContent;
            const description = doc.querySelector('p').textContent;
            const imageUrl = doc.querySelector('img').src;

            const preview = document.createElement('div');
            preview.classList.add('preview');
            preview.innerHTML = `
                <h2>${title}</h2>
                <img src="${imageUrl}" alt="${title}">
                <p>${description}</p>
                <a href="${postUrl}">Leia mais</a>
            `;
            container.appendChild(preview);
        })
        .catch(error => console.error('Erro ao criar prévia:', error));
}