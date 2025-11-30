<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '../stores/user';

const store = useUserStore();
const amount = ref(1);
const fromCurrency = ref('USD');
const toCurrency = ref('EUR');
const result = ref(null);
const newTask = ref('');
const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'IDR', 'KRW'];

const convertCurrency = async () => {
  if (fromCurrency.value === toCurrency.value) {
    result.value = amount.value;
    return;
  }
  try {
    const { data } = await axios.get(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${fromCurrency.value}&to=${toCurrency.value}`);
    result.value = data.rates[toCurrency.value];
  } catch (error) { alert('API Error'); }
};

const addTask = () => {
  if (newTask.value.trim()) {
    store.addTask(newTask.value);
    newTask.value = '';
  }
};
</script>

<template>
  <div class="container py-5">
    <h1 class="display-4 fw-bold mb-5 text-center">
      Travel <span class="text-primary">Tools</span>
    </h1>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body p-4">
            <h3 class="card-title fw-bold mb-4"><i class="bi bi-cash-coin text-success"></i> Converter</h3>
            
            <div class="mb-3">
              <label class="form-label text-muted">Amount</label>
              <input v-model="amount" type="number" class="form-control form-control-lg">
            </div>

            <div class="row g-2 mb-3">
              <div class="col-6">
                <label class="form-label text-muted">From</label>
                <select v-model="fromCurrency" class="form-select form-select-lg">
                  <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label text-muted">To</label>
                <select v-model="toCurrency" class="form-select form-select-lg">
                  <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <button @click="convertCurrency" class="btn btn-primary w-100 btn-lg mb-4">Convert</button>

            <div v-if="result" class="alert alert-light border text-center">
              <span class="text-muted">Result:</span>
              <h2 class="fw-bold m-0 text-success">{{ result.toFixed(2) }} {{ toCurrency }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body p-4">
            <h3 class="card-title fw-bold mb-4"><i class="bi bi-check2-square text-warning"></i> Checklist</h3>
            
            <div class="input-group mb-3">
              <input 
                v-model="newTask" 
                @keyup.enter="addTask" 
                type="text" 
                class="form-control" 
                placeholder="Add item (e.g. Passport)..."
              >
              <button @click="addTask" class="btn btn-primary"><i class="bi bi-plus-lg"></i></button>
            </div>

            <ul class="list-group list-group-flush">
              <li 
                v-for="task in store.checklist" 
                :key="task.id" 
                class="list-group-item d-flex justify-content-between align-items-center px-0"
              >
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    :checked="task.done" 
                    @change="store.toggleTask(task.id)"
                  >
                  <label :class="['form-check-label', task.done ? 'text-decoration-line-through text-muted' : '']">
                    {{ task.text }}
                  </label>
                </div>
                <button @click="store.removeTask(task.id)" class="btn btn-sm text-danger border-0"><i class="bi bi-trash"></i></button>
              </li>
              <li v-if="store.checklist.length === 0" class="list-group-item text-center text-muted border-0 fst-italic py-4">
                Your travel list is empty.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>