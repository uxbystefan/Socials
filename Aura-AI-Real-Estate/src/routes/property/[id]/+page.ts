import { error } from '@sveltejs/kit';
import { properties } from '$lib/data';

export function load({ params }) {
    const property = properties.find(p => p.id === params.id);

    if (property) {
        return {
            property
        };
    }

    throw error(404, 'Not found');
}
