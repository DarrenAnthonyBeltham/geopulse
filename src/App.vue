<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useUserStore } from './stores/user';

const route = useRoute();
const userStore = useUserStore();
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <nav class="navbar navbar-expand-lg sticky-top shadow-sm">
        <div class="container">
          <RouterLink class="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <i class="bi bi-globe-americas fs-4"></i> GeoPulse
          </RouterLink>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-center gap-lg-1">
              <li class="nav-item"><RouterLink class="nav-link" to="/">Home</RouterLink></li>
              <li class="nav-item"><RouterLink class="nav-link" to="/planner">AI Planner</RouterLink></li>
              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Essential</a>
                <ul class="dropdown-menu border-0 shadow-lg bg-surface">
                  <li><RouterLink class="dropdown-item" to="/visa">Visa Checker</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/health">Vaccines & Health</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/sos">Emergency SOS</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/power">Power Adapters</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/transport">Transport Maps</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/clock">World Clock</RouterLink></li>
                </ul>
              </li>
              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Finance</a>
                <ul class="dropdown-menu border-0 shadow-lg bg-surface">
                  <li><RouterLink class="dropdown-item" to="/tools">Converter & Checklist</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/cost">Cost of Living</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/tipping">Tipping Guide</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/charts">Currency Charts</RouterLink></li>
                </ul>
              </li>
              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Lifestyle</a>
                <ul class="dropdown-menu border-0 shadow-lg bg-surface">
                  <li><RouterLink class="dropdown-item" to="/journal">Travel Journal</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/events">Local Events</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/holidays">Holiday Calendar</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/nomad">Digital Nomad Rank</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/esim">eSIM Data Plans</RouterLink></li>
                </ul>
              </li>

              <li class="nav-item ms-lg-3" v-if="!userStore.user">
                <RouterLink to="/login" class="btn btn-sm btn-primary px-4 rounded-pill fw-bold shadow-sm">Login</RouterLink>
              </li>

              <li class="nav-item dropdown ms-lg-3" v-else>
                <a class="nav-link dropdown-toggle d-flex align-items-center gap-2 p-0" href="#" role="button" data-bs-toggle="dropdown">
                  <img :src="userStore.user.avatar" class="rounded-circle border border-2 border-primary" width="36" height="36">
                  <span class="text-main fw-bold">{{ userStore.user.name }}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg bg-surface p-2 mt-2">
                  <li><span class="dropdown-item-text text-muted small">{{ userStore.user.email }}</span></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><RouterLink class="dropdown-item rounded-2" to="/favorites"><i class="bi bi-heart me-2 text-danger"></i> My Bucket List</RouterLink></li>
                  <li><RouterLink class="dropdown-item rounded-2" to="/journal"><i class="bi bi-journal-text me-2 text-primary"></i> My Journal</RouterLink></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><button class="dropdown-item rounded-2 text-danger" @click="userStore.logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</button></li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow-1">
      <RouterView v-slot="{ Component }">
        <transition name="page-slide" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>

    <footer class="bg-surface border-top pt-5 pb-4 mt-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <h5 class="fw-bold text-primary mb-3"><i class="bi bi-globe-americas"></i> GeoPulse</h5>
            <p class="text-muted small">
              The ultimate travel intelligence platform. We provide real-time data, budget tools, and cultural insights to help you explore the world smarter.
            </p>
          </div>
          
          <div class="col-6 col-lg-2">
            <h6 class="fw-bold mb-3">Platform</h6>
            <ul class="list-unstyled small">
              <li class="mb-2"><RouterLink to="/about" class="text-muted text-decoration-none">About Us</RouterLink></li>
              <li class="mb-2"><RouterLink to="/data-sources" class="text-muted text-decoration-none">Data Sources</RouterLink></li>
              <li class="mb-2"><RouterLink to="/api" class="text-muted text-decoration-none">API Access</RouterLink></li>
            </ul>
          </div>
          
          <div class="col-6 col-lg-2">
            <h6 class="fw-bold mb-3">Support</h6>
            <ul class="list-unstyled small">
              <li class="mb-2"><RouterLink to="/help" class="text-muted text-decoration-none">Help Center</RouterLink></li>
              <li class="mb-2"><RouterLink to="/privacy" class="text-muted text-decoration-none">Privacy Policy</RouterLink></li>
              <li class="mb-2"><RouterLink to="/terms" class="text-muted text-decoration-none">Terms of Service</RouterLink></li>
            </ul>
          </div>
          
          <div class="col-lg-4">
            <h6 class="fw-bold mb-3">Stay Updated</h6>
            <p class="text-muted small mb-3">Join 10,000+ travelers getting weekly insights.</p>
            <div class="input-group">
              <input type="email" class="form-control" placeholder="Enter your email">
              <button class="btn btn-primary" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div class="border-top mt-5 pt-4 text-center">
          <p class="text-muted small mb-0">© 2024 GeoPulse Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.dropdown-item { color: var(--text-main); }
.dropdown-item:hover { background-color: var(--bg-input); color: var(--primary); }
</style>