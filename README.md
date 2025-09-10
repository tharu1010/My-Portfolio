# 🚀 Modern Portfolio - Mihiri Tharushika

A sleek, modern, and responsive portfolio website built with cutting-edge web technologies and contemporary UI/UX design principles.

![Portfolio Preview](assets/img/portfolio-preview.png)

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism UI**: Beautiful glass-like components with backdrop blur effects
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Custom Cursor**: Interactive cursor with hover effects (desktop only)
- **Smooth Animations**: CSS animations and JavaScript transitions
- **Modern Typography**: Inter font family for optimal readability

### 🛠️ Technical Features
- **Semantic HTML5**: Accessible and SEO-friendly markup
- **Modern CSS**: 
  - CSS Custom Properties (CSS Variables)
  - CSS Grid & Flexbox layouts
  - Modern CSS features (backdrop-filter, aspect-ratio)
  - Media queries for responsive design
- **Vanilla JavaScript ES6+**: 
  - Class-based architecture
  - Intersection Observer API
  - Modern DOM manipulation
  - Performance optimizations
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: WCAG guidelines compliance
- **Performance Optimized**: Lazy loading, debounced events, efficient animations

### 📱 Interactive Components
- **Navigation**: Smooth scrolling with active link highlighting
- **Hero Section**: Typing animation and floating background elements
- **Skills**: Animated progress bars and categorized skills display
- **Projects**: Filterable project gallery with hover effects
- **Contact Form**: Form validation and user feedback
- **Scroll Indicators**: Progress bar and back-to-top button

## 🚀 Live Demo

[View Live Portfolio](https://IT22914200.github.io/My-Portfolio-tharu)

## 💻 Local Development

### Prerequisites
- Node.js (v16.0.0 or higher)
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/IT22914200/My-Portfolio-tharu.git
   cd My-Portfolio-tharu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   # or for live reload
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   # or http://localhost:3000 for live-server
   ```

### Development Scripts

```bash
# Start local server
npm start

# Start with live reload
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Run Lighthouse audit
npm run lighthouse
```

## 📁 Project Structure

```
├── assets/
│   ├── css/
│   │   ├── modern-styles.css    # Modern CSS with variables and animations
│   │   └── styles.css          # Legacy styles (backup)
│   ├── js/
│   │   ├── modern-main.js      # Modern JavaScript with ES6+ features
│   │   └── main.js             # Legacy JavaScript (backup)
│   ├── img/                    # Images and graphics
│   └── cv/                     # CV/Resume files
├── index.html                  # Main HTML file
├── package.json               # Node.js dependencies and scripts
└── README.md                  # Project documentation
```

## 🎨 Customization

### Colors & Themes
Modify CSS custom properties in `assets/css/modern-styles.css`:

```css
:root {
  --primary-hue: 200;        /* Blue theme */
  --accent-hue: 280;         /* Purple accent */
  --primary-sat: 100%;       /* Saturation */
  --primary-lit: 50%;        /* Lightness */
}
```

### Content Updates
1. **Personal Information**: Update `index.html` with your details
2. **Projects**: Modify the projects section with your work
3. **Skills**: Update the skills section with your technologies
4. **Images**: Replace images in `assets/img/` with your photos
5. **CV**: Update the CV file in `assets/cv/`

### Sections
- **Hero**: Introduction and call-to-action
- **About**: Personal story and statistics
- **Experience**: Education and work timeline
- **Skills**: Technical and soft skills
- **Projects**: Portfolio showcase with filtering
- **Contact**: Contact information and form

## 🌐 Deployment

### GitHub Pages (Recommended)
```bash
npm run deploy
```

### Manual Deployment
1. Build the project: `npm run build`
2. Upload files to your hosting provider
3. Ensure `index.html` is in the root directory

### Environment Configuration
For custom domains or different hosting:
1. Update `homepage` in `package.json`
2. Modify any absolute paths if necessary

## 🔧 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Graceful Degradation**: Works on older browsers with reduced features

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google's metrics
- **Loading Speed**: < 3s on 3G networks
- **Bundle Size**: Minimal JavaScript and CSS
- **Image Optimization**: WebP format with fallbacks

## 🎯 SEO Features

- **Meta Tags**: Comprehensive meta information
- **Open Graph**: Social media sharing optimization
- **Schema Markup**: Structured data for search engines
- **Sitemap**: XML sitemap generation
- **Semantic HTML**: Proper heading hierarchy and structure

## 📱 Accessibility

- **WCAG 2.1 AA Compliant**: Accessible to users with disabilities
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Friendly**: Proper ARIA labels and structure
- **Color Contrast**: 4.5:1 ratio for text
- **Focus Management**: Visible focus indicators
- **Alternative Text**: Descriptive alt text for images

## 🔐 Security

- **Content Security Policy**: XSS protection headers
- **HTTPS Only**: Secure connections required
- **No Inline Scripts**: External JavaScript files only
- **Input Validation**: Client-side form validation
- **Dependency Security**: Regular security updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Contact

**Mihiri Tharushika**
- 📧 Email: [mihiritharushika030@gmail.com](mailto:mihiritharushika030@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/mihiri-tharushika-8b266a322](http://linkedin.com/in/mihiri-tharushika-8b266a322)
- 🐙 GitHub: [github.com/IT22914200](https://github.com/IT22914200)
- 🌐 Portfolio: [IT22914200.github.io/My-Portfolio-tharu](https://IT22914200.github.io/My-Portfolio-tharu)

## 🚀 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Project case studies with detailed descriptions
- [ ] Interactive skill assessments
- [ ] Multi-language support
- [ ] Advanced animations and micro-interactions
- [ ] Integration with headless CMS
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics dashboard

---

⭐ **If you like this project, please give it a star on GitHub!** ⭐

Made with ❤️ and modern web technologies
