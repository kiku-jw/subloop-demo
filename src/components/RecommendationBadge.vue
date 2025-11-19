<template>
  <span :class="badgeClass" class="badge">
    {{ action }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

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

