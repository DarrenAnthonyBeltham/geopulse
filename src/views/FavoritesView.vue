<script setup>
import { useUserStore } from '../stores/user';
import { RouterLink } from 'vue-router';

const store = useUserStore();
</script>

<template>
  <div class="container py-5">
    <h1 class="display-4 fw-bold mb-4 text-center">
      My <span class="text-danger">Bucket List</span>
    </h1>
    
    <div v-if="store.favorites.length === 0" class="text-center py-5">
      <div class="mb-3">
        <i class="bi bi-heartbreak text-muted opacity-25" style="font-size: 5rem;"></i>
      </div>
      <h3 class="text-muted">No favorites yet.</h3>
      <p class="text-muted mb-4">Go explore and heart some countries!</p>
      <RouterLink to="/" class="btn btn-primary rounded-pill px-4">Find Countries</RouterLink>
    </div>

    <div v-else class="row g-4">
      <div v-for="country in store.favorites" :key="country.cca3" class="col-sm-6 col-md-4 col-lg-3">
        <RouterLink :to="`/country/${country.cca3}`" class="text-decoration-none">
          <div class="card country-card h-100">
            <div class="position-relative">
              <img :src="country.flags.png" class="card-img-top" :alt="country.name.common" style="height: 160px; object-fit: cover;">
              <button @click.prevent="store.toggleFavorite(country)" class="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm text-danger">
                <i class="bi bi-heart-fill"></i>
              </button>
            </div>
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ country.name.common }}</h5>
              <p class="card-text small"><i class="bi bi-geo-alt text-danger"></i> {{ country.region }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>