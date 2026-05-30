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
      videoEl.removeAttribute("poster");
      videoEl.removeAttribute("src");
      videoEl.querySelectorAll("source").forEach((s) => s.remove());
      videoEl.load();
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
    buildDeck();
    index = 0;
    renderCard();
  }

  function buildDeck() {
    const easy = allCards.filter((c) => c.difficulty === "easy");
    const medium = allCards.filter((c) => c.difficulty === "medium");
    const hard = allCards.filter((c) => c.difficulty === "hard");
    if (difficulty === "easy") deck = shuffle([...easy]);
    else if (difficulty === "medium") deck = shuffle([...easy, ...medium]);
    else deck = shuffle([...easy, ...medium, ...hard]);
    if (deck.length === 0) deck = shuffle([...allCards]);
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

  function hideResultPopup() {
    els.resultPopup.hidden = true;
    els.resultPopup.classList.remove("result-popup--correct", "result-popup--wrong", "result-popup--time", "result-popup--complete");
    document.body.style.overflow = "";
    if (els.resultPopupGrid) els.resultPopupGrid.hidden = false;
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
      els.resultPopupIcon.textContent = "🏁";
      els.resultPopupKicker.textContent = "Kết thúc";
      els.resultPopupTitle.textContent = "Hết bài";
      els.resultPopupFootnote.textContent = `Tổng điểm của bạn: ${payload.score}. Chọn lại độ khó hoặc F5 để chơi lại từ đầu.`;
      els.resultPopupNext.textContent = "Đóng";
    } else {
      els.resultPopupGrid.hidden = false;
      const card = payload.card;
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

      if (kind === "correct") {
        els.resultPopupIcon.textContent = "✓";
        els.resultPopupKicker.textContent = "Tuyệt vời";
        els.resultPopupTitle.textContent = "Đúng rồi!";
        els.resultPopupFootnote.textContent = "Đọc hai góc nhìn bên dưới để củng cố phân biệt tín ngưỡng và mê tín.";
      } else if (kind === "wrong") {
        els.resultPopupIcon.textContent = "✕";
        els.resultPopupKicker.textContent = "Chưa đúng";
        els.resultPopupTitle.textContent = "Sai rồi";
        els.resultPopupFootnote.textContent =
          "Đáp án đúng được đánh dấu \"Đáp án đúng\". Đọc giải thích hai phía để hiểu ranh giới.";
      } else {
        els.resultPopupIcon.textContent = "⏱";
        els.resultPopupKicker.textContent = "Hết giờ";
        els.resultPopupTitle.textContent = "Không kịp chọn";
        els.resultPopupFootnote.textContent = "Lần sau lật thẻ sớm hơn hoặc chọn nhanh hơn trước khi đồng hồ về 0.";
      }
      els.resultPopupNext.textContent = "Tiếp tục";
    }

    els.resultPopup.hidden = false;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => els.resultPopupNext.focus(), 80);
  }

  function revealCorrectButtons() {
    if (!current) return;
    const correctBool = answerToBool(current.correctAnswer);
    els.answerBtns.forEach((b) => {
      b.disabled = true;
      const aBool = answerToBool(b.dataset.answer);
      if (aBool === correctBool) {
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
      els.answerBtns.forEach((b) => {
        b.disabled = true;
        b.classList.remove("answer-g--locked");
      });
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
    els.flipFront.setAttribute("aria-label", "Lật thẻ để xem clip và chọn đáp án");
    els.cardBadge.textContent = difficultyLabel(current.difficulty);
    showVideoOrFallback(els.previewVideo, current, {
      wrap: els.previewFallback,
      title: els.previewFallbackTitle,
      text: els.previewFallbackText,
    });

    updateAnswersAvailability();
    updateProgress();
    stopQuestionTimer();
    els.questionTimerWrap.hidden = true;
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
    pauseQuestionTimer();
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
    els.fsLayer.hidden = true;
    document.body.style.overflow = "";
    els.fsVideo.pause();
    els.fsVideo.muted = true;
    els.previewVideo.pause();
    resumeQuestionTimer();
  }

  function onAnswer(choice) {
    if (!current || answered || tutorialActive || !cardFlipped) return;
    answered = true;
    stopQuestionTimer();
    const choiceBool = answerToBool(choice);
    const correctBool = answerToBool(current.correctAnswer);
    const isCorrect = choiceBool === correctBool;
    const pts = POINTS[current.difficulty] || 10;

    els.answerBtns.forEach((b) => {
      b.disabled = true;
      const aBool = answerToBool(b.dataset.answer);
      if (aBool === correctBool) {
        b.classList.add("answer-g--correct", "answer-g--reveal");
      } else if (aBool === choiceBool && !isCorrect) {
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
    }

    showResultPopup(isCorrect ? "correct" : "wrong", { card: current });
  }

  function nextRound() {
    hideResultPopup();
    index += 1;
    renderCard();
  }

  function onResultPopupNext() {
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
    if (els.introEnterBtn.disabled) return;
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
    els.screenIntro.hidden = false;
    els.screenIntro.setAttribute("aria-hidden", "false");
    els.screenGame.hidden = true;
    gameStarted = false;
    stopQuestionTimer();
    hideResultPopup();
  }

  function init() {
    if (els.bgMusic) {
      els.bgMusic.volume = els.volumeSlider ? els.volumeSlider.value : 0.4;
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

    els.answerBtns.forEach((b) => {
      b.addEventListener("mousemove", bindAnswerHover);
      b.addEventListener("click", () => onAnswer(b.dataset.answer));
    });

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
      if (e.key === "Escape" && !els.fsLayer.hidden) closeFullscreen();
    });

    els.resultPopupNext.addEventListener("click", onResultPopupNext);

    els.pills.forEach((b) => {
      b.addEventListener("click", () => {
        const d = b.dataset.difficulty;
        if (d === "easy" || d === "medium" || d === "hard") {
          score = 0;
          index = 0;
          updateScoreDisplay();
          setDifficulty(d);
        }
      });
    });

    els.introEnterBtn.addEventListener("click", enterGame);
    els.tutorialNext.addEventListener("click", advanceTutorial);
    els.tutorialSkip.addEventListener("click", skipTutorial);

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
