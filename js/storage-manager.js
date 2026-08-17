/**
 * Storage Manager - Professional Teleprompter
 * Gestión de persistencia de datos con localStorage
 * Autor: Gustavo Campos Luna
 */

class StorageManager {
    constructor() {
        this.prefix = CONFIG.STORAGE.KEY_PREFIX;
        this.isAvailable = this.checkStorageAvailability();

        if (!this.isAvailable) {
            console.warn('localStorage no está disponible. Las preferencias no se guardarán.');
        }
    }

    /**
     * Verifica si localStorage está disponible
     */
    checkStorageAvailability() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Obtiene la clave completa con prefijo
     */
    getKey(key) {
        return `${this.prefix}${key}`;
    }

    /**
     * Guarda un valor en localStorage
     */
    set(key, value) {
        if (!this.isAvailable) return false;

        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(this.getKey(key), serializedValue);
            return true;
        } catch (e) {
            console.error('Error al guardar en localStorage:', e);
            return false;
        }
    }

    /**
     * Obtiene un valor de localStorage
     */
    get(key, defaultValue = null) {
        if (!this.isAvailable) return defaultValue;

        try {
            const item = localStorage.getItem(this.getKey(key));
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error al leer de localStorage:', e);
            return defaultValue;
        }
    }

    /**
     * Elimina un valor de localStorage
     */
    remove(key) {
        if (!this.isAvailable) return false;

        try {
            localStorage.removeItem(this.getKey(key));
            return true;
        } catch (e) {
            console.error('Error al eliminar de localStorage:', e);
            return false;
        }
    }

    /**
     * Limpia todos los datos de la aplicación
     */
    clear() {
        if (!this.isAvailable) return false;

        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (e) {
            console.error('Error al limpiar localStorage:', e);
            return false;
        }
    }

    /**
     * Guarda la configuración del usuario
     */
    saveSettings(settings) {
        return this.set(CONFIG.STORAGE.KEYS.SETTINGS, settings);
    }

    /**
     * Carga la configuración del usuario
     */
    loadSettings() {
        return this.get(CONFIG.STORAGE.KEYS.SETTINGS, {});
    }

    /**
     * Guarda un texto en el historial de textos recientes
     */
    addRecentText(text, metadata = {}) {
        if (!text || !text.trim()) return false;

        const recentTexts = this.getRecentTexts();
        const newEntry = {
            text: text.trim(),
            timestamp: Date.now(),
            ...metadata
        };

        // Evitar duplicados
        const filtered = recentTexts.filter(entry => entry.text !== newEntry.text);
        filtered.unshift(newEntry);

        // Limitar el número de textos recientes
        const limited = filtered.slice(0, CONFIG.STORAGE.MAX_RECENT_TEXTS);

        return this.set(CONFIG.STORAGE.KEYS.RECENT_TEXTS, limited);
    }

    /**
     * Obtiene el historial de textos recientes
     */
    getRecentTexts() {
        return this.get(CONFIG.STORAGE.KEYS.RECENT_TEXTS, []);
    }

    /**
     * Limpia el historial de textos recientes
     */
    clearRecentTexts() {
        return this.remove(CONFIG.STORAGE.KEYS.RECENT_TEXTS);
    }

    /**
     * Guarda marcadores
     */
    saveMarkers(markers) {
        return this.set(CONFIG.STORAGE.KEYS.MARKERS, markers);
    }

    /**
     * Carga marcadores
     */
    loadMarkers() {
        return this.get(CONFIG.STORAGE.KEYS.MARKERS, []);
    }

    /**
     * Guarda notas del presentador
     */
    saveNotes(notes) {
        return this.set(CONFIG.STORAGE.KEYS.NOTES, notes);
    }

    /**
     * Carga notas del presentador
     */
    loadNotes() {
        return this.get(CONFIG.STORAGE.KEYS.NOTES, '');
    }

    /**
     * Exporta toda la configuración
     */
    exportData() {
        const data = {
            version: CONFIG.APP.VERSION,
            timestamp: Date.now(),
            settings: this.loadSettings(),
            recentTexts: this.getRecentTexts(),
            markers: this.loadMarkers(),
            notes: this.loadNotes()
        };

        return JSON.stringify(data, null, 2);
    }

    /**
     * Importa configuración desde un string JSON
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            if (data.settings) this.saveSettings(data.settings);
            if (data.recentTexts) this.set(CONFIG.STORAGE.KEYS.RECENT_TEXTS, data.recentTexts);
            if (data.markers) this.saveMarkers(data.markers);
            if (data.notes) this.saveNotes(data.notes);

            return true;
        } catch (e) {
            console.error('Error al importar datos:', e);
            return false;
        }
    }

    /**
     * Obtiene el tamaño usado en localStorage (aproximado)
     */
    getStorageSize() {
        if (!this.isAvailable) return 0;

        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key.startsWith(this.prefix)) {
                total += localStorage[key].length + key.length;
            }
        }
        return total;
    }

    /**
     * Obtiene el tamaño en formato legible
     */
    getStorageSizeFormatted() {
        const bytes = this.getStorageSize();
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
}

// Crear instancia global
const storageManager = new StorageManager();
