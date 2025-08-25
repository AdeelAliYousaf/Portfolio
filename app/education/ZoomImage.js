"use client";

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from "next/image";

export default function ZoomImage({ src, alt, className }) {
  return (
    <Zoom overlayBgColorEnd="rgba(0,0,0,0.85)">
      <Image
        src={src}
        alt={alt}
        className={className}
        draggable={false}
        onContextMenu={e => e.preventDefault()}
        width={600}
        height={400}
      />
    </Zoom>
  );
}
