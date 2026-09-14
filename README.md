# Schoolent

A temporary brand site for Schoolent. The current edition presents Schoolent in a quiet, black, technology-led holding state and links to the projects already online:

- [KSC · Student Council Transparency Portal](https://ksc.schoolent.cn)
- [Yuvek · Pathway Exploration](https://yuvek.schoolent.cn)
- [Mydeercafe · Campus Coffee Bar](https://cafe.schoolent.cn)

## Local development

    npm install
    npm run dev

Production build:

    npm run build
    npm run preview

The production bundle is written to dist/. Vite uses relative asset paths, so the site can be hosted at a domain root or a subpath.

## GitHub Pages deployment

Before the first deployment, set Settings > Pages > Build and deployment > Source to GitHub Actions. Every push to main then triggers .github/workflows/deploy.yml; the workflow can also be run manually from the Actions page.
