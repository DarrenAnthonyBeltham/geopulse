<script setup>
import { ref, onMounted } from 'vue';

const entries = ref([]);
const newEntry = ref({ location: '', date: '', note: '' });

const saveEntry = () => {
  if (!newEntry.value.location || !newEntry.value.note) return;
  entries.value.unshift({ ...newEntry.value, id: Date.now() });
  localStorage.setItem('geo_journal', JSON.stringify(entries.value));
  newEntry.value = { location: '', date: '', note: '' };
};

const deleteEntry = (id) => {
  entries.value = entries.value.filter(e => e.id !== id);
  localStorage.setItem('geo_journal', JSON.stringify(entries.value));
};

onMounted(() => {
  const saved = localStorage.getItem('geo_journal');
  if (saved) entries.value = JSON.parse(saved);
});
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold">Travel <span class="text-success">Journal</span></h1>
      <p class="lead text-muted">Document your journey. Saved securely to your device.</p>
    </div>

    <div class="row g-5">
      <div class="col-lg-4">
        <div class="card border-0 shadow-lg bg-surface rounded-4 p-4 sticky-top" style="top: 100px; z-index: 1;">
          <h4 class="fw-bold text-main mb-4">New Entry</h4>
          <div class="mb-3">
            <label class="form-label text-muted small">Location</label>
            <input v-model="newEntry.location" type="text" class="form-control bg-input border-0 shadow-sm" placeholder="e.g. Kyoto">
          </div>
          <div class="mb-3">
            <label class="form-label text-muted small">Date</label>
            <input v-model="newEntry.date" type="date" class="form-control bg-input border-0 shadow-sm">
          </div>
          <div class="mb-4">
            <label class="form-label text-muted small">Memories</label>
            <textarea v-model="newEntry.note" class="form-control bg-input border-0 shadow-sm" rows="4" placeholder="Today I visited..."></textarea>
          </div>
          <button @click="saveEntry" class="btn btn-primary w-100 rounded-pill">Save Entry</button>
        </div>
      </div>

      <div class="col-lg-8">
        <div v-if="entries.length === 0" class="text-center py-5">
          <i class="bi bi-journal-album text-muted opacity-25" style="font-size: 5rem;"></i>
          <h3 class="text-muted mt-3">Your journal is empty.</h3>
        </div>

        <div v-else class="d-flex flex-column gap-4">
          <div v-for="entry in entries" :key="entry.id" class="card border-0 shadow-sm bg-surface rounded-4 hover-card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h4 class="fw-bold text-primary mb-1">{{ entry.location }}</h4>
                  <small class="text-muted"><i class="bi bi-calendar3 me-2"></i>{{ entry.date }}</small>
                </div>
                <button @click="deleteEntry(entry.id)" class="btn btn-sm btn-outline-danger border-0 rounded-circle">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
              <p class="text-main mb-0" style="white-space: pre-wrap;">{{ entry.note }}</p>
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
.hover-card { transition: transform 0.2s; }
.hover-card:hover { transform: translateY(-3px); }
</style>