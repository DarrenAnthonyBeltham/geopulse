<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const countries = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedRegion = ref('All');
const sortBy = ref('population-desc'); 

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca3');
    countries.value = response.data;
  } catch (error) { console.error(error); } 
  finally { loading.value = false; }
};

const filteredCountries = computed(() => {
  let result = countries.value.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRegion = selectedRegion.value === 'All' || country.region === selectedRegion.value;
    return matchesSearch && matchesRegion;
  });

  if (sortBy.value === 'population-desc') {
    result.sort((a, b) => b.population - a.population);
  } else if (sortBy.value === 'population-asc') {
    result.sort((a, b) => a.population - b.population);
  } else if (sortBy.value === 'name-asc') {
    result.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } else if (sortBy.value === 'name-desc') {
    result.sort((a, b) => b.name.common.localeCompare(a.name.common));
  }

  return result;
});

const feelingLucky = () => {
  if (countries.value.length > 0) {
    const random = countries.value[Math.floor(Math.random() * countries.value.length)];
    router.push(`/country/${random.cca3}`); 
  }
};

onMounted(() => { fetchCountries(); });
</script>

<template>
  <section class="hero-section text-center mb-5">
    <div class="container">
      <h1 class="display-4 fw-bold mb-3">
        Explore the World with <span class="text-primary">GeoPulse</span>
      </h1>
      <p class="lead mb-4">Discover details about every country, plan your budget, and track your journey.</p>
      
      <div class="row justify-content-center mb-4">
        <div class="col-md-6">
          <div class="input-group input-group-lg shadow-sm">
            <span class="input-group-text"><i class="bi bi-search text-primary"></i></span>
            <input 
              v-model="searchQuery" 
              type="text" 
              class="form-control border-start-0" 
              placeholder="Search specific country (e.g. Japan)..."
            >
          </div>
        </div>
      </div>
      
      <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
        <div class="btn-group shadow-sm rounded-pill overflow-hidden" role="group">
          <button @click="selectedRegion = 'All'" :class="['btn btn-sm px-3', selectedRegion === 'All' ? 'btn-primary' : 'btn-outline-secondary border-0']">All</button>
          <button 
            v-for="region in regions" 
            :key="region" 
            @click="selectedRegion = region"
            :class="['btn btn-sm px-3', selectedRegion === region ? 'btn-primary' : 'btn-outline-secondary border-0']"
          >
            {{ region }}
          </button>
        </div>

        <select v-model="sortBy" class="form-select form-select-sm d-inline-block w-auto shadow-sm rounded-pill ps-3 pe-5 border-0 bg-white text-muted" style="height: 34px;">
          <option value="population-desc">Population: High to Low</option>
          <option value="population-asc">Population: Low to High</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        <button @click="feelingLucky" class="btn btn-warning btn-sm text-white fw-bold rounded-pill shadow-sm px-3">
          <i class="bi bi-dice-5-fill"></i> Lucky
        </button>
      </div>
    </div>
  </section>

  <div class="container pb-5">
    <div v-if="loading" class="row g-4">
      <div v-for="n in 8" :key="n" class="col-6 col-md-3">
        <div class="card h-100 border-0" aria-hidden="true">
          <div class="bg-secondary opacity-25" style="height: 180px; width: 100%;"></div>
          <div class="card-body">
            <h5 class="card-title placeholder-glow"><span class="placeholder col-6"></span></h5>
            <p class="card-text placeholder-glow"><span class="placeholder col-4"></span></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row g-4">
      <div v-for="country in filteredCountries" :key="country.cca3" class="col-sm-6 col-md-4 col-lg-3">
        <RouterLink :to="`/country/${country.cca3}`" class="text-decoration-none">
          <div class="card country-card h-100">
            <div class="card-img-wrapper">
              <img :src="country.flags.png" class="card-img-top" :alt="country.name.common">
            </div>
            <div class="card-body">
              <h5 class="card-title fw-bold text-truncate">{{ country.name.common }}</h5>
              <div class="d-flex align-items-center justify-content-between mt-3">
                <span class="badge bg-light text-dark border"><i class="bi bi-geo-alt text-danger"></i> {{ country.region }}</span>
                <small class="text-muted"><i class="bi bi-people-fill text-primary"></i> {{ (country.population / 1000000).toFixed(1) }}M</small>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <div v-if="!loading && filteredCountries.length === 0" class="text-center py-5">
        <h3 class="text-muted">No countries found</h3>
      </div>
    </div>
  </div>
</template>