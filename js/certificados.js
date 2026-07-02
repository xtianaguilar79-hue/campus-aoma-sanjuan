/**
 * CAMPUS VIRTUAL PREMIUM - AOMA SECCIONAL SAN JUAN
 * Módulo: certificados.js (UI Premium Edition)
 */

window.ModuleCertificados = {
    certificatesData: [],

    init(container) {
        this.loadCertificatesCatalog();
        this.renderInterface(container);
    },

    loadCertificatesCatalog() {
        this.certificatesData = [
            { id: 'exam_higiene', title: 'Certificación en Higiene y Seguridad Minera', issuer: 'AOMA Seccional San Juan', hrs: '40 hs Cátedra', code: 'CERT-HS-' },
            { id: 'exam_voladura', title: 'Diplomatura Técnica en Operaciones de Voladura', issuer: 'Comisión Directiva AOMA', hrs: '60 hs Cátedra', code: 'CERT-VO-' }
        ];
    },

    renderInterface(container) {
        const unlockedExams = JSON.parse(localStorage.getItem('aoma_certificates_unlocked')) || [];

        container.innerHTML = `
            <div class="container-premium animate-fade-in">
                <div style="margin-bottom: var(--space-6);">
                    <h2 class="page-title">Credenciales y Certificaciones</h2>
                    <p class="page-subtitle">Historial de diplomas profesionales avalados por la Comisión Directiva de la Seccional.</p>
                </div>

                <div id="certificates-grid-target" class="grid-dashboard">
                    ${this.certificatesData.map(cert => {
                        const isUnlocked = unlockedExams.includes(cert.id);
                        const uniqueHash = isUnlocked ? (cert.code + Math.random().toString(36).substring(2, 7)).toUpperCase() : 'BLOQUEADO';

                        return `
                            <div class="card-premium" style="display:flex; flex-direction:column; justify-content:space-between; border-top: 4px solid ${isUnlocked ? 'var(--success)' : 'var(--border-subtle)'};">
                                ${!isUnlocked ? `
                                    <div style="position: absolute; inset: 0; background: rgba(11,15,25,0.6); backdrop-filter: blur(2px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; z-index:5;">
                                        <i class="fa-solid fa-lock" style="color:var(--text-muted); font-size:1.5rem;"></i>
                                        <span class="badge badge-warning">Examen pendiente</span>
                                    </div>
                                ` : ''}
                                
                                <div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: var(--space-3);">
                                        <i class="fa-solid fa-award" style="font-size: 2rem; color: var(--warning);"></i>
                                        <span style="font-family:monospace; font-size:11px; color:var(--text-muted);">${uniqueHash}</span>
                                    </div>
                                    <h4 style="font-size: var(--font-base); font-weight:var(--weight-semibold); margin-bottom: var(--space-2); color:var(--text-main);">${cert.title}</h4>
                                    <p style="font-size:12px; color:var(--text-muted); line-height:1.6; margin-bottom: var(--space-4);">
                                        Emitido por: ${cert.issuer}<br>
                                        Carga horaria: ${cert.hrs}
                                    </p>
                                </div>

                                <button class="btn ${isUnlocked ? 'btn-primary' : 'btn-secondary'} btn-sm download-cert-btn" data-id="${cert.id}" data-hash="${uniqueHash}" ${!isUnlocked ? 'disabled' : ''}>
                                    <i class="fa-solid fa-file-pdf"></i> Visualizar Diploma
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        this.bindEvents(container);
    },

    bindEvents(container) {
        container.querySelectorAll('.download-cert-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cert = this.certificatesData.find(c => c.id === btn.getAttribute('data-id'));
                if (cert) this.openCertificateModal(cert, btn.getAttribute('data-hash'));
            });
        });
    },

    openCertificateModal(cert, hash) {
        const session = JSON.parse(localStorage.getItem('aoma_session')) || { nombre: 'Operario', apellido: 'Gremial' };
        document.getElementById('certificate-viewer-modal')?.remove();

        const modal = document.createElement('div');
        modal.id = 'certificate-viewer-modal';
        modal.className = 'animate-fade-in';
        modal.style = 'fixed: inset 0; background: rgba(7,10,19,0.95); display: flex; align-items: center; justify-content: center; z-index: var(--z-modal); padding: var(--space-4); position: fixed;';

        modal.innerHTML = `
            <div class="card-premium animate-slide-up" style="width: 100%; max-width: 750px; padding: 0; background: var(--bg-surface);">
                <div style="padding: var(--space-4); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle);">
                    <span style="font-size:var(--font-sm); color:var(--text-muted);"><i class="fa-solid fa-print"></i> Credencial de Competencia Oficial</span>
                    <button id="close-cert-modal" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: var(--font-lg);"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <div style="padding: var(--space-8); background: #ffffff; color: #111827; margin: var(--space-4); border: 12px solid #f3f4f6; text-align: center; font-family: 'Times New Roman', serif;">
                    <h3 style="font-size: 24px; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Asociación Obrera Minera Argentina</h3>
                    <p style="font-size: 12px; font-weight: bold; color: #3b82f6; text-transform: uppercase; margin-bottom: var(--space-5);">Seccional San Juan</p>
                    
                    <p style="font-style: italic; font-size: 14px; color: #4b5563; margin-bottom: 4px;">Certifica que el afiliado digital:</p>
                    <h2 style="font-size: 28px; color: #111827; font-weight: bold; border-bottom: 1px solid #e5e7eb; display: inline-block; padding-bottom: 4px; margin-bottom: var(--space-4); text-transform: capitalize;">${session.apellido.toLowerCase()}, ${session.nombre.toLowerCase()}</h2>
                    
                    <p style="max-width: 550px; margin: 0 auto var(--space-6) auto; font-size: 13px; color: #374151; font-family:sans-serif; line-height: 1.6;">
                        Ha superado con éxito las exigencias académicas fijadas por el departamento de Higiene, Seguridad y Capacitación para la validación de <strong>"${cert.title}"</strong>. Registrando un volumen formal de <strong>${cert.hrs}</strong> en su legajo corporativo.
                    </p>

                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: var(--space-6); font-family:sans-serif;">
                        <div style="width: 150px; text-align: center; font-size: 10px; color:#6b7280;">
                            <div style="border-top: 1px solid #d1d5db; padding-top: 4px; font-weight: bold;">Secretaría Técnica</div>
                        </div>
                        <div style="text-align: center;">
                            <i class="fa-solid fa-qrcode" style="font-size: 2.5rem; color: #111827;"></i>
                            <div style="font-size: 8px; font-family: monospace; color: #9ca3af; margin-top: 2px;">ID: ${hash}</div>
                        </div>
                        <div style="width: 150px; text-align: center; font-size: 10px; color:#6b7280;">
                            <div style="border-top: 1px solid #d1d5db; padding-top: 4px; font-weight: bold;">Comisión Directiva</div>
                        </div>
                    </div>
                </div>

                <div style="padding: var(--space-4); border-top: 1px solid var(--border-subtle); display:flex; justify-content:flex-end;">
                    <button id="print-cert-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-download"></i> Descargar Documento</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const closeModal = () => { modal.remove(); document.body.style.overflow = ''; };
        modal.querySelector('#close-cert-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        modal.querySelector('#print-cert-btn').addEventListener('click', () => {
            if (window.AppInstance) {
                window.AppInstance.showToast('Compilando PDF oficial...', 'success');
                setTimeout(() => { window.print(); }, 800);
            }
        });
    }
};