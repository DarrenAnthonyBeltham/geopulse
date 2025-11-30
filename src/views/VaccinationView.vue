<script setup>
const vaccines = [
  { country: 'Brazil', req: 'Yellow Fever', rec: 'Hepatitis A, Typhoid' },
  { country: 'Thailand', req: 'None', rec: 'Hepatitis A, B, Tetanus' },
  { country: 'Kenya', req: 'Yellow Fever', rec: 'Malaria Prophylaxis, Typhoid' },
  { country: 'Egypt', req: 'None', rec: 'Hepatitis A, Typhoid' }
];
</script>

<template>
  <div class="container py-5">
    <h1 class="display-4 fw-bold text-center mb-5">Health & <span class="text-info">Vaccines</span></h1>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="list-group shadow-sm rounded-4 overflow-hidden">
          <div v-for="(v, i) in vaccines" :key="i" class="list-group-item p-4 border-0 border-bottom bg-surface">
            <h5 class="fw-bold text-main mb-2">{{ v.country }}</h5>
            <p class="mb-1 text-danger"><i class="bi bi-exclamation-circle-fill me-2"></i>Required: {{ v.req }}</p>
            <p class="mb-0 text-success"><i class="bi bi-check-circle-fill me-2"></i>Recommended: {{ v.rec }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.text-main { color: var(--text-main); }
</style>