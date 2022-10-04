import { arc, pie } from "d3-shape";
import styles from "./WheelTask.module.css";
import { useState, useRef, useEffect } from "react";
import { select, selectAll } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

export const WheelTask = () => {
  const [data] = useState([
    { property: "test", value: 4 },
    { property: "2", value: 4 },
    { property: "3", value: 4 },
    { property: "4", value: 4 },
    { property: "5", value: 4 },
    { property: "6", value: 4 },
    { property: "7", value: 4 },
    { property: "8", value: 4 },
  ]);
  const svgRef = useRef();

  useEffect(() => {
    const w = 500;
    const h = 500;
    const slice = w / 20;
    const sliceBreak = 3;
    const svg = select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "400px")
      .style("margin-left", "400px");

    const formatted = pie().value(1)(data);

    for (let step = 0; step < 10; step++) {
      let arcGenerator = arc()
        .innerRadius(step * slice)
        .outerRadius((step + 1) * slice - sliceBreak)
        .padAngle(0.6)
        .padRadius(4)
        .cornerRadius(6);
      svg
        .selectAll()
        .data(formatted)
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", "#fff")
        .style("opacity", 0.4)
        .on("mouseover", function (d) {
          select(this).attr("fill", "#2f5664");
        })
        .on("click", changeStyle)
        .on("mouseout", function (d) {
          select(this).attr("fill", "#fff");
        });

      function changeStyle(d, i, data) {
        select(this).attr("stroke", "black");
        console.log("changeStyle d", d);
        console.log("changeStyle i", i);
        console.log("changeStyle data", data);
      }
    }

    svg
      .selectAll()
      .data(formatted)
      .join("text")
      .text((d) => d.data.property)
      .attr("transform", (d) => {
        d.innerRadius = 0;
        d.outerRadius = w / 2 + 20;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return `rotate(${
          (d.angle * 180) / Math.PI - 90 - 0.5 * Math.PI
        })translate(${d.outerRadius - 10})`;
      })
      .attr("text-anchor", "start");
  }, [data]);

  return (
    <div className={styles.wheel}>
      <svg ref={svgRef}></svg>
    </div>
  );
};
