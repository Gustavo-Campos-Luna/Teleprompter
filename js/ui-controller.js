/**
 * UI Controller - Professional Teleprompter
 * Controlador de interfaz de usuario
 * Autor: Gustavo Campos Luna
 */

class UIController {
    constructor(teleprompter) {
        this.teleprompter = teleprompter;
        this.elements = {};
        this.currentTab = 'content';

        this.initializeElements();
        this.bindEvents();
        this.populateSelects();
        this.syncUI();
    }

    /**
     * Inicializa referencias a elementos DOM
     */
    initializeElements() {
        // Inputs de contenido
        this.elements.fileInput = document.getElementById('file-input');
        this.elements.textInput = document.getElementById('text-input');
        this.elements.fileInfo = document.getElementById('file-info');

        // Inputs de configuración
        this.elements.fontFamily = document.getElementById('font-family');
        this.elements.fontSize = document.getElementById('font-size');
        this.elements.fontSizeValue = document.getElementById('font-size-value');
        this.elements.speed = document.getElementById('speed');
        this.elements.speedValue = document.getElementById('speed-value');
        this.elements.customSpeed = document.getElementById('custom-speed');
        this.elements.textColor = document.getElementById('text-color');
        this.elements.bgColor = document.getElementById('bg-color');
        this.elements.readingGuide = document.getElementById('reading-guide');

        // Checkboxes
        this.elements.mirrorMode = document.getElementById('mirror-mode');
        this.elements.showTimer = document.getElementById('show-timer');
        this.elements.showStats = document.getElementById('show-stats');

        // Botones principales
        this.elements.playBtn = document.getElementById('play-btn');
        this.elements.pauseBtn = document.getElementById('pause-btn');
        this.elements.stopBtn = document.getElementById('stop-btn');
        this.elements.resetBtn = document.getElementById('reset-btn');
        this.elements.fullscreenBtn = document.getElementById('fullscreen-btn');

        // Botones de pantalla completa
        this.elements.fsPlayBtn = document.getElementById('fs-play-btn');
        this.elements.fsPauseBtn = document.getElementById('fs-pause-btn');
        this.elements.fsStopBtn = document.getElementById('fs-stop-btn');
        this.elements.fsResetBtn = document.getElementById('fs-reset-btn');
        this.elements.fsExitBtn = document.getElementById('fs-exit-btn');

        // Tabs
        this.elements.tabs = document.querySelectorAll('.tab-button');
        this.elements.tabContents = document.querySelectorAll('.tab-content');

        // Botones adicionales
        this.elements.exportBtn = document.getElementById('export-btn');
        this.elements.importBtn = document.getElementById('import-btn');
        this.elements.saveSettingsBtn = document.getElementById('save-settings-btn');
        this.elements.resetSettingsBtn = document.getElementById('reset-settings-btn');
    }

    /**
     * Vincula eventos a elementos
     */
    bindEvents() {
        // Archivo
        if (this.elements.fileInput) {
            this.elements.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        // Texto
        if (this.elements.textInput) {
            this.elements.textInput.addEventListener('input', (e) => this.handleTextInput(e));
        }

        // Configuración de fuente
        if (this.elements.fontFamily) {
            this.elements.fontFamily.addEventListener('change', (e) => {
                this.teleprompter.setFontFamily(e.target.value);
            });
        }

        if (this.elements.fontSize) {
            this.elements.fontSize.addEventListener('input', (e) => {
                const size = parseInt(e.target.value);
                this.teleprompter.setFontSize(size);
                this.elements.fontSizeValue.textContent = `${size}px`;
            });
        }

        // Velocidad
        if (this.elements.speed) {
            this.elements.speed.addEventListener('input', (e) => this.updateSpeed(e.target.value));
        }

        if (this.elements.customSpeed) {
            this.elements.customSpeed.addEventListener('input', (e) => this.updateSpeed(e.target.value));
        }

        // Colores
        if (this.elements.textColor) {
            this.elements.textColor.addEventListener('change', (e) => {
                this.teleprompter.setTextColor(e.target.value);
            });
        }

        if (this.elements.bgColor) {
            this.elements.bgColor.addEventListener('change', (e) => {
                this.teleprompter.setBgColor(e.target.value);
            });
        }

        // Guía de lectura
        if (this.elements.readingGuide) {
            this.elements.readingGuide.addEventListener('change', (e) => {
                this.teleprompter.setReadingGuide(e.target.value);
            });
        }

        // Checkboxes
        if (this.elements.mirrorMode) {
            this.elements.mirrorMode.addEventListener('change', (e) => {
                this.teleprompter.toggleMirrorMode();
            });
        }

        if (this.elements.showTimer) {
            this.elements.showTimer.addEventListener('change', (e) => {
                this.teleprompter.toggleTimer();
            });
        }

        if (this.elements.showStats) {
            this.elements.showStats.addEventListener('change', (e) => {
                this.teleprompter.toggleStats();
            });
        }

        // Botones principales
        if (this.elements.playBtn) {
            this.elements.playBtn.addEventListener('click', () => {
                this.teleprompter.play();
                this.updateButtonStates();
            });
        }

        if (this.elements.pauseBtn) {
            this.elements.pauseBtn.addEventListener('click', () => {
                this.teleprompter.pause();
                this.updateButtonStates();
            });
        }

        if (this.elements.stopBtn) {
            this.elements.stopBtn.addEventListener('click', () => {
                this.teleprompter.stop();
                this.updateButtonStates();
            });
        }

        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => {
                this.teleprompter.reset();
                this.syncUI();
                this.updateButtonStates();
            });
        }

        if (this.elements.fullscreenBtn) {
            this.elements.fullscreenBtn.addEventListener('click', () => {
                if (this.teleprompter.isFullscreen) {
                    this.teleprompter.exitFullscreen();
                } else {
                    this.teleprompter.enterFullscreen();
                }
            });
        }

        // Botones de pantalla completa
        if (this.elements.fsPlayBtn) {
            this.elements.fsPlayBtn.addEventListener('click', () => {
                this.teleprompter.play();
                this.updateButtonStates();
            });
        }

        if (this.elements.fsPauseBtn) {
            this.elements.fsPauseBtn.addEventListener('click', () => {
                this.teleprompter.pause();
                this.updateButtonStates();
            });
        }

        if (this.elements.fsStopBtn) {
            this.elements.fsStopBtn.addEventListener('click', () => {
                this.teleprompter.stop();
                this.updateButtonStates();
            });
        }

        if (this.elements.fsResetBtn) {
            this.elements.fsResetBtn.addEventListener('click', () => {
                this.teleprompter.reset();
                this.syncUI();
                this.updateButtonStates();
            });
        }

        if (this.elements.fsExitBtn) {
            this.elements.fsExitBtn.addEventListener('click', () => {
                this.teleprompter.exitFullscreen();
            });
        }

        // Tabs
        this.elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Eventos de pantalla completa
        document.addEventListener('fullscreenchange', () => {
            this.teleprompter.handleFullscreenChange();
            this.updateFullscreenButton();
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.teleprompter.handleFullscreenChange();
            this.updateFullscreenButton();
        });
        document.addEventListener('mozfullscreenchange', () => {
            this.teleprompter.handleFullscreenChange();
            this.updateFullscreenButton();
        });
        document.addEventListener('MSFullscreenChange', () => {
            this.teleprompter.handleFullscreenChange();
            this.updateFullscreenButton();
        });

        // Exportar/Importar
        if (this.elements.exportBtn) {
            this.elements.exportBtn.addEventListener('click', () => this.exportSettings());
        }

        if (this.elements.importBtn) {
            this.elements.importBtn.addEventListener('click', () => this.importSettings());
        }

        // Configuración
        if (this.elements.saveSettingsBtn) {
            this.elements.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }

        if (this.elements.resetSettingsBtn) {
            this.elements.resetSettingsBtn.addEventListener('click', () => this.resetSettings());
        }
    }

    /**
     * Puebla los selects con opciones
     */
    populateSelects() {
        // Fuentes
        if (this.elements.fontFamily) {
            CONFIG.FONTS.forEach(font => {
                const option = document.createElement('option');
                option.value = font.value;
                option.textContent = font.label;
                this.elements.fontFamily.appendChild(option);
            });
        }

        // Colores de texto
        if (this.elements.textColor) {
            CONFIG.TEXT_COLORS.forEach(color => {
                const option = document.createElement('option');
                option.value = color.value;
                option.textContent = color.label;
                this.elements.textColor.appendChild(option);
            });
        }

        // Colores de fondo
        if (this.elements.bgColor) {
            CONFIG.BG_COLORS.forEach(color => {
                const option = document.createElement('option');
                option.value = color.value;
                option.textContent = color.label;
                this.elements.bgColor.appendChild(option);
            });
        }

        // Guías de lectura
        if (this.elements.readingGuide) {
            CONFIG.READING_GUIDES.forEach(guide => {
                const option = document.createElement('option');
                option.value = guide.value;
                option.textContent = guide.label;
                this.elements.readingGuide.appendChild(option);
            });
        }
    }

    /**
     * Sincroniza UI con estado del teleprompter
     */
    syncUI() {
        if (this.elements.fontFamily) this.elements.fontFamily.value = this.teleprompter.fontFamily;
        if (this.elements.fontSize) this.elements.fontSize.value = this.teleprompter.fontSize;
        if (this.elements.fontSizeValue) this.elements.fontSizeValue.textContent = `${this.teleprompter.fontSize}px`;
        if (this.elements.speed) this.elements.speed.value = this.teleprompter.speed;
        if (this.elements.speedValue) this.elements.speedValue.textContent = this.teleprompter.speed;
        if (this.elements.customSpeed) this.elements.customSpeed.value = this.teleprompter.speed;
        if (this.elements.textColor) this.elements.textColor.value = this.teleprompter.textColor;
        if (this.elements.bgColor) this.elements.bgColor.value = this.teleprompter.bgColor;
        if (this.elements.mirrorMode) this.elements.mirrorMode.checked = this.teleprompter.mirrorMode;
        if (this.elements.showTimer) this.elements.showTimer.checked = this.teleprompter.showTimer;
        if (this.elements.showStats) this.elements.showStats.checked = this.teleprompter.showStats;
        if (this.elements.readingGuide) this.elements.readingGuide.value = this.teleprompter.readingGuide;
        if (this.elements.textInput) this.elements.textInput.value = this.teleprompter.text;

        this.updateButtonStates();
    }

    /**
     * Maneja carga de archivo
     */
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (this.elements.fileInfo) {
            this.elements.fileInfo.style.display = 'flex';
            this.elements.fileInfo.className = 'file-info file-info--loading';
            this.elements.fileInfo.innerHTML = '<span class="file-info__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></span> ' + CONFIG.MESSAGES.LOADING;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });

            this.teleprompter.setText(result.value);
            if (this.elements.textInput) {
                this.elements.textInput.value = result.value;
            }

            if (this.elements.fileInfo) {
                const sizeKB = Math.round(file.size / 1024);
                this.elements.fileInfo.className = 'file-info';
                this.elements.fileInfo.innerHTML = `<span class="file-info__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span> ${CONFIG.MESSAGES.FILE_LOADED}: ${file.name} (${sizeKB} KB)`;
            }

            // Guardar en historial
            storageManager.addRecentText(result.value, {
                filename: file.name,
                size: file.size
            });
        } catch (error) {
            console.error('Error al cargar archivo:', error);
            if (this.elements.fileInfo) {
                this.elements.fileInfo.className = 'file-info file-info--error';
                this.elements.fileInfo.innerHTML = `<span class="file-info__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> ${CONFIG.MESSAGES.FILE_ERROR}`;
            }
        }
    }

    /**
     * Maneja input de texto
     */
    handleTextInput(event) {
        this.teleprompter.setText(event.target.value);
    }

    /**
     * Actualiza velocidad
     */
    updateSpeed(value) {
        const speed = parseFloat(value);
        this.teleprompter.setSpeed(speed);

        if (this.elements.speed) this.elements.speed.value = speed;
        if (this.elements.speedValue) this.elements.speedValue.textContent = speed;
        if (this.elements.customSpeed) this.elements.customSpeed.value = speed;
    }

    /**
     * Actualiza estados de botones
     */
    updateButtonStates() {
        const isPlaying = this.teleprompter.isPlaying;

        // Botones principales
        if (this.elements.playBtn) this.elements.playBtn.disabled = isPlaying;
        if (this.elements.pauseBtn) this.elements.pauseBtn.disabled = !isPlaying;
        if (this.elements.stopBtn) this.elements.stopBtn.disabled = !isPlaying && !this.teleprompter.isPaused;

        // Botones fullscreen
        if (this.elements.fsPlayBtn) this.elements.fsPlayBtn.disabled = isPlaying;
        if (this.elements.fsPauseBtn) this.elements.fsPauseBtn.disabled = !isPlaying;
        if (this.elements.fsStopBtn) this.elements.fsStopBtn.disabled = !isPlaying && !this.teleprompter.isPaused;
    }

    /**
     * Actualiza botón de pantalla completa
     */
    updateFullscreenButton() {
        if (this.elements.fullscreenBtn) {
            const icon = this.teleprompter.isFullscreen
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
            const text = this.teleprompter.isFullscreen ? 'Salir Pantalla Completa' : 'Pantalla Completa';
            this.elements.fullscreenBtn.innerHTML = `${icon} ${text}`;
        }
    }

    /**
     * Cambia de tab
     */
    switchTab(tabName) {
        this.currentTab = tabName;

        // Actualizar tabs
        this.elements.tabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Actualizar contenidos
        this.elements.tabContents.forEach(content => {
            if (content.id === `${tabName}-tab`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    /**
     * Exporta configuración
     */
    exportSettings() {
        const data = storageManager.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `teleprompter-settings-${Date.now()}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }

    /**
     * Importa configuración
     */
    importSettings() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const text = await file.text();
                const success = storageManager.importData(text);

                if (success) {
                    // Recargar configuración
                    this.teleprompter.loadSettings();
                    this.syncUI();
                    alert('Configuración importada correctamente');
                } else {
                    alert('Error al importar configuración');
                }
            } catch (error) {
                console.error('Error al importar:', error);
                alert('Error al importar configuración');
            }
        });

        input.click();
    }

    /**
     * Guarda configuración
     */
    saveSettings() {
        this.teleprompter.saveSettings();
        alert(CONFIG.MESSAGES.SETTINGS_SAVED);
    }

    /**
     * Reinicia configuración
     */
    resetSettings() {
        if (confirm('¿Estás seguro de que quieres restaurar la configuración por defecto?')) {
            storageManager.clear();
            location.reload();
        }
    }
}
