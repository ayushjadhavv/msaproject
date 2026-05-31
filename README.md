# Fighter Jet Showcase

A React + Vite multimedia showcase for six modern fighter jets, built with Tailwind CSS, framer-motion, React Router, and immersive media support.

## Overview

This project presents a data-driven fighter jet experience with:

- A home grid of jet cards featuring national logos, hero backgrounds, and hover effects
- Individual jet pages with hero sections, specs, gallery thumbnails, audio playback, and story details
- Animated transitions, autoplaying aircraft views, and lazy-loaded media for faster perceived performance
- Support for local image, audio, video, and 3D model assets in `public/media/` and `public/3d/`

## Key Features

- Responsive React app with client-side routing using `react-router-dom`
- Jet-specific media loaded from `src/data/jets.js`
- Auto-rotating image thumbnails in the specs section
- Mute toggle for homepage background audio and deferred audio loading when muted
- Preloaded hero images and logos for faster landing experiences
- Configurator-style brand story section with `overview`, `design`, and `operationalUse`
- Extra aircraft specs toggle for deeper technical details

## Project Structure

- `src/App.jsx` — app entry and routing
- `src/pages/Home.jsx` — landing page and jet selection grid
- `src/pages/aircraftage.jsx` — individual jet detail page
- `src/data/jets.js` — aircraft metadata and media paths
- `src/components/` — reusable UI sections such as `HeroSection`, `SpecsSection`, `AudioSection`, `Configurator`, and `Navbar`
- `public/media/` — hero, gallery, logo, audio, and video assets
- `public/3d/` — local `.glb` model files

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- framer-motion
- howler
- @google/model-viewer
- React Router DOM

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local dev server URL shown in the terminal (typically `http://localhost:5174`).

## Build

```bash
npm run build
```

## Usage

- Navigate to the homepage to browse the fighter jet cards.
- Click a jet card to open its detailed page.
- Use the mute button on the homepage to toggle background audio.
- On a jet page, explore the auto-rotating gallery and read the aircraft story.

## Media Setup

Local aircraft assets belong in `public/media/<brand>/` and should use absolute paths in `src/data/jets.js`.

Example file structure:

```
public/
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
  3d/
    chengdu_j-20.glb
    f-35a_lightning_ii.glb
    kf-21a_boramae_fighter_jet.glb
    hal_tejas.glb
    sukhoi_su-57_felon_p_-_fighter_jet_-_free.glb
```

## Multimedia Requirements

The project includes the following required multimedia components:

a. Bitmap Images (min 2)
- Used for hero images, gallery photos, and brand visuals.
- Example files: `hero.jpg`, `front.jpg`, `rear.jpg`, `cockpit.jpg`, `side1.jpg`, `side2.jpg`.
- These should be created or captured by the team and placed in `public/media/<brand>/`.

b. Vector Images (min 2)
- Used for brand logos and other scalable graphics.
- Example files: `logo.svg` or `logo.png`.
- These should be created by the team in a vector tool and exported to `public/media/<brand>/`.

c. 3D model rendered by the team
- 3D assets are stored in `public/3d/` and referenced via `modelFile` in `src/data/jets.js`.
- Example files: `*.glb` models such as `f-35a_lightning_ii.glb`.
- The model is used for immersive aircraft presentation and can be rendered from a team-created 3D scene.

d. Appropriate Digital Audio created or edited by the team
- Audio files are stored in `public/media/<brand>/` and used by `AudioSection.jsx`.
- Example file: `f35.mp3` or `j20.mp3`.
- Also includes homepage background audio if configured.

e. Animation created by the team
- Animation is implemented through React, CSS, and framer-motion transitions in the UI.
- Additional brand animations can use `animationVideo` fields and local video assets.
- The team-created animation can be a rendered video or motion sequence exported to `public/media/<brand>/*.mp4`.

f. Navigational structure
- Navigation is built with `react-router-dom` in `src/App.jsx`.
- Routes:
  - `/` — Home page
  - `/jet/:brandId` — Jet detail page
- `Navbar.jsx` and `BrandNav.jsx` provide local project navigation and brand switching.

## Tools Used

### Tools by multimedia type
- Bitmap images
  - Creation/edit: Adobe Photoshop, GIMP, Affinity Photo, Krita, or mobile camera capture
  - Export formats: JPG, PNG, WebP
  - Used for: `heroImage`, `frontImage`, `galleryImages`, and background visuals in the app

- Vector images
  - Creation/edit: Adobe Illustrator, Inkscape, Figma, Sketch, or Affinity Designer
  - Export formats: SVG or PNG
  - Used for: `logoUrl` and scalable brand graphics on cards and pages

- 3D models
  - Creation/rendering: Blender, Autodesk Maya, Cinema 4D, SketchUp, or 3ds Max
  - Export format: `.glb` for compatibility with the app and `@google/model-viewer`
  - Used for: `modelFile` in the `public/3d/` directory and immersive aircraft presentation

- Digital audio
  - Creation/edit: Audacity, Ableton Live, GarageBand, Reaper, FL Studio, or Adobe Audition
  - Export formats: MP3 or WAV
  - Used for: `audioUrl` engine sounds and optional homepage audio playback

- Animation
  - Creation/edit: Adobe After Effects, Blender animation tools, Figma Motion, Premiere Pro, or CSS/JavaScript motion design
  - Export formats: MP4 video files or animated WebM assets
  - Used for: optional `animationVideo` fields and UI motion rendered through `framer-motion`

- Navigation structure
  - Creation/edit: Visual Studio Code or any code editor
  - Implementation: `react-router-dom` in `src/App.jsx`, `Navbar.jsx`, and `BrandNav.jsx`
  - Used for: route-based navigation between `/` and `/jet/:brandId`

### Development tool usage summary
- `Vite` — runs the dev server, provides fast refresh, and bundles the app for production.
- `React` — builds the component-based UI and handles state.
- `Tailwind CSS` — styles responsive layouts and visual presentation.
- `react-router-dom` — manages client-side navigation between pages.
- `framer-motion` — powers animated transitions and hover motion effects.
- `howler` — handles audio playback, mute state, and browser compatibility.
- `@google/model-viewer` — renders `.glb` 3D models if the app uses embedded 3D content.

### Where each multimedia tool is used
- Bitmap assets are displayed in `Home.jsx`, `SpecsSection.jsx`, `Configurator.jsx`, and `GallerySection.jsx`.
- Vector assets are displayed as logos in `Home.jsx` and `Configurator.jsx`.
- 3D model assets are referenced in `src/data/jets.js` and displayed through model viewer components.
- Audio assets are loaded in `AudioSection.jsx` and controlled by the homepage mute button.
- Animation is implemented in UI components and can be extended by adding `animationVideo` assets.

## Data File

`src/data/jets.js` contains the brand objects and media references for each fighter jet, including:

- `id`, `name`, `tagline`, `model`, `year`
- `accentColor`, `heroImage`, `logoUrl`, `frontImage`, `galleryImages`
- `audioUrl`, `animationVideo`, `modelFile`, `modelEmbedUrl`
- `overview`, `design`, `operationalUse`, `basicSpecs`, `detailedSpecs`, `extraSpecs`

## Notes

- Keep image paths absolute and within `public/` so Vite can serve them correctly.
- Avoid committing very large `.glb` or `.mp4` files directly without Git LFS.
- The homepage preloads a few hero and logo assets for a smoother first impression.

## License

This project is provided as-is for demonstration and learning purposes.
