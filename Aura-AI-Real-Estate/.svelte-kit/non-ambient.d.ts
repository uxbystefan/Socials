
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/contact" | "/properties" | "/property" | "/property/[id]";
		RouteParams(): {
			"/property/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/contact": Record<string, never>;
			"/properties": Record<string, never>;
			"/property": { id?: string };
			"/property/[id]": { id: string }
		};
		Pathname(): "/" | "/contact" | "/contact/" | "/properties" | "/properties/" | "/property" | "/property/" | `/property/${string}` & {} | `/property/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}