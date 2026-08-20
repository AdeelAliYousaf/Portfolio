import Reveal from "./Reveal";
import type { CSSProperties } from "react";

const SHAPES = {
  12: {
    viewBox: "0 0 200 200",
    points:
      "100.0,4.0 117.6,34.3 148.0,16.9 148.1,51.9 183.1,52.0 165.7,82.4 196.0,100.0 165.7,117.6 183.1,148.0 148.1,148.1 148.0,183.1 117.6,165.7 100.0,196.0 82.4,165.7 52.0,183.1 51.9,148.1 16.9,148.0 34.3,117.6 4.0,100.0 34.3,82.4 16.9,52.0 51.9,51.9 52.0,16.9 82.4,34.3",
    textX: 100,
    textY: 106,
    fontSize: 30,
  },
  10: {
    viewBox: "0 0 160 160",
    points:
      "80.0,6.0 95.5,32.4 123.5,20.1 120.5,50.6 150.4,57.1 130.0,80.0 150.4,102.9 120.5,109.4 123.5,139.9 95.5,127.6 80.0,154.0 64.5,127.6 36.5,139.9 39.5,109.4 9.6,102.9 30.0,80.0 9.6,57.1 39.5,50.6 36.5,20.1 64.5,32.4",
    textX: 80,
    textY: 86,
    fontSize: 26,
  },
} as const;

type BurstProps = {
  label: string;
  points?: 10 | 12;
  fill: string;
  textFill?: string;
  style: CSSProperties;
};

/** The site's signature moment: a comic sound-effect stamp that pops in on scroll. */
export default function Burst({ label, points = 10, fill, textFill = "var(--ink)", style }: BurstProps) {
  const shape = SHAPES[points];
  return (
    <Reveal as="svg" className="burst" style={style} viewBox={shape.viewBox} aria-hidden="true">
      <polygon points={shape.points} fill={fill} />
      <text x={shape.textX} y={shape.textY} fontSize={shape.fontSize} fill={textFill}>
        {label}
      </text>
    </Reveal>
  );
}
