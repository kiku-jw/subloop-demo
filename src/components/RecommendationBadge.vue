<template>
  <span :class="badgeClass" class="badge">
    {{ t(action) }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../utils/i18n'

const { t } = useI18n()

const props = defineProps({
  action: {
    type: String,
    required: true,
    validator: (value) => ['KEEP', 'DOWNGRADE', 'CANCEL'].includes(value),
  },
})

const badgeClass = computed(() => {
  const actionMap = {
    KEEP: 'badge-action-keep',
    DOWNGRADE: 'badge-action-downgrade',
    CANCEL: 'badge-action-cancel',
  }
  return actionMap[props.action] || 'badge-action-keep'
})
</script>

