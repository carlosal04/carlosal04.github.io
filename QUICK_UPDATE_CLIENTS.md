# Quick Guide: Update Client Logos

## 3-Step Process

### Step 1: Add Your Logo Files

Place your client logos in the `/images/clients/` folder:

```
images/clients/
  ├── client-1.png  (your first client logo)
  ├── client-2.png  (your second client logo)
  ├── client-3.png  (your third client logo)
  └── ...
```

**Logo Requirements:**
- Format: PNG, JPG, or SVG
- Size: ~200x100 pixels (will auto-scale)
- File size: < 100KB per logo
- Transparent background recommended

### Step 2: Update Client Names

Edit `/data/clients.json`:

```json
{
  "clients": [
    {
      "id": 1,
      "name": "CFE",  ← Change this
      "logo": "/images/clients/cfe-logo.png",  ← Update filename
      "description": {
        "en": "Federal Electricity Commission",  ← Update descriptions
        "es": "Comisión Federal de Electricidad",
        "cn": "联邦电力委员会"
      }
    },
    ...
  ]
}
```

### Step 3: Test

```bash
# Start local server
python3 -m http.server 8080

# Open in browser
http://localhost:8080

# Check all languages:
# English: http://localhost:8080/
# Spanish: http://localhost:8080/es/
# Chinese: http://localhost:8080/cn/
```

## Example: Replacing First Client

**Before:**
```json
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
```

**After:**
```json
{
  "id": 1,
  "name": "CFE",
  "logo": "/images/clients/cfe-logo.png",
  "description": {
    "en": "Federal Electricity Commission - Energy Infrastructure",
    "es": "Comisión Federal de Electricidad - Infraestructura Energética",
    "cn": "联邦电力委员会 - 能源基础设施"
  }
}
```

## Tips

1. **Keep filenames simple**: `company-name.png` not `Company Logo Final v3.png`
2. **Optimize before upload**: Use TinyPNG.com or similar
3. **Test in all languages**: Make sure descriptions make sense
4. **Consistent sizing**: Try to keep logos similar in size
5. **Backup originals**: Keep high-res versions elsewhere

## Common Issues

### Logo not showing?
- Check filename matches JSON exactly (case-sensitive!)
- Verify file is in `/images/clients/` folder
- Check browser console for 404 errors

### Wrong description language?
- Verify URL path: `/es/` for Spanish, `/cn/` for Chinese
- Clear browser cache (Ctrl+Shift+R)
- Check JSON syntax is valid

### Logo too big/small?
- They auto-scale to fit container
- Max dimensions: 200px wide x 100px tall
- Adjust CSS if needed in `modern-style.css`

## Need Help?

See `CONFIGURATION.md` for complete documentation.
