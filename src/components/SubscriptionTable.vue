<template>
  <div class="subscriptions-container">
    <div class="subscriptions-header">
      <h3>{{ t('subscriptions') }} ({{ filteredSubscriptions.length }})</h3>
      <div class="filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :class="[
            'filter-btn',
            activeFilter === filter.value ? 'filter-btn-active' : ''
          ]"
          @click="activeFilter = filter.value"
        >
          <span class="filter-icon">{{ filter.icon }}</span>
          <span>{{ filter.label }}</span>
        </button>
      </div>
    </div>
    
    <!-- Desktop Table View -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>{{ t('service') }}</th>
            <th>{{ t('cost') }}</th>
            <th>{{ t('status') }}</th>
            <th>{{ t('recommendation') }}</th>
            <th class="text-right">{{ t('savings') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="subscription in filteredSubscriptions" 
            :key="subscription.id"
            :class="{ 'row-highlight': subscription.recommendation.potential_saving_monthly > 0 }"
          >
            <td>
              <div class="service-info">
                <div class="service-name">{{ subscription.vendor }}</div>
                <div class="service-plan">{{ subscription.plan }}</div>
              </div>
            </td>
            <td>
              <div class="cost">
                <span class="cost-amount">${{ formatCurrency(subscription.amount) }}</span>
                <span class="cost-period">/{{ subscription.billing_period === 'monthly' ? 'mo' : 'yr' }}</span>
              </div>
            </td>
            <td>
              <StatusBadge :status="subscription.status" />
            </td>
            <td>
              <div class="recommendation-cell">
                <RecommendationBadge :action="subscription.recommendation.action" />
                <div class="recommendation-reason">{{ subscription.recommendation.reason }}</div>
              </div>
            </td>
            <td class="text-right">
              <div v-if="subscription.recommendation.potential_saving_monthly > 0" class="savings">
                <span class="savings-amount">${{ formatCurrency(subscription.recommendation.potential_saving_monthly) }}</span>
                <span class="savings-period">/mo</span>
              </div>
              <span v-else class="text-muted">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Mobile Card View -->
    <div class="cards-container">
      <div 
        v-for="subscription in filteredSubscriptions" 
        :key="subscription.id"
        class="subscription-card"
        :class="{ 'card-highlight': subscription.recommendation.potential_saving_monthly > 0 }"
      >
        <div class="card-header">
          <div class="service-info">
            <div class="service-name">{{ subscription.vendor }}</div>
            <div class="service-plan">{{ subscription.plan }}</div>
          </div>
          <div class="cost">
            <span class="cost-amount">${{ formatCurrency(subscription.amount) }}</span>
            <span class="cost-period">/{{ subscription.billing_period === 'monthly' ? 'mo' : 'yr' }}</span>
          </div>
        </div>
        
        <div class="card-body">
          <div class="card-row">
            <span class="card-label">{{ t('status') }}</span>
            <StatusBadge :status="subscription.status" />
          </div>
          
          <div class="card-row">
            <span class="card-label">{{ t('recommendation') }}</span>
            <div class="recommendation-mobile">
              <RecommendationBadge :action="subscription.recommendation.action" />
            </div>
          </div>
          
          <div class="card-row">
            <span class="card-label">{{ t('reason') }}</span>
            <span class="card-value">{{ subscription.recommendation.reason }}</span>
          </div>
          
          <div v-if="subscription.recommendation.potential_saving_monthly > 0" class="card-savings">
            <span class="card-label">{{ t('potentialSavingsLabel') }}</span>
            <span class="savings-amount">${{ formatCurrency(subscription.recommendation.potential_saving_monthly) }}/mo</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../utils/i18n'
import StatusBadge from './StatusBadge.vue'
import RecommendationBadge from './RecommendationBadge.vue'

const props = defineProps({
  subscriptions: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const { t } = useI18n()

const filters = computed(() => [
  { value: 'ALL', label: t('all'), icon: '📋' },
  { value: 'ACTIVE', label: t('active'), icon: '✅' },
  { value: 'SEMI_DEAD', label: t('lowUsage'), icon: '⚠️' },
  { value: 'DEAD', label: t('unused'), icon: '❌' },
])
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
.subscriptions-container {
  background-color: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.5rem;
}

.subscriptions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.subscriptions-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: hsl(var(--secondary) / 0.8);
  border-color: hsl(var(--ring));
}

.filter-btn-active {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary));
}

.filter-icon {
  font-size: 1rem;
}

.table-container {
  display: block;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .table-container {
    display: none;
  }
}

.cards-container {
  display: none;
}

@media (max-width: 768px) {
  .cards-container {
    display: block;
  }
}

.table tbody tr.row-highlight {
  background-color: hsl(var(--status-semi-dead) / 0.1);
  border-left: 3px solid hsl(var(--status-semi-dead));
}

.service-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.service-name {
  font-weight: 600;
  font-size: 0.9375rem;
}

.service-plan {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
}

.cost {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.cost-amount {
  font-weight: 600;
  font-size: 1rem;
}

.cost-period {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
}

.recommendation-cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 200px;
}

.recommendation-reason {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.4;
}

.savings {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  justify-content: flex-end;
}

.savings-amount {
  font-weight: 700;
  font-size: 1.125rem;
  color: hsl(var(--status-active));
}

.savings-period {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
}

.text-right {
  text-align: right;
}

/* Mobile Cards */
.subscription-card {
  background-color: hsl(var(--muted) / 0.2);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.25rem;
  margin-bottom: 1rem;
  transition: all 0.2s;
}

.subscription-card:hover {
  border-color: hsl(var(--ring));
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.subscription-card.card-highlight {
  border-left: 3px solid hsl(var(--status-semi-dead));
  background-color: hsl(var(--status-semi-dead) / 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid hsl(var(--border));
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.card-label {
  font-size: 0.8125rem;
  color: hsl(var(--muted-foreground));
  font-weight: 500;
}

.card-value {
  font-size: 0.875rem;
  text-align: right;
  flex: 1;
}

.recommendation-mobile {
  display: flex;
  align-items: center;
}

.card-savings {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  border-top: 1px solid hsl(var(--border));
}

.card-savings .savings-amount {
  font-size: 1.25rem;
}
</style>

