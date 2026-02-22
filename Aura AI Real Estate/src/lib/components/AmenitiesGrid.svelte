<script lang="ts">
    const amenities = [
        { icon: '🎬', title: 'Private Cinema', desc: '4K Dolby Atmos screening rooms for immersive entertainment.' },
        { icon: '🍷', title: 'Wine Cellar', desc: 'Temperature controlled storage for your finest vintage collection.' },
        { icon: '🧖‍♀️', title: 'Luxury Spa', desc: 'Private hammam, sauna, and massage rooms for ultimate relaxation.' },
        { icon: '⚓', title: 'Marina Access', desc: 'Direct access for yachts up to 100ft with private concierge.' },
        { icon: '🛡️', title: 'Smart Security', desc: '24/7 biometric access control and AI surveillance systems.' },
        { icon: '🏎️', title: 'Supercar Garage', desc: 'Climate controlled display garage with rotating platforms.' }
    ];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {#each amenities as item}
        <div class="group relative h-64 bg-lux-surface border border-lux-divider p-8 flex flex-col items-center justify-center overflow-hidden transition-colors hover:border-lux-accent/50 text-center">
            
            <!-- Default State -->
            <div class="transition-all duration-500 transform group-hover:-translate-y-4">
                <div class="text-4xl mb-4 opacity-70 group-hover:opacity-100 group-hover:text-lux-accent">{item.icon}</div>
                <h3 class="text-xl font-heading text-lux-textPrimary">{item.title}</h3>
            </div>

            <!-- Hover State -->
            <div class="absolute inset-x-0 bottom-0 p-8 pt-0 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <p class="text-sm text-lux-textSecondary leading-relaxed">{item.desc}</p>
            </div>

            <!-- Decorative Corner -->
            <div class="absolute top-2 right-2 w-2 h-2 border-t border-r border-lux-accent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
    {/each}
</div>
