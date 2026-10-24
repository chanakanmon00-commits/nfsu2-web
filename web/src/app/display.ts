// The display side of the shell: the refresh rate (for NFSU2_DISPLAY_HZ, so
// "fps = auto" can follow a 120 Hz screen), the canvas kept at the
// device-pixel size of its box, and full screen with Keyboard Lock (so
// Escape, the game's Back/Pause, reaches the game; hold Escape to leave),
// and the screen kept on while a game runs.

const COMMON_HZ = [48, 50, 60, 72, 75, 90, 100, 120, 144, 165, 180, 240, 360];

/** Median requestAnimationFrame rate over `frames` frames, snapped to a common refresh rate when close. */
export function measureRefresh(frames = 60): Promise<{ hz: number; raw: number }> {
  return new Promise(resolve => {
    const t: number[] = [];
    const step = (now: number) => {
      t.push(now);
      if (t.length <= frames) { requestAnimationFrame(step); return; }
      const d = t.slice(1).map((x, i) => x - t[i]).sort((a, b) => a - b);
      const raw = 1000 / d[d.length >> 1];
      const snap = COMMON_HZ.reduce((a, b) => Math.abs(b - raw) < Math.abs(a - raw) ? b : a);
      resolve({ hz: Math.abs(snap - raw) / snap < 0.04 ? snap : Math.round(raw), raw });
    };
    requestAnimationFrame(step);
  });
}

/**
 * Keeps canvas.width/height at the device-pixel size of the canvas's CSS
 * box (devicePixelContentBoxSize: exact, no rounding drift at fractional
 * zoom).  The renderer reads canvas.width/height; a WebGPU context's
 * texture follows them by itself.
 */
export function trackCanvasSize(canvas: HTMLCanvasElement, onChange?: (w: number, h: number) => void): () => void {
  const ro = new ResizeObserver(entries => {
    for (const e of entries) {
      const s = e.devicePixelContentBoxSize?.[0];
      const w = s ? s.inlineSize : Math.round(e.contentRect.width * devicePixelRatio);
      const h = s ? s.blockSize : Math.round(e.contentRect.height * devicePixelRatio);
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) { canvas.width = w; canvas.height = h; onChange?.(w, h); }
    }
  });
  try { ro.observe(canvas, { box: 'device-pixel-content-box' }); } catch { ro.observe(canvas); }
  return () => ro.disconnect();
}

/** The next size the observer reports, or the current one after `ms`. */
export function settledSize(canvas: HTMLCanvasElement, ms = 400): Promise<{ w: number; h: number }> {
  return new Promise(resolve => {
    let done = false;
    const finish = () => { if (!done) { done = true; ro.disconnect(); resolve({ w: canvas.width, h: canvas.height }); } };
    const ro = new ResizeObserver(() => requestAnimationFrame(() => requestAnimationFrame(finish)));
    ro.observe(canvas);
    setTimeout(finish, ms);
  });
}

export function isFullscreen(): boolean { return !!document.fullscreenElement; }

/** Full screen on `el` (needs a user gesture), then Keyboard Lock. */
export async function enterFullscreen(el: HTMLElement): Promise<{ ok: boolean; locked: boolean; error?: string }> {
  try {
    if (document.fullscreenElement !== el) await el.requestFullscreen({ navigationUI: 'hide' });
  } catch (e) { return { ok: false, locked: false, error: String(e) }; }
  return { ok: true, locked: await lockKeys() };
}

export async function lockKeys(): Promise<boolean> {
  const kb = (navigator as any).keyboard as { lock?: (codes?: string[]) => Promise<void> } | undefined;
  if (!kb?.lock || !document.fullscreenElement) return false;
  try { await kb.lock(); return true; } catch { return false; }
}

/**
 * The screen kept on while a game runs (Screen Wake Lock): the buttons of a controller do not keep every system's
 * screen awake, so a race with one could dim and lock the screen.  The browser lets the lock go while the page is
 * hidden; it is taken again when the page shows.  Returns the stop.
 */
export function keepScreenOn(log: (s: string) => void): () => void {
  const wl = (navigator as { wakeLock?: { request(t: 'screen'): Promise<WakeLockSentinel> } }).wakeLock;
  if (!wl) { log('[app] no Wake Lock in this browser: the screen may turn off while a controller plays'); return () => {}; }
  let lock: WakeLockSentinel | null = null, asking = false, stopped = false, said = false;
  const take = () => {
    if (stopped || asking || lock || document.hidden) return;
    asking = true;
    wl.request('screen').then(l => {
      if (stopped) { void l.release().catch(() => {}); return; }
      lock = l;
      l.addEventListener('release', () => { if (lock === l) lock = null; });
      if (!said) { said = true; log('[app] the screen stays on while the game runs (Wake Lock)'); }
    }, e => { if (!said) { said = true; log(`[app] Wake Lock refused: ${e}`); } })
      .finally(() => { asking = false; });
  };
  const onVisible = () => { if (!document.hidden) take(); };
  document.addEventListener('visibilitychange', onVisible);
  take();
  return () => {
    stopped = true;
    document.removeEventListener('visibilitychange', onVisible);
    void lock?.release().catch(() => {});
    lock = null;
  };
}

export function exitFullscreen() {
  try { (navigator as any).keyboard?.unlock?.(); } catch { /* not locked */ }
  if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
}
