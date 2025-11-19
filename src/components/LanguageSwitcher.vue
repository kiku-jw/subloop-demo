<template>
  <div class="language-switcher">
    <button
      v-for="lang in languages"
      :key="lang.code"
      :class="['lang-btn', { 'lang-btn-active': currentLang === lang.code }]"
      @click="setLanguage(lang.code)"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from '../utils/i18n'

const { currentLang, setLanguage } = useI18n()

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
]
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.lang-btn {
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
}

.lang-btn:hover {
  background-color: hsl(var(--secondary) / 0.8);
  border-color: hsl(var(--ring));
}

.lang-btn-active {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary));
}
</style>


