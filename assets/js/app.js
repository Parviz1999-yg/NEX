(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const cv = $("cv");
  const cx = cv.getContext("2d");
  const recCv = $("recCv");
  const rcx = recCv.getContext("2d");

  const state = {
    mode: "tavsiya",
    playing: false,
    t0: 0,
    raf: 0,
    data: {},
    particles: []
  };

  const accents = {
    tavsiya: "#b69cff",
    fakt: "#ff8c70",
    ibora: "#e7c98a",
    manba: "#65d9ff"
  };

  const modes = {
    tavsiya: {
      title: "Tavsiya akkaunt",
      badge: "TAVSIYA",
      fields: [
        { id: "handle", label: "Akkaunt (@username)", ph: "@foydali_akkaunt" },
        { id: "role", label: "Qisqa tavsif", ph: "Texnologiya · Dizayn" },
        { id: "hook", label: "Hook matni", ph: "Bu akkauntni ko‘rishga arziydi", ta: true },
        { id: "why", label: "Nima uchun?", ph: "Har kuni foydali postlar", ta: true },
        { id: "cta", label: "Chorlov", ph: "Obuna bo‘ling" }
      ]
    },
    fakt: {
      title: "Qiziqarli fakt",
      badge: "FAKT",
      fields: [
        { id: "number", label: "Yorliq", ph: "FAKT 07" },
        { id: "title", label: "Asosiy fakt", ph: "Odam miyasi kuniga ~70 000 fikr ishlab chiqaradi", ta: true },
        { id: "detail", label: "Izoh", ph: "Ko‘pchiligi avtomatik bo‘ladi", ta: true }
      ]
    },
    ibora: {
      title: "Kun iborasi",
      badge: "IBORA",
      fields: [
        { id: "quote", label: "Ibora", ph: "Kichik qadamlar katta o‘zgarishlarni yaratadi.", ta: true },
        { id: "author", label: "Muallif", ph: "Noma’lum" }
      ]
    },
    manba: {
      title: "Foydali manba",
      badge: "MANBA",
      fields: [
        { id: "name", label: "Manba nomi", ph: "YouTube / Telegram / kitob" },
        { id: "type", label: "Turi", ph: "YouTube" },
        { id: "why", label: "Nima uchun foydali?", ph: "Amaliy va tushunarli", ta: true },
        { id: "points", label: "3 nuqta (har qatorda)", ph: "Bepul\nAmaliy\nMuntazam", ta: true }
      ]
    }
  };

  // ---------- UI ----------
  function show(id) {
    $$(".screen").forEach(s => s.classList.toggle("on", s.id === id));
  }

  $$(".mode-card").forEach(b => b.addEventListener("click", () => openMode(b.dataset.mode)));
  $("backHome").addEventListener("click", () => { stop(); show("home"); });

  function openMode(key) {
    state.mode = key;
    const m = modes[key];
    $("modeTitle").textContent = m.title;
    $("modeBadge").textContent = m.badge;
    document.documentElement.style.setProperty("--accent", accents[key]);

    const panel = $("formPanel");
    panel.innerHTML = "";
    m.fields.forEach(f => {
      const lab = document.createElement("label");
      lab.textContent = f.label;
      const input = document.createElement(f.ta ? "textarea" : "input");
      if (!f.ta) input.type = "text";
      else input.rows = 3;
      input.id = "f_" + f.id;
      input.placeholder = f.ph || "";
      input.addEventListener("input", () => { collect(); draw(); });
      lab.appendChild(input);
      panel.appendChild(lab);
    });

    const btn = document.createElement("button");
    btn.className = "primary";
    btn.textContent = "Yangilash";
    btn.style.marginTop = "6px";
    btn.onclick = () => { collect(); draw(); };
    panel.appendChild(btn);

    show("editor");
    collect();
    initParticles();
    draw();
    startLoop();
  }

  function collect() {
    const m = modes[state.mode];
    const d = {};
    m.fields.forEach(f => {
      const el = $("f_" + f.id);
      d[f.id] = el ? el.value.trim() : "";
    });
    state.data = d;
  }

  // ---------- Particles ----------
  function initParticles() {
    state.particles = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2.5,
      v: 0.15 + Math.random() * 0.4,
      a: Math.random() * Math.PI * 2
    }));
  }

  // ---------- Helpers ----------
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function wrap(ctx, text, maxW) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (line && ctx.measureText(test).width > maxW) {
        lines.push(line);
        line = w;
      } else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  }

  // ---------- Draw modes ----------
  function drawFrame(ctx, W, H, t) {
    const d = state.data;
    const mode = state.mode;
    const accent = accents[mode];
    const sec = t / 1000;

    // background
    ctx.fillStyle = "#080b12";
    ctx.fillRect(0, 0, W, H);

    if (mode === "tavsiya") {
      const g = ctx.createRadialGradient(W * 0.5, H * 0.2, 0, W * 0.5, H * 0.2, W * 0.9);
      g.addColorStop(0, "#2a1a4a");
      g.addColorStop(1, "#080b12");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    } else if (mode === "fakt") {
      const g = ctx.createRadialGradient(W * 0.7, H * 0.25, 0, W * 0.5, H * 0.5, W);
      g.addColorStop(0, "#3a1f12");
      g.addColorStop(1, "#080b12");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    } else if (mode === "ibora") {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#10182a");
      g.addColorStop(1, "#080b12");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    } else {
      const g = ctx.createRadialGradient(W * 0.3, H * 0.2, 0, W * 0.5, H * 0.5, W);
      g.addColorStop(0, "#0f2a35");
      g.addColorStop(1, "#080b12");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // floating particles
    state.particles.forEach(p => {
      const x = p.x * W + Math.sin(sec * p.v + p.a) * 12;
      const y = ((p.y + sec * p.v * 0.04) % 1.2) * H - H * 0.1;
      ctx.globalAlpha = 0.25 + 0.35 * Math.abs(Math.sin(sec + p.a));
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(x, y, p.r * (W / 360), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    const progress = easeOut((sec % 3.2) / 1.1);

    if (mode === "tavsiya") drawTavsiya(ctx, W, H, d, accent, progress, sec);
    else if (mode === "fakt") drawFakt(ctx, W, H, d, accent, progress, sec);
    else if (mode === "ibora") drawIbora(ctx, W, H, d, accent, progress, sec);
    else drawManba(ctx, W, H, d, accent, progress, sec);
  }

  function drawTavsiya(ctx, W, H, d, accent, p, sec) {
    const handle = d.handle || "@akkaunt";
    const letter = (handle.replace(/^@/, "")[0] || "N").toUpperCase();

    // profile card
    const cardY = H * 0.22;
    ctx.save();
    ctx.globalAlpha = p;
    ctx.translate((1 - p) * 40, 0);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    roundRect(ctx, W * 0.1, cardY, W * 0.8, H * 0.11, 18);
    ctx.fill();
    ctx.stroke();

    // avatar
    const ax = W * 0.18, ay = cardY + H * 0.055, ar = W * 0.055;
    const grad = ctx.createLinearGradient(ax - ar, ay - ar, ax + ar, ay + ar);
    grad.addColorStop(0, accent);
    grad.addColorStop(1, "#ff2bd6");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(ax, ay, ar, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0b0c14";
    ctx.font = `bold ${Math.floor(W * 0.06)}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, ax, ay + 1);

    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.floor(W * 0.045)}px system-ui`;
    ctx.textAlign = "left";
    ctx.fillText(handle.slice(0, 22), W * 0.28, cardY + H * 0.04);
    ctx.fillStyle = "#9aa6b8";
    ctx.font = `${Math.floor(W * 0.032)}px system-ui`;
    ctx.fillText((d.role || "Tavsiya etiladi").slice(0, 28), W * 0.28, cardY + H * 0.075);
    ctx.restore();

    // orbit rings
    ctx.save();
    ctx.translate(W * 0.78, H * 0.38);
    ctx.rotate(sec * 0.6);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.35 * p;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.arc(0, 0, W * 0.12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // texts
    ctx.textAlign = "center";
    ctx.fillStyle = accent;
    ctx.globalAlpha = p;
    ctx.font = `bold ${Math.floor(W * 0.032)}px system-ui`;
    ctx.fillText("TAVSIYA", W / 2, H * 0.42);

    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.floor(W * 0.07)}px system-ui`;
    const lines = wrap(ctx, d.hook || "Bu akkauntni ko‘rishga arziydi", W * 0.78);
    lines.slice(0, 3).forEach((ln, i) => {
      ctx.globalAlpha = easeOut(p - i * 0.12);
      ctx.fillText(ln, W / 2, H * 0.5 + i * W * 0.085);
    });

    ctx.globalAlpha = p * 0.9;
    ctx.fillStyle = "#c4cedb";
    ctx.font = `${Math.floor(W * 0.036)}px system-ui`;
    const body = wrap(ctx, d.why || "Foydali kontent va sifatli yondashuv.", W * 0.78);
    body.slice(0, 3).forEach((ln, i) => {
      ctx.fillText(ln, W / 2, H * 0.68 + i * W * 0.05);
    });

    // CTA pill
    ctx.globalAlpha = p;
    const cta = d.cta || "Obuna bo‘ling";
    ctx.font = `bold ${Math.floor(W * 0.034)}px system-ui`;
    const tw = ctx.measureText(cta).width + W * 0.08;
    ctx.fillStyle = accent;
    roundRect(ctx, (W - tw) / 2, H * 0.84, tw, H * 0.045, 99);
    ctx.fill();
    ctx.fillStyle = "#10150a";
    ctx.textBaseline = "middle";
    ctx.fillText(cta, W / 2, H * 0.862);
    ctx.globalAlpha = 1;
  }

  function drawFakt(ctx, W, H, d, accent, p, sec) {
    // stamp
    ctx.save();
    ctx.translate(W / 2, H * 0.28);
    ctx.rotate((1 - p) * -0.4);
    ctx.scale(0.6 + 0.4 * p, 0.6 + 0.4 * p);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, W * 0.11, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = accent;
    ctx.font = `bold ${Math.floor(W * 0.04)}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((d.number || "FAKT").slice(0, 10), 0, 0);
    ctx.restore();

    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.floor(W * 0.065)}px system-ui`;
    const lines = wrap(ctx, d.title || "Qiziqarli fakt shu yerda", W * 0.8);
    lines.slice(0, 4).forEach((ln, i) => {
      ctx.globalAlpha = easeOut(p - 0.1 - i * 0.08);
      ctx.fillText(ln, W / 2, H * 0.48 + i * W * 0.08);
    });

    ctx.globalAlpha = p * 0.85;
    ctx.fillStyle = "#c4cedb";
    ctx.font = `${Math.floor(W * 0.036)}px system-ui`;
    const detail = wrap(ctx, d.detail || "", W * 0.78);
    detail.slice(0, 3).forEach((ln, i) => {
      ctx.fillText(ln, W / 2, H * 0.72 + i * W * 0.05);
    });
    ctx.globalAlpha = 1;
  }

  function drawIbora(ctx, W, H, d, accent, p, sec) {
    // big quote
    ctx.globalAlpha = 0.2 * p;
    ctx.fillStyle = accent;
    ctx.font = `bold ${Math.floor(W * 0.28)}px Georgia`;
    ctx.textAlign = "center";
    ctx.fillText("“", W / 2, H * 0.32);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.floor(W * 0.06)}px Georgia`;
    const lines = wrap(ctx, d.quote || "Kichik qadamlar katta o‘zgarishlarni yaratadi.", W * 0.78);
    lines.slice(0, 5).forEach((ln, i) => {
      const a = easeOut(p - i * 0.1);
      ctx.globalAlpha = a;
      ctx.fillText(ln, W / 2, H * 0.42 + i * W * 0.075);
    });

    ctx.globalAlpha = p;
    ctx.fillStyle = accent;
    ctx.font = `${Math.floor(W * 0.035)}px system-ui`;
    ctx.fillText("— " + (d.author || "Noma’lum"), W / 2, H * 0.78);

    // soft line
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.5 * p;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W * 0.3, H * 0.82);
    ctx.lineTo(W * 0.7, H * 0.82);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawManba(ctx, W, H, d, accent, p, sec) {
    ctx.textAlign = "center";
    ctx.fillStyle = accent;
    ctx.globalAlpha = p;
    ctx.font = `bold ${Math.floor(W * 0.03)}px system-ui`;
    ctx.fillText((d.type || "MANBA").toUpperCase(), W / 2, H * 0.2);

    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.floor(W * 0.065)}px system-ui`;
    const titleLines = wrap(ctx, d.name || "Foydali manba", W * 0.8);
    titleLines.slice(0, 2).forEach((ln, i) => {
      ctx.globalAlpha = easeOut(p - i * 0.1);
      ctx.fillText(ln, W / 2, H * 0.28 + i * W * 0.075);
    });

    ctx.globalAlpha = p * 0.85;
    ctx.fillStyle = "#c4cedb";
    ctx.font = `${Math.floor(W * 0.034)}px system-ui`;
    const why = wrap(ctx, d.why || "", W * 0.78);
    why.slice(0, 2).forEach((ln, i) => ctx.fillText(ln, W / 2, H * 0.42 + i * W * 0.045));

    const points = (d.points || "").split(/\n+/).map(x => x.trim()).filter(Boolean).slice(0, 3);
    const list = points.length ? points : ["Amaliy qiymat", "Qulay format", "Tavsiya etiladi"];

    list.forEach((item, i) => {
      const q = easeOut(p - 0.15 - i * 0.12);
      const y = H * 0.55 + i * H * 0.09;
      ctx.globalAlpha = q;
      ctx.fillStyle = "rgba(101,217,255,0.12)";
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      roundRect(ctx, W * 0.12, y, W * 0.76, H * 0.07, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(W * 0.2, y + H * 0.035, W * 0.028, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#061018";
      ctx.font = `bold ${Math.floor(W * 0.032)}px system-ui`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(i + 1), W * 0.2, y + H * 0.035);

      ctx.fillStyle = "#f0f7ff";
      ctx.font = `bold ${Math.floor(W * 0.036)}px system-ui`;
      ctx.textAlign = "left";
      ctx.fillText(item.slice(0, 28), W * 0.28, y + H * 0.035);
    });
    ctx.globalAlpha = 1;
  }

  // ---------- Main draw / loop ----------
  function draw(t = performance.now()) {
    // preview canvas
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const rect = cv.getBoundingClientRect();
    const W = 360, H = 640;
    if (cv.width !== W * dpr) {
      cv.width = W * dpr;
      cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    drawFrame(cx, W, H, t - state.t0);

    // recording canvas (higher res)
    if (!$("recOverlay").hidden) {
      const RW = 1080, RH = 1920;
      if (recCv.width !== RW) {
        recCv.width = RW;
        recCv.height = RH;
      }
      drawFrame(rcx, RW, RH, t - state.t0);
    }
  }

  function loop(t) {
    state.raf = requestAnimationFrame(loop);
    if (!state.playing && state.t0 === 0) state.t0 = t;
    draw(t);
  }

  function startLoop() {
    cancelAnimationFrame(state.raf);
    state.t0 = performance.now();
    state.raf = requestAnimationFrame(loop);
  }

  function stop() {
    state.playing = false;
    $("playBtn").textContent = "▶ Ko‘rish";
    $("recPlay").textContent = "▶ Boshlash";
  }

  $("playBtn").addEventListener("click", () => {
    state.playing = !state.playing;
    state.t0 = performance.now();
    $("playBtn").textContent = state.playing ? "⏸ Pauza" : "▶ Ko‘rish";
    $("recPlay").textContent = state.playing ? "⏸ Pauza" : "▶ Boshlash";
  });

  // Recording mode
  $("recBtn").addEventListener("click", () => {
    stop();
    state.t0 = performance.now();
    $("recOverlay").hidden = false;
    $("recStatus").textContent = "RECORDING · 9:16 · " + (modes[state.mode]?.badge || "NEX");
    draw();
  });

  $("recExit").addEventListener("click", () => {
    $("recOverlay").hidden = true;
    stop();
  });

  $("recPlay").addEventListener("click", () => {
    state.playing = !state.playing;
    state.t0 = performance.now();
    $("recPlay").textContent = state.playing ? "⏸ Pauza" : "▶ Boshlash";
    $("playBtn").textContent = state.playing ? "⏸ Pauza" : "▶ Ko‘rish";
  });

  // initial
  initParticles();
})();
