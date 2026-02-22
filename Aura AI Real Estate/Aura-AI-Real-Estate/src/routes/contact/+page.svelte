<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let formData = {
        name: '',
        email: '',
        phone: '',
        propertyInterest: '',
        budget: '',
        message: ''
    };

    let showSuccessModal = false;

    const offices = [
        {
            name: "Dubai Marina Office",
            address: "Level 42, Marina Plaza\nDubai Marina, Dubai, UAE",
            phone: "+971 4 123 4567",
            email: "marina@luxe-estate.com",
            hours: "Mon-Sat: 9:00 AM - 8:00 PM\nSunday: By Appointment",
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop"
        },
        {
            name: "Downtown Dubai Office",
            address: "Burj Khalifa Boulevard\nDowntown Dubai, UAE",
            phone: "+971 4 234 5678",
            email: "downtown@luxe-estate.com",
            hours: "Mon-Sat: 9:00 AM - 8:00 PM\nSunday: By Appointment",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
        },
        {
            name: "Palm Jumeirah Office",
            address: "Golden Mile Galleria\nPalm Jumeirah, Dubai, UAE",
            phone: "+971 4 345 6789",
            email: "palm@luxe-estate.com",
            hours: "Mon-Sat: 10:00 AM - 7:00 PM\nSunday: By Appointment",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
        }
    ];

    const team = [
        {
            name: "Alexander Bennett",
            title: "Managing Director",
            phone: "+971 50 123 4567",
            email: "a.bennett@luxe-estate.com",
            specialty: "Ultra-Luxury Properties & Estate Planning",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
        },
        {
            name: "Sophia Laurent",
            title: "Senior Portfolio Manager",
            phone: "+971 50 234 5678",
            email: "s.laurent@luxe-estate.com",
            specialty: "Waterfront & Penthouse Collection",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
        },
        {
            name: "Marcus Chen",
            title: "Investment Strategist",
            phone: "+971 50 345 6789",
            email: "m.chen@luxe-estate.com",
            specialty: "Investment Properties & ROI Analysis",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
        },
        {
            name: "Isabella Romano",
            title: "Luxury Estates Specialist",
            phone: "+971 50 456 7890",
            email: "i.romano@luxe-estate.com",
            specialty: "Villas, Mansions & Private Estates",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
        }
    ];

    function handleSubmit(e: Event) {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        
        // Show success modal
        showSuccessModal = true;
        
        // Reset form
        formData = {
            name: '',
            email: '',
            phone: '',
            propertyInterest: '',
            budget: '',
            message: ''
        };
    }

    function closeModal() {
        showSuccessModal = false;
    }
</script>

<svelte:head>
    <title>Contact Us | Luxe Estate</title>
</svelte:head>

<div class="min-h-screen bg-lux-background pt-20">
    <!-- Hero Section -->
    <div class="relative h-[50vh] overflow-hidden">
        <div 
            class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop');"
        >
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-lux-background"></div>
        </div>
        
        <div class="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
            <span class="text-lux-accent uppercase tracking-[0.3em] text-xs mb-4">Get in Touch</span>
            <h1 class="text-5xl md:text-7xl font-heading text-white mb-6">Contact Our Team</h1>
            <p class="text-xl text-white/80 max-w-2xl">
                Your journey to exceptional living begins with a conversation. Our dedicated specialists are ready to assist you.
            </p>
        </div>
    </div>

    <!-- Contact Form & Info Section -->
    <div class="container mx-auto px-6 py-20">
        <div class="grid lg:grid-cols-5 gap-16">
            <!-- Contact Form -->
            <div class="lg:col-span-3">
                <div class="mb-12">
                    <h2 class="text-3xl font-heading text-lux-textPrimary mb-4">Schedule a Private Consultation</h2>
                    <p class="text-lux-textSecondary leading-relaxed">
                        Complete the form below and one of our senior portfolio managers will contact you within 24 hours to discuss your requirements in confidence.
                    </p>
                </div>

                <form on:submit={handleSubmit} class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block text-sm uppercase tracking-wider text-lux-textSecondary mb-2">Full Name *</label>
                            <input 
                                id="name"
                                type="text" 
                                bind:value={formData.name}
                                required
                                class="w-full bg-lux-surface border border-lux-divider p-4 text-lux-textPrimary focus:border-lux-accent outline-none transition-colors"
                                placeholder="John Smith"
                            />
                        </div>
                        <div>
                            <label for="email" class="block text-sm uppercase tracking-wider text-lux-textSecondary mb-2">Email Address *</label>
                            <input 
                                id="email"
                                type="email" 
                                bind:value={formData.email}
                                required
                                class="w-full bg-lux-surface border border-lux-divider p-4 text-lux-textPrimary focus:border-lux-accent outline-none transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="phone" class="block text-sm uppercase tracking-wider text-lux-textSecondary mb-2">Phone Number *</label>
                            <input 
                                id="phone"
                                type="tel" 
                                bind:value={formData.phone}
                                required
                                class="w-full bg-lux-surface border border-lux-divider p-4 text-lux-textPrimary focus:border-lux-accent outline-none transition-colors"
                                placeholder="+971 50 123 4567"
                            />
                        </div>
                        <div>
                            <label for="propertyInterest" class="block text-sm uppercase tracking-wider text-lux-textSecondary mb-2">Property Interest</label>
                            <select 
                                id="propertyInterest"
                                bind:value={formData.propertyInterest}
                                class="w-full bg-lux-surface border border-lux-divider p-4 text-lux-textPrimary focus:border-lux-accent outline-none transition-colors"
                            >
                                <option value="">Select Type</option>
                                <option value="villa">Villa</option>
                                <option value="penthouse">Penthouse</option>
                                <option value="mansion">Mansion</option>
                                <option value="waterfront">Waterfront</option>
                                <option value="estate">Estate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label for="budget" class="block text-sm uppercase tracking-wider text-lux-textSecondary mb-2">Budget Range</label>
                        <select 
                            id="budget"
                            bind:value={formData.budget}
                            class="w-full bg-lux-surface border border-lux-divider p-4 text-lux-textPrimary focus:border-lux-accent outline-none transition-colors"
                        >
                            <option value="">Select Range</option>
                            <option value="5-10">$5M - $10M</option>
                            <option value="10-25">$10M - $25M</option>
                            <option value="25-50">$25M - $50M</option>
                            <option value="50-100">$50M - $100M</option>
                            <option value="100+">$100M+</option>
                        </select>
                    </div>

                    <div>
                        <label for="message" class="block text-sm uppercase tracking-wider text-lux-textSecondary mb-2">Your Message *</label>
                        <textarea 
                            id="message"
                            bind:value={formData.message}
                            required
                            rows="6"
                            class="w-full bg-lux-surface border border-lux-divider p-4 text-lux-textPrimary focus:border-lux-accent outline-none transition-colors resize-none"
                            placeholder="Tell us about your property requirements, timeline, and any specific preferences..."
                        ></textarea>
                    </div>

                    <div class="flex items-start gap-3">
                        <input type="checkbox" id="privacy" required class="mt-1" />
                        <label for="privacy" class="text-sm text-lux-textSecondary">
                            I agree to the privacy policy and consent to being contacted by Luxe Estate regarding my inquiry. All information will be treated in strict confidence.
                        </label>
                    </div>

                    <button 
                        type="submit"
                        class="w-full md:w-auto px-12 py-4 bg-lux-accent text-lux-background font-bold uppercase tracking-widest hover:bg-lux-textPrimary transition-all"
                    >
                        Submit Inquiry
                    </button>
                </form>
            </div>

            <!-- Contact Information Sidebar -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Quick Contact -->
                <div class="bg-lux-surface border border-lux-divider p-8">
                    <h3 class="text-xl font-heading text-lux-textPrimary mb-6">Direct Contact</h3>
                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <span class="text-2xl text-lux-accent">📞</span>
                            <div>
                                <div class="text-xs uppercase tracking-wider text-lux-textSecondary mb-1">Phone</div>
                                <a href="tel:+97141234567" class="text-lux-textPrimary hover:text-lux-accent transition-colors">+971 4 123 4567</a>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <span class="text-2xl text-lux-accent">✉️</span>
                            <div>
                                <div class="text-xs uppercase tracking-wider text-lux-textSecondary mb-1">Email</div>
                                <a href="mailto:inquiries@luxe-estate.com" class="text-lux-textPrimary hover:text-lux-accent transition-colors">inquiries@luxe-estate.com</a>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <span class="text-2xl text-lux-accent">💬</span>
                            <div>
                                <div class="text-xs uppercase tracking-wider text-lux-textSecondary mb-1">WhatsApp</div>
                                <a href="https://wa.me/971501234567" class="text-lux-textPrimary hover:text-lux-accent transition-colors">+971 50 123 4567</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Office Hours -->
                <div class="bg-gradient-to-br from-lux-accent/10 to-transparent border-l-4 border-lux-accent p-8">
                    <h3 class="text-xl font-heading text-lux-accent mb-4">Office Hours</h3>
                    <div class="space-y-2 text-sm text-lux-textSecondary">
                        <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                        <p>Sunday: By Appointment Only</p>
                        <p class="mt-4 pt-4 border-t border-lux-divider text-xs">
                            Emergency viewings and after-hours consultations available for qualified buyers.
                        </p>
                    </div>
                </div>

                <!-- VIP Service -->
                <div class="bg-lux-surface border border-lux-divider p-8">
                    <h3 class="text-xl font-heading text-lux-textPrimary mb-4">VIP Concierge Service</h3>
                    <p class="text-sm text-lux-textSecondary mb-4">
                        For properties above $50M or if you require absolute discretion, contact our VIP desk directly.
                    </p>
                    <a href="mailto:vip@luxe-estate.com" class="text-lux-accent hover:text-lux-textPrimary transition-colors text-sm font-medium">
                        vip@luxe-estate.com
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Our Offices -->
    <div class="bg-lux-surface border-y border-lux-divider py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <span class="text-lux-accent uppercase tracking-[0.3em] text-xs mb-4 block">Global Presence</span>
                <h2 class="text-4xl md:text-5xl font-heading text-lux-textPrimary mb-6">Our Offices</h2>
                <p class="text-lux-textSecondary max-w-2xl mx-auto">
                    Visit us at any of our prestigious locations across Dubai. Walk-ins welcome, appointments preferred.
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                {#each offices as office}
                    <div class="group bg-lux-background border border-lux-divider hover:border-lux-accent transition-all overflow-hidden">
                        <div class="aspect-video overflow-hidden">
                            <img 
                                src={office.image} 
                                alt={office.name}
                                class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                        </div>
                        <div class="p-6 space-y-4">
                            <h3 class="text-xl font-heading text-lux-textPrimary">{office.name}</h3>
                            <div class="space-y-3 text-sm text-lux-textSecondary">
                                <p class="whitespace-pre-line">{office.address}</p>
                                <p><strong class="text-lux-accent">Phone:</strong> {office.phone}</p>
                                <p><strong class="text-lux-accent">Email:</strong> {office.email}</p>
                                <p class="whitespace-pre-line text-xs pt-2 border-t border-lux-divider">{office.hours}</p>
                            </div>
                            <button class="text-lux-accent hover:text-lux-textPrimary text-sm uppercase tracking-wider transition-colors">
                                Get Directions →
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Meet The Team -->
    <div class="container mx-auto px-6 py-20">
        <div class="text-center mb-16">
            <span class="text-lux-accent uppercase tracking-[0.3em] text-xs mb-4 block">Exceptional Service</span>
            <h2 class="text-4xl md:text-5xl font-heading text-lux-textPrimary mb-6">Meet Our Specialists</h2>
            <p class="text-lux-textSecondary max-w-2xl mx-auto">
                Our team of seasoned professionals brings decades of combined experience in ultra-luxury real estate.
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each team as member}
                <div class="group">
                    <div class="aspect-[3/4] overflow-hidden mb-4 bg-lux-surface">
                        <img 
                            src={member.image} 
                            alt={member.name}
                            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <h3 class="text-xl font-heading text-lux-textPrimary mb-1">{member.name}</h3>
                    <p class="text-sm text-lux-accent mb-3">{member.title}</p>
                    <p class="text-xs text-lux-textSecondary mb-4 leading-relaxed">{member.specialty}</p>
                    <div class="space-y-1 text-xs text-lux-textSecondary">
                        <p><a href="tel:{member.phone.replace(/\s/g, '')}" class="hover:text-lux-accent transition-colors">{member.phone}</a></p>
                        <p><a href="mailto:{member.email}" class="hover:text-lux-accent transition-colors">{member.email}</a></p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- CTA Section -->
    <div class="border-t border-lux-divider bg-gradient-to-b from-lux-background to-lux-surface py-20">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-heading text-lux-textPrimary mb-6">
                Ready to Begin Your Journey?
            </h2>
            <p class="text-lux-textSecondary max-w-2xl mx-auto mb-10 leading-relaxed">
                Whether you're looking to buy, sell, or invest in exceptional properties, our team is here to guide you every step of the way.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/properties" class="px-12 py-4 bg-lux-accent text-lux-background font-bold uppercase tracking-widest hover:bg-lux-textPrimary transition-all">
                    View Portfolio
                </a>
                <button class="px-12 py-4 border border-lux-textPrimary/30 text-lux-textPrimary uppercase tracking-widest hover:bg-lux-textPrimary hover:text-lux-background transition-all">
                    Download Brochure
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Success Modal -->
{#if showSuccessModal}
    <div class="fixed inset-0 z-[200] flex items-center justify-center px-4">
        <!-- Backdrop -->
        <div 
            transition:fade={{ duration: 200 }}
            on:click={closeModal}
            on:keydown={(e) => e.key === 'Escape' && closeModal()}
            role="button"
            tabindex="-1"
            class="absolute inset-0 bg-black/80 backdrop-blur-md"
        ></div>

        <!-- Modal Content -->
        <div 
            in:fly={{ y: 20, duration: 300, easing: cubicOut, delay: 100 }}
            out:fly={{ y: 20, duration: 200, easing: cubicOut }}
            class="relative bg-lux-surface border-2 border-lux-accent w-full max-w-md p-10 shadow-[0_0_100px_rgba(198,169,107,0.4)]"
        >
            <!-- Success Icon -->
            <div class="flex justify-center mb-6">
                <div class="relative w-20 h-20">
                    <div class="absolute inset-0 rounded-full bg-lux-accent/20 animate-pulse"></div>
                    <div class="absolute inset-2 rounded-full bg-lux-accent/30"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-4xl">✓</span>
                    </div>
                </div>
            </div>

            <!-- Message -->
            <h3 class="text-2xl md:text-3xl font-heading text-lux-accent text-center mb-4">
                Thank You
            </h3>
            <p class="text-lux-textSecondary text-center leading-relaxed mb-8">
                Your inquiry has been received. One of our senior portfolio managers will contact you within 24 hours to discuss your requirements in confidence.
            </p>

            <!-- Contact Info -->
            <div class="bg-lux-background/50 border border-lux-divider p-4 mb-6 text-center">
                <p class="text-xs uppercase tracking-wider text-lux-textSecondary mb-2">For Immediate Assistance</p>
                <a href="tel:+97141234567" class="text-lux-accent hover:text-lux-textPrimary transition-colors font-medium">
                    +971 4 123 4567
                </a>
            </div>

            <!-- Close Button -->
            <button 
                on:click={closeModal}
                class="w-full bg-lux-accent text-lux-background font-bold uppercase tracking-widest py-4 hover:bg-lux-textPrimary transition-all"
            >
                Close
            </button>
        </div>
    </div>
{/if}
