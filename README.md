# puppeteer-proxy
(Very) simple Puppeteer server for SEO purposes
It's designed to access only one domain at a time
Launch it, and use it as a proxy to build complete html pages over web apps.
Put it behind a header based routing reverse proxy to make it accessible to only web crawlers such as `googlebot` or `bingbot`

## How to run

### Locally
set the env var called `SERVER_BASE_URL` to the URL you need and run `npm start` or `npm start:dev`

### With DOCKER
Build the Docker image using the already present `Dockerfile` and simply run it, with the `SERVER_BASE_URL` env var set up.

## What does `SERVER_BASE_URL` expect ? 
Just set the domain name and protocol of the server you'd like to see proxied. Don't put a trailing slash. Eg : `https://www.google.com`

## WARNING !
Use it ABSOLUTELY ONLY over websites you trust. The Chrome browser inside runs with no sandbox, and this is a potential security threat.
