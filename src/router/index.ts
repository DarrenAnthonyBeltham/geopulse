import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/favorites', name: 'favorites', component: () => import('../views/FavoritesView.vue') },
    { path: '/country/:code', name: 'country-detail', component: () => import('../views/CountryDetailView.vue') },
    
    { path: '/planner', name: 'ai-planner', component: () => import('../views/TripPlannerView.vue') },
    { path: '/map', name: 'scratch-map', component: () => import('../views/ScratchMapView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    
    { path: '/tools', name: 'tools', component: () => import('../views/ToolsView.vue') },
    { path: '/charts', name: 'charts', component: () => import('../views/CurrencyHistoryView.vue') },
    { path: '/safety', name: 'safety', component: () => import('../views/SafetyView.vue') },
    { path: '/power', name: 'power', component: () => import('../views/PowerPlugsView.vue') },
    { path: '/tipping', name: 'tipping', component: () => import('../views/TippingView.vue') },
    { path: '/visa', name: 'visa', component: () => import('../views/VisaCheckerView.vue') },
    { path: '/phrases', name: 'phrases', component: () => import('../views/PhrasebookView.vue') },
    { path: '/cost', name: 'cost', component: () => import('../views/CostOfLivingView.vue') },

    { path: '/journal', name: 'journal', component: () => import('../views/TravelJournalView.vue') },
    { path: '/events', name: 'events', component: () => import('../views/EventsView.vue') },
    { path: '/holidays', name: 'holidays', component: () => import('../views/HolidaysView.vue') },

    { path: '/esim', name: 'esim', component: () => import('../views/ESimView.vue') },
    { path: '/nomad', name: 'nomad', component: () => import('../views/DigitalNomadView.vue') },
    { path: '/carbon', name: 'carbon', component: () => import('../views/CarbonFootprintView.vue') },
    { path: '/sos', name: 'sos', component: () => import('../views/EmergencySOSView.vue') },
    { path: '/health', name: 'health', component: () => import('../views/VaccinationView.vue') },
    { path: '/transport', name: 'transport', component: () => import('../views/TransportMapsView.vue') },
    { path: '/flights', name: 'flights', component: () => import('../views/FlightTrendsView.vue') },
    { path: '/clock', name: 'clock', component: () => import('../views/WorldClockView.vue') },

    { path: '/about', component: () => import('../views/AboutView.vue') },
    { path: '/data-sources', component: () => import('../views/DataSourcesView.vue') },
    { path: '/api', component: () => import('../views/ApiAccessView.vue') },
    { path: '/help', component: () => import('../views/HelpCenterView.vue') },
    { path: '/privacy', component: () => import('../views/PrivacyPolicyView.vue') },
    { path: '/terms', component: () => import('../views/TermsView.vue') },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') }
  ],
  scrollBehavior() { return { top: 0 } }
})

export default router