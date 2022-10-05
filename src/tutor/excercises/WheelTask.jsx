import { arc, pie } from "d3-shape";
import styles from "./WheelTask.module.css";
import { useRef, useEffect } from "react";
import { select } from "d3-selection";

export const WheelTask = ({ wheel, setScore }) => {
  const svgRef = useRef();

  useEffect(() => {
    const w = 250;
    const h = w;
    const slice = w / 10;
    const sliceBreak = 3;
    const scaleMax = 10;
    const sliceStroke = "#70c7e6";
    const sliceFill = "#fff";
    const sliceOpacity = 0.7;
    const sliceSelected = "#ffc107"; //"#6d4bb9";

    const svg = select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", w + "px")
      .style("margin-left", w + "px");

    svg.selectAll("path,text").remove();

    for (let step = 0; step < scaleMax; step++) {
      let formatted = pie().value(1)(
        wheel.map((x) => ({ id: x.id, label: x.label, step, score: x.score }))
      );

      if (step + 1 === scaleMax) {
        svg
          .selectAll()
          .data(formatted)
          .join("path")
          .attr(
            "d",
            arc()
              .innerRadius(step * slice)
              .outerRadius((step + 1) * slice - sliceBreak)
              .padAngle(0.6)
              .padRadius(4)
          )
          .attr("fill", "none")
          .each(function (d, i) {
            var firstArcSection = /(^.+?)L/;
            var newArc = firstArcSection.exec(select(this).attr("d"))[1];
            newArc = newArc.replace(/,/g, " ");
            svg
              .append("path")
              .attr("id", "hiddenArc" + step + i)
              .attr("d", newArc)
              .style("fill", "none");
          });
      }

      svg
        .selectAll()
        .data(formatted)
        .join("path")
        .attr(
          "d",
          arc()
            .innerRadius(step * slice)
            .outerRadius((step + 1) * slice - sliceBreak)
            .padAngle(0.6)
            .padRadius(4)
            .cornerRadius(6)
        )
        .attr("stroke", sliceStroke)
        .attr("fill", (d) => {
          if (d.data.score - 1 < d.data.step) {
            return sliceFill;
          }
          return sliceSelected;
        })
        .attr("class", (d) => "index" + d.index + " step" + step)
        .style("opacity", sliceOpacity)
        .on("mouseover", function (d) {
          select(this).attr("stroke", sliceSelected);
        })
        .on("click", handleChange)
        .on("mouseout", function (d) {
          select(this).attr("stroke", sliceStroke);
        })
        .attr("id", function (d, i) {
          return "arc_" + step + i;
        });

      function handleChange(d, i) {
        setScore(i);
      }
    }

    svg
      .selectAll()
      .data(pie().value(1)(wheel))
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
  }, [wheel, setScore]);

  return (
    <div className={styles.wheel}>
      <svg ref={svgRef}></svg>
    </div>
  );
};
