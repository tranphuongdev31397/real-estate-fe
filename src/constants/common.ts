import { APP_ROUTES } from './route'

export const NAVIGATION_MENU = [
  {
    label: 'Home',
    icon: 'fas fa-home',
    ...APP_ROUTES.HOME
  },
  {
    label: 'About us',
    icon: 'fas fa-info-circle',
    ...APP_ROUTES.ABOUT
  },
  {
    label: 'Our Agents',
    icon: 'fas fa-info-circle',
    ...APP_ROUTES.AGENT
  },
  {
    label: 'Properties',
    icon: 'fas fa-info-circle',
    ...APP_ROUTES.PROPERTY
  },
  {
    label: 'Gallery',
    icon: 'fas fa-info-circle',
    ...APP_ROUTES.GALLERY
  },
  {
    label: 'Blog',
    icon: 'fas fa-info-circle',
    ...APP_ROUTES.BLOG
  },
  {
    label: 'Contact us',
    icon: 'fas fa-info-circle',
    ...APP_ROUTES.CONTACT
  },
  {
    label: 'Search',
    icon: 'fas fa-info-circle',
    ...APP_ROUTES.SEARCH
  }
]
