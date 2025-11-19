/**
 * Simple i18n implementation
 */

import { ref, readonly } from 'vue'

const translations = {
  ru: {
    // Header
    appName: 'SubLoop',
    appDescription: 'Трекер и оптимизатор подписок',
    demo: 'Демо',
    
    // Hero
    heroTitle: 'Оптимизируйте ваши подписки',
    heroDescription: 'SubLoop анализирует ваши подписки и находит возможности для экономии. Просмотрите рекомендации ниже и примите меры по неиспользуемым или малоиспользуемым сервисам.',
    
    // Summary
    potentialSavings: 'Потенциальная экономия',
    monthly: 'В месяц',
    yearly: 'В год',
    recommendation: 'рекомендация',
    recommendations: 'рекомендации',
    reviewRecommendations: '💡 Просмотрите рекомендации ниже для оптимизации подписок',
    allOptimized: '✅ Все подписки оптимизированы',
    
    // Legend
    status: 'Статус',
    actions: 'Действия',
    highUsageKeep: 'Высокое использование, оставить как есть',
    lowUsageDowngrade: 'Низкое использование, рассмотреть уменьшение',
    noUsageCancel: 'Нет использования, отменить для экономии',
    noChangesNeeded: 'Изменения не требуются',
    reduceSeatsOrPlan: 'Уменьшить места или тариф',
    cancelSubscription: 'Отменить подписку',
    
    // Table
    subscriptions: 'Подписки',
    service: 'Сервис',
    cost: 'Стоимость',
    status: 'Статус',
    recommendation: 'Рекомендация',
    savings: 'Экономия',
    
    // Filters
    all: 'Все',
    active: 'Активные',
    lowUsage: 'Малоиспользуемые',
    unused: 'Неиспользуемые',
    
    // Status
    ACTIVE: 'АКТИВНА',
    SEMI_DEAD: 'МАЛОИСПОЛЬЗУЕМА',
    DEAD: 'НЕИСПОЛЬЗУЕМА',
    
    // Actions
    KEEP: 'ОСТАВИТЬ',
    DOWNGRADE: 'УМЕНЬШИТЬ',
    CANCEL: 'ОТМЕНИТЬ',
    
    // Mobile cards
    reason: 'Причина',
    potentialSavingsLabel: 'Потенциальная экономия',
  },
  en: {
    // Header
    appName: 'SubLoop',
    appDescription: 'Subscription Tracker & Optimizer',
    demo: 'Demo',
    
    // Hero
    heroTitle: 'Optimize Your Subscriptions',
    heroDescription: 'SubLoop analyzes your subscriptions and identifies opportunities to save money. Review recommendations below and take action on unused or underutilized services.',
    
    // Summary
    potentialSavings: 'Potential Savings',
    monthly: 'Monthly',
    yearly: 'Yearly',
    recommendation: 'recommendation',
    recommendations: 'recommendations',
    reviewRecommendations: '💡 Review recommendations below to optimize your subscriptions',
    allOptimized: '✅ All subscriptions are optimized',
    
    // Legend
    status: 'Status',
    actions: 'Actions',
    highUsageKeep: 'High usage, keep as is',
    lowUsageDowngrade: 'Low usage, consider downgrading',
    noUsageCancel: 'No usage, cancel to save',
    noChangesNeeded: 'No changes needed',
    reduceSeatsOrPlan: 'Reduce seats or plan',
    cancelSubscription: 'Cancel subscription',
    
    // Table
    subscriptions: 'Subscriptions',
    service: 'Service',
    cost: 'Cost',
    status: 'Status',
    recommendation: 'Recommendation',
    savings: 'Savings',
    
    // Filters
    all: 'All',
    active: 'Active',
    lowUsage: 'Low Usage',
    unused: 'Unused',
    
    // Status
    ACTIVE: 'ACTIVE',
    SEMI_DEAD: 'SEMI_DEAD',
    DEAD: 'DEAD',
    
    // Actions
    KEEP: 'KEEP',
    DOWNGRADE: 'DOWNGRADE',
    CANCEL: 'CANCEL',
    
    // Mobile cards
    reason: 'Reason',
    potentialSavingsLabel: 'Potential Savings',
  },
}

// Get language from localStorage or default to 'ru'
function getInitialLanguage() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('subloop-language')
    if (saved && translations[saved]) {
      return saved
    }
  }
  return 'ru'
}

// Global reactive language state
const currentLang = ref(getInitialLanguage())

export function useI18n() {
  function t(key) {
    return translations[currentLang.value]?.[key] || key
  }
  
  function setLanguage(lang) {
    if (translations[lang]) {
      currentLang.value = lang
      if (typeof window !== 'undefined') {
        localStorage.setItem('subloop-language', lang)
      }
    }
  }
  
  return {
    t,
    currentLang: readonly(currentLang),
    setLanguage,
  }
}

