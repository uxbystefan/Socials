<script lang="ts">
    let y = 0;
    
    $: scrolled = y > 50;
</script>

<svelte:window bind:scrollY={y} />

<nav class="fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b {scrolled ? 'bg-lux-surface/90 backdrop-blur-md border-lux-divider py-4' : 'bg-transparent border-transparent py-6'}">
    <div class="container mx-auto px-6 flex justify-between items-center">
        <!-- Logo -->
        <a href="/" class="text-2xl font-heading font-bold text-lux-textPrimary tracking-widest">
            LUXE<span class="text-lux-accent">.</span>
        </a>

        <!-- Links -->
        <div class="hidden md:flex gap-10 text-sm font-medium tracking-wide">
            <a href="/properties" class="relative group py-1">
                <span class="text-lux-textPrimary/80 group-hover:text-lux-textPrimary transition-colors">Properties</span>
                <span class="absolute left-0 bottom-0 w-0 h-[1px] bg-lux-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/properties" class="relative group py-1">
                <span class="text-lux-textPrimary/80 group-hover:text-lux-textPrimary transition-colors">Projects</span>
                <span class="absolute left-0 bottom-0 w-0 h-[1px] bg-lux-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/properties" class="relative group py-1">
                <span class="text-lux-textPrimary/80 group-hover:text-lux-textPrimary transition-colors">Services</span>
                <span class="absolute left-0 bottom-0 w-0 h-[1px] bg-lux-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/contact" class="relative group py-1">
                <span class="text-lux-textPrimary/80 group-hover:text-lux-textPrimary transition-colors">Contact</span>
                <span class="absolute left-0 bottom-0 w-0 h-[1px] bg-lux-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
        </div>

        <!-- CTA -->
        <button class="bg-lux-accent/10 hover:bg-lux-accent/20 border border-lux-accent/50 text-lux-accent px-6 py-2 rounded-sm text-xs uppercase tracking-widest transition-all hover:scale-105">
            book viewing
        </button>
    </div>
</nav>
