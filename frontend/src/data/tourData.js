

const importAll = (r) => { return r.keys().map(r); } // Import all images from the Italy/Rome folder 
import img from '../images/Italy/Rome/1.jpg'
const Italy_Rome = importAll(require.context('../images/Italy/Rome', false, /\.(png|jpe?g|svg)$/));
const Brazil_Manaus = importAll(require.context('../images/Brazil/Manaus', false, /\.(png|jpe?g|svg)$/));
const tourData = [
    {
        id: "01",
        title: "Historical City Tour",
        country: "Italy",
        city: "Rome",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 99,
        duration: 3,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 4 }, { rating: 5 }],
        maxGroupSize: 8,
        desc: "Explore the ancient streets of Rome, visiting iconic landmarks like the Colosseum, Roman Forum, and Pantheon while learning about the city's rich history from expert guides.",
        highlights: [
            "Skip-the-line access to the Colosseum",
            "Expert local guide",
            "Small group size",
            "Visit iconic landmarks like the Roman Forum and Pantheon"
        ]
    },
    {
        id: "02",
        title: "Cultural Experience",
        country: "France",
        city: "Paris",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 129,
        duration: 2,
        featured: false,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 6,
        desc: "Immerse yourself in the heart of Parisian culture, visiting art museums, historic sites, and experiencing the vibrant street life that defines the French capital.",
        highlights: [
            "Skip-the-line access to top museums",
            "Guided tour of Paris' most famous landmarks",
            "Explore Parisian street life",
            "Local food and drink tasting"
        ]
    },
    {
        id: "03",
        title: "Coastal Hike",
        country: "Greece",
        city: "Santorini",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 149,
        duration: 4,
        featured: true,
        reviews: [{ rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 10,
        desc: "Take in breathtaking views of the Aegean Sea as you hike along the rugged coastline of Santorini, discovering hidden beaches and picturesque villages.",
        highlights: [
            "Scenic coastal hiking",
            "Breathtaking views of the Aegean Sea",
            "Visit hidden beaches and villages",
            "Small group experience"
        ]
    },
    {
        id: "04",
        title: "Foodie Adventure",
        country: "Spain",
        city: "Barcelona",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 199,
        duration: 3,
        featured: false,
        reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 4 }, { rating: 5 }],
        maxGroupSize: 8,
        desc: "Embark on a culinary journey through Barcelona's best eateries, tasting local specialties and traditional Spanish dishes in an immersive food tour.",
        highlights: [
            "Taste traditional Spanish dishes",
            "Visit top eateries in Barcelona",
            "Learn about Catalan food culture",
            "Enjoy a guided culinary experience"
        ]
    },
    {
        id: "05",
        title: "Baroque Architecture Tour",
        country: "Italy",
        city: "Rome",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 89,
        duration: 2,
        featured: true,
        reviews: [{ rating: 4 }, { rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 12,
        desc: "Admire the intricate Baroque architecture of Rome as you visit grand cathedrals, ornate fountains, and historical plazas that tell the city's storied past.",
        highlights: [
            "Visit grand Baroque cathedrals",
            "Explore ornate fountains and plazas",
            "Learn about the history of Baroque architecture",
            "Small group for an intimate experience"
        ]
    },
    {
        id: "06",
        title: "Desert Safari",
        country: "UAE",
        city: "Dubai",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 120,
        duration: 1,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 15,
        desc: "Experience the thrill of the desert with an adventurous safari in Dubai, complete with dune bashing, camel rides, and a traditional Bedouin dinner.",
        highlights: [
            "Dune bashing adventure",
            "Camel ride experience",
            "Traditional Bedouin dinner",
            "Stunning desert landscape views"
        ]
    },
    {
        id: "07",
        title: "Mountain Trek",
        country: "Nepal",
        city: "Kathmandu",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 250,
        duration: 5,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 5 }],
        maxGroupSize: 8,
        desc: "Trek through the majestic Himalayas, encountering panoramic views, remote villages, and the serene beauty of Nepal's mountain landscapes.",
        highlights: [
            "Trek through the majestic Himalayas",
            "Panoramic mountain views",
            "Visit remote villages",
            "Experienced local guides"
        ]
    },
    {
        id: "08",
        title: "Safari Wildlife Tour",
        country: "South Africa",
        city: "Kruger National Park",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 300,
        duration: 4,
        featured: false,
        reviews: [{ rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 5 }],
        maxGroupSize: 10,
        desc: "Discover the wonders of South African wildlife on an exhilarating safari, where you can see lions, elephants, and other iconic animals up close.",
        highlights: [
            "See lions, elephants, and other iconic animals",
            "Safari in Kruger National Park",
            "Guided tour with expert wildlife guides",
            "Small group safari experience"
        ]
    },
    {
        id: "09",
        title: "Ski Adventure",
        country: "Switzerland",
        city: "Zermatt",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 350,
        duration: 3,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 4 }],
        maxGroupSize: 12,
        desc: "Hit the slopes of Zermatt for an exciting ski adventure with breathtaking views of the Matterhorn, catering to all skill levels.",
        highlights: [
            "Ski with breathtaking views of the Matterhorn",
            "Suitable for all skill levels",
            "Guided ski tour",
            "Small group experience"
        ]
    },
    {
        id: "10",
        title: "Tropical Island Tour",
        country: "Thailand",
        city: "Phuket",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 180,
        duration: 2,
        featured: false,
        reviews: [{ rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 4 }, { rating: 5 }],
        maxGroupSize: 15,
        desc: "Relax and explore the tropical beauty of Phuket, visiting pristine beaches, lush jungles, and local attractions on a scenic island tour.",
        highlights: [
            "Explore pristine beaches",
            "Visit lush jungles and local attractions",
            "Relaxing island tour",
            "Guided small group experience"
        ]
    },
    {
        id: "11",
        title: "Northern Lights Experience",
        country: "Iceland",
        city: "Reykjavik",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 220,
        duration: 1,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 5 }],
        maxGroupSize: 20,
        desc: "Witness the breathtaking Northern Lights in Reykjavik, with expert guides who help you capture the perfect view of this natural phenomenon.",
        highlights: [
            "Witness the Northern Lights",
            "Guided tour with expert photographers",
            "Capture stunning photographs",
            "Small group experience"
        ]
    },
    {
        id: "12",
        title: "Wine Tasting Tour",
        country: "France",
        city: "Bordeaux",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 110,
        duration: 1,
        featured: false,
        reviews: [{ rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 6,
        desc: "Savor the finest Bordeaux wines on this wine-tasting tour, visiting renowned vineyards and learning about the winemaking process.",
        highlights: [
            "Wine tasting at renowned Bordeaux vineyards",
            "Learn about the winemaking process",
            "Visit local wineries",
            "Small group tour for an intimate experience"
        ]
    },
    {
        id: "13",
        title: "Historical Temples Visit",
        country: "Japan",
        city: "Kyoto",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 140,
        duration: 2,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 4 }],
        maxGroupSize: 8,
        desc: "Visit the serene temples of Kyoto and learn about their significance, architecture, and the Zen practices that define them.",
        highlights: [
            "Explore UNESCO World Heritage temples", 
            "Learn about Zen Buddhism", 
            "Experience traditional Japanese culture",
            "Admire intricate temple architecture"
        ]
    },
    {
        id: "14",
        title: "Rainforest Expedition",
        country: "Brazil",
        city: "Manaus",
        photo: Brazil_Manaus[0],
        photos: Brazil_Manaus,
        price: 270,
        duration: 3,
        featured: false,
        reviews: [{ rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 5 }],
        maxGroupSize: 12,
        desc: "Embark on an expedition deep into the Amazon Rainforest, discovering rare wildlife, vibrant flora, and indigenous cultures.",
        highlights: [
            "Guided trek through dense rainforest", 
            "Wildlife spotting: monkeys, exotic birds", 
            "Interaction with local tribes", 
            "Discover vibrant plant species"
        ]
    },
    {
        id: "15",
        title: "Culinary Journey",
        country: "Italy",
        city: "Florence",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 180,
        duration: 1,
        featured: false,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 4 }, { rating: 5 }],
        maxGroupSize: 6,
        desc: "Indulge in Florence's culinary delights, sampling traditional dishes, cheeses, and wines while learning about their origins.",
        highlights: [
            "Taste authentic Tuscan cuisine", 
            "Wine pairing with local experts", 
            "Visit artisanal food markets", 
            "Learn culinary history and traditions"
        ]
    },
    {
        id: "16",
        title: "Hot Air Balloon Ride",
        country: "Turkey",
        city: "Cappadocia",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 230,
        duration: 1,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 5 }],
        maxGroupSize: 5,
        desc: "Take to the skies with a hot air balloon ride over Cappadocia's unique landscapes, watching the sunrise over the fairy chimneys.",
        highlights: [
            "Panoramic views of fairy chimneys", 
            "Breathtaking sunrise experience", 
            "Silent, peaceful flight", 
            "Post-flight refreshments and certificates"
        ]
    },  {
        id: "17",
        title: "Art and History Walk",
        country: "Netherlands",
        city: "Amsterdam",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 150,
        duration: 2,
        featured: false,
        reviews: [{ rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 15,
        desc: "Discover Amsterdam's artistic heritage with a guided walk through the city's museums and historical landmarks, including works by Rembrandt and Van Gogh.",
        highlights: [
            "Visit iconic art museums", 
            "Learn about Amsterdam's Golden Age", 
            "See masterpieces by Rembrandt and Van Gogh", 
            "Guided storytelling about historical landmarks"
        ]
        
    },
    {
        id: "18",
        title: "Forest Retreat",
        country: "Canada",
        city: "Vancouver",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 160,
        duration: 2,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 4 }],
        maxGroupSize: 10,
        desc: "Escape to the tranquil forests of Vancouver for a rejuvenating retreat, with guided nature walks, wildlife sightings, and a peaceful environment.",
        highlights: [
            "Guided nature walks", 
            "Wildlife sightings", 
            "Forest bathing experience", 
            "Evening campfire sessions"
        ]
    },
    {
        id: "19",
        title: "Scenic Train Tour",
        country: "Switzerland",
        city: "Lucerne",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 300,
        duration: 3,
        featured: false,
        reviews: [{ rating: 5 }, { rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 5 }],
        maxGroupSize: 20,
        desc: "Relax and enjoy stunning Swiss landscapes on a scenic train tour through the picturesque Swiss Alps, with panoramic views from every seat.",
        highlights: [
            "Panoramic train journey", 
            "Breathtaking Alpine views", 
            "Luxurious onboard amenities", 
            "Stops at scenic villages"
        ]
    },
    {
        id: "20",
        title: "River Cruise",
        country: "Germany",
        city: "Cologne",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 130,
        duration: 2,
        featured: true,
        reviews: [{ rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 4 }],
        maxGroupSize: 25,
        desc: "Set sail on a leisurely river cruise along the Rhine, enjoying views of Cologne's historic architecture, vineyards, and charming villages.",
        highlights: [
            "Views of Cologne Cathedral", 
            "Scenic vineyards and villages", 
            "Onboard dining options", 
            "Relaxing atmosphere with live commentary"
        ]
    },
    {
        id: "21",
        title: "Local Markets Tour",
        country: "Morocco",
        city: "Marrakech",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 90,
        duration: 1,
        featured: false,
        reviews: [{ rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 }],
        maxGroupSize: 12,
        desc: "Explore the vibrant souks and local markets of Marrakech, where you can haggle for traditional crafts, spices, and textiles in an authentic Moroccan setting.",
        highlights: [
            "Experience vibrant souks", 
            "Shop for traditional crafts", 
            "Taste local street food", 
            "Learn haggling techniques"
        ]
    },
    {
        id: "22",
        title: "Wine and Cheese Tasting",
        country: "Spain",
        city: "Madrid",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 100,
        duration: 1,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 8,
        desc: "Indulge in a delightful Spanish experience by tasting local wines paired with cheeses, all while learning about Spain's rich food culture and traditions.",
        highlights: [
            "Expert-led wine tasting", 
            "Regional cheese sampling", 
            "Discussion on winemaking", 
            "Guided pairing techniques"
        ]
    },
    {
        id: "23",
        title: "Volcano Exploration",
        country: "Indonesia",
        city: "Bali",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 210,
        duration: 2,
        featured: false,
        reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 4 }, { rating: 4 }],
        maxGroupSize: 10,
        desc: "Venture to Bali's famous volcanoes and take a guided trek to the summit, where you can enjoy incredible views and learn about the island's volcanic activity.",
        highlights: [
            "Guided volcano trek", 
            "Spectacular summit views", 
            "Witness sunrise from the top", 
            "Learn volcanic geology and myths"
        ]
    },
    {
        id: "24",
        title: "Medieval Castles Tour",
        country: "Czech Republic",
        city: "Prague",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 170,
        duration: 2,
        featured: true,
        reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }],
        maxGroupSize: 15,
        desc: "Step back in time and explore the medieval castles of Prague, including the iconic Prague Castle and other fortresses rich in history and mystery.",
        highlights: [
            "Explore Prague Castle", 
            "Guided historical insights", 
            "Visit multiple medieval sites", 
            "Learn about ancient legends"
        ]
    },
    {
        id: "25",
        title: "City Bike Tour",
        country: "Denmark",
        city: "Copenhagen",
        photo: Italy_Rome[0],
        photos: Italy_Rome,
        price: 80,
        duration: 1,
        featured: false,
        reviews: [{ rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 5 }],
        maxGroupSize: 12,
        desc: "Cycle through the charming streets of Copenhagen on a guided bike tour, discovering the city's top sights, parks, and historical landmarks.",
        highlights: [
            "Guided bike route", 
            "City's historical landmarks", 
            "Visit famous sites like Nyhavn", 
            "Stops at scenic parks and local cafes"
        ]
    }
  ];
  
  export default tourData;
  
  