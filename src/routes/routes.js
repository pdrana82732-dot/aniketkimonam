import { lazy } from 'react'

const Home = lazy(() => import('../pages/Home.jsx'))
const LoveStory = lazy(() => import('../pages/LoveStory.jsx'))
const Events = lazy(() => import('../pages/Events.jsx'))
const Gallery = lazy(() => import('../pages/Gallery.jsx'))
const Videos = lazy(() => import('../pages/Videos.jsx'))
const Journey = lazy(() => import('../pages/Journey.jsx'))
const Contact = lazy(() => import('../pages/Contact.jsx'))

const routes = [
  { path: '/', element: Home },
  { path: '/love-story', element: LoveStory },
  { path: '/celebrations', element: Events },
  { path: '/gallery', element: Gallery },
  { path: '/videos', element: Videos },
  { path: '/orbit', element: Journey },
  { path: '/contact', element: Contact },
]

export default routes