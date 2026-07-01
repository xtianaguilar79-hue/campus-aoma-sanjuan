// Biblioteca de Videos
const videos = {
    currentCategory: 'all',
    
    init() {
        // Inicializar filtros si existe la página de videos
    },
    
    async render(container) {
        const videosData = app.getVideos();
        const categories = [
            { id: 'all', name: 'Todos' },
            ...Object.values(CONFIG.activities),
            { id: 'general', name: 'General' }
        ];
        
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Biblioteca de Videos 🎥</h1>
                <p>Charlas, capacitaciones y material exclusivo</p>
            </div>
            
            <div class="video-tabs scroll-reveal">
                ${categories.map(cat => `
                    <button class="tab ${cat.id === this.currentCategory ? 'active' : ''}" 
                            onclick="videos.filterCategory('${cat.id}')">
                        ${cat.name}
                    </button>
                `).join('')}
            </div>
            
            <div class="video-grid cards-grid">
                ${this.getFilteredVideos().map(video => this.renderVideoCard(video)).join('')}
            </div>
        `;
    },
    
    getFilteredVideos() {
        const allVideos = app.getVideos();
        if (this.currentCategory === 'all') return allVideos;
        return allVideos.filter(v => v.category === this.currentCategory);
    },
    
    renderVideoCard(video) {
        return `
            <div class="video-card hover-lift scroll-reveal">
                <div class="video-thumbnail" onclick="videos.openModal(${video.id})">
                    <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                    <div class="video-play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                    <span class="video-duration">${video.duration}</span>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <div class="video-meta">
                        <span><i class="far fa-eye"></i> ${video.views}</span>
                        <span><i class="far fa-calendar"></i> ${Utils.formatDate(video.uploadedAt)}</span>
                    </div>
                </div>
            </div>
        `;
    },
    
    filterCategory(category) {
        this.currentCategory = category;
        const container = document.getElementById('pageContent');
        this.render(container);
    },
    
    openModal(videoId) {
        const video = app.getVideos().find(v => v.id === videoId);
        if (!video) return;
        
        document.getElementById('videoModalTitle').textContent = video.title;
        document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;
        document.getElementById('videoModalInfo').innerHTML = `
            <p><strong>Duración:</strong> ${video.duration}</p>
            <p><strong>Categoría:</strong> ${CONFIG.activities[video.category]?.name || 'General'}</p>
            <p><strong>Visualizaciones:</strong> ${video.views}</p>
        `;
        
        document.getElementById('videoModal').classList.add('active');
        document.getElementById('modalOverlay').classList.add('active');
    },
    
    closeModal() {
        document.getElementById('videoModal').classList.remove('active');
        document.getElementById('modalOverlay').classList.remove('active');
        document.getElementById('videoFrame').src = '';
    }
};