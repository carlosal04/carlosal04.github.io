#!/usr/bin/env python3
"""Create a simple favicon without PIL/Pillow"""
import struct

# Create a minimal 16x16 ICO file with B&A design
# ICO file format: header + icon directory + image data

# Icon header (6 bytes)
ico_header = struct.pack('<HHH', 
    0,      # Reserved
    1,      # Type: 1 for ICO
    1       # Number of images
)

# Icon directory entry (16 bytes)
ico_dir = struct.pack('<BBBBHHII',
    16,     # Width
    16,     # Height
    0,      # Color palette (0 = no palette)
    0,      # Reserved
    1,      # Color planes
    32,     # Bits per pixel
    0,      # Size of image data (will calculate)
    22      # Offset to image data (6 + 16 = 22)
)

# Create 16x16 BMP data (simplified - solid color with pattern)
# BMP header for ICO
bmp_header = struct.pack('<III',
    40,     # Header size
    16,     # Width
    32,     # Height (doubled for ICO format)
    1 << 16 | 32  # Planes (1) and bit count (32) combined
)

# Create image data (16x16 pixels, BGRA format)
pixels = []
dark_bg = (80, 62, 44, 255)   # #2c3e50 in BGRA
blue = (219, 152, 52, 255)    # #3498db in BGRA

for y in range(16):
    for x in range(16):
        # Draw simple blocks pattern
        if (2 <= y <= 4 and 2 <= x <= 6) or \
           (6 <= y <= 8 and 4 <= x <= 8) or \
           (10 <= y <= 12 and 6 <= x <= 10):
            pixels.append(blue)
        else:
            pixels.append(dark_bg)

# Convert pixels to bytes
pixel_data = b''.join(struct.pack('<BBBB', *p) for p in pixels)

# AND mask (all transparent, so all zeros)
and_mask = b'\x00' * (16 * 4)  # 16 rows * 4 bytes per row

# Combine all parts
image_data = bmp_header + pixel_data + and_mask

# Update size in directory entry
ico_dir_with_size = struct.pack('<BBBBHHII',
    16, 16, 0, 0, 1, 32,
    len(image_data),
    22
)

# Write ICO file
with open('favicon.ico', 'wb') as f:
    f.write(ico_header)
    f.write(ico_dir_with_size)
    f.write(image_data)

print("Created favicon.ico successfully!")
