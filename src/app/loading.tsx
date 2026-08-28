"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-8 bg-transparent">
      <div className="relative flex items-center justify-center w-20 h-20">
        <motion.div
          className="absolute w-4 h-4 bg-indigo-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 border-2 border-indigo-500 rounded-full"
            animate={{
              scale: [1, 2.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-1">
        {"Loading...".split("").map((char, i) => (
          <motion.span
            key={i}
            className="text-sm font-medium text-indigo-500"
            animate={{
              y: [0, -5, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
