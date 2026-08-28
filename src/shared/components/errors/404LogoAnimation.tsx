"use client";

import { motion, type Variants } from "framer-motion";

export default function AnimatedLogo404() {
  const blockVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1 + i * 0.15,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  return (
    <motion.svg
      width="472"
      height="158"
      viewBox="0 0 472 158"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.g
        initial={{ x: -100, opacity: 0, rotate: -45 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 150, damping: 15 }}
      >
        <rect
          x="0.0405273"
          y="0.522461"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          fill="#465FFF"
        />
        <rect
          x="0.0405273"
          y="0.522461"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          stroke="#465FFF"
        />
        <rect
          x="75.8726"
          y="3.16748"
          width="32.6255"
          height="154.31"
          rx="6.26271"
          fill="#465FFF"
        />
        <rect
          x="75.8726"
          y="3.16748"
          width="32.6255"
          height="154.31"
          rx="6.26271"
          stroke="#465FFF"
        />
        <rect
          x="16.7939"
          y="91.3442"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          transform="rotate(-90 16.7939 91.3442)"
          fill="#465FFF"
        />
        <rect
          x="16.7939"
          y="91.3442"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          transform="rotate(-90 16.7939 91.3442)"
          stroke="#465FFF"
        />
      </motion.g>

      <motion.g
        initial={{ x: 100, opacity: 0, rotate: 45 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 150, damping: 15 }}
      >
        <rect
          x="363.502"
          y="0.522461"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          fill="#465FFF"
        />
        <rect
          x="363.502"
          y="0.522461"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          stroke="#465FFF"
        />
        <rect
          x="439.334"
          y="3.16748"
          width="32.6255"
          height="154.31"
          rx="6.26271"
          fill="#465FFF"
        />
        <rect
          x="439.334"
          y="3.16748"
          width="32.6255"
          height="154.31"
          rx="6.26271"
          stroke="#465FFF"
        />
        <rect
          x="380.255"
          y="91.3442"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          transform="rotate(-90 380.255 91.3442)"
          fill="#465FFF"
        />
        <rect
          x="380.255"
          y="91.3442"
          width="32.6255"
          height="77.5957"
          rx="6.26271"
          transform="rotate(-90 380.255 91.3442)"
          stroke="#465FFF"
        />
      </motion.g>

      <motion.rect
        x="152.769"
        y="15.167"
        width="166.462"
        height="130.311"
        rx="28"
        stroke="#465FFF"
        strokeWidth="24"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,

          scale: [1, 1.02, 1],
        }}
        transition={{
          pathLength: { duration: 1.5, ease: "easeInOut" },
          opacity: { duration: 0.5 },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          },
        }}
      />

      <motion.rect
        custom={0}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="203.103"
        y="41.7015"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        strokeWidth="0.752667"
        stroke="#465FFF"
      />
      <motion.rect
        custom={1}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="246.752"
        y="41.7015"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        strokeWidth="0.752667"
        stroke="#465FFF"
      />
      <motion.rect
        custom={2}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="258.201"
        y="98.2303"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        strokeWidth="0.752667"
        stroke="#465FFF"
      />
      <motion.rect
        custom={3}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="191.654"
        y="98.2303"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        strokeWidth="0.752667"
        stroke="#465FFF"
      />
      <motion.rect
        custom={4}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="207.396"
        y="82.847"
        width="57.5655"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        strokeWidth="0.752667"
        stroke="#465FFF"
      />
    </motion.svg>
  );
}
