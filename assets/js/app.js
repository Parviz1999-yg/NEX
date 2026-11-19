(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const state = {
    mode: null,
    playing: false,
    timer: 0,
    data: {}
  };

  const modes = {
    tavsiya: {
      title: "Tavsiya akkaunt",
      badge: "TAVSIYA",
      accent: "#b69cff",
      fields: [
        { id: "handle", label: "Akkaunt (@username)", type: "text", placeholder: "@foydali_akkaunt" },
        { id: "role", label: "Qisqa tavsif", type: "text", placeholder: "Texnologiya · Dizayn" },
        { id: "hook", label: "Hook matni", type: "textarea", placeholder: "Bu akkauntni ko‘rishga arziydi" },
        { id: "why", label: "Nima uchun tavsiya?", type: "textarea", placeholder: "Har kuni foydali postlar..." },
        { id: "cta", label: "Chorlov", type: "text", placeholder: "Obuna bo‘ling" }
      ]
    },
    fakt: {
      title: "Qiziqarli fakt",
      badge: "FAKT",
      accent: "#ff8c70",
      fields: [
        { id: "number", label: "Fakt raqami / yorliq", type: "text", placeholder: "FAKT 07" },
        { id: "title", label: "Asosiy fakt", type: "textarea", placeholder: "Odam miyasi kuniga taxminan 70 000 ta fikr ishlab chiqaradi" },
        { id: "detail", label: "Qisqa izoh", type: "textarea", placeholder: "Ko‘pchiligi takroriy va avtomatik bo‘ladi" },
        { id: "source", label: "Manba (ixtiyoriy)", type: "text", placeholder: "ilmiy tadqiqot / kitob" }
      ]
    },
    ibora: {
      title: "Kun iborasi",
      badge: "IBORA",
      accent: "#e7c98a",
      fields: [
        { id: "quote", label: "Ibora / sitata", type: "textarea", placeholder: "Kichik qadamlar katta o‘zgarishlarni yaratadi." },
        { id: "author", label: "Muallif (ixtiyoriy)", type: "text", placeholder: "Noma’lum" },
        { id: "mood", label: "Kayfiyat", type: "text", placeholder: "Motivatsiya · Sokin" }
      ]
    },
    manba: {
      title: "Foydali manba",
      badge: "MANBA",
      accent: "#65d9ff",
      fields: [
        { id: "name", label: "Manba nomi", type: "text", placeholder: "YouTube kanal / Telegram / kitob" },
        { id: "type", label: "Turi", type: "text", placeholder: "YouTube · Telegram · Kitob" },
        { id: "why", label: "Nima uchun foydali?", type: "textarea", placeholder: "Amaliy darslar, qisqa va tushunarli" },
        { id: "points", label: "3 ta nuqta (har qatorda)", type: "textarea", placeholder: "Bepul kontent\nAmaliy misollar\nMuntazam yangilanadi" }
      ]
    }
  };

  // ---------- Navigation ----------
  function show(id) {
    $$(".screen").forEach(s => s.classList.toggle("on", s.id === id));
  }

  $$(".mode-card").forEach(btn => {
    btn.addEventListener("click", () => openMode(btn.dataset.mode));
  });

  $("backHome").addEventListener("click", () => {
    stopPlay();
    show("home");
  });

  function openMode(key) {
    state.mode = key;
    const m = modes[key];
    $("modeTitle").textContent = m.title;
    $("modeBadge").textContent = m.badge;
    document.documentElement.style.setProperty("--accent", m.accent);

    const panel = $("formPanel");
    panel.innerHTML = "";
    m.fields.forEach(f => {
      const lab = document.createElement("label");
      lab.textContent = f.label;
      let input;
      if (f.type === "textarea") {
        input = document.createElement("textarea");
        input.rows = 3;
      } else {
        input = document.createElement("input");
        input.type = "text";
      }
      input.id = "f_" + f.id;
      input.placeholder = f.placeholder || "";
      input.addEventListener("input", renderPreview);
      lab.appendChild(input);
      panel.appendChild(lab);
    });

    const applyBtn = document.createElement("button");
    applyBtn.className = "primary";
    applyBtn.textContent = "Preview’ni yangilash";
    applyBtn.style.marginTop = "8px";
    applyBtn.onclick = renderPreview;
    panel.appendChild(applyBtn);

    show("editor");
    renderPreview();
  }

  function getData() {
    const m = modes[state.mode];
    const data = {};
    m.fields.forEach(f => {
      const el = $("f_" + f.id);
      data[f.id] = el ? el.value.trim() : "";
    });
    return data;
  }

  // ---------- Render ----------
  function renderPreview() {
    const data = getData();
    state.data = data;
    const frame = $("frame");
    frame.className = "frame mode-" + state.mode;
    frame.innerHTML = buildHTML(state.mode, data);
    // re-trigger animations
    void frame.offsetWidth;
  }

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  function buildHTML(mode, d) {
    if (mode === "tavsiya") {
      const handle = d.handle || "@akkaunt";
      const letter = (handle.replace(/^@/, "")[0] || "N").toUpperCase();
      return `
        <div class="profile-card anim-slide">
          <div class="av">${esc(letter)}</div>
          <div class="meta">
            <b>${esc(handle)}</b>
            <small>${esc(d.role || "Tavsiya etiladi")}</small>
          </div>
        </div>
        <div class="kicker anim-fade" style="animation-delay:.15s">TAVSIYA</div>
        <div class="title anim-fade" style="animation-delay:.25s">${esc(d.hook || "Bu akkauntni ko‘rishga arziydi")}</div>
        <div class="body anim-fade" style="animation-delay:.4s">${esc(d.why || "Foydali kontent va sifatli yondashuv.")}</div>
        <div class="tag-row anim-fade" style="animation-delay:.55s">
          <span class="tag">${esc(d.cta || "Obuna bo‘ling")}</span>
        </div>`;
    }

    if (mode === "fakt") {
      return `
        <div class="fact-stamp anim-stamp">${esc(d.number || "FAKT")}</div>
        <div class="title anim-pop">${esc(d.title || "Qiziqarli fakt shu yerda")}</div>
        <div class="body anim-fade" style="animation-delay:.3s">${esc(d.detail || "")}</div>
        ${d.source ? `<div class="kicker anim-fade" style="animation-delay:.45s;margin-top:16px">${esc(d.source)}</div>` : ""}`;
    }

    if (mode === "ibora") {
      return `
        <div class="quote-mark anim-soft">“</div>
        <div class="title anim-soft" style="animation-delay:.2s">${esc(d.quote || "Kichik qadamlar katta o‘zgarishlarni yaratadi.")}</div>
        <div class="body anim-fade" style="animation-delay:.55s">— ${esc(d.author || "Noma’lum")}</div>
        ${d.mood ? `<div class="kicker anim-fade" style="animation-delay:.7s;margin-top:18px">${esc(d.mood)}</div>` : ""}`;
    }

    if (mode === "manba") {
      const points = (d.points || "").split(/\n+/).map(x => x.trim()).filter(Boolean).slice(0, 3);
      const items = points.length
        ? points.map((p, i) => `<div class="res-item anim-slide" style="animation-delay:${0.25 + i * 0.12}s"><i>${i + 1}</i>${esc(p)}</div>`).join("")
        : `<div class="res-item anim-slide" style="animation-delay:.25s"><i>1</i>${esc(d.why || "Foydali manba")}</div>`;
      return `
        <div class="kicker anim-fade">${esc(d.type || "MANBA")}</div>
        <div class="title anim-fade" style="animation-delay:.15s">${esc(d.name || "Foydali manba")}</div>
        <div class="body anim-fade" style="animation-delay:.3s">${esc(d.why || "")}</div>
        <div class="res-list">${items}</div>`;
    }
    return "";
  }

  // ---------- Playback (simple loop of re-trigger) ----------
  function stopPlay() {
    state.playing = false;
    clearInterval(state.timer);
    $("playBtn").textContent = "▶ Ko‘rish";
    $("recPlay").textContent = "▶ Boshlash";
  }

  function startPlay() {
    if (state.playing) {
      stopPlay();
      return;
    }
    state.playing = true;
    $("playBtn").textContent = "⏸ Pauza";
    $("recPlay").textContent = "⏸ Pauza";
    renderPreview();
    state.timer = setInterval(() => {
      if (!state.playing) return;
      renderPreview();
    }, 3200);
  }

  $("playBtn").addEventListener("click", startPlay);

  // ---------- Recording Mode ----------
  function enterRec(on) {
    const overlay = $("recOverlay");
    if (on) {
      stopPlay();
      const clone = $("frame").cloneNode(true);
      clone.id = "recInner";
      $("recFrame").innerHTML = "";
      $("recFrame").appendChild(clone);
      overlay.hidden = false;
      document.body.classList.add("recording");
      $("recStatus").textContent = "RECORDING MODE · 9:16 · " + (modes[state.mode]?.badge || "NEX");
    } else {
      overlay.hidden = true;
      document.body.classList.remove("recording");
      stopPlay();
    }
  }

  $("recBtn").addEventListener("click", () => enterRec(true));
  $("recExit").addEventListener("click", () => enterRec(false));
  $("recPlay").addEventListener("click", () => {
    if (!state.playing) {
      // re-render into rec frame too
      const data = state.data;
      const inner = $("recInner") || $("recFrame").querySelector(".frame");
      if (inner) {
        inner.className = "frame mode-" + state.mode;
        inner.innerHTML = buildHTML(state.mode, data);
        void inner.offsetWidth;
      }
    }
    startPlay();
  });

  // keep rec frame in sync when playing
  const _render = renderPreview;
  renderPreview = function () {
    _render();
    if (!$("recOverlay").hidden) {
      const data = state.data;
      let inner = $("recInner");
      if (!inner) {
        inner = document.createElement("div");
        inner.id = "recInner";
        inner.className = "frame mode-" + state.mode;
        $("recFrame").innerHTML = "";
        $("recFrame").appendChild(inner);
      }
      inner.className = "frame mode-" + state.mode;
      inner.innerHTML = buildHTML(state.mode, data);
      void inner.offsetWidth;
    }
  };
})();
