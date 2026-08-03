if (typeof globalThis.process === 'undefined') {
  (globalThis as any).process = { env: {} };
}
