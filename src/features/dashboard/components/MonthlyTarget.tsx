"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "@/shared/components/dropdown/DropdownItem";
import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import Loading from "@/shared/components/errors/LoadingState";
import { useErrorHandler } from "@/shared/hooks";
import { useDashboardTarget } from "../hooks";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart: ChartJS) => {
    const { ctx, chartArea, data } = chart;
    if (!chartArea) return;

    ctx.save();

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    const fontSize = (chartArea.height / 100).toFixed(2);
    ctx.font = `600 ${fontSize}em Outfit, sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const value = (data.datasets[0].data[0] as number) || 0;
    const text = value.toFixed(2) + "%";

    const color = document.documentElement.classList.contains("dark")
      ? "#FFFFFF"
      : "#1D2939";
    ctx.fillStyle = color;

    const verticalOffset = chartArea.height * 0.1;

    ctx.fillText(text, centerX, centerY + verticalOffset);
    ctx.restore();
  },
};

const DynamicDoughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  { ssr: false },
);

let hasTargetAnimated = false;

export default function MonthlyTarget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: target, isLoading, isError, error } = useDashboardTarget();

  useErrorHandler(isError, error);

  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  const isFirstMount = useRef(!hasTargetAnimated);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, []);

  useGSAP(() => {
    if (!chartWrapperRef.current) return;

    gsap.fromTo(
      chartWrapperRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.94,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.4,
      },
    );
  }, []);

  useGSAP(() => {
    let rafId: number;
    let tween: gsap.core.Tween | undefined;

    const startAnimation = () => {
      if (!chartRef.current || !target) {
        rafId = requestAnimationFrame(startAnimation);
        return;
      }

      const chart = chartRef.current;
      const targetProgress = target.progress;

      const safeUpdate = (value: number) => {
        if (!chart.canvas || !chart.ctx || !chart.canvas.ownerDocument) return;
        chart.data.datasets[0].data = [value, 100 - value];
        chart.update("none");
      };

      if (!isFirstMount.current) {
        safeUpdate(targetProgress);
        return;
      }

      hasTargetAnimated = true;
      isFirstMount.current = false;

      safeUpdate(0);

      const proxy = { v: 0 };

      tween = gsap.to(proxy, {
        v: targetProgress,
        duration: 2,
        ease: "back.out(1.7)",
        onUpdate: () => {
          if (!chart.canvas || !chart.ctx || !chart.canvas.ownerDocument)
            return;
          safeUpdate(proxy.v);
        },
      });
    };

    rafId = requestAnimationFrame(startAnimation);

    return () => {
      cancelAnimationFrame(rafId);
      tween?.kill();
    };
  }, [target]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      chartRef.current?.update("none");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (isLoading || !target) {
    return <Loading />;
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initialData = useMemo<ChartData<"doughnut">>(
    () => ({
      labels: ["Progress", "Remaining"],
      datasets: [
        {
          data: [target.progress, 100 - target.progress],
          backgroundColor: ["#465FFF", "#E4E7EC"],
          borderWidth: 0,
          borderRadius: 100,
          circumference: 180,
          rotation: 270,
        },
      ],
    }),
    [target],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options = useMemo<ChartOptions<"doughnut">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "80%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      animation: false,
    }),
    [],
  );

  return (
  
    <div
      ref={containerRef}
      className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] opacity-0"
    >
      <div className="px-5 pt-5 pb-11 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Target
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Target you’ve set for each month
            </p>
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <span className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <MoreDotIcon />
              </span>
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={() => {
                  closeDropdown();
                  router.push("/sales");
                }}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div ref={chartWrapperRef} className="relative max-h-82.5 opacity-0">
          <div className="w-full h-70">
            <DynamicDoughnut
              ref={chartRef}
              data={initialData}
              options={options}
              plugins={[centerTextPlugin]}
            />
          </div>

          <span
            className={`absolute left-1/2 top-full -translate-x-1/2 translate-y-[-95%] rounded-full px-6 py-2 text-md font-bold ${
              target.growth >= 0
                ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
            }`}
          >
            {target.growth > 0 ? "+" : ""}
            {target.growth}%
          </span>
        </div>

        <p className="w-full mx-auto mt-10 text-sm text-center text-gray-500 max-w-95 sm:text-base">
          You earned ${target.today.toLocaleString()} today. Keep up your good
          work!
        </p>
      </div>


      <div className="flex items-center justify-center gap-5 border-t border-gray-100 px-6 py-3.5 dark:border-gray-800 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Target
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            ${target.target.toLocaleString()}
            <svg
              className={`fill-current ${target.growth < 0 ? "rotate-180" : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.26816 13.6632C7.4056 13.8192 7.60686 13.9176 7.8311 13.9176C7.83148 13.9176 7.83187 13.9176 7.83226 13.9176C8.02445 13.9178 8.21671 13.8447 8.36339 13.6981L12.3635 9.70076C12.6565 9.40797 12.6567 8.9331 12.3639 8.6401C12.0711 8.34711 11.5962 8.34694 11.3032 8.63973L8.5811 11.36L8.5811 2.5C8.5811 2.08579 8.24531 1.75 7.8311 1.75C7.41688 1.75 7.0811 2.08579 7.0811 2.5L7.0811 11.3556L4.36354 8.63975C4.07055 8.34695 3.59568 8.3471 3.30288 8.64009C3.01008 8.93307 3.01023 9.40794 3.30321 9.70075L7.26816 13.6632Z"
                fill="#D92D20"
              />
            </svg>
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Revenue
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            ${target.revenue.toLocaleString()}
            <svg
              className={`fill-current ${target.growth < 0 ? "rotate-180" : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                fill="#039855"
              />
            </svg>
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Today
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            ${target.today.toLocaleString()}
            <svg
              className={`fill-current ${target.growth < 0 ? "rotate-180" : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                fill="#039855"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
