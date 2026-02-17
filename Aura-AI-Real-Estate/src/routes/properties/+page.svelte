<script lang="ts">
    import PropertyTypeSelector from '$lib/components/PropertyTypeSelector.svelte';
    import PropertyShowcase from '$lib/components/PropertyShowcase.svelte';
    import { properties } from '$lib/data';
    
    let selectedType = 'All';

    $: filteredProperties = selectedType === 'All' 
        ? properties 
        : properties.filter(p => p.category === selectedType);
</script>

<div class="pt-32 pb-20 bg-lux-background min-h-screen">
    <div class="container mx-auto px-6 mb-20 text-center">
        <h1 class="text-5xl md:text-7xl font-heading mb-6 text-lux-textPrimary">Curated Portfolio</h1>
        <p class="text-lux-textSecondary max-w-2xl mx-auto mb-12">
            Discover a collection of the world's most exceptional properties, hand-selected for the discerning few.
        </p>

        <PropertyTypeSelector on:select={(e) => selectedType = e.detail} selected={selectedType} />
    </div>

    <div class="flex flex-col gap-0 border-t border-lux-divider">
        {#each filteredProperties as property, i (property.id)}
            <PropertyShowcase {property} index={i} />
        {/each}
        
        {#if filteredProperties.length === 0}
            <div class="py-40 text-center text-lux-textSecondary">
                <p>No properties found in this category.</p>
            </div>
        {/if}
    </div>
</div>
