"use client";

import { motion } from "framer-motion";

type AnimatedDashboardIconProps = {
  size?: number | string;
  className?: string;
};

export const AnimatedDashboardIcon = ({
  className,
}: AnimatedDashboardIconProps) => {
  const paths = [
    "M15 1H5V3H15V1Z",
    "M1 5H15V7H1V5Z",
    "M15 9H5V11H15V9Z",
    "M15 13H1V15H15V13Z",
  ];

  return (
    <motion.div
      className={className}
      style={{ display: "inline-block", perspective: 1000, marginLeft: "72px" }}
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6,
      }}
      whileHover={{ scale: 1.15, rotateY: 15, rotateX: -15 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        width="100px"
        height="100px"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(90)"
        style={{
          filter: "drop-shadow(0px 2px 8px rgba(40, 86, 226, 0.4))",
        }}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.064"
        ></g>
        <motion.g id="SVGRepo_iconCarrier">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="#2856e2"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 1, 0.4, 1],
                opacity: [0, 1, 1, 1, 1],
                fill: ["#2856e2", "#4a90e2", "#2856e2", "#00d4ff", "#2856e2"],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.3, 0.5, 0.75, 1],
                delay: i * 0.1,
                ease: "easeInOut",
              }}
              style={{
                transformBox: "fill-box",
                transformOrigin: i % 2 === 0 ? "right" : "left",
              }}
            />
          ))}
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};
