// Búsqueda Global
const search = {
    input: null,
    resultsContainer: null,
    debounceTimer: null,
    
    init() {
        this.input = document.getElementById('searchInput');
        this.resultsContainer = document.getElementById('searchResults');
        
        this.input?.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });
        
        // Cerrar resultados al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.global-search')) {
                this.hideResults();
            }
        });
    },
    
    handleInput(query) {
        clearTimeout(this.debounceTimer);
        
        if (query.length < 2) {
            this.hideResults();
            return;
        }
        
        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    },
    
    performSearch(query) {
        const results = {
            cursos: [],
            videos: [],
            noticias: [],
            escalas: [],
            faq: []
        };
        
        const lowerQuery = query.toLowerCase();
        
        // Buscar en cursos
        const courses = app.getCourses();
        results.cursos = courses.filter(c => 
            c.title.toLowerCase().includes(lowerQuery) ||
            c.category.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);
        
        // Buscar en videos
        const videos = app.getVideos();
        results.videos = videos.filter(v => 
            v.title.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);
        
        // Buscar en noticias
        const news = app.getNews();
        results.noticias = news.filter(n => 
            n.title.toLowerCase().includes(lowerQuery) ||
            n.excerpt.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);
        
        // Buscar en FAQ
        Object.entries(CONFIG.faqs).forEach(([category, faqs]) => {
            const matches = faqs.filter(f => 
                f.question.toLowerCase().includes(lowerQuery) ||
                f.answer.toLowerCase().includes(lowerQuery)
            );
            if (matches.length > 0) {
                results.faq.push(...matches.map(f => ({ ...f, category })));
            }
        });
        
        this.showResults(results);
    },
    
    showResults(results) {
        let html = '';
        let hasResults = false;
        
        // Cursos
        if (results.cursos.length > 0) {
            hasResults = true;
            html += `
                <div class="search-section">
                    <div class="search-section-title">Cursos</div>
                    ${results.cursos.map(c => `
                        <div class="search-result-item" onclick="app.navigateTo('cursos'); search.hideResults();">
                            <i class="fas fa-graduation-cap"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(c.title)}</div>
                                <div class="search-result-meta">${c.category} • ${c.duration}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Videos
        if (results.videos.length > 0) {
            hasResults = true;
            html += `
                <div class="search-section">
                    <div class="search-section-title">Videos</div>
                    ${results.videos.map(v => `
                        <div class="search-result-item" onclick="videos.openModal(${v.id}); search.hideResults();">
                            <i class="fas fa-play-circle"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(v.title)}</div>
                                <div class="search-result-meta">${v.duration}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Noticias
        if (results.noticias.length > 0) {
            hasResults = true;
            html += `
                <div class="search-section">
                    <div class="search-section-title">Noticias</div>
                    ${results.noticias.map(n => `
                        <div class="search-result-item" onclick="app.navigateTo('noticias'); search.hideResults();">
                            <i class="fas fa-newspaper"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(n.title)}</div>
                                <div class="search-result-meta">${n.category}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        if (!hasResults) {
            html = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron resultados para "${this.input.value}"</p>
                </div>
            `;
        }
        
        this.resultsContainer.innerHTML = html;
        this.resultsContainer.classList.add('active');
    },
    
    highlight(text) {
        const query = this.input.value;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    },
    
    hideResults() {
        this.resultsContainer.classList.remove('active');
    }
};