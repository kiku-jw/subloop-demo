<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3>Subscriptions</h3>
      <div class="flex gap-2">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="[
            'btn btn-secondary text-sm',
            activeFilter === filter ? 'opacity-100' : 'opacity-50'
          ]"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Activity</th>
            <th>Recommendation</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subscription in filteredSubscriptions" :key="subscription.id">
            <td class="font-medium">{{ subscription.vendor }}</td>
            <td class="text-muted">{{ subscription.plan }}</td>
            <td>${{ formatCurrency(subscription.amount) }}/{{ subscription.billing_period === 'monthly' ? 'mo' : 'yr' }}</td>
            <td>
              <StatusBadge :status="subscription.status" />
            </td>
            <td class="text-sm text-muted">
              {{ subscription.activity_events }} events
            </td>
            <td>
              <div class="flex flex-col gap-1">
                <RecommendationBadge :action="subscription.recommendation.action" />
                <span class="text-xs text-muted">{{ subscription.recommendation.reason }}</span>
              </div>
            </td>
            <td class="font-semibold">
              <span v-if="subscription.recommendation.potential_saving_monthly > 0">
                ${{ formatCurrency(subscription.recommendation.potential_saving_monthly) }}/mo
              </span>
              <span v-else class="text-muted">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StatusBadge from './StatusBadge.vue'
import RecommendationBadge from './RecommendationBadge.vue'

const props = defineProps({
  subscriptions: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const filters = ['ALL', 'ACTIVE', 'SEMI_DEAD', 'DEAD']
const activeFilter = ref('ALL')

const filteredSubscriptions = computed(() => {
  if (activeFilter.value === 'ALL') {
    return props.subscriptions
  }
  return props.subscriptions.filter(
    (sub) => sub.status === activeFilter.value
  )
})

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
</script>

<style scoped>
.opacity-50 {
  opacity: 0.5;
}

.opacity-100 {
  opacity: 1;
}
</style>

