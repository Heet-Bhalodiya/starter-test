import { headers } from 'next/headers'

// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import { i18n } from '@configs/i18n'
import type { Locale } from '@configs/i18n'
import TranslationWrapper from '@/hocs/TranslationWrapper'

export const metadata = {
  title: 'Materio - Material Design Next.js Admin Template',
  description:
    'Materio - Material Design Next.js Admin Dashboard Template - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.'
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

const RootLayout = async (props: ChildrenType & { params: Promise<{ lang: string }> }) => {
  const { lang } = await props.params

  const { children } = props

  const headersList = await headers()

  const direction = i18n.langDirection[lang as Locale]
  const systemMode = await getSystemMode()

  return (
    <TranslationWrapper headersList={headersList} lang={lang as Locale}>
      <html id='__next' lang="en" dir={direction} suppressHydrationWarning>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
          {children}
        </body>
      </html>
    </TranslationWrapper>

  )
}

export default RootLayout
