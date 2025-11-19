<template>
  <div class="legend">
    <div class="legend-section">
      <h4 class="legend-title">{{ t('status') }}</h4>
      <div class="legend-items">
        <div class="legend-item">
          <StatusBadge status="ACTIVE" />
          <span class="legend-text">{{ t('highUsageKeep') }}</span>
        </div>
        <div class="legend-item">
          <StatusBadge status="SEMI_DEAD" />
          <span class="legend-text">{{ t('lowUsageDowngrade') }}</span>
        </div>
        <div class="legend-item">
          <StatusBadge status="DEAD" />
          <span class="legend-text">{{ t('noUsageCancel') }}</span>
        </div>
      </div>
    </div>
    
    <div class="legend-section">
      <h4 class="legend-title">{{ t('actions') }}</h4>
      <div class="legend-items">
        <div class="legend-item">
          <RecommendationBadge action="KEEP" />
          <span class="legend-text">{{ t('noChangesNeeded') }}</span>
        </div>
        <div class="legend-item">
          <RecommendationBadge action="DOWNGRADE" />
          <span class="legend-text">{{ t('reduceSeatsOrPlan') }}</span>
        </div>
        <div class="legend-item">
          <RecommendationBadge action="CANCEL" />
          <span class="legend-text">{{ t('cancelSubscription') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../utils/i18n'
import StatusBadge from './StatusBadge.vue'
import RecommendationBadge from './RecommendationBadge.vue'

const { t } = useI18n()
</script>

<style scoped>
.legend {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: hsl(var(--muted) / 0.3);
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
}

.legend-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.legend-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.25rem;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-text {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

@media (max-width: 768px) {
  .legend {
    grid-template-columns: 1fr;
  }
}
</style>

