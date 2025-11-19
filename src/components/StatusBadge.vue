<template>
  <span :class="badgeClass" class="badge">
    {{ t(status) }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../utils/i18n'

const { t } = useI18n()

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['ACTIVE', 'SEMI_DEAD', 'DEAD'].includes(value),
  },
})

const badgeClass = computed(() => {
  const statusMap = {
    ACTIVE: 'badge-status-active',
    SEMI_DEAD: 'badge-status-semi-dead',
    DEAD: 'badge-status-dead',
  }
  return statusMap[props.status] || 'badge-status-active'
})
</script>

