<script lang="ts">
	import '../app.postcss';
    import Navbar from '$lib/components/Navbar.svelte';
    import AIConcierge from '$lib/components/AIConcierge.svelte';

    // Highlight integration for code blocks if needed, sticking to basics first
</script>

<div class="min-h-screen relative flex flex-col">
    <Navbar />
    
    <main class="flex-1 w-full relative z-10">
        <slot />
    </main>
    
    <footer class="bg-lux-background py-20 border-t border-lux-divider text-center text-lux-textSecondary">
        <p class="font-heading italic text-2xl mb-4">Luxury Real Estate</p>
        <p class="text-sm">© 2026. All Rights Reserved.</p>
    </footer>

    <AIConcierge />
</div>
