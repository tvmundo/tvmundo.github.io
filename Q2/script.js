document.addEventListener("DOMContentLoaded", () => {
  const postPreviewsContainer = document.getElementById("post-previews");

  // Lista de caminhos para os posts (ajuste conforme necessário)
  const postPaths = [
    "/posts/2025/1/1/post1.html",
    "/posts/2025/1/2/post2.html"
  ];

  // Função para carregar os metadados de um post
  async function loadPostPreview(postPath) {
    try {
      const response = await fetch(postPath);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const metadataScript = doc.getElementById("post-metadata");
      if (metadataScript) {
        const metadata = JSON.parse(metadataScript.textContent);
        return metadata;
      }
    } catch (error) {
      console.error(`Erro ao carregar o post: ${postPath}`, error);
    }
    return null;
  }

  // Função para criar uma prévia de post
  function createPostPreview(metadata) {
    const preview = document.createElement("div");
    preview.className = "post-preview";

    const link = document.createElement("a");
    link.href = metadata.url;

    const img = document.createElement("img");
    img.src = metadata.image;
    img.alt = metadata.title;

    const title = document.createElement("h2");
    title.textContent = metadata.title;

    const description = document.createElement("p");
    description.textContent = metadata.description;

    link.appendChild(img);
    link.appendChild(title);
    link.appendChild(description);
    preview.appendChild(link);

    return preview;
  }

  // Carregar todas as prévias
  async function loadAllPreviews() {
    for (const postPath of postPaths) {
      const metadata = await loadPostPreview(postPath);
      if (metadata) {
        const preview = createPostPreview(metadata);
        postPreviewsContainer.appendChild(preview);
      }
    }
  }

  loadAllPreviews();
});