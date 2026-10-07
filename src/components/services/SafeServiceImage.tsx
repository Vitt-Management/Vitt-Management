"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_SERVICE_IMAGE = "/images/service-pf.jpg";

interface SafeServiceImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

export default function SafeServiceImage({
  src,
  alt,
  fill,
  sizes,
  className,
  priority,
  style,
}: SafeServiceImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      style={style}
      onError={() => {
        if (imageSrc !== FALLBACK_SERVICE_IMAGE) setImageSrc(FALLBACK_SERVICE_IMAGE);
      }}
    />
  );
}
