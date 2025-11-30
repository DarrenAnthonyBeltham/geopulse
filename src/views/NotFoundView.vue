<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container text-center py-5 vh-100 d-flex flex-column justify-content-center align-items-center">
    <h1 class="display-1 fw-bold text-primary">404</h1>
    <h2 class="mb-4">Oops! Destination Not Found.</h2>
    <p class="lead text-muted mb-5">
      We couldn't locate the country you are looking for on our map.<br>
      It might have moved, or the URL is incorrect.
    </p>
    <RouterLink to="/" class="btn btn-primary btn-lg rounded-pill px-5">
      <i class="bi bi-house-door-fill"></i> Return to Base
    </RouterLink>
  </div>
</template>