<script setup>
const trends = [
  { month: 'Jan', price: 850, height: 40 },
  { month: 'Feb', price: 720, height: 25 },
  { month: 'Mar', price: 780, height: 30 },
  { month: 'Apr', price: 950, height: 60 },
  { month: 'May', price: 1100, height: 80 },
  { month: 'Jun', price: 1250, height: 100 },
];
</script>

<template>
  <div class="container py-5">
    <h1 class="display-4 fw-bold text-center mb-5">Flight Price <span class="text-primary">Trends</span></h1>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-lg p-5 bg-surface rounded-4">
          <h4 class="fw-bold text-main mb-5">NYC <i class="bi bi-arrow-right mx-2 text-muted"></i> London (Avg Price)</h4>
          <div class="d-flex justify-content-between align-items-end" style="height: 300px;">
            <div v-for="t in trends" :key="t.month" class="text-center w-100 mx-2 d-flex flex-column justify-content-end h-100">
              <div class="bg-primary rounded-top opacity-75 hover-bar w-100" :style="{ height: t.height + '%' }"></div>
              <div class="mt-3">
                <div class="text-muted small fw-bold">{{ t.month }}</div>
                <div class="fw-bold text-main small">${{ t.price }}</div>
              </div>
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
.hover-bar { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
.hover-bar:hover { opacity: 1; transform: scaleY(1.05); }
</style>