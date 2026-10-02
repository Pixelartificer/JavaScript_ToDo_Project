const fromLanguage = document.getElementById("fromLanguage");
const toLanguage = document.getElementById("toLanguage");

const inputText = document.getElementById("inputText");
const translation = document.getElementById("translation");

const translateButton = document.getElementById("translateButton");
const speakButton = document.getElementById("speakButton");
const stopButton = document.getElementById("stopButton");

const swapButton = document.getElementById("swapButton");
const copyButton = document.getElementById("copyButton");

const status = document.getElementById("status");

const synth = window.speechSynthesis;

let voices = [];

// LOAD VOICES

function loadVoices() {
  voices = synth.getVoices();
}

loadVoices();
if ("onvoiceschanged" in synth) {
  synth.onvoiceschanged = loadVoices;
}

// TRANSLATE

async function translateText() {
  const text = inputText.value.trim();
  const source = fromLanguage.value;
  const target = toLanguage.value;
  if (text === "") {
    status.textContent =
      "Please type something first.";
    return;
  }
  if (source === target) {
    translation.textContent = text;
    status.textContent =
      "Translation completed.";
    return;
  }

  status.textContent =
    "Translating...";
  translateButton.disabled = true;
  translateButton.textContent =
    "Translating...";
  try {
    const url =
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    const response =
      await fetch(url);
    if (!response.ok) {
      throw new Error(
        "Translation request failed."
      );
    }
    const data =
      await response.json();
    const translatedText =
      data.responseData.translatedText;
    if (!translatedText) {
      throw new Error(
        "Translation not available."
      );
    }
    translation.textContent =
      translatedText;
    status.textContent =
      "Translation completed.";
  }
  catch (error) {
    console.error(error);
    translation.textContent =
      "Translation failed.";
    status.textContent =
      "Unable to translate.";
  }
  finally {
    translateButton.disabled = false;
    translateButton.textContent =
      "Translate";
  }
}

// FIND VOICE

function findVoice(language) {
  let voice = voices.find(
    (voice) =>
      voice.lang.toLowerCase() ===
      language.toLowerCase()
  );
  if (!voice) {
    voice = voices.find(
      (voice) =>
        voice.lang
          .toLowerCase()
          .startsWith(
            language.toLowerCase() + "-"
          )
    );
  }
  return voice;
}

// SPEAK

function speakTranslation() {
  const text =
    translation.textContent.trim();
  if (
    text === "" ||
    text === "Your translation will appear here..." ||
    text === "Translation failed."
  ) {
    status.textContent =
      "Please translate something first.";
    return;
  }

  synth.cancel();
  const targetLanguage =
    toLanguage.value;
  const utterance =
    new SpeechSynthesisUtterance(text);
  const voice =
    findVoice(targetLanguage);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
    status.textContent =
      `Speaking in ${voice.lang}`;
  }
  else {
    utterance.lang =
      targetLanguage;
    status.textContent =
      `Voice for ${targetLanguage} is not available.`;
  }
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onend = function () {
    status.textContent =
      "Finished speaking.";
  };
  utterance.onerror = function (event) {
    status.textContent =
      `Speech error: ${event.error}`;
  };
  synth.speak(utterance);
}

// STOP SPEECH

stopButton.addEventListener(
  "click",
  function () {
    synth.cancel();
    status.textContent =
      "Speech stopped.";
  }
);

// SWAP LANGUAGES

swapButton.addEventListener(
  "click",
  function () {
    const oldFrom =
      fromLanguage.value;
    const oldTo =
      toLanguage.value;
    fromLanguage.value =
      oldTo;
    toLanguage.value =
      oldFrom;
    const oldInput =
      inputText.value;
    const oldTranslation =
      translation.textContent;

    if (
      oldTranslation !==
      "Your translation will appear here..."
    ) {
      inputText.value =
        oldTranslation;
      translation.textContent =
        oldInput;
    }
    status.textContent =
      "Languages swapped.";
  }
);

// COPY

copyButton.addEventListener(
  "click",
  async function () {
    const text =
      translation.textContent;

    if (
      text ===
      "Your translation will appear here..."
    ) {
      status.textContent =
        "Nothing to copy.";
      return;
    }

    try {
      await navigator.clipboard.writeText(
        text
      );
      status.textContent =
        "Translation copied.";
    }
    catch (error) {
      status.textContent =
        "Copy failed.";
    }
  }
);

// EVENTS

translateButton.addEventListener(
  "click",
  translateText
);
speakButton.addEventListener(
  "click",
  speakTranslation
);