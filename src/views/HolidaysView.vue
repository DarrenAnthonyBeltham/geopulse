<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const countryCode = ref('US');
const year = ref(new Date().getFullYear());
const holidays = ref([]);
const loading = ref(false);
const error = ref(null);

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'JP', name: 'Japan' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'SG', name: 'Singapore' },
  { code: 'KR', name: 'South Korea' }
];

const fetchHolidays = async () => {
  loading.value = true;
  error.value = null;
  holidays.value = [];
  
  try {
    const { data } = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year.value}/${countryCode.value}`);
    holidays.value = data;
  } catch (e) {
    error.value = "Could not fetch holidays. The API might be busy.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchHolidays();
});
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Public <span class="text-danger">Holidays</span></h1>
      <p class="lead text-muted">Live data from Nager.Date API.</p>
    </div>

    <div class="row justify-content-center mb-5">
      <div class="col-md-8">
        <div class="card border-0 shadow-lg p-3 bg-surface rounded-pill hover-card">
          <div class="d-flex gap-2">
            <select v-model="countryCode" class="form-select border-0 bg-transparent rounded-pill ps-4 text-main fw-bold" style="cursor: pointer;">
              <option v-for="c in countries" :key="c.code" :value="c.code">{{ c.name }}</option>
            </select>
            <div class="vr my-2"></div>
            <select v-model="year" class="form-select border-0 bg-transparent rounded-pill text-main fw-bold" style="cursor: pointer;">
              <option :value="2024">2024</option>
              <option :value="2025">2025</option>
            </select>
            <button @click="fetchHolidays" class="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">Check</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else-if="error" class="text-center py-5 text-danger">
      {{ error }}
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-lg-8">
        <div v-if="holidays.length === 0" class="text-center py-5 text-muted">
          No holidays found for this selection.
        </div>
        <div v-else class="list-group shadow-sm rounded-4 overflow-hidden bg-surface">
          <div 
            v-for="(holiday, index) in holidays" 
            :key="holiday.date" 
            class="list-group-item p-4 border-0 border-bottom bg-surface d-flex align-items-center hover-card animate-stagger"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <div class="bg-danger-subtle text-danger rounded-4 p-2 px-3 text-center me-4 shadow-sm" style="min-width: 85px;">
              <div class="small fw-bold text-uppercase opacity-75">{{ new Date(holiday.date).toLocaleString('default', { month: 'short' }) }}</div>
              <div class="h3 fw-bold mb-0">{{ new Date(holiday.date).getDate() }}</div>
            </div>
            <div>
              <h5 class="fw-bold text-main mb-1">{{ holiday.name }}</h5>
              <p class="text-muted small mb-0">{{ holiday.localName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.text-main { color: var(--text-main); }

.bg-danger-subtle { 
  background-color: rgba(239, 68, 68, 0.1); 
  color: #dc2626; 
}

.hover-card {
  transition: transform 0.2s, background-color 0.2s;
}
.hover-card:hover {
  transform: scale(1.01);
  background-color: var(--bg-input);
  z-index: 1;
}

.animate-stagger {
  opacity: 0;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>