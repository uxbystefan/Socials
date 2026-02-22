<script lang="ts">
    import HeroSelector from '$lib/components/HeroSelector.svelte';
</script>

<HeroSelector />

<section class="py-32 bg-lux-background text-center relative z-20">
    <div class="container mx-auto px-6">
        <h2 class="text-xs uppercase tracking-[0.3em] text-lux-accent mb-6" data-aos="fade-up">The Standard of Excellence</h2>
        <p class="text-3xl md:text-5xl font-heading text-lux-textPrimary leading-tight max-w-4xl mx-auto mb-10">
            Redefining luxury living through <br> <span class="text-lux-textSecondary">architectural mastery</span> and immersive design.
        </p>
        
        <a href="/properties" class="inline-block border border-lux-textPrimary/30 text-lux-textPrimary uppercase tracking-widest text-sm px-10 py-4 hover:bg-lux-textPrimary hover:text-lux-background transition-all duration-300">
            View Our Portfolio
        </a>
    </div>
</section>

<!-- Aura AI Showcase Section -->
<section class="py-24 bg-gradient-to-b from-lux-background to-lux-surface relative overflow-hidden">
    <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-20 w-96 h-96 bg-lux-accent rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-lux-accent rounded-full blur-3xl"></div>
    </div>
    
    <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
            <div class="inline-flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-lux-accent to-lux-accent/70 flex items-center justify-center shadow-[0_0_30px_rgba(198,169,107,0.4)]">
                    <span class="text-2xl">✨</span>
                </div>
                <h2 class="text-4xl md:text-6xl font-heading text-lux-accent">Meet Aura</h2>
            </div>
            <p class="text-xl text-lux-textSecondary max-w-3xl mx-auto leading-relaxed">
                Your AI-powered real estate concierge. Voice-activated, investment-savvy, and ready to visualize your dream property in any style.
            </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="p-8 bg-lux-surface/50 backdrop-blur-sm rounded-xl border border-lux-divider hover:border-lux-accent/50 transition-all">
                <div class="text-4xl mb-4">💬</div>
                <h3 class="text-xl font-heading text-lux-accent mb-3">Natural Language Commands</h3>
                <p class="text-sm text-lux-textSecondary leading-relaxed">
                    Simply type your questions naturally. Ask about investment opportunities, request property tours, or inquire about ROI projections. Voice input is optional.
                </p>
            </div>

            <div class="p-8 bg-lux-surface/50 backdrop-blur-sm rounded-xl border border-lux-divider hover:border-lux-accent/50 transition-all">
                <div class="text-4xl mb-4">🎨</div>
                <h3 class="text-xl font-heading text-lux-accent mb-3">Dynamic Staging</h3>
                <p class="text-sm text-lux-textSecondary leading-relaxed">
                    Visualize any property in different styles. Type "Show me this in Mid-Century Modern"—and watch the transformation unfold with cinematic transitions.
                </p>
            </div>

            <div class="p-8 bg-lux-surface/50 backdrop-blur-sm rounded-xl border border-lux-divider hover:border-lux-accent/50 transition-all">
                <div class="text-4xl mb-4">📊</div>
                <h3 class="text-xl font-heading text-lux-accent mb-3">Investment Strategist</h3>
                <p class="text-sm text-lux-textSecondary leading-relaxed">
                    Get instant ROI projections, rental yields, and appreciation forecasts with beautiful animated charts generated on the fly.
                </p>
            </div>
        </div>

        <div class="text-center">
            <div class="inline-flex flex-col items-center gap-4">
                <p class="text-lux-textSecondary text-sm">Try these commands:</p>
                <div class="flex flex-wrap gap-3 justify-center">
                    <span class="px-4 py-2 bg-lux-glass border border-lux-divider rounded-full text-xs text-lux-accent">
                        "What's the ROI for the Skyline Penthouse?"
                    </span>
                    <span class="px-4 py-2 bg-lux-glass border border-lux-divider rounded-full text-xs text-lux-accent">
                        "Show me Palm Majestic in Mid-Century Modern"
                    </span>
                    <span class="px-4 py-2 bg-lux-glass border border-lux-divider rounded-full text-xs text-lux-accent">
                        "Find waterfront properties"
                    </span>
                </div>
                <p class="text-xs text-lux-textSecondary/70 mt-2">
                    Click the glowing orb in the bottom-right to start →
                </p>
            </div>
        </div>
    </div>
</section>
