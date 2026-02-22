export function viewport(node: HTMLElement, { root = null, rootMargin = '0px', threshold = 0.2, once = true } = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.dispatchEvent(new CustomEvent('enter'));
                if (once) observer.unobserve(node);
            } else {
                node.dispatchEvent(new CustomEvent('leave'));
            }
        });
    }, { root, rootMargin, threshold });

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
