<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter();
const store = useUserStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const showToast = ref(false);

const handleLogin = () => {
  if (!email.value || !password.value) return;

  isLoading.value = true;

  setTimeout(() => {
    store.login(email.value);
    isLoading.value = false;
    showToast.value = true;

    setTimeout(() => {
      router.push('/');
    }, 1500);
  }, 1000);
};
</script>

<template>
  <div class="container py-5 h-100 position-relative">
    
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1050;">
      <div class="toast border-0 shadow-lg show align-items-center text-white bg-success" role="alert" v-if="showToast">
        <div class="d-flex">
          <div class="toast-body fs-6">
            <i class="bi bi-check-circle-fill me-2"></i> Welcome back, {{ email.split('@')[0] }}!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="showToast = false"></button>
        </div>
      </div>
    </div>

    <div class="row justify-content-center align-items-center h-100">
      <div class="col-md-5">
        <div class="card border-0 shadow-lg p-4 p-md-5 bg-surface rounded-4 slide-in">
          <div class="text-center mb-4">
            <div class="bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
              <i class="bi bi-globe-americas display-4"></i>
            </div>
            <h3 class="fw-bold text-main">Welcome Back</h3>
            <p class="text-muted">Login to sync your travel plans.</p>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label text-muted small fw-bold">Email Address</label>
              <div class="input-group">
                <span class="input-group-text bg-input border-end-0 text-primary"><i class="bi bi-envelope"></i></span>
                <input v-model="email" type="email" class="form-control bg-input border-start-0" placeholder="name@example.com" required>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted small fw-bold">Password</label>
              <div class="input-group">
                <span class="input-group-text bg-input border-end-0 text-primary"><i class="bi bi-lock"></i></span>
                <input v-model="password" type="password" class="form-control bg-input border-start-0" placeholder="••••••••" required>
              </div>
            </div>
            <button 
              type="submit" 
              class="btn w-100 btn-lg rounded-pill fw-bold transition-all" 
              :class="showToast ? 'btn-success' : 'btn-primary'"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
              <span v-else-if="showToast"><i class="bi bi-check-lg me-2"></i>Success</span>
              <span v-else>Sign In</span>
            </button>
          </form>
          
          <div class="text-center mt-4">
            <a href="#" class="text-decoration-none small text-muted hover-text-primary">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface { background-color: var(--bg-surface); }
.bg-input { background-color: var(--bg-input); border-color: var(--border-color); }
.text-main { color: var(--text-main); }
.bg-primary-subtle { background-color: rgba(14, 165, 233, 0.1); }

.slide-in {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.input-group-text {
  border-color: var(--border-color);
}

.form-control:focus {
  border-color: var(--primary);
  box-shadow: none;
}

.input-group:focus-within .input-group-text {
  border-color: var(--primary);
}

.transition-all {
  transition: all 0.3s ease;
}

.hover-text-primary:hover {
  color: var(--primary) !important;
}
</style>