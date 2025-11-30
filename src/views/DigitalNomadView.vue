<script setup>
const cities = [
  { name: 'Canggu, Bali', wifi: '35 Mbps', cost: '$1,200', score: 4.8, image: '🇮🇩' },
  { name: 'Lisbon, Portugal', wifi: '85 Mbps', cost: '$2,100', score: 4.7, image: '🇵🇹' },
  { name: 'Chiang Mai, Thailand', wifi: '40 Mbps', cost: '$900', score: 4.6, image: '🇹🇭' },
  { name: 'Mexico City, Mexico', wifi: '50 Mbps', cost: '$1,500', score: 4.5, image: '🇲🇽' },
  { name: 'Medellín, Colombia', wifi: '30 Mbps', cost: '$1,100', score: 4.4, image: '🇨🇴' }
];
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Digital Nomad <span class="text-warning">Rank</span></h1>
      <p class="lead text-muted">Top destinations for remote work based on WiFi & Cost.</p>
    </div>
    <div class="row g-4">
      <div v-for="(city, i) in cities" :key="i" class="col-lg-6">
        <div class="card border-0 shadow-sm hover-card bg-surface rounded-4 overflow-hidden">
          <div class="card-body p-4 d-flex align-items-center gap-4">
            <div class="fs-1 bg-input p-3 rounded-circle shadow-sm" style="width:80px; height:80px; display:grid; place-items:center;">{{ city.image }}</div>
            <div class="flex-grow-1">
              <h4 class="fw-bold text-main mb-1">{{ city.name }}</h4>
              <div class="d-flex gap-3 text-muted small">
                <span><i class="bi bi-wifi text-success"></i> {{ city.wifi }}</span>
                <span><i class="bi bi-wallet2 text-primary"></i> {{ city.cost }}/mo</span>
              </div>
            </div>
            <div class="text-center">
              <div class="fs-3 fw-bold text-warning">{{ city.score }}</div>
              <small class="text-muted">/ 5.0</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.bg-input { background-color: var(--bg-input); }
.text-main { color: var(--text-main); }
.hover-card:hover { transform: translateY(-5px); transition: transform 0.3s; }
</style>