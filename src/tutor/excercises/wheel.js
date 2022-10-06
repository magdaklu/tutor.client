import { select } from "d3-selection";
import { arc, pie } from "d3-shape";

export function getWheelConfig() {
  const w = 250;
  return {
    w: w,
    h: w,
    sliceWidth: w / 10,
    sliceBreak: 3,
    scaleMax: 10,
    sliceStroke: "#70c7e6",
    sliceFill: "#fff",
    sliceOpacity: 0.7,
    sliceSelected: "#ffc107",
  };
}

export function styleSvg(svgRef, width, height) {
  return select(svgRef).style("overflow", "visible");
}

export function cleanCurrentSvg(svg) {
  svg.selectAll("path,text").remove();
}

export function getFormattedData(wheel, step) {
  return pie().value(1)(
    wheel.map((x) => ({ label: x.label, step, score: x.score }))
  );
}

export function addWheelTextPath(step, svg, data, config) {
  if (step + 1 === config.scaleMax) {
    svg
      .selectAll()
      .data(data)
      .join("path")
      .attr(
        "d",
        arc()
          .innerRadius(step * config.sliceWidth)
          .outerRadius((step + 1) * config.sliceWidth - config.sliceBreak)
          .padAngle(0.6)
          .padRadius(4)
      )
      .attr("fill", "none")
      .each(function (d, i) {
        const firstArcSection = /(^.+?)L/;
        const shape = select(this).attr("d");
        const firstArc = firstArcSection.exec(shape);
        const newArc =
          firstArc?.length > 0 ? firstArc[1].replace(/,/g, " ") : shape;
        addHiddenPath(svg, newArc, i);
      });
  }
}

export function addHiddenPath(svg, shape, index) {
  svg
    .append("path")
    .attr("id", "hiddenArc" + 9 + index)
    .attr("d", shape)
    .style("fill", "none");
}
export function addWheelSlices(svg, data, step, config, handleChange) {
  svg
    .selectAll()
    .data(data)
    .join("path")
    .attr(
      "d",
      arc()
        .innerRadius(step * config.sliceWidth)
        .outerRadius((step + 1) * config.sliceWidth - config.sliceBreak)
        .padAngle(0.6)
        .padRadius(4)
        .cornerRadius(6)
    )
    .attr("stroke", config.sliceStroke)
    .attr("fill", (d) => {
      if (d.data.score - 1 < d.data.step) {
        return config.sliceFill;
      }
      return config.sliceSelected;
    })
    .attr("class", (d) => "index" + d.index + " step" + step)
    .style("opacity", config.sliceOpacity)
    .on("mouseover", function (d) {
      select(this).attr("stroke", config.sliceSelected);
    })
    .on("click", handleChange)
    .on("mouseout", function (d) {
      select(this).attr("stroke", config.sliceStroke);
    })
    .attr("id", function (d, i) {
      return "arc_" + step + i;
    });
}

export function addWheelText(svg, data) {
  svg
    .selectAll()
    .data(pie().value(1)(data))
    .join("text")
    .attr("x", 5)
    .attr("dy", -10)
    .append("textPath")
    .attr("startOffset", "50%")
    .style("text-anchor", "middle")
    .attr("xlink:href", function (d, i) {
      return "#hiddenArc" + 9 + i;
    })
    .text((d) => d.data.label);
}

export function getDefaultWheel() {
  return {
    labelString: `Title 1
Title 2
Title 3
Title 4
Title 5
Title 6
Title 7
Title 8\nk`,
    data: [
      { label: "Title 1", score: 0 },
      { label: "Title 2", score: 0 },
      { label: "Title 3", score: 0 },
      { label: "Title 4", score: 0 },
      { label: "Title 5", score: 0 },
      { label: "Title 6", score: 0 },
      { label: "Title 7", score: 0 },
      { label: "Title 8", score: 0 },
    ],
  };
}
