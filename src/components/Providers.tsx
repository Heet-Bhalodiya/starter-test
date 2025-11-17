'use client'

// React Imports
import { useEffect, useState } from 'react'

// Type Imports
import type { ChildrenType, Direction, SystemMode, Mode } from '@core/types'
import type { Settings } from '@core/contexts/settingsContext'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

// Config Imports
import themeConfig from '@configs/themeConfig'

type Props = ChildrenType & {
  direction: Direction
}

// Helper to get cookie on client-side
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) return parts.pop()?.split(';').shift()

  return undefined
}

const Providers = (props: Props) => {
  // Props
  const { children, direction } = props

  // State for client-side cookie values
  const [settingsCookie, setSettingsCookie] = useState<Settings>({})
  const [mode, setMode] = useState<Mode>(themeConfig.mode)
  const [systemMode, setSystemMode] = useState<SystemMode>('light')

  // Read cookies on client-side after mount
  useEffect(() => {
    const settingsCookieValue = getCookie(themeConfig.settingsCookieName)
    const colorPrefCookieValue = getCookie('colorPref')

    if (settingsCookieValue) {
      try {
        const parsedSettings = JSON.parse(decodeURIComponent(settingsCookieValue))

        setSettingsCookie(parsedSettings)
        const cookieMode = parsedSettings.mode || themeConfig.mode

        setMode(cookieMode)

        // Calculate system mode
        const colorPref = (colorPrefCookieValue || 'light') as SystemMode

        setSystemMode(cookieMode === 'system' ? colorPref : cookieMode)
      } catch {
        // If parsing fails, use defaults
        setMode(themeConfig.mode)
        setSystemMode('light')
      }
    } else {
      setMode(themeConfig.mode)
      setSystemMode('light')
    }
  }, [])

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
