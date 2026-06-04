/**
 * SPST — dữ liệu từ data/cards.js (window.CARDS_DATA).
 * correctAnswer: true = tín ngưỡng đúng đắn, false = mê tín dị đoan.
 * Thời gian mỗi câu: Dễ 30s · Vừa 20s · Khó 10s — chỉ đếm sau khi lật thẻ; tạm dừng khi xem video phóng to.
 */

(function () {
  "use strict";

  const POINTS = { easy: 10, medium: 15, hard: 20 };
  const TIME_SEC = { easy: 30, medium: 20, hard: 10 };
  const TUTORIAL_KEY = "mln131-tutorial-v1";

  // Web Audio API Synthesizer for self-contained, premium sound effects
  const AudioFX = {
    ctx: null,

    init() {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    },

    getVolume() {
      const slider = document.getElementById("volumeSlider");
      if (slider) {
        return parseFloat(slider.value);
      }
      return 0.7;
    },

    playClick() {
      const vol = this.getVolume();
      if (vol <= 0) return;

      this.init();
      if (!this.ctx) return;
      const ctx = this.ctx;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Louder and warmer sine click
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.12);

      // Gain calculation (caps at 1.0)
      const targetGain = Math.min(1.0, 1.2 * vol);
      gain.gain.setValueAtTime(targetGain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    },

    playCorrect() {
      const vol = this.getVolume();
      if (vol <= 0) return;

      this.init();
      if (!this.ctx) return;
      const ctx = this.ctx;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      // Crystal-clear bell chime using pure sine waves
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
      notes.forEach((freq, idx) => {
        const timeOffset = idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.005, now + timeOffset + 0.5);

        const targetGain = Math.min(1.0, 0.9 * vol);
        gain.gain.setValueAtTime(targetGain, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.6);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.7);
      });
    },

    playWrong() {
      const vol = this.getVolume();
      if (vol <= 0) return;

      this.init();
      if (!this.ctx) return;
      const ctx = this.ctx;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      // Dissonant, beating buzzer sound at mid-frequencies (perfect for small speakers)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.value = 1200; // Let mid-harmonics pass for clarity

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.linearRampToValueAtTime(280, now + 0.3);

      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(326, now); // Detuned by 6Hz for rapid beating
      osc2.frequency.linearRampToValueAtTime(286, now + 0.3);

      const targetGain = Math.min(1.0, 1.2 * vol);
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.05); // slight attack/hold
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc1.start(now);
      osc1.stop(now + 0.35);
      osc2.start(now);
      osc2.stop(now + 0.35);
    },

    playTimeout() {
      const vol = this.getVolume();
      if (vol <= 0) return;

      this.init();
      if (!this.ctx) return;
      const ctx = this.ctx;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      // Two clear mid-range warning beeps
      const notes = [330, 330];
      notes.forEach((freq, idx) => {
        const timeOffset = idx * 0.15;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + timeOffset);

        const targetGain = Math.min(1.0, 0.9 * vol);
        gain.gain.setValueAtTime(targetGain, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.12);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.15);
      });
    }
  };

  const els = {
    screenIntro: document.getElementById("screenIntro"),
    screenGame: document.getElementById("screenGame"),
    introEnterBtn: document.getElementById("introEnterBtn"),
    introErrorLine: document.getElementById("introErrorLine"),
    pills: /** @type {NodeListOf<HTMLButtonElement>} */ (document.querySelectorAll(".pill[data-difficulty]")),
    scoreBoard: document.getElementById("scoreBoard"),
    scoreValue: document.getElementById("scoreValue"),
    scoreMeta: document.getElementById("scoreMeta"),
    questionTimerWrap: document.getElementById("questionTimerWrap"),
    questionTimerValue: document.getElementById("questionTimerValue"),
    questionTimerFill: document.getElementById("questionTimerFill"),
    flipMaster: document.getElementById("flipMaster"),
    flipInner: document.getElementById("flipInner"),
    flipFront: document.getElementById("flipFront"),
    flipFrontStep: document.getElementById("flipFrontStep"),
    flipFrontTitle: document.getElementById("flipFrontTitle"),
    flipFrontDesc: document.getElementById("flipFrontDesc"),
    flipExpandFab: document.getElementById("flipExpandFab"),
    previewVideo: document.getElementById("previewVideo"),
    previewFallback: document.getElementById("previewFallback"),
    previewFallbackTitle: document.getElementById("previewFallbackTitle"),
    previewFallbackText: document.getElementById("previewFallbackText"),
    cardBadge: document.getElementById("cardBadge"),
    cardStep: document.getElementById("cardStep"),
    progressBar: document.getElementById("progressBar"),
    answersBlock: document.getElementById("answersBlock"),
    answersHint: document.getElementById("answersHint"),
    answerBtns: /** @type {NodeListOf<HTMLButtonElement>} */ (document.querySelectorAll(".answer-g[data-answer]")),
    fsLayer: document.getElementById("fullscreenLayer"),
    fsVideo: document.getElementById("fsVideo"),
    fsFallback: document.getElementById("fsFallback"),
    fsFallbackTitle: document.getElementById("fsFallbackTitle"),
    fsFallbackText: document.getElementById("fsFallbackText"),
    fsTitle: document.getElementById("fsTitle"),
    fsClose: document.getElementById("fsClose"),
    tutorialOverlay: document.getElementById("tutorialOverlay"),
    tutorialKicker: document.getElementById("tutorialKicker"),
    tutorialMsg: document.getElementById("tutorialMsg"),
    tutorialNext: document.getElementById("tutorialNext"),
    tutorialSkip: document.getElementById("tutorialSkip"),
    difficultyGroup: document.getElementById("difficultyGroup"),
    resultPopup: document.getElementById("resultPopup"),
    resultPopupGrid: document.getElementById("resultPopupGrid"),
    resultPopupIcon: document.getElementById("resultPopupIcon"),
    resultPopupKicker: document.getElementById("resultPopupKicker"),
    resultPopupTitle: document.getElementById("resultPopupTitle"),
    resultPopupFootnote: document.getElementById("resultPopupFootnote"),
    resultTextBelief: document.getElementById("resultTextBelief"),
    resultTextSuper: document.getElementById("resultTextSuper"),
    resultChipBelief: document.getElementById("resultChipBelief"),
    resultChipSuper: document.getElementById("resultChipSuper"),
    resultPopupNext: document.getElementById("resultPopupNext"),
    audioToggleBtn: document.getElementById("audioToggleBtn"),
    volumeSlider: document.getElementById("volumeSlider"),
    bgMusic: document.getElementById("bgMusic"),
    resultPopupTheoryExplanation: document.getElementById("resultPopupTheoryExplanation"),
    resultTheoryExplanationText: document.getElementById("resultTheoryExplanationText"),
    resultPopupSummary: document.getElementById("resultPopupSummary"),
    introCardDetailPopup: document.getElementById("introCardDetailPopup"),
    introDetailCloseBackdrop: document.getElementById("introDetailCloseBackdrop"),
    introDetailCloseBtn: document.getElementById("introDetailCloseBtn"),
    introDetailTitle: document.getElementById("introDetailTitle"),
    introDetailBody: document.getElementById("introDetailBody"),
    cardTinNguong: document.getElementById("intro-card-tin-nguong"),
    cardRanhGioi: document.getElementById("intro-card-ranh-gioi"),
    cardMeTin: document.getElementById("intro-card-me-tin"),
  };

  /** @type {"easy"|"medium"|"hard"} */
  let difficulty = "easy";
  /** @type {any[]} */
  let allCards = [];
  /** @type {any[]} */
  let deck = [];
  let index = 0;
  let score = 0;
  let answered = false;
  let stats = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  };
  /** @type {any | null} */
  let current = null;
  let previewLoadId = 0;
  let fsLoadId = 0;

  let gameStarted = false;
  let tutorialActive = false;
  let tutorialStep = 0;

  let timerRemaining = 0;
  let timerTotal = 0;
  /** @type {ReturnType<typeof setInterval> | null} */
  let timerId = null;
  let timerPaused = false;

  /** Đã lật thẻ (mặt clip) — mới mở đáp án + đồng hồ */
  let cardFlipped = false;

  /** Nhạc có đang phát trước khi mở video fullscreen không */
  let musicWasPlayingBeforeFs = false;

  const TUTORIAL_STEPS = [
    {
      target: () => els.difficultyGroup,
      kicker: "Bước 1 / 5",
      msg: "Độ khó: Dễ 30 giây, Vừa 20 giây, Khó 10 giây mỗi câu — đồng hồ chỉ chạy sau khi bạn lật thẻ, và tạm dừng khi xem clip phóng to.",
    },
    {
      target: () => els.flipMaster,
      kicker: "Bước 2 / 5",
      msg: "Mặt pastel là mô tả tình huống — nhấn để lật thẻ. Sau khi lật, dùng nút tròn góc phải để phóng to clip; đóng clip rồi chọn đáp án.",
    },
    {
      target: () => els.answersBlock,
      kicker: "Bước 3 / 5",
      msg: "Hai lựa chọn: Tín ngưỡng đúng đắn (A) hoặc Mê tín dị đoan (B). Chỉ chọn được sau khi đã lật thẻ.",
    },
    {
      target: () => document.querySelector(".top-bar__meta"),
      kicker: "Bước 4 / 5",
      msg: "Đồng hồ và thanh màu vàng bên cạnh điểm. Hết giờ coi như trả lời sai.",
    },
    {
      target: () => document.querySelector(".layout"),
      kicker: "Bước 5 / 5",
      msg: "Sau mỗi câu xem popup giải thích rồi bấm Tiếp tục. Chúc bạn làm tốt!",
    },
  ];

  function resolveMediaUrl(relPath) {
    const s = String(relPath || "").trim();
    if (!s) return "";
    try {
      return new URL(s, document.baseURI || window.location.href).href;
    } catch {
      return s;
    }
  }

  /**
   * @param {HTMLVideoElement} videoEl
   * @param {object} card
   * @param {{ wrap: HTMLElement; title: HTMLElement; text: HTMLElement }} fallbackEls
   * @param {"preview" | "fullscreen"} mode
   */
  function showVideoOrFallback(videoEl, card, fallbackEls, mode = "preview") {
    const rel = card.media && String(card.media).trim();
    const hasSrc = Boolean(rel);

    videoEl.pause();
    videoEl.onerror = null;
    videoEl.removeAttribute("src");
    videoEl.querySelectorAll("source").forEach((s) => s.remove());
    videoEl.load();

    const useFallback = () => {
      videoEl.onerror = null;
      videoEl.removeAttribute("src");
      videoEl.querySelectorAll("source").forEach((s) => s.remove());
      videoEl.load();
      const posterRel = card.poster && String(card.poster).trim();
      if (posterRel) {
        // Hiển thị ảnh poster trực tiếp qua video element (không cần src)
        videoEl.poster = resolveMediaUrl(posterRel);
        videoEl.style.display = "block";
        videoEl.style.objectFit = "cover";
        fallbackEls.wrap.hidden = true;
        fallbackEls.wrap.style.display = "none";
      } else {
        videoEl.removeAttribute("poster");
        videoEl.style.display = "none";
        fallbackEls.wrap.hidden = false;
        fallbackEls.wrap.style.removeProperty("display");
        fallbackEls.title.textContent = card.title || "Tình huống";
        const mediaTip =
          hasSrc && card.media
            ? ` — Không mở được "${String(card.media)}". Kiểm tra file và thử MP4 H.264.`
            : "";
        fallbackEls.text.textContent =
          (card.description || "Thêm file trong media/ và map trong data/cards.js.") + mediaTip;
      }
    };

    const useVideo = () => {
      videoEl.style.display = "block";
      fallbackEls.wrap.hidden = true;
      fallbackEls.wrap.style.display = "none";
    };

    if (!hasSrc) {
      useFallback();
      return;
    }

    const loadId = mode === "fullscreen" ? ++fsLoadId : ++previewLoadId;
    const posterRel = card.poster && String(card.poster).trim();
    videoEl.poster = posterRel ? resolveMediaUrl(posterRel) : "";

    const fail = () => {
      if ((mode === "fullscreen" ? fsLoadId : previewLoadId) !== loadId) return;
      videoEl.onerror = null;
      useFallback();
    };

    videoEl.onerror = fail;
    useVideo();

    videoEl.src = resolveMediaUrl(rel);
    videoEl.load();

    if (mode === "preview") {
      videoEl.controls = false;
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.loop = false;
      videoEl.playsInline = true;

      const primeThumbnail = () => {
        if (previewLoadId !== loadId) return;
        const onSeeked = () => {
          videoEl.removeEventListener("seeked", onSeeked);
          if (previewLoadId !== loadId) return;
          videoEl.pause();
          videoEl.onerror = null;
        };
        videoEl.addEventListener("seeked", onSeeked, { once: true });
        window.setTimeout(() => {
          if (previewLoadId !== loadId) return;
          videoEl.removeEventListener("seeked", onSeeked);
          videoEl.pause();
          videoEl.onerror = null;
        }, 700);
        try {
          const d = videoEl.duration;
          let t = 0.08;
          if (Number.isFinite(d) && d > 0) {
            t = Math.min(0.2, Math.max(0.02, d * 0.01));
          }
          videoEl.currentTime = t;
        } catch {
          videoEl.currentTime = 0;
        }
      };

      let primed = false;
      const onReady = () => {
        if (primed || previewLoadId !== loadId) return;
        if (videoEl.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
        primed = true;
        primeThumbnail();
      };

      videoEl.addEventListener("loadeddata", onReady, { once: true });
      videoEl.addEventListener("canplay", onReady, { once: true });
      if (videoEl.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        queueMicrotask(onReady);
      }
    } else {
      videoEl.controls = true;
      videoEl.muted = false;
      videoEl.loop = false;

      const playFs = () => {
        if (fsLoadId !== loadId) return;
        videoEl.onerror = null;
        videoEl.play().catch(() => {});
      };

      if (videoEl.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        queueMicrotask(playFs);
      } else {
        videoEl.addEventListener("canplay", playFs, { once: true });
      }
    }
  }

  function setDifficulty(d) {
    difficulty = d;
    els.pills.forEach((b) => {
      b.classList.toggle("pill--active", b.dataset.difficulty === d);
    });
    resetStats();
    buildDeck();
    index = 0;
    renderCard();
  }

  function buildDeck() {
    const easy = allCards.filter((c) => c.difficulty === "easy");
    const medium = allCards.filter((c) => c.difficulty === "medium");
    const hard = allCards.filter((c) => c.difficulty === "hard");
    if (difficulty === "easy") deck = shuffle([...easy]).slice(0, 10);
    else if (difficulty === "medium") deck = shuffle([...easy, ...medium]).slice(0, 20);
    else deck = shuffle([...easy, ...medium, ...hard]).slice(0, 30);
    if (deck.length === 0) deck = shuffle([...allCards]).slice(0, 10);

    // UX Detail: Ensure the first card in the deck is a video situation card if the tutorial is not yet completed.
    let seenTutorial = false;
    try {
      seenTutorial = sessionStorage.getItem(TUTORIAL_KEY) === "1";
    } catch {
      seenTutorial = false;
    }
    if (!seenTutorial && deck.length > 0 && deck[0].type === "theory") {
      const firstVideoIdx = deck.findIndex((c) => c.type !== "theory");
      if (firstVideoIdx > 0) {
        const temp = deck[0];
        deck[0] = deck[firstVideoIdx];
        deck[firstVideoIdx] = temp;
      }
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function difficultyLabel(d) {
    if (d === "easy") return "Dễ";
    if (d === "medium") return "Vừa";
    return "Khó";
  }

  function answerToBool(v) {
    if (v === true || v === "true") return true;
    if (v === false || v === "false") return false;
    return false;
  }

  function bindAnswerHover(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }

  function getTimeLimitSec() {
    return TIME_SEC[difficulty] ?? 30;
  }

  function stopQuestionTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    timerPaused = false;
    els.questionTimerWrap.classList.remove("question-timer--paused", "question-timer--urgent");
  }

  function updateTimerDisplay() {
    if (!els.questionTimerValue || !els.questionTimerFill) return;
    els.questionTimerValue.textContent = String(Math.max(0, timerRemaining));
    const p = timerTotal > 0 ? Math.max(0, timerRemaining / timerTotal) : 0;
    els.questionTimerFill.style.transform = `scaleX(${p})`;
    if (els.questionTimerWrap) {
      const urgent = timerRemaining > 0 && timerRemaining <= 5 && !timerPaused;
      els.questionTimerWrap.classList.toggle("question-timer--urgent", urgent);
    }
  }

  function startQuestionTimer() {
    stopQuestionTimer();
    if (!gameStarted || tutorialActive || !current || answered || !cardFlipped) {
      if (!current || !gameStarted) {
        els.questionTimerWrap.hidden = true;
        els.questionTimerWrap.classList.remove("question-timer--urgent");
      }
      return;
    }
    timerTotal = getTimeLimitSec();
    timerRemaining = timerTotal;
    timerPaused = false;
    els.questionTimerWrap.hidden = false;
    els.questionTimerWrap.classList.remove("question-timer--paused", "question-timer--urgent");
    updateTimerDisplay();

    timerId = window.setInterval(() => {
      if (timerPaused || !current || answered) return;
      timerRemaining -= 1;
      updateTimerDisplay();
      if (timerRemaining <= 0) {
        stopQuestionTimer();
        onTimeUp();
      }
    }, 1000);
  }

  function pauseQuestionTimer() {
    if (!timerId && timerRemaining <= 0) return;
    timerPaused = true;
    els.questionTimerWrap.classList.add("question-timer--paused");
  }

  function resumeQuestionTimer() {
    if (!current || answered || tutorialActive || !cardFlipped) return;
    timerPaused = false;
    els.questionTimerWrap.classList.remove("question-timer--paused");
  }

  /** @param {any} card */
  function getDualWhy(card) {
    const belief = String(card.whyBelief || card.explanation || "").trim() || "—";
    const sup = String(card.whySuperstition || "").trim() || "—";
    return { belief, superstition: sup };
  }

  function resetStats() {
    stats = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 }
    };
  }

  function recordAnswer(diff, isCorrect) {
    if (stats[diff]) {
      stats[diff].total += 1;
      if (isCorrect) {
        stats[diff].correct += 1;
      }
    }
  }

  function buildSummaryHtml() {
    const totalCorrect = stats.easy.correct + stats.medium.correct + stats.hard.correct;
    const totalQuestions = stats.easy.total + stats.medium.total + stats.hard.total;
    const pct = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    let rewardTitle = "";
    let rewardDesc = "";
    let rewardIcon = "";

    if (pct === 100) {
      rewardTitle = "Thiên Nhãn Thông";
      rewardDesc = "Bạn có nhãn quan cực kỳ sắc bén, phân biệt ranh giới tâm linh tuyệt đối chính xác!";
      rewardIcon = "🌟";
    } else if (pct >= 80) {
      rewardTitle = "Học Giả Tri Thức";
      rewardDesc = "Kiến thức rất vững vàng! Ranh giới giữa tín ngưỡng và mê tín đối với bạn vô cùng rõ ràng.";
      rewardIcon = "📜";
    } else if (pct >= 50) {
      rewardTitle = "Người Tìm Đường";
      rewardDesc = "Khá tốt! Bạn đã nhận diện được hầu hết các chiêu trò mê tín, chỉ cần cẩn thận hơn ở vài chi tiết.";
      rewardIcon = "🔍";
    } else {
      rewardTitle = "Người Tập Sự";
      rewardDesc = "Hãy tiếp tục rèn luyện bản lĩnh khoa học để không bị cuốn vào các bẫy tâm linh nhé!";
      rewardIcon = "🕯️";
    }

    let tableRowsHtml = "";
    const diffs = [
      { key: "easy", label: "Dễ (Easy)", pts: 10 },
      { key: "medium", label: "Vừa (Medium)", pts: 15 },
      { key: "hard", label: "Khó (Hard)", pts: 20 }
    ];

    diffs.forEach(d => {
      const s = stats[d.key];
      if (s.total > 0) {
        const scoreEarned = s.correct * d.pts;
        tableRowsHtml += `
          <tr style="border-bottom: 1px solid rgba(26, 42, 58, 0.15);">
            <td style="padding: 10px; font-weight: 600; color: #1A2A3A;">${d.label}</td>
            <td style="padding: 10px; text-align: center; color: #2A3C52;">${s.correct} / ${s.total}</td>
            <td style="padding: 10px; text-align: right; font-weight: bold; color: #D4AF37;">+${scoreEarned}</td>
          </tr>
        `;
      }
    });

    const totalScore = stats.easy.correct * 10 + stats.medium.correct * 15 + stats.hard.correct * 20;

    return `
      <div class="summary-card" style="background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 14px; padding: 16px; margin-bottom: 18px; text-align: center;">
        <span style="font-size: 32px; display: block; margin-bottom: 8px;">${rewardIcon}</span>
        <h4 style="font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: bold; color: #D4AF37; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">${rewardTitle}</h4>
        <p style="font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #2A3C52; line-height: 1.45; margin: 0;">${rewardDesc}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; margin-bottom: 10px;">
        <thead>
          <tr style="border-bottom: 2px solid rgba(26, 42, 58, 0.15); font-weight: bold; color: #7A8A9A; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.08em;">
            <th style="padding: 10px; text-align: left;">Cấp độ</th>
            <th style="padding: 10px; text-align: center;">Số câu đúng</th>
            <th style="padding: 10px; text-align: right;">Điểm cộng</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
          <tr style="font-weight: bold; font-size: 0.9rem; background: rgba(26, 42, 58, 0.03);">
            <td style="padding: 12px 10px; color: #1A2A3A;">Tổng cộng</td>
            <td style="padding: 12px 10px; text-align: center; color: #1A2A3A;">${totalCorrect} / ${totalQuestions}</td>
            <td style="padding: 12px 10px; text-align: right; color: #D4AF37; font-size: 1rem;">${totalScore} điểm</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  function hideResultPopup() {
    els.resultPopup.hidden = true;
    els.resultPopup.classList.remove("result-popup--correct", "result-popup--wrong", "result-popup--time", "result-popup--complete");
    document.body.style.overflow = "";
    if (els.resultPopupGrid) els.resultPopupGrid.hidden = false;
    if (els.resultPopupTheoryExplanation) els.resultPopupTheoryExplanation.hidden = true;
    if (els.resultPopupSummary) els.resultPopupSummary.hidden = true;
  }

  /** @param {"correct"|"wrong"|"time"|"complete"} kind */
  function showResultPopup(kind, payload) {
    hideResultPopup();
    els.resultPopup.classList.add(
      kind === "correct"
        ? "result-popup--correct"
        : kind === "wrong"
          ? "result-popup--wrong"
          : kind === "time"
            ? "result-popup--time"
            : "result-popup--complete",
    );

    if (kind === "complete") {
      els.resultPopupGrid.hidden = true;
      if (els.resultPopupTheoryExplanation) els.resultPopupTheoryExplanation.hidden = true;
      els.resultPopupIcon.textContent = "🏁";
      els.resultPopupKicker.textContent = "Kết thúc";
      els.resultPopupTitle.textContent = "Hết bài";
      els.resultPopupFootnote.textContent = `Tổng điểm của bạn: ${payload.score}. Chọn lại độ khó hoặc F5 để chơi lại từ đầu.`;
      els.resultPopupNext.textContent = "Đóng";
      if (els.resultPopupSummary) {
        els.resultPopupSummary.innerHTML = buildSummaryHtml();
        els.resultPopupSummary.hidden = false;
      }
    } else {
      if (els.resultPopupSummary) els.resultPopupSummary.hidden = true;
      const card = payload.card;
      if (card.type === "theory") {
        els.resultPopupGrid.hidden = true;
        if (els.resultPopupTheoryExplanation) {
          els.resultPopupTheoryExplanation.hidden = false;
          els.resultTheoryExplanationText.textContent = card.explanation || "Không có giải thích chi tiết.";
        }
      } else {
        els.resultPopupGrid.hidden = false;
        if (els.resultPopupTheoryExplanation) els.resultPopupTheoryExplanation.hidden = true;

        const { belief, superstition } = getDualWhy(card);
        els.resultTextBelief.textContent = belief;
        els.resultTextSuper.textContent = superstition;

        const correctBool = answerToBool(card.correctAnswer);
        els.resultChipBelief.hidden = !correctBool;
        els.resultChipSuper.hidden = correctBool;

        const beliefCol = els.resultPopupGrid.querySelector(".result-popup__card--belief");
        const superCol = els.resultPopupGrid.querySelector(".result-popup__card--superstition");
        if (beliefCol) {
          beliefCol.classList.toggle("is-correct-answer", correctBool);
        }
        if (superCol) {
          superCol.classList.toggle("is-correct-answer", !correctBool);
        }
      }

      if (kind === "correct") {
        els.resultPopupIcon.textContent = "✓";
        els.resultPopupKicker.textContent = "Tuyệt vời";
        els.resultPopupTitle.textContent = "Đúng rồi!";
        els.resultPopupFootnote.textContent = card.type === "theory"
          ? "Đọc phần giải thích bên dưới để củng cố kiến thức lý thuyết."
          : "Đọc hai góc nhìn bên dưới để củng cố phân biệt tín ngưỡng và mê tín.";
      } else if (kind === "wrong") {
        els.resultPopupIcon.textContent = "✕";
        els.resultPopupKicker.textContent = "Chưa đúng";
        els.resultPopupTitle.textContent = card.type === "theory"
          ? `Sai rồi! Đáp án đúng là ${card.correctAnswer}.`
          : "Sai rồi";
        els.resultPopupFootnote.textContent = card.type === "theory"
          ? "Đọc phần giải thích bên dưới để hiểu thêm."
          : "Đáp án đúng được đánh dấu \"Đáp án đúng\". Đọc giải thích hai phía để hiểu ranh giới.";
      } else {
        els.resultPopupIcon.textContent = "⏱";
        els.resultPopupKicker.textContent = "Hết giờ";
        els.resultPopupTitle.textContent = "Không kịp chọn";
        els.resultPopupFootnote.textContent = card.type === "theory"
          ? `Đáp án đúng là ${card.correctAnswer}. Đọc giải thích bên dưới.`
          : "Lần sau lật thẻ sớm hơn hoặc chọn nhanh hơn trước khi đồng hồ về 0.";
      }
      els.resultPopupNext.textContent = "Tiếp tục";
    }

    els.resultPopup.hidden = false;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => els.resultPopupNext.focus(), 80);
  }

  function revealCorrectButtons() {
    if (!current) return;
    els.answerBtns.forEach((b) => {
      b.disabled = true;
      const isBtnCorrect = current.type === "theory"
        ? (String(b.dataset.answer).trim().toUpperCase() === String(current.correctAnswer).trim().toUpperCase())
        : (answerToBool(b.dataset.answer) === answerToBool(current.correctAnswer));
      
      if (isBtnCorrect) {
        b.classList.add("answer-g--correct", "answer-g--reveal");
      } else {
        b.classList.add("answer-g--dim");
      }
    });
  }

  function clearAnswerButtonState() {
    els.answerBtns.forEach((b) => {
      b.classList.remove("answer-g--correct", "answer-g--wrong", "answer-g--dim", "answer-g--reveal");
    });
  }

  function onTimeUp() {
    if (!current || answered) return;
    answered = true;
    stopQuestionTimer();
    revealCorrectButtons();
    recordAnswer(current.difficulty, false);
    AudioFX.playTimeout();
    showResultPopup("time", { card: current });
  }

  function updateAnswersAvailability() {
    const canChoose = Boolean(current) && cardFlipped && !answered && !tutorialActive;
    if (els.answersHint) {
      els.answersHint.textContent = !current
        ? "—"
        : !cardFlipped
          ? "Lật thẻ trước để mở khóa chọn."
          : "Chọn đáp án trước khi hết giờ.";
    }
    els.answerBtns.forEach((b) => {
      b.disabled = !canChoose;
      b.classList.toggle("answer-g--locked", Boolean(current) && !cardFlipped);
    });
  }

  function flipToBack() {
    if (!current || answered || cardFlipped || tutorialActive) return;
    if (els.flipMaster.classList.contains("flip-master--disabled")) return;
    AudioFX.playClick();
    cardFlipped = true;
    els.flipInner.classList.add("is-flipped");
    els.flipFront.setAttribute("aria-expanded", "true");
    updateAnswersAvailability();
    startQuestionTimer();
  }

  function resetFlipVisual() {
    cardFlipped = false;
    els.flipInner.classList.remove("is-flipped");
    els.flipFront.setAttribute("aria-expanded", "false");
  }

  function renderCard() {
    current = deck[index] || null;
    answered = false;
    hideResultPopup();
    closeFullscreen();
    resetFlipVisual();
    clearAnswerButtonState();

    if (!current) {
      stopQuestionTimer();
      els.questionTimerWrap.hidden = true;
      els.cardStep.textContent = "Xong";
      els.flipFrontTitle.textContent = "Hoàn thành!";
      els.flipFrontDesc.textContent = `Bạn đạt ${score} điểm trong lượt này.`;
      els.flipFrontStep.textContent = "Kết thúc";
      els.flipFront.dataset.pastel = "2";
      els.flipFront.disabled = true;
      els.flipMaster.classList.add("flip-master--disabled");
      showVideoOrFallback(
        els.previewVideo,
        { title: "", description: "", media: "" },
        {
          wrap: els.previewFallback,
          title: els.previewFallbackTitle,
          text: els.previewFallbackText,
        },
      );
      els.cardBadge.textContent = "";
      updateAnswersAvailability();
      els.answersBlock.innerHTML = "";
      els.answerBtns = [];
      updateProgress();
      window.setTimeout(() => showResultPopup("complete", { score }), 400);
      return;
    }

    els.flipMaster.classList.remove("flip-master--disabled");
    els.flipFront.disabled = false;
    els.cardStep.textContent = `Câu ${index + 1} / ${deck.length}`;
    els.flipFrontStep.textContent = `Câu ${index + 1} / ${deck.length}`;
    els.flipFrontTitle.textContent = current.title || "Tình huống";
    els.flipFrontDesc.textContent = current.description || "—";
    els.flipFront.dataset.pastel = String(index % 6);
    els.flipFront.dataset.cardType = current.type === "theory" ? "theory" : "situation";
    // Đặt data-card-type trên layout để CSS ẩn/hiện cột gợi ý
    const layoutEl = document.querySelector(".layout");
    if (layoutEl) layoutEl.dataset.cardType = current.type === "theory" ? "theory" : "situation";
    els.flipFront.setAttribute("aria-label", "Lật thẻ để xem clip và chọn đáp án");
    els.cardBadge.textContent = difficultyLabel(current.difficulty);

    const hintEl = els.flipFront.querySelector(".flip-front__hint");

    if (current.type === "theory") {
      cardFlipped = true;
      els.previewVideo.pause();
      els.previewVideo.style.display = "none";
      els.previewFallback.hidden = true;
      if (hintEl) {
        hintEl.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" class="flip-front__hint-svg" style="vertical-align: middle; margin-right: 4px;">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
          </svg>
          Chọn đáp án đúng
        `;
      }
    } else {
      if (hintEl) {
        hintEl.innerHTML = `
          <svg class="flip-front__hint-svg" viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
            <path
              fill="currentColor"
              d="M12 4a8 8 0 018 8h-2a6 6 0 10-12 0H6a8 8 0 018-8zm0 4a4 4 0 014 4h-2a2 2 0 10-4 0h-2a4 4 0 014-4zm0 4a1 1 0 011 1v1h-2v-1a1 1 0 011-1z"
            />
          </svg>
          Chạm để lật thẻ
        `;
      }
      showVideoOrFallback(els.previewVideo, current, {
        wrap: els.previewFallback,
        title: els.previewFallbackTitle,
        text: els.previewFallbackText,
      });
    }

    renderAnswers();
    updateProgress();
    stopQuestionTimer();

    if (current.type === "theory") {
      els.questionTimerWrap.hidden = false;
      startQuestionTimer();
    } else {
      els.questionTimerWrap.hidden = true;
    }
  }

  function renderAnswers() {
    els.answersBlock.innerHTML = "";
    if (!current) return;

    if (current.type === "theory") {
      const badges = ["A", "B", "C", "D"];
      const iconClasses = ["answer-g--belief", "answer-g--superstition", "answer-g--choice-c", "answer-g--choice-d"];

      current.options.forEach((optText, idx) => {
        const badge = badges[idx] || "?";
        const iconClass = iconClasses[idx % iconClasses.length];

        let cleanText = optText.trim();
        if (cleanText.match(/^[A-D]\.\s*/i)) {
          cleanText = cleanText.replace(/^[A-D]\.\s*/i, "");
        }

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `answer-g ${iconClass}`;
        btn.dataset.answer = badge;

        btn.innerHTML = `
          <span class="answer-g__badge">${badge}</span>
          <span class="answer-g__icon" aria-hidden="true">✦</span>
          <span class="answer-g__body">
            <span class="answer-g__label">${cleanText}</span>
          </span>
          <span class="answer-g__chev" aria-hidden="true">›</span>
        `;

        btn.addEventListener("mousemove", bindAnswerHover);
        btn.addEventListener("click", () => onAnswer(badge));

        els.answersBlock.appendChild(btn);
      });
    } else {
      const btn1 = document.createElement("button");
      btn1.type = "button";
      btn1.className = "answer-g answer-g--belief";
      btn1.dataset.answer = "true";
      btn1.innerHTML = `
        <span class="answer-g__badge">A</span>
        <span class="answer-g__icon" aria-hidden="true">✦</span>
        <span class="answer-g__body">
          <span class="answer-g__label">Tín ngưỡng đúng đắn</span>
          <span class="answer-g__sub">Sinh hoạt lành mạnh, minh bạch</span>
        </span>
        <span class="answer-g__chev" aria-hidden="true">›</span>
      `;
      btn1.addEventListener("mousemove", bindAnswerHover);
      btn1.addEventListener("click", () => onAnswer("true"));

      const btn2 = document.createElement("button");
      btn2.type = "button";
      btn2.className = "answer-g answer-g--superstition";
      btn2.dataset.answer = "false";
      btn2.innerHTML = `
        <span class="answer-g__badge">B</span>
        <span class="answer-g__icon" aria-hidden="true">⚠</span>
        <span class="answer-g__body">
          <span class="answer-g__label">Mê tín dị đoan</span>
          <span class="answer-g__sub">Dọa nạt, hứa hẹn phi lý, trục lợi</span>
        </span>
        <span class="answer-g__chev" aria-hidden="true">›</span>
      `;
      btn2.addEventListener("mousemove", bindAnswerHover);
      btn2.addEventListener("click", () => onAnswer("false"));

      els.answersBlock.appendChild(btn1);
      els.answersBlock.appendChild(btn2);
    }

    els.answerBtns = els.answersBlock.querySelectorAll(".answer-g[data-answer]");
    updateAnswersAvailability();
  }

  function updateProgress() {
    const total = deck.length || 1;
    if (!current) {
      els.progressBar.style.width = "100%";
      els.scoreMeta.textContent = total > 0 ? `${total} / ${total}` : "0 / 0";
      return;
    }
    els.progressBar.style.width = `${((index + 1) / total) * 100}%`;
    els.scoreMeta.textContent = `${index + 1} / ${total}`;
  }

  function updateScoreDisplay(pop) {
    els.scoreValue.textContent = String(score);
    if (pop && els.scoreBoard) {
      els.scoreBoard.classList.remove("score-board--pop");
      void els.scoreBoard.offsetWidth;
      els.scoreBoard.classList.add("score-board--pop");
      window.setTimeout(() => els.scoreBoard.classList.remove("score-board--pop"), 700);
    }
  }

  function openFullscreen() {
    if (tutorialActive) return;
    if (!current || els.flipMaster.classList.contains("flip-master--disabled")) return;
    if (!cardFlipped) return;
    AudioFX.playClick();
    pauseQuestionTimer();
    // Dừng nhạc nền khi xem video
    musicWasPlayingBeforeFs = els.bgMusic ? !els.bgMusic.paused : false;
    if (els.bgMusic && !els.bgMusic.paused) els.bgMusic.pause();
    els.fsLayer.hidden = false;
    els.flipFront.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    els.fsTitle.textContent = "";
    showVideoOrFallback(
      els.fsVideo,
      current,
      {
        wrap: els.fsFallback,
        title: els.fsFallbackTitle,
        text: els.fsFallbackText,
      },
      "fullscreen",
    );
  }

  function closeFullscreen() {
    AudioFX.playClick();
    els.fsLayer.hidden = true;
    document.body.style.overflow = "";
    els.fsVideo.pause();
    els.fsVideo.muted = true;
    els.previewVideo.pause();
    resumeQuestionTimer();
    // Phát lại nhạc nền nếu trước đó đang phát
    if (musicWasPlayingBeforeFs && els.bgMusic) {
      els.bgMusic.play().catch(() => {});
    }
    musicWasPlayingBeforeFs = false;
  }

  function onAnswer(choice) {
    if (!current || answered || tutorialActive || !cardFlipped) return;
    AudioFX.playClick();
    answered = true;
    stopQuestionTimer();
    const isCorrect = current.type === "theory"
      ? (String(choice).trim().toUpperCase() === String(current.correctAnswer).trim().toUpperCase())
      : (answerToBool(choice) === answerToBool(current.correctAnswer));
    const pts = POINTS[current.difficulty] || 10;

    els.answerBtns.forEach((b) => {
      b.disabled = true;
      const isBtnCorrect = current.type === "theory"
        ? (String(b.dataset.answer).trim().toUpperCase() === String(current.correctAnswer).trim().toUpperCase())
        : (answerToBool(b.dataset.answer) === answerToBool(current.correctAnswer));
        
      const isBtnChosen = current.type === "theory"
        ? (String(b.dataset.answer).trim().toUpperCase() === String(choice).trim().toUpperCase())
        : (answerToBool(b.dataset.answer) === answerToBool(choice));

      if (isBtnCorrect) {
        b.classList.add("answer-g--correct", "answer-g--reveal");
      } else if (isBtnChosen && !isCorrect) {
        b.classList.add("answer-g--wrong", "answer-g--reveal");
      } else {
        b.classList.add("answer-g--dim");
      }
    });

    if (isCorrect) {
      score += pts;
      updateScoreDisplay(true);
      document.body.classList.add("fx-correct");
      window.setTimeout(() => document.body.classList.remove("fx-correct"), 800);
      AudioFX.playCorrect();
    } else {
      AudioFX.playWrong();
    }

    recordAnswer(current.difficulty, isCorrect);
    showResultPopup(isCorrect ? "correct" : "wrong", { card: current });
  }

  function nextRound() {
    hideResultPopup();
    index += 1;
    renderCard();
  }

  function onResultPopupNext() {
    if (els.resultPopup.hidden) return;
    AudioFX.playClick();
    const isComplete = els.resultPopup.classList.contains("result-popup--complete");
    if (isComplete) {
      hideResultPopup();
      return;
    }
    nextRound();
  }

  function loadCards() {
    const fromInline = document.getElementById("cards-json");
    let data = window.CARDS_DATA;
    if (!data && fromInline && fromInline.textContent.trim()) {
      try {
        data = JSON.parse(fromInline.textContent);
      } catch (e) {
        throw new Error("Thẻ #cards-json không phải JSON hợp lệ");
      }
    }
    if (!data || typeof data !== "object") {
      throw new Error("Thiếu dữ liệu: cần data/cards.js hoặc #cards-json");
    }
    allCards = Array.isArray(data.cards) ? data.cards : [];
    if (allCards.length === 0) throw new Error("Danh sách cards trống");
  }

  function clearTutorialHighlight() {
    document.querySelectorAll(".tutorial-highlight").forEach((el) => {
      el.classList.remove("tutorial-highlight");
    });
  }

  function showTutorialStep() {
    clearTutorialHighlight();
    const step = TUTORIAL_STEPS[tutorialStep];
    if (!step) {
      finishTutorial();
      return;
    }
    const el = step.target();
    if (el) {
      el.classList.add("tutorial-highlight");
      try {
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } catch {
        /* ignore */
      }
    }
    els.tutorialKicker.textContent = step.kicker;
    els.tutorialMsg.textContent = step.msg;
    const last = tutorialStep >= TUTORIAL_STEPS.length - 1;
    els.tutorialNext.textContent = last ? "Bắt đầu" : "Tiếp";
  }

  function finishTutorial() {
    tutorialActive = false;
    clearTutorialHighlight();
    els.tutorialOverlay.hidden = true;
    try {
      sessionStorage.setItem(TUTORIAL_KEY, "1");
    } catch {
      /* ignore */
    }
    updateAnswersAvailability();
    startQuestionTimer();
  }

  function skipTutorial() {
    tutorialStep = TUTORIAL_STEPS.length;
    finishTutorial();
  }

  function advanceTutorial() {
    tutorialStep += 1;
    if (tutorialStep >= TUTORIAL_STEPS.length) {
      finishTutorial();
    } else {
      showTutorialStep();
    }
  }

  function runTutorialIfNeeded() {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TUTORIAL_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      updateAnswersAvailability();
      startQuestionTimer();
      return;
    }
    tutorialActive = true;
    tutorialStep = 0;
    els.tutorialOverlay.hidden = false;
    showTutorialStep();
  }

  function enterGame() {
    if (els.introEnterBtn.disabled || gameStarted) return;
    AudioFX.playClick();
    document.body.classList.add("game-active");
    els.screenIntro.hidden = true;
    els.screenIntro.setAttribute("aria-hidden", "true");
    els.screenGame.hidden = false;
    gameStarted = true;
    setDifficulty(difficulty);
    runTutorialIfNeeded();
    
    if (els.bgMusic && els.bgMusic.paused) {
      els.bgMusic.play().catch(e => console.log("Auto-play blocked:", e));
    }
  }

  function showIntro() {
    document.body.classList.remove("game-active");
    els.screenIntro.hidden = false;
    els.screenIntro.setAttribute("aria-hidden", "false");
    els.screenGame.hidden = true;
    gameStarted = false;
    stopQuestionTimer();
    hideResultPopup();
    hideIntroCardDetail();
  }

  const INTRO_DETAILS = {
    "tin-nguong": {
      title: "Tín Ngưỡng Lành Mạnh",
      body: `
        <p><strong>Khái niệm:</strong> Tín ngưỡng là niềm tin của con người vào một điều gì đó thiêng liêng, hướng thiện và mang lại sự bình an trong tâm hồn. Tín ngưỡng gắn liền với truyền thống lịch sử, văn hóa, bản sắc dân tộc và sự tôn kính tổ tiên, các thế lực tự nhiên hoặc những anh hùng có công với đất nước.</p>
        <p class="intro-detail-popup__subtitle">Biểu hiện lành mạnh:</p>
        <ul>
          <li>Tôn kính ông bà tổ tiên (thờ cúng gia tiên), thờ các vị anh hùng dân tộc (Thành hoàng, Thánh Gióng, Trần Hưng Đạo...).</li>
          <li>Tham gia các lễ hội truyền thống, viếng chùa cầu an, trẩy hội văn hóa một cách lành mạnh, văn minh.</li>
          <li>Các hoạt động diễn ra công khai, tự nguyện, không bị ép buộc về mặt tài chính.</li>
          <li>Góp phần củng cố đạo đức xã hội, gắn kết cộng đồng và hướng thiện con người.</li>
        </ul>
      `
    },
    "ranh-gioi": {
      title: "Ranh Giới Nhạy Cảm",
      body: `
        <p><strong>Khái niệm:</strong> Ranh giới giữa tín ngưỡng đúng đắn và mê tín dị đoan rất mong manh và thường bị lu mờ bởi nỗi sợ hãi, sự thiếu hiểu biết hoặc lòng tham của con người. Tín ngưỡng lành mạnh sẽ biến tướng thành mê tín dị đoan khi nó bị thương mại hóa, thần thánh hóa thái quá, hoặc lợi dụng để lừa đảo trục lợi.</p>
        <p class="intro-detail-popup__subtitle">Cách phân biệt nhanh:</p>
        <ul>
          <li><strong>Mục đích:</strong> Tín ngưỡng hướng thiện, tìm bình an tinh thần. Mê tín hướng đến đổi vận nhanh, chữa bệnh phi lý và giải trừ tai ương tưởng tượng.</li>
          <li><strong>Yếu tố tài chính:</strong> Tín ngưỡng là tùy tâm, tự nguyện và minh bạch. Mê tín thường bị ép buộc, đòi hỏi chi phí lớn để làm "lễ giải hạn", mua "vật phẩm linh nghiệm" với lời hứa hẹn chắc chắn.</li>
          <li><strong>Tâm lý:</strong> Tín ngưỡng mang lại sự thanh thản, tôn trọng. Mê tín lợi dụng và khoét sâu vào nỗi sợ hãi (bị dọa chết chóc, tai nạn, xui xẻo) để ép buộc thực hiện.</li>
        </ul>
      `
    },
    "me-tin": {
      title: "Mê Tín Dị Đoan",
      body: `
        <p><strong>Khái niệm:</strong> Mê tín dị đoan là niềm tin mù quáng, cực đoan vào các lực lượng siêu nhiên, thần thánh một cách phi lý, phản khoa học, dẫn đến những hành vi tiêu cực, ảnh hưởng xấu tới sức khỏe, thời gian, tiền bạc của cá nhân và gây mất trật tự xã hội.</p>
        <p class="intro-detail-popup__subtitle">Biểu hiện tiêu cực:</p>
        <ul>
          <li>Tin vào bói toán vô căn cứ, nghe theo lời thầy phán đoán chắc chắn để chia rẽ gia đình, bỏ lỡ cơ hội.</li>
          <li>Thực hiện các nghi lễ kỳ dị, cúng bái giải hạn tốn kém tiền của một cách mù quáng vì bị đe dọa gặp tai họa.</li>
          <li>Chữa bệnh bằng các biện pháp phản khoa học (uống nước tàn hương, dán bùa trừ tà thay vì đi bệnh viện), đe dọa trực tiếp đến tính mạng.</li>
          <li>Có dấu hiệu trục lợi tài chính rõ ràng của những đối tượng hành nghề tâm linh lừa đảo.</li>
        </ul>
      `
    }
  };

  function showIntroCardDetail(cardId) {
    const data = INTRO_DETAILS[cardId];
    if (!data) return;
    els.introDetailTitle.textContent = data.title;
    els.introDetailBody.innerHTML = data.body;
    els.introCardDetailPopup.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function hideIntroCardDetail() {
    if (els.introCardDetailPopup) {
      els.introCardDetailPopup.hidden = true;
    }
    document.body.style.overflow = "";
  }

  function init() {
    // Resume AudioContext on first gesture to guarantee browser unlock
    const unlockEvents = ["click", "mousedown", "touchstart", "keydown"];
    const unlock = () => {
      AudioFX.init();
      unlockEvents.forEach(evt => document.removeEventListener(evt, unlock));
    };
    unlockEvents.forEach(evt => document.addEventListener(evt, unlock, { once: true, passive: true }));

    if (els.bgMusic) {
      els.bgMusic.volume = els.volumeSlider ? els.volumeSlider.value : 0.7;
      if (els.volumeSlider) {
        els.volumeSlider.addEventListener("input", (e) => {
          els.bgMusic.volume = e.target.value;
          els.bgMusic.muted = (e.target.value == 0);
        });
      }
      if (els.audioToggleBtn) {
        els.audioToggleBtn.addEventListener("click", () => {
          if (els.bgMusic.paused) {
            els.bgMusic.play();
          } else {
            els.bgMusic.pause();
          }
        });
      }
    }

    els.flipFront.addEventListener("click", () => flipToBack());

    els.flipExpandFab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openFullscreen();
    });

    els.fsClose.addEventListener("click", closeFullscreen);
    els.fsLayer.querySelectorAll("[data-fs-close]").forEach((n) => {
      n.addEventListener("click", closeFullscreen);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!els.fsLayer.hidden) closeFullscreen();
        if (els.introCardDetailPopup && !els.introCardDetailPopup.hidden) {
          AudioFX.playClick();
          hideIntroCardDetail();
        }
      }
    });

    els.resultPopupNext.addEventListener("click", onResultPopupNext);

    els.pills.forEach((b) => {
      b.addEventListener("click", () => {
        const d = b.dataset.difficulty;
        if (d === "easy" || d === "medium" || d === "hard") {
          if (d === difficulty && gameStarted && index < deck.length) return;
          AudioFX.playClick();
          score = 0;
          index = 0;
          updateScoreDisplay();
          setDifficulty(d);
        }
      });
    });

    if (els.cardTinNguong) {
      els.cardTinNguong.addEventListener("click", () => {
        AudioFX.playClick();
        showIntroCardDetail("tin-nguong");
      });
    }
    if (els.cardRanhGioi) {
      els.cardRanhGioi.addEventListener("click", () => {
        AudioFX.playClick();
        showIntroCardDetail("ranh-gioi");
      });
    }
    if (els.cardMeTin) {
      els.cardMeTin.addEventListener("click", () => {
        AudioFX.playClick();
        showIntroCardDetail("me-tin");
      });
    }
    if (els.introDetailCloseBtn) {
      els.introDetailCloseBtn.addEventListener("click", () => {
        AudioFX.playClick();
        hideIntroCardDetail();
      });
    }
    if (els.introDetailCloseBackdrop) {
      els.introDetailCloseBackdrop.addEventListener("click", () => {
        AudioFX.playClick();
        hideIntroCardDetail();
      });
    }

    els.introEnterBtn.addEventListener("click", enterGame);
    els.tutorialNext.addEventListener("click", () => {
      AudioFX.playClick();
      advanceTutorial();
    });
    els.tutorialSkip.addEventListener("click", () => {
      AudioFX.playClick();
      skipTutorial();
    });

    try {
      loadCards();
      showIntro();
    } catch (err) {
      console.error(err);
      showIntro();
      els.introErrorLine.hidden = false;
      els.introErrorLine.textContent =
        "Không tải được bộ thẻ. Kiểm tra data/cards.js và thẻ script trong index.html.";
      els.introEnterBtn.disabled = true;
    }
  }

  init();
})();
