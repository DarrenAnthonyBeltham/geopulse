<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const passport = ref('');
const destination = ref('');
const loading = ref(false);
const result = ref(null);

const showPassportDropdown = ref(false);
const showDestDropdown = ref(false);
const dropdownContainer = ref(null);

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 
  'Singapore', 'Indonesia', 'India', 'China', 'Brazil', 'Australia', 
  'Canada', 'South Korea', 'UAE', 'South Africa'
];

const visaFreeEU = ['Germany', 'France', 'Italy', 'Spain', 'Netherlands'];
const strongPassports = ['United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'Singapore', 'South Korea'];

const selectPassport = (country) => {
  passport.value = country;
  showPassportDropdown.value = false;
};

const selectDestination = (country) => {
  destination.value = country;
  showDestDropdown.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    showPassportDropdown.value = false;
    showDestDropdown.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

const checkVisa = () => {
  if (!passport.value || !destination.value) return;
  
  loading.value = true;
  result.value = null;

  setTimeout(() => {
    loading.value = false;
    
    if (passport.value === destination.value) {
      result.value = { status: 'Citizen', color: 'success', icon: 'bi-person-check-fill', message: 'You are a citizen of this country. No visa required.' };
      return;
    }

    if (visaFreeEU.includes(passport.value) && visaFreeEU.includes(destination.value)) {
      result.value = { status: 'Freedom of Movement', color: 'success', icon: 'bi-globe-europe-africa', message: 'Unlimited access via Schengen Area agreement.' };
      return;
    }

    if (strongPassports.includes(passport.value) && ['Indonesia', 'UAE', 'Brazil'].includes(destination.value)) {
      result.value = { status: 'Visa On Arrival', color: 'warning', icon: 'bi-passport', message: 'You can obtain a visa upon landing (approx $35 USD).' };
      return;
    }

    if (strongPassports.includes(passport.value)) {
      result.value = { status: 'Visa Free', color: 'success', icon: 'bi-airplane-fill', message: 'Travel visa-free for up to 90 days for tourism.' };
    } else {
      result.value = { status: 'Visa Required', color: 'danger', icon: 'bi-file-earmark-lock2-fill', message: 'You must apply for a visa at the embassy before travel.' };
    }

  }, 1500);
};
</script>

<template>
  <div class="container py-5" ref="dropdownContainer">
    <div class="row justify-content-center">
      <div class="col-lg-8 text-center mb-5">
        <h1 class="display-4 fw-bold">Travel <span class="text-primary">Visa Checker</span></h1>
        <p class="lead text-muted">Verify entry requirements before you book your flight.</p>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card border-0 shadow-lg p-4 p-md-5 mb-5 bg-surface rounded-4">
          
          <div class="mb-4 position-relative">
            <label class="form-label fw-bold text-uppercase small tracking-wide text-muted">I hold a passport from</label>
            <div 
              class="custom-select-trigger d-flex align-items-center justify-content-between p-3 rounded-3 bg-input border"
              :class="{ 'border-primary shadow-sm': showPassportDropdown }"
              @click="showPassportDropdown = !showPassportDropdown; showDestDropdown = false"
            >
              <div class="d-flex align-items-center gap-3">
                <i class="bi bi-passport text-primary fs-5"></i>
                <span :class="passport ? 'text-main fw-medium' : 'text-muted'">{{ passport || 'Select Passport...' }}</span>
              </div>
              <i class="bi bi-chevron-down text-muted transition-icon" :class="{ 'rotate-180': showPassportDropdown }"></i>
            </div>
            
            <div v-if="showPassportDropdown" class="custom-dropdown-menu shadow-lg rounded-3 mt-2">
              <ul class="list-unstyled mb-0 p-2">
                <li 
                  v-for="c in countries" 
                  :key="c" 
                  @click="selectPassport(c)"
                  class="dropdown-item-custom rounded-2 p-2 mb-1"
                  :class="{ 'active': passport === c }"
                >
                  {{ c }}
                </li>
              </ul>
            </div>
          </div>

          <div class="text-center my-2 position-relative">
            <div class="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle shadow-md z-1 position-relative hover-scale" style="width: 45px; height: 45px;">
              <i class="bi bi-arrow-down-short fs-3"></i>
            </div>
            <div class="position-absolute top-50 start-0 w-100 border-top border-2 z-0 opacity-25" style="border-color: var(--border-color) !important;"></div>
          </div>

          <div class="mb-5 position-relative">
            <label class="form-label fw-bold text-uppercase small tracking-wide text-muted">I am travelling to</label>
            <div 
              class="custom-select-trigger d-flex align-items-center justify-content-between p-3 rounded-3 bg-input border"
              :class="{ 'border-primary shadow-sm': showDestDropdown }"
              @click="showDestDropdown = !showDestDropdown; showPassportDropdown = false"
            >
              <div class="d-flex align-items-center gap-3">
                <i class="bi bi-geo-alt-fill text-primary fs-5"></i>
                <span :class="destination ? 'text-main fw-medium' : 'text-muted'">{{ destination || 'Select Destination...' }}</span>
              </div>
              <i class="bi bi-chevron-down text-muted transition-icon" :class="{ 'rotate-180': showDestDropdown }"></i>
            </div>

            <div v-if="showDestDropdown" class="custom-dropdown-menu shadow-lg rounded-3 mt-2">
              <ul class="list-unstyled mb-0 p-2">
                <li 
                  v-for="c in countries" 
                  :key="c" 
                  @click="selectDestination(c)"
                  class="dropdown-item-custom rounded-2 p-2 mb-1"
                  :class="{ 'active': destination === c }"
                >
                  {{ c }}
                </li>
              </ul>
            </div>
          </div>

          <button 
            @click="checkVisa" 
            class="btn btn-primary w-100 btn-lg rounded-pill shadow-lg fw-bold text-white hover-lift py-3" 
            :disabled="loading || !passport || !destination"
          >
            <span v-if="loading" :class="['text-white']"><span class="spinner-border spinner-border-sm me-2"></span> Checking Regulations...</span>
            <span v-else :class="['text-white']">Check Requirements</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="result" class="row justify-content-center animate-pop">
      <div class="col-lg-6">
        <div :class="['card border-0 shadow-lg text-center p-5 rounded-4 position-relative overflow-hidden', `bg-${result.color}-subtle`]">
          <div class="position-relative z-1">
            <div :class="['d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow-sm', `bg-${result.color}`, 'text-white']" style="width: 80px; height: 80px;">
              <i :class="['bi fs-1', result.icon]"></i>
            </div>
            <h2 :class="['fw-bold mb-3', `text-${result.color}`]">{{ result.status }}</h2>
            <p :class="['lead mb-0 fw-medium', `text-${result.color}`]">{{ result.message }}</p>
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
  border-color: var(--border-color);
}

.text-main {
  color: var(--text-main);
}

.custom-select-trigger {
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-select-trigger:hover {
  border-color: var(--primary);
}

.custom-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  z-index: 10;
}

.dropdown-item-custom {
  cursor: pointer;
  color: var(--text-main);
  transition: background-color 0.2s;
}

.dropdown-item-custom:hover, .dropdown-item-custom.active {
  background-color: var(--bg-input);
  color: var(--primary);
  font-weight: 500;
}

.transition-icon {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.hover-scale {
  transition: transform 0.2s;
}
.hover-scale:hover {
  transform: scale(1.1);
}

.hover-lift {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-lift:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4) !important;
}

.animate-pop {
  animation: popUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popUp {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}

:global(body.dark-theme) .btn-primary {
  color: #ffffff !important;
}

:global(body.dark-theme) .text-success { color: #34d399 !important; }
:global(body.dark-theme) .text-warning { color: #fbbf24 !important; }
:global(body.dark-theme) .text-danger { color: #f87171 !important; }
</style>