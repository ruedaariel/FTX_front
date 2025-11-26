
export const getEmbedUrl = (url) => {
    // 💡 Paso 1: Si no hay URL, o no es un string, retorna undefined inmediatamente
    if (!url || typeof url !== 'string') return undefined;
    
    // Regex para extraer el ID de YouTube (watch?v=, youtu.be/, etc.)
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:.+)?$/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
        // 💡 Retorna la URL de embed si el ID es válido
        return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
    }
    
    // 💡 Si no coincide con YouTube, retornamos undefined
    return undefined; 
}