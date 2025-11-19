# Setup Guide - Completing Your Website Configuration

This guide will help you finalize the website configuration with your actual business information.

## 1. Update Contact Information

### File: `contact/index.html`

**Line ~232: Update Phone Numbers**
```html
<!-- Find and replace -->
<p><strong>Office:</strong> <a href="tel:+52XXXXXXXXXX">+52 XXX XXX XXXX</a></p>
<p><strong>WhatsApp:</strong> <a href="https://wa.me/52XXXXXXXXXX">+52 XXX XXX XXXX</a></p>

<!-- With your actual numbers -->
<p><strong>Office:</strong> <a href="tel:+529993334444">+52 999 333 4444</a></p>
<p><strong>WhatsApp:</strong> <a href="https://wa.me/529993334444">+52 999 333 4444</a></p>
```

**Line ~237: Update Address**
```html
<!-- Replace placeholder address -->
<p><strong>Address:</strong> [Your Address Here]</p>
<p>[City, State, Postal Code]</p>

<!-- With your actual address -->
<p><strong>Address:</strong> Calle Principal 123</p>
<p>Mérida, Yucatán, 97000</p>
```

## 2. Add Google Maps Integration

### Getting Your Google Maps Embed Code

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your business address
3. Click the "Share" button
4. Click "Embed a map" tab
5. Choose map size (we recommend "Medium")
6. Copy the `<iframe>` code

### File: `contact/index.html` (Line ~316)

Replace the existing iframe:
```html
<iframe 
  src="YOUR_GOOGLE_MAPS_EMBED_URL_HERE"
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade"
  title="Basaltos y Agregados Office Location">
</iframe>
```

## 3. Add Client Logos

### Step 1: Create the images/clients directory
```bash
mkdir -p images/clients
```

### Step 2: Add client logo images
Place your client logos in the `images/clients/` folder:
- `client-1.png` (or .jpg, .svg)
- `client-2.png`
- `client-3.png`
- `client-4.png`
- `client-5.png`
- `client-6.png`

**Image Requirements:**
- Format: PNG (transparent background preferred), JPG, or SVG
- Size: Approximately 200x100 pixels (will be auto-scaled)
- File size: Under 100KB each for best performance

### Step 3: Update client information

**File: `data/clients.json`**
```json
{
  "clients": [
    {
      "id": 1,
      "name": "CFE",
      "logo": "/images/clients/cfe-logo.png",
      "description": "Comisión Federal de Electricidad"
    },
    {
      "id": 2,
      "name": "PEMEX",
      "logo": "/images/clients/pemex-logo.png",
      "description": "Petróleos Mexicanos"
    },
    // ... add your actual clients
  ]
}
```

## 4. Verify Social Media Links

The social media links are already configured. Verify these are correct:

- Facebook: `https://www.facebook.com/basaltosyagregados`
- Instagram: `https://www.instagram.com/basaltosyagregados`

If you need to change them, search for these URLs in:
- `index.html` (footer)
- `about/index.html` (footer)
- `contact/index.html` (footer and contact info section)
- `es/index.html` (footer)
- `cn/index.html` (footer)

## 5. Setup Secure Contact Form

Choose one of these secure form services:

### Option A: Formspree (Recommended for GitHub Pages)

1. Go to [formspree.io](https://formspree.io)
2. Sign up for free account
3. Create a new form
4. Copy your form endpoint
5. In `contact/index.html`, replace the form recommendations section with:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <div class="form-group">
    <label for="name">Full Name *</label>
    <input type="text" id="name" name="name" required placeholder="Your name">
  </div>
  
  <div class="form-group">
    <label for="email">Email Address *</label>
    <input type="email" id="email" name="_replyto" required placeholder="your@email.com">
  </div>
  
  <div class="form-group">
    <label for="message">Message *</label>
    <textarea id="message" name="message" required placeholder="Tell us about your project..."></textarea>
  </div>
  
  <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
</form>
```

### Option B: Netlify Forms

If you deploy to Netlify, simply add `data-netlify="true"` to your form:

```html
<form name="contact" method="POST" data-netlify="true" class="contact-form">
  <!-- form fields -->
</form>
```

### Option C: Google Forms

1. Create a form at [forms.google.com](https://forms.google.com)
2. Click "Send" → Get link
3. Add link to your contact page:

```html
<a href="YOUR_GOOGLE_FORM_URL" class="btn btn-primary" target="_blank">
  Fill Out Contact Form
</a>
```

### Option D: Web3Forms

1. Go to [web3forms.com](https://web3forms.com)
2. Get your free access key (no signup needed)
3. Use this form code:

```html
<form action="https://api.web3forms.com/submit" method="POST" class="contact-form">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <!-- form fields -->
</form>
```

## 6. Add Images from Facebook

### Downloading Facebook Images

1. Go to your Facebook page
2. Click on Photos → Albums
3. Right-click on images and "Save Image As..."
4. Save in high resolution

### Optimizing Images

Before uploading to your site:

1. **Resize**: Use consistent dimensions (e.g., 1200x800 for hero images)
2. **Compress**: Use tools like:
   - [TinyPNG](https://tinypng.com) - Free online compression
   - [Squoosh](https://squoosh.app) - Google's image optimizer
   - [ImageOptim](https://imageoptim.com) - Mac app

3. **Convert to WebP** (optional, for better performance):
   - Use Squoosh or online converters
   - Keep PNG/JPG as fallback

### Replacing Images

Replace these images in the `/images/` folder:
- `main-slider.jpg` - Hero background (1920x1080 recommended)
- `logistica.jpg` - About section image (800x600 recommended)
- `featue-bg.jpg` - About page header (1920x600 recommended)
- `call-to-action-bg.jpg` - Contact page header (1920x600 recommended)

## 7. Testing Your Changes

### Local Testing

1. Open a terminal in your project directory
2. Start a local server:
   ```bash
   python3 -m http.server 8080
   ```
3. Open browser to `http://localhost:8080`
4. Test:
   - All three languages (EN, ES, CN)
   - Social media links
   - Contact information
   - Map loads correctly
   - Client logos display
   - Form submission (if configured)

### Deploy to GitHub Pages

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add contact info, maps, and client logos"
   git push
   ```

2. Merge your PR to main branch

3. GitHub Pages will automatically deploy

4. Visit your site at `https://www.basaltosyagregados.com`

## 8. Final Checklist

Before going live, verify:

- [ ] Contact phone numbers updated
- [ ] Office address updated
- [ ] Google Maps showing correct location
- [ ] Client logos added (6 logos)
- [ ] Client names/descriptions updated in JSON
- [ ] Social media links verified
- [ ] Form service configured and tested
- [ ] Images optimized and replaced
- [ ] All pages tested in different browsers
- [ ] Mobile responsive design verified
- [ ] All three languages tested

## Need Help?

If you encounter any issues:

1. Check browser console for errors (F12 → Console)
2. Verify file paths are correct (case-sensitive!)
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check that images are in correct folders
5. Verify JSON syntax in `clients.json` (use [jsonlint.com](https://jsonlint.com))

## Additional Resources

- [Google Maps Embed Guide](https://developers.google.com/maps/documentation/embed/get-started)
- [Formspree Documentation](https://help.formspree.io/)
- [Image Optimization Guide](https://web.dev/fast/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Questions?** Feel free to ask in the PR comments!
