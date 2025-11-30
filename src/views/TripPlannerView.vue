<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const destination = ref('');
const duration = ref(3);
const budget = ref('Balanced');
const loading = ref(false);
const itinerary = ref(null);

const showDestinationSuggestions = ref(false);
const showBudgetOptions = ref(false);
const dropdownContainer = ref(null);

const budgetOptions = ['Backpacker', 'Balanced', 'Luxury'];

const cityDatabase = [
  { 
    name: 'Bali, Indonesia', 
    morning: ['Sunrise trek at Mount Batur', 'Visit the Sacred Monkey Forest in Ubud', 'Explore the Tegallalang Rice Terraces'],
    afternoon: ['Surf lesson at Kuta Beach', 'Visit Tanah Lot Temple', 'Relax at a beach club in Seminyak', 'Explore the Uluwatu cliffs'],
    evening: ['Seafood dinner at Jimbaran Bay', 'Traditional Kecak Fire Dance', 'Night markets in Gianyar'],
    food: ['Babi Guling', 'Nasi Campur', 'Bebek Betutu'] 
  },
  { 
    name: 'Jakarta, Indonesia', 
    morning: ['Visit Monas (National Monument)', 'Explore Kota Tua (Old Town)', 'Tour the Istiqlal Mosque'],
    afternoon: ['Shopping at Grand Indonesia', 'Visit the National Museum', 'Explore Glodok Chinatown'],
    evening: ['Street food tour at Sabang Street', 'Sky bar drinks with city views', 'Relax at Ancol Beach City'],
    food: ['Nasi Goreng Gila', 'Soto Betawi', 'Martabak'] 
  },
  { 
    name: 'Tokyo, Japan', 
    morning: ['Visit Senso-ji Temple in Asakusa', 'Walk through Meiji Shrine', 'Visit Tsukiji Outer Market'],
    afternoon: ['Crossing at Shibuya Scramble', 'Explore Akihabara electronics district', 'Shopping in Ginza'],
    evening: ['Views from Tokyo Skytree', 'Dinner in Shinjuku Omoide Yokocho', 'Night walk in Roppongi'],
    food: ['Sushi', 'Ramen', 'Tempura'] 
  },
  { 
    name: 'Kyoto, Japan', 
    morning: ['Walk through Fushimi Inari Shrine', 'Visit Kinkaku-ji (Golden Pavilion)', 'Explore Arashiyama Bamboo Grove'],
    afternoon: ['Tea ceremony in Gion', 'Visit Kiyomizu-dera Temple', 'Walk the Philosopher\'s Path'],
    evening: ['Kaiseki dinner in Pontocho Alley', 'Night walk in Gion district', 'View Kyoto Tower'],
    food: ['Kaiseki Ryori', 'Yudofu', 'Matcha Sweets'] 
  },
  { 
    name: 'Seoul, South Korea', 
    morning: ['Visit Gyeongbokgung Palace', 'Explore Bukchon Hanok Village', 'Hike Namsan Park'],
    afternoon: ['Shopping in Myeongdong', 'Visit N Seoul Tower', 'Explore Gangnam District'],
    evening: ['Street food at Gwangjang Market', 'Nightlife in Hongdae', 'Walk along Cheonggyecheon Stream'],
    food: ['Korean BBQ', 'Bibimbap', 'Kimchi Stew'] 
  },
  { 
    name: 'Bangkok, Thailand', 
    morning: ['Visit the Grand Palace', 'Explore Wat Arun', 'Boat ride on Chao Phraya River'],
    afternoon: ['Shopping at Chatuchak Market', 'Visit Jim Thompson House', 'Explore Chinatown'],
    evening: ['Street food at Khao San Road', 'Rooftop bar drink', 'Night market at Asiatique'],
    food: ['Pad Thai', 'Tom Yum Goong', 'Mango Sticky Rice'] 
  },
  { 
    name: 'Singapore', 
    morning: ['Visit Gardens by the Bay', 'Explore Marina Bay Sands', 'Walk through the Cloud Forest'],
    afternoon: ['Shopping on Orchard Road', 'Visit Sentosa Island', 'Explore Chinatown'],
    evening: ['Light show at Supertree Grove', 'Dinner at Hawker Center', 'Night Safari'],
    food: ['Hainanese Chicken Rice', 'Laksa', 'Chili Crab'] 
  },
  { 
    name: 'London, UK', 
    morning: ['Watch the Changing of the Guard', 'Tour the Tower of London', 'Visit the British Museum'],
    afternoon: ['Ride the London Eye', 'Walk across Tower Bridge', 'Explore Covent Garden'],
    evening: ['West End Theatre Show', 'Dinner in Soho', 'Sunset walk along the Thames'],
    food: ['Fish & Chips', 'Sunday Roast', 'Indian Curry'] 
  },
  { 
    name: 'Paris, France', 
    morning: ['Visit the Louvre Museum', 'Climb the Eiffel Tower', 'Walk through Montmartre'],
    afternoon: ['Cruise along the Seine River', 'Shopping on Champs-Élysées', 'Explore Le Marais'],
    evening: ['Dinner cruise', 'Cabaret show at Moulin Rouge', 'Picnic by the Eiffel Tower'],
    food: ['Croissants', 'Escargots', 'Macarons'] 
  },
  { 
    name: 'Rome, Italy', 
    morning: ['Tour the Colosseum', 'Visit the Roman Forum', 'Explore the Vatican Museums'],
    afternoon: ['Throw a coin in Trevi Fountain', 'Visit the Pantheon', 'Walk the Spanish Steps'],
    evening: ['Dinner in Trastevere', 'Gelato near Piazza Navona', 'Night walk by Castel Sant\'Angelo'],
    food: ['Carbonara', 'Roman Pizza', 'Gelato'] 
  },
  { 
    name: 'Barcelona, Spain', 
    morning: ['Visit Sagrada Família', 'Explore Park Güell', 'Walk through Casa Batlló'],
    afternoon: ['Stroll down La Rambla', 'Relax at Barceloneta Beach', 'Visit the Gothic Quarter'],
    evening: ['Tapas crawl in El Born', 'Flamenco show', 'Magic Fountain show'],
    food: ['Paella', 'Tapas', 'Churros'] 
  },
  { 
    name: 'Amsterdam, Netherlands', 
    morning: ['Visit the Rijksmuseum', 'Tour the Anne Frank House', 'Canal Boat Tour'],
    afternoon: ['Explore Vondelpark', 'Visit the Van Gogh Museum', 'Walk through Jordaan district'],
    evening: ['Dinner in De Pijp', 'Red Light District tour', 'Bike ride along canals'],
    food: ['Stroopwafel', 'Herring', 'Bitterballen'] 
  },
  { 
    name: 'New York, USA', 
    morning: ['Ferry to Statue of Liberty', 'Walk the High Line', 'Visit Central Park'],
    afternoon: ['Explore the MET Museum', 'Views from Empire State Building', 'Shopping on 5th Avenue'],
    evening: ['Broadway Show', 'Times Square at night', 'Dinner in Little Italy'],
    food: ['Pizza', 'Bagels', 'Cheesecake'] 
  },
  { 
    name: 'Los Angeles, USA', 
    morning: ['Hike to the Hollywood Sign', 'Walk the Hollywood Walk of Fame', 'Visit Griffith Observatory'],
    afternoon: ['Relax at Santa Monica Pier', 'Shopping on Rodeo Drive', 'Visit The Getty Center'],
    evening: ['Dinner in West Hollywood', 'Sunset at Venice Beach', 'Drive Mulholland Drive'],
    food: ['In-N-Out Burger', 'Tacos', 'Sushi'] 
  },
  { 
    name: 'Dubai, UAE', 
    morning: ['Visit Burj Khalifa observation deck', 'Explore Dubai Mall', 'Walk through Dubai Aquarium'],
    afternoon: ['Desert Safari with dune bashing', 'Visit the Gold Souk', 'Relax at Jumeirah Beach'],
    evening: ['Dubai Fountain Show', 'Dinner at Dubai Marina', 'Global Village'],
    food: ['Shawarma', 'Falafel', 'Arabic Coffee'] 
  },
  { 
    name: 'Sydney, Australia', 
    morning: ['Walk across Sydney Harbour Bridge', 'Tour the Sydney Opera House', 'Visit The Rocks'],
    afternoon: ['Relax at Bondi Beach', 'Coastal walk from Bondi to Coogee', 'Ferry to Manly'],
    evening: ['Dinner at Darling Harbour', 'Sunset drinks at Opera Bar', 'Star gazing at Observatory'],
    food: ['Meat Pie', 'Seafood Platter', 'Lamingtons'] 
  },
  { 
    name: 'Rio de Janeiro, Brazil', 
    morning: ['Visit Christ the Redeemer', 'Cable car to Sugarloaf Mountain', 'Explore Selarón Steps'],
    afternoon: ['Relax at Copacabana Beach', 'Visit Ipanema Beach', 'Botanical Garden tour'],
    evening: ['Samba show in Lapa', 'Dinner at a Churrascaria', 'Sunset at Arpoador'],
    food: ['Feijoada', 'Pão de Queijo', 'Acai'] 
  },
  { 
    name: 'Cape Town, South Africa', 
    morning: ['Table Mountain Cableway', 'Visit Robben Island', 'Walk through Bo-Kaap'],
    afternoon: ['Kirstenbosch Botanical Gardens', 'Visit V&A Waterfront', 'Drive Chapman\'s Peak'],
    evening: ['Sunset at Camps Bay', 'Dinner at The Test Kitchen', 'Explore Long Street'],
    food: ['Bobotie', 'Bunny Chow', 'Biltong'] 
  },
  { 
    name: 'Istanbul, Turkey', 
    morning: ['Visit Hagia Sophia', 'Explore the Blue Mosque', 'Tour Topkapi Palace'],
    afternoon: ['Shopping at Grand Bazaar', 'Bosphorus Cruise', 'Visit Basilica Cistern'],
    evening: ['Dinner in Taksim Square', 'Turkish Delight tasting', 'Whirling Dervishes show'],
    food: ['Kebabs', 'Baklava', 'Turkish Delight'] 
  },
  { 
    name: 'Marrakech, Morocco', 
    morning: ['Visit Jardin Majorelle', 'Explore Bahia Palace', 'Tour Koutoubia Mosque'],
    afternoon: ['Shopping in the Souks', 'Visit Ben Youssef Madrasa', 'Relax in a Hammam'],
    evening: ['Jemaa el-Fnaa market food', 'Rooftop dinner in Medina', 'Traditional tea ceremony'],
    food: ['Tagine', 'Couscous', 'Mint Tea'] 
  }
];

const filteredDestinations = computed(() => {
  if (!destination.value) return [];
  const query = destination.value.toLowerCase();
  return cityDatabase.filter(city => city.name.toLowerCase().includes(query));
});

const selectDestination = (cityName) => {
  destination.value = cityName;
  showDestinationSuggestions.value = false;
};

const selectBudget = (option) => {
  budget.value = option;
  showBudgetOptions.value = false;
};

const toggleBudgetDropdown = () => {
  showBudgetOptions.value = !showBudgetOptions.value;
  showDestinationSuggestions.value = false;
};

const handleDestinationInput = () => {
  showDestinationSuggestions.value = true;
  showBudgetOptions.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    showDestinationSuggestions.value = false;
    showBudgetOptions.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const generateTrip = () => {
  if (!destination.value) return;
  loading.value = true;
  itinerary.value = null;
  showDestinationSuggestions.value = false;
  showBudgetOptions.value = false;

  setTimeout(() => {
    let cityData = cityDatabase.find(c => c.name.toLowerCase() === destination.value.toLowerCase());

    if (!cityData) {
      cityData = {
        name: destination.value,
        morning: [`Visit the main square of ${destination.value}`, `Explore local historical sites`, `Visit the central market`],
        afternoon: [`Tour the city museum`, `Walk through the city parks`, `Shopping in the downtown district`],
        evening: [`Dinner at a top-rated local restaurant`, `Enjoy the city nightlife`, `Sunset views from a scenic point`],
        food: [`local delicacies`, `street food`, `traditional dishes`]
      };
    }

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const generatedDays = [];

    for (let i = 1; i <= duration.value; i++) {
      let daySchedule = [];
      let dayTitle = `Day ${i}: Explore ${cityData.name}`;

      if (i === parseInt(duration.value)) {
        dayTitle = `Day ${i}: Departure & Farewell`;
        daySchedule = [
          { time: 'Morning', activity: 'Enjoy a slow start and a relaxed breakfast at your hotel.' },
          { time: 'Afternoon', activity: 'Buy last-minute souvenirs and take a gentle stroll nearby.' },
          { time: 'Evening', activity: 'Pack your bags and head to the airport for your flight home.' }
        ];
      } else {
        const morning = getRandom(cityData.morning);
        const afternoon = getRandom(cityData.afternoon);
        const evening = getRandom(cityData.evening);
        const food = getRandom(cityData.food);

        daySchedule = [
          { time: 'Morning', activity: morning },
          { time: 'Afternoon', activity: `${afternoon} and grab some ${food} for lunch.` },
          { time: 'Evening', activity: evening }
        ];
      }

      generatedDays.push({
        day: i,
        title: dayTitle,
        schedule: daySchedule
      });
    }

    itinerary.value = {
      title: `${duration.value}-Day ${budget.value} Itinerary for ${cityData.name}`,
      days: generatedDays
    };
    
    loading.value = false;
  }, 2000); 
};
</script>

<template>
  <div class="container py-5" ref="dropdownContainer">
    <div class="text-center mb-5">
      <div class="badge bg-primary-gradient px-3 py-2 rounded-pill mb-3 shadow-sm text-white border-0">AI Powered V2.1</div>
      <h1 class="display-4 fw-bold">Smart Trip <span class="text-highlight">Planner</span></h1>
      <p class="lead text-muted">Generate detailed daily schedules with specific activity blocks.</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card border-0 shadow-xl p-4 p-md-5 mb-5 form-card rounded-4">
          
          <div class="mb-4 position-relative z-3">
            <label class="form-label fw-bold small text-uppercase tracking-wide text-muted">City / Destination</label>
            <div class="input-group input-group-lg shadow-sm rounded-3 bg-input-group">
              <span class="input-group-text border-0 text-primary ps-3 bg-transparent"><i class="bi bi-geo-alt-fill"></i></span>
              <input 
                v-model="destination" 
                @input="handleDestinationInput"
                @focus="handleDestinationInput"
                type="text" 
                class="form-control border-0 bg-transparent box-shadow-none" 
                placeholder="Type 'Bali', 'London', 'Tokyo'..."
                autocomplete="off"
              >
            </div>
            <ul v-if="showDestinationSuggestions && filteredDestinations.length > 0" class="custom-dropdown-menu shadow-lg rounded-3 list-unstyled">
              <li v-for="city in filteredDestinations" :key="city.name" @click="selectDestination(city.name)" class="dropdown-item-custom">
                {{ city.name }}
              </li>
            </ul>
          </div>
          
          <div class="row g-4 mb-5 position-relative z-2">
            <div class="col-6">
              <label class="form-label fw-bold small text-uppercase tracking-wide text-muted">Duration</label>
              <div class="input-group input-group-lg shadow-sm rounded-3 bg-input-group">
                <span class="input-group-text border-0 text-primary ps-3 bg-transparent"><i class="bi bi-calendar-event"></i></span>
                <input v-model="duration" type="number" class="form-control border-0 bg-transparent box-shadow-none" min="1" max="30">
              </div>
            </div>
            <div class="col-6 position-relative">
              <label class="form-label fw-bold small text-uppercase tracking-wide text-muted">Budget</label>
              <div class="input-group input-group-lg shadow-sm rounded-3 bg-input-group custom-select-trigger" @click="toggleBudgetDropdown">
                <span class="input-group-text border-0 text-primary ps-3 bg-transparent"><i class="bi bi-wallet2"></i></span>
                <div class="form-control border-0 bg-transparent d-flex align-items-center justify-content-between box-shadow-none" style="cursor: pointer;">
                  {{ budget }}
                  <i class="bi bi-chevron-down small text-muted"></i>
                </div>
              </div>
               <ul v-if="showBudgetOptions" class="custom-dropdown-menu shadow-lg rounded-3 list-unstyled">
                  <li v-for="option in budgetOptions" :key="option" @click="selectBudget(option)" class="dropdown-item-custom" :class="{ 'active': option === budget }">
                    {{ option }}
                  </li>
                </ul>
            </div>
          </div>

          <button @click="generateTrip" class="btn btn-primary-white w-100 btn-lg rounded-pill shadow-lg hover-scale fw-bold border-0 py-3" :disabled="loading || !destination">
            <span v-if="loading"><span class="spinner-border spinner-border-sm me-2 text-primary"></span> <span class="text-primary">Building Full Schedule...</span></span>
            <span v-else><i class="bi bi-stars me-2 text-primary"></i> <span class="text-primary">Generate Detailed Plan</span></span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="itinerary" class="row justify-content-center animate-pop-in">
      <div class="col-lg-8">
        <div class="text-center mb-5">
             <h3 class="fw-bold text-highlight">{{ itinerary.title }}</h3>
             <div class="d-inline-block bg-surface rounded-pill px-3 py-1 text-muted small border mt-2">
                <i class="bi bi-check-circle-fill text-success me-1"></i> Optimized for {{ budget }} Travelers
             </div>
        </div>
       
        <div class="timeline-container position-relative ps-3 ps-md-4">
          <div class="timeline-track bg-primary-gradient opacity-25"></div>

          <div v-for="(day, index) in itinerary.days" :key="day.day" class="timeline-row d-flex align-items-start mb-5 position-relative">
            
            <div class="timeline-marker-wrapper d-flex flex-column align-items-center me-4">
              <div class="day-marker bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center shadow-md z-2">
                  <span class="fw-bold fs-5 text-white day-number">{{ day.day }}</span>
              </div>
            </div>
            
            <div class="card border-0 shadow-sm hover-card flex-grow-1 result-card rounded-4">
              <div class="card-header bg-transparent border-0 pt-4 px-4 pb-0">
                 <h5 class="fw-bold text-primary mb-0">{{ day.title }}</h5>
              </div>
              <div class="card-body p-4">
                <div v-for="(slot, idx) in day.schedule" :key="idx" class="d-flex mb-3 align-items-start">
                   <div class="me-3 mt-1">
                      <span class="badge bg-light text-dark border" style="width: 85px;">{{ slot.time }}</span>
                   </div>
                   <div>
                      <p class="mb-0 text-muted">{{ slot.activity }}</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary-gradient {
    background: linear-gradient(135deg, var(--primary) 0%, #2563eb 100%);
}

.day-number {
  color: #ffffff !important;
}

.btn-primary-white {
  background-color: #ffffff;
  color: var(--primary);
  border: 1px solid #e2e8f0 !important;
}

.text-primary {
  color: var(--primary) !important;
}

.text-highlight {
    color: var(--text-main);
}
:global(body.dark-theme) .text-highlight {
    color: #fff;
}

.form-card, .result-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
}

.shadow-xl {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.bg-input-group {
    background-color: var(--bg-input);
    border: 1px solid var(--border-color);
    transition: border-color 0.2s, box-shadow 0.2s;
}

.bg-input-group:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1) !important;
}

.box-shadow-none {
    box-shadow: none !important;
}

.form-control {
    color: var(--text-main);
}

.custom-select-trigger {
    cursor: pointer;
}

.custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    margin-top: 8px;
    z-index: 10;
    padding: 8px;
}

.dropdown-item-custom {
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    color: var(--text-main);
    font-weight: 500;
}

.dropdown-item-custom:hover, .dropdown-item-custom.active {
    background-color: var(--bg-input);
    color: var(--primary);
}

.hover-scale {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
}
.hover-scale:hover:not(:disabled) {
  transform: scale(1.02);
  box-shadow: 0 15px 30px -5px rgba(14, 165, 233, 0.15) !important;
}

.hover-card {
    transition: transform 0.2s, box-shadow 0.2s;
}
.hover-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05) !important;
}

.animate-pop-in {
  animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.95) translateY(30px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.timeline-track {
  position: absolute;
  top: 20px;
  bottom: 0;
  left: 23px;
  width: 3px;
  transform: translateX(12px);
  border-radius: 4px;
}

@media (min-width: 768px) {
    .timeline-track {
        transform: translateX(20px);
    }
}

.day-marker {
    width: 46px;
    height: 46px;
    border: 4px solid var(--bg-body);
    flex-shrink: 0;
}
</style>