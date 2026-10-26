import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const TARGET_URL = "http://localhost:3000/thenze-shop/";
const OUTPUT_DIR = path.resolve('screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Launching headless Chrome on port 9222...");
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
    '--window-size=1440,900',
    '--disable-gpu',
    'about:blank'
  ]);

  let versionData = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      versionData = await res.json();
      if (versionData) break;
    } catch {
      await sleep(200);
    }
  }

  if (!versionData) {
    chrome.kill();
    return;
  }

  const newTargetRes = await fetch('http://127.0.0.1:9222/json/new?' + encodeURIComponent(TARGET_URL), { method: 'PUT' });
  const target = await newTargetRes.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(resolve => ws.onopen = resolve);

  let idCounter = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      callbacks.set(id, (res) => {
        if (res.error) reject(res.error);
        else resolve(res.result);
      });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('DOM.enable');

  await sleep(3500);

  async function takeScreenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const filePath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  async function setViewport(width, height, isMobile = false) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile
    });
    await sleep(600);
  }

  // 1. Desktop Hero / Showcase
  await setViewport(1440, 900, false);
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
  await sleep(600);
  await takeScreenshot('01-desktop-hero.png');

  // 2. Desktop Catalog Grid with Prices
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 430);' });
  await sleep(800);
  await takeScreenshot('02-desktop-catalog-grid.png');

  // 3. Product Quick View Modal
  await send('Runtime.evaluate', { expression: `document.querySelector('.product-card').click();` });
  await sleep(1000);
  await takeScreenshot('03-product-modal-view.png');

  // 4. WhatsApp Direct Concierge Checkout Modal
  await send('Runtime.evaluate', { expression: `document.querySelector('.btn-modal-whatsapp').click();` });
  await sleep(1000);
  await takeScreenshot('04-whatsapp-checkout-modal.png');

  // Close modal
  await send('Runtime.evaluate', { expression: `document.querySelector('.modal-close-btn').click();` });
  await sleep(600);

  // 5. Cart Drawer
  await send('Runtime.evaluate', { expression: `document.querySelector('.cart-trigger-btn').click();` });
  await sleep(800);
  await takeScreenshot('05-cart-drawer.png');

  // Close drawer
  await send('Runtime.evaluate', { expression: `document.querySelector('.drawer-close-btn').click();` });
  await sleep(600);

  // 6. Mobile 2-Column Grid (iPhone 14/15) - scroll directly to products
  console.log("Capturing Mobile 2-column view...");
  await setViewport(390, 844, true);
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 680);' });
  await sleep(800);
  await takeScreenshot('06-mobile-2column-grid.png');

  // 7. Mobile 1-Column Detail Showcase (toggle)
  console.log("Capturing Mobile 1-column view...");
  await send('Runtime.evaluate', { expression: `document.querySelector('.mobile-grid-btn').click();` });
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 680);' });
  await sleep(800);
  await takeScreenshot('07-mobile-1column-detail.png');

  // 8. Mobile Bottom-Sheet Product Modal
  console.log("Capturing Mobile Product Bottom-Sheet...");
  await send('Runtime.evaluate', { expression: `document.querySelector('.product-card').click();` });
  await sleep(1000);
  await takeScreenshot('08-mobile-product-modal.png');

  // Close modal
  await send('Runtime.evaluate', { expression: `document.querySelector('.modal-close-btn').click();` });
  await sleep(600);

  // 9. Mobile Navigation Drawer
  console.log("Capturing Mobile Navigation Drawer...");
  await send('Runtime.evaluate', { expression: `document.querySelector('.mobile-toggle-btn').click();` });
  await sleep(800);
  await takeScreenshot('09-mobile-menu-drawer.png');

  ws.close();
  chrome.kill();
  console.log("All screenshots captured with 100% precision!");
}

run().catch(err => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
