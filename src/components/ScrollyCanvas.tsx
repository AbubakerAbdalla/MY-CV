"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

function useImageSequence() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const urls = Array.from({ length: 120 }, (_, i) => 
      `/sequence/frame_${i.toString().padStart(3, '0')}_delay-0.066s.webp`
    );

    const loadedImages: HTMLImageElement[] = [];
    urls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImages[i] = img;
      };
      loadedImages[i] = img; // store it even if incomplete to keep order
    });

    setImages(loadedImages);
  }, []);

  return images;
}

export function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useImageSequence();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 119]);

  const drawImage = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return; // Might not be loaded yet

    const draw = () => {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
    
    if (img.complete) {
        draw();
    } else {
        img.onload = draw;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawImage(Math.round(frameIndex.get()));
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); 
    
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawImage(Math.round(latest));
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
