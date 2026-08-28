"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MoreDotIcon } from "@/icons";
import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import { DropdownItem } from "@/shared/components/dropdown/DropdownItem";
import Loading from "@/shared/components/errors/LoadingState";
import { useErrorHandler } from "@/shared/hooks";
import CountryMap from "./CountryMap";
import { useDashboardDemographics } from "../hooks";


gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DemographicCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const {
    data: demographics,
    isLoading,
    isError,
    error,
  } = useDashboardDemographics();


  useErrorHandler(isError, error);


  useGSAP(
    () => {
      if (isLoading || isError || !containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    {
      dependencies: [isLoading, isError],
      scope: containerRef,
    },
  );

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }


  if (isLoading || isError || !demographics) {
    return <Loading />;
  }

  return (
    <div
      ref={containerRef}
      className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 sm:p-6"
      style={{ opacity: 0, willChange: "transform, opacity" }} 
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Customers Demographic
          </h3>

          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Number of customer based on country
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
                router.push("/users");
              }}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
          </Dropdown>
        </div>
      </div>


      <div className="px-4 py-6 my-6 overflow-hidden border border-gray-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-53 w-63 2xsm:w-76.75 xsm:w-89.5 sm:-mx-6 md:w-167 lg:w-158.5 xl:w-98.25 2xl:w-138.5"
        >
          <CountryMap />
        </div>
      </div>

      <div className="space-y-5">
        {demographics.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="items-center w-full rounded-full max-w-8">
                <Image
                  width={48}
                  height={48}
                  src={item.flag}
                  alt={item.country}
                  className="w-full"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {item.country}
                </p>

                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {item.customers.toLocaleString()} Customers
                </span>
              </div>
            </div>

            <div className="flex items-center w-full gap-3 max-w-35">
              <div className="relative block w-full h-2 bg-gray-200 rounded-sm max-w-25 dark:bg-gray-800">
                <div
                  className="absolute top-0 left-0 h-full rounded-sm bg-brand-500"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>

              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {item.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
