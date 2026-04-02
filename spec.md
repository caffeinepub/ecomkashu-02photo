# ecomkashu.02photo

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Landing page with hero section, feature overview, and testimonials
- Product image upload tool (drag & drop zone)
- White background removal/replacement — cinematic 4K realistic output simulation
- UGC Image generation option (show generated lifestyle UGC image for product)
- UGC Video generation option (show simulated UGC product video preview)
- AI generation options: White Background, Cinematic Scene, UGC Image, Product Video
- Before/after comparison module
- Generated image download button
- Free tool — no login required for basic use
- Blob storage for uploaded product images
- Authorization system for future paid tier
- SEO-ready meta tags

### Modify
N/A (new project)

### Remove
N/A (new project)

## Implementation Plan
1. Backend: store uploaded product images using blob-storage, track generation jobs, support listing past results per user session
2. Frontend: full landing page (nav, hero, tool panel, features, testimonials, footer) matching design preview
3. Tool panel: upload dropzone → generation mode selector (White BG / Cinematic / UGC Image / UGC Video) → generate button → before/after result display with download
4. Use AI image generation (via generate_image tool) for white-background 4K product output
5. Mobile responsive layout
6. Free to use — no paywall on basic generation
