<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import axios from 'axios';

const store = useUserStore();
const visitedCountries = ref([]); 
const loading = ref(true);

const toggleVisited = (cca3) => {
  if (visitedCountries.value.includes(cca3)) {
    visitedCountries.value = visitedCountries.value.filter(c => c !== cca3);
  } else {
    visitedCountries.value.push(cca3);
  }
  localStorage.setItem('geo_visited', JSON.stringify(visitedCountries.value));
};

onMounted(() => {
  const saved = localStorage.getItem('geo_visited');
  if (saved) visitedCountries.value = JSON.parse(saved);
  loading.value = false;
});
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Interactive <span class="text-primary">Scratch Map</span></h1>
      <p class="lead text-muted">Mark the countries you have visited. Currently tracked: <span class="fw-bold text-success">{{ visitedCountries.length }}</span></p>
    </div>

    <div class="card border-0 shadow-lg p-4 bg-primary text-white text-center mb-5">
       <h3 class="fw-bold mb-3">Map Visualization</h3>
       <p class="text-white">We are using a placeholder grid for the scratch map. In a production app, this would be a D3.js SVG.</p>
       <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
          <div 
            v-for="code in ['USA', 'FRA', 'JPN', 'DEU', 'ITA', 'ESP', 'GBR', 'AUS', 'BRA', 'CAN', 'IND', 'CHN']" 
            :key="code"
            @click="toggleVisited(code)"
            :class="['btn btn-lg fw-bold', visitedCountries.includes(code) ? 'btn-warning text-dark' : 'btn-outline-light']"
            style="min-width: 100px;"
          >
            {{ code }}
            <i v-if="visitedCountries.includes(code)" class="bi bi-check-circle-fill ms-2"></i>
          </div>
       </div>
    </div>
  </div>
</template>