import maplibregl from 'maplibre-gl';

document.addEventListener("DOMContentLoaded", function() {
    const map = new maplibregl.Map({
        container: 'map', // ID of the map div
        style: 'https://basemaps.linz.govt.nz/v1/tiles/aerial/NZTM2000Quad/WMTSCapabilities.xml?api=c01jcecejtejc8fts2c7g6v132s', // Example style URL
        center: [174.885971, -40.900557],
        zoom: 5
    });
});