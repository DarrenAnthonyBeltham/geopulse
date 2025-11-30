<script setup>
const maps = [
  { 
    city: 'London', 
    type: 'Tube Map', 
    color: 'primary',
    url: 'https://content.tfl.gov.uk/standard-tube-map.pdf'
  },
  { 
    city: 'Tokyo', 
    type: 'Metro Network', 
    color: 'success',
    url: 'https://www.tokyometro.jp/en/subwaymap/pdf/routemap_en.pdf'
  },
  { 
    city: 'New York', 
    type: 'Subway Map', 
    color: 'info',
    url: 'https://web.mta.info/maps/subwaymap.pdf'
  },
  { 
    city: 'Paris', 
    type: 'Metro RER', 
    color: 'warning',
    url: 'https://www.ratp.fr/sites/default/files/plans-pdf/Plans-metro/Plan-metro.pdf'
  }
];

const downloadMap = (url) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="container py-5">
    <h1 class="display-4 fw-bold text-center mb-5">Transport <span class="text-primary">Maps</span></h1>
    <div class="row g-4">
      <div v-for="map in maps" :key="map.city" class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-lg bg-surface rounded-4 h-100 text-center p-4 hover-card">
          <div :class="`rounded-circle bg-${map.color} bg-opacity-10 p-3 d-inline-block mb-3`">
            <i :class="`bi bi-map-fill fs-1 text-${map.color}`"></i>
          </div>
          <h4 class="fw-bold text-main">{{ map.city }}</h4>
          <p class="text-muted">{{ map.type }}</p>
          <button @click="downloadMap(map.url)" class="btn btn-outline-secondary rounded-pill btn-sm mt-2 hover-white">
            <i class="bi bi-download me-2"></i> Download PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.text-main { color: var(--text-main); }
.hover-card { transition: transform 0.2s; }
.hover-card:hover { transform: translateY(-5px); }
.hover-white:hover { color: #fff !important; border-color: #fff !important; }
</style>