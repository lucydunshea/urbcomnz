// nzmap.js

// Load the map into a specific div
export function loadNZMap() {
  const width = 975;
  const height = 610;

  const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

  const svg = d3.select("#map-container") // Target your map container div
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", reset);

  const path = d3.geoPath();
  const g = svg.append("g");

  // Load the TopoJSON data
  d3.json("/static/topojson/nz.json").then(nz => {
    const regions = topojson.feature(nz, nz.objects.regions).features;

    const areas = g.append("g")
        .attr("fill", "#444")
        .attr("cursor", "pointer")
      .selectAll("path")
      .data(regions)
      .join("path")
        .on("click", clicked)
        .attr("d", path);

    // Add titles to regions
    areas.each(function(d) {
        d3.select(this).append("title").text(d => d.properties.name);
    });

    g.append("path")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path(topojson.mesh(nz, nz.objects.regions, (a, b) => a !== b)));

    svg.call(zoom);
  });

  function reset() {
    g.transition().style("fill", null);
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    g.selectAll("path").transition().style("fill", null);
    d3.select(this).transition().style("fill", "red");
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.pointer(event, svg.node())
    );
  }

  function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  }
}
