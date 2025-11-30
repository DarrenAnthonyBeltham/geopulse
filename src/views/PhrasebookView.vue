<script setup>
import { ref, computed } from 'vue';

const selectedLang = ref('Japanese');
const isPlaying = ref(null);

const languages = [
  { name: 'Japanese', code: 'ja-JP', flag: '🇯🇵' },
  { name: 'Spanish', code: 'es-ES', flag: '🇪🇸' },
  { name: 'French', code: 'fr-FR', flag: '🇫🇷' },
  { name: 'Indonesian', code: 'id-ID', flag: '🇮🇩' },
  { name: 'German', code: 'de-DE', flag: '🇩🇪' },
  { name: 'Italian', code: 'it-IT', flag: '🇮🇹' },
  { name: 'Korean', code: 'ko-KR', flag: '🇰🇷' },
  { name: 'Chinese', code: 'zh-CN', flag: '🇨🇳' }
];

const dictionaries = {
  'Japanese': [
    { en: 'Hello', local: 'Konnichiwa', script: 'こんにちは' },
    { en: 'Thank you', local: 'Arigatou gozaimasu', script: 'ありがとうございます' },
    { en: 'Excuse me', local: 'Sumimasen', script: 'すみません' },
    { en: 'How much?', local: 'Ikura desu ka?', script: 'いくらですか' },
    { en: 'Where is the toilet?', local: 'Toire wa doko desu ka?', script: 'トイレはどこですか' },
    { en: 'Delicious!', local: 'Oishii!', script: 'おいしい' }
  ],
  'Spanish': [
    { en: 'Hello', local: 'Hola', script: '' },
    { en: 'Thank you', local: 'Gracias', script: '' },
    { en: 'Please', local: 'Por favor', script: '' },
    { en: 'How much?', local: '¿Cuánto cuesta?', script: '' },
    { en: 'Where is the bathroom?', local: '¿Dónde está el baño?', script: '' },
    { en: 'The bill, please', local: 'La cuenta, por favor', script: '' }
  ],
  'French': [
    { en: 'Hello', local: 'Bonjour', script: '' },
    { en: 'Thank you', local: 'Merci', script: '' },
    { en: 'Please', local: 'S\'il vous plaît', script: '' },
    { en: 'Where is the toilet?', local: 'Où sont les toilettes?', script: '' },
    { en: 'I don\'t understand', local: 'Je ne comprends pas', script: '' },
    { en: 'Delicious', local: 'Délicieux', script: '' }
  ],
  'Indonesian': [
    { en: 'Hello', local: 'Halo', script: '' },
    { en: 'Thank you', local: 'Terima kasih', script: '' },
    { en: 'Excuse me', local: 'Permisi', script: '' },
    { en: 'How much?', local: 'Berapa harganya?', script: '' },
    { en: 'Where is the toilet?', local: 'Di mana toilet?', script: '' },
    { en: 'Delicious', local: 'Enak sekali', script: '' }
  ],
  'German': [
    { en: 'Hello', local: 'Hallo', script: '' },
    { en: 'Thank you', local: 'Danke schön', script: '' },
    { en: 'Excuse me', local: 'Entschuldigung', script: '' },
    { en: 'The bill, please', local: 'Die Rechnung, bitte', script: '' },
    { en: 'Beer', local: 'Bier', script: '' },
    { en: 'Goodbye', local: 'Auf Wiedersehen', script: '' }
  ],
  'Italian': [
    { en: 'Hello', local: 'Ciao', script: '' },
    { en: 'Thank you', local: 'Grazie', script: '' },
    { en: 'Please', local: 'Per favore', script: '' },
    { en: 'Delicious', local: 'Delizioso', script: '' },
    { en: 'Where is the toilet?', local: 'Dov\'è il bagno?', script: '' },
    { en: 'Good morning', local: 'Buongiorno', script: '' }
  ],
  'Korean': [
    { en: 'Hello', local: 'Annyeonghaseyo', script: '안녕하세요' },
    { en: 'Thank you', local: 'Gamsahamnida', script: '감사합니다' },
    { en: 'Please give me...', local: '...juseyo', script: '...주세요' },
    { en: 'How much is it?', local: 'Eolmayeyo?', script: '얼마예요?' },
    { en: 'It\'s delicious', local: 'Masisseoyo', script: '맛있어요' },
    { en: 'Where is the toilet?', local: 'Hwajangsil eodi-eyo?', script: '화장실 어디예요?' }
  ],
  'Chinese': [
    { en: 'Hello', local: 'Nǐ hǎo', script: '你好' },
    { en: 'Thank you', local: 'Xièxiè', script: '谢谢' },
    { en: 'How much?', local: 'Duōshǎo qián?', script: '多少钱' },
    { en: 'Toilet', local: 'Cèsuǒ', script: '厕所' },
    { en: 'Check, please', local: 'Mǎidān', script: '买单' },
    { en: 'I don\'t want it', local: 'Bù yào', script: '不要' }
  ]
};

const currentPhrases = computed(() => dictionaries[selectedLang.value] || []);

const speak = (text, index) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = languages.find(l => l.name === selectedLang.value).code;
    utterance.lang = langCode;
    
    isPlaying.value = index;
    utterance.onend = () => { isPlaying.value = null; };
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Browser does not support text-to-speech.");
  }
};
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 text-center mb-5">
        <h1 class="display-4 fw-bold">Travel <span class="text-primary">Phrasebook</span></h1>
        <p class="lead text-muted">Essential phrases for your next adventure.</p>
      </div>
    </div>

    <div class="row justify-content-center mb-5">
      <div class="col-md-8">
        <div class="card border-0 shadow-sm p-2 rounded-pill bg-surface d-flex flex-row overflow-auto custom-scrollbar mx-auto">
          <button 
            v-for="lang in languages" 
            :key="lang.name" 
            @click="selectedLang = lang.name"
            :class="['btn rounded-pill fw-bold px-4 flex-shrink-0', selectedLang === lang.name ? 'btn-primary text-white' : 'btn-ghost']"
          >
            <span class="me-2">{{ lang.flag }}</span> {{ lang.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="row g-3 justify-content-center">
      <div v-for="(phrase, index) in currentPhrases" :key="index" class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm hover-card h-100 bg-surface rounded-4 overflow-hidden" @click="speak(phrase.script || phrase.local, index)">
          <div class="card-body p-4 d-flex align-items-center justify-content-between">
            <div>
              <h6 class="text-uppercase text-muted small fw-bold mb-1">{{ phrase.en }}</h6>
              <h4 class="fw-bold text-primary mb-0">{{ phrase.local }}</h4>
              <p v-if="phrase.script" class="text-muted mb-0 mt-1 font-asian">{{ phrase.script }}</p>
            </div>
            <button :class="['btn rounded-circle p-3 transition-colors', isPlaying === index ? 'btn-primary' : 'bg-input text-primary']">
              <i :class="['bi fs-4', isPlaying === index ? 'bi-volume-up-fill' : 'bi-play-fill']"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
}

.bg-input {
  background-color: var(--bg-input);
}

.btn-ghost {
  color: var(--text-muted);
  background: transparent;
  border: none;
}
.btn-ghost:hover {
  background-color: var(--bg-input);
  color: var(--text-main);
}

.hover-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 0px;
  background: transparent;
}

.font-asian {
  font-family: 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC', sans-serif;
}

.transition-colors {
  transition: all 0.3s ease;
}
</style>