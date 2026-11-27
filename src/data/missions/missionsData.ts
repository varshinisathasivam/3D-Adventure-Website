import { Mission, WorldId } from '../../types';

export const MISSIONS_DATA: Mission[] = [
  // ==================== GREEN FOREST (5 MISSIONS) ====================
  {
    id: 'forest-1',
    worldId: 'forest',
    order: 1,
    title: 'Tree Planting Challenge',
    shortDescription: 'Replant barren slopes with native oak, pine, and birch saplings.',
    instructions:
      'Choose the best reforestation strategy to rebuild a resilient forest canopy along the upper ridge.',
    difficulty: 'Easy',
    xpReward: 80,
    ecoImpactPoints: 20,
    locationLabel: 'Whispering Clearing',
    coordinates: [-4.5, 0.2, -3.0],
    questions: [
      {
        id: 'f1-q1',
        prompt: 'Why should we plant a mix of native tree species instead of a single fast-growing species?',
        options: [
          'Mixed native trees resist pests, support local wildlife, and stabilize soil better',
          'Single-species plantations always grow 10x faster and need zero water',
          'Mixed trees prevent rain from reaching the forest floor',
        ],
        correctIndex: 0,
        explanation:
          'Biodiverse native forests create layered habitats, resist disease outbreaks, and build richer soil.',
      },
      {
        id: 'f1-q2',
        prompt: 'What is the best time to water newly planted saplings in a temperate forest?',
        options: [
          'High noon under direct sunlight',
          'Early morning or late afternoon to minimize evaporation',
          'Only once a year during winter frost',
        ],
        correctIndex: 1,
        explanation:
          'Watering in cooler hours lets moisture soak into the root zone before the sun evaporates it.',
      },
    ],
  },
  {
    id: 'forest-2',
    worldId: 'forest',
    order: 2,
    title: 'Wildlife Protection',
    shortDescription: 'Establish safe wildlife corridors and protect nesting habitats.',
    instructions:
      'Answer how to reconnect fragmented habitats so forest deer, foxes, and birds can thrive.',
    difficulty: 'Easy',
    xpReward: 85,
    ecoImpactPoints: 20,
    locationLabel: 'Mossy Hollow',
    coordinates: [4.2, 0.2, -2.5],
    questions: [
      {
        id: 'f2-q1',
        prompt: 'How does a wildlife corridor help forest animals?',
        options: [
          'It links isolated habitats so animals can find food, water, and mates safely',
          'It keeps all animals locked inside a small fenced pen',
          'It replaces natural trees with paved highways',
        ],
        correctIndex: 0,
        explanation:
          'Corridors prevent habitat isolation and reduce dangerous road crossings for migrating wildlife.',
      },
      {
        id: 'f2-q2',
        prompt: 'Which action best protects ground-nesting forest birds during spring?',
        options: [
          'Clearing all undergrowth with heavy machinery',
          'Keeping dogs leashed and staying on marked trails',
          'Playing loud speakers near nesting groves',
        ],
        correctIndex: 1,
        explanation:
          'Staying on marked trails avoids trampling nests and prevents stress to parent birds.',
      },
    ],
  },
  {
    id: 'forest-3',
    worldId: 'forest',
    order: 3,
    title: 'Forest Waste Sorting',
    shortDescription: 'Clear dumped litter and sort plastics, metals, and organics properly.',
    instructions:
      'Identify the correct sorting and disposal method for waste found along the forest trail.',
    difficulty: 'Medium',
    xpReward: 95,
    ecoImpactPoints: 20,
    locationLabel: 'Riverbank Trail',
    coordinates: [-2.0, 0.2, 3.8],
    questions: [
      {
        id: 'f3-q1',
        prompt: 'You find aluminum cans, glass bottles, and food scraps at a campsite. How should they be sorted?',
        options: [
          'Bury everything in the soil so it disappears',
          'Rinse and recycle cans/glass; compost or pack out food scraps',
          'Burn the cans and plastic in a campfire',
        ],
        correctIndex: 1,
        explanation:
          'Aluminum and glass are infinitely recyclable, while burning waste releases toxic fumes and burying trash harms wildlife.',
      },
      {
        id: 'f3-q2',
        prompt: 'Why is leaving even biodegradable fruit peels on a forest trail discouraged?',
        options: [
          'They attract wildlife to roads and alter natural animal diets',
          'They turn into solid plastic after 2 days',
          'They immediately kill mature oak trees',
        ],
        correctIndex: 0,
        explanation:
          'Food scraps can habituate animals to human trails and take months to decompose in dry or cool climates.',
      },
    ],
  },
  {
    id: 'forest-4',
    worldId: 'forest',
    order: 4,
    title: 'Deforestation Awareness',
    shortDescription: 'Protect old-growth trees and promote certified sustainable timber.',
    instructions:
      'Evaluate how communities can meet resource needs without destroying ancient forests.',
    difficulty: 'Medium',
    xpReward: 100,
    ecoImpactPoints: 20,
    locationLabel: 'Elder Grove',
    coordinates: [3.6, 0.2, 3.4],
    questions: [
      {
        id: 'f4-q1',
        prompt: 'Why are old-growth trees especially valuable compared to young saplings?',
        options: [
          'They store massive amounts of carbon and host complex fungal and animal networks',
          'They consume more oxygen than they produce',
          'They have no roots and float on water',
        ],
        correctIndex: 0,
        explanation:
          'Old-growth trees are irreplaceable carbon reservoirs and biodiversity anchors built over centuries.',
      },
      {
        id: 'f4-q2',
        prompt: 'Which consumer choice helps reduce illegal deforestation?',
        options: [
          'Choosing products with verified sustainable forestry certifications and recycled paper',
          'Using single-use paper towels for every spill',
          'Buying unlabelled tropical hardwood',
        ],
        correctIndex: 0,
        explanation:
          'Certified sustainable and recycled paper products reduce demand for destructive clear-cutting.',
      },
    ],
  },
  {
    id: 'forest-5',
    worldId: 'forest',
    order: 5,
    title: 'Restore the Forest',
    shortDescription: 'Complete the watershed revival and awaken the emerald canopy.',
    instructions:
      'Combine soil restoration, riparian buffers, and community stewardship to fully heal the forest.',
    difficulty: 'Hard',
    xpReward: 120,
    ecoImpactPoints: 20,
    locationLabel: 'Heartwood Shrine',
    coordinates: [0, 0.3, -4.8],
    questions: [
      {
        id: 'f5-q1',
        prompt: 'What is a riparian buffer along a forest river?',
        options: [
          'A concrete wall blocking all animals from the river',
          'A vegetated strip of trees and shrubs that filters runoff and prevents erosion',
          'A chemical tank that bleaches river stones',
        ],
        correctIndex: 1,
        explanation:
          'Riparian buffers trap sediment, absorb excess nutrients, and shade streams to keep water cool for fish.',
      },
      {
        id: 'f5-q2',
        prompt: 'What keeps a restored forest healthy over decades?',
        options: [
          'Ongoing community monitoring, invasive species control, and fire-wise management',
          'Abandoning the site while dumping industrial runoff nearby',
          'Removing all deadwood and fallen leaves permanently',
        ],
        correctIndex: 0,
        explanation:
          'Long-term stewardship ensures young trees survive, invasive weeds are managed, and natural nutrient cycles continue.',
      },
    ],
  },

  // ==================== BLUE OCEAN (5 MISSIONS) ====================
  {
    id: 'ocean-1',
    worldId: 'ocean',
    order: 1,
    title: 'Surface Plastic Sweep',
    shortDescription: 'Remove drifting plastic bottles and ghost nets from the upper currents.',
    instructions:
      'Select the safest, most effective ocean cleanup practices to protect surface swimmers.',
    difficulty: 'Easy',
    xpReward: 80,
    ecoImpactPoints: 20,
    locationLabel: 'Sunlit Lagoon',
    coordinates: [-4.0, 1.2, -2.5],
    questions: [
      {
        id: 'o1-q1',
        prompt: 'Why are abandoned "ghost" fishing nets so dangerous to marine life?',
        options: [
          'They continue trapping fish, turtles, and dolphins for years',
          'They dissolve harmlessly in 10 minutes',
          'They turn into coral reefs overnight',
        ],
        correctIndex: 0,
        explanation:
          'Ghost gear entangles marine animals and damages reefs long after being lost at sea.',
      },
      {
        id: 'o1-q2',
        prompt: 'What is the most impactful way to stop ocean plastic long-term?',
        options: [
          'Reduce single-use plastics and improve land-based waste capture before it reaches rivers',
          'Pour soap into the ocean to sink plastics',
          'Dump plastic only in deep trenches',
        ],
        correctIndex: 0,
        explanation:
          'Stopping plastic at the source and intercepting river waste prevents it from breaking into microplastics.',
      },
    ],
  },
  {
    id: 'ocean-2',
    worldId: 'ocean',
    order: 2,
    title: 'Coral Reef Revival',
    shortDescription: 'Reduce reef stressors and help bleached coral colonies recover.',
    instructions:
      'Learn what causes coral bleaching and how to support reef resilience.',
    difficulty: 'Easy',
    xpReward: 90,
    ecoImpactPoints: 20,
    locationLabel: 'Prism Reef',
    coordinates: [3.8, -0.5, -2.0],
    questions: [
      {
        id: 'o2-q1',
        prompt: 'What happens when coral reefs bleach?',
        options: [
          'Stressed corals expel the colorful symbiotic algae that feed them',
          'Corals paint themselves white to attract sharks',
          'Corals turn into solid quartz rocks',
        ],
        correctIndex: 0,
        explanation:
          'Warm water or pollution causes corals to expel zooxanthellae algae, starving them unless conditions stabilize.',
      },
      {
        id: 'o2-q2',
        prompt: 'Which sunscreen habit helps protect coastal coral reefs?',
        options: [
          'Using reef-safe mineral sunscreens without oxybenzone or octinoxate',
          'Applying extra chemical spray right before diving',
          'Scrubbing corals with sponges',
        ],
        correctIndex: 0,
        explanation:
          'Certain UV-filtering chemicals harm coral larvae and increase bleaching risk.',
      },
    ],
  },
  {
    id: 'ocean-3',
    worldId: 'ocean',
    order: 3,
    title: 'Microplastic Filter',
    shortDescription: 'Prevent synthetic microfibers from entering the marine food web.',
    instructions:
      'Identify where microplastics come from and how to trap them before they reach the sea.',
    difficulty: 'Medium',
    xpReward: 95,
    ecoImpactPoints: 20,
    locationLabel: 'Kelp Trench',
    coordinates: [-2.8, -0.8, 3.5],
    questions: [
      {
        id: 'o3-q1',
        prompt: 'Which everyday household activity releases thousands of synthetic microfibers into waterways?',
        options: [
          'Washing synthetic fleece and polyester clothes without a microfiber filter',
          'Boiling tap water in a steel kettle',
          'Sweeping a wooden floor',
        ],
        correctIndex: 0,
        explanation:
          'Synthetic textiles shed tiny plastic fibers in the wash; laundry filters and natural fibers help cut this pollution.',
      },
    ],
  },
  {
    id: 'ocean-4',
    worldId: 'ocean',
    order: 4,
    title: 'Seagrass Meadow Care',
    shortDescription: 'Protect underwater seagrass beds that store blue carbon and shelter fry.',
    instructions:
      'Discover why seagrass meadows are vital nurseries for the Blue Ocean.',
    difficulty: 'Medium',
    xpReward: 100,
    ecoImpactPoints: 20,
    locationLabel: 'Emerald Shoals',
    coordinates: [3.0, -0.6, 3.2],
    questions: [
      {
        id: 'o4-q1',
        prompt: 'Why are seagrass meadows called "blue carbon" powerhouses?',
        options: [
          'They capture and store carbon in seabed sediments far faster per hectare than many land forests',
          'They glow bright blue only at midnight',
          'They produce crude oil',
        ],
        correctIndex: 0,
        explanation:
          'Seagrasses trap organic carbon deep in oxygen-poor seabed mud where it stays locked away for centuries.',
      },
    ],
  },
  {
    id: 'ocean-5',
    worldId: 'ocean',
    order: 5,
    title: 'Sanctuary of the Deep',
    shortDescription: 'Establish a marine protected zone so fish populations rebound.',
    instructions:
      'Balance sustainable livelihoods with marine sanctuaries to restore the ocean.',
    difficulty: 'Hard',
    xpReward: 120,
    ecoImpactPoints: 20,
    locationLabel: 'Abyssal Arch',
    coordinates: [0, -0.4, -4.5],
    questions: [
      {
        id: 'o5-q1',
        prompt: 'How do well-managed Marine Protected Areas (MPAs) benefit nearby fisheries?',
        options: [
          'Fish grow larger and reproduce inside the sanctuary, spilling over into surrounding waters',
          'They drain all water out of the bay',
          'They ban all marine scientists from studying the sea',
        ],
        correctIndex: 0,
        explanation:
          'Healthy breeding populations inside MPAs replenish adjacent fishing grounds through the spillover effect.',
      },
    ],
  },

  // ==================== DESERT WORLD (5 MISSIONS) ====================
  {
    id: 'desert-1',
    worldId: 'desert',
    order: 1,
    title: 'Dew & Rainwater Harvest',
    shortDescription: 'Capture scarce morning dew and seasonal rain for the oasis.',
    instructions:
      'Choose smart water-harvesting techniques suited for arid landscapes.',
    difficulty: 'Easy',
    xpReward: 85,
    ecoImpactPoints: 20,
    locationLabel: 'Mirage Ridge',
    coordinates: [-4.2, 0.3, -2.5],
    questions: [
      {
        id: 'd1-q1',
        prompt: 'How do fog and dew nets help arid communities?',
        options: [
          'Fine mesh captures airborne moisture droplets and funnels clean water into storage tanks',
          'They heat the sand to create steam',
          'They block all sunlight from reaching solar panels',
        ],
        correctIndex: 0,
        explanation:
          'Passive fog/dew harvesters collect fresh water without electricity in dry coastal or highland deserts.',
      },
    ],
  },
  {
    id: 'desert-2',
    worldId: 'desert',
    order: 2,
    title: 'Drip Irrigation Design',
    shortDescription: 'Replace wasteful flood channels with precision root-zone watering.',
    instructions:
      'Optimize oasis agriculture while conserving precious groundwater.',
    difficulty: 'Easy',
    xpReward: 90,
    ecoImpactPoints: 20,
    locationLabel: 'Golden Basin',
    coordinates: [4.0, 0.2, -2.2],
    questions: [
      {
        id: 'd2-q1',
        prompt: 'Why is drip irrigation ideal for desert farming?',
        options: [
          'It delivers water slowly right to plant roots, slashing evaporation loss',
          'It sprays water high into hot desert winds',
          'It requires flooding the entire dune',
        ],
        correctIndex: 0,
        explanation:
          'Drip irrigation can save 40–60% more water than surface flooding while keeping soil healthy.',
      },
    ],
  },
  {
    id: 'desert-3',
    worldId: 'desert',
    order: 3,
    title: 'Dune Stabilization',
    shortDescription: 'Plant native hardy shrubs to halt desertification and sandstorms.',
    instructions:
      'Select biological methods to anchor shifting sands.',
    difficulty: 'Medium',
    xpReward: 100,
    ecoImpactPoints: 20,
    locationLabel: 'Windward Dunes',
    coordinates: [-3.0, 0.3, 3.6],
    questions: [
      {
        id: 'd3-q1',
        prompt: 'How do native desert shrubs prevent desertification?',
        options: [
          'Their deep roots bind loose sand and their stems slow ground-level wind erosion',
          'They melt sand into glass',
          'They absorb all groundwater and leave none for anything else',
        ],
        correctIndex: 0,
        explanation:
          'Drought-adapted shrubs anchor soil, trap organic matter, and create micro-shade for other seedlings.',
      },
    ],
  },
  {
    id: 'desert-4',
    worldId: 'desert',
    order: 4,
    title: 'Solar Shade Oasis',
    shortDescription: 'Use agrivoltaics to generate clean power while shading crops.',
    instructions:
      'Combine solar energy with desert cultivation for mutual benefit.',
    difficulty: 'Medium',
    xpReward: 105,
    ecoImpactPoints: 20,
    locationLabel: 'Sunstone Terrace',
    coordinates: [3.2, 0.3, 3.4],
    questions: [
      {
        id: 'd4-q1',
        prompt: 'What is agrivoltaics in a sunny desert?',
        options: [
          'Growing shade-tolerant crops beneath elevated solar panels, cooling the panels and reducing plant water stress',
          'Covering every oasis pond with black asphalt',
          'Replacing all desert plants with plastic models',
        ],
        correctIndex: 0,
        explanation:
          'Elevated solar arrays reduce heat stress and evaporation on crops, while plant transpiration cools panels to boost efficiency.',
      },
    ],
  },
  {
    id: 'desert-5',
    worldId: 'desert',
    order: 5,
    title: 'Revive the Great Oasis',
    shortDescription: 'Balance aquifer recharge and native palm groves for lasting life.',
    instructions:
      'Complete the final desert restoration plan.',
    difficulty: 'Hard',
    xpReward: 125,
    ecoImpactPoints: 20,
    locationLabel: 'Emerald Spring',
    coordinates: [0, 0.2, 0.5],
    questions: [
      {
        id: 'd5-q1',
        prompt: 'What happens if an oasis aquifer is pumped faster than rainfall and recharge can refill it?',
        options: [
          'The water table drops, springs dry up, and soil salinity can rise',
          'The aquifer magically doubles in size',
          'Sand turns into ocean water',
        ],
        correctIndex: 0,
        explanation:
          'Sustainable withdrawal rates and recharge basins keep oasis springs flowing for future generations.',
      },
    ],
  },

  // ==================== FUTURE CITY (5 MISSIONS) ====================
  {
    id: 'city-1',
    worldId: 'future-city',
    order: 1,
    title: 'Solar Canopy Grid',
    shortDescription: 'Install rooftop solar and smart battery storage across city towers.',
    instructions:
      'Choose the clean energy upgrade that powers the city day and night.',
    difficulty: 'Easy',
    xpReward: 90,
    ecoImpactPoints: 20,
    locationLabel: 'Helios Plaza',
    coordinates: [-4.2, 0.2, -3.0],
    questions: [
      {
        id: 'c1-q1',
        prompt: 'Why are grid-scale batteries paired with rooftop solar panels?',
        options: [
          'They store surplus daytime solar power for evening and cloudy-day demand',
          'They make solar panels spin like windmills',
          'They burn coal when the sun is shining',
        ],
        correctIndex: 0,
        explanation:
          'Energy storage smooths out renewable supply and reduces reliance on fossil-fuel peaker plants.',
      },
    ],
  },
  {
    id: 'city-2',
    worldId: 'future-city',
    order: 2,
    title: 'Zero-Emission Transit',
    shortDescription: 'Replace congested fuel lanes with electric trams and bike greenways.',
    instructions:
      'Design a cleaner, quieter urban mobility network.',
    difficulty: 'Easy',
    xpReward: 95,
    ecoImpactPoints: 20,
    locationLabel: 'Skyline Boulevard',
    coordinates: [4.2, 0.2, -2.5],
    questions: [
      {
        id: 'c2-q1',
        prompt: 'Which urban transport mix cuts city emissions and traffic congestion most effectively?',
        options: [
          'Walkable neighborhoods, protected bike lanes, and electrified public transit',
          'Removing all sidewalks to add extra highway lanes',
          'Requiring every commuter to drive a separate diesel truck',
        ],
        correctIndex: 0,
        explanation:
          'Prioritizing transit, walking, and cycling moves far more people per meter of street with minimal emissions.',
      },
    ],
  },
  {
    id: 'city-3',
    worldId: 'future-city',
    order: 3,
    title: 'Vertical Garden Towers',
    shortDescription: 'Cool urban heat islands with living green facades and pocket parks.',
    instructions:
      'Discover how urban greenery transforms concrete skylines.',
    difficulty: 'Medium',
    xpReward: 105,
    ecoImpactPoints: 20,
    locationLabel: 'Verdant Spire',
    coordinates: [-3.2, 0.2, 3.4],
    questions: [
      {
        id: 'c3-q1',
        prompt: 'How do vertical gardens and urban trees reduce the "urban heat island" effect?',
        options: [
          'They provide shade and cool the air through evapotranspiration while absorbing stormwater',
          'They trap exhaust fumes inside bedrooms',
          'They raise street temperatures by 10°C',
        ],
        correctIndex: 0,
        explanation:
          'Urban greenery cools city surfaces, lowers building AC demand, and filters particulate pollution.',
      },
    ],
  },
  {
    id: 'city-4',
    worldId: 'future-city',
    order: 4,
    title: 'Circular E-Waste Hub',
    shortDescription: 'Recover rare metals and repair electronics instead of landfilling them.',
    instructions:
      'Apply circular economy principles to city electronics and materials.',
    difficulty: 'Medium',
    xpReward: 110,
    ecoImpactPoints: 20,
    locationLabel: 'Circular Foundry',
    coordinates: [3.4, 0.2, 3.2],
    questions: [
      {
        id: 'c4-q1',
        prompt: 'What is the best first step in a circular economy for city electronics?',
        options: [
          'Design for repair and reuse, then safely recycle precious metals at end-of-life',
          'Throw old phones into household trash bins',
          'Incinerate circuit boards in open pits',
        ],
        correctIndex: 0,
        explanation:
          'Repairing and refurbishing extends device life, and formal recycling recovers gold, copper, and lithium safely.',
      },
    ],
  },
  {
    id: 'city-5',
    worldId: 'future-city',
    order: 5,
    title: 'Carbon-Neutral Solaris',
    shortDescription: 'Synchronize wind turbines, smart grids, and green architecture.',
    instructions:
      'Complete the transformation into a living, net-zero Future City.',
    difficulty: 'Hard',
    xpReward: 130,
    ecoImpactPoints: 20,
    locationLabel: 'Aether Core',
    coordinates: [0, 0.3, -4.4],
    questions: [
      {
        id: 'c5-q1',
        prompt: 'What makes a city truly "net-zero" and climate-resilient?',
        options: [
          'Clean renewable energy, energy-efficient buildings, circular waste systems, and abundant urban nature',
          'Painting coal plants green',
          'Turning off all streetlamps permanently',
        ],
        correctIndex: 0,
        explanation:
          'True sustainability integrates clean power, efficient design, circular materials, and thriving urban ecosystems.',
      },
    ],
  },
];

export function getMissionsByWorld(worldId: WorldId): Mission[] {
  return MISSIONS_DATA.filter((m) => m.worldId === worldId).sort((a, b) => a.order - b.order);
}
