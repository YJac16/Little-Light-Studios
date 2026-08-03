import { Outlet } from 'react-router-dom'
import { Header, MobileTabBar } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="min-h-dvh flex flex-col bg-cream">
      <Header />
      <div className="flex-1 flex flex-col pb-[calc(64px+env(safe-area-inset-bottom))] sm:pb-0">
        <Outlet />
        <Footer />
      </div>
      <MobileTabBar />
    </div>
  )
}
