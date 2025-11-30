<script setup>
import { ref, computed } from 'vue';

const hours = ref(5);
const cabin = ref('Economy');

const emission = computed(() => {
  const factor = cabin.value === 'Economy' ? 90 : 180; 
  return hours.value * factor;
});

const trees = computed(() => Math.ceil(emission.value / 20));
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h1 class="display-4 fw-bold mb-4">Eco <span class="text-success">Calculator</span></h1>
        <div class="card border-0 shadow-lg p-5 bg-surface rounded-4">
          <label class="form-label fw-bold text-main">Flight Duration (Hours)</label>
          <input type="range" v-model="hours" min="1" max="20" class="form-range mb-4">
          <h3 class="text-primary fw-bold mb-4">{{ hours }} Hours</h3>
          
          <div class="btn-group w-100 mb-5">
            <button @click="cabin = 'Economy'" :class="['btn', cabin === 'Economy' ? 'btn-primary' : 'btn-outline-secondary']">Economy</button>
            <button @click="cabin = 'Business'" :class="['btn', cabin === 'Business' ? 'btn-primary' : 'btn-outline-secondary']">Business</button>
          </div>

          <div class="alert alert-success border-0 bg-success-subtle p-4 rounded-4">
            <h2 class="fw-bold mb-0 text-success">{{ emission }} kg CO₂</h2>
            <p class="mb-0 text-muted mt-2">Offset by planting <span class="fw-bold text-main">{{ trees }} trees</span>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.text-main { color: var(--text-main); }
.bg-success-subtle { background-color: rgba(16, 185, 129, 0.1); }
</style>