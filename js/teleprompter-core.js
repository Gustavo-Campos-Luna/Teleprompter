/**
 * Teleprompter Core - Professional Teleprompter
 * Lógica principal del teleprompter
 * Autor: Gustavo Campos Luna
 */

class TeleprompterCore {
    constructor() {
        // Estado
        this.state = CONFIG.STATES.STOPPED;
        this.text = '';
        this.scrollPosition = 0;
        this.maxScroll = 0;
        this.animationId = null;

        // Configuración
        this.speed = CONFIG.DEFAULTS.SPEED;
        this.fontSize = CONFIG.DEFAULTS.FONT_SIZE;
        this.fontFamily = CONFIG.DEFAULTS.FONT_FAMILY;
        this.textColor = CONFIG.DEFAULTS.TEXT_COLOR;
        this.bgColor = CONFIG.DEFAULTS.BG_COLOR;
        this.mirrorMode = CONFIG.DEFAULTS.MIRROR_MODE;
        this.lineHeight = CONFIG.DEFAULTS.LINE_HEIGHT;

        // Flags
        this.isFullscreen = false;
        this.showTimer = CONFIG.DEFAULTS.SHOW_TIMER;
        this.showStats = CONFIG.DEFAULTS.SHOW_STATS;
        this.showProgress = CONFIG.DEFAULTS.SHOW_PROGRESS;
        this.readingGuide = CONFIG.DEFAULTS.READING_GUIDE;

        // Temporizadores
        this.startTime = 0;
        this.pauseTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.hideControlsTimeout = null;

        // Marcadores y notas
        this.markers = [];
        this.notes = '';

        // Elementos DOM
        this.elements = {};

        // Analizador de texto
        this.textAnalyzer = new TextAnalyzer();

        // Inicializar
        this.initializeElements();
        this.loadSettings();
        this.updateDisplay();
    }

    /**
     * Inicializa referencias a elementos DOM
     */
    initializeElements() {
        this.elements = {
            teleprompter: document.getElementById('teleprompter'),
            teleprompterContent: document.getElementById('teleprompter-content'),
            scrollText: document.getElementById('scroll-text'),
            statusIndicator: document.getElementById('status-indicator'),
            statusText: document.getElementById('status-text'),
            statusDot: document.getElementById('status-dot'),
            progressBar: document.getElementById('progress-bar'),
            timerDisplay: document.getElementById('timer-display'),
            timerTime: document.getElementById('timer-time'),
            statsOverlay: document.getElementById('stats-overlay'),
            readingGuide: document.getElementById('reading-guide'),
            fullscreenControls: document.getElementById('fullscreen-controls')
        };
    }

    /**
     * Carga configuración guardada
     */
    loadSettings() {
        const settings = storageManager.loadSettings();

        if (settings.speed) this.speed = settings.speed;
        if (settings.fontSize) this.fontSize = settings.fontSize;
        if (settings.fontFamily) this.fontFamily = settings.fontFamily;
        if (settings.textColor) this.textColor = settings.textColor;
        if (settings.bgColor) this.bgColor = settings.bgColor;
        if (settings.mirrorMode !== undefined) this.mirrorMode = settings.mirrorMode;
        if (settings.showTimer !== undefined) this.showTimer = settings.showTimer;
        if (settings.showStats !== undefined) this.showStats = settings.showStats;
        if (settings.readingGuide) this.readingGuide = settings.readingGuide;

        // Cargar marcadores y notas
        this.markers = storageManager.loadMarkers();
        this.notes = storageManager.loadNotes();
    }

    /**
     * Guarda configuración
     */
    saveSettings() {
        const settings = {
            speed: this.speed,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            textColor: this.textColor,
            bgColor: this.bgColor,
            mirrorMode: this.mirrorMode,
            showTimer: this.showTimer,
            showStats: this.showStats,
            readingGuide: this.readingGuide
        };

        storageManager.saveSettings(settings);
    }

    /**
     * Actualiza el texto del teleprompter
     */
    setText(text) {
        this.text = text;
        this.textAnalyzer.setText(text);

        // Renderizar texto
        const lines = text.split('\n');
        this.elements.scrollText.innerHTML = lines.map(line =>
            line.trim() ? `<p>${this.escapeHtml(line)}</p>` : '<br>'
        ).join('');

        // Aplicar marcadores si existen
        this.applyMarkers();

        // Recalcular scroll máximo
        this.calculateMaxScroll();

        // Resetear posición
        this.scrollPosition = 0;
        this.updateScrollPosition();

        // Actualizar estadísticas
        this.updateStats();

        return this.textAnalyzer.getStats();
    }

    /**
     * Escapa HTML para prevenir XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Aplica marcadores visuales al texto
     */
    applyMarkers() {
        if (this.markers.length === 0) return;

        const paragraphs = this.elements.scrollText.querySelectorAll('p');
        this.markers.forEach(marker => {
            if (marker.lineIndex < paragraphs.length) {
                paragraphs[marker.lineIndex].classList.add('text-marker');
            }
        });
    }

    /**
     * Calcula el scroll máximo
     */
    calculateMaxScroll() {
        setTimeout(() => {
            const contentHeight = this.elements.scrollText.scrollHeight;
            const containerHeight = this.elements.teleprompterContent.clientHeight;
            this.maxScroll = Math.max(0, contentHeight - containerHeight + 100);
        }, 100);
    }

    /**
     * Reproduce el teleprompter
     */
    play() {
        if (!this.text.trim()) {
            this.showNotification(CONFIG.MESSAGES.NO_TEXT, 'warning');
            return;
        }

        this.state = CONFIG.STATES.PLAYING;
        this.updateStatus();

        // Iniciar temporizador
        if (this.pauseTime > 0) {
            this.elapsedTime += Date.now() - this.pauseTime;
        } else {
            this.startTime = Date.now();
            this.elapsedTime = 0;
        }
        this.startTimer();

        // Iniciar animación
        this.animate();
    }

    /**
     * Pausa el teleprompter
     */
    pause() {
        this.state = CONFIG.STATES.PAUSED;
        this.updateStatus();
        this.pauseTime = Date.now();

        // Detener animación
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Pausar temporizador
        this.stopTimer();
    }

    /**
     * Detiene el teleprompter
     */
    stop() {
        this.state = CONFIG.STATES.STOPPED;
        this.updateStatus();
        this.scrollPosition = 0;
        this.pauseTime = 0;
        this.elapsedTime = 0;

        // Detener animación
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Detener temporizador
        this.stopTimer();
        this.updateTimerDisplay();

        // Actualizar posición
        this.updateScrollPosition();
    }

    /**
     * Reinicia el teleprompter
     */
    reset() {
        this.stop();
        this.setText(CONFIG.DEFAULT_TEXT);
    }

    /**
     * Ciclo de animación
     */
    animate() {
        if (this.state !== CONFIG.STATES.PLAYING) return;

        // Incrementar posición
        this.scrollPosition += this.speed * 0.5;

        // Verificar si llegamos al final
        if (this.scrollPosition >= this.maxScroll) {
            this.stop();
            this.showNotification('Texto completado', 'success');
            return;
        }

        // Actualizar posición
        this.updateScrollPosition();

        // Continuar animación
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    /**
     * Actualiza la posición del scroll
     */
    updateScrollPosition() {
        this.elements.scrollText.style.transform = `translateY(-${this.scrollPosition}px)`;

        // Actualizar barra de progreso
        if (this.showProgress) {
            const progress = this.maxScroll > 0 ? (this.scrollPosition / this.maxScroll) * 100 : 0;
            this.elements.progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    }

    /**
     * Establece la velocidad
     */
    setSpeed(speed) {
        this.speed = Math.max(CONFIG.DEFAULTS.SPEED_MIN, Math.min(CONFIG.DEFAULTS.SPEED_MAX, speed));
        this.saveSettings();
        return this.speed;
    }

    /**
     * Establece el tamaño de fuente
     */
    setFontSize(size) {
        this.fontSize = Math.max(CONFIG.DEFAULTS.FONT_SIZE_MIN, Math.min(CONFIG.DEFAULTS.FONT_SIZE_MAX, size));
        this.elements.scrollText.style.fontSize = `${this.fontSize}px`;
        this.calculateMaxScroll();
        this.saveSettings();
        return this.fontSize;
    }

    /**
     * Establece la familia de fuente
     */
    setFontFamily(family) {
        this.fontFamily = family;
        this.elements.scrollText.style.fontFamily = family;
        this.calculateMaxScroll();
        this.saveSettings();
        return this.fontFamily;
    }

    /**
     * Establece el color del texto
     */
    setTextColor(color) {
        this.textColor = color;
        this.elements.teleprompter.setAttribute('data-text-color', color);
        this.saveSettings();
        return this.textColor;
    }

    /**
     * Establece el color de fondo
     */
    setBgColor(color) {
        this.bgColor = color;
        this.elements.teleprompter.setAttribute('data-bg-color', color);
        this.saveSettings();
        return this.bgColor;
    }

    /**
     * Toggle modo espejo
     */
    toggleMirrorMode() {
        this.mirrorMode = !this.mirrorMode;
        if (this.mirrorMode) {
            this.elements.teleprompterContent.classList.add('mirror-mode');
        } else {
            this.elements.teleprompterContent.classList.remove('mirror-mode');
        }
        this.saveSettings();
        return this.mirrorMode;
    }

    /**
     * Toggle temporizador
     */
    toggleTimer() {
        this.showTimer = !this.showTimer;
        if (this.elements.timerDisplay) {
            this.elements.timerDisplay.style.display = this.showTimer ? 'flex' : 'none';
        }
        this.saveSettings();
        return this.showTimer;
    }

    /**
     * Toggle estadísticas
     */
    toggleStats() {
        this.showStats = !this.showStats;
        if (this.elements.statsOverlay) {
            this.elements.statsOverlay.style.display = this.showStats ? 'flex' : 'none';
        }
        this.saveSettings();
        return this.showStats;
    }

    /**
     * Establece guía de lectura
     */
    setReadingGuide(position) {
        this.readingGuide = position;

        if (position === 'none') {
            if (this.elements.readingGuide) {
                this.elements.readingGuide.style.display = 'none';
            }
        } else {
            if (this.elements.readingGuide) {
                this.elements.readingGuide.style.display = 'block';
                this.elements.readingGuide.className = `reading-guide ${position}`;
            }
        }

        this.saveSettings();
        return this.readingGuide;
    }

    /**
     * Actualiza el estado visual
     */
    updateStatus() {
        const statusText = CONFIG.STATE_LABELS[this.state];
        if (this.elements.statusText) {
            this.elements.statusText.textContent = statusText;
        }

        if (this.elements.statusIndicator) {
            this.elements.statusIndicator.className = `status-indicator ${this.state}`;
        }
    }

    /**
     * Actualiza la visualización completa
     */
    updateDisplay() {
        this.setFontSize(this.fontSize);
        this.setFontFamily(this.fontFamily);
        this.setTextColor(this.textColor);
        this.setBgColor(this.bgColor);
        if (this.mirrorMode) this.toggleMirrorMode();
        if (!this.showTimer) this.toggleTimer();
        if (!this.showStats) this.toggleStats();
        this.setReadingGuide(this.readingGuide);
        this.updateStatus();
    }

    /**
     * Inicia el temporizador
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.updateTimerDisplay();
        }, 100);
    }

    /**
     * Detiene el temporizador
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Actualiza la visualización del temporizador
     */
    updateTimerDisplay() {
        const elapsed = this.state === CONFIG.STATES.PLAYING
            ? (Date.now() - this.startTime - this.elapsedTime) / 1000
            : this.elapsedTime / 1000;

        if (this.elements.timerTime) {
            this.elements.timerTime.textContent = this.formatTime(Math.floor(elapsed));
        }
    }

    /**
     * Formatea tiempo en mm:ss
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Actualiza estadísticas visuales
     */
    updateStats() {
        if (!this.elements.statsOverlay) return;

        const stats = this.textAnalyzer.getStats();

        const statsHTML = `
            <div class="stats-overlay__item">
                <div class="stats-overlay__value">${stats.words}</div>
                <div class="stats-overlay__label">Palabras</div>
            </div>
            <div class="stats-overlay__item">
                <div class="stats-overlay__value">${TextAnalyzer.formatTime(stats.speakingTime)}</div>
                <div class="stats-overlay__label">Tiempo estimado</div>
            </div>
            <div class="stats-overlay__item">
                <div class="stats-overlay__value">${stats.characters}</div>
                <div class="stats-overlay__label">Caracteres</div>
            </div>
        `;

        this.elements.statsOverlay.innerHTML = statsHTML;
    }

    /**
     * Entra en modo pantalla completa
     */
    enterFullscreen() {
        const element = this.elements.teleprompter;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    /**
     * Sale del modo pantalla completa
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * Maneja cambios en pantalla completa
     */
    handleFullscreenChange() {
        this.isFullscreen = !!(document.fullscreenElement ||
                              document.webkitFullscreenElement ||
                              document.mozFullScreenElement ||
                              document.msFullscreenElement);

        if (this.isFullscreen) {
            this.elements.teleprompter.classList.add('fullscreen');
            if (this.elements.fullscreenControls) {
                this.elements.fullscreenControls.classList.add('visible');
            }
        } else {
            this.elements.teleprompter.classList.remove('fullscreen');
            if (this.elements.fullscreenControls) {
                this.elements.fullscreenControls.classList.remove('visible');
            }
        }
    }

    /**
     * Agrega un marcador en la posición actual
     */
    addMarker() {
        const currentLineIndex = Math.floor(this.scrollPosition / 60); // Aproximado
        const marker = {
            lineIndex: currentLineIndex,
            timestamp: Date.now(),
            position: this.scrollPosition
        };

        this.markers.push(marker);
        storageManager.saveMarkers(this.markers);
        this.applyMarkers();

        this.showNotification(CONFIG.MESSAGES.MARKER_ADDED, 'success');
        return marker;
    }

    /**
     * Muestra notificación temporal
     */
    showNotification(message, type = 'info') {
        // TODO: Implementar sistema de notificaciones toast
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    /**
     * Obtiene el estado de reproducción
     */
    get isPlaying() {
        return this.state === CONFIG.STATES.PLAYING;
    }

    /**
     * Obtiene el estado de pausa
     */
    get isPaused() {
        return this.state === CONFIG.STATES.PAUSED;
    }

    /**
     * Obtiene el estado detenido
     */
    get isStopped() {
        return this.state === CONFIG.STATES.STOPPED;
    }
}
