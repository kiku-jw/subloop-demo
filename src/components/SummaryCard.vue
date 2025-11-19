<template>
  <div class="card">
    <h3 class="mb-4">Potential Savings</h3>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm text-muted mb-1">Monthly</p>
        <p class="text-3xl font-bold">${{ formatCurrency(savings.monthly) }}</p>
      </div>
      <div>
        <p class="text-sm text-muted mb-1">Yearly</p>
        <p class="text-3xl font-bold">${{ formatCurrency(savings.yearly) }}</p>
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-border">
      <p class="text-sm text-muted">
        Based on {{ recommendationsCount }} recommendations
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  savings: {
    type: Object,
    required: true,
    default: () => ({ monthly: 0, yearly: 0 }),
  },
  recommendationsCount: {
    type: Number,
    default: 0,
  },
})

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
</script>

<style scoped>
.border-border {
  border-color: hsl(var(--border));
}
</style>

