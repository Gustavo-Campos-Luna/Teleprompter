# 📺 Teleprompter Profesional 2.0

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/Gustavo-Campos-Luna/Teleprompter)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-production-brightgreen.svg)]()

> Teleprompter profesional de última generación con características avanzadas para presentaciones, producción de video y streaming.

## 🚀 Demo en Vivo

**[Ver Demo](https://gustavo-campos-luna.github.io/Teleprompter)**

---

## ✨ Características Principales

### 🎬 Reproducción Profesional
- **Control de velocidad avanzado**: 0.1x a 20x con ajuste en tiempo real
- **Scroll suave y fluido**: Animaciones optimizadas con requestAnimationFrame
- **Temporizador integrado**: Cronómetro con precisión de décimas de segundo
- **Barra de progreso visual**: Seguimiento preciso del avance
- **Controles en pantalla completa**: Botones flotantes con auto-ocultamiento

### 🔄 Modo Espejo Profesional
- **Reflejo horizontal**: Perfecto para telepromters con espejos
- **Compatible con cámaras**: Ideal para producciones profesionales de video
- **Toggle rápido**: Activa/desactiva con Ctrl+M

### 🎨 Personalización Avanzada
- **9 temas visuales**: Desde minimalista hasta neón y retrowave
- **14 fuentes profesionales**: Arial, Georgia, Times New Roman y más
- **Colores personalizables**: 5 colores de texto y 5 de fondo
- **Tamaño de fuente**: 16px a 120px con ajuste en tiempo real
- **Sistema de diseño**: Variables CSS para consistencia visual

### 📊 Análisis de Texto Inteligente
- **Conteo de palabras y caracteres**: Estadísticas en tiempo real
- **Tiempo estimado de lectura**: Basado en 150 palabras por minuto
- **Tiempo de habla estimado**: Basado en 130 palabras por minuto
- **Análisis de complejidad**: Evaluación del nivel del texto
- **Estadísticas avanzadas**: Oraciones, párrafos, líneas

### ⌨️ Atajos de Teclado Profesionales
- **Reproducción**: Espacio (play/pause), Esc (stop)
- **Velocidad**: ↑/↓ para ajustar
- **Pantalla completa**: Ctrl+F
- **Modo espejo**: Ctrl+M
- **Fuente**: Ctrl + +/- para ajustar tamaño
- **Ayuda**: H para ver todos los atajos
- Y muchos más...

### 💾 Persistencia de Datos
- **localStorage**: Guarda automáticamente preferencias
- **Importar/Exportar**: Respaldo de configuración en JSON
- **Historial de textos**: Últimos 10 textos utilizados
- **Temas persistentes**: Recuerda tu tema favorito

### 📱 Diseño Responsivo
- **Compatible con todos los dispositivos**: Desktop, tablet, móvil
- **Optimizado para touch**: Controles táctiles mejorados
- **Orientación adaptable**: Portrait y landscape
- **Breakpoints modernos**: Diseño fluido y profesional

### 🔧 Características Técnicas
- **Arquitectura modular**: JavaScript ES6+ con clases
- **Sin frameworks**: Vanilla JS para máximo rendimiento
- **Accesibilidad**: Atributos ARIA y navegación por teclado
- **SEO optimizado**: Meta tags completos
- **Performance**: Lazy loading y optimizaciones

---

## 📁 Estructura del Proyecto

```
teleprompter/
├── index.html                  # HTML principal
├── README.md                   # Este archivo
│
├── css/                        # Hojas de estilo
│   ├── design-system.css       # Variables y tokens de diseño
│   ├── main-styles.css         # Estilos principales
│   ├── teleprompter-styles.css # Estilos del teleprompter
│   ├── animations.css          # Animaciones y transiciones
│   ├── themes.css              # Temas múltiples
│   ├── responsive.css          # Diseño responsivo
│   └── keyboard-help.css       # Overlay de ayuda
│
├── js/                         # JavaScript modular
│   ├── config.js               # Configuraciones globales
│   ├── storage-manager.js      # Gestión de localStorage
│   ├── text-analyzer.js        # Análisis de texto
│   ├── keyboard-handler.js     # Manejo de teclado
│   ├── teleprompter-core.js    # Lógica principal
│   ├── ui-controller.js        # Control de UI
│   └── app.js                  # Inicialización
│
└── .github/
    └── workflows/
        └── static.yml          # GitHub Actions (CI/CD)
```

---

## 🎮 Guía de Uso

### Inicio Rápido

1. **Cargar contenido**
   - Sube un archivo Word (.doc, .docx)
   - O escribe/pega tu texto directamente

2. **Personalizar**
   - Ajusta fuente, tamaño y colores
   - Selecciona tu tema favorito
   - Configura velocidad de scroll

3. **Reproducir**
   - Presiona Espacio o click en Reproducir
   - Usa pantalla completa para presentaciones
   - Controla con teclado o mouse

### Atajos de Teclado Completos

| Acción | Atajo | Descripción |
|--------|-------|-------------|
| **Reproducción** |
| Reproducir/Pausar | `Espacio` | Inicia o pausa el scroll |
| Detener | `Esc` | Detiene y reinicia posición |
| Reiniciar | `Ctrl+R` | Vuelve al inicio |
| **Velocidad** |
| Aumentar | `↑` | +0.5 velocidad |
| Disminuir | `↓` | -0.5 velocidad |
| **Visualización** |
| Pantalla completa | `Ctrl+F` | Toggle fullscreen |
| Modo espejo | `Ctrl+M` | Toggle mirror mode |
| Aumentar fuente | `Ctrl++` | +2px tamaño |
| Disminuir fuente | `Ctrl+-` | -2px tamaño |
| **Información** |
| Temporizador | `Ctrl+T` | Mostrar/ocultar timer |
| Estadísticas | `Ctrl+S` | Mostrar/ocultar stats |
| **Herramientas** |
| Marcador | `Ctrl+B` | Añadir marcador |
| Notas | `Ctrl+N` | Toggle notas |
| **Ayuda** |
| Ver ayuda | `H` | Mostrar todos los atajos |

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Clases, módulos, async/await

### Librerías
- **Mammoth.js**: Procesamiento de archivos Word
- **Fullscreen API**: Modo pantalla completa nativo

### Características Modernas
- **CSS Custom Properties**: Sistema de diseño escalable
- **RequestAnimationFrame**: Animaciones fluidas
- **LocalStorage API**: Persistencia de datos
- **IntersectionObserver**: Optimizaciones de rendimiento

---

## 🎨 Temas Disponibles

1. **Por Defecto** 🎨 - Gradiente violeta profesional
2. **Oscuro** 🌙 - Para ambientes con poca luz
3. **Alto Contraste** ◐ - Máxima legibilidad
4. **Océano** 🌊 - Tonos azules tranquilos
5. **Bosque** 🌲 - Verdes naturales
6. **Atardecer** 🌅 - Naranjas y rojos cálidos
7. **Neón** 💜 - Cyberpunk brillante
8. **Minimalista** ⚪ - Limpio y simple
9. **Retrowave** 🌃 - Estética años 80

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Opera 70+

### Dispositivos
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablets (iPad, Android)
- ✅ Smartphones (iOS, Android)

### Resoluciones
- ✅ 4K (3840×2160)
- ✅ Full HD (1920×1080)
- ✅ HD (1280×720)
- ✅ Mobile (320px+)

---

## 📖 Casos de Uso

### 🎬 Producción de Video
- Grabación de videos para YouTube
- Producción de contenido profesional
- Vlogs y tutoriales
- Entrevistas y presentaciones

### 🎤 Presentaciones en Vivo
- Conferencias y charlas
- Discursos públicos
- Webinars y seminarios
- Clases y tutoriales

### 📺 Streaming
- Twitch y YouTube Live
- Transmisiones en vivo
- Podcasts en video
- Contenido educativo

### 🎭 Entretenimiento
- Teatro y actuación
- Doblaje y locución
- Ensayos de guiones
- Práctica de discursos

---

## 🚀 Instalación Local

### Opción 1: Uso Directo
```bash
# Clonar repositorio
git clone https://github.com/Gustavo-Campos-Luna/Teleprompter.git

# Abrir en navegador
cd teleprompter
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Opción 2: Servidor Local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000

# Abrir en navegador
http://localhost:8000
```

---

## 🔧 Configuración Avanzada

### Personalizar CONFIG.js

```javascript
const CONFIG = {
    DEFAULTS: {
        SPEED: 3,              // Velocidad inicial
        FONT_SIZE: 32,         // Tamaño de fuente inicial
        THEME: 'default',      // Tema por defecto
        MIRROR_MODE: false,    // Modo espejo desactivado
        SHOW_TIMER: true,      // Mostrar temporizador
        SHOW_STATS: true       // Mostrar estadísticas
    }
}
```

### Agregar Nuevos Temas

```css
/* themes.css */
[data-theme="mi-tema"] {
    --color-primary-start: #your-color;
    --color-primary-end: #your-color;
    /* ... más configuraciones */
}
```

---

## 📊 Rendimiento

- ⚡ **Carga inicial**: < 100ms
- ⚡ **First Contentful Paint**: < 200ms
- ⚡ **Time to Interactive**: < 300ms
- ⚡ **FPS**: 60fps constantes
- ⚡ **Tamaño total**: ~150KB (sin comprimir)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 👨‍💻 Autor

**Gustavo Campos Luna**

- GitHub: [@Gustavo-Campos-Luna](https://github.com/Gustavo-Campos-Luna)
- Proyecto: [Teleprompter Profesional](https://github.com/Gustavo-Campos-Luna/Teleprompter)

---

## 🙏 Agradecimientos

- Comunidad de desarrolladores open source
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) por el procesamiento de Word
- Inspiración en teleprompters profesionales de la industria

---

## 📝 Changelog

### Version 2.0.0 (2026-01)
- ✨ Rediseño completo de UI/UX
- ✨ Arquitectura modular profesional
- ✨ 9 temas visuales
- ✨ Sistema de diseño con variables CSS
- ✨ Modo espejo profesional
- ✨ Análisis de texto inteligente
- ✨ Atajos de teclado avanzados
- ✨ Persistencia con localStorage
- ✨ Exportar/importar configuración
- ✨ Diseño responsivo mejorado
- ✨ Accesibilidad WCAG 2.1
- ✨ Performance optimizado

### Version 1.0.0 (2025)
- 🎉 Lanzamiento inicial
- ✅ Funcionalidad básica
- ✅ Carga de archivos Word
- ✅ Control de velocidad
- ✅ Pantalla completa

---

## 🐛 Reportar Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/Gustavo-Campos-Luna/Teleprompter/issues) con:
- Descripción del problema
- Pasos para reproducir
- Navegador y versión
- Screenshots si es posible

---

## 💡 Roadmap Futuro

- [ ] Control remoto desde smartphone
- [ ] Sincronización multi-dispositivo
- [ ] Integración con servicios en la nube
- [ ] Modo colaborativo
- [ ] Grabación de video integrada
- [ ] IA para mejorar textos
- [ ] Traducción en tiempo real
- [ ] Editor de texto avanzado

---

<div align="center">

**Hecho con ❤️ y ☕ por Gustavo Campos Luna**

⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐

[Demo](https://gustavo-campos-luna.github.io/Teleprompter) • [Reportar Bug](https://github.com/Gustavo-Campos-Luna/Teleprompter/issues) • [Solicitar Feature](https://github.com/Gustavo-Campos-Luna/Teleprompter/issues)

</div>
