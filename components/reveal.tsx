"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-ira-reveal="true"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : delay, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
