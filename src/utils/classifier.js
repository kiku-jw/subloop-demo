/**
 * Subscription classification logic
 * Classifies subscriptions based on activity thresholds
 */

export const STATUS = {
  ACTIVE: 'ACTIVE',
  SEMI_DEAD: 'SEMI_DEAD',
  DEAD: 'DEAD',
}

export const ACTION = {
  KEEP: 'KEEP',
  DOWNGRADE: 'DOWNGRADE',
  CANCEL: 'CANCEL',
}

// Default thresholds (can be customized per company)
const DEFAULT_THRESHOLDS = {
  active_min_events_per_period: 100,
  semi_dead_max_events_per_period: 50,
  dead_no_usage_periods: 3, // months
}

/**
 * Classify subscription status based on activity
 * @param {Object} subscription - Subscription object with activity data
 * @param {Object} thresholds - Activity thresholds
 * @returns {string} Status: ACTIVE, SEMI_DEAD, or DEAD
 */
export function classifySubscription(subscription, thresholds = DEFAULT_THRESHOLDS) {
  const { activity_events, last_activity } = subscription

  // Calculate months since last activity
  const lastActivityDate = new Date(last_activity)
  const now = new Date()
  const monthsSinceActivity = Math.floor(
    (now - lastActivityDate) / (1000 * 60 * 60 * 24 * 30)
  )

  // DEAD: No activity for dead_no_usage_periods months
  if (activity_events === 0 && monthsSinceActivity >= thresholds.dead_no_usage_periods) {
    return STATUS.DEAD
  }

  // ACTIVE: Activity above threshold
  if (activity_events >= thresholds.active_min_events_per_period) {
    return STATUS.ACTIVE
  }

  // SEMI_DEAD: Low activity but not zero
  if (activity_events > 0 && activity_events <= thresholds.semi_dead_max_events_per_period) {
    return STATUS.SEMI_DEAD
  }

  // Default to SEMI_DEAD for edge cases
  return STATUS.SEMI_DEAD
}

/**
 * Generate recommendation action based on status
 * @param {Object} subscription - Subscription object
 * @param {Array} whitelistVendors - List of vendors that should never be canceled
 * @returns {Object} Recommendation with action, reason, and savings
 */
export function generateRecommendation(subscription, whitelistVendors = []) {
  const { vendor, status, amount, seats, activity_events } = subscription

  // Whitelist protection
  if (whitelistVendors.includes(vendor)) {
    return {
      action: ACTION.KEEP,
      reason: `${vendor} is in whitelist and cannot be modified`,
      potential_saving_monthly: 0,
      potential_saving_yearly: 0,
    }
  }

  switch (status) {
    case STATUS.ACTIVE:
      return {
        action: ACTION.KEEP,
        reason: 'High usage across team members',
        potential_saving_monthly: 0,
        potential_saving_yearly: 0,
      }

    case STATUS.SEMI_DEAD:
      // Calculate recommended seats based on activity
      // Rough estimate: 1 seat per 10-15 events per month
      const recommendedSeats = Math.max(1, Math.ceil(activity_events / 12))
      const currentSeats = seats || 1
      
      if (recommendedSeats < currentSeats) {
        const seatReduction = currentSeats - recommendedSeats
        const pricePerSeat = amount / currentSeats
        const saving = pricePerSeat * seatReduction

        return {
          action: ACTION.DOWNGRADE,
          reason: `Low usage, can reduce seats from ${currentSeats} to ${recommendedSeats}`,
          potential_saving_monthly: Math.round(saving * 100) / 100,
          potential_saving_yearly: Math.round(saving * 12 * 100) / 100,
        }
      }

      return {
        action: ACTION.KEEP,
        reason: 'Usage matches current plan',
        potential_saving_monthly: 0,
        potential_saving_yearly: 0,
      }

    case STATUS.DEAD:
      return {
        action: ACTION.CANCEL,
        reason: `No usage for ${Math.floor((new Date() - new Date(subscription.last_activity)) / (1000 * 60 * 60 * 24 * 30))}+ months`,
        potential_saving_monthly: amount,
        potential_saving_yearly: amount * 12,
      }

    default:
      return {
        action: ACTION.KEEP,
        reason: 'Unknown status',
        potential_saving_monthly: 0,
        potential_saving_yearly: 0,
      }
  }
}

/**
 * Calculate total potential savings
 * @param {Array} subscriptions - Array of subscription objects
 * @returns {Object} Total savings (monthly and yearly)
 */
export function calculateTotalSavings(subscriptions) {
  return subscriptions.reduce(
    (totals, sub) => {
      const rec = sub.recommendation || {}
      return {
        monthly: totals.monthly + (rec.potential_saving_monthly || 0),
        yearly: totals.yearly + (rec.potential_saving_yearly || 0),
      }
    },
    { monthly: 0, yearly: 0 }
  )
}


