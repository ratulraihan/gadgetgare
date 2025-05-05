import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Gadget } from '../types/gadget'

// Sample data - in a real app, this would come from an API
const gadgetsData: Gadget[] = [
  {
    id: '1',
    name: 'ProBook X14',
    category: 'Laptops',
    price: 1299.99,
    description: 'The ProBook X14 is a high-performance laptop designed for professionals who need power and portability. With its stunning 14-inch display, powerful processor, and all-day battery life, it\'s perfect for work and play.',
    imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: true,
    rating: 4.7,
    highlights: [
      { name: 'Processor', value: 'Intel Core i7' },
      { name: 'RAM', value: '16GB' },
      { name: 'Storage', value: '512GB SSD' },
      { name: 'Display', value: '14" 4K' }
    ],
    specs: {
      general: {
        'Dimensions': '12.8 x 8.9 x 0.6 inches',
        'Weight': '3.1 lbs',
        'Colors': 'Space Gray, Silver',
        'Model Year': '2025'
      },
      display: {
        'Size': '14 inches',
        'Resolution': '3840 x 2160 (4K)',
        'Panel Type': 'IPS LCD',
        'Refresh Rate': '60Hz',
        'Brightness': '400 nits',
        'Color Gamut': '100% sRGB'
      },
      performance: {
        'Processor': 'Intel Core i7-1260P',
        'Cores': '12 (4P + 8E)',
        'Base Clock': '2.1 GHz',
        'Turbo Clock': 'Up to 4.7 GHz',
        'RAM': '16GB LPDDR5',
        'Storage': '512GB NVMe SSD',
        'Graphics': 'Intel Iris Xe'
      },
      connectivity: {
        'Wi-Fi': 'Wi-Fi 6E',
        'Bluetooth': '5.2',
        'Ports': '2x Thunderbolt 4, 1x USB-A, HDMI, Headphone jack'
      },
      battery: {
        'Capacity': '65Wh',
        'Battery Life': 'Up to 12 hours',
        'Charging': '65W USB-C PD'
      }
    }
  },
  {
    id: '2',
    name: 'UltraPhone 13',
    category: 'Smartphones',
    price: 899.99,
    description: 'The UltraPhone 13 represents the pinnacle of smartphone technology. With its advanced camera system, powerful chipset, and stunning display, it redefines what a smartphone can do. Experience all-day battery life and blazing-fast performance in a sleek, premium design.',
    imageUrl: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    highlights: [
      { name: 'Processor', value: 'A16 Bionic' },
      { name: 'Camera', value: '48MP Triple' },
      { name: 'Display', value: '6.7" OLED' },
      { name: 'Battery', value: '4500 mAh' }
    ],
    specs: {
      general: {
        'Dimensions': '146.7 x 71.5 x 7.8 mm',
        'Weight': '189g',
        'Colors': 'Midnight, Starlight, Product RED, Ocean Blue',
        'Water Resistance': 'IP68'
      },
      display: {
        'Size': '6.7 inches',
        'Resolution': '2778 x 1284 pixels',
        'Panel Type': 'OLED',
        'Refresh Rate': '120Hz adaptive',
        'Brightness': '1600 nits peak',
        'Features': 'HDR10+, Always-On Display'
      },
      performance: {
        'Processor': 'A16 Bionic',
        'CPU': '6-core (2 high-performance, 4 efficiency)',
        'GPU': '5-core',
        'Neural Engine': '16-core',
        'RAM': '8GB',
        'Storage Options': '128GB, 256GB, 512GB, 1TB'
      },
      camera: {
        'Main': '48MP, f/1.8, OIS',
        'Ultra-wide': '12MP, f/2.2, 120° FOV',
        'Telephoto': '12MP, f/2.8, 3x optical zoom',
        'Front': '12MP, f/1.9',
        'Video': '4K@60fps, 1080p@240fps'
      },
      connectivity: {
        'Cellular': '5G (mmWave & Sub-6)',
        'Wi-Fi': 'Wi-Fi 6E',
        'Bluetooth': '5.3',
        'NFC': 'Yes',
        'Ports': 'USB-C'
      },
      battery: {
        'Capacity': '4500 mAh',
        'Wired Charging': '27W',
        'Wireless Charging': '15W MagSafe, 7.5W Qi',
        'Battery Life': 'Up to 25 hours video playback'
      }
    }
  },
  {
    id: '3',
    name: 'ProTab Air',
    category: 'Tablets',
    price: 599.99,
    description: 'The ProTab Air is a lightweight tablet that combines performance with portability. Perfect for creative professionals, students, and entertainment enthusiasts, it features a beautiful display, powerful processor, and all-day battery life.',
    imageUrl: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    highlights: [
      { name: 'Display', value: '11" Liquid Retina' },
      { name: 'Processor', value: 'M1 Chip' },
      { name: 'Storage', value: '256GB' },
      { name: 'Battery', value: '10 hours' }
    ],
    specs: {
      general: {
        'Dimensions': '247.6 x 178.5 x 6.1 mm',
        'Weight': '466g',
        'Colors': 'Silver, Space Gray, Rose Gold',
        'Model Year': '2025'
      },
      display: {
        'Size': '11 inches',
        'Resolution': '2388 x 1668 pixels',
        'Panel Type': 'Liquid Retina IPS LCD',
        'Refresh Rate': '120Hz ProMotion',
        'Brightness': '600 nits',
        'Features': 'True Tone, P3 color gamut'
      },
      performance: {
        'Processor': 'M1 chip',
        'CPU': '8-core',
        'GPU': '8-core',
        'Neural Engine': '16-core',
        'RAM': '8GB',
        'Storage': '256GB'
      },
      connectivity: {
        'Wi-Fi': 'Wi-Fi 6',
        'Bluetooth': '5.1',
        'Ports': 'USB-C',
        'Cellular': 'Optional 5G'
      },
      battery: {
        'Capacity': '28.65Wh',
        'Battery Life': 'Up to 10 hours',
        'Charging': '20W USB-C'
      },
      additional: {
        'Cameras': '12MP wide back, 12MP ultra-wide front',
        'Audio': 'Quad speakers, dual microphones',
        'Biometrics': 'Face ID',
        'Accessories': 'Supports Apple Pencil 2nd gen, Magic Keyboard'
      }
    }
  },
  {
    id: '4',
    name: 'SoundMax Pro',
    category: 'Audio',
    price: 249.99,
    description: 'Experience premium sound quality with the SoundMax Pro wireless headphones. These over-ear headphones deliver exceptional audio clarity, active noise cancellation, and long battery life for an immersive listening experience.',
    imageUrl: 'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: true,
    rating: 4.6,
    highlights: [
      { name: 'Type', value: 'Over-ear' },
      { name: 'Noise Cancellation', value: 'Active' },
      { name: 'Battery', value: '30 hours' },
      { name: 'Connectivity', value: 'Bluetooth 5.2' }
    ],
    specs: {
      general: {
        'Type': 'Over-ear, Closed-back',
        'Weight': '250g',
        'Colors': 'Black, White, Navy Blue',
        'Controls': 'Touch controls, Physical buttons'
      },
      display: {
        'Indicators': 'LED status indicators',
        'App Support': 'iOS, Android with equalizer'
      },
      performance: {
        'Driver Size': '40mm',
        'Frequency Response': '20Hz - 40kHz',
        'Impedance': '32 ohms',
        'Sensitivity': '110dB',
        'Noise Cancellation': 'Adaptive ANC with transparency mode'
      },
      connectivity: {
        'Bluetooth': '5.2',
        'Codec Support': 'SBC, AAC, aptX HD, LDAC',
        'Range': 'Up to 10m (33ft)',
        'Multi-device': 'Connect to 2 devices simultaneously',
        'Wired': '3.5mm jack'
      },
      battery: {
        'Capacity': '700mAh',
        'Playback Time': 'Up to 30 hours (ANC on), 40 hours (ANC off)',
        'Charging': 'USB-C, Fast charging (5 min for 3 hours)'
      },
      additional: {
        'Microphones': '8 mics (4 for calls, 4 for ANC)',
        'Water Resistance': 'IPX4',
        'In the box': 'Headphones, Carrying case, USB-C cable, 3.5mm cable'
      }
    }
  },
  {
    id: '5',
    name: 'FitTrack Prime',
    category: 'Wearables',
    price: 299.99,
    description: 'The FitTrack Prime is the ultimate fitness companion. With advanced health tracking, GPS, and a bright always-on display, it helps you stay on top of your fitness goals. Water-resistant and durable, it\'s perfect for any activity.',
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.4,
    highlights: [
      { name: 'Display', value: '1.4" AMOLED' },
      { name: 'Battery', value: '7 days' },
      { name: 'Features', value: 'GPS, HRM, SpO2' },
      { name: 'Water Resistance', value: '5 ATM' }
    ],
    specs: {
      general: {
        'Dimensions': '44 x 44 x 12 mm',
        'Weight': '32g (without band)',
        'Colors': 'Black, Silver, Rose Gold',
        'Materials': 'Aluminum case, Silicone band'
      },
      display: {
        'Size': '1.4 inches',
        'Resolution': '454 x 454 pixels',
        'Type': 'AMOLED',
        'Features': 'Always-on display, 1000 nits brightness'
      },
      performance: {
        'Processor': 'Dual-core',
        'Storage': '4GB',
        'RAM': '1GB',
        'OS': 'FitOS 4.0'
      },
      connectivity: {
        'Bluetooth': '5.0',
        'Wi-Fi': '2.4GHz',
        'GPS': 'Built-in GPS, GLONASS, Galileo',
        'NFC': 'Yes, for payments'
      },
      battery: {
        'Capacity': '420mAh',
        'Battery Life': 'Up to 7 days normal use, 24 hours with GPS',
        'Charging': 'Magnetic charging dock'
      },
      additional: {
        'Sensors': 'Heart rate, SpO2, ECG, Accelerometer, Gyroscope, Altimeter',
        'Health Features': 'Sleep tracking, Stress monitoring, Women\'s health',
        'Sports Modes': '120+ workout types',
        'Water Resistance': '5 ATM, swimming suitable'
      }
    }
  },
  {
    id: '6',
    name: 'GameStation X',
    category: 'Gaming',
    price: 499.99,
    description: 'Enter the next generation of gaming with the GameStation X. Experience lightning-fast load times, stunning 4K graphics, and immersive gameplay. With a vast library of games and powerful hardware, it delivers the ultimate gaming experience.',
    imageUrl: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    highlights: [
      { name: 'Processor', value: 'Octa-core' },
      { name: 'Graphics', value: 'RDNA 3' },
      { name: 'Storage', value: '1TB SSD' },
      { name: 'Resolution', value: 'Up to 4K 120fps' }
    ],
    specs: {
      general: {
        'Dimensions': '300 x 240 x 60 mm',
        'Weight': '4.2 kg',
        'Color': 'Matte Black',
        'Orientation': 'Horizontal or vertical'
      },
      display: {
        'Output': 'HDMI 2.1',
        'Resolution': 'Up to 4K @ 120Hz, 8K @ 60Hz',
        'HDR': 'HDR10, Dolby Vision'
      },
      performance: {
        'CPU': 'Custom 8-core Zen 4',
        'GPU': 'Custom RDNA 3, 16 TFLOPS',
        'RAM': '16GB GDDR6',
        'Storage': '1TB Custom NVMe SSD',
        'Expandable Storage': 'NVMe SSD slot'
      },
      connectivity: {
        'HDMI': '1x HDMI 2.1',
        'USB': '3x USB-A 3.2, 1x USB-C 3.2',
        'Ethernet': 'Gigabit Ethernet',
        'Wi-Fi': 'Wi-Fi 6E',
        'Bluetooth': '5.2'
      },
      additional: {
        'Audio': 'Tempest 3D AudioTech',
        'Backward Compatibility': 'Compatible with previous generation games',
        'Disc Drive': 'Ultra HD Blu-ray',
        'Power Consumption': '350W max',
        'Cooling': 'Custom vapor chamber'
      }
    }
  }
]

export const useGadgetStore = defineStore('gadgets', () => {
  const gadgets = ref<Gadget[]>(gadgetsData)
  const compareList = ref<string[]>([])
  
  const getGadgetById = (id: string) => {
    return gadgets.value.find(gadget => gadget.id === id)
  }
  
  const getGadgetsByCategory = (category: string) => {
    if (!category) return gadgets.value
    return gadgets.value.filter(gadget => gadget.category === category)
  }
  
  const searchGadgets = (query: string) => {
    if (!query) return gadgets.value
    
    const searchLower = query.toLowerCase()
    return gadgets.value.filter(gadget => 
      gadget.name.toLowerCase().includes(searchLower) ||
      gadget.description.toLowerCase().includes(searchLower) ||
      gadget.category.toLowerCase().includes(searchLower)
    )
  }
  
  const addToCompare = (id: string) => {
    if (compareList.value.length < 3 && !compareList.value.includes(id)) {
      compareList.value.push(id)
      return true
    }
    return false
  }
  
  const removeFromCompare = (id: string) => {
    compareList.value = compareList.value.filter(itemId => itemId !== id)
  }
  
  const clearCompare = () => {
    compareList.value = []
  }
  
  const gadgetsToCompare = computed(() => {
    return compareList.value.map(id => getGadgetById(id)).filter((g): g is Gadget => g !== undefined)
  })
  
  const categories = computed(() => {
    return [...new Set(gadgets.value.map(gadget => gadget.category))]
  })
  
  const featuredGadgets = computed(() => {
    return gadgets.value.filter(gadget => gadget.isNew).slice(0, 4)
  })
  
  return {
    gadgets,
    compareList,
    getGadgetById,
    getGadgetsByCategory,
    searchGadgets,
    addToCompare,
    removeFromCompare,
    clearCompare,
    gadgetsToCompare,
    categories,
    featuredGadgets
  }
})