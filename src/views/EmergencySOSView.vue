<script setup>
import { ref, computed } from 'vue';

const search = ref('');
const numbers = [
  { country: 'United States', police: '911', ambulance: '911', fire: '911' },
  { country: 'United Kingdom', police: '999', ambulance: '999', fire: '999' },
  { country: 'European Union', police: '112', ambulance: '112', fire: '112' },
  { country: 'Japan', police: '110', ambulance: '119', fire: '119' },
  { country: 'Indonesia', police: '110', ambulance: '118', fire: '113' },
  { country: 'Australia', police: '000', ambulance: '000', fire: '000' }
];

const filtered = computed(() => numbers.filter(n => n.country.toLowerCase().includes(search.value.toLowerCase())));
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-danger">Emergency SOS</h1>
      <p class="lead text-muted">Offline database of critical numbers.</p>
      <input v-model="search" type="text" class="form-control w-50 mx-auto mt-3 bg-surface border-0 shadow-sm py-3" placeholder="Search country...">
    </div>
    <div class="row g-4">
      <div v-for="item in filtered" :key="item.country" class="col-md-4">
        <div class="card border-0 shadow-sm bg-surface h-100 rounded-4 border-start border-5 border-danger">
          <div class="card-body p-4">
            <h4 class="fw-bold text-main mb-4">{{ item.country }}</h4>
            <div class="d-flex justify-content-between mb-2 text-muted"><span>Police</span><span class="fw-bold text-danger fs-5">{{ item.police }}</span></div>
            <div class="d-flex justify-content-between mb-2 text-muted"><span>Ambulance</span><span class="fw-bold text-danger fs-5">{{ item.ambulance }}</span></div>
            <div class="d-flex justify-content-between text-muted"><span>Fire</span><span class="fw-bold text-danger fs-5">{{ item.fire }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.text-main { color: var(--text-main); }
</style>