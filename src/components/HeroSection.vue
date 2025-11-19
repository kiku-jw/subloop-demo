<template>
  <div class="hero">
    <div class="hero-content">
      <h2 class="hero-title">{{ t('heroTitle') }}</h2>
      <p class="hero-description">
        {{ t('heroDescription') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../utils/i18n'

const { t } = useI18n()
</script>

<style scoped>
.hero {
  margin-bottom: 2rem;
}

.hero-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  background: linear-gradient(to right, hsl(var(--foreground)), hsl(var(--muted-foreground)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-description {
    font-size: 0.875rem;
  }
}
</style>

