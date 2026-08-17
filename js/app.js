/**
 * Application Initializer - Professional Teleprompter
 * Inicializador de la aplicación
 * Autor: Gustavo Campos Luna
 */

// Variables globales
let teleprompter = null;
let uiController = null;
let keyboardHandler = null;

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    console.log(`${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`);
    console.log(`Desarrollado por ${CONFIG.APP.AUTHOR}`);

    try {
        // Inicializar teleprompter
        teleprompter = new TeleprompterCore();
        console.log('✓ Teleprompter Core inicializado');

        // Inicializar controlador de UI
        uiController = new UIController(teleprompter);
        console.log('✓ UI Controller inicializado');

        // Inicializar manejador de teclado
        keyboardHandler = new KeyboardHandler(teleprompter);
        console.log('✓ Keyboard Handler inicializado');

        // Cargar texto por defecto
        teleprompter.setText(CONFIG.DEFAULT_TEXT);

        // Actualizar UI inicial
        uiController.syncUI();

        // Agregar animación de entrada
        document.body.classList.add('page-enter');

        // Mostrar mensaje de bienvenida
        console.log('✓ Aplicación lista');

        // Log debug si está activado
        if (CONFIG.DEBUG) {
            console.log('=== DEBUG MODE ===');
            console.log('Teleprompter:', teleprompter);
            console.log('UI Controller:', uiController);
            console.log('Keyboard Handler:', keyboardHandler);
            console.log('Storage Manager:', storageManager);
        }

    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        showError('Error al inicializar la aplicación. Por favor, recarga la página.');
    }
}

/**
 * Muestra un error en la UI
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <h2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Error</h2>
            <p>${message}</p>
            <button onclick="location.reload()">Recargar Página</button>
        </div>
    `;
    document.body.appendChild(errorDiv);
}

/**
 * Maneja errores globales
 */
window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
    if (CONFIG.DEBUG) {
        console.error('Stack:', event.error.stack);
    }
});

/**
 * Maneja promesas rechazadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rechazada:', event.reason);
    if (CONFIG.DEBUG) {
        console.error('Detalle:', event);
    }
});

/**
 * Limpieza antes de salir
 */
window.addEventListener('beforeunload', () => {
    if (teleprompter) {
        teleprompter.stop();
        teleprompter.saveSettings();
    }
});

/**
 * Maneja cambios de visibilidad de la página
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden && teleprompter && teleprompter.isPlaying) {
        // Pausar cuando la página no es visible
        teleprompter.pause();
        if (uiController) {
            uiController.updateButtonStates();
        }
    }
});

/**
 * Maneja redimensionamiento de ventana
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (teleprompter) {
            teleprompter.calculateMaxScroll();
        }
    }, 250);
});

/**
 * Previene zoom accidental en dispositivos móviles
 */
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

/**
 * Iniciar cuando el DOM esté listo
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM ya está listo
    initializeApp();
}

// Exponer funciones globales para debug
if (CONFIG.DEBUG) {
    window.teleprompter = teleprompter;
    window.uiController = uiController;
    window.keyboardHandler = keyboardHandler;
    window.storageManager = storageManager;
    window.CONFIG = CONFIG;
}
