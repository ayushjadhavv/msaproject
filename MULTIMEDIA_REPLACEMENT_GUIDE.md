# Multimedia Replacement Guide (Local Files)

This guide explains how multimedia is currently wired in the project and how to replace it with your own local files.

## 1) Where multimedia is defined today

All aircraft media is defined in `src/data/jets.js` inside each brand object.

Key media fields for each brand:

- `logoUrl`
- `heroImage`
- `modelImage`
- `modelFile`
- `animationVideo`
- `frontImage`
- `galleryImages` (array)
- `audioUrl`
- `overview`
- `design`
- `operationalUse`

The app is now aircraft-focused, so the data file is `src/data/jets.js` rather than `src/data/cars.js`.

## 2) Where each field is used in the UI

- `logoUrl`
  - Brand logo in `src/components/Configurator.jsx`
  - Home page card logo in `src/pages/Home.jsx`
- `heroImage`
  - Hero background in `src/components/HeroSection.jsx`
  - Home page brand card background in `src/pages/Home.jsx`
  - Specs section main preview in `src/components/SpecsSection.jsx`
  - Fallback image in `src/components/GallerySection.jsx`
- `modelImage`
  - Poster/fallback for the audio section in `src/components/AudioSection.jsx`
- `modelFile`
  - 3D model file path stored in `public/3d/`
- `animationVideo`
  - Optional animated aircraft/video background in sections using `src/components/AnimationSection.jsx`
- `frontImage`
  - Primary aircraft preview in `src/components/SpecsSection.jsx`
  - Fallback in `src/components/Configurator.jsx`
- `galleryImages`
  - Main thumbnail/gallery viewer in `src/components/SpecsSection.jsx`
  - The current UI supports multiple thumbnails and auto-rotation
- `audioUrl`
  - Engine/audio playback in `src/components/AudioSection.jsx`

## 3) Recommended local folder structure

Place your local assets under `public/` so they can be referenced by absolute URL paths.

Suggested structure:

public/
  3d/
    <brand>-model.glb
  media/
    f35/
      f35_logo.svg
      f35_hero.jpg
      f35_front.jpg
      f35_rear.jpg
      f35_cockpit.jpg
      f35_side1.jpg
      f35_side2.jpg
      f35.mp3
      f35.mp4
    j20/
      j20_logo.svg
      j20_hero.jpg
      j20_front.jpg
      j20_rear.jpg
      j20_cockpit.jpg
      j20_side1.jpg
      j20_side2.jpg
      j20.mp3
      j20.mp4

You can use `jpg`, `png`, or `webp` for images and `mp3` (preferred) or `wav` for audio.

## 4) How to update a brand entry in `src/data/jets.js`

Edit the brand object and replace the paths with your new local asset URLs.

Example:

```js
{
  id: "f35",
  name: "USA",
  heroImage: "/media/f35/f35_hero.jpg",
  logoUrl: "/media/f35/f35_logo.svg",
  modelImage: "/media/f35/f35_hero.jpg",
  modelFile: "/3d/f-35a_lightning_ii.glb",
  animationVideo: "/media/f35/f35.mp4",
  frontImage: "/media/f35/f35_front.jpg",
  galleryImages: [
    "/media/f35/f35_front.jpg",
    "/media/f35/f35_rear.jpg",
    "/media/f35/f35_cockpit.jpg",
    "/media/f35/f35_side1.jpg",
    "/media/f35/f35_side2.jpg",
  ],
  audioUrl: "/media/f35/f35.mp3",
  overview: "...",
  design: "...",
  operationalUse: "...",
}
```

Repeat this for each brand entry you want to update.

## 5) Important notes for local URLs

- Use absolute paths starting with `/media/` or `/3d/`.
- Keep files inside `public/` so the Vite dev server can serve them.
- Do not use relative paths like `../media/...` from the data file.

## 6) Recommended asset sizes and formats

- `logoUrl`
  - Best: SVG or transparent PNG
  - Use a high-resolution asset for clarity
- `heroImage`
  - Recommended ratio: 16:9 or wider
  - Recommended width: 1920px+
- `frontImage`
  - Recommended ratio: ~16:9
  - Recommended width: 1400px+
- `galleryImages`
  - The current UI works well with 4–5 images
  - Keep similar dimensions across all thumbnails
- `audioUrl`
  - Recommended format: `mp3`
  - Keep file size reasonable for fast playback
- `modelFile`
  - Use `.glb` for 3D models
  - Keep under GitHub's 100MB limit if committing directly

## 7) Verification checklist after replacement

1. Run `npm run dev`
2. Open `http://localhost:5174` and verify the Home page loads correctly.
3. Open each brand page, then verify:
   - Hero image appears
   - Specs preview and thumbnail gallery load
   - Audio playback is available
   - Logo appears on the brand card and configurator section
4. Run `npm run build` to confirm production build passes.

## 8) Common mistakes to avoid

- Pointing to the wrong file extension (for example `.jpg` vs `.jpeg`).
- Placing assets outside `public/` and using URL strings.
- Using local file paths that do not start with `/media/` or `/3d/`.
- Committing very large `.glb` or `.mp4` files without Git LFS.
- Forgetting to update both `galleryImages` and `frontImage` for the same brand.

## 9) If you need per-brand video or 3D content

- `modelFile` is used for local `.glb` 3D models stored in `public/3d/`.
- `animationVideo` is used for optional media playback in the animation section.
- If you add new fields, update the relevant component(s) that consume them.
