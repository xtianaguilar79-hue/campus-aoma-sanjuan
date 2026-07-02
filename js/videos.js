/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: videos.js (UI Premium & Segmented Video Library)
 */

window.ModuleVideos = {
    videosData: [],
    currentFilter: 'todos',

    init(container) {
        this.loadVideosDatabase();
        this.renderInterface(container);
        this.bindEvents(container);
    },

    // Base de datos integrada con el mapeo exacto de Ramas de AOMA San Juan
    loadVideosDatabase() {
        this.videosData = [
            { 
                id: 'v1', 
                title: 'Inducción de Seguridad en Planta Calera', 
                category: 'cal', 
                branch: 'CAL Y PIEDRA',
                company: 'todos',
                duration: '14:20', 
                thumb: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=400&q=80', 
                desc: 'Protocolos de circulación, uso de EPP específico para hornos y control de polvo de cal.', 
                url: 'https://www.w3schools.com/html/mov_bbb.mp4' 
            },
            { 
                id: 'v2', 
                title: 'Maniobras de RCP y Primeros Auxilios en Alta Montaña', 
                category: 'general', 
                branch: 'TODAS',
                company: 'todos',
                duration: '22:05', 
                thumb: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80', 
                desc: 'Respuesta rápida ante contingencias de salud y trauma en condiciones climáticas extremas.', 
                url: 'https://www.w3schools.com/html/movie.mp4' 
            },
            { 
                id: 'v3', 
                title: 'Operación del Sistema de Voladura Controlada - Proyecto Veladero', 
                category: 'metalifera', 
                branch: 'MINERÍA EXTRACTIVA',
                company: 'Veladero',
                duration: '18:40', 
                thumb: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', 
                desc: 'Estudio de tiempos de detonación, resguardos perimetrales y sirenas de evacuación en alta montaña.', 
                url: 'https://www.w3schools.com/html/mov_bbb.mp4' 
            },
            { 
                id: 'v4', 
                title: 'Mantenimiento Preventivo de Molinos SAG', 
                category: 'molienda', 
                branch: 'MOLIENDA DE MINERALES',
                company: 'todos',
                duration: '25:15', 
                thumb: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80', 
                desc: 'Procedimientos de bloqueo de energía (LOTO) e inspección interna de blindajes.', 
                url: 'https://www.w3schools.com/html/movie.mp4' 
            },
            { 
                id: 'v5', 
                title: 'Procesos de Calcinación de Clinker y Automatización', 
                category: 'molienda', 
                branch: 'CEMENTO',
                company: 'Loma Negra',
                duration: '31:10', 
                thumb: 'https://images.unsplash.com/photo-1513828565645-cdb4de629f26?auto=format&fit=crop&w=400&q=80', 
                desc: 'Optimización de flujo en hornos rotativos de cemento bajo normativas CCT 53/89.', 
                url: 'https://www.w3schools.com/html/mov_bbb.mp4' 
            }
        ];
    },

    renderInterface(container) {
        container.innerHTML = `
            <div class="container-premium animate-fade-in space-y-6">
                <div>
                    <h2 class="text-2xl font-bold text-white">Videoteca Gremial Instructiva</h2>
                    <p class="text-slate-400 text-sm mt-1">Formación técnica audiovisual con validez sindical para el sector minero.</p>
                </div>

                <div class="video-filters flex flex-wrap gap-2 pb-2 overflow-x-auto">
                    <button class="btn btn-primary filter-btn px-4 py-2 text-xs rounded-xl transition-all" data-filter="todos">Todos los Videos</button>
                    <button class="btn btn-secondary filter-btn px-4 py-2 text-xs rounded-xl transition-all" data-filter="metalifera">Minería Metalífera</button>
                    <button class="btn btn-secondary filter-btn px-4 py-2 text-xs rounded-xl transition-all" data-filter="cal">Industria de la Cal</button>
                    <button class="btn btn-secondary filter-btn px-4 py-2 text-xs rounded-xl transition-all" data-filter="molienda">Molienda y Cemento</button>
                    <button class="btn btn-secondary filter-btn px-4 py-2 text-xs rounded-xl transition-all" data-filter="general">Seguridad General</button>
                </div>

                <div id="videos-grid-target" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </div>
        `;
        this.renderVideosGrid();
    },

    renderVideosGrid() {
        const grid = document.getElementById('videos-grid-target');
        if (!grid) return;

        // Recuperar la sesión del afiliado para aplicar el filtro de seguridad por segmentación
        const session = JSON.parse(localStorage.getItem('aoma_session')) || {};
        const userBranch = session.rama ? session.rama.toUpperCase() : '';
        const userCompany = session.empresa ? session.empresa.toLowerCase() : '';
        const isAdmin = session.rol === 'admin';

        // 1. Filtrar primero por permisos de Rama y Empresa (Seguridad del lado del cliente)
        const allowedVideos = this.videosData.filter(video => {
            if (isAdmin) return true; // El administrador ve absolutamente todo
            if (video.branch === 'TODAS') return true;
            
            const matchesBranch = video.branch.toUpperCase() === userBranch;
            const matchesCompany = video.company === 'todos' || video.company.toLowerCase() === userCompany;
            
            return matchesBranch && matchesCompany;
        });

        // 2. Filtrar por la categoría seleccionada en la botonera UI
        const filteredVideos = this.currentFilter === 'todos' 
            ? allowedVideos 
            : allowedVideos.filter(v => v.category === this.currentFilter);

        // Renderizado en caso de no haber contenidos asignados
        if (filteredVideos.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 card-premium flex flex-col items-center justify-center gap-3">
                    <i data-lucide="video-off" class="h-10 w-10 text-slate-600"></i>
                    <p class="text-slate-400 text-sm font-medium">No hay videos disponibles configurados para su perfil convencional en esta categoría.</p>
                </div>`;
            if (window.lucide) lucide.createIcons();
            return;
        }

        // Renderizado Dinámico del Catálogo Premium
        grid.innerHTML = filteredVideos.map(video => `
            <div class="card-premium flex flex-col overflow-hidden group" style="padding: 0;">
                <div class="relative h-48 bg-slate-900 overflow-hidden cursor-pointer play-trigger" data-id="${video.id}">
                    <img src="${video.thumb}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Preview">
                    <div class="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center backdrop-blur-[1px]">
                        <div class="h-12 w-12 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 transform group-hover:scale-110 transition-transform">
                            <i class="fa-solid fa-play ml-0.5 text-lg"></i>
                        </div>
                    </div>
                    <span class="absolute bottom-3 right-3 bg-slate-950/80 border border-white/10 text-white px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold tracking-wider">
                        ${video.duration}
                    </span>
                </div>
                
                <div class="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div class="space-y-2">
                        <span class="inline-flex items-center rounded-md bg-slate-950 px-2 py-0.5 text-xs font-medium text-slate-400 border border-slate-800 uppercase tracking-wide text-[10px]">
                            ${video.branch}
                        </span>
                        <h4 class="text-sm font-semibold text-white leading-snug">${video.title}</h4>
                        <p class="text-slate-400 text-xs line-clamp-2 leading-relaxed">${video.desc}</p>
                    </div>
                    
                    <button class="btn btn-secondary w-full py-2.5 text-xs gap-2 play-trigger" data-id="${video.id}">
                        <i data-lucide="circle-play" class="h-4 w-4"></i>
                        <span>Reproducir Clase Técnica</span>
                    </button>
                </div>
            </div>
        `).join('');

        if (window.lucide) lucide.createIcons();
    },

    bindEvents(container) {
        // Manejo del estado activo de los filtros de la Videoteca
        container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-secondary');
                });
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');

                this.currentFilter = btn.getAttribute('data-filter');
                this.renderVideosGrid();
            });
        });

        // Event Delegation limpio para la apertura de clases en vídeo
        container.addEventListener('click', (e) => {
            const trigger = e.target.closest('.play-trigger');
            if (trigger) {
                const videoId = trigger.getAttribute('data-id');
                const video = this.videosData.find(v => v.id === videoId);
                if (video) this.openVideoPlayerModal(video);
            }
        });
    },

    // Cinema Display Modal Reingeniado por Completo
    openVideoPlayerModal(video) {
        document.getElementById('video-player-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'video-player-modal';
        modal.className = 'fixed inset-0 bg-slate-950/95 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-fade-in';

        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl animate-fade-in flex flex-col">
                <div class="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                            <i data-lucide="video" class="h-4 w-4"></i>
                        </div>
                        <h4 class="text-sm font-semibold text-white">${video.title}</h4>
                    </div>
                    <button id="close-video-modal" class="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all">
                        <i data-lucide="x" class="h-5 w-5"></i>
                    </button>
                </div>
                
                <div class="bg-black w-full aspect-video relative">
                    <video id="html5-gremial-player" controls autoplay class="w-full h-full block object-contain">
                        <source src="${video.url}" type="video/mp4">
                        Su navegador no soporta la reproducción de video HTML5.
                    </video>
                </div>
                
                <div class="px-6 py-3 bg-slate-950/40 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <div class="flex items-center gap-2">
                        <i data-lucide="shield-check" class="text-emerald-400 h-4 w-4"></i>
                        <span>Certificación Homologada - AOMA Seccional San Juan</span>
                    </div>
                    <span id="video-progress-status" class="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400 border border-cyan-500/20">
                        <span class="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span>Sincronizando Legajo...</span>
                    </span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        if (window.lucide) lucide.createIcons();

        // Lógica de descarte y detención de streams
        const closeModal = () => {
            modal.querySelector('video')?.pause();
            modal.remove();
            document.body.style.overflow = '';
        };

        modal.querySelector('#close-video-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        // Tracker de finalización integrado con el sistema de Toasts Globales
        const player = modal.querySelector('#html5-gremial-player');
        if (player) {
            player.addEventListener('ended', () => {
                const status = modal.querySelector('#video-progress-status');
                if (status) {
                    status.className = 'inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20';
                    status.innerHTML = `
                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        <span>Clase Completada</span>
                    `;
                }
                if (window.AppInstance && typeof window.AppInstance.showToast === 'function') {
                    window.AppInstance.showToast('Visualización completada. Progreso impactado en su legajo.', 'success');
                }
            });

            // Actualización de estado post-carga del buffer
            player.addEventListener('playing', () => {
                const status = modal.querySelector('#video-progress-status');
                if (status && !player.ended) {
                    status.innerHTML = `
                        <span class="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span>Transmitiendo HD</span>
                    `;
                }
            });
        }
    }
};