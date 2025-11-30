<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

const tipData = [
  { 
    country: 'United States', 
    flag: '🇺🇸',
    restaurant: '15-20%', 
    taxi: '10-15%', 
    hotel: '$1-2 per bag', 
    note: 'Tipping is mandatory. Staff rely on tips for wages.',
    color: 'danger'
  },
  { 
    country: 'Japan', 
    flag: '🇯🇵',
    restaurant: 'No Tip', 
    taxi: 'Round up', 
    hotel: 'No Tip', 
    note: 'Tipping can be considered rude or insulting.',
    color: 'success'
  },
  { 
    country: 'France', 
    flag: '🇫🇷',
    restaurant: 'Service Compris', 
    taxi: '10%', 
    hotel: '€1-2', 
    note: 'Service is included (Service Compris), but small change is appreciated.',
    color: 'info'
  },
  { 
    country: 'United Kingdom', 
    flag: '🇬🇧',
    restaurant: '10-15%', 
    taxi: 'Round up', 
    hotel: '£1-2', 
    note: 'Discretionary. Check if service charge is already added.',
    color: 'primary'
  },
  { 
    country: 'China', 
    flag: '🇨🇳',
    restaurant: 'No Tip', 
    taxi: 'No Tip', 
    hotel: 'No Tip', 
    note: 'Generally not practiced anywhere.',
    color: 'success'
  },
  { 
    country: 'Indonesia', 
    flag: '🇮🇩',
    restaurant: '5-10%', 
    taxi: 'Round up', 
    hotel: '10k-20k IDR', 
    note: 'Not mandatory but highly appreciated for good service.',
    color: 'warning'
  }
];

const filteredTips = computed(() => {
  if (!searchQuery.value) return tipData;
  return tipData.filter(t => t.country.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Tipping <span class="text-success">Etiquette</span></h1>
      <p class="lead text-muted">Avoid awkward moments. Know when (and when not) to tip.</p>
    </div>

    <div class="row justify-content-center mb-5">
      <div class="col-md-6">
        <div class="input-group input-group-lg shadow-sm">
          <span class="input-group-text bg-surface border-0"><i class="bi bi-cash-coin text-success"></i></span>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-control border-0 bg-surface" 
            placeholder="Search destination..."
          >
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div v-for="item in filteredTips" :key="item.country" class="col-lg-4 col-md-6">
        <div class="card h-100 border-0 shadow-sm hover-card bg-surface rounded-4 overflow-hidden">
          <div :class="`card-header bg-${item.color} text-white p-3 border-0`">
            <h4 class="mb-0 fw-bold"><span class="me-2">{{ item.flag }}</span> {{ item.country }}</h4>
          </div>
          <div class="card-body p-4">
            <div class="d-flex justify-content-between mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">
              <span class="text-muted"><i class="bi bi-cup-hot me-2"></i>Restaurant</span>
              <span class="fw-bold text-main">{{ item.restaurant }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">
              <span class="text-muted"><i class="bi bi-taxi-front me-2"></i>Taxi</span>
              <span class="fw-bold text-main">{{ item.taxi }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted"><i class="bi bi-briefcase me-2"></i>Hotel Porter</span>
              <span class="fw-bold text-main">{{ item.hotel }}</span>
            </div>
            <div :class="`alert alert-${item.color} mb-0 small mt-3 border-0`">
              <i class="bi bi-info-circle-fill me-2"></i> {{ item.note }}
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
.hover-card { transition: transform 0.2s; }
.hover-card:hover { transform: translateY(-5px); }
.form-control:focus { box-shadow: none; }
</style>