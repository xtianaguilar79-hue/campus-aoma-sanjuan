// Generación de Certificados
const certificados = {
    canvas: null,
    ctx: null,
    
    init() {
        this.canvas = document.getElementById('certificateCanvas');
        this.ctx = this.canvas?.getContext('2d');
    },
    
    generate(courseId, courseName, score) {
        const course = app.getCourses().find(c => c.id === courseId);
        if (!course) return;
        
        const certificate = {
            id: Utils.generateId(),
            userId: app.currentUser.id,
            userName: app.currentUser.name,
            courseId: courseId,
            courseName: courseName,
            score: score,
            date: new Date().toISOString(),
            certificateNumber: `AOMA-${Date.now()}`
        };
        
        // Guardar certificado
        let certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        certificates.push(certificate);
        localStorage.setItem(CONFIG.storageKeys.certificates, JSON.stringify(certificates));
        
        // Generar imagen del certificado
        this.renderCertificate(certificate);
        
        app.showToast('¡Certificado generado exitosamente!', 'success');
    },
    
    renderCertificate(cert) {
        if (!this.canvas || !this.ctx) return;
        
        const canvas = this.canvas;
        const ctx = this.ctx;
        
        canvas.width = 800;
        canvas.height = 600;
        
        // Fondo
        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#0b3d91');
        gradient.addColorStop(1, '#1e5fd1');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);
        
        // Borde decorativo
        ctx.strokeStyle = '#f5b301';
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, 760, 560);
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, 740, 540);
        
        // Logo/Icono
        ctx.fillStyle = '#f5b301';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⛏️', 400, 100);
        
        // Título
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.fillText('CERTIFICADO', 400, 170);
        
        ctx.font = '24px Arial';
        ctx.fillText('DE FINALIZACIÓN', 400, 205);
        
        // Línea decorativa
        ctx.strokeStyle = '#f5b301';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, 230);
        ctx.lineTo(600, 230);
        ctx.stroke();
        
        // Texto "Se otorga el presente certificado a:"
        ctx.fillStyle = '#ffffff';
        ctx.font = 'italic 20px Arial';
        ctx.fillText('Se otorga el presente certificado a:', 400, 280);
        
        // Nombre del usuario
        ctx.font = 'bold 36px Arial';
        ctx.fillStyle = '#f5b301';
        ctx.fillText(cert.userName, 400, 330);
        
        // Por haber completado
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.fillText('Por haber completado exitosamente la capacitación:', 400, 380);
        
        // Nombre del curso
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(cert.courseName, 400, 425);
        
        // Puntaje
        ctx.font = '20px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Puntaje obtenido: ${cert.score}%`, 400, 465);
        
        // Fecha y número
        ctx.font = '16px Arial';
        ctx.fillStyle = '#cccccc';
        ctx.fillText(`Fecha: ${Utils.formatDate(cert.date)}`, 200, 520);
        ctx.fillText(`N° Certificado: ${cert.certificateNumber}`, 600, 520);
        
        // Firma
        ctx.font = 'italic 18px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('AOMA Seccional San Juan', 400, 560);
    },
    
    downloadPDF() {
        if (!this.canvas) return;
        
        const link = document.createElement('a');
        link.download = `Certificado-AOMA-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
        
        app.showToast('Certificado descargado', 'success');
    },
    
    closeModal() {
        document.getElementById('certificateModal').classList.remove('active');
        document.getElementById('modalOverlay').classList.remove('active');
    },
    
    showLast() {
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const userCerts = certificates.filter(c => c.userId === app.currentUser.id);
        
        if (userCerts.length > 0) {
            const lastCert = userCerts[userCerts.length - 1];
            this.renderCertificate(lastCert);
            document.getElementById('certificateModal').classList.add('active');
            document.getElementById('modalOverlay').classList.add('active');
        }
    },
    
    async render(container) {
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const userCerts = certificates.filter(c => c.userId === app.currentUser.id);
        
        container.innerHTML = `
            <div class="page-header animate-fade-in">
                <h1>Mis Certificados 🎓</h1>
                <p>Certificados obtenidos por capacitaciones completadas</p>
            </div>
            
            ${userCerts.length === 0 ? `
                <div class="empty-state scroll-reveal">
                    <i class="fas fa-certificate"></i>
                    <h3>Aún no tenés certificados</h3>
                    <p>Completá evaluaciones para obtener tus certificados</p>
                    <button class="btn btn-primary" onclick="app.navigateTo('evaluaciones')">
                        Ir a Evaluaciones
                    </button>
                </div>
            ` : `
                <div class="certificates-grid cards-grid">
                    ${userCerts.map(cert => this.renderCertificateCard(cert)).join('')}
                </div>
            `}
        `;
    },
    
    renderCertificateCard(cert) {
        return `
            <div class="certificate-card scroll-reveal">
                <div class="cert-header">
                    <i class="fas fa-certificate"></i>
                    <span class="cert-number">${cert.certificateNumber}</span>
                </div>
                <h3>${cert.courseName}</h3>
                <p class="cert-date">${Utils.formatDate(cert.date)}</p>
                <div class="cert-score">
                    <span class="score-label">Puntaje:</span>
                    <span class="score-value">${cert.score}%</span>
                </div>
                <button class="btn btn-secondary" onclick="certificados.view('${cert.id}')">
                    <i class="fas fa-eye"></i> Ver Certificado
                </button>
            </div>
        `;
    },
    
    view(certificateId) {
        const certificates = JSON.parse(localStorage.getItem(CONFIG.storageKeys.certificates) || '[]');
        const cert = certificates.find(c => c.id === certificateId);
        
        if (cert) {
            this.renderCertificate(cert);
            document.getElementById('certificateModal').classList.add('active');
            document.getElementById('modalOverlay').classList.add('active');
        }
    }
};