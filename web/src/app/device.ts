// What kind of device the page runs on, for the defaults and the hints that
// differ on phones and touch screens.
//   phone:       the browser says it is a mobile one (Chrome's User-Agent
//                Client Hints; "Mobile" or "iPhone" in the user agent of the
//                others).  Tablets are not phones.
//   touch first: the primary pointer is a finger (phones, tablets), not a
//                laptop whose screen also takes touch.
// The Controls sheet and the hints follow touch first (html[data-touch]).

export function isPhone(): boolean {
  const uad = (navigator as unknown as { userAgentData?: { mobile?: boolean } }).userAgentData;
  return uad?.mobile === true || /Android.+Mobile|iPhone|iPod/.test(navigator.userAgent);
}

export function touchFirst(): boolean { return matchMedia('(pointer: coarse)').matches; }

/** settings.ini keys whose default is another on this device: what applies when neither the file nor the page
 *  address sets them.  Phones: 75% resolution scale (a phone's screen has more pixels than its GPU fills at 60 fps),
 *  and full screen (no browser bars over the game). */
export function deviceDefaults(): Record<string, string> {
  return isPhone() ? { render: 'scale:0.75', fullscreen: 'on' } : {};
}

/** whether the browser shows the page a controller (Chrome: only after a button press on the page) */
export function padSeen(): boolean {
  try { return typeof navigator.getGamepads === 'function' && navigator.getGamepads().some(g => !!g?.connected); }
  catch { return false; }
}

/** html[data-touch] while the primary pointer is a finger (the Controls sheet and the hints show what fits) */
export function markTouch() {
  const q = matchMedia('(pointer: coarse)');
  const set = () => document.documentElement.toggleAttribute('data-touch', q.matches);
  set();
  q.addEventListener('change', set);
}
