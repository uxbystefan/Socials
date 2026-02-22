// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

    namespace svelteHTML {
        interface HTMLAttributes<T> {
            'on:enter'?: (event: CustomEvent) => void;
            'on:leave'?: (event: CustomEvent) => void;
        }
    }
}

export {};
