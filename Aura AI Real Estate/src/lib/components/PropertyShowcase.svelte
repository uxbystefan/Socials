<script lang="ts">
    import { viewport } from '$lib/animation';
    import type { Property } from '$lib/data';

    export let property: Property;
    export let index: number;

    let visible = false;

    function handleEnter() {
        visible = true;
    }
</script>

<section 
    use:viewport 
    on:enter={handleEnter}
    class="min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden bg-lux-background"
>
    <!-- Image Side -->
    <div class="w-full md:w-1/2 relative overflow-hidden h-[60vh] md:h-auto {index % 2 !== 0 ? 'md:order-2' : ''}">
        <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out-expo"
            style="background-image: url('{property.images[0]}'); transform: scale({visible ? 1.05 : 1.15});"
        ></div>
        <div class="absolute inset-0 bg-black/20"></div>
    </div>

    <!-- Content Side -->
    <div class="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center relative {index % 2 !== 0 ? 'md:order-1' : ''}">
        <div 
            class="flex flex-col gap-6 transition-all duration-1000 delay-300"
            style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 30}px);"
        >
            <div class="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-lux-accent uppercase">
                <span>{property.category}</span>
                <span class="w-8 h-[1px] bg-lux-divider"></span>
                <span>{property.location}</span>
            </div>

            <h2 class="text-4xl md:text-6xl font-heading text-lux-textPrimary leading-tight">
                {property.title}
            </h2>

            <p class="text-lux-textSecondary leading-relaxed text-lg max-w-md">
                {property.description}
            </p>

            <div class="grid grid-cols-3 gap-8 py-8 border-y border-lux-divider/50 max-w-md">
                <div>
                    <span class="block text-2xl font-heading text-white">{property.specs.beds}</span>
                    <span class="text-xs uppercase tracking-wider text-lux-textSecondary">Beds</span>
                </div>
                <div>
                    <span class="block text-2xl font-heading text-white">{property.specs.baths}</span>
                    <span class="text-xs uppercase tracking-wider text-lux-textSecondary">Baths</span>
                </div>
                <div>
                    <span class="block text-2xl font-heading text-white">{(property.specs.sqft).toLocaleString()}</span>
                    <span class="text-xs uppercase tracking-wider text-lux-textSecondary">Sq.Ft</span>
                </div>
            </div>

            <div class="flex items-center justify-between max-w-md mt-4">
                <span class="text-2xl font-heading text-lux-textPrimary">${(property.price / 1000000).toFixed(1)}M</span>
                
                <a 
                    href="/property/{property.id}"
                    class="group flex items-center gap-4 text-sm uppercase tracking-widest text-white hover:text-lux-accent transition-colors"
                >
                    View Details
                    <span class="w-8 h-[1px] bg-white group-hover:bg-lux-accent transition-colors"></span>
                </a>
            </div>
        </div>
    </div>
</section>
