/* ===========================================================
   ImageWorks Creative — Home
   Plain vanilla JS. No framework, no build step.
   =========================================================== */

/* -----------------------------------------------------------
   DATA
   ----------------------------------------------------------- */
var SPRITE_1 = 'url(assets/work-sprite-1.png)';
var SPRITE_2 = 'url(assets/work-2.png)';

var WORKS = [
  { bg: SPRITE_1, pos: '50% 0%',  label: 'JRC',           tag: 'Defense' },
  { bg: SPRITE_2, pos: '50% 6%',  label: "St. Michael's", tag: 'Reports' },
  { bg: SPRITE_1, pos: '50% 27%', label: 'JRC — AI',      tag: 'Automation' },
  { bg: SPRITE_1, pos: '50% 42%', label: 'JRC',           tag: 'Web Design' },
  { bg: SPRITE_1, pos: '50% 58%', label: 'JRC',           tag: 'Case Study' },
  { bg: SPRITE_2, pos: '50% 94%', label: "St. Michael's", tag: 'Branding' },
  { bg: SPRITE_1, pos: '50% 74%', label: 'JRC',           tag: 'Culture' },
  { bg: SPRITE_1, pos: '50% 96%', label: 'Federal',       tag: 'Government' }
];

var PARTNERS = [
  { name: 'HERMES Creative Awards',            src: 'assets/logos/hermes.jpg',   h: 76 },
  { name: 'Davey Awards',                      src: 'assets/logos/davey.png',    h: 46 },
  { name: 'Best in Search',                    src: 'assets/logos/bis.png',      h: 76 },
  { name: 'Best Web Design Agencies',          src: 'assets/logos/bwda.png',     h: 54 },
  { name: 'Google Partner',                    src: 'assets/logos/google.jpg',   h: 46 },
  { name: 'Mailchimp',                         src: 'assets/logos/mailchimp.png', h: 68 },
  { name: 'IMA Interactive Media Awards',      src: 'assets/logos/ima.png',      h: 36 },
  { name: 'W3 Awards',                         src: 'assets/logos/w3.png',       h: 76 },
  { name: 'Expertise',                         src: 'assets/logos/expertise.jpg', h: 76 },
  { name: 'Summit International Awards',        src: 'assets/logos/sia.png',      h: 40 },
  { name: 'Vega Digital Awards',               src: 'assets/logos/winner.png',   h: 76 }
];

var TESTIMONIALS = [
  { quote: '"ImageWorks\u2019 branding and marketing strategies have led to a tenfold increase in our organic website traffic."', author: 'Diakon' },
  { quote: '"We have already seen a lot more user engagement than we ever have had in the past. Scott never said no. As a result, I am a hero at work for creating this great new site."', author: 'MAG America' },
  { quote: '"Scott is the only person I\u2019ve talked to who really took the time to understand my marketing needs and helped me make the changes to my website and marketing plan."', author: 'SermonScribe' },
  { quote: '"ImageWorks knew exactly what I needed and provided it quickly and economically."', author: 'The People\u2019s Chemist' },
  { quote: '"Thanks to the IWC team for creating a brand for us which consistently receives rave reviews!"', author: 'BeanTree Learning' },
  { quote: '"We have been extremely happy with their creativeness and are very proud of what they have done for us on our web presence."', author: 'Rosoka' },
  { quote: '"This design is phenomenal! Your team has blown me and my expectations away at every phase! I can hardly wait to start marketing."', author: 'Launch Paw' },
  { quote: '"A big thank you for an amazing website! I absolutely love it! Fabulous work \u2014 I have been bragging about it to everyone!"', author: 'Lowes Island' }
];

/* -----------------------------------------------------------
   RENDER HELPERS
   ----------------------------------------------------------- */
function workCardHTML(w) {
  return '' +
    '<div class="iw-work" style="flex:none;width:300px;border-radius:2px;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(20,40,80,.08),0 10px 26px rgba(20,40,80,.1);">' +
      '<div style="height:30px;display:flex;align-items:center;gap:6px;padding:0 14px;background:#f3f6fb;border-bottom:1px solid #eaeff6;">' +
        '<span style="width:9px;height:9px;border-radius:50%;background:#ff6058;"></span>' +
        '<span style="width:9px;height:9px;border-radius:50%;background:#ffbd2e;"></span>' +
        '<span style="width:9px;height:9px;border-radius:50%;background:#28c840;"></span>' +
      '</div>' +
      '<div style="height:192px;background-image:' + w.bg + ';background-size:100% auto;background-position:' + w.pos + ';background-repeat:no-repeat;"></div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;">' +
        '<span style="font-size:15px;font-weight:700;color:#143c66;">' + w.label + '</span>' +
        '<span style="font-size:11px;font-weight:700;letter-spacing:.5px;color:#80c34a;background:#eef7e4;padding:4px 9px;border-radius:2px;">' + w.tag + '</span>' +
      '</div>' +
    '</div>';
}

function testiCardHTML(t) {
  return '' +
    '<div style="flex:none;width:380px;padding:28px;border-radius:2px;background:#fff;box-shadow:0 1px 3px rgba(20,40,80,.1),0 12px 30px rgba(20,40,80,.12);display:flex;flex-direction:column;">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">' +
        '<span style="font-size:16px;font-weight:800;color:#1266b5;">5.0</span>' +
        '<span style="color:#ffa733;font-size:15px;letter-spacing:1px;">\u2605\u2605\u2605\u2605\u2605</span>' +
      '</div>' +
      '<p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#3d464d;flex:1;">' + t.quote + '</p>' +
      '<div style="font-size:16px;font-weight:700;color:#1266b5;">' + t.author + '</div>' +
    '</div>';
}

function partnerLogoHTML(p) {
  return '<img class="iw-partner" src="' + p.src + '" alt="' + p.name + '" height="' + p.h + '" style="flex:none;width:auto;display:block;object-fit:contain;"/>';
}

function joinHTML(list, fn) {
  return list.map(fn).join('');
}

/* fill a marquee track with two copies of the content for a seamless loop */
function fillTrack(id, html) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = html + html;
}

/* marquees move side-to-side driven by scroll position (no auto-play) */
function initScrollMarquee() {
  var tracks = [].slice.call(document.querySelectorAll('.iw-track[data-mq]'));
  if (!tracks.length) return;
  var SPEED = 0.35; // marquee px per px scrolled
  function update() {
    var y = window.scrollY || window.pageYOffset || 0;
    for (var i = 0; i < tracks.length; i++) {
      var t = tracks[i];
      var half = t.scrollWidth / 2;          // content is duplicated -> half = one loop
      if (!half) continue;                    // hidden/empty track
      var d = (y * SPEED) % half;             // 0..half, wraps seamlessly
      var x = t.getAttribute('data-mq') === 'rev' ? (d - half) : -d;
      t.style.transform = 'translate3d(' + x + 'px,0,0)';
    }
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('load', update);
}

function buildShowcase() {
  var worksFwd = joinHTML(WORKS, workCardHTML);
  var worksRev = joinHTML(WORKS.slice().reverse(), workCardHTML);
  var partners = joinHTML(PARTNERS, partnerLogoHTML);
  var testiA   = joinHTML(TESTIMONIALS.slice(0, 4), testiCardHTML);
  var testiB   = joinHTML(TESTIMONIALS.slice(4, 8), testiCardHTML);

  // scroll mode
  fillTrack('track-scroll-works-a', worksFwd);
  fillTrack('track-scroll-works-b', worksRev);
  fillTrack('track-scroll-partners', partners);
  fillTrack('track-scroll-testi-a', testiA);
  fillTrack('track-scroll-testi-b', testiB);
}

/* -----------------------------------------------------------
   SCROLL REVEAL + COUNT-UP (IntersectionObserver)
   ----------------------------------------------------------- */
var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el) {
  var raw = el.getAttribute('data-countup');
  var target = parseFloat(raw);
  var dec = raw.indexOf('.') >= 0 ? 1 : 0;
  var pre = el.getAttribute('data-prefix') || '';
  var suf = el.getAttribute('data-suffix') || '';
  var dur = 1500;
  var t0 = performance.now();
  function fmt(n) { return dec ? n.toFixed(1) : Math.round(n).toLocaleString('en-US'); }
  function tick(t) {
    var p = Math.min(1, (t - t0) / dur);
    var e = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + fmt(target * e) + suf;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = pre + fmt(target) + suf;
  }
  requestAnimationFrame(tick);
}

function initObservers() {
  var reveals = document.querySelectorAll('.iw-reveal');
  var counts  = document.querySelectorAll('[data-countup]');

  if (REDUCE || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
    counts.forEach(function (el) {
      var pre = el.getAttribute('data-prefix') || '';
      var suf = el.getAttribute('data-suffix') || '';
      var raw = el.getAttribute('data-countup');
      var dec = raw.indexOf('.') >= 0 ? 1 : 0;
      el.textContent = pre + (dec ? parseFloat(raw).toFixed(1) : Math.round(parseFloat(raw)).toLocaleString('en-US')) + suf;
    });
    return;
  }

  // prime count-up displays to zero
  counts.forEach(function (el) {
    el.textContent = (el.getAttribute('data-prefix') || '') + '0' + (el.getAttribute('data-suffix') || '');
  });

  var revealObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  reveals.forEach(function (el) { revealObs.observe(el); });

  var countObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { countUp(en.target); obs.unobserve(en.target); }
    });
  }, { threshold: 0.4 });
  counts.forEach(function (el) { countObs.observe(el); });
}

/* -----------------------------------------------------------
   NAV SHADOW ON SCROLL
   ----------------------------------------------------------- */
function initNav() {
  var nav = document.querySelector('[data-nav]');
  if (!nav) return;
  function onScroll() {
    var y = window.scrollY || 0;
    nav.style.boxShadow = y > 12 ? '0 6px 24px rgba(15,36,64,.10)' : '0 0 0 rgba(0,0,0,0)';
    nav.style.background = y > 12 ? 'rgba(255,255,255,.94)' : 'rgba(255,255,255,.86)';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}



/* -----------------------------------------------------------
   HERO CIRCUIT — routed traces, drawn once onto an offscreen
   board, with signals firing along them. The board is static; only
   the signals move, so a frame costs one blit plus a few strokes.
   Nothing responds to the cursor.
   ----------------------------------------------------------- */
function initCircuit() {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  var canvas = hero.querySelector('[data-circuit]');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var G = 40;                 // routing grid
  var CHAMFER = 12;           // corners are cut at 45°, the way a real board routes
  var TRACES = 22;
  var SIGNALS = 3;            // how many fire at once — sparse on purpose
  var TAIL = 62;              // length of the lit stretch behind the signal head
  var SPEED_MIN = 0.10, SPEED_MAX = 0.22;   // px per ms
  var GAP_MIN = 900, GAP_MAX = 4200;        // dead time before a signal re-fires

  var W = 0, H = 0, dpr = 1;
  var board = document.createElement('canvas');
  var bctx = board.getContext('2d');
  var traces = [];            // each: { pts: [...], seg: [len...], total }
  var signals = [];
  var raf = null, visible = true, last = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }

  // a route: axis-aligned runs that turn at right angles, corners chamfered
  function route(cols, rows) {
    var pts = [];
    var gx = randInt(-1, cols + 1);
    var gy = randInt(-1, rows + 1);
    var horiz = Math.random() < 0.5;
    pts.push({ x: gx * G, y: gy * G });

    var legs = randInt(3, 7);
    for (var i = 0; i < legs; i++) {
      var len = randInt(2, 6) * (Math.random() < 0.5 ? 1 : -1);
      if (horiz) gx = Math.max(-2, Math.min(cols + 2, gx + len));
      else       gy = Math.max(-2, Math.min(rows + 2, gy + len));
      var p = { x: gx * G, y: gy * G };
      var prev = pts[pts.length - 1];
      if (p.x !== prev.x || p.y !== prev.y) pts.push(p);   // clamping can kill a leg
      horiz = !horiz;
    }
    if (pts.length < 2) return null;

    // cut each corner: replace it with two points set back along the two legs
    var out = [pts[0]];
    for (var k = 1; k < pts.length - 1; k++) {
      var c = pts[k], a = pts[k - 1], b = pts[k + 1];
      var la = Math.hypot(c.x - a.x, c.y - a.y);
      var lb = Math.hypot(b.x - c.x, b.y - c.y);
      var ca = Math.min(CHAMFER, la / 2), cb = Math.min(CHAMFER, lb / 2);
      out.push({ x: c.x + (a.x - c.x) / la * ca, y: c.y + (a.y - c.y) / la * ca });
      out.push({ x: c.x + (b.x - c.x) / lb * cb, y: c.y + (b.y - c.y) / lb * cb });
    }
    out.push(pts[pts.length - 1]);

    // arc-length table, so a signal can be placed by distance travelled
    var seg = [], total = 0;
    for (var s = 0; s < out.length - 1; s++) {
      var d = Math.hypot(out[s + 1].x - out[s].x, out[s + 1].y - out[s].y);
      seg.push(d);
      total += d;
    }
    if (total < 120) return null;                          // too stubby to be worth it
    return { pts: out, seg: seg, total: total };
  }

  // where along a route does distance d land
  function at(tr, d) {
    if (d <= 0) return { x: tr.pts[0].x, y: tr.pts[0].y };
    for (var i = 0; i < tr.seg.length; i++) {
      if (d <= tr.seg[i]) {
        var a = tr.pts[i], b = tr.pts[i + 1];
        var t = tr.seg[i] ? d / tr.seg[i] : 0;
        return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      }
      d -= tr.seg[i];
    }
    var last = tr.pts[tr.pts.length - 1];
    return { x: last.x, y: last.y };
  }

  function drawBoard() {
    board.width = Math.round(W * dpr);
    board.height = Math.round(H * dpr);
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bctx.clearRect(0, 0, W, H);

    bctx.lineWidth = 1;
    bctx.lineJoin = 'round';
    bctx.strokeStyle = 'rgba(122,178,238,.17)';
    for (var i = 0; i < traces.length; i++) {
      var pts = traces[i].pts;
      bctx.beginPath();
      bctx.moveTo(pts[0].x, pts[0].y);
      for (var k = 1; k < pts.length; k++) bctx.lineTo(pts[k].x, pts[k].y);
      bctx.stroke();

      // a via at each end of the route
      bctx.fillStyle = 'rgba(140,196,246,.30)';
      for (var e = 0; e < 2; e++) {
        var p = e ? pts[pts.length - 1] : pts[0];
        bctx.beginPath();
        bctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        bctx.fill();
      }
    }
  }

  function fire(sig, now) {
    sig.tr = traces[(Math.random() * traces.length) | 0];
    sig.d = -TAIL;                                          // starts just off the route
    sig.sp = rand(SPEED_MIN, SPEED_MAX);
    sig.wait = 0;
    sig.at = now;
  }

  function build() {
    var r = hero.getBoundingClientRect();
    W = Math.round(r.width);
    H = Math.round(r.height);
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // draw in CSS px

    var cols = Math.ceil(W / G);
    var rows = Math.ceil(H / G);
    traces.length = 0;
    var guard = 0;
    while (traces.length < TRACES && guard++ < TRACES * 8) {
      var t = route(cols, rows);
      if (t) traces.push(t);
    }
    drawBoard();

    var now = (typeof performance !== 'undefined' ? performance.now() : 0);
    signals.length = 0;
    for (var s = 0; s < SIGNALS && traces.length; s++) {
      var sig = {};
      fire(sig, now);
      sig.wait = rand(0, GAP_MAX);            // stagger the first firings
      signals.push(sig);
    }
  }

  function paint(now) {
    var dt = last ? Math.min(now - last, 64) : 16;         // a backgrounded tab can hand
    last = now;                                            // us a huge dt — clamp it

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(board, 0, 0, W, H);

    ctx.lineCap = 'round';
    for (var i = 0; i < signals.length; i++) {
      var sig = signals[i];
      if (sig.wait > 0) { sig.wait -= dt; continue; }      // dark between firings

      sig.d += sig.sp * dt;
      var tr = sig.tr;
      if (sig.d - TAIL > tr.total) {                       // ran off the end
        fire(sig, now);
        sig.wait = rand(GAP_MIN, GAP_MAX);
        continue;
      }

      var head = Math.min(sig.d, tr.total);
      var tail = Math.max(sig.d - TAIL, 0);
      if (head <= tail) continue;

      // fade in as it enters the route and out as it leaves, so nothing pops
      var fade = Math.min(1, sig.d / TAIL, (tr.total - sig.d + TAIL) / TAIL);
      if (fade <= 0) continue;

      var a = at(tr, head), b = at(tr, tail);
      var grad = ctx.createLinearGradient(b.x, b.y, a.x, a.y);
      grad.addColorStop(0, 'rgba(128,195,74,0)');
      grad.addColorStop(1, 'rgba(128,195,74,' + (0.85 * fade).toFixed(3) + ')');

      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      // follow the route between tail and head rather than cutting the corner
      var d = 0;
      for (var k = 0; k < tr.seg.length; k++) {
        var segEnd = d + tr.seg[k];
        if (segEnd > tail && d < head) {
          var p = tr.pts[k + 1];
          if (segEnd < head) ctx.lineTo(p.x, p.y);
        }
        d = segEnd;
      }
      ctx.lineTo(a.x, a.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.beginPath();                                     // the head itself
      ctx.arc(a.x, a.y, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(158,222,102,' + (0.95 * fade).toFixed(3) + ')';
      ctx.fill();
    }
  }

  function frame(now) {
    paint(now);
    raf = visible ? requestAnimationFrame(frame) : null;
  }

  build();
  window.addEventListener('resize', function () {
    build();
    if (REDUCE) { ctx.clearRect(0, 0, W, H); ctx.drawImage(board, 0, 0, W, H); }
  }, { passive: true });

  if (REDUCE) {                                            // board only, no signals
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(board, 0, 0, W, H);
    return;
  }

  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    }, { threshold: 0 }).observe(hero);
  }
  raf = requestAnimationFrame(frame);
}

/* -----------------------------------------------------------
   HOW WE DO IT — four steps as tabs on a process rail
   ----------------------------------------------------------- */
function initSteps() {
  var root = document.querySelector('[data-steps]');
  if (!root) return;
  var tabs = [].slice.call(root.querySelectorAll('.iw-steps-tab'));
  var panels = [].slice.call(root.querySelectorAll('.iw-steps-panel'));
  var fill = root.querySelector('[data-steps-fill]');
  if (!tabs.length || tabs.length !== panels.length) return;

  var current = 0;

  function select(i, focus) {
    if (i < 0 || i >= tabs.length) return;
    current = i;
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.classList.toggle('is-active', on);
      t.classList.toggle('is-done', k <= i);   // the rail fills up to where you are
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;                // one tab stop for the whole set
      // no [hidden] here: it would pull the panel out of the grid and let the
      // box resize per step. CSS visibility:hidden keeps the cell — and still
      // takes the panel out of the tab order and the accessibility tree.
      panels[k].classList.toggle('is-active', on);
    });
    // the line lands exactly on the active station (each station sits mid-tab)
    if (fill) fill.style.width = (12.5 + i * 25) + '%';
    if (focus) tabs[i].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(i); });
  });

  root.querySelector('.iw-steps-tabs').addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { select((current + 1) % tabs.length, true); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp') { select((current - 1 + tabs.length) % tabs.length, true); }
    else if (k === 'Home') { select(0, true); }
    else if (k === 'End') { select(tabs.length - 1, true); }
    else return;
    e.preventDefault();
  });

  select(0);
}

/* -----------------------------------------------------------
   BOOT
   ----------------------------------------------------------- */
function boot() {
  buildShowcase();
  initScrollMarquee();
  initObservers();
  initNav();
  initCircuit();
  initSteps();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
