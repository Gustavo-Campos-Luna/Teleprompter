/**
 * Configuration - Professional Teleprompter
 * Configuraciones globales de la aplicación
 * Autor: Gustavo Campos Luna
 * Version: 2.0.0
 */

const CONFIG = {
    // Información de la aplicación
    APP: {
        NAME: 'Teleprompter Profesional',
        VERSION: '2.0.0',
        AUTHOR: 'Gustavo Campos Luna',
        DESCRIPTION: 'Teleprompter profesional con características avanzadas'
    },

    // Valores por defecto
    DEFAULTS: {
        FONT_FAMILY: 'Arial, sans-serif',
        FONT_SIZE: 32,
        FONT_SIZE_MIN: 16,
        FONT_SIZE_MAX: 120,
        SPEED: 3,
        SPEED_MIN: 0.1,
        SPEED_MAX: 20,
        SPEED_STEP: 0.1,
        SPEED_KEYBOARD_INCREMENT: 0.5,
        TEXT_COLOR: 'white',
        BG_COLOR: 'black',
        THEME: 'default',
        LINE_HEIGHT: 1.8,
        MIRROR_MODE: false,
        SHOW_TIMER: true,
        SHOW_STATS: true,
        SHOW_PROGRESS: true,
        READING_GUIDE: 'center',
        AUTO_HIDE_CONTROLS: true,
        AUTO_HIDE_DELAY: 5000,
        NOTIFICATION_DURATION: 3000
    },

    // Fuentes disponibles
    FONTS: [
        { value: 'Arial, sans-serif', label: 'Arial' },
        { value: 'Georgia, serif', label: 'Georgia' },
        { value: 'Times New Roman, serif', label: 'Times New Roman' },
        { value: 'Verdana, sans-serif', label: 'Verdana' },
        { value: 'Helvetica, sans-serif', label: 'Helvetica' },
        { value: 'Courier New, monospace', label: 'Courier New' },
        { value: 'Impact, sans-serif', label: 'Impact' },
        { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
        { value: 'Tahoma, sans-serif', label: 'Tahoma' },
        { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
        { value: 'Palatino Linotype, serif', label: 'Palatino' },
        { value: 'Garamond, serif', label: 'Garamond' },
        { value: 'Bookman, serif', label: 'Bookman' },
        { value: 'Lucida Console, monospace', label: 'Lucida Console' }
    ],

    // Temas disponibles
    THEMES: [
        { value: 'default', label: 'Por Defecto', icon: '🎨' },
        { value: 'dark', label: 'Oscuro', icon: '🌙' },
        { value: 'high-contrast', label: 'Alto Contraste', icon: '◐' },
        { value: 'ocean', label: 'Océano', icon: '🌊' },
        { value: 'forest', label: 'Bosque', icon: '🌲' },
        { value: 'sunset', label: 'Atardecer', icon: '🌅' },
        { value: 'neon', label: 'Neón', icon: '💜' },
        { value: 'minimal', label: 'Minimalista', icon: '⚪' },
        { value: 'retrowave', label: 'Retrowave', icon: '🌃' }
    ],

    // Colores de texto
    TEXT_COLORS: [
        { value: 'white', label: 'Blanco', hex: '#ffffff' },
        { value: 'yellow', label: 'Amarillo', hex: '#fbbf24' },
        { value: 'cyan', label: 'Cyan', hex: '#22d3ee' },
        { value: 'green', label: 'Verde', hex: '#4ade80' },
        { value: 'pink', label: 'Rosa', hex: '#f472b6' }
    ],

    // Colores de fondo
    BG_COLORS: [
        { value: 'black', label: 'Negro', hex: '#000000' },
        { value: 'dark-gray', label: 'Gris Oscuro', hex: '#1f2937' },
        { value: 'dark-blue', label: 'Azul Oscuro', hex: '#1e3a8a' },
        { value: 'dark-green', label: 'Verde Oscuro', hex: '#064e3b' },
        { value: 'dark-purple', label: 'Púrpura Oscuro', hex: '#581c87' }
    ],

    // Posiciones de guía de lectura
    READING_GUIDES: [
        { value: 'none', label: 'Sin guía' },
        { value: 'top', label: 'Superior' },
        { value: 'center', label: 'Centro' },
        { value: 'bottom', label: 'Inferior' }
    ],

    // Atajos de teclado
    KEYBOARD_SHORTCUTS: {
        PLAY_PAUSE: 'Space',
        STOP: 'Escape',
        RESET: 'KeyR',
        FULLSCREEN: 'KeyF',
        SPEED_UP: 'ArrowUp',
        SPEED_DOWN: 'ArrowDown',
        MIRROR: 'KeyM',
        TIMER_TOGGLE: 'KeyT',
        STATS_TOGGLE: 'KeyS',
        HELP: 'KeyH',
        MARKER_ADD: 'KeyB',
        NOTES_TOGGLE: 'KeyN',
        INCREASE_FONT: 'Equal',
        DECREASE_FONT: 'Minus'
    },

    // Configuración de animaciones
    ANIMATION: {
        SCROLL_TRANSITION: 0.1,
        UI_TRANSITION: 300,
        FADE_DURATION: 500,
        BOUNCE_DURATION: 600
    },

    // Configuración de almacenamiento
    STORAGE: {
        KEY_PREFIX: 'teleprompter_',
        KEYS: {
            SETTINGS: 'settings',
            RECENT_TEXTS: 'recent_texts',
            MARKERS: 'markers',
            NOTES: 'notes',
            THEME: 'theme'
        },
        MAX_RECENT_TEXTS: 10
    },

    // Análisis de texto
    TEXT_ANALYSIS: {
        WORDS_PER_MINUTE_READING: 150,
        WORDS_PER_MINUTE_SPEAKING: 130,
        CHARS_PER_WORD_AVG: 5
    },

    // Configuración de exportación
    EXPORT: {
        FORMATS: ['txt', 'json'],
        DEFAULT_FILENAME: 'teleprompter-text'
    },

    // Mensajes de texto
    MESSAGES: {
        NO_TEXT: 'Por favor, carga un archivo o escribe texto antes de reproducir.',
        FILE_LOADED: 'Archivo cargado correctamente',
        FILE_ERROR: 'Error al cargar el archivo. Asegúrate de que sea un documento Word válido.',
        LOADING: 'Cargando...',
        SETTINGS_SAVED: 'Configuración guardada',
        SETTINGS_RESET: 'Configuración restaurada',
        MARKER_ADDED: 'Marcador añadido',
        MARKER_REMOVED: 'Marcador eliminado'
    },

    // Estados del teleprompter
    STATES: {
        STOPPED: 'stopped',
        PLAYING: 'playing',
        PAUSED: 'paused'
    },

    // Textos de estado
    STATE_LABELS: {
        stopped: 'Detenido',
        playing: 'Reproduciendo',
        paused: 'Pausado'
    },

    // Texto de bienvenida por defecto
    DEFAULT_TEXT: `¡Bienvenido al Teleprompter Profesional 2.0!

Características destacadas:

• Modo espejo para cámaras profesionales
• Temporizador y cronómetro integrado
• Marcadores y puntos de navegación
• Análisis de texto en tiempo real
• Múltiples temas personalizables
• Atajos de teclado profesionales
• Sistema de notas del presentador
• Guías de lectura ajustables

Carga un archivo Word o escribe tu texto en el editor.

Ajusta el tamaño de fuente, tipo de letra y velocidad según tus necesidades.

Presiona "Reproducir" o la barra espaciadora para comenzar el desplazamiento automático.

¡Perfecto para presentaciones, discursos, videos y producciones profesionales!

Presiona "H" para ver todos los atajos de teclado disponibles.`,

    // Configuración de desarrollo
    DEBUG: false,
    LOG_LEVEL: 'info'
};

// Congelar el objeto de configuración para evitar modificaciones accidentales
Object.freeze(CONFIG);
Object.freeze(CONFIG.APP);
Object.freeze(CONFIG.DEFAULTS);
Object.freeze(CONFIG.KEYBOARD_SHORTCUTS);
Object.freeze(CONFIG.ANIMATION);
Object.freeze(CONFIG.STORAGE);
Object.freeze(CONFIG.TEXT_ANALYSIS);
Object.freeze(CONFIG.EXPORT);
Object.freeze(CONFIG.MESSAGES);
Object.freeze(CONFIG.STATES);
Object.freeze(CONFIG.STATE_LABELS);

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
