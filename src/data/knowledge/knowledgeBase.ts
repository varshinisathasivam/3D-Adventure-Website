import { CompanionTopic } from '../../types';

export const KNOWLEDGE_BASE: CompanionTopic[] = [
  {
    id: 'tree-planting',
    title: 'Tree Planting & Reforestation',
    keywords: ['tree', 'trees', 'plant', 'planting', 'forest', 'reforestation', 'deforestation', 'sapling', 'carbon'],
    suggestedQuestion: 'Why is planting native trees better than planting just one species?',
    response:
      'Planting diverse native trees rebuilds resilient ecosystems rather than fragile monocultures. Native species support local birds, pollinators, and soil microbes, store carbon reliably, and resist regional pests and droughts.',
    actionTip: 'In Green Forest, try the Tree Planting Challenge and Deforestation Awareness missions to see biodiversity recover!',
  },
  {
    id: 'climate-change',
    title: 'Climate Change & Carbon Balance',
    keywords: ['climate', 'warming', 'greenhouse', 'emission', 'emissions', 'co2', 'temperature', 'carbon footprint'],
    suggestedQuestion: 'How do oceans and forests work together to regulate climate?',
    response:
      'Forests and oceans act as Earth’s twin carbon sinks. Healthy forests absorb CO₂ through photosynthesis, while oceans absorb heat and carbon—though excess CO₂ acidifies seawater, making marine protection equally vital.',
    actionTip: 'Balancing land restoration with clean energy in Future City cuts emissions at the source.',
  },
  {
    id: 'ocean-pollution',
    title: 'Ocean Pollution & Coral Reefs',
    keywords: ['ocean', 'sea', 'plastic', 'microplastic', 'coral', 'reef', 'marine', 'fish', 'water pollution'],
    suggestedQuestion: 'How do microplastics harm marine ecosystems?',
    response:
      'Microplastics are tiny fragments under 5 mm that fish, plankton, and filter feeders mistake for food. They block digestive tracts, carry chemical pollutants up the food chain, and stress coral reefs already facing warm waters.',
    actionTip: 'Visit Blue Ocean to run cleanup missions and watch coral reefs regain their color!',
  },
  {
    id: 'wildlife-protection',
    title: 'Wildlife Protection & Habitats',
    keywords: ['wildlife', 'animal', 'animals', 'species', 'habitat', 'corridor', 'endangered', 'biodiversity', 'poaching'],
    suggestedQuestion: 'What are wildlife corridors and why do animals need them?',
    response:
      'Wildlife corridors are protected strips of natural habitat connecting fragmented forests or wetlands. They allow animals to migrate safely for food, water, and genetic diversity without crossing dangerous roads.',
    actionTip: 'Complete the Wildlife Protection mission in Green Forest to restore safe animal passages.',
  },
  {
    id: 'water-conservation',
    title: 'Water Conservation & Drought',
    keywords: ['water', 'drought', 'desert', 'oasis', 'irrigation', 'drip', 'rainwater', 'conserve', 'conservation'],
    suggestedQuestion: 'What is the most efficient way to irrigate crops in dry regions?',
    response:
      'Drip irrigation delivers water slowly right to plant roots, reducing evaporation and runoff by up to 60% compared to open-channel flooding. Pairing it with mulching and rainwater harvesting keeps oasis soils healthy.',
    actionTip: 'Explore Desert World (unlocks at Level 2) to test your water-saving strategies.',
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy & Clean Grids',
    keywords: ['solar', 'wind', 'renewable', 'energy', 'power', 'clean', 'grid', 'battery', 'turbine', 'electricity'],
    suggestedQuestion: 'Why do renewable grids need energy storage?',
    response:
      'Sunlight and wind vary throughout the day. Grid-scale batteries, pumped hydro, and smart demand management store surplus clean energy during peak sun or wind and release it smoothly at night or during calm hours.',
    actionTip: 'Unlock Future City at Level 3 to transform towers with solar canopies and wind turbines!',
  },
  {
    id: 'waste-management',
    title: 'Waste Management & Circular Economy',
    keywords: ['waste', 'recycle', 'recycling', 'compost', 'sort', 'sorting', 'trash', 'litter', 'landfill', 'circular'],
    suggestedQuestion: 'What is the difference between recycling and a circular economy?',
    response:
      'Recycling processes used materials into new ones, while a circular economy designs products from the start to be repaired, reused, composted, or remanufactured—minimizing waste before it is ever created.',
    actionTip: 'Practice sorting recyclables, organics, and e-waste in Forest Waste Sorting and Future City!',
  },
  {
    id: 'pollinators-biodiversity',
    title: 'Pollinators & Biodiversity',
    keywords: ['bee', 'bees', 'pollinator', 'pollinators', 'butterfly', 'flower', 'wildflower', 'biodiversity', 'insect'],
    suggestedQuestion: 'Why are pollinators like bees and butterflies essential for ecosystems?',
    response:
      'Over 75% of flowering plants and roughly one-third of human food crops depend on animal pollinators. Planting native wildflowers, avoiding harsh pesticides, and leaving natural nesting habitats keep pollinator populations thriving.',
    actionTip: 'Restore Green Forest and Desert World to see native wildflowers bloom!',
  },
  {
    id: 'urban-cooling',
    title: 'Green Cities & Urban Cooling',
    keywords: ['city', 'urban', 'heat island', 'vertical garden', 'rooftop', 'building', 'transit', 'bike'],
    suggestedQuestion: 'How do vertical gardens and green roofs cool down cities?',
    response:
      'Concrete and asphalt absorb sunlight and radiate heat, creating urban heat islands. Green roofs, street trees, and vertical gardens shade surfaces and cool the surrounding air through evapotranspiration while absorbing heavy stormwater.',
    actionTip: 'Unlock Future City at Level 3 to transform towers with solar canopies and vertical gardens!',
  },
  {
    id: 'blue-carbon',
    title: 'Blue Carbon & Seagrass',
    keywords: ['seagrass', 'mangrove', 'blue carbon', 'kelp', 'coastal', 'estuary'],
    suggestedQuestion: 'What is blue carbon and where is it stored?',
    response:
      'Blue carbon is carbon captured by coastal and marine ecosystems such as mangroves, salt marshes, and seagrass meadows. Their dense underwater roots trap organic carbon in seabed sediments for centuries.',
    actionTip: 'Try the Seagrass Meadow Care mission in Blue Ocean to protect these underwater carbon sinks.',
  },
];

export const COMPANION_FALLBACK_RESPONSE =
  "I'm Verdantia's local rule-based Eco-Guide (not a generative AI model). I don't have a specific entry for that question yet, but I can help with tree planting, climate change, ocean pollution, wildlife protection, water conservation, renewable energy, and waste management. Try one of the suggested topics below!";
