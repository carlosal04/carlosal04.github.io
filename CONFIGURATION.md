# Website Configuration Guide

This document explains the new configuration system that makes the website easy to customize and maintain.

## Configuration File

All website settings are now centralized in `/js/config.js`. This makes it easy to update URLs, contact information, and other settings without editing multiple files.

### Key Configuration Options

```javascript
const siteConfig = {
  // Base URL - Change this for different environments
  baseUrl: '',  // Leave empty for relative URLs (recommended)
  
  // Site Information
  siteName: 'Basaltos & Agregados',
  
  // Contact Information
  contact: {
    email: 'basaltosconcretos@hotmail.com',
    phone: '+52 998 147 3817',
    whatsapp: '+52 998 147 3817',
    address: {
      street: 'Carretera Tulum - Cobá km 2.5',
      city: 'Tulum',
      state: 'Quintana Roo',
      postalCode: '77760',
      country: 'México'
    }
  },
  
  // Social Media
  social: {
    facebook: 'https://www.facebook.com/people/Basaltos-Concretos/100083079552720/',
    instagram: 'https://www.instagram.com/basaltosyagregados'
  }
};
```

## Multi-Language Client Descriptions

Client information is stored in `/data/clients.json` with multi-language support:

```json
{
  "clients": [
    {
      "id": 1,
      "name": "Client 1",
      "logo": "/images/clients/client-1.svg",
      "description": {
        "en": "Major infrastructure project partner",
        "es": "Socio en proyectos de infraestructura importantes",
        "cn": "重大基础设施项目合作伙伴"
      }
    }
  ]
}
```

### How Multi-Language Works

The client loader automatically detects the current language from the URL:
- `/` or `/index.html` → English (en)
- `/es/` → Spanish (es)
- `/cn/` → Chinese (cn)

And displays the appropriate description for each client.

## Updating Client Logos

### Step 1: Replace Dummy Images

The site currently uses placeholder SVG files in `/images/clients/`:
- `client-1.svg` through `client-6.svg`

To replace them with your actual client logos:

1. **Prepare your logo files**:
   - Format: PNG, JPG, or SVG
   - Size: Approximately 200x100 pixels
   - File size: < 100KB each
   - Transparent background recommended for PNG

2. **Name your files**:
   - Save as `client-1.png`, `client-2.png`, etc.
   - Or keep the names and update the JSON file

3. **Update the JSON**:
   ```json
   {
     "logo": "/images/clients/client-1.png"  // Update extension
   }
   ```

### Step 2: Update Client Names and Descriptions

Edit `/data/clients.json` to reflect your actual clients:

```json
{
  "id": 1,
  "name": "CFE",  // Update to actual client name
  "logo": "/images/clients/cfe-logo.png",
  "description": {
    "en": "Federal Electricity Commission",
    "es": "Comisión Federal de Electricidad",
    "cn": "联邦电力委员会"
  }
}
```

## URL Configuration

### Using Relative URLs (Recommended)

Set `baseUrl: ''` in `config.js` to use relative URLs. This works for:
- Local development
- GitHub Pages
- Any hosting environment

### Using Absolute URLs

If you need absolute URLs for SEO or social media:

```javascript
baseUrl: 'https://www.basaltosyagregados.com'
```

Benefits:
- Better for Open Graph meta tags
- Consistent canonical URLs
- Easier for social media sharing

## Updating Contact Information

All contact information is now in one place:

### Option 1: Update config.js (Recommended)

Edit `/js/config.js`:

```javascript
contact: {
  email: 'your-email@example.com',
  phone: '+52 XXX XXX XXXX',
  whatsapp: '+52 XXX XXX XXXX',
  address: {
    street: 'Your Street Address',
    city: 'Your City',
    state: 'Your State',
    postalCode: '12345',
    country: 'México'
  }
}
```

### Option 2: Update HTML files directly

Contact information appears in:
- `/contact/index.html` - Main contact page
- Future: Could be dynamically loaded from config.js

## Social Media Links

Facebook and Instagram links are automatically updated throughout the site. To change them:

1. Edit `/js/config.js`:
   ```javascript
   social: {
     facebook: 'https://www.facebook.com/your-page',
     instagram: 'https://www.instagram.com/your-account'
   }
   ```

2. Or use find/replace in all HTML files (current implementation)

## Testing Changes

### Local Testing

1. Start a local server:
   ```bash
   python3 -m http.server 8080
   ```

2. Open in browser:
   ```
   http://localhost:8080
   ```

3. Test all languages:
   - English: `http://localhost:8080/`
   - Spanish: `http://localhost:8080/es/`
   - Chinese: `http://localhost:8080/cn/`

### Verify Changes

- [ ] Client logos display correctly
- [ ] Client descriptions show in correct language
- [ ] Contact information is accurate
- [ ] Social media links work
- [ ] All language versions work

## Deployment

Once you've made changes:

```bash
git add .
git commit -m "Update client information and contact details"
git push
```

GitHub Pages will automatically deploy your changes.

## Troubleshooting

### Client logos not showing

1. Check file path in `clients.json`
2. Verify image files exist in `/images/clients/`
3. Check browser console for errors

### Wrong language showing

1. Verify URL path starts with `/es/` or `/cn/`
2. Check browser console for JavaScript errors
3. Clear browser cache

### Contact form not working

The site currently recommends secure form services. To integrate one:
1. Choose a service (Formspree recommended)
2. Follow SETUP_GUIDE.md instructions
3. Update contact page HTML

## Best Practices

1. **Keep URLs relative** - Use `baseUrl: ''` for flexibility
2. **Optimize images** - Keep client logos under 100KB
3. **Test all languages** - Verify changes in EN, ES, and CN
4. **Use version control** - Commit changes regularly
5. **Backup before changes** - Keep a copy of working files

## File Structure

```
├── js/
│   ├── config.js              # Site configuration
│   ├── clients-loader.js      # Client data loader
│   └── modern-script.js       # Main site JavaScript
├── data/
│   └── clients.json           # Client data with translations
├── images/
│   └── clients/               # Client logo images
│       ├── client-1.svg       # Placeholder (replace)
│       ├── client-2.svg       # Placeholder (replace)
│       └── ...
└── contact/
    └── index.html             # Contact page with info
```

## Support

For questions or issues:
1. Check SETUP_GUIDE.md
2. Check CHANGES_SUMMARY.md
3. Review this CONFIGURATION.md
4. Ask in PR comments

---

**Remember**: Always test locally before deploying to production!
