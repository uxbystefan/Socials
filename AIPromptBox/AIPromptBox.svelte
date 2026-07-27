<script lang="ts">
	import { tick } from 'svelte';

	let prompt = '';
	let isFocused = false;
	let isSending = false;
	let textarea: HTMLTextAreaElement;

	const MIN_HEIGHT = 52;
	const MAX_HEIGHT = 180;

	function resizeTextarea() {
		if (!textarea) return;

		textarea.style.height = `${MIN_HEIGHT}px`;

		const nextHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
		textarea.style.height = `${nextHeight}px`;
		textarea.style.overflowY =
			textarea.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
	}

	async function handleInput() {
		await tick();
		resizeTextarea();
	}

	async function sendPrompt() {
		const value = prompt.trim();

		if (!value || isSending) return;

		isSending = true;

		// Replace this with your actual API call.
		await new Promise((resolve) => setTimeout(resolve, 1400));

		console.log('Prompt submitted:', value);

		prompt = '';
		isSending = false;

		await tick();
		resizeTextarea();
		textarea?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendPrompt();
		}
	}

	let attachMenuOpen = false;
	let fileInput: HTMLInputElement;
	let imageInput: HTMLInputElement;

	function toggleAttachMenu() {
		attachMenuOpen = !attachMenuOpen;
	}

	function closeAttachMenu() {
		attachMenuOpen = false;
	}

	function handleAttachOption(type: 'image' | 'file' | 'link') {
		closeAttachMenu();
		if (type === 'image') imageInput.click();
		else if (type === 'file') fileInput.click();
		else if (type === 'link') {
			const url = window.prompt('Paste a link:');
			if (url) console.log('Link attached:', url);
		}
	}
</script>

<div
	class:focused={isFocused}
	class:sending={isSending}
	class:attach-open={attachMenuOpen}
	class="prompt-shell"
>
	<div class="animated-border" aria-hidden="true"></div>
	<div class="glow" aria-hidden="true"></div>

	<div class="prompt-box">
		<div class="prompt-main">
			<div class="sparkle" aria-hidden="true">
				<svg viewBox="0 0 24 24">
					<path
						d="M12 3.75c.62 3.23 2.02 4.63 5.25 5.25-3.23.62-4.63 2.02-5.25 5.25-.62-3.23-2.02-4.63-5.25-5.25C9.98 8.38 11.38 6.98 12 3.75Z"
					/>
					<path
						d="M18.25 14.75c.3 1.56.94 2.2 2.5 2.5-1.56.3-2.2.94-2.5 2.5-.3-1.56-.94-2.2-2.5-2.5 1.56-.3 2.2-.94 2.5-2.5Z"
					/>
				</svg>
			</div>

			<textarea
				bind:this={textarea}
				bind:value={prompt}
				on:input={handleInput}
				on:focus={() => (isFocused = true)}
				on:blur={() => (isFocused = false)}
				on:keydown={handleKeydown}
				placeholder="Ask anything about your product..."
				rows="1"
				disabled={isSending}
				aria-label="AI prompt"
			></textarea>
		</div>

		<div class="prompt-footer">
			<div class="prompt-actions">
				<!-- Hidden file inputs -->
				<input bind:this={imageInput} type="file" accept="image/*" style="display:none" on:change={(e) => console.log('Image selected:', e.currentTarget.files)} />
				<input bind:this={fileInput} type="file" style="display:none" on:change={(e) => console.log('File selected:', e.currentTarget.files)} />

				<div class="attach-wrapper">
					<button class="icon-button" type="button" aria-label="Attach file" on:click={toggleAttachMenu}>
						<svg viewBox="0 0 24 24">
							<path
								d="m8.5 12.5 5.9-5.9a3.2 3.2 0 0 1 4.5 4.5l-7.4 7.4a5 5 0 0 1-7.1-7.1l7.1-7.1"
							/>
						</svg>
					</button>

					{#if attachMenuOpen}
						<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
						<div class="attach-backdrop" on:click={closeAttachMenu}></div>
						<div class="attach-menu" role="menu">
							<button class="attach-option" role="menuitem" type="button" on:click={() => handleAttachOption('image')}>
								<span class="attach-icon">
									<svg viewBox="0 0 24 24">
										<rect x="3" y="3" width="18" height="18" rx="3" />
										<circle cx="8.5" cy="8.5" r="1.5" />
										<path d="m21 15-5-5L5 21" />
									</svg>
								</span>
								Image
							</button>
							<button class="attach-option" role="menuitem" type="button" on:click={() => handleAttachOption('file')}>
								<span class="attach-icon">
									<svg viewBox="0 0 24 24">
										<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
										<polyline points="14 2 14 8 20 8" />
									</svg>
								</span>
								File
							</button>
							<button class="attach-option" role="menuitem" type="button" on:click={() => handleAttachOption('link')}>
								<span class="attach-icon">
									<svg viewBox="0 0 24 24">
										<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
										<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
									</svg>
								</span>
								Link
							</button>
						</div>
					{/if}
				</div>

				<button class="mode-button" type="button">
					<span class="mode-dot"></span>
					Reason
				</button>
			</div>

			<div class="submit-group">
				<span class="shortcut">Enter</span>

				<button
					class="send-button"
					type="button"
					on:click={sendPrompt}
					disabled={!prompt.trim() || isSending}
					aria-label={isSending ? 'Sending prompt' : 'Send prompt'}
				>
					<span class="button-background"></span>

					<span class="send-icon">
						<svg viewBox="0 0 24 24">
							<path d="M12 19V5" />
							<path d="m6.5 10.5 5.5-5.5 5.5 5.5" />
						</svg>
					</span>

					<span class="loader" aria-hidden="true">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	.prompt-shell {
		--border-radius: 24px;
		--surface: rgba(18, 20, 24, 0.94);
		--surface-secondary: rgba(255, 255, 255, 0.055);
		--border: rgba(255, 255, 255, 0.1);
		--text: #f7f7f8;
		--muted: #9297a3;
		--accent: #a78bfa;
		--accent-secondary: #22d3ee;

		position: relative;
		width: min(720px, 100%);
		padding: 1px;
		border-radius: var(--border-radius);
		background: var(--border);
		isolation: isolate;
		transition:
			transform 220ms ease,
			box-shadow 220ms ease;
	}

	.prompt-shell.focused {
		transform: translateY(-2px);
		box-shadow:
			0 22px 60px rgba(0, 0, 0, 0.34),
			0 0 0 1px rgba(167, 139, 250, 0.08);
	}

	.animated-border {
		position: absolute;
		inset: 0;
		z-index: -2;
		border-radius: inherit;
		opacity: 0;
		background:
			conic-gradient(
				from var(--angle),
				transparent 0deg,
				#7c3aed 70deg,
				#22d3ee 140deg,
				#f472b6 210deg,
				transparent 290deg
			);
		transition: opacity 250ms ease;
		animation: rotate-border 4s linear infinite;
	}

	.focused .animated-border,
	.attach-open .animated-border {
		opacity: 1;
	}

	.glow {
		position: absolute;
		inset: 8px;
		z-index: -3;
		border-radius: inherit;
		background:
			radial-gradient(
				circle at 30% 50%,
				rgba(124, 58, 237, 0.28),
				transparent 45%
			),
			radial-gradient(
				circle at 75% 50%,
				rgba(34, 211, 238, 0.2),
				transparent 45%
			);
		filter: blur(28px);
		opacity: 0;
		transform: scale(0.96);
		transition:
			opacity 300ms ease,
			transform 300ms ease;
	}

	.focused .glow {
		opacity: 1;
		transform: scale(1.04);
	}

	.prompt-box {
		border-radius: calc(var(--border-radius) - 1px);
		background:
			linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.035),
				transparent 35%
			),
			var(--surface);
		backdrop-filter: blur(24px);
	}

	.prompt-main {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 18px 18px 10px;
	}

	.sparkle {
		flex: 0 0 auto;
		width: 22px;
		height: 22px;
		margin-top: 3px;
		color: var(--muted);
		transition:
			color 220ms ease,
			transform 220ms ease,
			filter 220ms ease;
	}

	.focused .sparkle {
		color: var(--accent);
		transform: rotate(-8deg) scale(1.08);
		filter: drop-shadow(0 0 9px rgba(167, 139, 250, 0.55));
	}

	.sparkle svg,
	.icon-button svg,
	.send-icon svg {
		width: 100%;
		height: 100%;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.sparkle svg {
		fill: currentColor;
		stroke: none;
	}

	textarea {
		width: 100%;
		min-height: 52px;
		max-height: 180px;
		padding: 0;
		resize: none;
		overflow-y: hidden;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: 16px;
		line-height: 1.55;
		caret-color: var(--accent-secondary);
		transition: height 180ms ease;
	}

	textarea::placeholder {
		color: var(--muted);
	}

	textarea:disabled {
		opacity: 0.65;
	}

	.prompt-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 12px 12px;
	}

	.prompt-actions,
	.submit-group {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	button {
		font: inherit;
	}

	.icon-button,
	.mode-button {
		height: 38px;
		border: 1px solid transparent;
		background: transparent;
		color: var(--muted);
		transition:
			color 180ms ease,
			background 180ms ease,
			border-color 180ms ease,
			transform 180ms ease;
	}

	.icon-button:hover,
	.mode-button:hover {
		color: var(--text);
		background: var(--surface-secondary);
		border-color: rgba(255, 255, 255, 0.08);
	}

	.icon-button:active,
	.mode-button:active {
		transform: scale(0.96);
	}

	.icon-button {
		display: grid;
		width: 38px;
		padding: 9px;
		border-radius: 12px;
	}

	.mode-button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 12px;
		border-radius: 12px;
		font-size: 13px;
	}

	.mode-dot {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: linear-gradient(
			135deg,
			var(--accent),
			var(--accent-secondary)
		);
		box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
	}

	.shortcut {
		color: #707581;
		font-size: 12px;
	}

	.send-button {
		position: relative;
		display: grid;
		width: 42px;
		height: 42px;
		padding: 0;
		overflow: hidden;
		place-items: center;
		border: 0;
		border-radius: 14px;
		background: transparent;
		color: #08090b;
		cursor: pointer;
		transition:
			transform 180ms ease,
			opacity 180ms ease,
			width 260ms cubic-bezier(0.22, 1, 0.36, 1),
			border-radius 260ms ease;
	}

	.send-button:not(:disabled):hover {
		transform: translateY(-2px) scale(1.03);
	}

	.send-button:not(:disabled):active {
		transform: scale(0.96);
	}

	.send-button:disabled {
		cursor: not-allowed;
		opacity: 0.35;
	}

	.button-background {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				135deg,
				#ffffff,
				#b9f4ff 48%,
				#c4b5fd
			);
		transition: filter 220ms ease;
	}

	.send-button:not(:disabled):hover .button-background {
		filter: brightness(1.08);
	}

	.send-icon {
		position: relative;
		z-index: 1;
		width: 19px;
		height: 19px;
		transition:
			opacity 180ms ease,
			transform 220ms ease;
	}

	.loader {
		position: absolute;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 4px;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 180ms ease,
			transform 220ms ease;
	}

	.loader span {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #111318;
		animation: loading-dot 900ms ease-in-out infinite;
	}

	.loader span:nth-child(2) {
		animation-delay: 120ms;
	}

	.loader span:nth-child(3) {
		animation-delay: 240ms;
	}

	.sending .send-button {
		width: 68px;
		border-radius: 18px;
	}

	.sending .send-icon {
		opacity: 0;
		transform: translateY(-8px);
	}

	.sending .loader {
		opacity: 1;
		transform: translateY(0);
	}

	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes rotate-border {
		to {
			--angle: 360deg;
		}
	}

	@keyframes loading-dot {
		0%,
		80%,
		100% {
			transform: translateY(0);
			opacity: 0.45;
		}

		40% {
			transform: translateY(-4px);
			opacity: 1;
		}
	}

	.attach-wrapper {
		position: relative;
	}

	.attach-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9;
	}

	.attach-menu {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 6px;
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(18, 20, 24, 0.96);
		backdrop-filter: blur(20px);
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
		animation: menu-in 160ms cubic-bezier(0.22, 1, 0.36, 1);
		min-width: 140px;
	}

	.attach-option {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 9px 12px;
		border: 0;
		border-radius: 10px;
		background: transparent;
		color: var(--muted);
		font: inherit;
		font-size: 13px;
		text-align: left;
		cursor: pointer;
		transition:
			background 150ms ease,
			color 150ms ease;
	}

	.attach-option:hover {
		background: rgba(255, 255, 255, 0.07);
		color: var(--text);
	}

	.attach-icon {
		display: grid;
		width: 16px;
		height: 16px;
		flex: 0 0 auto;
	}

	.attach-icon svg {
		width: 100%;
		height: 100%;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: translateY(6px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: 560px) {
		.prompt-footer {
			align-items: flex-end;
		}

		.shortcut {
			display: none;
		}

		.mode-button {
			padding: 0 10px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			scroll-behavior: auto !important;
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>