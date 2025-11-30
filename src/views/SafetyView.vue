<script setup>
import { ref } from 'vue';

const safetyData = ref([
  { country: 'Japan', score: 85, rank: 'Very Safe' },
  { country: 'Switzerland', score: 84, rank: 'Very Safe' },
  { country: 'Iceland', score: 83, rank: 'Very Safe' },
  { country: 'Singapore', score: 82, rank: 'Very Safe' },
  { country: 'Finland', score: 81, rank: 'Very Safe' },
  { country: 'Canada', score: 75, rank: 'Safe' },
  { country: 'Germany', score: 74, rank: 'Safe' },
  { country: 'United Kingdom', score: 68, rank: 'Moderate' },
  { country: 'France', score: 65, rank: 'Moderate' },
  { country: 'USA', score: 58, rank: 'Moderate' },
]);

const getBadgeColor = (score) => {
  if (score >= 80) return 'bg-success';
  if (score >= 60) return 'bg-info';
  if (score >= 40) return 'bg-warning';
  return 'bg-danger';
};
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Global <span class="text-primary">Safety Index</span></h1>
      <p class="lead text-muted">Real-time safety and crime scores for top destinations.</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-lg overflow-hidden rounded-4 safety-card">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead class="table-header">
                  <tr>
                    <th class="p-4 border-0 text-uppercase small fw-bold tracking-wide">Country</th>
                    <th class="p-4 border-0 text-center text-uppercase small fw-bold tracking-wide">Safety Score</th>
                    <th class="p-4 border-0 text-end text-uppercase small fw-bold tracking-wide">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in safetyData" :key="item.country" class="table-row">
                    <td class="p-4 fw-bold text-main">{{ item.country }}</td>
                    <td class="p-4 text-center">
                      <div class="progress" style="height: 8px; background-color: var(--border-color);">
                        <div 
                          class="progress-bar rounded-pill" 
                          :class="getBadgeColor(item.score)" 
                          role="progressbar" 
                          :style="{ width: item.score + '%' }"
                        ></div>
                      </div>
                      <small class="text-muted mt-2 d-block fw-bold">{{ item.score }} / 100</small>
                    </td>
                    <td class="p-4 text-end">
                      <span class="badge rounded-pill px-3 py-2 text-white" :class="getBadgeColor(item.score)">{{ item.rank }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.safety-card {
  background-color: var(--bg-surface);
}

.text-main {
  color: var(--text-main);
}

.table-header {
  background-color: var(--bg-input);
  border-bottom: 1px solid var(--border-color);
}

.table-header th {
  color: var(--text-muted);
  background-color: transparent;
}

.table-row {
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-color);
}

.table-row:hover {
  background-color: var(--bg-input);
}

.table-row:last-child {
  border-bottom: none;
}

.table td {
  background-color: transparent;
  color: var(--text-main);
  border: none;
}

.bg-success { background-color: #10b981 !important; }
.bg-info { background-color: #0ea5e9 !important; }
.bg-warning { background-color: #f59e0b !important; }
.bg-danger { background-color: #ef4444 !important; }
</style>