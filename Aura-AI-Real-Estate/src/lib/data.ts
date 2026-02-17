export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    specs: {
        beds: number;
        baths: number;
        sqft: number;
    };
    category: 'Villa' | 'Penthouse' | 'Mansion' | 'Waterfront' | 'Estate';
    images: string[];
    features: string[];
    marketData?: {
        appreciation: number; // Annual appreciation rate (%)
        rentalYield: number; // Annual rental yield (%)
        roi5Year: number; // Projected 5-year ROI (%)
        demandScore: number; // 0-100
        investmentGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B';
    };
    stagingStyles?: string[]; // Available staging styles for this property
    yearBuilt?: number;
    architect?: string;
    lotSize?: number;
}

export const properties: Property[] = [
    // VILLAS (3)
    {
        id: '1',
        title: "The Palm Majestic",
        description: "A triumph of modern architecture located on the exclusive fronds of Palm Jumeirah. This custom-built villa features panoramic marina skyline views, a private beach, and interiors by Minotti. Every detail has been meticulously crafted to create a sanctuary of unparalleled elegance.",
        price: 18500000,
        location: "Palm Jumeirah, Dubai",
        specs: { beds: 6, baths: 8, sqft: 12000 },
        category: "Villa",
        features: ["Private Beach Access", "Infinity Pool", "Smart Home Technology", "Private Cinema", "State-of-the-Art Gym", "Wine Cellar", "Chef's Kitchen", "Staff Quarters"],
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop", 
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 8.5,
            rentalYield: 5.2,
            roi5Year: 67.3,
            demandScore: 94,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Modern Minimalist', 'Mid-Century Modern', 'Coastal Luxury', 'Contemporary Chic'],
        yearBuilt: 2023,
        architect: "Foster + Partners",
        lotSize: 15000
    },
    {
        id: '2',
        title: "Desert Rose Villa",
        description: "A secluded sanctuary in Arabian Ranches, this architectural masterpiece combines traditional Arabian elements with contemporary luxury. Set on 2 acres of meticulously landscaped gardens, featuring a temperature-controlled pool and championship golf course views.",
        price: 8900000,
        location: "Arabian Ranches, Dubai",
        specs: { beds: 7, baths: 8, sqft: 14500 },
        category: "Villa",
        features: ["2-Acre Plot", "Traditional Majlis", "Home Theater", "Staff Quarters", "Tennis Court", "Outdoor Kitchen", "Koi Pond", "Golf Course Views"],
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-27b88e36e29f?q=80&w=2075&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 6.8,
            rentalYield: 5.8,
            roi5Year: 63.2,
            demandScore: 88,
            investmentGrade: 'A'
        },
        stagingStyles: ['Arabian Traditional', 'Modern Arabic Fusion', 'Desert Contemporary', 'Moroccan Luxe'],
        yearBuilt: 2022,
        architect: "Gensler Dubai",
        lotSize: 87120
    },
    {
        id: '3',
        title: "Villa Serenissima",
        description: "Inspired by Venetian palazzos, this extraordinary villa in Emirates Hills showcases Old World craftsmanship with modern amenities. Hand-painted frescoes, Murano glass chandeliers, and Italian marble throughout create an atmosphere of timeless luxury.",
        price: 22000000,
        location: "Emirates Hills, Dubai",
        specs: { beds: 8, baths: 9, sqft: 16500 },
        category: "Villa",
        features: ["Venetian Architecture", "Murano Glass Features", "Wine Cellar for 3000 Bottles", "Library", "Art Gallery", "Spa & Hammam", "Guard House", "Lake Views"],
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 7.2,
            rentalYield: 4.5,
            roi5Year: 59.8,
            demandScore: 90,
            investmentGrade: 'A'
        },
        stagingStyles: ['Venetian Classic', 'Italian Renaissance', 'European Grandeur', 'Mediterranean Elegance'],
        yearBuilt: 2021,
        architect: "Studio Munge",
        lotSize: 22000
    },

    // PENTHOUSES (3)
    {
        id: '4',
        title: "Skyline Penthouse",
        description: "Floating above the city on the 70th floor, this triplex penthouse offers 360-degree views of the Burj Khalifa and Dubai Fountain. Complete with a private rooftop terrace, plunge pool, and direct elevator access. Interiors feature Baccarat crystal chandeliers and Italian marble.",
        price: 42000000,
        location: "Downtown Dubai",
        specs: { beds: 4, baths: 5, sqft: 8500 },
        category: "Penthouse",
        features: ["Rooftop Terrace", "Private Elevator", "24/7 Concierge", "Valet Service", "Plunge Pool", "Sky Lounge", "Burj Khalifa Views", "Smart Home System"],
        images: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 12.3,
            rentalYield: 4.8,
            roi5Year: 89.5,
            demandScore: 98,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Ultra Modern', 'Scandinavian Luxury', 'Industrial Chic', 'Art Deco'],
        yearBuilt: 2024,
        architect: "Adrian Smith + Gordon Gill"
    },
    {
        id: '5',
        title: "Emirates Crown",
        description: "The pinnacle of vertical living. This full-floor penthouse spans the entire 85th level with floor-to-ceiling windows showcasing uninterrupted city and ocean views. Features include a private spa, chef's kitchen with Gaggenau appliances, and helipad access.",
        price: 38000000,
        location: "Business Bay, Dubai",
        specs: { beds: 5, baths: 7, sqft: 11500 },
        category: "Penthouse",
        features: ["Full Floor", "Sky Lounge", "Private Spa & Sauna", "Chef's Kitchen", "Smart Climate Control", "Helipad Access", "Private Office", "Wine Display"],
        images: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 11.5,
            rentalYield: 4.5,
            roi5Year: 82.7,
            demandScore: 97,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Modern Luxe', 'Corporate Elegance', 'Futuristic Minimalism', 'High-Tech Haven'],
        yearBuilt: 2023,
        architect: "Zaha Hadid Architects"
    },
    {
        id: '6',
        title: "The Residences at One",
        description: "Crowning achievement in modern design. This duplex penthouse features 20-foot ceilings, a floating staircase by Siller Treppen, and a private art gallery. The expansive terrace includes an outdoor kitchen and infinity-edge spa overlooking the Persian Gulf.",
        price: 56000000,
        location: "Dubai Marina",
        specs: { beds: 6, baths: 8, sqft: 13500 },
        category: "Penthouse",
        features: ["Duplex Design", "Private Art Gallery", "20-Foot Ceilings", "Outdoor Kitchen", "Infinity Spa", "Private Gym", "Meditation Room", "Gulf Views"],
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 13.8,
            rentalYield: 4.2,
            roi5Year: 96.3,
            demandScore: 99,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Contemporary Museum', 'Minimalist Luxury', 'Collector\'s Paradise', 'Sky Mansion'],
        yearBuilt: 2024,
        architect: "Norman Foster"
    },

    // MANSIONS (3)
    {
        id: '7',
        title: "Heritage Mansion",
        description: "A rare find in historic Al Fahidi, this meticulously restored heritage mansion combines 19th-century Arabian architecture with 21st-century technology. Features original courtyards, wind towers, and a stunning rooftop terrace with panoramic creek views. Museum-quality restoration.",
        price: 19500000,
        location: "Al Fahidi, Dubai",
        specs: { beds: 6, baths: 7, sqft: 13000 },
        category: "Mansion",
        features: ["Heritage Listed", "Rooftop Terrace", "Traditional Courtyards", "Wind Tower", "Museum Quality Restoration", "Smart Home Integration", "Private Parking", "Creek Views"],
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-27b88e36e29f?q=80&w=2075&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 9.8,
            rentalYield: 3.9,
            roi5Year: 69.4,
            demandScore: 85,
            investmentGrade: 'A-'
        },
        stagingStyles: ['Heritage Classic', 'Arabian Palace', 'Colonial Elegance', 'Historical Luxury'],
        yearBuilt: 1890,
        architect: "Restoration by Hopkins Architects",
        lotSize: 18000
    },
    {
        id: '8',
        title: "Mediterranean Palace",
        description: "Reminiscent of a French château, this sprawling mansion in Emirates Hills offers 25,000 square feet of opulent living space. Grand reception halls, hand-carved wooden panels, championship golf course frontage, and separate guest villa define this extraordinary property.",
        price: 35000000,
        location: "Emirates Hills, Dubai",
        specs: { beds: 10, baths: 12, sqft: 25000 },
        category: "Mansion",
        features: ["Golf Course Frontage", "Guest Villa", "Grand Ballroom", "Wine Cellar 5000+ Bottles", "Library", "Home Cinema", "Tennis Court", "Staff Wing"],
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-27b88e36e29f?q=80&w=2075&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 8.9,
            rentalYield: 3.5,
            roi5Year: 64.7,
            demandScore: 92,
            investmentGrade: 'A'
        },
        stagingStyles: ['French Château', 'Mediterranean Classic', 'European Manor', 'Tuscan Villa'],
        yearBuilt: 2020,
        architect: "Perkins&Will",
        lotSize: 45000
    },
    {
        id: '9',
        title: "Royal Gardens Estate",
        description: "Set behind private gates on 3 acres of botanical gardens, this neoclassical mansion epitomizes grandeur. Features include hand-painted ceiling murals, crystal chandeliers from Austria, heated outdoor pools, and a private equestrian facility. A true crown jewel.",
        price: 48000000,
        location: "Al Barari, Dubai",
        specs: { beds: 9, baths: 11, sqft: 22000 },
        category: "Mansion",
        features: ["3-Acre Botanical Gardens", "Equestrian Facility", "Heated Pool", "Crystal Chandeliers", "Hand-Painted Murals", "Motor Court", "Spa Complex", "Organic Farm"],
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-27b88e36e29f?q=80&w=2075&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 10.2,
            rentalYield: 3.2,
            roi5Year: 71.8,
            demandScore: 93,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Neoclassical Palace', 'Botanical Luxury', 'English Manor', 'Garden Paradise'],
        yearBuilt: 2021,
        architect: "WATG",
        lotSize: 130680
    },

    // WATERFRONT (3)
    {
        id: '10',
        title: "Azure Shores",
        description: "Direct ocean access and uncompromised luxury. This contemporary masterpiece on Jumeirah Bay Island seamlessly blends indoor and outdoor living with 180-degree glass walls. Features include a private boat dock, infinity-edge pool, and interiors by Kelly Hoppen.",
        price: 28500000,
        location: "Jumeirah Bay Island",
        specs: { beds: 5, baths: 6, sqft: 9500 },
        category: "Waterfront",
        features: ["Private Boat Dock", "Infinity Pool", "Beach Access", "180° Glass Walls", "Spa & Sauna", "Smart Lighting", "Outdoor Entertainment", "Sunrise Terrace"],
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 9.2,
            rentalYield: 5.5,
            roi5Year: 72.8,
            demandScore: 96,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Coastal Modern', 'Nautical Elegance', 'Tropical Paradise', 'Beach House Chic'],
        yearBuilt: 2023,
        architect: "Kelly Hoppen Interiors",
        lotSize: 12000
    },
    {
        id: '11',
        title: "Pearl Marina Estate",
        description: "Unprecedented luxury on a private island peninsula in Dubai Marina. This ultra-modern estate features electrochromic smart glass, a 60-foot yacht berth, and interiors by Philippe Starck. The pinnacle of waterfront living with direct marina access.",
        price: 52000000,
        location: "Dubai Marina",
        specs: { beds: 6, baths: 9, sqft: 16000 },
        category: "Waterfront",
        features: ["60ft Yacht Berth", "Smart Glass Technology", "Private Island", "Underground Garage", "Wine Room 2000 Bottles", "Infinity Pool", "Marina Views", "Helipad"],
        images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 13.2,
            rentalYield: 4.3,
            roi5Year: 95.8,
            demandScore: 99,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Ultra Luxury', 'Yacht Club Modern', 'Nautical Opulence', 'Waterfront Contemporary'],
        yearBuilt: 2024,
        architect: "Philippe Starck",
        lotSize: 18500
    },
    {
        id: '12',
        title: "The Cove Residence",
        description: "Nestled in a private cove on Palm Jumeirah, this architectural gem showcases organic curves and natural materials. Floor-to-ceiling windows frame Arabian Gulf vistas. Features include beach access, lap pool, outdoor cinema, and a meditation pavilion.",
        price: 32000000,
        location: "Palm Jumeirah, Dubai",
        specs: { beds: 7, baths: 8, sqft: 14000 },
        category: "Waterfront",
        features: ["Private Cove", "Beach Access", "Lap Pool", "Outdoor Cinema", "Meditation Pavilion", "Water Features", "Guest Suite", "Cabana"],
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 10.5,
            rentalYield: 4.9,
            roi5Year: 78.4,
            demandScore: 95,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Organic Modern', 'Zen Luxury', 'Tropical Contemporary', 'Coastal Retreat'],
        yearBuilt: 2022,
        architect: "Olson Kundig",
        lotSize: 16000
    },

    // ESTATES (3)
    {
        id: '13',
        title: "The Emirates Reserve",
        description: "An unprecedented 10-acre private estate featuring the main residence, two guest villas, equestrian center, and polo field. This ultra-luxury compound offers complete privacy and security. The main house showcases museum-quality contemporary art collection throughout.",
        price: 85000000,
        location: "Dubai Hills Estate",
        specs: { beds: 12, baths: 16, sqft: 35000 },
        category: "Estate",
        features: ["10-Acre Estate", "Polo Field", "Equestrian Center", "Guest Villas", "Art Gallery", "Helipad", "Security Complex", "Championship Pool"],
        images: [
            "https://images.unsplash.com/photo-1600596542815-27b88e36e29f?q=80&w=2075&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 12.5,
            rentalYield: 2.8,
            roi5Year: 88.9,
            demandScore: 98,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Contemporary Museum', 'Modern Estate', 'Collector\'s Sanctuary', 'Equestrian Elegance'],
        yearBuilt: 2023,
        architect: "Richard Meier & Partners",
        lotSize: 435600
    },
    {
        id: '14',
        title: "Sanctuary Estate",
        description: "A 7-acre walled estate offering absolute privacy in Mohammed Bin Rashid City. Features include the main residence, guest house, spa pavilion, championship tennis court, and botanical gardens designed by renowned landscaper Vladimir Djurovic.",
        price: 68000000,
        location: "Mohammed Bin Rashid City",
        specs: { beds: 10, baths: 14, sqft: 28000 },
        category: "Estate",
        features: ["7-Acre Walled Estate", "Guest House", "Spa Pavilion", "Tennis Court", "Botanical Gardens", "Resort-Style Pool", "Wine Vault", "Staff Housing"],
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-27b88e36e29f?q=80&w=2075&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 11.8,
            rentalYield: 3.1,
            roi5Year: 84.3,
            demandScore: 96,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Botanical Paradise', 'Wellness Retreat', 'Garden Estate', 'Natural Luxury'],
        yearBuilt: 2022,
        architect: "Olson Kundig with Vladimir Djurovic",
        lotSize: 304920
    },
    {
        id: '15',
        title: "The Grand Legacy",
        description: "The crown jewel of Emirates Hills. This 15-acre masterpiece combines European grandeur with Middle Eastern hospitality. Features palatial ballrooms, championship golf frontage, lake views, multiple pools, and a private museum. Built for legacy and entertainment on a grand scale.",
        price: 120000000,
        location: "Emirates Hills, Dubai",
        specs: { beds: 15, baths: 20, sqft: 45000 },
        category: "Estate",
        features: ["15-Acre Estate", "Golf Frontage", "Lake Views", "Ballrooms", "Private Museum", "Multiple Pools", "12-Car Garage", "Complete Staff Wing"],
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-27b88e36e29f?q=80&w=2075&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
        ],
        marketData: {
            appreciation: 14.5,
            rentalYield: 2.5,
            roi5Year: 101.2,
            demandScore: 100,
            investmentGrade: 'A+'
        },
        stagingStyles: ['Palatial Grandeur', 'Royal Estate', 'Museum Quality', 'Legacy Collection'],
        yearBuilt: 2024,
        architect: "Skidmore, Owings & Merrill",
        lotSize: 653400
    }
];
