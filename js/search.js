// ============================================
// BÚSQUEDA GLOBAL - USA DATA
// ============================================

const search = {
    input: null,
    resultsContainer: null,
    debounceTimer: null,

    init() {
        this.input = document.getElementById('searchInput');
        this.resultsContainer = document.getElementById('searchResults');

        if (this.input) {
            this.input.addEventListener('input', (e) => {
                this.handleInput(e.target.value);
            });

            this.input.addEventListener('focus', () => {
                if (this.input.value.length >= 2) {
                    this.performSearch(this.input.value);
                }
            });
        }

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
        const results = DATA.buscar(query);
        if (!results) return;
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
                    <div class="search-section-title">Cursos (${results.cursos.length})</div>
                    ${results.cursos.slice(0, 4).map(c => `
                        <div class="search-result-item" onclick="app.showCursoDetalle(${c.id}); search.hideResults();">
                            <i class="fas fa-graduation-cap"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(c.titulo)}</div>
                                <div class="search-result-meta">${c.categoria} • ${c.duracion}</div>
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
                    <div class="search-section-title">Videos (${results.videos.length})</div>
                    ${results.videos.slice(0, 3).map(v => `
                        <div class="search-result-item" onclick="videos.openModal(${v.id}); search.hideResults();">
                            <i class="fas fa-play-circle"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(v.titulo)}</div>
                                <div class="search-result-meta">${v.duracion}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Convenios
        if (results.convenios.length > 0) {
            hasResults = true;
            html += `
                <div class="search-section">
                    <div class="search-section-title">Convenios (${results.convenios.length})</div>
                    ${results.convenios.slice(0, 3).map(c => `
                        <div class="search-result-item" onclick="app.showConvenioDetalle(${c.id}); search.hideResults();">
                            <i class="fas fa-file-contract"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(c.titulo)}</div>
                                <div class="search-result-meta">${c.categoria}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Leyes
        if (results.leyes.length > 0) {
            hasResults = true;
            html += `
                <div class="search-section">
                    <div class="search-section-title">Leyes (${results.leyes.length})</div>
                    ${results.leyes.slice(0, 3).map(l => `
                        <div class="search-result-item" onclick="app.showLeyDetalle(${l.id}); search.hideResults();">
                            <i class="fas fa-balance-scale"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(l.numero + ' - ' + l.titulo)}</div>
                                <div class="search-result-meta">${l.categoria}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // FAQs
        if (results.faqs.length > 0) {
            hasResults = true;
            html += `
                <div class="search-section">
                    <div class="search-section-title">Preguntas frecuentes (${results.faqs.length})</div>
                    ${results.faqs.slice(0, 3).map(f => `
                        <div class="search-result-item" onclick="app.navigateTo('faq'); search.hideResults();">
                            <i class="fas fa-question-circle"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(f.pregunta)}</div>
                                <div class="search-result-meta">${f.respuesta.substring(0, 80)}...</div>
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
                    <div class="search-section-title">Noticias (${results.noticias.length})</div>
                    ${results.noticias.slice(0, 3).map(n => `
                        <div class="search-result-item" onclick="app.navigateTo('noticias'); search.hideResults();">
                            <i class="fas fa-newspaper"></i>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlight(n.titulo)}</div>
                                <div class="search-result-meta">${n.categoria}</div>
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
                    <p>No se encontraron resultados para "<strong>${Utils.escapeHtml(this.input.value)}</strong>"</p>
                </div>
            `;
        }

        this.resultsContainer.innerHTML = html;
        this.resultsContainer.classList.add('active');
    },

    highlight(text) {
        const query = this.input.value;
        if (!query) return text;
        try {
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        } catch (e) {
            return text;
        }
    },

    hideResults() {
        if (this.resultsContainer) {
            this.resultsContainer.classList.remove('active');
        }
    }
};

if (typeof window !== 'undefined') {
    window.search = search;
}
