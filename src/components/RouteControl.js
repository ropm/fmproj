export default class HelloWorldControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('button');
        this._container.className = 'maplibregl-ctrl';
        this._container.textContent = 'test';
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}
    