// Runs watermark detection off the main thread so the page stays responsive
// with large images. Message in: { id, width, height, buffer, at? }.
importScripts('engine.js');
const ready = loadMaps();

onmessage = async (e) => {
  await ready;
  const { id, width, height, buffer, at } = e.data;
  try {
    postMessage({ id, ...analyzeImage({ width, height, data: new Uint8ClampedArray(buffer) }, at) });
  } catch (err) {
    postMessage({ id, error: String(err) });
  }
};
