#!/usr/bin/env python3
"""Generate all favicon sizes from new_favicon.png"""
from PIL import Image
import os

# Define sizes needed
sizes = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'favicon.png': (32, 32),  # Default favicon
    'apple-touch-icon.png': (180, 180),
    'android-chrome-192x192.png': (192, 192),
    'android-chrome-512x512.png': (512, 512)
}

# Load the source image
source_image = 'images/new_favicon.png'
output_dir = 'images'

print(f"Loading source image: {source_image}")
img = Image.open(source_image)

# Convert to RGBA if needed
if img.mode != 'RGBA':
    img = img.convert('RGBA')

print(f"Source image size: {img.size}")
print(f"Source image mode: {img.mode}")

# Generate each size
for filename, size in sizes.items():
    output_path = os.path.join(output_dir, filename)
    print(f"Generating {filename} at {size}...")
    
    # Resize with high-quality resampling
    resized = img.resize(size, Image.Resampling.LANCZOS)
    
    # Save with optimization
    resized.save(output_path, optimize=True)
    print(f"  ✓ Saved: {output_path}")

# Generate favicon.ico (multi-resolution ICO file)
print("\nGenerating favicon.ico with multiple sizes...")
ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_images = []

for size in ico_sizes:
    resized = img.resize(size, Image.Resampling.LANCZOS)
    ico_images.append(resized)

# Save as ICO with multiple resolutions
ico_images[0].save(
    'favicon.ico',
    format='ICO',
    sizes=ico_sizes,
    append_images=ico_images[1:]
)
print("  ✓ Saved: favicon.ico")

print("\n✅ All favicon sizes generated successfully!")
