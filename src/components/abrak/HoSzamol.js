"use client";

/**
 * Numerikus segédek a Határozott integrál modulhoz: összetett Simpson-formula,
 * összetett Gauss-formula (a végpontokat nem érinti), és a végpontokban sűrűsödő
 * osztású változata. Az eredmények a modul függvényeire 6–10 értékes jegyre pontosak.
 */

/** Összetett Simpson-szabály. A nem értelmezett (NaN) pontokat kicsit beljebb lépve pótoljuk. */
export function simpson(fn, a, b, n = 2000) {
  if (!(b > a)) {
    if (Math.abs(b - a) < 1e-14) return 0;
    return -simpson(fn, b, a, n);
  }
  const db = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / db;
  const ertek = (x, i) => {
    let y = fn(x);
    if (Number.isFinite(y)) return y;
    // a szakasz szélén az integrandus nem értelmezett (pl. 1/√x): lépjünk beljebb
    for (let k = 1; k <= 4; k++) {
      const el = x + (i === 0 ? 1 : -1) * h * k * 1e-3;
      y = fn(el);
      if (Number.isFinite(y)) return y;
    }
    return 0;
  };
  let s = ertek(a, 0) + ertek(b, 1);
  for (let i = 1; i < db; i++) {
    const x = a + i * h;
    const y = fn(x);
    s += (i % 2 ? 4 : 2) * (Number.isFinite(y) ? y : 0);
  }
  return (s * h) / 3;
}

/* 4 pontos Gauss–Legendre alappontok és súlyok a [−1;1] szakaszon. */
const GP = [-0.8611363115940526, -0.3399810435848563, 0.3399810435848563, 0.8611363115940526];
const GS = [0.3478548451374538, 0.6521451548625461, 0.6521451548625461, 0.3478548451374538];

/**
 * Összetett Gauss-integrálás. A végpontokat SOHA nem értékeli ki, ezért ott is
 * működik, ahol az integrandus a szakasz szélén elszáll (pl. az ívhossz gyöke
 * a félkör végén) — a gömb felszínét így hibátlanul adja vissza.
 */
export function gaussIntegral(fn, a, b, n = 400) {
  if (Math.abs(b - a) < 1e-14) return 0;
  const h = (b - a) / n;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const kozep = a + h * (i + 0.5);
    for (let k = 0; k < 4; k++) {
      const y = fn(kozep + (GP[k] * h) / 2);
      if (Number.isFinite(y)) s += GS[k] * y;
    }
  }
  return (s * h) / 2;
}

/** Numerikus derivált (központi differencia), a szakasz szélén egyoldali. */
export function derivalt(fn, x, h = 1e-5) {
  const l = Math.max(h, Math.abs(x) * h);
  const j = fn(x + l);
  const b = fn(x - l);
  if (Number.isFinite(j) && Number.isFinite(b)) return (j - b) / (2 * l);
  const k = fn(x);
  if (Number.isFinite(j) && Number.isFinite(k)) return (j - k) / l;
  if (Number.isFinite(b) && Number.isFinite(k)) return (k - b) / l;
  return NaN;
}

/**
 * Integrálás a végpontokban sűrűsödő osztással (x = közép − fél·cos t helyettesítés).
 * Ott is pontos, ahol az integrandus a szakasz szélén gyök-szingularitással nő —
 * például a félkör ívhosszánál, ahol az érintő függőleges.
 */
export function gaussVegponti(fn, a, b, n = 300) {
  const kozep = (a + b) / 2;
  const fel = (b - a) / 2;
  return gaussIntegral(
    (t) => {
      const x = kozep - fel * Math.cos(t);
      const y = fn(x);
      return Number.isFinite(y) ? y * fel * Math.sin(t) : 0;
    },
    0,
    Math.PI,
    n,
  );
}

/**
 * Numerikus derivált az [a;b] szakaszra szorítva: a lépés mindig belefér a
 * szakaszba, a széleken egyoldali (másodrendű) képlettel. Így a félkör
 * függőleges érintőjénél sem romlik el az ívhossz.
 */
export function derivaltSzakaszon(fn, x, a, b) {
  const alap = Math.max(1e-6, Math.abs(x) * 1e-6, (b - a) * 1e-7);
  const bal = x - a;
  const jobb = b - x;
  const l = Math.min(alap, Math.max(bal, jobb) / 4);
  if (!(l > 0)) return NaN;
  if (bal >= l && jobb >= l) {
    const j = fn(x + l);
    const k = fn(x - l);
    if (Number.isFinite(j) && Number.isFinite(k)) return (j - k) / (2 * l);
  }
  const irany = jobb >= l ? 1 : -1;
  const f0 = fn(x);
  const f1 = fn(x + irany * l);
  const f2 = fn(x + irany * 2 * l);
  if (Number.isFinite(f0) && Number.isFinite(f1) && Number.isFinite(f2))
    return (irany * (-3 * f0 + 4 * f1 - f2)) / (2 * l);
  return NaN;
}

/** Görbe ívhossza: ∫ √(1 + f′²). */
export function ivhossz(fn, a, b, n = 400) {
  return gaussVegponti(
    (x) => Math.sqrt(1 + Math.pow(derivaltSzakaszon(fn, x, a, b), 2)),
    a,
    b,
    n,
  );
}

/** Forgástest térfogata az x tengely körül: π∫f². */
export function forgasTerfogat(fn, a, b, n = 400) {
  return Math.PI * gaussIntegral((x) => Math.pow(fn(x), 2), a, b, n);
}

/** Forgásfelület felszíne az x tengely körül: 2π∫|f|√(1+f′²). */
export function forgasFelszin(fn, a, b, n = 400) {
  return (
    2 *
    Math.PI *
    gaussVegponti(
      (x) => Math.abs(fn(x)) * Math.sqrt(1 + Math.pow(derivaltSzakaszon(fn, x, a, b), 2)),
      a,
      b,
      n,
    )
  );
}

/** A görbe alatti tartomány jellemzői: terület, statikai nyomatékok, súlypont. */
export function sulypont(fn, a, b, n = 400) {
  const T = gaussIntegral(fn, a, b, n);
  const Sy = gaussIntegral((x) => x * fn(x), a, b, n);
  const Sx = 0.5 * gaussIntegral((x) => Math.pow(fn(x), 2), a, b, n);
  return { T, Sy, Sx, xs: Sy / T, ys: Sx / T };
}

/** Előjeles és abszolút terület egyszerre (a |f| integrálja a valódi terület). */
export function teruletek(fn, a, b, n = 2000) {
  return {
    elojeles: simpson(fn, a, b, n),
    abszolut: simpson((x) => Math.abs(fn(x)), a, b, n),
  };
}

/** Riemann-összeg n egyenlő részre, adott mintavételi móddal. */
export function riemannOsszeg(fn, a, b, n, mod = "bal") {
  const h = (b - a) / n;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const bal = a + i * h;
    const jobb = bal + h;
    let y;
    if (mod === "bal") y = fn(bal);
    else if (mod === "jobb") y = fn(jobb);
    else if (mod === "kozep") y = fn((bal + jobb) / 2);
    else {
      // alsó / felső: a részintervallumon vett minimum, illetve maximum
      let lo = Infinity;
      let hi = -Infinity;
      for (let k = 0; k <= 24; k++) {
        const v = fn(bal + (h * k) / 24);
        if (!Number.isFinite(v)) continue;
        if (v < lo) lo = v;
        if (v > hi) hi = v;
      }
      y = mod === "also" ? lo : hi;
    }
    if (Number.isFinite(y)) s += y * h;
  }
  return s;
}

/** A téglalapok adatai a rajzhoz: [{x0, x1, y}]. */
export function teglalapok(fn, a, b, n, mod = "bal") {
  const h = (b - a) / n;
  const ki = [];
  for (let i = 0; i < n; i++) {
    const bal = a + i * h;
    const jobb = bal + h;
    let y;
    if (mod === "bal") y = fn(bal);
    else if (mod === "jobb") y = fn(jobb);
    else if (mod === "kozep") y = fn((bal + jobb) / 2);
    else {
      let lo = Infinity;
      let hi = -Infinity;
      for (let k = 0; k <= 24; k++) {
        const v = fn(bal + (h * k) / 24);
        if (!Number.isFinite(v)) continue;
        if (v < lo) lo = v;
        if (v > hi) hi = v;
      }
      y = mod === "also" ? lo : hi;
    }
    ki.push({ x0: bal, x1: jobb, y: Number.isFinite(y) ? y : 0 });
  }
  return ki;
}

/** Két folytonos függvény metszéspontjai [a;b]-n (előjelváltás + felezés). */
export function metszespontok(f, g, a, b, db = 600) {
  const k = (x) => f(x) - g(x);
  const ki = [];
  let elozoX = null;
  let elozoY = null;
  for (let i = 0; i <= db; i++) {
    const x = a + ((b - a) * i) / db;
    const y = k(x);
    if (!Number.isFinite(y)) {
      elozoX = null;
      elozoY = null;
      continue;
    }
    const kozel = (g) => ki.length === 0 || Math.abs(g - ki[ki.length - 1]) > (b - a) * 0.004;
    if (Math.abs(y) < 1e-12) {
      // az osztópont pontosan eltalálta a gyököt (pl. x = −1 a 600-as felosztásnál)
      if (kozel(x)) ki.push(x);
    } else if (elozoY !== null && elozoY * y < 0) {
      let lo = elozoX;
      let hi = x;
      let ylo = elozoY;
      for (let j = 0; j < 60; j++) {
        const kz = (lo + hi) / 2;
        const yk = k(kz);
        if (!Number.isFinite(yk)) break;
        if (ylo * yk <= 0) hi = kz;
        else {
          lo = kz;
          ylo = yk;
        }
      }
      const g = (lo + hi) / 2;
      if (kozel(g)) ki.push(g);
    }
    elozoX = x;
    elozoY = y;
  }
  return ki;
}

/** SVG-útvonal egy görbe alatti (vagy két görbe közötti) tartományhoz. */
export function teruletUt(S, also, felso, a, b, db = 160) {
  const pontok = [];
  for (let i = 0; i <= db; i++) {
    const x = a + ((b - a) * i) / db;
    const y = felso(x);
    if (Number.isFinite(y)) pontok.push([S.px(x), S.py(hatarol(y, S))]);
  }
  for (let i = db; i >= 0; i--) {
    const x = a + ((b - a) * i) / db;
    const y = also(x);
    if (Number.isFinite(y)) pontok.push([S.px(x), S.py(hatarol(y, S))]);
  }
  if (pontok.length < 3) return "";
  return `M${pontok.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L")} Z`;
}

function hatarol(y, S) {
  return Math.max(S.yMin, Math.min(S.yMax, y));
}
