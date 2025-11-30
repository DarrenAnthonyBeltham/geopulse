<script setup>
const plans = [
  { provider: 'Airalo', data: '1 GB', days: 7, price: 4.50, region: 'Local' },
  { provider: 'Holafly', data: 'Unlimited', days: 5, price: 19.00, region: 'Local' },
  { provider: 'Nomad', data: '3 GB', days: 30, price: 9.00, region: 'Regional' },
  { provider: 'Airalo', data: '5 GB', days: 30, price: 13.00, region: 'Global' },
  { provider: 'Ubigi', data: '10 GB', days: 30, price: 22.00, region: 'Local' }
];
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">eSIM <span class="text-primary">Marketplace</span></h1>
      <p class="lead text-muted">Instant data connectivity. No physical SIM required.</p>
    </div>
    <div class="row g-4 justify-content-center">
      <div v-for="(plan, i) in plans" :key="i" class="col-md-4">
        <div class="card border-0 shadow-sm hover-card h-100 bg-surface rounded-4">
          <div class="card-body p-4 text-center">
            <span class="badge bg-primary-subtle text-primary mb-3 px-3 rounded-pill">{{ plan.region }}</span>
            <h3 class="fw-bold mb-1 text-main">{{ plan.data }}</h3>
            <p class="text-muted mb-4">{{ plan.days }} Days Validity</p>
            <div class="d-flex justify-content-between align-items-center border-top pt-3" style="border-color: var(--border-color) !important;">
              <span class="fw-bold text-main">{{ plan.provider }}</span>
              <span class="fs-4 fw-bold text-primary">${{ plan.price.toFixed(2) }}</span>
            </div>
            <button class="btn btn-primary w-100 rounded-pill mt-3">Get Plan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.bg-primary-subtle { background-color: rgba(14, 165, 233, 0.1); }
.text-main { color: var(--text-main); }
.hover-card:hover { transform: translateY(-5px); transition: transform 0.3s; }
</style>