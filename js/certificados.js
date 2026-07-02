/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo 05: Gestor de Certificados y Emisión de Diplomas Homologados
 */

window.ModuleCertificados = {
    certificatesData: [],

    // Inicializador del módulo (Inyectado por el Router en app.js)
    init(container) {
        this.loadCertificatesCatalog();
        this.renderInterface(container);
    },

    // Catálogo de correspondencias entre exámenes aprobados y credenciales a otorgar
    loadCertificatesCatalog() {
        this.certificatesData = [
            { id: 'exam_higiene', title: 'Certificación en Higiene y Seguridad Minera', issuer: 'AOMA Seccional San Juan', hrs: '40 hs Cátedra', code: 'CERT-HS-' },
            { id: 'exam_voladura', title: 'Diplomatura Técnica en Operaciones de Voladura', issuer: 'Comisión Directiva AOMA', hrs: '60 hs Cátedra', code: 'CERT-VO-' }
        ];
    },

    // Renderizado principal del panel de credenciales
    renderInterface(container) {
        // Recuperar los IDs de exámenes aprobados desde el LocalStorage
        const unlockedExams = JSON.parse(localStorage.getItem('aoma_certificates_unlocked')) || [];

        container.innerHTML = `
            <div style="margin-bottom: var(--space-6);">
                <h2 style="font-size: var(--font-3xl); margin-bottom: var(--space-1);">Mis Certificados Oficiales</h2>
                <p style="color: var(--text-muted); font-size: var(--font-sm);">Descargue y valide las credenciales profesionales obtenidas mediante la aprobación de las evaluaciones teóricas.</p>
            </div>

            <div id="certificates-grid-target" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5);">
                ${this.certificatesData.map(cert => {
                    const isUnlocked = unlockedExams.includes(cert.id);
                    // Generación de Hash único para simulación de blockchain/auditoría
                    const uniqueHash = isUnlocked ? (cert.code + Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 5)).toUpperCase() : 'BLOQUEADO';

                    return `
                        <div class="glassmorphism" style="padding: var(--space-5); border-radius: var(--radius-md); border-top: 4px solid ${isUnlocked ? 'var(--success)' : 'var(--text-light)'}; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
                            ${!isUnlocked ? `
                                <!-- Overlay de bloqueo para UX persuasivo -->
                                <div style="position: absolute; inset: 0; background: rgba(11, 15, 25, 0.4); backdrop-filter: blur(2px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-2); z-index: 2;">
                                    <i class="fa-solid fa-lock" style="font-size: var(--font-2xl); color: var(--text-muted);"></i>
                                    <span style="font-size: 11px; font-weight: var(--weight-bold); text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Aprobación Requerida</span>
                                </div>
                            ` : ''}

                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
                                    <i class="fa-solid fa-award" style="font-size: 2.5rem; color: ${isUnlocked ? 'var(--warning)' : 'var(--text-light)'};"></i>
                                    <span style="font-size: 10px; font-family: monospace; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; color: var(--text-muted); border: 1px solid var(--border-subtle);">
                                        ${uniqueHash}
                                    </span>
                                </div>
                                <h4 style="color: var(--primary-dark); font-size: var(--font-base); margin-bottom: var(--space-2); line-height: 1.4;">${cert.title}</h4>
                                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: var(--space-4);">
                                    <i class="fa-solid fa-building-shield" style="margin-right: 4px;"></i> Avala: ${cert.issuer}<br>
                                    <i class="fa-solid fa-clock-rotate-left" style="margin-right: 4px;"></i> Carga horaria: ${cert.hrs}
                                </p>
                            </div>

                            <button class="btn ${isUnlocked ? 'btn-primary' : 'btn-secondary'} btn-sm download-cert-btn" style="width: 100%; justify-content: center; gap: 8px;" data-id="${cert.id}" data-hash="${uniqueHash}" ${!isUnlocked ? 'disabled' : ''}>
                                <i class="fa-solid fa-file-arrow-down"></i> Descargar Credencial PDF
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        this.bindEvents(container);
    },

    // Vinculación de eventos para disparar el renderizado del diploma premium
    bindEvents(container) {
        container.querySelectorAll('.download-cert-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const certId = btn.getAttribute('data-id');
                const certHash = btn.getAttribute('data-hash');
                const certificate = this.certificatesData.find(c => c.id === certId);
                
                if (certificate) {
                    this.openCertificateModal(certificate, certHash);
                }
            });
        });
    },

    // Genera e inyecta el modal del diploma con estética corporativa e institucional
    openCertificateModal(cert, hash) {
        const session = JSON.parse(localStorage.getItem('aoma_session')) || { nombre: 'Afiliado', apellido: 'Gremial' };
        
        // Remover duplicados previos
        document.getElementById('certificate-viewer-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'certificate-viewer-modal';
        modal.className = 'animate-fade-in';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(11, 15, 25, 0.95)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 'var(--z-modal)';
        modal.style.padding = 'var(--space-4)';

        modal.innerHTML = `
            <div class="glassmorphism animate-slide-down" style="width: 100%; max-width: 850px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-premium);">
                <!-- Control de cabecera -->
                <div style="padding: var(--space-4); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); background: var(--bg-surface);">
                    <span style="font-size: var(--font-sm); color: var(--text-muted); font-weight: var(--weight-medium);"><i class="fa-solid fa-print" style="color:var(--primary); margin-right:6px;"></i> Vista Previa del Diploma Oficial</span>
                    <button id="close-cert-modal" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: var(--font-xl);"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <!-- Marco del Diploma Tradicional con Estética Corporativa -->
                <div style="padding: var(--space-8); background: #fff; color: #1a202c; text-align: center; position: relative; border: 16px solid #e2e8f0; margin: var(--space-4); border-image: linear-gradient(to bottom right, var(--primary), var(--primary-dark)) 16;">
                    
                    <!-- Fondos institucionales sutiles (Escudo simulado) -->
                    <div style="position: absolute; inset: 0; opacity: 0.03; background: radial-gradient(circle, var(--primary) 20%, transparent 20%), radial-gradient(circle, var(--primary-dark) 40%, transparent 40%); background-size: 40px 40px; pointer-events: none;"></div>

                    <h3 style="font-family: 'Times New Roman', Times, serif; font-size: var(--font-3xl); color: #1a365d; margin-bottom: var(--space-2); text-transform: uppercase; letter-spacing: 2px;">Asociación Obrera Minera Argentina</h3>
                    <p style="font-size: 13px; font-weight: var(--weight-bold); color: var(--primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-6);">Seccional San Juan</p>
                    
                    <p style="font-style: italic; font-size: var(--font-base); color: #4a5568; margin-bottom: var(--space-3);">Se otorga el presente certificado de validación de competencias a:</p>
                    <h2 style="font-size: var(--font-4xl); color: #2b6cb0; font-family: 'Times New Roman', Times, serif; font-weight: var(--weight-bold); border-bottom: 1px solid #cbd5e0; display: inline-block; padding-bottom: var(--space-2); margin-bottom: var(--space-4); text-transform: capitalize;">${session.apellido.toLowerCase()}, ${session.nombre.toLowerCase()}</h2>
                    
                    <p style="max-width: 600px; margin: 0 auto var(--space-6) auto; font-size: var(--font-sm); color: #4a5568; line-height: 1.6;">
                        Por haber cumplimentado y aprobado satisfactoriamente los módulos de formación técnico-operativos correspondientes al programa formativo de <strong>"${cert.title}"</strong>, dictado en el entorno de la plataforma de e-learning institucional, completando un total de <strong>${cert.hrs}</strong> homologados bajo normativas de seguridad laboral vigentes.
                    </p>

                    <!-- Firmas institucionales y validación criptográfica -->
                    <div style="display: flex; justify-content: space-around; align-items: flex-end; margin-top: var(--space-8); border-top: 1px dashed #e2e8f0; padding-top: var(--space-6);">
                        <div style="width: 180px; text-align: center;">
                            <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: var(--font-2xl); color: #2d3748; transform: rotate(-3deg); height: 35px; line-height: 35px;">Eduardo Castro</div>
                            <div style="border-top: 1px solid #a0aec0; margin-top: 5px; padding-top: 3px; font-size: 10px; font-weight: var(--weight-bold); color: #718096; text-transform: uppercase;">Secretaría de Capacitación</div>
                        </div>
                        <div style="text-align: center;">
                            <!-- QR de Auditoría simulado mediante FontAwesome -->
                            <i class="fa-solid fa-qrcode" style="font-size: 3.5rem; color: #2d3748; background: #f7fafc; padding: var(--space-1); border: 1px solid #e2e8f0; border-radius: var(--radius-sm);"></i>
                            <div style="font-size: 9px; font-family: monospace; color: #a0aec0; margin-top: 4px;">ID: ${hash}</div>
                        </div>
                        <div style="width: 180px; text-align: center;">
                            <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: var(--font-2xl); color: #2d3748; transform: rotate(2deg); height: 35px; line-height: 35px;">Secretaría General</div>
                            <div style="border-top: 1px solid #a0aec0; margin-top: 5px; padding-top: 3px; font-size: 10px; font-weight: var(--weight-bold); color: #718096; text-transform: uppercase;">AOMA San Juan</div>
                        </div>
                    </div>
                </div>

                <!-- Footer de acciones -->
                <div style="padding: var(--space-4); background: var(--bg-surface); border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end; gap: var(--space-3);">
                    <button id="btn-print-simulation" class="btn btn-primary btn-sm"><i class="fa-solid fa-download"></i> Guardar como PDF</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Lógica de cierre del modal
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        modal.querySelector('#close-cert-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Simulación de descarga/impresión local
        modal.querySelector('#btn-print-simulation').addEventListener('click', () => {
            if (window.AppInstance) {
                window.AppInstance.showToast('Generando archivo PDF y metadatos de firma digital...', 'success');
                setTimeout(() => {
                    window.print(); // Abre el manejador nativo del navegador para guardar/imprimir
                }, 1000);
            }
        });
    }
};