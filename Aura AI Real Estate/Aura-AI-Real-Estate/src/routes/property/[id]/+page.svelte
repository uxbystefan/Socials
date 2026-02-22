<script lang="ts">
    import { fade } from 'svelte/transition';
    import AmenitiesGrid from '$lib/components/AmenitiesGrid.svelte';
    
    export let data;
    $: ({ property } = data);

    let activeImage = 0;
    
    function nextImage() {
        activeImage = (activeImage + 1) % property.images.length;
    }
    
    function prevImage() {
        activeImage = (activeImage - 1 + property.images.length) % property.images.length;
    }
</script>

<svelte:head>
    <title>{property.title} | Luxe Estate</title>
</svelte:head>

<div class="min-h-screen bg-lux-background pt-20">

    <!-- Hero Gallery -->
    <div class="relative h-[70vh] md:h-screen w-full overflow-hidden group">
        {#key activeImage}
            <div 
                class="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style="background-image: url('{property.images[activeImage]}');"
                in:fade={{duration: 700}}
            >
                <div class="absolute inset-0 bg-gradient-to-t from-lux-background via-transparent to-black/30"></div>
            </div>
        {/key}
        
        <!-- Image Navigation -->
        {#if property.images.length > 1}
            <button 
                on:click={prevImage}
                class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
                ←
            </button>
            <button 
                on:click={nextImage}
                class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
                →
            </button>
            
            <!-- Image Indicators -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {#each property.images as _, i}
                    <button
                        on:click={() => activeImage = i}
                        class="w-2 h-2 rounded-full transition-all {i === activeImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'}"
                    />
                {/each}
            </div>
        {/if}
        
        <div class="absolute bottom-0 left-0 w-full p-10 md:p-20 z-10">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row items-end justify-between gap-8">
                    <div>
                        <span class="text-lux-accent uppercase tracking-[0.3em] text-xs mb-4 block">Signature Collection</span>
                        <h1 class="text-4xl md:text-7xl font-heading text-white leading-none mb-4 drop-shadow-2xl">
                            {property.title}
                        </h1>
                        <p class="text-xl text-white/90 font-light">
                            {property.location}
                        </p>
                    </div>
                    
                    <div class="flex flex-col items-end gap-4">
                        <span class="text-3xl md:text-5xl font-heading text-white">${(property.price / 1000000).toFixed(2)}M</span>
                        {#if property.marketData}
                            <div class="flex items-center gap-2 text-sm">
                                <span class="px-3 py-1 bg-lux-accent/90 text-lux-background font-bold text-xs tracking-wider">
                                    {property.marketData.investmentGrade}
                                </span>
                                <span class="text-white/80">Investment Grade</span>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Specs Bar -->
    <div class="bg-lux-surface border-b border-lux-divider py-10 sticky top-[73px] z-40 backdrop-blur-md bg-opacity-95">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center text-lux-textPrimary">
                <div class="flex flex-col">
                    <span class="text-3xl font-heading mb-1">{property.specs.beds}</span>
                    <span class="text-xs uppercase tracking-widest text-lux-textSecondary">Bedrooms</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-3xl font-heading mb-1">{property.specs.baths}</span>
                    <span class="text-xs uppercase tracking-widest text-lux-textSecondary">Bathrooms</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-3xl font-heading mb-1">{property.specs.sqft.toLocaleString()}</span>
                    <span class="text-xs uppercase tracking-widest text-lux-textSecondary">Sq. Ft.</span>
                </div>
                {#if property.lotSize}
                    <div class="flex flex-col">
                        <span class="text-3xl font-heading mb-1">{(property.lotSize / 43560).toFixed(2)}</span>
                        <span class="text-xs uppercase tracking-widest text-lux-textSecondary">Acres</span>
                    </div>
                {/if}
                {#if property.yearBuilt}
                    <div class="flex flex-col">
                        <span class="text-3xl font-heading mb-1">{property.yearBuilt}</span>
                        <span class="text-xs uppercase tracking-widest text-lux-textSecondary">Year Built</span>
                    </div>
                {/if}
                <div class="flex flex-col">
                    <span class="text-3xl font-heading mb-1">{property.category}</span>
                    <span class="text-xs uppercase tracking-widest text-lux-textSecondary">Property Type</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-20">
        
        <!-- Description Section -->
        <div class="max-w-4xl mx-auto mb-24 text-center">
            <h2 class="text-xs uppercase tracking-[0.3em] text-lux-accent mb-6">The Property</h2>
            <p class="text-2xl md:text-3xl font-light text-lux-textPrimary leading-relaxed mb-8">
                {property.description}
            </p>
            <p class="text-lg text-lux-textSecondary leading-[2em] font-light">
                Crafted for the modern connoisseur, every inch of this residence reflects a commitment to quality and style. From the bespoke joinery to the imported marble flooring, no detail has been overlooked. The open-plan living areas flow seamlessly onto expansive terraces, blurring the lines between indoor and outdoor luxury living.
            </p>
            {#if property.architect}
                <div class="mt-8 pt-8 border-t border-lux-divider">
                    <p class="text-sm text-lux-textSecondary uppercase tracking-widest">Architecture by</p>
                    <p class="text-xl text-lux-accent mt-2">{property.architect}</p>
                </div>
            {/if}
        </div>

        <!-- Investment Data Section -->
        {#if property.marketData}
            <div class="mb-24 bg-gradient-to-br from-lux-surface to-lux-background border border-lux-divider p-12 md:p-16">
                <h2 class="text-3xl font-heading text-lux-textPrimary mb-12 text-center">Investment Overview</h2>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div class="text-center p-6 bg-lux-background/50 border border-lux-divider/50">
                        <div class="text-4xl font-heading text-lux-accent mb-2">
                            {property.marketData.appreciation}%
                        </div>
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary">Annual Appreciation</div>
                    </div>
                    
                    <div class="text-center p-6 bg-lux-background/50 border border-lux-divider/50">
                        <div class="text-4xl font-heading text-lux-accent mb-2">
                            {property.marketData.rentalYield}%
                        </div>
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary">Rental Yield</div>
                    </div>
                    
                    <div class="text-center p-6 bg-lux-background/50 border border-lux-divider/50">
                        <div class="text-4xl font-heading text-lux-accent mb-2">
                            {property.marketData.roi5Year}%
                        </div>
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary">5-Year Projected ROI</div>
                    </div>
                    
                    <div class="text-center p-6 bg-lux-background/50 border border-lux-divider/50">
                        <div class="text-4xl font-heading text-lux-accent mb-2">
                            {property.marketData.demandScore}
                        </div>
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary">Demand Score</div>
                    </div>
                </div>

                <div class="text-center">
                    <div class="inline-flex items-center gap-3 px-6 py-3 border border-lux-accent/50 bg-lux-accent/5">
                        <span class="text-xs uppercase tracking-widest text-lux-textSecondary">Investment Grade:</span>
                        <span class="text-2xl font-heading text-lux-accent">{property.marketData.investmentGrade}</span>
                    </div>
                    <p class="mt-6 text-sm text-lux-textSecondary max-w-2xl mx-auto">
                        This property represents an exceptional investment opportunity in one of Dubai's most prestigious locations. Historical data and market trends indicate strong appreciation potential and consistent demand.
                    </p>
                </div>
            </div>
        {/if}

        <!-- Features & Amenities -->
        <div class="mb-24">
            <h2 class="text-3xl font-heading text-lux-textPrimary mb-12 text-center">Amenities & Features</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {#each property.features as feature}
                    <div class="p-6 bg-lux-surface border border-lux-divider hover:border-lux-accent/50 transition-all group">
                        <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">✓</div>
                        <div class="text-sm text-lux-textPrimary">{feature}</div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Two Column Layout -->
        <div class="grid lg:grid-cols-3 gap-16 mb-24">
            <div class="lg:col-span-2">
                <!-- Gallery Grid -->
                <h3 class="text-2xl font-heading text-lux-textPrimary mb-8">Gallery</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {#each property.images as img, i}
                        <button
                            on:click={() => activeImage = i}
                            class="aspect-[4/3] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer border-2 border-transparent hover:border-lux-accent"
                            style="background-image: url('{img}');"
                        />
                    {/each}
                </div>

                <!-- Virtual Staging Info -->
                {#if property.stagingStyles && property.stagingStyles.length > 0}
                    <div class="bg-gradient-to-br from-lux-accent/10 to-transparent border-l-4 border-lux-accent p-8">
                        <h4 class="text-xl font-heading text-lux-accent mb-4">Virtual Staging Available</h4>
                        <p class="text-lux-textSecondary mb-4">
                            Experience this property in different design styles through our AI-powered virtual staging platform.
                        </p>
                        <div class="flex flex-wrap gap-2">
                            {#each property.stagingStyles as style}
                                <span class="px-3 py-1 bg-lux-surface border border-lux-divider text-xs text-lux-textPrimary">
                                    {style}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
            
            <!-- Sidebar Contact -->
            <div class="lg:col-span-1">
                <div class="bg-lux-surface border border-lux-divider p-8 sticky top-48">
                    <h3 class="text-2xl font-heading text-lux-textPrimary mb-6">Schedule Private Viewing</h3>
                    <p class="text-lux-textSecondary text-sm mb-8 leading-relaxed">
                        Experience this exceptional property firsthand. Our senior portfolio managers offer confidential, private tours by appointment only.
                    </p>
                    
                    <form on:submit|preventDefault={() => window.dispatchEvent(new CustomEvent('openScheduling', { detail: property }))} class="space-y-5 mb-8">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            class="w-full bg-lux-background border border-lux-divider p-4 text-white focus:border-lux-accent outline-none text-sm"
                        />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            class="w-full bg-lux-background border border-lux-divider p-4 text-white focus:border-lux-accent outline-none text-sm"
                        />
                        <input 
                            type="tel" 
                            placeholder="Phone Number" 
                            class="w-full bg-lux-background border border-lux-divider p-4 text-white focus:border-lux-accent outline-none text-sm"
                        />
                        <textarea 
                            placeholder="Message (optional)" 
                            rows="4"
                            class="w-full bg-lux-background border border-lux-divider p-4 text-white focus:border-lux-accent outline-none text-sm resize-none"
                        />
                        <button type="submit" class="w-full bg-lux-accent text-lux-background font-bold uppercase tracking-widest py-4 hover:bg-lux-textPrimary transition-all">
                            Request Private Tour
                        </button>
                    </form>

                    <div class="pt-6 border-t border-lux-divider space-y-4">
                        <div class="flex items-start gap-3">
                            <span class="text-lux-accent text-xl">📞</span>
                            <div>
                                <div class="text-xs text-lux-textSecondary uppercase tracking-wider mb-1">Phone</div>
                                <div class="text-lux-textPrimary">+971 4 123 4567</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-lux-accent text-xl">✉️</span>
                            <div>
                                <div class="text-xs text-lux-textSecondary uppercase tracking-wider mb-1">Email</div>
                                <div class="text-lux-textPrimary">inquiries@luxe-estate.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Property Details Table -->
        <div class="bg-lux-surface border border-lux-divider overflow-hidden">
            <div class="p-8 border-b border-lux-divider">
                <h3 class="text-2xl font-heading text-lux-textPrimary">Property Details</h3>
            </div>
            <div class="divide-y divide-lux-divider">
                <div class="grid md:grid-cols-2 divide-x divide-lux-divider">
                    <div class="p-6">
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Property ID</div>
                        <div class="text-lux-textPrimary font-heading">LUX-{property.id.padStart(5, '0')}</div>
                    </div>
                    <div class="p-6">
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Property Type</div>
                        <div class="text-lux-textPrimary font-heading">{property.category}</div>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 divide-x divide-lux-divider">
                    <div class="p-6">
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Location</div>
                        <div class="text-lux-textPrimary font-heading">{property.location}</div>
                    </div>
                    <div class="p-6">
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Price</div>
                        <div class="text-lux-textPrimary font-heading">${property.price.toLocaleString()}</div>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 divide-x divide-lux-divider">
                    <div class="p-6">
                        <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Interior Size</div>
                        <div class="text-lux-textPrimary font-heading">{property.specs.sqft.toLocaleString()} sq. ft.</div>
                    </div>
                    {#if property.lotSize}
                        <div class="p-6">
                            <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Lot Size</div>
                            <div class="text-lux-textPrimary font-heading">{property.lotSize.toLocaleString()} sq. ft.</div>
                        </div>
                    {/if}
                </div>
                {#if property.yearBuilt}
                    <div class="grid md:grid-cols-2 divide-x divide-lux-divider">
                        <div class="p-6">
                            <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Year Built</div>
                            <div class="text-lux-textPrimary font-heading">{property.yearBuilt}</div>
                        </div>
                        {#if property.architect}
                            <div class="p-6">
                                <div class="text-xs uppercase tracking-widest text-lux-textSecondary mb-2">Architect</div>
                                <div class="text-lux-textPrimary font-heading">{property.architect}</div>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <!-- Call to Action -->
    <div class="border-t border-lux-divider bg-lux-surface py-20">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-heading text-lux-textPrimary mb-6">
                Ready to Make This Yours?
            </h2>
            <p class="text-lux-textSecondary max-w-2xl mx-auto mb-10 leading-relaxed">
                Contact our exclusive portfolio team to schedule a private viewing or discuss financing options. Available 24/7 for qualified buyers.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    on:click={() => window.dispatchEvent(new CustomEvent('openScheduling', { detail: property }))}
                    class="px-12 py-4 bg-lux-accent text-lux-background font-bold uppercase tracking-widest hover:bg-lux-textPrimary transition-all"
                >
                    Schedule Viewing
                </button>
                <button class="px-12 py-4 border border-lux-textPrimary/30 text-lux-textPrimary uppercase tracking-widest hover:bg-lux-textPrimary hover:text-lux-background transition-all">
                    Download Brochure
                </button>
            </div>
        </div>
    </div>
</div>
