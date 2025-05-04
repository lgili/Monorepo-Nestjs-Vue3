import { defineStore } from 'pinia'

export type ThemeOption = 'light' | 'dark' | 'system'

/**
 * Theme store holds current theme and applies it to <html>.
 * "system" will follow the OS setting via prefers-color-scheme.
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: (localStorage.getItem('theme') as ThemeOption) || 'system'
  }),
  actions: {
    /**
     * Apply and persist the given theme.
     */
    setTheme(t: ThemeOption) {
      this.theme = t
      localStorage.setItem('theme', t)

      // Determine actual color
      const color =
        t === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : t
      document.documentElement.setAttribute('data-theme', color)
    },
    /**
     * Toggle in order: light → dark → system → light...
     */
    cycleTheme() {
      const order: ThemeOption[] = ['light', 'dark', 'system']
      const i = order.indexOf(this.theme)
      const next = order[(i + 1) % order.length]
      this.setTheme(next)
    }
  }
})