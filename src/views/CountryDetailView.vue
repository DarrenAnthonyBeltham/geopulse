<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../stores/user';

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const country = ref(null);
const weather = ref(null);
const holidays = ref([]);
const borders = ref([]);
const loading = ref(true);

const fetchCountryData = async () => {
  loading.value = true;
  country.value = null;
  weather.value = null;
  holidays.value = [];
  borders.value = [];

  try {
    const code = route.params.code;
    const { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    country.value = data[0];

    if (country.value.latlng) {
      fetchWeather(country.value.latlng[0], country.value.latlng[1]);
    }
    
    fetchHolidays(country.value.cca2);

    if (country.value.borders && country.value.borders.length > 0) {
      fetchBorders(country.value.borders);
    }

  } catch (error) { console.error(error); } 
  finally { loading.value = false; }
};

const fetchWeather = async (lat, lng) => {
  try {
    const { data } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
    weather.value = data.current_weather;
  } catch (error) { console.error(error); }
};

const fetchHolidays = async (ccCode) => {
  try {
    const year = new Date().getFullYear();
    const { data } = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${ccCode}`);
    const today = new Date();
    holidays.value = data.filter(h => new Date(h.date) >= today).slice(0, 5);
  } catch (error) { console.error(error); }
};

const fetchBorders = async (borderCodes) => {
  try {
    const codes = borderCodes.join(',');
    const { data } = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`);
    borders.value = data;
  } catch (error) { console.error(error); }
};

const playPronunciation = () => {
  if (country.value?.name?.common) {
    const utterance = new SpeechSynthesisUtterance(country.value.name.common);
    utterance.lang = 'en-US'; 
    window.speechSynthesis.speak(utterance);
  }
};

const getWeatherIcon = (code) => {
  if (code === 0) return 'bi-sun-fill text-warning';
  if (code < 3) return 'bi-cloud-sun-fill text-info';
  if (code < 50) return 'bi-cloud-fill text-secondary';
  if (code < 80) return 'bi-cloud-rain-fill text-primary';
  return 'bi-snow text-info';
};

const bookFlight = () => {
  const query = `Flights to ${country.value.name.common}`;
  window.open(`http://googleusercontent.com/google.com/travel/flights?q=${encodeURIComponent(query)}`, '_blank');
};

const bookHotel = () => {
  window.open(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(country.value.name.common)}`, '_blank');
};

watch(() => route.params.code, (newCode) => {
  if (newCode) fetchCountryData();
});

onMounted(() => {
  fetchCountryData();
});
</script>

<template>
  <div class="container py-5">
    <button @click="router.back()" class="btn btn-outline-secondary rounded-pill px-4 mb-4 fw-bold">
      <i class="bi bi-arrow-left me-2"></i> Back
    </button>

    <div v-if="loading" class="text-center py-5 mt-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
      <p class="mt-3 text-muted">Loading country data...</p>
    </div>

    <div v-else-if="country" class="animate-fade-in">
      
      <div class="card border-0 shadow-lg overflow-hidden mb-5 hero-card">
        <div class="row g-0">
          <div class="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center">
            <div class="d-flex align-items-center gap-3 mb-3">
              <h1 class="display-3 fw-bold mb-0 lh-1">{{ country.name.common }}</h1>
              
              <div class="d-flex gap-2">
                <button @click="playPronunciation" class="btn btn-glass rounded-circle" title="Listen">
                  <i class="bi bi-volume-up-fill fs-5"></i>
                </button>
                <button 
                  @click="store.toggleFavorite(country)" 
                  class="btn rounded-circle" 
                  :class="store.isFavorite(country.cca3) ? 'btn-danger text-white' : 'btn-glass'"
                  title="Add to Bucket List"
                >
                  <i :class="store.isFavorite(country.cca3) ? 'bi bi-heart-fill' : 'bi bi-heart-fill opacity-50'"></i>
                </button>
              </div>
            </div>

            <h4 class="text-muted fw-light mb-4">{{ country.name.official }}</h4>
            
            <div class="d-flex flex-wrap gap-3">
              <div class="stat-pill">
                <i class="bi bi-geo-alt-fill text-danger"></i> {{ country.region }}
              </div>
              <div class="stat-pill">
                <i class="bi bi-people-fill text-primary"></i> {{ country.population.toLocaleString() }}
              </div>
              <div class="stat-pill">
                <i class="bi bi-building-fill text-success"></i> {{ country.capital?.[0] || 'N/A' }}
              </div>
            </div>
          </div>

          <div class="col-md-5 position-relative bg-light d-flex align-items-center justify-content-center p-4">
             <img :src="country.flags.svg" :alt="country.name.common" class="img-fluid rounded shadow-sm flag-img">
          </div>
        </div>
      </div>

      <div class="cta-banner rounded-4 mb-5 p-5 text-white position-relative overflow-hidden shadow-lg">
        <div class="position-relative z-1 d-md-flex align-items-center justify-content-between text-center text-md-start">
          <div>
            <h2 class="fw-bold mb-2 text-white">Ready to visit {{ country.name.common }}?</h2>
            <p class="mb-0 text-white-50">Compare real-time prices on Google Flights & Booking.com.</p>
          </div>
          <div class="d-flex gap-3 mt-4 mt-md-0 justify-content-center">
            <button @click="bookFlight" class="btn btn-light-custom rounded-pill px-4 fw-bold border-0 shadow-sm hover-lift">
              <i class="bi bi-airplane-fill me-2"></i> Find Flights
            </button>
            <button @click="bookHotel" class="btn btn-outline-custom rounded-pill px-4 fw-bold border-2 hover-lift">
              <i class="bi bi-building-fill me-2"></i> Find Hotels
            </button>
          </div>
        </div>
        <div class="position-absolute top-0 end-0 bg-white opacity-10 rounded-circle" style="width: 300px; height: 300px; margin-right: -80px; margin-top: -80px;"></div>
        <div class="position-absolute bottom-0 start-0 bg-white opacity-10 rounded-circle" style="width: 200px; height: 200px; margin-left: -50px; margin-bottom: -50px;"></div>
      </div>

      <div class="row g-4">
        
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body p-4 text-center">
              <h6 class="text-uppercase text-muted fw-bold mb-4 tracking-wide">Live Weather</h6>
              <div v-if="weather" class="py-2">
                <i :class="['display-1 mb-3 d-block', getWeatherIcon(weather.weathercode)]"></i>
                <h2 class="display-4 fw-bold mb-0 theme-text">{{ weather.temperature }}<span class="fs-4 text-muted">°C</span></h2>
                <div class="badge bg-light text-dark border mt-3 px-3 py-2 rounded-pill">
                  <i class="bi bi-wind"></i> {{ weather.windspeed }} km/h
                </div>
              </div>
              <div v-else class="py-5 text-muted">Fetching weather...</div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm hover-card overflow-hidden">
            <div class="card-body p-0 position-relative h-100">
               <iframe 
                  width="100%" 
                  height="100%" 
                  frameborder="0" 
                  style="border:0; min-height: 300px;" 
                  :src="`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed`" 
                  allowfullscreen>
                </iframe>
                <div class="position-absolute top-0 start-0 m-3">
                  <span class="badge bg-white text-dark shadow-sm">
                    <i class="bi bi-map-fill text-success"></i> Map View
                  </span>
                </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body p-4">
              <h6 class="text-uppercase text-muted fw-bold mb-4 tracking-wide">Details</h6>
              
              <div class="mb-4">
                <small class="d-block text-muted mb-2">Bordering Countries</small>
                <div v-if="borders.length > 0" class="d-flex flex-wrap gap-2">
                  <button 
                    v-for="border in borders" 
                    :key="border.cca3" 
                    @click="router.push(`/country/${border.cca3}`)"
                    class="btn btn-sm btn-outline-secondary rounded-pill"
                  >
                    {{ border.name.common }}
                  </button>
                </div>
                <div v-else class="text-muted small fst-italic">No land borders (Island/Isolated).</div>
              </div>

              <div>
                <small class="d-block text-muted mb-2">Upcoming Holidays</small>
                <ul class="list-group list-group-flush" v-if="holidays.length > 0">
                  <li v-for="holiday in holidays" :key="holiday.date" class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-2 border-bottom-dashed">
                    <span class="fw-medium theme-text-small">{{ holiday.name }}</span>
                    <span class="small text-muted">{{ holiday.date }}</span>
                  </li>
                </ul>
                <div v-else class="text-muted small fst-italic">No upcoming holidays found.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.flag-img {
  max-height: 280px;
  width: auto;
  transform: rotate(-3deg);
  transition: transform 0.3s ease;
}

.hero-card:hover .flag-img {
  transform: rotate(0deg) scale(1.02);
}

.border-bottom-dashed {
  border-bottom: 1px dashed var(--border-color);
}

.cta-banner {
  background: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
}

.opacity-10 {
  opacity: 0.1;
}

.hover-lift {
  transition: transform 0.2s;
}
.hover-lift:hover {
  transform: translateY(-2px);
}

.btn-light-custom {
  background-color: #ffffff !important;
  color: #1a73e8 !important;
}

.btn-outline-custom {
  background-color: transparent !important;
  border-color: #ffffff !important;
  color: #ffffff !important;
}

.btn-outline-custom:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>