import maplibregl from 'maplibre-gl';

document.addEventListener("DOMContentLoaded", function() {
    let map;

    document.getElementById('map').addEventListener('dblclick', function() {
        if (!map) {
            map = new maplibregl.Map({
                container: 'map', // ID of the map div
                // style: 'https://basemaps.linz.govt.nz/v1/tiles/aerial/NZTM2000Quad/WMTSCapabilities.xml?api=c01jcecejtejc8fts2c7g6v132s', // Example style URL
                center: [174.885971, -40.900557],
                zoom: 5,
                sources: {
                    "maplibre-demotiles": {
                        "type": "vector",
                        "url": "https://demotiles.maplibre.org/tiles/tiles.json"
                    },
                    "maplibre-tilejson": {
                        "type": "vector",
                        "url": "http://api.example.com/tilejson.json"
                    },
                    "maplibre-streets": {
                        "type": "vector",
                        "tiles": [
                            "http://a.example.com/tiles/{z}/{x}/{y}.pbf",
                            "http://b.example.com/tiles/{z}/{x}/{y}.pbf"
                        ],
                        "maxzoom": 14
                    },
                    "wms-imagery": {
                        "type": "raster",
                        "tiles": [
                            "http://a.example.com/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=example"
                        ],
                        "tileSize": 256
                    }
                }
            });
        }
    });
});