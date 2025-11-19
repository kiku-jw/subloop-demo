<template>
  <div class="dashboard">
    <header class="header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="mb-2">SubLoop</h1>
            <p class="text-muted">Subscription Tracker & Optimizer</p>
          </div>
          <div class="text-sm text-muted">
            <span class="badge badge-status-active">Demo</span>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="grid grid-cols-1 gap-6 mb-6">
          <SummaryCard
            :savings="totalSavings"
            :recommendations-count="recommendationsCount"
          />
        </div>

        <SubscriptionTable :subscriptions="subscriptions" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import subscriptionsData from '../data/subscriptions.json'
import { calculateTotalSavings } from '../utils/classifier'
import SummaryCard from '../components/SummaryCard.vue'
import SubscriptionTable from '../components/SubscriptionTable.vue'

const subscriptions = ref([])

const totalSavings = computed(() => {
  return calculateTotalSavings(subscriptions.value)
})

const recommendationsCount = computed(() => {
  return subscriptions.value.filter(
    (sub) => sub.recommendation.potential_saving_monthly > 0
  ).length
})

onMounted(() => {
  // Load subscriptions data
  subscriptions.value = subscriptionsData
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
}

.header {
  border-bottom: 1px solid hsl(var(--border));
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.main {
  padding-bottom: 4rem;
}
</style>

