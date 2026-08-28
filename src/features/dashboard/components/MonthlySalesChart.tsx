"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import dynamic from "next/dynamic";
import { useState, useSyncExternalStore, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "@/shared/components/dropdown/DropdownItem";
import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import type { SalesData } from "../types";

interface Props {
  sales: SalesData[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DynamicBarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  { ssr: false },
);

function useIsDarkMode() {
  return useSyncExternalStore(
    (callback) => {
      const observer = new MutationObserver(callback);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

let hasSalesAnimated = false;

export default function MonthlySalesChart({ sales }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = useIsDarkMode();
  const router = useRouter();

  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(!hasSalesAnimated);

  const targetData = useMemo(() => sales.map((item) => item.sales), [sales]);
  const maxValue = targetData.length ? Math.max(...targetData) : 0;

  const [chartData] = useState({
    labels: sales.map((item) => item.month),
    datasets: [
      {
        label: "Sales",
        data: targetData.map(() => 0),
        borderRadius: 8,
        backgroundColor: ["#465FFF", "#E4E7EC"],
      },
    ],
  });

  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            font: {
              family: "Outfit, sans-serif",
              size: 12,
            },
            color: isDark ? "#ffffff" : "#374151",
            boxWidth: 15,
            boxHeight: 15,
          },
        },
        tooltip: {
          callbacks: {
            title: () => "",
            label: (context) => `${context.raw}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: isDark ? "#9ca3af" : "#6b7280",
            font: { family: "Outfit, sans-serif" },
          },
        },
        y: {
          min: 0,
          max: Math.ceil((maxValue * 1.1) / 10) * 10 || 10,
          grid: {
            color: isDark ? "#374151" : "#f3f4f6",
          },
          border: {
            display: false,
            dash: [5, 5],
          },
          ticks: {
            color: isDark ? "#9ca3af" : "#6b7280",
            font: { family: "Outfit, sans-serif" },
          },
        },
      },
    }),
    [isDark, maxValue],
  );

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
        delay: 0.1,
      },
    );
  }, []);

  useGSAP(() => {
    if (!chartWrapperRef.current) return;

    gsap.fromTo(
      chartWrapperRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  useGSAP(() => {
    if (!sales.length) return;

    let rafId: number;
    let tween: gsap.core.Tween | undefined;

    const startAnimation = () => {
      if (!chartRef.current) {
        rafId = requestAnimationFrame(startAnimation);
        return;
      }

      const chart = chartRef.current;

      const safeUpdate = (values: number[]) => {
        if (!chart.canvas || !chart.ctx || !chart.canvas.ownerDocument) return;
        chart.data.datasets[0].data = values;
        chart.update("none");
      };

      if (!isFirstMount.current) {
        safeUpdate(targetData);
        return;
      }

      hasSalesAnimated = true;
      isFirstMount.current = false;

      const proxy = targetData.map(() => ({ v: 0 }));

      safeUpdate(proxy.map((p) => p.v));

      tween = gsap.to(proxy, {
        v: (i: number) => targetData[i],
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.08,
        delay: 0.45,
        onUpdate: () => {
          if (!chart.canvas || !chart.ctx || !chart.canvas.ownerDocument)
            return;
          safeUpdate(proxy.map((p) => p.v));
        },
      });
    };

    rafId = requestAnimationFrame(startAnimation);

    return () => {
      cancelAnimationFrame(rafId);
      tween?.kill();
    };
  }, [sales, targetData]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="px-5 pt-5 overflow-hidden bg-white border border-gray-200 opacity-0 rounded-2xl dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Sales
        </h3>

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

      <div
        ref={chartWrapperRef}
        className="max-w-full overflow-x-auto opacity-0 custom-scrollbar"
      >
        <div className="-ml-5 min-w-162.5 xl:min-w-full pl-2 h-55 mt-4">
          <DynamicBarChart ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
