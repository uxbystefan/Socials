<script lang="ts">
    import { fade } from 'svelte/transition';
    
    // Using high quality generic luxury images for backgrounds
    const items = [
        { id: 'pool', label: 'Infinity Pool', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop' },
        { id: 'studio', label: 'Fitness Studio', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop' },
        { id: 'lobby', label: 'Grand Lobby', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop' },
        { id: 'smart', label: 'Smart Home', image: 'https://onikomiddleeast.com/wp-content/uploads/2025/05/modern-living-room-interior-with-large-tv-screen-displaying-home-automation-system-scaled.jpg' },
        { id: 'roof', label: 'Rooftop Garden', image: 'https://media.architecturaldigest.com/photos/56f99e6b68aa959e79f3527f/master/pass/living-roofs-rooftop-gardens-book-02.jpg' },
    ];

    let activeIndex = 0;
    let scrolling = false;

    function handleScroll(e: WheelEvent) {
        if (scrolling) return;
        
        // Only capture scroll if we are in view (naive check, usually would use observer)
        // Here we just let it happen.
        
        scrolling = true;
        
        if (e.deltaY > 0) {
            activeIndex = (activeIndex + 1) % items.length;
        } else {
            activeIndex = (activeIndex - 1 + items.length) % items.length;
        }

        setTimeout(() => scrolling = false, 800); // Cooldown
    }

    // Auto rotate every 5s if no interaction? Maybe too distracting.
    // Let's stick to user interaction + auto slide initially.
</script>

<svelte:window on:wheel|passive={handleScroll} />

<section class="relative w-full h-screen overflow-hidden text-lux-textPrimary">
    <!-- Background Image -->
    {#key activeIndex}
    <div 
        transition:fade={{ duration: 1200 }}
        class="absolute inset-0 w-full h-full bg-cover bg-center"
        style="background-image: url('{items[activeIndex].image}');"
    >
        <div class="absolute inset-0 bg-black/40"></div>
    </div>
    {/key}

    <!-- Content Center -->
    <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
        <!-- Glass Panel -->
        <div class="relative w-[340px] md:w-[480px] h-[500px] bg-lux-glass backdrop-blur-md border border-lux-divider rounded-2xl p-10 flex flex-col justify-center items-center overflow-hidden">
            
            <!-- List -->
            <div class="flex flex-col gap-6 text-center">
                {#each items as item, i}
                    <button 
                        on:click={() => activeIndex = i}
                        class="text-3xl font-heading transition-all duration-700 ease-in-out
                        {activeIndex === i 
                            ? 'scale-110 text-lux-accent opacity-100' 
                            : 'scale-90 text-lux-textSecondary opacity-40 hover:opacity-70'}"
                    >
                        {item.label}
                    </button>
                    <!-- Small indicator if needed -->
                {/each}
            </div>
            
            <div class="mt-12 flex flex-col gap-3 w-full">
                <button class="bg-lux-accent text-lux-surface font-bold uppercase tracking-widest text-xs py-4 rounded-sm hover:bg-white transition-colors">
                    Explore Villa
                </button>
                 <a href="/properties" class="text-xs uppercase tracking-widest border border-lux-divider py-3 text-center rounded-sm hover:border-lux-accent transition-colors">
                    View All Projects
                </a>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span class="text-[10px] uppercase tracking-widest text-lux-textSecondary">Scroll</span>
        <div class="w-[1px] h-12 bg-gradient-to-b from-lux-accent to-transparent"></div>
    </div>
</section>
