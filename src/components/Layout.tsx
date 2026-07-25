import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { SkipLink } from './SkipLink'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-mist-soft">
      <SkipLink />
      <Header />
      <div id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
