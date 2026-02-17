<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let selected = 'All';
    const dispatch = createEventDispatcher();

    const types = ['All', 'Villa', 'Penthouse', 'Mansion', 'Waterfront', 'Estate'];

    function select(type: string) {
        selected = type;
        dispatch('select', type);
    }
</script>

<div class="flex justify-center flex-wrap gap-8 md:gap-16 py-12 border-b border-lux-divider">
    {#each types as type}
        <button 
            on:click={() => select(type)}
            class="text-sm md:text-base uppercase tracking-widest relative group transition-colors duration-300
            {selected === type ? 'text-lux-accent' : 'text-lux-textSecondary hover:text-lux-textPrimary'}"
        >
            {type}
            <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lux-accent transition-all duration-300
                {selected === type ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75'}
            "></span>
        </button>
    {/each}
</div>
