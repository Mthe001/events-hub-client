"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

export const ScrollProgress = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed top-0 right-0 z-[1000] w-1 h-full origin-top bg-gradient-to-b from-[#808080] via-[#87CEEB] to-[#0000FF]",
        className
      )}
      style={{
        scaleY,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";