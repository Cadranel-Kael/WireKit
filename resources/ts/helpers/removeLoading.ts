export function removeLoading() {
    const loadingElements = document.querySelectorAll('[loading]');
    loadingElements.forEach((el) => el.removeAttribute('loading'));
}
