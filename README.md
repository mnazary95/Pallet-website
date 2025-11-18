# HD Pallets - Professional Pallet Solutions Website

A modern, responsive, and professional static website for HD Pallets, a pallet supplier based in Simcoe, Ontario. Built with pure HTML5, CSS3, and vanilla JavaScript for optimal performance and easy deployment on GitHub Pages.

## 🌟 Features

- **Modern Design**: Professional B2B aesthetic with a navy/teal color palette
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Single-Page Layout**: Smooth scrolling navigation for optimal user experience
- **Contact Form**: Integrated with Formspree for easy form submissions
- **SEO Optimized**: Proper meta tags, Open Graph tags, and semantic HTML
- **Accessible**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Fast Loading**: Minimal dependencies and optimized performance
- **GitHub Pages Ready**: Automated deployment via GitHub Actions

## 📁 Project Structure

```
Pallet-website/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # All styles
├── js/
│   └── script.js             # JavaScript functionality
├── assets/
│   └── images/               # Images and favicons
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
└── README.md                 # This file
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mnazary95/Pallet-website.git
   cd Pallet-website
   ```

2. Open `index.html` in your browser:
   - Double-click the file, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000

     # Using Node.js (if you have http-server installed)
     npx http-server

     # Using PHP
     php -S localhost:8000
     ```

3. Visit `http://localhost:8000` in your browser

### GitHub Pages Deployment

#### Method 1: Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. Go to your GitHub repository settings
3. Navigate to **Settings > Pages**
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. The workflow will automatically deploy your site
6. Your site will be live at: `https://mnazary95.github.io/Pallet-website/`

#### Method 2: Manual Deployment

1. Go to **Settings > Pages**
2. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **main** and **/ (root)**
3. Click **Save**
4. Your site will be live shortly at the same URL

### Custom Domain Setup

1. Purchase a domain from a registrar (e.g., GoDaddy, Namecheap, Google Domains)

2. Add a `CNAME` file to the repository root:
   ```bash
   echo "yourdomain.com" > CNAME
   ```

3. Configure DNS records at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: mnazary95.github.io

   Type: A (for apex domain)
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

4. In GitHub Settings > Pages, enter your custom domain and enable HTTPS

## 🛠️ Customization Guide

### Updating Business Information

#### Contact Details
Edit the following in `index.html`:

```html
<!-- Location Section -->
<p>123 Industrial Drive<br>Simcoe, ON N3Y 4K1</p>
<a href="mailto:info@hdpallets.com">info@hdpallets.com</a>
<a href="tel:+15195551234">(519) 555-1234</a>

<!-- Business Hours -->
<div class="hours-row">
    <span>Monday - Friday</span>
    <span>8:00 AM - 5:00 PM</span>
</div>
```

#### Google Maps Integration
Replace the iframe `src` in the Location section (around line 330):

```html
<iframe src="YOUR_GOOGLE_MAPS_EMBED_URL" ...>
```

To get your embed URL:
1. Go to [Google Maps](https://maps.google.com)
2. Search for your business address
3. Click "Share" > "Embed a map"
4. Copy the iframe code and replace the `src` attribute

### Setting Up the Contact Form

The contact form uses [Formspree](https://formspree.io/) (free tier available):

1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form
3. Copy your form endpoint
4. Update `index.html` line ~350:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

Alternative free form services:
- [Basin](https://usebasin.com/)
- [Getform](https://getform.io/)
- [FormSubmit](https://formsubmit.co/)

### Color Scheme Customization

Edit CSS variables in `css/styles.css` (lines 15-30):

```css
:root {
    --primary-navy: #1a365d;      /* Main brand color */
    --primary-dark: #0f2644;      /* Darker shade */
    --accent-teal: #14b8a6;       /* Accent color */
    --accent-teal-dark: #0d9488;  /* Darker accent */
    --accent-teal-light: #5eead4; /* Lighter accent */
    /* ... more variables ... */
}
```

### Typography

The site uses Google Fonts (Inter and Playfair Display). To change fonts:

1. Visit [Google Fonts](https://fonts.google.com/)
2. Select your fonts
3. Update the `<link>` tag in `index.html` (around line 22)
4. Update CSS variables in `css/styles.css`:
   ```css
   --font-primary: 'YourFont', sans-serif;
   --font-display: 'YourDisplayFont', serif;
   ```

### Adding Images

Replace placeholder images with your own:

1. Add images to `assets/images/`
2. Optimize images (recommended tools):
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
3. Update image references in `index.html`

Recommended image sizes:
- Hero background: 1920x1080px
- Service/feature images: 800x600px
- About section: 600x800px
- Favicon: 32x32px and 16x16px
- Open Graph image: 1200x630px

### Favicon Generation

For production, generate proper favicons:

1. Use [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo
3. Download the generated files
4. Replace files in `assets/images/`
5. Update `<head>` tags in `index.html`

## 📊 SEO Optimization

### Update Meta Tags

Edit `index.html` (lines 5-20):

```html
<meta name="description" content="Your description">
<meta name="keywords" content="your, keywords">
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:image" content="your-og-image.jpg">
```

### Submit to Search Engines

1. **Google Search Console**:
   - Visit [search.google.com/search-console](https://search.google.com/search-console)
   - Add your property
   - Verify ownership
   - Submit sitemap

2. **Bing Webmaster Tools**:
   - Visit [bing.com/webmasters](https://www.bing.com/webmasters)
   - Add your site
   - Verify and submit sitemap

3. **Create a sitemap** (optional for single-page sites):
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://yourdomain.com/</loc>
       <lastmod>2024-01-01</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

## 🔧 Technical Details

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- No external dependencies (except Google Fonts)
- Minimal JavaScript (< 10KB)
- CSS file size: ~30KB
- Fast load times (< 2s)

### Accessibility

- Semantic HTML5 elements
- ARIA labels and attributes
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Screen reader friendly
- Focus indicators

## 📝 Content Management

### Updating Services

Edit the Services section in `index.html` (around line 180):

```html
<div class="service-card">
    <div class="service-icon">
        <!-- SVG icon here -->
    </div>
    <h3 class="service-title">Service Name</h3>
    <p class="service-description">Service description...</p>
</div>
```

### Updating "Why Partner With Us"

Edit in `index.html` (around line 260):

```html
<div class="why-card">
    <div class="why-number">01</div>
    <h3>Benefit Title</h3>
    <p>Benefit description...</p>
</div>
```

## 🐛 Troubleshooting

### Form Not Working?

1. Check that Formspree ID is correctly set
2. Verify email address in Formspree dashboard
3. Check browser console for errors
4. Test in incognito mode (to rule out extensions)

### Styles Not Loading?

1. Check file paths are correct
2. Clear browser cache (Ctrl/Cmd + Shift + R)
3. Verify CSS file exists at `css/styles.css`
4. Check browser console for 404 errors

### GitHub Pages Not Deploying?

1. Check Actions tab for deployment status
2. Verify branch settings in repository Settings > Pages
3. Ensure workflow file is at `.github/workflows/deploy.yml`
4. Check that `index.html` is in the root directory

## 📞 Support

For issues or questions:

1. Check the [GitHub Issues](https://github.com/mnazary95/Pallet-website/issues)
2. Review this README
3. Contact the development team

## 📄 License

This project is licensed for use by HD Pallets. All rights reserved.

## 🙏 Credits

- Design & Development: Claude (Anthropic)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: Custom SVG icons
- Form Handling: [Formspree](https://formspree.io/)

---

**Built with ❤️ for HD Pallets | Last Updated: 2024**