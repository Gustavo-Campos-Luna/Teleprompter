/**
 * Keyboard Handler - Professional Teleprompter
 * Manejo profesional de atajos de teclado
 * Autor: Gustavo Campos Luna
 */

class KeyboardHandler {
    constructor(teleprompter) {
        this.teleprompter = teleprompter;
        this.shortcuts = CONFIG.KEYBOARD_SHORTCUTS;
        this.enabled = true;
        this.helpVisible = false;

        this.init();
    }

    /**
     * Inicializa el manejador de teclado
     */
    init() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.createHelpOverlay();
    }

    /**
     * Maneja eventos de teclado
     */
    handleKeydown(event) {
        // No procesar si está escribiendo en un campo de texto
        if (this.isTyping(event.target)) {
            return;
        }

        // No procesar si el handler está deshabilitado
        if (!this.enabled) {
            return;
        }

        const key = event.code;
        const ctrl = event.ctrlKey || event.metaKey;
        const shift = event.shiftKey;
        const alt = event.altKey;

        // Manejar atajos según la tecla presionada
        switch (key) {
            case this.shortcuts.PLAY_PAUSE:
                event.preventDefault();
                this.togglePlayPause();
                break;

            case this.shortcuts.STOP:
                event.preventDefault();
                this.stop();
                break;

            case this.shortcuts.RESET:
                if (ctrl) {
                    event.preventDefault();
                    this.reset();
                }
                break;

            case this.shortcuts.FULLSCREEN:
                if (ctrl) {
                    event.preventDefault();
                    this.toggleFullscreen();
                }
                break;

            case this.shortcuts.SPEED_UP:
                event.preventDefault();
                this.increaseSpeed();
                break;

            case this.shortcuts.SPEED_DOWN:
                event.preventDefault();
                this.decreaseSpeed();
                break;

            case this.shortcuts.MIRROR:
                if (ctrl) {
                    event.preventDefault();
                    this.toggleMirror();
                }
                break;

            case this.shortcuts.TIMER_TOGGLE:
                if (ctrl) {
                    event.preventDefault();
                    this.toggleTimer();
                }
                break;

            case this.shortcuts.STATS_TOGGLE:
                if (ctrl) {
                    event.preventDefault();
                    this.toggleStats();
                }
                break;

            case this.shortcuts.HELP:
                if (!ctrl && !shift && !alt) {
                    event.preventDefault();
                    this.toggleHelp();
                }
                break;

            case this.shortcuts.MARKER_ADD:
                if (ctrl) {
                    event.preventDefault();
                    this.addMarker();
                }
                break;

            case this.shortcuts.NOTES_TOGGLE:
                if (ctrl) {
                    event.preventDefault();
                    this.toggleNotes();
                }
                break;

            case this.shortcuts.INCREASE_FONT:
                if (ctrl) {
                    event.preventDefault();
                    this.increaseFontSize();
                }
                break;

            case this.shortcuts.DECREASE_FONT:
                if (ctrl) {
                    event.preventDefault();
                    this.decreaseFontSize();
                }
                break;
        }
    }

    /**
     * Verifica si el usuario está escribiendo
     */
    isTyping(element) {
        const tagName = element.tagName.toLowerCase();
        return tagName === 'input' ||
               tagName === 'textarea' ||
               element.isContentEditable;
    }

    /**
     * Toggle reproducir/pausar
     */
    togglePlayPause() {
        if (this.teleprompter.isPlaying) {
            this.teleprompter.pause();
        } else {
            this.teleprompter.play();
        }
    }

    /**
     * Detener
     */
    stop() {
        if (this.teleprompter.isFullscreen) {
            this.teleprompter.exitFullscreen();
        } else {
            this.teleprompter.stop();
        }
    }

    /**
     * Reiniciar
     */
    reset() {
        this.teleprompter.reset();
    }

    /**
     * Toggle pantalla completa
     */
    toggleFullscreen() {
        if (this.teleprompter.isFullscreen) {
            this.teleprompter.exitFullscreen();
        } else {
            this.teleprompter.enterFullscreen();
        }
    }

    /**
     * Aumentar velocidad
     */
    increaseSpeed() {
        const newSpeed = Math.min(
            CONFIG.DEFAULTS.SPEED_MAX,
            this.teleprompter.speed + CONFIG.DEFAULTS.SPEED_KEYBOARD_INCREMENT
        );
        this.teleprompter.setSpeed(newSpeed);
    }

    /**
     * Disminuir velocidad
     */
    decreaseSpeed() {
        const newSpeed = Math.max(
            CONFIG.DEFAULTS.SPEED_MIN,
            this.teleprompter.speed - CONFIG.DEFAULTS.SPEED_KEYBOARD_INCREMENT
        );
        this.teleprompter.setSpeed(newSpeed);
    }

    /**
     * Toggle modo espejo
     */
    toggleMirror() {
        this.teleprompter.toggleMirrorMode();
    }

    /**
     * Toggle temporizador
     */
    toggleTimer() {
        this.teleprompter.toggleTimer();
    }

    /**
     * Toggle estadísticas
     */
    toggleStats() {
        this.teleprompter.toggleStats();
    }

    /**
     * Toggle panel de ayuda
     */
    toggleHelp() {
        this.helpVisible = !this.helpVisible;
        const overlay = document.getElementById('keyboard-help-overlay');
        if (overlay) {
            overlay.style.display = this.helpVisible ? 'flex' : 'none';
        }
    }

    /**
     * Agregar marcador
     */
    addMarker() {
        if (this.teleprompter.addMarker) {
            this.teleprompter.addMarker();
        }
    }

    /**
     * Toggle notas
     */
    toggleNotes() {
        if (this.teleprompter.toggleNotes) {
            this.teleprompter.toggleNotes();
        }
    }

    /**
     * Aumentar tamaño de fuente
     */
    increaseFontSize() {
        const newSize = Math.min(
            CONFIG.DEFAULTS.FONT_SIZE_MAX,
            this.teleprompter.fontSize + 2
        );
        this.teleprompter.setFontSize(newSize);
    }

    /**
     * Disminuir tamaño de fuente
     */
    decreaseFontSize() {
        const newSize = Math.max(
            CONFIG.DEFAULTS.FONT_SIZE_MIN,
            this.teleprompter.fontSize - 2
        );
        this.teleprompter.setFontSize(newSize);
    }

    /**
     * Habilitar handler
     */
    enable() {
        this.enabled = true;
    }

    /**
     * Deshabilitar handler
     */
    disable() {
        this.enabled = false;
    }

    /**
     * Crear overlay de ayuda
     */
    createHelpOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'keyboard-help-overlay';
        overlay.className = 'keyboard-help-overlay';
        overlay.style.display = 'none';

        overlay.innerHTML = `
            <div class="keyboard-help-content">
                <div class="keyboard-help-header">
                    <h2>Atajos de Teclado</h2>
                    <button class="keyboard-help-close" onclick="keyboardHandler.toggleHelp()" aria-label="Cerrar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
                <div class="keyboard-help-body">
                    <div class="keyboard-help-section">
                        <h3><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg> Reproducción</h3>
                        <div class="keyboard-shortcut">
                            <kbd>Espacio</kbd>
                            <span>Reproducir / Pausar</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>Esc</kbd>
                            <span>Detener / Salir pantalla completa</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>R</kbd>
                            <span>Reiniciar</span>
                        </div>
                    </div>

                    <div class="keyboard-help-section">
                        <h3><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Velocidad</h3>
                        <div class="keyboard-shortcut">
                            <kbd>↑</kbd>
                            <span>Aumentar velocidad</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>↓</kbd>
                            <span>Disminuir velocidad</span>
                        </div>
                    </div>

                    <div class="keyboard-help-section">
                        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> Visualización</h3>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>F</kbd>
                            <span>Pantalla completa</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>M</kbd>
                            <span>Modo espejo</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>+</kbd>
                            <span>Aumentar fuente</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>-</kbd>
                            <span>Disminuir fuente</span>
                        </div>
                    </div>

                    <div class="keyboard-help-section">
                        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> Información</h3>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>T</kbd>
                            <span>Mostrar/Ocultar temporizador</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>S</kbd>
                            <span>Mostrar/Ocultar estadísticas</span>
                        </div>
                    </div>

                    <div class="keyboard-help-section">
                        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Herramientas</h3>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>B</kbd>
                            <span>Agregar marcador</span>
                        </div>
                        <div class="keyboard-shortcut">
                            <kbd>Ctrl</kbd> + <kbd>N</kbd>
                            <span>Mostrar/Ocultar notas</span>
                        </div>
                    </div>

                    <div class="keyboard-help-section">
                        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Ayuda</h3>
                        <div class="keyboard-shortcut">
                            <kbd>H</kbd>
                            <span>Mostrar/Ocultar esta ayuda</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Cerrar al hacer clic fuera
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.toggleHelp();
            }
        });

        document.body.appendChild(overlay);
    }
}
