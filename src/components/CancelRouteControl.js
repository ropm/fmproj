export default class CancelRouteControl {
    onAdd(map) {
        this.map = map;
        this.container = document.createElement('div');
        this.btn = document.createElement('button');
        this.container.appendChild(this.btn);
        this.container.className = 'maplibregl-ctrl';
        this.btn.textContent = 'Peruuta reitin luonti';
        return this.container;
    }

    getButton() {
        return this.btn;
    }

    onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
    }
}
   