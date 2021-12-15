import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import puppeteer from 'puppeteer';


export async function ssr(req: Request, res: Response) {

  let url: string = `${process.env.SERVER_BASE_URL}${req.baseUrl}`;
  // render
  let renderedDom = await render(url);
  // send body to response
  return res.status(StatusCodes.OK).send(renderedDom.html);
}

async function render(url: string): Promise<{ html: any, ttRenderMs?: number }> {
  console.log(`rendering ${url}`)
  const start = Date.now();

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();

  // 1. Intercept network requests.
  await page.setRequestInterception(true);

  page.on('request', req => {
    // 2. Ignore requests for resources that don't produce DOM
    // (images, stylesheets, media).
    const allowlist = ['document', 'script', 'xhr', 'fetch'];
    if (!allowlist.includes(req.resourceType())) {
      console.log(`chrome requesting ${req.url()}`);
      return req.abort();
    }
    // 3. Pass through all other requests.
    req.continue();
  });

  await page.goto(url, { waitUntil: 'networkidle0' });
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();

  return { html };
}

