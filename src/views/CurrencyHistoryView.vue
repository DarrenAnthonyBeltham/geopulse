<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';

const activeCurrency = ref('EUR');
const loading = ref(false);
const error = ref(null);
const rawData = ref([]);
const currencies = ['EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SGD'];

const fetchHistory = async () => {
  loading.value = true;
  error.value = null;
  rawData.value = [];

  try {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 6);

    const formatDate = (d) => d.toISOString().split('T')[0];
    
    const response = await axios.get(`https://api.frankfurter.app/${formatDate(start)}..${formatDate(end)}?from=USD&to=${activeCurrency.value}`);
    
    const rates = response.data.rates;
    const labels = Object.keys(rates);
    
    const filteredLabels = labels.filter((_, index) => index % 14 === 0);

    rawData.value = filteredLabels.map(date => ({
      date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      value: rates[date][activeCurrency.value]
    }));

  } catch (err) {
    error.value = "Could not load historical data.";
  } finally {
    loading.value = false;
  }
};

const chartConfig = computed(() => {
  if (rawData.value.length === 0) return { min: 0, max: 1 };
  const values = rawData.value.map(d => d.value);
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
});

const getBarHeight = (val) => {
  const { min, max } = chartConfig.value;
  if (max === min) return 50;
  const percentage = ((val - min) / (max - min)) * 70 + 15; 
  return percentage;
};

watch(activeCurrency, () => {
  fetchHistory();
});

onMounted(() => {
  fetchHistory();
});
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Currency <span class="text-success">Trends</span></h1>
      <p class="lead text-muted">Real-time historical performance (USD Base) via Frankfurter API.</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card border-0 shadow-lg p-4 p-md-5">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
            <div>
              <h4 class="fw-bold mb-1">USD to {{ activeCurrency }}</h4>
              <p class="text-muted small mb-0">Last 6 Months Trend</p>
            </div>
            <select v-model="activeCurrency" class="form-select w-auto shadow-sm">
              <option v-for="curr in currencies" :key="curr" :value="curr">USD &rarr; {{ curr }}</option>
            </select>
          </div>

          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-3 text-muted">Fetching market data...</p>
          </div>

          <div v-else-if="error" class="alert alert-danger text-center">
            {{ error }}
          </div>

          <div v-else class="chart-container d-flex justify-content-between align-items-end px-2" style="height: 350px;">
            <div v-for="(point, index) in rawData" :key="index" class="text-center flex-grow-1 mx-1 bar-wrapper">
              
              <div 
                class="bar bg-primary rounded-top position-relative" 
                :style="{ height: getBarHeight(point.value) + '%', opacity: 0.85 }"
                data-bs-toggle="tooltip"
                :title="point.value"
              >
                <div class="tooltip-value position-absolute top-0 start-50 translate-middle-x mt-n4 bg-dark text-white rounded px-2 py-1 small opacity-0 transition-opacity">
                  {{ point.value.toFixed(3) }}
                </div>
              </div>
              
              <div class="mt-3 text-muted x-axis-label">{{ point.date }}</div>
            </div>
          </div>
          
          <div v-if="!loading && !error" class="mt-4 text-center">
            <span class="badge bg-light text-dark border me-2">Low: {{ chartConfig.min.toFixed(3) }}</span>
            <span class="badge bg-light text-dark border">High: {{ chartConfig.max.toFixed(3) }}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  transition: height 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s;
  min-height: 4px;
  cursor: pointer;
}

.bar-wrapper:hover .bar {
  background-color: var(--primary-hover) !important;
  opacity: 1 !important;
}

.bar-wrapper:hover .tooltip-value {
  opacity: 1;
  margin-top: -35px !important; 
}

.x-axis-label {
  font-size: 0.75rem;
  transform: rotate(-45deg);
  white-space: nowrap;
  margin-top: 10px;
}
</style>