const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Configurações
const POSTS_DIR = './posts';
const JSON_FILE = './posts.json';

// Função para ler o conteúdo de um arquivo HTML
function readHtmlFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const $ = cheerio.load(content);
        
        return {
            title: $('title').text() || $('h1').first().text(),
            excerpt: $('meta[name="description"]').attr('content') || 
                     $('.post-content').first().text().slice(0, 150) + '...',
            image: $('meta[property="og:image"]').attr('content') || 
                   $('img').first().attr('src')
        };
    } catch (error) {
        console.error(`Erro ao ler arquivo ${filePath}:`, error);
        return null;
    }
}

// Função para gerar a data baseada na estrutura do diretório
function generateDateFromPath(filePath) {
    const parts = filePath.split(path.sep);
    const year = parts[parts.indexOf('posts') + 1];
    const month = parts[parts.indexOf('posts') + 2];
    const day = parts[parts.indexOf('posts') + 3];
    
    const months = {
        'jan': 'Janeiro',
        'fev': 'Fevereiro',
        'mar': 'Março',
        'abr': 'Abril',
        'mai': 'Maio',
        'jun': 'Junho',
        'jul': 'Julho',
        'ago': 'Agosto',
        'set': 'Setembro',
        'out': 'Outubro',
        'nov': 'Novembro',
        'dez': 'Dezembro'
    };

    return `${day} de ${months[month]}, ${year}`;
}

// Função para encontrar todos os arquivos HTML recursivamente
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Função principal para atualizar o posts.json
function updatePostsJson() {
    try {
        // Encontrar todos os arquivos HTML
        const htmlFiles = findHtmlFiles(POSTS_DIR);
        
        // Gerar dados para cada post
        const posts = htmlFiles.map(filePath => {
            const relativePath = filePath.replace(/\\/g, '/');
            const postData = readHtmlFile(filePath);
            
            if (!postData) return null;

            return {
                title: postData.title,
                excerpt: postData.excerpt,
                image: postData.image || 'default-image.jpg',
                url: relativePath,
                date: generateDateFromPath(relativePath)
            };
        }).filter(post => post !== null);

        // Ordenar posts por data (mais recentes primeiro)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Salvar no arquivo JSON
        fs.writeFileSync(JSON_FILE, JSON.stringify(posts, null, 2));
        console.log('posts.json atualizado com sucesso!');

    } catch (error) {
        console.error('Erro ao atualizar posts.json:', error);
    }
}

// Monitorar mudanças na pasta de posts
fs.watch(POSTS_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.html')) {
        console.log(`Detectada alteração em: ${filename}`);
        updatePostsJson();
    }
});

// Executar atualização inicial
updatePostsJson();
console.log('Monitorando alterações na pasta posts...');