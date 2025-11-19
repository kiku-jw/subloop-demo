<template>
  <div class="dashboard">
    <header class="header">
      <div class="container">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="mb-2">{{ t('appName') }}</h1>
            <p class="text-muted">{{ t('appDescription') }}</p>
          </div>
          <div class="flex items-center gap-4">
            <LanguageSwitcher />
            <div class="text-sm text-muted">
              <span class="badge badge-status-active">{{ t('demo') }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <HeroSection />
        
        <div class="grid grid-cols-1 gap-6 mb-6">
          <SummaryCard
            :savings="totalSavings"
            :recommendations-count="recommendationsCount"
          />
        </div>

        <div class="mb-6">
          <Legend />
        </div>

        <SubscriptionTable :subscriptions="prioritizedSubscriptions" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../utils/i18n'
import subscriptionsData from '../data/subscriptions.json'
import { calculateTotalSavings } from '../utils/classifier'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import HeroSection from '../components/HeroSection.vue'
import SummaryCard from '../components/SummaryCard.vue'
import Legend from '../components/Legend.vue'
import SubscriptionTable from '../components/SubscriptionTable.vue'

const { t } = useI18n()

const subscriptions = ref([])

const totalSavings = computed(() => {
  return calculateTotalSavings(subscriptions.value)
})

const recommendationsCount = computed(() => {
  return subscriptions.value.filter(
    (sub) => sub.recommendation.potential_saving_monthly > 0
  ).length
})

// Prioritize subscriptions: show recommendations first, then by status
const prioritizedSubscriptions = computed(() => {
  return [...subscriptions.value].sort((a, b) => {
    // First: subscriptions with savings
    const aHasSavings = a.recommendation.potential_saving_monthly > 0
    const bHasSavings = b.recommendation.potential_saving_monthly > 0
    
    if (aHasSavings && !bHasSavings) return -1
    if (!aHasSavings && bHasSavings) return 1
    
    // Second: by savings amount (descending)
    if (aHasSavings && bHasSavings) {
      return b.recommendation.potential_saving_monthly - a.recommendation.potential_saving_monthly
    }
    
    // Third: by status (DEAD > SEMI_DEAD > ACTIVE)
    const statusOrder = { DEAD: 0, SEMI_DEAD: 1, ACTIVE: 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })
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

