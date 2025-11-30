<script setup>
const items = [
  { name: 'Big Mac', usa: 5.58, indo: 2.50, japan: 3.20 },
  { name: 'Coffee', usa: 4.50, indo: 1.80, japan: 3.00 },
  { name: 'Coke (0.5L)', usa: 2.20, indo: 0.60, japan: 1.20 },
  { name: 'Taxi (1km)', usa: 1.70, indo: 0.40, japan: 2.50 },
  { name: 'Cinema Ticket', usa: 14.00, indo: 3.50, japan: 12.00 },
  { name: 'Monthly Rent', usa: 1800.00, indo: 350.00, japan: 900.00 }
];
</script>

<template>
  <div class="container py-5">
    <h1 class="display-4 fw-bold text-center mb-5 text-white">Purchasing <span class="text-success-highlight">Power</span></h1>
    
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden white-card">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-header">
                <tr>
                  <th class="p-4 text-uppercase small fw-bold text-secondary-dark border-0">Item</th>
                  <th class="p-4 text-end text-uppercase small fw-bold text-secondary-dark border-0">🇺🇸 USA</th>
                  <th class="p-4 text-end text-uppercase small fw-bold text-secondary-dark border-0">🇮🇩 Indonesia</th>
                  <th class="p-4 text-end text-uppercase small fw-bold text-secondary-dark border-0">🇯🇵 Japan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.name" class="align-middle border-bottom-light">
                  <td class="p-4 fw-bold text-dark-force fs-5">{{ item.name }}</td>
                  <td class="p-4 text-end fw-bold text-gray-force fs-5">${{ item.usa.toFixed(2) }}</td>
                  <td class="p-4 text-end fw-bold text-green-force fs-5">${{ item.indo.toFixed(2) }}</td>
                  <td class="p-4 text-end fw-bold text-blue-force fs-5">${{ item.japan.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.white-card {
  background-color: #ffffff !important;
}

.table-header {
  background-color: #F1F5F9 !important;
}

.border-bottom-light {
  border-bottom: 1px solid #e2e8f0 !important;
}

.text-white {
  color: #ffffff !important;
}

.text-success-highlight {
  color: #22c55e !important;
}

.text-secondary-dark {
  color: #64748B !important;
}

.text-dark-force {
  color: #0F172A !important;
}

.text-gray-force {
  color: #475569 !important;
}

.text-green-force {
  color: #16a34a !important;
}

.text-blue-force {
  color: #0284c7 !important;
}
</style>