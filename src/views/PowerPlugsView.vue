<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

const plugData = [
  { type: 'A', countries: ['USA', 'Canada', 'Mexico', 'Japan'], voltage: '100-127V', desc: 'Two flat parallel pins', icon: 'bi-plug' },
  { type: 'B', countries: ['USA', 'Canada', 'Mexico'], voltage: '100-127V', desc: 'Two flat pins with round earth pin', icon: 'bi-plug-fill' },
  { type: 'C', countries: ['Europe', 'South America', 'Asia'], voltage: '220-240V', desc: 'Two round pins (Europlug)', icon: 'bi-outlet' },
  { type: 'G', countries: ['UK', 'Ireland', 'Singapore', 'Malaysia'], voltage: '230V', desc: 'Three rectangular pins', icon: 'bi-usb-drive-fill' },
  { type: 'I', countries: ['Australia', 'New Zealand', 'China'], voltage: '220-240V', desc: 'Two flat V-shape pins', icon: 'bi-lightning-charge-fill' },
  { type: 'F', countries: ['Germany', 'Austria', 'Netherlands'], voltage: '230V', desc: 'Two round pins with side clips', icon: 'bi-circle' }
];

const filteredPlugs = computed(() => {
  if (!searchQuery.value) return plugData;
  const query = searchQuery.value.toLowerCase();
  return plugData.filter(p => 
    p.countries.some(c => c.toLowerCase().includes(query)) || 
    p.type.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Global <span class="text-warning">Power Guide</span></h1>
      <p class="lead text-muted">Check voltage and plug types before you pack.</p>
    </div>

    <div class="row justify-content-center mb-5">
      <div class="col-md-6">
        <div class="input-group input-group-lg shadow-sm">
          <span class="input-group-text bg-surface border-0"><i class="bi bi-search text-primary"></i></span>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-control border-0 bg-surface" 
            placeholder="Search country (e.g. Japan)..."
          >
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div v-for="plug in filteredPlugs" :key="plug.type" class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm hover-card bg-surface rounded-4">
          <div class="card-body p-4 text-center">
            <div class="plug-icon-wrapper mb-3 mx-auto bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
              <span class="fw-bold fs-1">Type {{ plug.type }}</span>
            </div>
            <h4 class="fw-bold mb-2">{{ plug.voltage }}</h4>
            <p class="text-muted mb-3">{{ plug.desc }}</p>
            <hr class="opacity-10 my-3">
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <span v-for="c in plug.countries" :key="c" class="badge bg-input text-main border rounded-pill">
                {{ c }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface {
  background-color: var(--bg-surface);
}
.bg-input {
  background-color: var(--bg-input);
}
.text-main {
  color: var(--text-main);
}
.bg-warning-subtle {
  background-color: rgba(245, 158, 11, 0.15);
  width: 100px;
  height: 100px;
}
.hover-card {
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: translateY(-5px);
}
.form-control:focus {
  box-shadow: none;
}
</style>