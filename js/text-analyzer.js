/**
 * Text Analyzer - Professional Teleprompter
 * Análisis de texto y estadísticas
 * Autor: Gustavo Campos Luna
 */

class TextAnalyzer {
    constructor(text = '') {
        this.text = text;
        this.stats = this.analyze();
    }

    /**
     * Actualiza el texto y recalcula estadísticas
     */
    setText(text) {
        this.text = text;
        this.stats = this.analyze();
        return this.stats;
    }

    /**
     * Analiza el texto y genera estadísticas
     */
    analyze() {
        const text = this.text.trim();

        if (!text) {
            return this.getEmptyStats();
        }

        const stats = {
            characters: this.countCharacters(text),
            charactersNoSpaces: this.countCharactersNoSpaces(text),
            words: this.countWords(text),
            sentences: this.countSentences(text),
            paragraphs: this.countParagraphs(text),
            lines: this.countLines(text),
            readingTime: 0,
            speakingTime: 0,
            averageWordLength: 0,
            longestWord: '',
            shortestWord: '',
            uniqueWords: 0,
            complexity: 0
        };

        // Calcular tiempos estimados
        stats.readingTime = this.calculateReadingTime(stats.words);
        stats.speakingTime = this.calculateSpeakingTime(stats.words);

        // Análisis de palabras
        const words = this.extractWords(text);
        if (words.length > 0) {
            stats.averageWordLength = this.calculateAverageWordLength(words);
            stats.longestWord = this.findLongestWord(words);
            stats.shortestWord = this.findShortestWord(words);
            stats.uniqueWords = this.countUniqueWords(words);
            stats.complexity = this.calculateComplexity(stats);
        }

        return stats;
    }

    /**
     * Devuelve estadísticas vacías
     */
    getEmptyStats() {
        return {
            characters: 0,
            charactersNoSpaces: 0,
            words: 0,
            sentences: 0,
            paragraphs: 0,
            lines: 0,
            readingTime: 0,
            speakingTime: 0,
            averageWordLength: 0,
            longestWord: '',
            shortestWord: '',
            uniqueWords: 0,
            complexity: 0
        };
    }

    /**
     * Cuenta caracteres totales
     */
    countCharacters(text) {
        return text.length;
    }

    /**
     * Cuenta caracteres sin espacios
     */
    countCharactersNoSpaces(text) {
        return text.replace(/\s/g, '').length;
    }

    /**
     * Cuenta palabras
     */
    countWords(text) {
        const words = text.match(/\b\w+\b/g);
        return words ? words.length : 0;
    }

    /**
     * Cuenta oraciones
     */
    countSentences(text) {
        const sentences = text.match(/[.!?]+/g);
        return sentences ? sentences.length : 0;
    }

    /**
     * Cuenta párrafos
     */
    countParagraphs(text) {
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        return paragraphs.length;
    }

    /**
     * Cuenta líneas
     */
    countLines(text) {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        return lines.length;
    }

    /**
     * Extrae array de palabras
     */
    extractWords(text) {
        const matches = text.match(/\b\w+\b/g);
        return matches || [];
    }

    /**
     * Calcula tiempo estimado de lectura
     */
    calculateReadingTime(words) {
        const wpm = CONFIG.TEXT_ANALYSIS.WORDS_PER_MINUTE_READING;
        const minutes = words / wpm;
        return Math.ceil(minutes * 60); // en segundos
    }

    /**
     * Calcula tiempo estimado de habla
     */
    calculateSpeakingTime(words) {
        const wpm = CONFIG.TEXT_ANALYSIS.WORDS_PER_MINUTE_SPEAKING;
        const minutes = words / wpm;
        return Math.ceil(minutes * 60); // en segundos
    }

    /**
     * Calcula longitud promedio de palabras
     */
    calculateAverageWordLength(words) {
        if (words.length === 0) return 0;
        const totalLength = words.reduce((sum, word) => sum + word.length, 0);
        return (totalLength / words.length).toFixed(2);
    }

    /**
     * Encuentra la palabra más larga
     */
    findLongestWord(words) {
        if (words.length === 0) return '';
        return words.reduce((longest, word) =>
            word.length > longest.length ? word : longest
        , '');
    }

    /**
     * Encuentra la palabra más corta
     */
    findShortestWord(words) {
        if (words.length === 0) return '';
        return words.reduce((shortest, word) =>
            word.length < shortest.length ? word : shortest
        , words[0]);
    }

    /**
     * Cuenta palabras únicas
     */
    countUniqueWords(words) {
        const uniqueWords = new Set(words.map(w => w.toLowerCase()));
        return uniqueWords.size;
    }

    /**
     * Calcula índice de complejidad del texto (0-100)
     * Basado en longitud promedio de palabras y oraciones
     */
    calculateComplexity(stats) {
        if (stats.words === 0 || stats.sentences === 0) return 0;

        const avgWordsPerSentence = stats.words / stats.sentences;
        const avgWordLength = stats.averageWordLength;

        // Fórmula simple de complejidad
        const complexity = (avgWordsPerSentence * 2 + avgWordLength * 10);

        // Normalizar a escala 0-100
        return Math.min(100, Math.round(complexity));
    }

    /**
     * Obtiene nivel de complejidad en texto
     */
    getComplexityLevel(complexity) {
        if (complexity < 30) return { level: 'Fácil', color: 'green' };
        if (complexity < 50) return { level: 'Moderado', color: 'yellow' };
        if (complexity < 70) return { level: 'Intermedio', color: 'orange' };
        return { level: 'Avanzado', color: 'red' };
    }

    /**
     * Formatea tiempo en formato legible (mm:ss)
     */
    static formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Formatea tiempo en formato largo
     */
    static formatTimeLong(seconds) {
        if (seconds < 60) {
            return `${seconds} seg`;
        }

        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        if (mins < 60) {
            return secs > 0 ? `${mins} min ${secs} seg` : `${mins} min`;
        }

        const hours = Math.floor(mins / 60);
        const remainingMins = mins % 60;
        return `${hours}h ${remainingMins}m`;
    }

    /**
     * Genera reporte completo de análisis
     */
    generateReport() {
        const stats = this.stats;
        const complexityInfo = this.getComplexityLevel(stats.complexity);

        return {
            basic: {
                'Caracteres': stats.characters.toLocaleString(),
                'Caracteres sin espacios': stats.charactersNoSpaces.toLocaleString(),
                'Palabras': stats.words.toLocaleString(),
                'Oraciones': stats.sentences.toLocaleString(),
                'Párrafos': stats.paragraphs.toLocaleString(),
                'Líneas': stats.lines.toLocaleString()
            },
            timing: {
                'Tiempo de lectura': TextAnalyzer.formatTimeLong(stats.readingTime),
                'Tiempo al hablar': TextAnalyzer.formatTimeLong(stats.speakingTime)
            },
            advanced: {
                'Palabras únicas': stats.uniqueWords.toLocaleString(),
                'Longitud promedio': `${stats.averageWordLength} caracteres`,
                'Palabra más larga': stats.longestWord,
                'Palabra más corta': stats.shortestWord,
                'Complejidad': `${stats.complexity}/100 (${complexityInfo.level})`
            }
        };
    }

    /**
     * Obtiene estadísticas actuales
     */
    getStats() {
        return this.stats;
    }

    /**
     * Calcula palabras por minuto basado en velocidad de scroll
     */
    calculateWPM(scrollSpeed, fontSize) {
        // Fórmula aproximada basada en velocidad y tamaño de fuente
        const baseWPM = 130;
        const speedFactor = scrollSpeed / CONFIG.DEFAULTS.SPEED;
        const fontFactor = fontSize / CONFIG.DEFAULTS.FONT_SIZE;

        return Math.round(baseWPM * speedFactor * fontFactor);
    }
}
