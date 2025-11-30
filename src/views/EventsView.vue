<script setup>
import { ref, computed } from 'vue';

const city = ref('London');
const loading = ref(false);
const events = ref([]);

const mockData = {
  'London': [
    { name: 'Wimbledon Tennis', date: 'Jul 1 - Jul 14', venue: 'All England Club', type: 'Sports', color: 'success' },
    { name: 'British Summer Time', date: 'Jul 6', venue: 'Hyde Park', type: 'Music', color: 'primary' },
    { name: 'Notting Hill Carnival', date: 'Aug 25', venue: 'Notting Hill', type: 'Festival', color: 'warning' },
    { name: 'Hamilton: The Musical', date: 'Daily', venue: 'Victoria Palace', type: 'Theatre', color: 'info' }
  ],
  'Tokyo': [
    { name: 'Sumo Tournament', date: 'Sep 8 - Sep 22', venue: 'Ryogoku Kokugikan', type: 'Sports', color: 'success' },
    { name: 'Tokyo Game Show', date: 'Sep 26', venue: 'Makuhari Messe', type: 'Expo', color: 'danger' },
    { name: 'Summer Sonic', date: 'Aug 17', venue: 'ZOZO Marine Stadium', type: 'Music', color: 'primary' }
  ],
  'New York': [
    { name: 'US Open', date: 'Aug 26', venue: 'Arthur Ashe Stadium', type: 'Sports', color: 'success' },
    { name: 'Gov Ball', date: 'Jun 7', venue: 'Flushing Meadows', type: 'Music', color: 'primary' },
    { name: 'NY Fashion Week', date: 'Sep 6', venue: 'Manhattan', type: 'Fashion', color: 'dark' }
  ]
};

const fetchEvents = () => {
  loading.value = true;
  setTimeout(() => {
    events.value = mockData[city.value] || [];
    loading.value = false;
  }, 1000);
};

const cities = Object.keys(mockData);
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Local <span class="text-primary">Events</span></h1>
      <p class="lead text-muted">Discover what's happening nearby.</p>
    </div>

    <div class="row justify-content-center mb-5">
      <div class="col-md-6">
        <div class="input-group input-group-lg shadow-sm">
          <select v-model="city" class="form-select bg-surface border-0 shadow-sm">
            <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
          </select>
          <button @click="fetchEvents" class="btn btn-primary px-4 fw-bold">Search</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else class="row g-4">
      <div v-for="(event, i) in events" :key="i" class="col-md-6">
        <div class="card border-0 shadow-sm bg-surface rounded-4 h-100 hover-card">
          <div class="card-body p-4 d-flex align-items-center">
            <div :class="`bg-${event.color} bg-opacity-10 text-${event.color} rounded-3 p-3 me-4 text-center`" style="min-width: 80px;">
              <span class="d-block fw-bold small text-uppercase">{{ event.type }}</span>
            </div>
            <div>
              <h5 class="fw-bold text-main mb-1">{{ event.name }}</h5>
              <p class="text-muted mb-1 small"><i class="bi bi-calendar3 me-2"></i>{{ event.date }}</p>
              <p class="text-muted mb-0 small"><i class="bi bi-geo-alt me-2"></i>{{ event.venue }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="events.length === 0" class="text-center py-5 text-muted">
        Select a city and click search to view events.
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.text-main { color: var(--text-main); }
.hover-card:hover { transform: translateY(-5px); transition: transform 0.3s; }
.bg-opacity-10 { --bs-bg-opacity: 0.1; }
</style>