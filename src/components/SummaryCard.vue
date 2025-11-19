<template>
  <div class="summary-card">
    <div class="summary-header">
      <h3 class="summary-title">Potential Savings</h3>
      <span v-if="recommendationsCount > 0" class="summary-badge">
        {{ recommendationsCount }} {{ recommendationsCount === 1 ? 'recommendation' : 'recommendations' }}
      </span>
    </div>
    
    <div class="summary-amounts">
      <div class="summary-amount">
        <p class="summary-label">Monthly</p>
        <p class="summary-value">${{ formatCurrency(savings.monthly) }}</p>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-amount">
        <p class="summary-label">Yearly</p>
        <p class="summary-value summary-value-yearly">${{ formatCurrency(savings.yearly) }}</p>
      </div>
    </div>
    
    <div v-if="savings.monthly > 0" class="summary-footer">
      <p class="summary-hint">
        💡 Review recommendations below to optimize your subscriptions
      </p>
    </div>
    <div v-else class="summary-footer">
      <p class="summary-hint">
        ✅ All subscriptions are optimized
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
.summary-card {
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.2) 100%);
  border: 2px solid hsl(var(--status-active) / 0.3);
  border-radius: var(--radius);
  padding: 2rem;
  transition: all 0.3s ease;
}

.summary-card:hover {
  border-color: hsl(var(--status-active) / 0.5);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.summary-badge {
  background-color: hsl(var(--status-active) / 0.2);
  color: hsl(var(--status-active));
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid hsl(var(--status-active) / 0.3);
}

.summary-amounts {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.summary-amount {
  text-align: center;
}

.summary-label {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-value {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(to right, hsl(var(--status-active)), hsl(var(--status-semi-dead)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.summary-value-yearly {
  font-size: 2rem;
}

.summary-divider {
  width: 1px;
  height: 60px;
  background-color: hsl(var(--border));
}

.summary-footer {
  padding-top: 1.5rem;
  border-top: 1px solid hsl(var(--border));
}

.summary-hint {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  text-align: center;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .summary-card {
    padding: 1.5rem;
  }
  
  .summary-amounts {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .summary-divider {
    display: none;
  }
  
  .summary-value {
    font-size: 2rem;
  }
  
  .summary-value-yearly {
    font-size: 1.75rem;
  }
}
</style>

