// ============================================
// BIBLIOTECA DE VIDEOS - USA DATA
// ============================================

const videos = {
    currentCategory: 'all',

    init() {
        console.log('✅ Módulo de videos inicializado');
    },

    async render(container) {
        const categories = [
            { id: 'all', name: 'Todos' },
            ...Object.entries(DATA.actividades).map(([k, v]) => ({ id: k, name: v.nombre })),
            { id: 'general', name: 'General' }
        ];

        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Biblioteca de Videos 🎥</h1>
                <p>Charlas, capacitaciones y material exclusivo</p>
            </div>
            
            <div class="tabs" id="videoTabs">
                ${categories.map(cat => `
                    <button class="tab ${cat.id === this.currentCategory ? 'active' : ''}" 
                            onclick="videos.filterCategory('${cat.id}')">
                        ${cat.name}
                    </button>
                `).join('')}
            </div>
            
            <div class="video-grid">
                ${this.getFilteredVideos().map(v => this.renderVideoCard(v)).join('')}
            </div>
        `;
    },

    getFilteredVideos() {
        if (this.currentCategory === 'all') return DATA.videos;
        return DATA.videos.filter(v => v.categoria === this.currentCategory);
    },

    renderVideoCard(video) {
        return `
            <div class="video-card hover-lift scroll-reveal" onclick="videos.openModal(${video.id})" style="cursor: pointer;">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Video'">
                    <div class="video-play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                    <span class="video-duration">${video.duracion}</span>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.titulo}</h3>
                    <div class="video-meta">
                        <span><i class="far fa-eye"></i> ${video.vistas}</span>
                        <span><i class="far fa-calendar"></i> ${Utils.formatDate(video.fecha)}</span>
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
        const video = DATA.videos.find(v => v.id === videoId);
        if (!video) return;

        const actName = DATA.actividades[video.categoria]?.nombre || 'General';
        
        document.getElementById('videoModalTitle').textContent = video.titulo;
        document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;
        document.getElementById('videoModalInfo').innerHTML = `
            <p style="margin-bottom: 0.5rem;">${video.descripcion}</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; color: var(--text-secondary); font-size: var(--text-sm);">
                <span><i class="fas fa-clock"></i> Duración: ${video.duracion}</span>
                <span><i class="fas fa-tag"></i> Categoría: ${actName}</span>
                <span><i class="far fa-eye"></i> ${video.vistas} visualizaciones</span>
            </div>
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

if (typeof window !== 'undefined') {
    window.videos = videos;
}
