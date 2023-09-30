
// Check if the page is the homepage or not
const isHomePage = window.location.pathname === '/';
if (isHomePage) {
 // Show a preview of your latest blog post on the homepage
 const latestPost = /* get the latest post from your database */;
 const previewImage = 'url(' + latestPost.thumbnailUrl + ')';
 const previewTitle = latestPost.title;
 const previewText = latestPost.description || '';
 document.getElementById('preview').innerHTML = `![${latestPost.title}](${latestPost.url})
---------------------------
**${latestPost.title}**  
${latestPost.description || ''}
### ${latestPost.categories[0].name}  
Published on ${formatDate(latestPost.publishedAt)} by admin
Preview of "${previewTitle}"`;
 document.getElementById('post-date').textContent = formatDate(latestPost.publishedAt);
} else {
 // Show the latest post from your blog in a separate section
 const posts = /* get all the posts from your database */;
 const latestPostIndex = posts.findIndex((p) => p.publishedAt === Date.now());
 if (latestPostIndex !== -1) {
 const latestPost = posts[latestPostIndex];
 document.getElementById('posts-section').innerHTML = `**${latestPost.title}**  
${latestPost.description || ''}
### ${latestPost.categories[0].name}  
Published on ${formatDate(latestPost.publishedAt)} by admin`;
 } else {
 document.getElementById('posts-section').innerHTML = 'No posts yet';
 }
}
function formatDate(date) {
 // Format the date string to match your blog's style (e.g., "MM/dd/yyyy")
 return `${date.getMonth() + 1}/${date.getDate()} (${formatYear(date)})`;
 function formatYear(date) {
 const year = date.getFullYear();
 // Format the year string to match your blog's style (e.g., "2022")
 return `20${year}`;
 }
}
<!---
Este código pressupõe que você tenha um arquivo JavaScript chamado `preview-post.js` no diretório raiz do seu site e que contenha as seguintes funções:
- `formatDate(date)`: Formata a string de data para corresponder ao estilo do seu blog (por exemplo, "MM/dd/yyyy").
- `formatYear(date)`: formata a sequência do ano para corresponder ao estilo do seu blog (por exemplo, "2022").
Você pode personalizar essas funções com suas próprias regras de formatação e lógica de análise de data, se necessário.
Deixe-me saber se você tiver alguma dúvida ou preocupação!
--->