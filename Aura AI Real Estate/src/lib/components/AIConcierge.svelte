<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import gsap from 'gsap';
    import { properties, type Property } from '$lib/data';

    // UI State
    let open = false;
    let mode: 'chat' | 'staging' | 'investment' | 'schedule' = 'chat';
    let messages = [
        { role: 'ai', text: '✨ Hello, I\'m Aura, your AI real estate concierge. Type your questions below! Try:\n• "What\'s the ROI for the Skyline Penthouse?"\n• "Show me Palm Majestic in Mid-Century Modern style"\n• "Schedule a viewing for Pearl Marina Estate"\n• "Find waterfront properties"' }
    ];
    let input = '';
    let isTyping = false;

    // Quick command suggestions
    const quickCommands = [
        "What's the 5-year ROI for Skyline Penthouse?",
        "Show me Palm Majestic in Mid-Century Modern style",
        "Schedule a viewing for Skyline Penthouse",
        "Find waterfront properties",
        "What penthouses do you have?",
        "Schedule a tour of Pearl Marina Estate"
    ];

    // Voice State
    let isListening = false;
    let recognition: any = null;
    let voiceSupported = false;

    // Staging State
    let selectedProperty: Property | null = null;
    let currentStyle = 'Original';
    let isTransitioning = false;
    let currentImageIndex = 0;

    // Reactive statement to get image index based on current style
    $: if (selectedProperty && currentStyle) {
        const styles = selectedProperty.stagingStyles || [];
        const styleIndex = styles.indexOf(currentStyle);
        // Map each style to a different image, cycling through available images
        currentImageIndex = styleIndex >= 0 ? styleIndex % selectedProperty.images.length : 0;
    }

    // Investment State
    let selectedInvestmentProperty: Property | null = null;
    let chartContainer: HTMLDivElement;

    // Schedule State
    let scheduleProperty: Property | null = null;
    let scheduleForm = {
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
    };
    let scheduleSuccess = false;
    let showCalendar = false;
    let selectedMonth = new Date().getMonth();
    let selectedYear = new Date().getFullYear();

    // Calendar helper functions
    function getCalendarDays() {
        const firstDay = new Date(selectedYear, selectedMonth, 1);
        const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const days = [];
        // Add empty slots for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    }

    function selectDate(day: number) {
        if (!day) return;
        const date = new Date(selectedYear, selectedMonth, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (date < today) return; // Don't allow past dates
        
        scheduleForm.date = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        showCalendar = false;
    }

    function isDateSelected(day: number) {
        if (!scheduleForm.date || !day) return false;
        const [year, month, selectedDay] = scheduleForm.date.split('-').map(Number);
        return year === selectedYear && month === selectedMonth + 1 && selectedDay === day;
    }

    function isDatePast(day: number) {
        if (!day) return false;
        const date = new Date(selectedYear, selectedMonth, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    function previousMonth() {
        if (selectedMonth === 0) {
            selectedMonth = 11;
            selectedYear--;
        } else {
            selectedMonth--;
        }
    }

    function nextMonth() {
        if (selectedMonth === 11) {
            selectedMonth = 0;
            selectedYear++;
        } else {
            selectedMonth++;
        }
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Export function to trigger scheduling from external components
    export function openScheduling(property: Property) {
        scheduleProperty = property;
        mode = 'schedule';
        open = true;
        scheduleSuccess = false;
        showCalendar = false;
        selectedMonth = new Date().getMonth();
        selectedYear = new Date().getFullYear();
        scheduleForm = {
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            message: ''
        };
    }

    // Reset to beginning function
    function resetToHome() {
        mode = 'chat';
        selectedProperty = null;
        selectedInvestmentProperty = null;
        scheduleProperty = null;
        scheduleSuccess = false;
        showCalendar = false;
        // Reset messages to initial welcome state
        messages = [
            { role: 'ai', text: '✨ Hello, I\'m Aura, your AI real estate concierge. Type your questions below! Try:\n• "What\'s the ROI for the Skyline Penthouse?"\n• "Show me Palm Majestic in Mid-Century Modern style"\n• "Schedule a viewing for Pearl Marina Estate"\n• "Find waterfront properties"' }
        ];
    }

    // Initialize Web Speech API
    onMount(() => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    input = transcript;
                    send();
                };

                recognition.onend = () => {
                    isListening = false;
                };

                voiceSupported = true;
            }

            // Listen for external scheduling requests
            window.addEventListener('openScheduling', (e: any) => {
                if (e.detail) {
                    openScheduling(e.detail);
                }
            });
        }
    });

    onDestroy(() => {
        if (recognition) {
            recognition.stop();
        }
    });

    function toggleVoice() {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
            isListening = false;
        } else {
            recognition.start();
            isListening = true;
        }
    }

    function toggle() {
        open = !open;
        if (!open) {
            // Reset everything when closing
            mode = 'chat';
            messages = [
                { role: 'ai', text: '✨ Hello, I\'m Aura, your AI real estate concierge. Type your questions below! Try:\n• "What\'s the ROI for the Skyline Penthouse?"\n• "Show me Palm Majestic in Mid-Century Modern style"\n• "Schedule a viewing for Pearl Marina Estate"\n• "Find waterfront properties"' }
            ];
            input = '';
            selectedProperty = null;
            selectedInvestmentProperty = null;
            scheduleProperty = null;
            scheduleSuccess = false;
            if (recognition && isListening) {
                recognition.stop();
            }
        }
    }

    function submitSchedule() {
        // Validate form
        if (!scheduleForm.name || !scheduleForm.email || !scheduleForm.phone || !scheduleForm.date || !scheduleForm.time) {
            messages = [...messages, { role: 'ai', text: '⚠️ Please fill in all required fields to schedule your viewing.' }];
            return;
        }

        // Simulate successful booking
        scheduleSuccess = true;
        
        // In a real app, this would send to an API
        console.log('Viewing scheduled:', {
            property: scheduleProperty?.title,
            ...scheduleForm
        });

        // Add confirmation message
        setTimeout(() => {
            messages = [...messages, 
                { role: 'user', text: `Schedule viewing for ${scheduleProperty?.title}` },
                { role: 'ai', text: `✅ Perfect! Your viewing is scheduled for ${scheduleProperty?.title}\n\n📅 Date: ${scheduleForm.date}\n🕐 Time: ${scheduleForm.time}\n\n📍 ${scheduleProperty?.location}\n\nOur concierge team will contact you at ${scheduleForm.email} and ${scheduleForm.phone} to confirm and provide viewing details.\n\nA calendar invite has been sent to your email.` }
            ];
        }, 500);
    }

    async function send() {
        if (!input.trim()) return;
        
        const userQuery = input.toLowerCase();
        
        // Check for go back commands first
        if (userQuery.includes('go back') || userQuery.includes('go home') || userQuery.includes('return to') || userQuery.includes('main menu') || userQuery.includes('beginning') || userQuery.includes('start over')) {
            input = '';
            resetToHome();
            return;
        }
        
        messages = [...messages, { role: 'user', text: input }];
        input = '';
        isTyping = true;

        // Enhanced AI Logic
        setTimeout(() => {
            let response = processQuery(userQuery);
            messages = [...messages, { role: 'ai', text: response }];
            isTyping = false;
        }, 1500);
    }

    function processQuery(query: string): string {
        // Schedule viewing queries
        if (query.includes('schedule') || query.includes('viewing') || query.includes('tour') || query.includes('visit') || query.includes('appointment') || query.includes('book')) {
            const prop = properties.find(p => 
                query.includes(p.title.toLowerCase()) || 
                query.includes(p.location.toLowerCase())
            );
            
            if (prop) {
                openScheduling(prop);
                return `📅 Schedule a Viewing: ${prop.title}\n\n📍 ${prop.location}\n💰 $${(prop.price / 1000000).toFixed(1)}M\n\nSwitch to the "Schedule" tab above to choose your preferred date and time using our interactive calendar. You can also use voice commands like:\n• "Pick Tuesday next week at 2pm"\n• "I prefer morning viewings"\n• "Schedule for this weekend"\n\nOur concierge team will coordinate your private viewing!`;
            } else {
                mode = 'schedule';
                return `📅 Schedule a Viewing\n\nI can help you schedule a private viewing for any property in our portfolio. Please specify which property you're interested in, or switch to the "Schedule" tab to browse available properties.\n\n💡 Voice Tip: Say "Schedule a viewing for [property name]" to book instantly!`;
            }
        }

        // Investment queries
        if (query.includes('roi') || query.includes('investment') || query.includes('projected') || query.includes('return') || query.includes('analysis')) {
            const prop = properties.find(p => 
                query.includes(p.title.toLowerCase()) || 
                query.includes(p.location.toLowerCase()) || 
                query.includes(p.category.toLowerCase())
            ) || properties[1]; // Default to Skyline Penthouse for better showcase
            
            showInvestmentAnalysis(prop);
            const md = prop.marketData;
            return `📊 Investment Analysis: ${prop.title}

📍 Location: ${prop.location}
💰 Current Price: $${(prop.price / 1000000).toFixed(1)}M
🏠 ${prop.specs.beds} beds • ${prop.specs.baths} baths • ${prop.specs.sqft.toLocaleString()} sqft

📈 Market Performance:
• Investment Grade: ${md?.investmentGrade}
• 5-Year ROI: ${md?.roi5Year}%
• Annual Appreciation: ${md?.appreciation}%
• Rental Yield: ${md?.rentalYield}%
• Demand Score: ${md?.demandScore}/100

💡 Projected Value (Year 5): $${((prop.price * (1 + (md?.appreciation || 0) / 100) ** 5) / 1000000).toFixed(1)}M

Switch to the "Investment" tab above to see the animated growth chart!`;
        }

        // Staging queries
        if (query.includes('staging') || query.includes('style') || query.includes('show me') || query.includes('visualize')) {
            const prop = properties.find(p => 
                query.includes(p.title.toLowerCase()) || 
                query.includes(p.location.toLowerCase())
            ) || properties[0];

            const styles = prop.stagingStyles || [];
            const requestedStyle = styles.find(s => query.includes(s.toLowerCase()));

            showStaging(prop, requestedStyle || styles[0]);
            return `🎨 Staging Visualization: ${prop.title}

📍 ${prop.location}
💰 $${(prop.price / 1000000).toFixed(1)}M

Available Staging Styles:
${styles.map(s => `  • ${s}`).join('\n')}

Current Style: ${requestedStyle || styles[0]}

Switch to the "Staging" tab above to explore different interior design styles with cinematic transitions! Click any style to see the transformation.`;
        }

        // Location queries - Waterfront
        if (query.includes('beach') || query.includes('water') || query.includes('marina') || query.includes('waterfront')) {
            const waterfrontProps = properties.filter(p => p.category === 'Waterfront');
            const details = waterfrontProps.map(p => 
                `  • ${p.title} - $${(p.price / 1000000).toFixed(1)}M (${p.location})\n    ${p.specs.beds} beds, ROI: ${p.marketData?.roi5Year}%`
            ).join('\n\n');
            return `🌊 Waterfront Properties Collection:

${details}

These properties offer:
✓ Direct water access
✓ Unobstructed views
✓ Premium appreciation rates
✓ High demand scores (avg 96/100)

Would you like investment analysis or staging visualization for any of these?`;
        }

        // Price queries
        if (query.includes('price') || query.includes('$') || query.includes('million') || query.includes('affordable') || query.includes('expensive')) {
            const sorted = [...properties].sort((a, b) => a.price - b.price);
            return `💰 Price Range Analysis:

Most Accessible:
  • ${sorted[0].title} - $${(sorted[0].price / 1000000).toFixed(1)}M
    ${sorted[0].location} | ROI: ${sorted[0].marketData?.roi5Year}%

Mid-Range Premium:
  • ${sorted[3].title} - $${(sorted[3].price / 1000000).toFixed(1)}M
    ${sorted[3].location} | ROI: ${sorted[3].marketData?.roi5Year}%

Ultra-Luxury:
  • ${sorted[sorted.length - 1].title} - $${(sorted[sorted.length - 1].price / 1000000).toFixed(1)}M
    ${sorted[sorted.length - 1].location} | ROI: ${sorted[sorted.length - 1].marketData?.roi5Year}%

💡 Best ROI in $15-25M range: Strong appreciation + rental yields
Type a property name for detailed analysis!`;
        }

        // Category queries - Penthouses
        if (query.includes('penthouse')) {
            const penthouses = properties.filter(p => p.category === 'Penthouse');
            const details = penthouses.map(p => 
                `  • ${p.title}\n    📍 ${p.location}\n    💰 $${(p.price / 1000000).toFixed(1)}M | ${p.specs.beds} beds\n    📈 5-Yr ROI: ${p.marketData?.roi5Year}% | Grade: ${p.marketData?.investmentGrade}`
            ).join('\n\n');
            return `🏙️ Penthouse Collection:

${details}

✨ Key Features:
• Triplex layouts with private elevators
• 360° city views
• Rooftop terraces & private pools
• Exceptional appreciation rates (avg 11.9%/yr)

Ask for investment analysis or staging options for any penthouse!`;
        }

        // Category queries - Villas
        if (query.includes('villa')) {
            const villas = properties.filter(p => p.category === 'Villa');
            const details = villas.map(p => 
                `  • ${p.title}\n    📍 ${p.location}\n    💰 $${(p.price / 1000000).toFixed(1)}M | ${p.specs.beds} beds, ${p.specs.sqft.toLocaleString()} sqft\n    📈 Rental Yield: ${p.marketData?.rentalYield}% | ROI: ${p.marketData?.roi5Year}%`
            ).join('\n\n');
            return `🏡 Villa Collection:

${details}

🌟 Perfect For:
• Family estates with private grounds
• Strong rental income potential
• Excellent lifestyle amenities
• Secured communities

Type a villa name for detailed investment analysis!`;
        }

        // Mansion queries
        if (query.includes('mansion') || query.includes('estate')) {
            const mansions = properties.filter(p => p.category === 'Mansion');
            const details = mansions.map(p => 
                `  • ${p.title}\n    📍 ${p.location}\n    💰 $${(p.price / 1000000).toFixed(1)}M | ${p.specs.beds} beds, ${p.specs.baths} baths\n    🏆 Grade: ${p.marketData?.investmentGrade} | Demand: ${p.marketData?.demandScore}/100`
            ).join('\n\n');
            return `🏰 Mansion & Estate Collection:

${details}

🎯 Distinguishing Features:
• Expansive grounds & guest houses
• Golf course & nature views
• Wine cellars & entertainment wings
• Historical significance options

Request staging visualization or investment data!`;
        }

        // Default response with property overview
        return `✨ Welcome to Aura! I can help you with:

📊 Investment Analysis
• ROI projections & appreciation rates
• Rental yields & demand scores
• 5-year growth charts

🎨 Property Visualization
• Dynamic staging in multiple styles
• Cinematic style transitions

📅 Schedule Viewings
• Private tours with our concierge team
• Flexible scheduling
• Voice or text booking

🏠 Our Portfolio (8 Properties):
• Price Range: $8.9M - $52M
• Average ROI: 72.4% (5-year)
• Top Grade: A+ properties

Try these commands:
  "What's the ROI for Skyline Penthouse?"
  "Show me Palm Majestic in Coastal Luxury style"
  "Schedule a viewing for Pearl Marina Estate"
  "Find waterfront properties"`;
    }

    function showStaging(property: Property, style?: string) {
        selectedProperty = property;
        currentStyle = style || property.stagingStyles?.[0] || 'Original';
        mode = 'staging';
    }

    function changeStyle(style: string) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentStyle = style;
        
        // Curtain wipe animation
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function showInvestmentAnalysis(property: Property) {
        selectedInvestmentProperty = property;
        mode = 'investment';
        
        // Wait for DOM to render
        setTimeout(() => {
            if (chartContainer && property.marketData) {
                animateChart(property);
            }
        }, 100);
    }

    function animateChart(property: Property) {
        if (!chartContainer || !property.marketData) return;

        // Clear previous chart
        chartContainer.innerHTML = '';

        const data = property.marketData;
        const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
        const projectedValues = [
            property.price,
            property.price * (1 + data.appreciation / 100),
            property.price * Math.pow(1 + data.appreciation / 100, 2),
            property.price * Math.pow(1 + data.appreciation / 100, 3),
            property.price * Math.pow(1 + data.appreciation / 100, 4),
            property.price * Math.pow(1 + data.appreciation / 100, 5)
        ];

        // Create bars
        const maxValue = Math.max(...projectedValues);
        years.forEach((year, i) => {
            const bar = document.createElement('div');
            bar.className = 'flex flex-col items-center';
            
            const barContainer = document.createElement('div');
            barContainer.className = 'relative w-16 h-48 bg-lux-glass border border-lux-divider rounded-t-lg overflow-hidden';
            
            const barFill = document.createElement('div');
            barFill.className = 'absolute bottom-0 w-full bg-gradient-to-t from-lux-accent to-lux-accent/40';
            barFill.style.height = '0%';
            
            const valueLabel = document.createElement('div');
            valueLabel.className = 'absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-lux-accent font-bold whitespace-nowrap opacity-0';
            valueLabel.textContent = `$${(projectedValues[i + 1] / 1000000).toFixed(1)}M`;
            
            barContainer.appendChild(barFill);
            barContainer.appendChild(valueLabel);
            
            const label = document.createElement('div');
            label.className = 'text-xs text-lux-textSecondary mt-2';
            label.textContent = year;
            
            bar.appendChild(barContainer);
            bar.appendChild(label);
            chartContainer.appendChild(bar);
            
            // Animate bar growth
            gsap.to(barFill, {
                height: `${(projectedValues[i + 1] / maxValue) * 100}%`,
                duration: 1.5,
                delay: i * 0.2,
                ease: 'power2.out'
            });
            
            gsap.to(valueLabel, {
                opacity: 1,
                duration: 0.5,
                delay: i * 0.2 + 1,
                ease: 'power2.out'
            });
        });
    }
</script>

<div class="fixed inset-0 z-[100] pointer-events-none">
    {#if open}
        <!-- Backdrop - appears instantly with no transition -->
        <div 
            in:fade={{ duration: 0 }}
            out:fade={{ duration: 200 }}
            on:click={toggle}
            on:keydown={(e) => e.key === 'Escape' && toggle()}
            role="button"
            tabindex="-1"
            class="pointer-events-auto absolute inset-0 bg-black/80 backdrop-blur-xl"
        ></div>

        <!-- Central Aura Interface -->
        <div 
            in:fly={{ y: 20, duration: 350, easing: cubicOut, opacity: 0, delay: 50 }}
            out:fly={{ y: 20, duration: 200, easing: cubicOut, opacity: 0 }}
            class="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl z-10"
        >
            <div class="relative rounded-2xl overflow-hidden border border-lux-accent/30 bg-lux-surface/98 backdrop-blur-2xl shadow-[0_0_100px_rgba(198,169,107,0.3)]">
                <!-- Header -->
                <div class="relative bg-gradient-to-r from-lux-surface/95 via-lux-surface to-lux-surface/95 p-6 border-b border-lux-divider">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="relative w-12 h-12">
                                <div class="absolute inset-0 rounded-full bg-lux-accent/20 animate-pulse"></div>
                                <div class="absolute inset-2 rounded-full bg-lux-accent shadow-[0_0_20px_#C6A96B]"></div>
                                {#if isListening}
                                    <div class="absolute inset-0 rounded-full border-2 border-lux-accent animate-ping"></div>
                                {/if}
                            </div>
                            <div>
                                <h2 class="text-2xl font-heading text-lux-accent">Aura</h2>
                                <p class="text-xs text-lux-textSecondary">Your AI Real Estate Concierge</p>
                            </div>
                            {#if mode !== 'chat' || messages.length > 1}
                                <button
                                    on:click={resetToHome}
                                    class="ml-4 px-3 py-1.5 text-xs bg-lux-glass border border-lux-divider rounded-lg text-lux-textSecondary hover:text-lux-accent hover:border-lux-accent transition-all flex items-center gap-2"
                                    title="Back to beginning (or say 'go back')"
                                >
                                    <span>🏠</span>
                                    <span class="hidden sm:inline">Home</span>
                                </button>
                            {/if}
                        </div>
                        <div class="flex items-center gap-3">
                            <button 
                                on:click={() => mode = 'chat'}
                                class="px-4 py-2 text-xs uppercase tracking-wider transition-all {mode === 'chat' ? 'text-lux-accent border-b-2 border-lux-accent' : 'text-lux-textSecondary hover:text-lux-accent'}"
                            >
                                Chat
                            </button>
                            <button 
                                on:click={() => mode = 'staging'}
                                class="px-4 py-2 text-xs uppercase tracking-wider transition-all {mode === 'staging' ? 'text-lux-accent border-b-2 border-lux-accent' : 'text-lux-textSecondary hover:text-lux-accent'}"
                            >
                                Staging
                            </button>
                            <button 
                                on:click={() => mode = 'investment'}
                                class="px-4 py-2 text-xs uppercase tracking-wider transition-all {mode === 'investment' ? 'text-lux-accent border-b-2 border-lux-accent' : 'text-lux-textSecondary hover:text-lux-accent'}"
                            >
                                Investment
                            </button>
                            <button 
                                on:click={() => mode = 'schedule'}
                                class="px-4 py-2 text-xs uppercase tracking-wider transition-all {mode === 'schedule' ? 'text-lux-accent border-b-2 border-lux-accent' : 'text-lux-textSecondary hover:text-lux-accent'}"
                            >
                                Schedule
                            </button>
                            <button 
                                on:click={toggle} 
                                class="ml-4 text-2xl text-lux-textSecondary hover:text-lux-accent transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="relative h-[60vh] overflow-hidden">
                    {#if mode === 'chat'}
                        <!-- Chat Mode -->
                        <div class="h-full flex flex-col">
                            <div class="flex-1 p-6 overflow-y-auto space-y-4">
                                {#each messages as msg}
                                    <div class={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div class={`max-w-[70%] p-4 rounded-lg text-sm leading-relaxed whitespace-pre-line ${
                                            msg.role === 'user' 
                                            ? 'bg-lux-accent/20 text-lux-textPrimary border border-lux-accent/30' 
                                            : 'bg-lux-glass text-lux-textSecondary border border-lux-divider'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                {/each}
                                {#if isTyping}
                                    <div class="flex justify-start">
                                        <div class="bg-lux-glass border border-lux-divider px-4 py-3 rounded-lg flex space-x-2">
                                            <div class="w-2 h-2 bg-lux-accent/50 rounded-full animate-bounce"></div>
                                            <div class="w-2 h-2 bg-lux-accent/50 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                                            <div class="w-2 h-2 bg-lux-accent/50 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                            
                            <!-- Quick Commands -->
                            {#if messages.length <= 1}
                                <div class="px-6 pb-4">
                                    <p class="text-xs text-lux-textSecondary mb-2">Quick commands:</p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each quickCommands as command}
                                            <button
                                                on:click|stopPropagation={() => { input = command; send(); }}
                                                type="button"
                                                class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                            >
                                                {command.length > 35 ? command.substring(0, 35) + '...' : command}
                                            </button>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {:else if mode === 'staging'}
                        <!-- Staging Mode -->
                        {#if selectedProperty}
                        <div class="h-full flex">
                            <div class="flex-1 relative overflow-hidden">
                                <div class="absolute inset-0">
                                    <img 
                                        src={selectedProperty.images[currentImageIndex]} 
                                        alt={selectedProperty.title}
                                        class="w-full h-full object-cover transition-all duration-1000"
                                        class:blur-sm={isTransitioning}
                                        class:scale-110={isTransitioning}
                                    />
                                    {#if isTransitioning}
                                        <div 
                                            in:fly={{ x: -1000, duration: 800 }}
                                            out:fly={{ x: 1000, duration: 800 }}
                                            class="absolute inset-0 bg-gradient-to-r from-lux-accent/30 via-lux-accent/10 to-transparent"
                                        ></div>
                                    {/if}
                                </div>
                                <div class="absolute top-4 left-4 bg-lux-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-lux-divider">
                                    <p class="text-sm text-lux-accent font-heading">{selectedProperty.title}</p>
                                    <p class="text-xs text-lux-textSecondary">Current Style: {currentStyle}</p>
                                </div>
                                <button
                                    on:click={() => selectedProperty = null}
                                    class="absolute top-4 right-4 bg-lux-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-lux-divider flex items-center gap-2 text-lux-textSecondary hover:text-lux-accent hover:border-lux-accent transition-all text-sm"
                                >
                                    <span>←</span> Back
                                </button>
                            </div>
                            <div class="w-80 p-6 bg-lux-surface/80 border-l border-lux-divider overflow-y-auto">
                                <button
                                    on:click={() => selectedProperty = null}
                                    class="flex items-center gap-2 text-lux-textSecondary hover:text-lux-accent transition-colors mb-4 text-sm"
                                >
                                    <span>←</span> Back to Overview
                                </button>
                                <h3 class="text-lg font-heading text-lux-accent mb-4">Staging Styles</h3>
                                <div class="space-y-2">
                                    {#each selectedProperty.stagingStyles || [] as style}
                                        <button
                                            on:click={() => changeStyle(style)}
                                            disabled={isTransitioning}
                                            class="w-full text-left p-3 rounded-lg border transition-all {
                                                currentStyle === style 
                                                ? 'border-lux-accent bg-lux-accent/10 text-lux-accent' 
                                                : 'border-lux-divider bg-lux-glass text-lux-textSecondary hover:border-lux-accent/50 hover:text-lux-accent'
                                            }"
                                        >
                                            {style}
                                        </button>
                                    {/each}
                                </div>
                                <div class="mt-6 p-4 bg-lux-glass rounded-lg border border-lux-divider">
                                    <p class="text-xs text-lux-textSecondary leading-relaxed">
                                        💡 <strong>Pro Tip:</strong> Staging visualization helps potential buyers envision their dream lifestyle. Our AI can generate realistic style transformations.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {:else}
                        <!-- Default Staging View -->
                        <div class="h-full p-8 overflow-y-auto">
                            <div class="max-w-4xl mx-auto">
                                <div class="text-center mb-12">
                                    <div class="inline-flex items-center justify-center w-20 h-20 bg-lux-accent/10 rounded-full mb-6">
                                        <span class="text-4xl">🎨</span>
                                    </div>
                                    <h3 class="text-3xl font-heading text-lux-accent mb-4">Virtual Staging Studio</h3>
                                    <p class="text-lux-textSecondary leading-relaxed max-w-2xl mx-auto">
                                        Experience our AI-powered visualization platform. Transform any property into your dream style with cinematic transitions and photorealistic rendering.
                                    </p>
                                </div>

                                <div class="grid md:grid-cols-2 gap-6 mb-8">
                                    <div class="bg-lux-surface border border-lux-divider p-6 hover:border-lux-accent/50 transition-all">
                                        <h4 class="text-lg font-heading text-lux-accent mb-3">Available Styles</h4>
                                        <div class="grid grid-cols-2 gap-2 text-sm text-lux-textSecondary">
                                            <div>• Modern Minimalist</div>
                                            <div>• Mid-Century Modern</div>
                                            <div>• Coastal Luxury</div>
                                            <div>• Contemporary Chic</div>
                                            <div>• Ultra Modern</div>
                                            <div>• Scandinavian Luxury</div>
                                            <div>• Art Deco</div>
                                            <div>• Industrial Chic</div>
                                        </div>
                                    </div>

                                    <div class="bg-lux-surface border border-lux-divider p-6 hover:border-lux-accent/50 transition-all">
                                        <h4 class="text-lg font-heading text-lux-accent mb-3">Features</h4>
                                        <ul class="space-y-2 text-sm text-lux-textSecondary">
                                            <li>✓ Photorealistic rendering</li>
                                            <li>✓ Multiple style options per property</li>
                                            <li>✓ Instant cinematic transitions</li>
                                            <li>✓ High-resolution exports</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="bg-gradient-to-br from-lux-accent/10 to-transparent border-l-4 border-lux-accent p-6">
                                    <h4 class="text-lg font-heading text-lux-accent mb-3">How to Get Started</h4>
                                    <p class="text-sm text-lux-textSecondary mb-4">
                                        Use the chat to request staging visualization for any property:
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                        <button
                                            on:click|stopPropagation={() => { mode = 'chat'; input = "Show me Palm Majestic in Mid-Century Modern style"; setTimeout(() => send(), 50); }}
                                            type="button"
                                            class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                        >
                                            Show me Palm Majestic in Mid-Century Modern
                                        </button>
                                        <button
                                            on:click|stopPropagation={() => { mode = 'chat'; input = "Visualize Skyline Penthouse in Ultra Modern"; setTimeout(() => send(), 50); }}
                                            type="button"
                                            class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                        >
                                            Visualize Skyline Penthouse in Ultra Modern
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/if}
                    {:else if mode === 'investment'}
                        <!-- Investment Mode -->
                        {#if selectedInvestmentProperty}
                        <div class="h-full p-8 overflow-y-auto">
                            <div class="max-w-4xl mx-auto">
                                <button
                                    on:click={() => selectedInvestmentProperty = null}
                                    class="flex items-center gap-2 text-lux-textSecondary hover:text-lux-accent transition-colors mb-6 text-sm"
                                >
                                    <span>←</span> Back to Overview
                                </button>
                                <h3 class="text-2xl font-heading text-lux-accent mb-2">{selectedInvestmentProperty.title}</h3>
                                <p class="text-sm text-lux-textSecondary mb-8">{selectedInvestmentProperty.location}</p>
                                
                                {#if selectedInvestmentProperty.marketData}
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        <div class="p-4 bg-lux-glass rounded-lg border border-lux-divider">
                                            <p class="text-xs text-lux-textSecondary uppercase tracking-wider mb-1">Grade</p>
                                            <p class="text-2xl font-bold text-lux-accent">{selectedInvestmentProperty.marketData.investmentGrade}</p>
                                        </div>
                                        <div class="p-4 bg-lux-glass rounded-lg border border-lux-divider">
                                            <p class="text-xs text-lux-textSecondary uppercase tracking-wider mb-1">5-Year ROI</p>
                                            <p class="text-2xl font-bold text-lux-accent">{selectedInvestmentProperty.marketData.roi5Year}%</p>
                                        </div>
                                        <div class="p-4 bg-lux-glass rounded-lg border border-lux-divider">
                                            <p class="text-xs text-lux-textSecondary uppercase tracking-wider mb-1">Appreciation</p>
                                            <p class="text-2xl font-bold text-lux-accent">{selectedInvestmentProperty.marketData.appreciation}%</p>
                                        </div>
                                        <div class="p-4 bg-lux-glass rounded-lg border border-lux-divider">
                                            <p class="text-xs text-lux-textSecondary uppercase tracking-wider mb-1">Rental Yield</p>
                                            <p class="text-2xl font-bold text-lux-accent">{selectedInvestmentProperty.marketData.rentalYield}%</p>
                                        </div>
                                    </div>

                                    <div class="bg-lux-glass rounded-lg border border-lux-divider p-6">
                                        <h4 class="text-lg font-heading text-lux-accent mb-4">5-Year Value Projection</h4>
                                        <div bind:this={chartContainer} class="flex justify-around items-end h-64"></div>
                                    </div>

                                    <div class="mt-6 p-4 bg-lux-surface/80 rounded-lg border border-lux-accent/30">
                                        <p class="text-sm text-lux-textSecondary leading-relaxed">
                                            📊 <strong>Analysis:</strong> Based on current market trends, historical data, and area development plans. 
                                            This property has a demand score of <span class="text-lux-accent font-bold">{selectedInvestmentProperty.marketData.demandScore}/100</span>, 
                                            placing it in the top tier of investment opportunities in {selectedInvestmentProperty.location}.
                                        </p>
                                    </div>
                                {/if}
                            </div>
                        </div>
                        {:else}
                        <!-- Default Investment View -->
                        <div class="h-full p-8 overflow-y-auto">
                            <div class="max-w-4xl mx-auto">
                                <div class="text-center mb-12">
                                    <div class="inline-flex items-center justify-center w-20 h-20 bg-lux-accent/10 rounded-full mb-6">
                                        <span class="text-4xl">📊</span>
                                    </div>
                                    <h3 class="text-3xl font-heading text-lux-accent mb-4">Investment Intelligence</h3>
                                    <p class="text-lux-textSecondary leading-relaxed max-w-2xl mx-auto">
                                        Make informed decisions with our comprehensive market analytics, ROI projections, and demand forecasting powered by real-time data.
                                    </p>
                                </div>

                                <!-- Portfolio Overview -->
                                <div class="grid md:grid-cols-4 gap-4 mb-8">
                                    <div class="bg-lux-surface border border-lux-divider p-6 text-center hover:border-lux-accent/50 transition-all">
                                        <p class="text-3xl font-heading text-lux-accent mb-2">15</p>
                                        <p class="text-xs uppercase tracking-wider text-lux-textSecondary">Properties</p>
                                    </div>
                                    <div class="bg-lux-surface border border-lux-divider p-6 text-center hover:border-lux-accent/50 transition-all">
                                        <p class="text-3xl font-heading text-lux-accent mb-2">72.4%</p>
                                        <p class="text-xs uppercase tracking-wider text-lux-textSecondary">Avg 5-Yr ROI</p>
                                    </div>
                                    <div class="bg-lux-surface border border-lux-divider p-6 text-center hover:border-lux-accent/50 transition-all">
                                        <p class="text-3xl font-heading text-lux-accent mb-2">A+</p>
                                        <p class="text-xs uppercase tracking-wider text-lux-textSecondary">Top Grade</p>
                                    </div>
                                    <div class="bg-lux-surface border border-lux-divider p-6 text-center hover:border-lux-accent/50 transition-all">
                                        <p class="text-3xl font-heading text-lux-accent mb-2">94.2</p>
                                        <p class="text-xs uppercase tracking-wider text-lux-textSecondary">Avg Demand</p>
                                    </div>
                                </div>

                                <!-- Investment Insights -->
                                <div class="space-y-6">
                                    <div class="bg-lux-surface border border-lux-divider p-6">
                                        <h4 class="text-lg font-heading text-lux-accent mb-4 flex items-center gap-2">
                                            <span>🏆</span> Top Performers
                                        </h4>
                                        <div class="space-y-3">
                                            <div class="flex justify-between items-center p-3 bg-lux-glass rounded">
                                                <div>
                                                    <p class="text-sm text-lux-textPrimary font-medium">The Grand Legacy</p>
                                                    <p class="text-xs text-lux-textSecondary">Emirates Hills • Estate</p>
                                                </div>
                                                <div class="text-right">
                                                    <p class="text-sm font-heading text-lux-accent">101.2% ROI</p>
                                                    <p class="text-xs text-lux-textSecondary">Grade A+</p>
                                                </div>
                                            </div>
                                            <div class="flex justify-between items-center p-3 bg-lux-glass rounded">
                                                <div>
                                                    <p class="text-sm text-lux-textPrimary font-medium">The Residences at One</p>
                                                    <p class="text-xs text-lux-textSecondary">Dubai Marina • Penthouse</p>
                                                </div>
                                                <div class="text-right">
                                                    <p class="text-sm font-heading text-lux-accent">96.3% ROI</p>
                                                    <p class="text-xs text-lux-textSecondary">Grade A+</p>
                                                </div>
                                            </div>
                                            <div class="flex justify-between items-center p-3 bg-lux-glass rounded">
                                                <div>
                                                    <p class="text-sm text-lux-textPrimary font-medium">Pearl Marina Estate</p>
                                                    <p class="text-xs text-lux-textSecondary">Dubai Marina • Waterfront</p>
                                                </div>
                                                <div class="text-right">
                                                    <p class="text-sm font-heading text-lux-accent">95.8% ROI</p>
                                                    <p class="text-xs text-lux-textSecondary">Grade A+</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid md:grid-cols-2 gap-6">
                                        <div class="bg-lux-surface border border-lux-divider p-6">
                                            <h4 class="text-lg font-heading text-lux-accent mb-4 flex items-center gap-2">
                                                <span>📈</span> Market Trends
                                            </h4>
                                            <ul class="space-y-3 text-sm text-lux-textSecondary">
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">•</span>
                                                    <span>Dubai luxury real estate up 12.3% YoY</span>
                                                </li>
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">•</span>
                                                    <span>Waterfront properties show highest demand</span>
                                                </li>
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">•</span>
                                                    <span>Penthouses averaging 11.9% appreciation</span>
                                                </li>
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">•</span>
                                                    <span>Strong rental yields in villa segment</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="bg-lux-surface border border-lux-divider p-6">
                                            <h4 class="text-lg font-heading text-lux-accent mb-4 flex items-center gap-2">
                                                <span>💡</span> Investment Tips
                                            </h4>
                                            <ul class="space-y-3 text-sm text-lux-textSecondary">
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">✓</span>
                                                    <span>Diversify across property types</span>
                                                </li>
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">✓</span>
                                                    <span>Focus on A+ grade locations</span>
                                                </li>
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">✓</span>
                                                    <span>Consider 5-year minimum hold period</span>
                                                </li>
                                                <li class="flex items-start gap-2">
                                                    <span class="text-lux-accent">✓</span>
                                                    <span>Balance appreciation with rental yield</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="bg-gradient-to-br from-lux-accent/10 to-transparent border-l-4 border-lux-accent p-6">
                                        <h4 class="text-lg font-heading text-lux-accent mb-3">Get Detailed Analysis</h4>
                                        <p class="text-sm text-lux-textSecondary mb-4">
                                            Request comprehensive investment analysis for any property in our portfolio:
                                        </p>
                                        <div class="flex flex-wrap gap-2">
                                            <button
                                                on:click|stopPropagation={() => { mode = 'chat'; input = "What's the ROI for Skyline Penthouse?"; setTimeout(() => send(), 50); }}
                                                type="button"
                                                class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                            >
                                                What's the ROI for Skyline Penthouse?
                                            </button>
                                            <button
                                                on:click|stopPropagation={() => { mode = 'chat'; input = "Investment analysis for Pearl Marina Estate"; setTimeout(() => send(), 50); }}
                                                type="button"
                                                class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                            >
                                                Investment analysis for Pearl Marina Estate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/if}
                    {:else if mode === 'schedule'}
                        <!-- Schedule Mode -->
                        {#if scheduleSuccess}
                        <div class="h-full flex items-center justify-center p-8">
                            <div class="max-w-2xl text-center">
                                <div class="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 rounded-full mb-6">
                                    <span class="text-6xl">✅</span>
                                </div>
                                <h3 class="text-3xl font-heading text-lux-accent mb-4">Viewing Scheduled!</h3>
                                <p class="text-lux-textSecondary leading-relaxed mb-8">
                                    Your private viewing for <strong class="text-lux-accent">{scheduleProperty?.title}</strong> has been confirmed.
                                </p>
                                <div class="bg-lux-glass border border-lux-divider rounded-lg p-6 mb-8 text-left">
                                    <div class="space-y-3 text-sm">
                                        <div class="flex items-start gap-3">
                                            <span class="text-lux-accent">📅</span>
                                            <div>
                                                <p class="text-lux-textSecondary">Date & Time</p>
                                                <p class="text-lux-textPrimary font-medium">{scheduleForm.date} at {scheduleForm.time}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <span class="text-lux-accent">📍</span>
                                            <div>
                                                <p class="text-lux-textSecondary">Location</p>
                                                <p class="text-lux-textPrimary font-medium">{scheduleProperty?.location}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <span class="text-lux-accent">✉️</span>
                                            <div>
                                                <p class="text-lux-textSecondary">Confirmation sent to</p>
                                                <p class="text-lux-textPrimary font-medium">{scheduleForm.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    on:click={() => { scheduleSuccess = false; scheduleProperty = null; mode = 'chat'; }}
                                    class="px-8 py-3 bg-lux-accent text-lux-background rounded-lg font-medium uppercase tracking-wider hover:bg-lux-accent/90 transition-all"
                                >
                                    Schedule Another Viewing
                                </button>
                            </div>
                        </div>
                        {:else}
                        <div class="h-full p-8 overflow-y-auto">
                            <div class="max-w-3xl mx-auto">
                                {#if scheduleProperty}
                                    <!-- Property Selected - Show Form -->
                                    <button
                                        on:click={() => scheduleProperty = null}
                                        class="flex items-center gap-2 text-lux-textSecondary hover:text-lux-accent transition-colors mb-6 text-sm"
                                    >
                                        <span>←</span> Choose Different Property
                                    </button>
                                    
                                    <div class="bg-lux-glass border border-lux-divider rounded-lg p-6 mb-6">
                                        <div class="flex gap-4">
                                            <img src={scheduleProperty.images[0]} alt={scheduleProperty.title} class="w-32 h-32 object-cover rounded-lg" />
                                            <div class="flex-1">
                                                <h3 class="text-xl font-heading text-lux-accent mb-2">{scheduleProperty.title}</h3>
                                                <p class="text-sm text-lux-textSecondary mb-2">{scheduleProperty.location}</p>
                                                <p class="text-lg text-lux-textPrimary font-medium">${(scheduleProperty.price / 1000000).toFixed(1)}M</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 class="text-2xl font-heading text-lux-accent mb-6">Schedule Your Private Viewing</h3>
                                    
                                    <form on:submit|preventDefault={submitSchedule} class="space-y-4">
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="schedule-name" class="block text-sm text-lux-textSecondary mb-2">Full Name *</label>
                                                <input 
                                                    id="schedule-name"
                                                    type="text" 
                                                    bind:value={scheduleForm.name}
                                                    required
                                                    class="w-full bg-lux-glass border border-lux-divider rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-lux-accent focus:border-lux-accent text-lux-textPrimary"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label for="schedule-email" class="block text-sm text-lux-textSecondary mb-2">Email Address *</label>
                                                <input 
                                                    id="schedule-email"
                                                    type="email" 
                                                    bind:value={scheduleForm.email}
                                                    required
                                                    class="w-full bg-lux-glass border border-lux-divider rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-lux-accent focus:border-lux-accent text-lux-textPrimary"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="schedule-phone" class="block text-sm text-lux-textSecondary mb-2">Phone Number *</label>
                                                <input 
                                                    id="schedule-phone"
                                                    type="tel" 
                                                    bind:value={scheduleForm.phone}
                                                    required
                                                    class="w-full bg-lux-glass border border-lux-divider rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-lux-accent focus:border-lux-accent text-lux-textPrimary"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            <div class="relative">
                                                <label for="schedule-date" class="block text-sm text-lux-textSecondary mb-2">Preferred Date *</label>
                                                <button
                                                    type="button"
                                                    on:click={() => showCalendar = !showCalendar}
                                                    class="w-full bg-lux-glass border border-lux-divider rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-lux-accent focus:border-lux-accent text-lux-textPrimary text-left flex items-center justify-between"
                                                >
                                                    <span>{scheduleForm.date ? new Date(scheduleForm.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'Select a date'}</span>
                                                    <span>📅</span>
                                                </button>
                                                {#if showCalendar}
                                                    <div class="absolute z-50 mt-2 bg-lux-surface border border-lux-accent/30 rounded-lg shadow-2xl p-4 w-full max-w-sm">
                                                        <!-- Calendar Header -->
                                                        <div class="flex items-center justify-between mb-4">
                                                            <button
                                                                type="button"
                                                                on:click={previousMonth}
                                                                class="p-2 hover:bg-lux-glass rounded transition-colors"
                                                            >
                                                                <span class="text-lux-accent">←</span>
                                                            </button>
                                                            <div class="text-center">
                                                                <div class="font-heading text-lux-accent">{monthNames[selectedMonth]} {selectedYear}</div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                on:click={nextMonth}
                                                                class="p-2 hover:bg-lux-glass rounded transition-colors"
                                                            >
                                                                <span class="text-lux-accent">→</span>
                                                            </button>
                                                        </div>
                                                        <!-- Day Names -->
                                                        <div class="grid grid-cols-7 gap-1 mb-2">
                                                            {#each dayNames as day}
                                                                <div class="text-center text-xs text-lux-textSecondary font-medium py-1">{day}</div>
                                                            {/each}
                                                        </div>
                                                        <!-- Calendar Days -->
                                                        <div class="grid grid-cols-7 gap-1">
                                                            {#each getCalendarDays() as day}
                                                                {#if day}
                                                                    <button
                                                                        type="button"
                                                                        on:click={() => selectDate(day)}
                                                                        disabled={isDatePast(day)}
                                                                        class="aspect-square flex items-center justify-center text-sm rounded transition-all {
                                                                            isDateSelected(day) 
                                                                                ? 'bg-lux-accent text-lux-background font-bold' 
                                                                                : isDatePast(day)
                                                                                    ? 'text-lux-textSecondary/30 cursor-not-allowed'
                                                                                    : 'text-lux-textPrimary hover:bg-lux-glass hover:text-lux-accent'
                                                                        }"
                                                                    >
                                                                        {day}
                                                                    </button>
                                                                {:else}
                                                                    <div class="aspect-square"></div>
                                                                {/if}
                                                            {/each}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            on:click={() => showCalendar = false}
                                                            class="w-full mt-4 py-2 text-xs text-lux-textSecondary hover:text-lux-accent transition-colors"
                                                        >
                                                            Close Calendar
                                                        </button>
                                                    </div>
                                                {/if}
                                            </div>
                                        </div>

                                        <div>
                                            <label for="schedule-time" class="block text-sm text-lux-textSecondary mb-2">Preferred Time *</label>
                                            <select 
                                                id="schedule-time"
                                                bind:value={scheduleForm.time}
                                                required
                                                class="w-full bg-lux-glass border border-lux-divider rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-lux-accent focus:border-lux-accent text-lux-textPrimary"
                                            >
                                                <option value="">Select a time</option>
                                                <option value="09:00 AM">09:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                                <option value="12:00 PM">12:00 PM</option>
                                                <option value="01:00 PM">01:00 PM</option>
                                                <option value="02:00 PM">02:00 PM</option>
                                                <option value="03:00 PM">03:00 PM</option>
                                                <option value="04:00 PM">04:00 PM</option>
                                                <option value="05:00 PM">05:00 PM</option>
                                                <option value="06:00 PM">06:00 PM</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label for="schedule-message" class="block text-sm text-lux-textSecondary mb-2">Additional Message (Optional)</label>
                                            <textarea 
                                                id="schedule-message"
                                                bind:value={scheduleForm.message}
                                                rows="4"
                                                class="w-full bg-lux-glass border border-lux-divider rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-lux-accent focus:border-lux-accent text-lux-textPrimary resize-none"
                                                placeholder="Any special requests or questions?"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            class="w-full px-8 py-4 bg-lux-accent text-lux-background rounded-lg font-bold uppercase tracking-wider hover:bg-lux-accent/90 transition-all"
                                        >
                                            Confirm Viewing
                                        </button>
                                    </form>

                                    <div class="mt-6 p-4 bg-lux-glass/50 rounded-lg border border-lux-divider">
                                        <p class="text-xs text-lux-textSecondary leading-relaxed">
                                            💡 <strong>Note:</strong> Our concierge team will contact you within 24 hours to confirm your viewing. Private viewings include complimentary refreshments and detailed property documentation.
                                        </p>
                                    </div>

                                    {#if voiceSupported}
                                        <div class="mt-4 p-4 bg-lux-accent/5 rounded-lg border border-lux-accent/20">
                                            <div class="flex items-center gap-2 mb-2">
                                                <span class="text-lg">🎤</span>
                                                <p class="text-sm font-heading text-lux-accent">Voice Booking Available</p>
                                            </div>
                                            <p class="text-xs text-lux-textSecondary leading-relaxed">
                                                Click the microphone button below and say commands like:
                                            </p>
                                            <ul class="mt-2 space-y-1 text-xs text-lux-textSecondary">
                                                <li>• "Schedule viewing for {scheduleProperty.title}"</li>
                                                <li>• "Book a tour next Tuesday at 2pm"</li>
                                                <li>• "I want to visit this property"</li>
                                            </ul>
                                        </div>
                                    {/if}
                                {:else}
                                    <!-- No Property Selected - Show Property List -->
                                    <div class="text-center mb-8">
                                        <div class="inline-flex items-center justify-center w-20 h-20 bg-lux-accent/10 rounded-full mb-6">
                                            <span class="text-4xl">📅</span>
                                        </div>
                                        <h3 class="text-3xl font-heading text-lux-accent mb-4">Schedule a Private Viewing</h3>
                                        <p class="text-lux-textSecondary leading-relaxed">
                                            Select a property below to schedule your exclusive tour with our concierge team.
                                        </p>
                                        {#if voiceSupported}
                                            <div class="mt-6 inline-block text-left bg-lux-accent/5 border border-lux-accent/20 rounded-lg p-4 max-w-md">
                                                <div class="flex items-center gap-2 mb-3">
                                                    <span class="text-2xl">🎤</span>
                                                    <p class="text-sm font-heading text-lux-accent">Use Voice to Book</p>
                                                </div>
                                                <p class="text-xs text-lux-textSecondary mb-3">
                                                    Click any example below or use the 🎤 microphone:
                                                </p>
                                                <div class="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        on:click={() => {
                                                            const property = properties.find(p => p.title === 'Skyline Penthouse');
                                                            if (property) openScheduling(property);
                                                        }}
                                                        class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                                    >
                                                        Schedule viewing for Skyline Penthouse
                                                    </button>
                                                    <button
                                                        type="button"
                                                        on:click={() => {
                                                            const property = properties.find(p => p.title === 'Pearl Marina Estate');
                                                            if (property) openScheduling(property);
                                                        }}
                                                        class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                                    >
                                                        Book tour of Pearl Marina Estate
                                                    </button>
                                                    <button
                                                        type="button"
                                                        on:click={() => {
                                                            const property = properties.find(p => p.title === 'The Grand Legacy');
                                                            if (property) openScheduling(property);
                                                        }}
                                                        class="text-xs px-3 py-1.5 bg-lux-glass border border-lux-divider rounded-full text-lux-accent hover:bg-lux-accent/10 hover:border-lux-accent transition-all"
                                                    >
                                                        Visit The Grand Legacy
                                                    </button>
                                                </div>
                                            </div>
                                        {/if}
                                    </div>

                                    <div class="grid md:grid-cols-2 gap-4">
                                        {#each properties as property}
                                            <button
                                                on:click={() => scheduleProperty = property}
                                                class="text-left bg-lux-glass border border-lux-divider rounded-lg overflow-hidden hover:border-lux-accent transition-all group"
                                            >
                                                <div class="aspect-video w-full overflow-hidden">
                                                    <img 
                                                        src={property.images[0]} 
                                                        alt={property.title}
                                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div class="p-4">
                                                    <h4 class="text-lg font-heading text-lux-accent mb-1 group-hover:text-lux-accent/80 transition-colors">{property.title}</h4>
                                                    <p class="text-xs text-lux-textSecondary mb-2">{property.location}</p>
                                                    <p class="text-sm text-lux-textPrimary font-medium">${(property.price / 1000000).toFixed(1)}M</p>
                                                </div>
                                            </button>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                        {/if}
                    {/if}
                </div>

                <!-- Input Area -->
                <div class="p-4 border-t border-lux-divider bg-lux-surface/95">
                    <form on:submit|preventDefault={send} class="flex items-center gap-3">
                        <input 
                            type="text" 
                            bind:value={input}
                            placeholder="{isListening ? 'Listening... say \'schedule viewing for Skyline Penthouse\'' : 'Type or use voice... e.g., \'Schedule viewing for Pearl Marina\''}" 
                            class="flex-1 bg-lux-glass border border-lux-divider rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-lux-accent focus:border-lux-accent text-lux-textPrimary placeholder-lux-textSecondary/50"
                        />
                        <button
                            type="submit"
                            class="px-6 py-3 bg-lux-accent text-lux-background rounded-lg font-medium text-sm uppercase tracking-wider hover:bg-lux-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!input.trim()}
                        >
                            Send
                        </button>
                        {#if voiceSupported}
                            <div class="relative">
                                <button
                                    type="button"
                                    on:click={toggleVoice}
                                    title="Voice booking: Say 'schedule viewing for [property name]'"
                                    class="relative px-4 py-3 rounded-lg border transition-all {
                                        isListening 
                                        ? 'border-lux-accent bg-lux-accent/20 text-lux-accent' 
                                        : 'border-lux-divider bg-lux-glass text-lux-textSecondary hover:border-lux-accent hover:text-lux-accent'
                                    }"
                                >
                                    🎤
                                    {#if isListening}
                                        <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                                    {/if}
                                </button>
                                {#if !isListening}
                                    <div class="absolute -top-8 right-0 bg-lux-surface/95 backdrop-blur-sm px-2 py-1 rounded text-xs text-lux-accent whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                        🎤 Voice booking available
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </form>
                    <p class="text-xs text-lux-textSecondary/70 mt-2 text-center">
                        💡 Voice Tip: Click 🎤 and say "Schedule viewing for [property]" or "Go back" to navigate
                    </p>
                </div>
            </div>
        </div>
    {/if}

    <!-- Floating Aura Orb -->
    <button 
        on:click={toggle}
        class="pointer-events-auto absolute bottom-8 right-8 group"
    >
        <div class="relative w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-lux-accent to-lux-accent/70 shadow-[0_0_60px_rgba(198,169,107,0.4)] transition-all hover:scale-110 hover:shadow-[0_0_100px_rgba(198,169,107,0.6)]">
            <div class="absolute inset-0 rounded-full border-2 border-lux-accent/40 animate-ping"></div>
            <div class="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <span class="text-2xl relative z-10">✨</span>
        </div>
        <div class="absolute -top-12 right-0 bg-lux-surface/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-lux-divider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p class="text-xs text-lux-accent font-medium">Chat with Aura</p>
        </div>
    </button>
</div>
