<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const homeCity = ref('New York');
const destCity = ref('Tokyo');
const sliderTime = ref(12);

const cities = [
  { name: 'New York', offset: -4 },
  { name: 'London', offset: 1 },
  { name: 'Paris', offset: 2 },
  { name: 'Dubai', offset: 4 },
  { name: 'Tokyo', offset: 9 },
  { name: 'Sydney', offset: 10 },
  { name: 'Singapore', offset: 8 },
  { name: 'Los Angeles', offset: -7 }
];

const formatTime = (hour) => {
  const h = Math.floor(hour);
  const m = Math.floor((hour - h) * 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
};

const getCityTime = (cityOffset) => {
  const homeOffset = cities.find(c => c.name === homeCity.value).offset;
  const diff = cityOffset - homeOffset;
  let time = sliderTime.value + diff;
  
  if (time >= 24) time -= 24;
  if (time < 0) time += 24;
  
  return {
    val: time,
    display: formatTime(time),
    isNight: time < 6 || time > 20
  };
};
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Time Zone <span class="text-primary">Planner</span></h1>
      <p class="lead text-muted">Find the best time to call home or schedule meetings.</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-lg p-5 bg-surface rounded-4">
          
          <div class="row g-4 align-items-center mb-5">
            <div class="col-md-5">
              <label class="small fw-bold text-muted text-uppercase">Home Base</label>
              <select v-model="homeCity" class="form-select border-0 bg-input shadow-sm">
                <option v-for="c in cities" :key="c.name" :value="c.name">{{ c.name }}</option>
              </select>
              <div class="mt-3 text-center">
                <h2 class="fw-bold text-main">{{ formatTime(sliderTime) }}</h2>
                <span class="badge bg-light text-dark border">You</span>
              </div>
            </div>

            <div class="col-md-2 text-center text-primary">
              <i class="bi bi-arrow-left-right fs-2"></i>
            </div>

            <div class="col-md-5">
              <label class="small fw-bold text-muted text-uppercase">Destination</label>
              <select v-model="destCity" class="form-select border-0 bg-input shadow-sm">
                <option v-for="c in cities" :key="c.name" :value="c.name">{{ c.name }}</option>
              </select>
              <div class="mt-3 text-center">
                <h2 class="fw-bold text-main">{{ getCityTime(cities.find(c => c.name === destCity).offset).display }}</h2>
                <span :class="['badge border', getCityTime(cities.find(c => c.name === destCity).offset).isNight ? 'bg-dark text-white' : 'bg-warning text-dark']">
                  {{ getCityTime(cities.find(c => c.name === destCity).offset).isNight ? 'Night' : 'Day' }}
                </span>
              </div>
            </div>
          </div>

          <div class="px-3">
            <label class="form-label fw-bold text-muted text-center w-100 mb-3">Slide to change time</label>
            <input type="range" v-model="sliderTime" min="0" max="23.75" step="0.25" class="form-range">
            <div class="d-flex justify-content-between text-muted small mt-2">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>11 PM</span>
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
.form-range::-webkit-slider-thumb { background: var(--primary); }
</style>