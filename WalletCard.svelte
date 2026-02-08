<script>
	import { fade, fly } from 'svelte/transition';
	let balance = 120000;
	let activeCardIndex = -1;
	let lastActiveIndex = -1;
	
	const cards = [
		{
			id: 1,
			name: 'Stripe',
			logo: 'stripe',
			gradient: 'linear-gradient(135deg, #635BFF 0%, #635BFF 100%)',
			number: '4242 4242 4242 9821',
			holder: 'Stefan Saric',
			expiry: '12/28',
			cvc: '123'
		},
		{
			id: 2,
			name: 'PayPal',
			logo: 'paypal',
			gradient: '#003087',
			number: '5412 7512 3412 3456',
			holder: 'Stefan Saric',
			expiry: '09/26',
			cvc: '854'
		},
		{
			id: 3,
			name: 'Mastercard',
			logo: 'mastercard',
			gradient: 'linear-gradient(135deg, #FF5F00 0%, #EB5B00 100%)',
			number: '5500 1234 5678 9010',
			holder: 'Stefan Saric',
			expiry: '05/30',
			cvc: '567'
		}
	];
	
	const toggleCard = (index) => {
		if (activeCardIndex === index) {
			lastActiveIndex = activeCardIndex;
			activeCardIndex = -1;
			// Reset lastActiveIndex after animation
			setTimeout(() => {
				lastActiveIndex = -1;
			}, 800);
		} else {
			activeCardIndex = index;
		}
	};

	const clickedOutside = () => {
		if (activeCardIndex !== -1) {
			lastActiveIndex = activeCardIndex;
			activeCardIndex = -1;
			setTimeout(() => {
				lastActiveIndex = -1;
			}, 800);
		}
	};
	
	const formatCurrency = (amount) => {
		return '$' + new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0
		}).format(amount);
	};
</script>

<div class="main-wrapper">
	<!-- Backdrop for when card is active -->
	<div 
		class="backdrop {activeCardIndex !== -1 ? 'active' : ''}" 
		on:click={clickedOutside}
		role="button"
		tabindex="0"
		on:keydown={() => {}}
	></div>

<div class="wallet-container">
	<div class="wallet-card {activeCardIndex !== -1 ? 'has-active' : ''}">
		<!-- Cards Background Layer -->
		<div class="cards-layer">
			{#each cards as card, index}
				<div 
					class="credit-card {activeCardIndex === index ? 'active' : ''} {activeCardIndex !== -1 && activeCardIndex !== index ? 'inactive' : ''} {lastActiveIndex === index ? 'closing' : ''}" 
					role="button"
					tabindex="0"
					on:keydown={(e) => { if (e.key === 'Enter') toggleCard(index); }}
					style="
						background: {card.gradient}; 
						z-index: {activeCardIndex === index ? 100 : index + 1};
						--z-index: {index + 1};
						--y-pos: {index * 30}px;
						/* Remove inline transform so CSS can handle it */
					"
					on:click|stopPropagation={() => toggleCard(index)}
				>
					<div class="card-content">
						{#if card.logo === 'stripe'}
							<svg class="card-logo" viewBox="0 0 60 25" fill="none">
								<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-weight="700" font-family="system-ui">stripe</text>
							</svg>
						{:else if card.logo === 'paypal'}
							<svg class="card-logo" viewBox="0 0 100 32" fill="none">
								<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="700" font-family="system-ui" font-style="italic">PayPal</text>
							</svg>
						{:else if card.logo === 'mastercard'}
							<svg class="card-logo" viewBox="0 0 60 40" fill="none">
								<circle cx="20" cy="20" r="12" fill="#EB001B"/>
								<circle cx="32" cy="20" r="12" fill="#F79E1B"/>
							</svg>
						{/if}
					</div>
					
					<!-- Expanded Details Section -->
					<div class="card-details-view" style="opacity: {activeCardIndex === index ? 1 : 0}">
						<div class="card-header">
							<svg class="chip-icon" viewBox="0 0 50 35">
								<rect width="50" height="35" rx="6" fill="#fbbf24"/>
								<path d="M15 0v35M35 0v35M0 17.5h50M0 10h15M35 10h15M0 25h15M35 25h15" stroke="#000" stroke-opacity="0.15" stroke-width="1.5"/>
							</svg>
						</div>
						<div class="card-number-display">
							{card.number || '•••• •••• •••• ••••'}
						</div>
						<div class="card-footer-info">
							<div class="info-group">
								<span class="label">Card Holder</span>
								<span class="value">{card.holder || 'YOUR NAME'}</span>
							</div>
							<div class="info-group">
								<span class="label">Expires</span>
								<span class="value">{card.expiry || 'MM/YY'}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<!-- Front Pocket Layer -->
		<div class="pocket-layer">
			<div class="balance-section">
				<div class="balance-amount">{formatCurrency(balance)}</div>
				<div class="balance-label">Total Balance</div>
			</div>
		</div>
	</div>
</div>
</div>

<style>
	.main-wrapper {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.wallet-container {
		display: flex;
		justify-content: center;
		align-items: center;
		/* z-index: 10; */
	}
	
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0,0,0,0.5);
		backdrop-filter: blur(8px);
		z-index: 50;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.4s ease;
	}
	.backdrop.active {
		opacity: 1;
		pointer-events: all;
	}
	
	.wallet-card {
		width: 320px;
		height: 270px;
		background: #000000;
		border-radius: 32px;
		box-shadow: 0 20px 40px rgba(0,0,0,0.1);
		position: relative;
		overflow: hidden; /* Default state */
		transition: transform 0.4s ease;
	}

	.wallet-card.has-active {
		overflow: visible; /* Let the card pop out */
	}
	
	.cards-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 100px;
		padding: 20px;
		/* perspective: 1000px; // Removed perspective to flatten the plane for the pop-out */
	}
	
	.credit-card {
		position: absolute;
		top: 35px;
		left: 50%;
		translate: -50% 0; /* Use translate for horizontal centering instead of margin */
		width: 260px;
		height: 170px;
		border-radius: 16px;
		box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
		transform-origin: center center;
		cursor: pointer;
		
		/* Complex transition to handle "glitch-free" return */
		transition: 
			transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
			top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
			translate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
			filter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
		
		/* Default stacking position */
		transform: translateY(var(--y-pos)) scale(1); 
	}
	
	.credit-card.active {
		/* The Jump Out - Center on Wallet */
		top: 50%;
		translate: -50% -50%;
		transform: scale(1.25) !important;
		z-index: 100 !important;
		box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
		
		/* When activating, we want immediate response on everything */
		transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.credit-card.closing {
		z-index: 100; /* Start high, managed by animation */
		animation: returnToPocket 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	@keyframes returnToPocket {
		0% {
			top: 50%;
			translate: -50% -50%;
			transform: scale(1.25);
			z-index: 100;
		}
		40% {
			top: -40px; /* Fly up above the wallet pocket interaction area */
			translate: -50% 0;
			transform: scale(1);
			z-index: 100;
		}
		50% {
			z-index: var(--z-index); /* Drop behind the pocket layer */
		}
		100% {
			top: 35px;
			translate: -50% 0;
			transform: translateY(var(--y-pos)) scale(1);
			z-index: var(--z-index);
		}
	}

	.credit-card.inactive {
		filter: blur(2px) grayscale(0.5);
		transform: translateY(var(--y-pos)) scale(0.95);
		opacity: 0.8;
	}
	
	/* Card Details Styling */
	.card-details-view {
		position: absolute;
		inset: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: none; /* Let clicks pass through */
		transition: opacity 0.4s ease 0.2s; /* Delay appearance until card pops out */
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40px; /* Space for the logo at the top */
	}
	
	.chip-icon {
		width: 40px;
		height: 28px;
	}
	
	.card-number-display {
		font-family: 'Courier New', Courier, monospace;
		font-size: 15px;
		letter-spacing: 1.5px;
		color: rgba(255,255,255,0.9);
		text-shadow: 0 1px 2px rgba(0,0,0,0.3);
		margin-top: 10px;
		white-space: nowrap; /* Force 1 row */
	}
	
	.card-footer-info {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.info-group {
		display: flex;
		flex-direction: column;
	}
	
	.label {
		font-size: 8px;
		text-transform: uppercase;
		color: rgba(255,255,255,0.6);
		margin-bottom: 2px;
	}
	
	.value {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: white;
		letter-spacing: 1px;
	}

	/* Modify existing card-content to just hold the top-right logo */
	.card-content {
		position: absolute;
		top: 20px;
		right: 20px;
		padding: 0;
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		width: 100%;
		pointer-events: none;
	}
	
	.card-content .card-logo {
		height: 24px; /* Slightly larger */
	}

	.wallet-card::before {
		/* Optional: Add a subtle overlay to the wallet when a card is active */
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0,0,0,0.5);
		z-index: 50;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.4s;
	}
	.wallet-card.has-active::before {
		opacity: 1;
	}

	/* Cleanup Done */

	
	.pocket-layer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 160px;
		background: #000000; /* Texture here if needed */
		z-index: 20;
		/* The distinctive shape from the image: trapezoid tab in center with rounded corners */
		/* Using a path() allows for smooth cubic bezier curves (C) instead of sharp polygon points */
		clip-path: path('M -10 30 L 60 30 C 80 30 95 0 115 0 L 205 0 C 225 0 240 30 260 30 L 330 30 L 330 180 L -10 180 Z');
		
		/* Smooth shadow to make the edge subtle and realistic + Rim light effect */
		background: linear-gradient(to bottom, #262626 0%, #1a1a1a 20%, #000000 100%);
		
		/* 
		   1. First drop-shadow creates the rim light (light grey, 1px up)
		   2. Second drop-shadow creates the depth shadow on the cards (dark, blurred)
		*/
		filter: drop-shadow(0 -1px 0 rgba(255,255,255,0.1)) drop-shadow(0 -8px 24px rgba(0,0,0,0.9));
	}
	
	/* Inset shadow effect to create depth at the "opening" of the pocket */
	.pocket-layer::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 40px;
		background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
		/* Match the clip path to ensure the shadow fits the shape */
		clip-path: path('M -10 30 L 60 30 C 80 30 95 0 115 0 L 205 0 C 225 0 240 30 260 30 L 330 30 L 330 180 L -10 180 Z');
		pointer-events: none;
	}
	
	.balance-section {
		position: absolute;
		bottom: 30px;
		left: 30px;
		color: white;
	}
	
	.balance-amount {
		font-size: 28px;
		font-weight: 500;
		margin-bottom: 4px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}
	
	.balance-label {
		font-size: 13px;
		color: #888;
		font-weight: 400;
	}
</style>

