import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import HowTo from './pages/HowTo'
import Demo from './pages/Demo'
import Roadmap from './pages/Roadmap'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'
import { WalletProvider } from './context/WalletContext'

export default function App() {
  return (
    <WalletProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="how-to" element={<HowTo />} />
            <Route path="demo" element={<Demo />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </WalletProvider>
  )
}
