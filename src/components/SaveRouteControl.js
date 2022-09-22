export default class SaveRouteControl {
    onAdd(map) {
        this.map = map;
        this.container = document.createElement('div');
        this.btn = document.createElement('button');
        this.container.appendChild(this.btn);
        this.container.className = 'maplibregl-ctrl';
        this.btn.textContent = 'Tallenna reitti';
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
    