"use client";

import { motion, type Variants } from "framer-motion";

export default function AnimatedLogo500() {
  const blockVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: delay,
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  return (
    <motion.svg
      width="562"
      height="156"
      viewBox="0 0 562 156"
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
        initial={{ x: -150, opacity: 0, rotate: -20 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 15 }}
      >
        <rect
          x="0.161133"
          y="13.4292"
          width="32.6255"
          height="71"
          rx="6.26271"
          fill="#465FFF"
        />
        <rect
          x="0.161133"
          y="13.4292"
          width="32.6255"
          height="71"
          rx="6.26271"
          stroke="#465FFF"
        />
        <rect
          x="88.2891"
          y="80.1499"
          width="32.6255"
          height="63.5801"
          rx="6.26271"
          fill="#465FFF"
        />
        <rect
          x="88.2891"
          y="80.1499"
          width="32.6255"
          height="63.5801"
          rx="6.26271"
          stroke="#465FFF"
        />
        <rect
          x="15.5254"
          y="33.4673"
          width="32.6255"
          height="105.389"
          rx="6.26271"
          transform="rotate(-90 15.5254 33.4673)"
          fill="#465FFF"
        />
        <rect
          x="15.5254"
          y="33.4673"
          width="32.6255"
          height="105.389"
          rx="6.26271"
          transform="rotate(-90 15.5254 33.4673)"
          stroke="#465FFF"
        />
        <rect
          x="0.161133"
          y="155.16"
          width="30"
          height="107.028"
          rx="6.26271"
          transform="rotate(-90 0.161133 155.16)"
          fill="#465FFF"
        />
        <rect
          x="0.161133"
          y="155.16"
          width="30"
          height="107.028"
          rx="6.26271"
          transform="rotate(-90 0.161133 155.16)"
          stroke="#465FFF"
        />
        <rect
          x="15.5254"
          y="96.3398"
          width="32.6255"
          height="91.6638"
          rx="6.26271"
          transform="rotate(-90 15.5254 96.3398)"
          fill="#465FFF"
        />
        <rect
          x="15.5254"
          y="96.3398"
          width="32.6255"
          height="91.6638"
          rx="6.26271"
          transform="rotate(-90 15.5254 96.3398)"
          stroke="#465FFF"
        />
      </motion.g>

      <motion.rect
        x="162.915"
        y="12.8496"
        width="166.462"
        height="130.311"
        rx="28"
        stroke="#465FFF"
        strokeWidth="24"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.2, delay: 0.8, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 0.8 },
        }}
      />

      <motion.rect
        custom={1.6}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="213.52"
        y="42.0287"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={1.7}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="257.168"
        y="42.0287"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={1.8}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="268.618"
        y="98.558"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={1.9}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="202.071"
        y="98.558"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={2.0}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="217.813"
        y="83.1732"
        width="57.5655"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />

      <motion.rect
        x="383.377"
        y="12.8496"
        width="166.462"
        height="130.311"
        rx="28"
        stroke="#465FFF"
        strokeWidth="24"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.2, delay: 1.2, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 1.2 },
        }}
      />

      <motion.rect
        custom={2.0}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="433.982"
        y="42.0287"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={2.1}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="477.63"
        y="42.0287"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={2.2}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="489.079"
        y="98.558"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={2.3}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="422.533"
        y="98.558"
        width="22.1453"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
      <motion.rect
        custom={2.4}
        variants={blockVariants}
        initial="hidden"
        animate="visible"
        x="438.275"
        y="83.1732"
        width="57.5655"
        height="20.7141"
        rx="2.63433"
        fill="#465FFF"
        stroke="#465FFF"
        strokeWidth="0.752667"
      />
    </motion.svg>
  );
}
