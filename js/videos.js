/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo 02: Videoteca Gremial Instructiva e Interfaz Multimedia Inmersiva
 */

window.ModuleVideos = {
    videosData: [],
    currentFilter: 'todos',

    // Inicializador del módulo (Inyectado por el Router en app.js)
    init(container) {
        this.loadVideosDatabase();
        this.renderInterface(container);
        this.bindEvents(container);
    },

    // Base de datos semilla de contenidos audiovisuales calificados
    loadVideosDatabase() {
        this.videosData = [
            { id: 'v1', title: 'Inducción de Seguridad en Planta Calera', category: 'cal', duration: '14:20', thumb: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=400&q=80', desc: 'Protocolos de circulación, uso de EPP específico para hornos y control de polvo de cal.', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            { id: 'v2', title: 'Maniobras de RCP y Primeros Auxilios en Alta Montaña', category: 'general', duration: '22:05', thumb: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80', desc: 'Respuesta rápida ante contingencias de salud y trauma en condiciones climáticas extremas.', url: 'https://www.w3schools.com/html/movie.mp4' },
            { id: 'v3', title: 'Operación del Sistema de Voladura Controlada', category: 'metalifera', duration: '18:40', thumb: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', desc: 'Estudio visual de tiempos de detonación, resguardos perimetrales y sirenas de evacuación.', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            { id: 'v4', title: 'Mantenimiento Preventivo de Molinos SAG', category: 'molienda', duration: '25:15', thumb: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80', desc: 'Procedimientos de bloqueo de energía (LOTO) e inspección interna de blindajes.', url: 'https://www.w3schools.com/html/movie.mp4' }
        ];
    },

    // Renderizado completo de la interfaz de la Videoteca
    renderInterface(container) {
        container.innerHTML = `
            <div style="margin-bottom: var(--space-6); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
                <div>
                    <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Videoteca Gremial Instructiva</h2>
                    <p style="color: var(--text-muted); font-size: var(--font-sm);">Material audiovisual técnico enfocado en prevención, normativas e inducciones operativas.</p>
                </div>
            </div>

            <!-- Filtros de Categoría Multirrama -->
            <div class="video-filters" style="display: flex; gap: var(--space-2); margin-bottom: var(--space-6); overflow-x: auto; padding-bottom: 5px;">
                <button class="btn btn-primary filter-btn" data-filter="todos">Todos los Videos</button>
                <button class="btn btn-secondary filter-btn" data-filter="metalifera">Minería Metalífera</button>
                <button class="btn btn-secondary filter-btn" data-filter="cal">Industria de la Cal</button>
                <button class="btn btn-secondary filter-btn" data-filter="molienda">Molienda y Cemento</button>
                <button class="btn btn-secondary filter-btn" data-filter="general">Seguridad General</button>
            </div>

            <!-- Grid de Tarjetas Multimedia -->
            <div id="videos-grid-target" class="grid-videos" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-6);">
                <!-- Se inyecta dinámicamente mediante renderVideosGrid() -->
            </div>
        `;

        this.renderVideosGrid();
    },

    // Renderizado dinámico de los videos según el filtro seleccionado
    renderVideosGrid() {
        const grid = document.getElementById('videos-grid-target');
        if (!grid) return;

        const filteredVideos = this.currentFilter === 'todos' 
            ? this.videosData 
            : this.videosData.filter(v => v.category === this.currentFilter);

        if (filteredVideos.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-8) 0; color: var(--text-muted);">
                    <i class="fa-solid fa-video-slash" style="font-size: 2.5rem; margin-bottom: var(--space-3);"></i>
                    <p>No hay videos cargados temporalmente para esta rama de actividad.</p>
                </div>`;
            return;
        }

        grid.innerHTML = filteredVideos.map(video => `
            <div class="glassmorphism card-hover-effect" style="border-radius: var(--radius-md); overflow: hidden; display: flex; flex-direction: column;">
                <!-- Miniatura con overlay de reproducción -->
                <div style="position: relative; height: 160px; background: url('${video.thumb}') center/cover; cursor: pointer;" class="play-trigger" data-id="${video.id}">
                    <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; transition: background 0.3s;" onmouseover="this.style.background='rgba(0,0,0,0.2)'" onmouseout="this.style.background='rgba(0,0,0,0.4)'">
                        <i class="fa-solid fa-circle-play" style="color: #fff; font-size: 3rem; drop-shadow: var(--shadow-md);"></i>
                    </div>
                    <span style="position: absolute; bottom: var(--space-2); right: var(--space-2); background: rgba(0,0,0,0.8); color: #fff; padding: 2px 6px; border-radius: var(--radius-sm); font-size: 11px; font-weight: var(--weight-bold); font-variant-numeric: tabular-nums;">
                        ${video.duration}
                    </span>
                </div>
                <!-- Cuerpo descriptivo -->
                <div style="padding: var(--space-4); display: flex; flex-direction: column; flex-grow: 1;">
                    <h4 style="font-size: var(--font-sm); font-weight: var(--weight-bold); color: var(--primary-dark); margin-bottom: var(--space-2); line-height: 1.4;">${video.title}</h4>
                    <p style="color: var(--text-muted); font-size: 12px; line-height: 1.5; margin-bottom: var(--space-4); flex-grow: 1;">${video.desc}</p>
                    <button class="btn btn-secondary btn-sm play-trigger" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;" data-id="${video.id}">
                        <i class="fa-solid fa-play"></i> Reproducir Instrucción
                    </button>
                </div>
            </div>
        `).join('');
    },

    // Vinculación de eventos interactivos (Filtros y Modal)
    bindEvents(container) {
        // Manejo de clics en botones de filtrado
        container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
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

        // Intercepción del click para abrir el reproductor de video modular
        container.addEventListener('click', (e) => {
            const trigger = e.target.closest('.play-trigger');
            if (trigger) {
                const videoId = trigger.getAttribute('data-id');
                const video = this.videosData.find(v => v.id === videoId);
                if (video) this.openVideoPlayerModal(video);
            }
        });
    },

    // Generador dinámico del Modal del Reproductor Nativo HTML5
    openVideoPlayerModal(video) {
        // Eliminar modal previo si quedó huerfano
        document.getElementById('video-player-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'video-player-modal';
        modal.className = 'animate-fade-in';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(11, 15, 25, 0.95)'; // Fondo oscuro base profundo
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 'var(--z-modal)';
        modal.style.padding = 'var(--space-4)';

        modal.innerHTML = `
            <div class="glassmorphism animate-slide-down" style="width: 100%; max-width: 800px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-premium);">
                <!-- Header del Modal -->
                <div style="padding: var(--space-4); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); background: var(--bg-surface);">
                    <h4 style="color: var(--primary-dark); font-size: var(--font-base); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 85%;"><i class="fa-solid fa-video" style="color: var(--primary); margin-right: 8px;"></i> ${video.title}</h4>
                    <button id="close-video-modal" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: var(--font-xl); padding: var(--space-1);"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <!-- Contenedor del reproductor HTML5 -->
                <div style="position: relative; background: #000; width: 100%; aspect-ratio: 16/9; display: flex; align-items: center;">
                    <video id="html5-gremial-player" controls autoplay controlsList="nodownload" style="width: 100%; height: 100%;">
                        <source src="${video.url}" type="video/mp4">
                        Su navegador no soporta reproducción de video nativa.
                    </video>
                </div>
                <!-- Footer Informativo / Feedback de visualización -->
                <div style="padding: var(--space-4); background: var(--bg-surface); font-size: 12px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
                    <span><i class="fa-solid fa-shield-halved" style="color: var(--success);"></i> Contenido de Capacitación Oficial AOMA</span>
                    <span id="video-progress-status" style="font-weight: var(--weight-semibold); color: var(--primary-light);"><i class="fa-solid fa-circle-notch fa-spin"></i> Sincronizando progreso...</span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo

        // Lógica de cierre del reproductor
        const closeModal = () => {
            const player = document.getElementById('html5-gremial-player');
            if (player) player.pause();
            modal.remove();
            document.body.style.overflow = '';
        };

        modal.getElementById = (id) => document.getElementById(id);
        modal.getElementById('close-video-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Evento nativo de simulación de progreso completado
        const player = modal.getElementById('html5-gremial-player');
        if (player) {
            player.addEventListener('ended', () => {
                const statusSpan = modal.getElementById('video-progress-status');
                if (statusSpan) {
                    statusSpan.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--success);"></i> ¡Visualización Completada!`;
                }
                if (window.AppInstance) {
                    window.AppInstance.showToast('Progreso de videoteca actualizado en su legajo.', 'success');
                }
            });
            
            // Simular carga de streaming exitosa a los 2 segundos
            setTimeout(() => {
                const statusSpan = modal.getElementById('video-progress-status');
                if (statusSpan && player && !player.ended) {
                    statusSpan.innerHTML = `<i class="fa-solid fa-eye" style="color: var(--primary);"></i> Transmitiendo en Alta Definición`;
                }
            }, 2000);
        }
    }
};