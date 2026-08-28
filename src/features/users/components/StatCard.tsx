"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: number;
  icon: IconType;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !numberRef.current) {
        return;
      }

      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      const obj = {
        val: 0,
      };

      gsap.to(obj, {
        val: value,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(
              obj.val,
            ).toLocaleString();
          }
        },
      });
    },
    {
      dependencies: [value],
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      className="flex min-h-[140px] h-full w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="min-w-0">
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>

        <span
          ref={numberRef}
          className="block text-3xl font-bold text-gray-900 dark:text-white"
        >
          0
        </span>
      </div>

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}
