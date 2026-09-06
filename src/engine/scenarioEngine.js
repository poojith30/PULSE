const DEFAULT_SETTINGS = {
  categories: ['academics', 'projects', 'time management', 'clubs', 'career'],
  difficulty: 'normal',
  frequency: 'every-open',
  theme: 'system',
}

function isValidChoice(choice) {
  return Boolean(
    choice &&
    typeof choice.id === 'string' &&
    typeof choice.text === 'string' &&
    choice.text.trim() &&
    choice.effects &&
    typeof choice.effects === 'object' &&
    typeof choice.explanation === 'string' &&
    choice.explanation.trim(),
  )
}

export function isValidScenario(scenario) {
  return Boolean(
    scenario &&
    typeof scenario.id === 'string' &&
    typeof scenario.category === 'string' &&
    typeof scenario.difficulty === 'string' &&
    typeof scenario.title === 'string' &&
    scenario.title.trim() &&
    typeof scenario.description === 'string' &&
    scenario.description.trim() &&
    Array.isArray(scenario.choices) &&
    scenario.choices.length > 0 &&
    scenario.choices.every(isValidChoice),
  )
}

export function filterEligibleScenarios(scenarios = [], settings = DEFAULT_SETTINGS) {
  const safeSettings = settings || DEFAULT_SETTINGS
  const enabledCategories = safeSettings.categories || safeSettings.enabledCategories || DEFAULT_SETTINGS.categories
  const difficulty = safeSettings.difficulty || DEFAULT_SETTINGS.difficulty

  return scenarios.filter((scenario) => (
    isValidScenario(scenario) &&
    Array.isArray(enabledCategories) &&
    enabledCategories.includes(scenario.category) &&
    scenario.difficulty === difficulty
  ))
}

export function removeRecentlyShownScenarios(scenarios = [], recentIds = []) {
  const recentIdSet = new Set(recentIds)
  const availableScenarios = scenarios.filter((scenario) => !recentIdSet.has(scenario.id))

  // Once every eligible scenario has been seen, start a fresh cycle.
  return availableScenarios.length > 0 ? availableScenarios : scenarios
}

export function selectRandomScenario(scenarios = []) {
  if (scenarios.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * scenarios.length)
  return scenarios[randomIndex]
}

export function getNextScenario(scenarios = [], recentIds = [], settings = DEFAULT_SETTINGS) {
  const eligibleScenarios = filterEligibleScenarios(scenarios, settings)
  const availableScenarios = removeRecentlyShownScenarios(eligibleScenarios, recentIds)

  return selectRandomScenario(availableScenarios)
}

export function getDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function isScenarioEligible(scenario, settings) {
  return filterEligibleScenarios([scenario], settings).length === 1
}

export function getScenarioForFrequency(
  scenarios = [],
  history = {},
  settings = DEFAULT_SETTINGS,
  date = new Date(),
) {
  const safeHistory = history || {}
  const safeSettings = settings || DEFAULT_SETTINGS
  const currentScenario = safeHistory.currentScenario
  const currentDate = safeHistory.currentScenarioDate
  const recentIds = Array.isArray(safeHistory.recentlyShownScenarioIds)
    ? safeHistory.recentlyShownScenarioIds
    : []
  const currentScenarioIsEligible = isScenarioEligible(currentScenario, safeSettings)

  if (
    currentScenarioIsEligible &&
    safeSettings.frequency === 'once-a-day' &&
    currentDate === getDateKey(date)
  ) {
    return currentScenario
  }

  if (currentScenarioIsEligible && safeSettings.frequency === 'only-request') {
    return currentScenario
  }

  return getNextScenario(scenarios, recentIds, safeSettings)
}

export const defaultScenarioSettings = DEFAULT_SETTINGS
