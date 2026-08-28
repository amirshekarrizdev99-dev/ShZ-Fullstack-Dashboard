"use client";

import { motion, type Variants } from "framer-motion";

import UserAddressCard from "@/features/profile/components/UserAddressCard";
import UserInfoCard from "@/features/profile/components/UserInfoCard";
import UserMetaCard from "@/features/profile/components/UserMetaCard";
import { useProfile } from "@/features/profile";
import Loading from "@/shared/components/errors/LoadingState";
import { useErrorHandler } from "@/shared/hooks";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ProfilePageContent() {
  const { data: profile, isLoading, isError, error } = useProfile();

  useErrorHandler(isError, error);

  if (isLoading || !profile) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <UserMetaCard profile={profile} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <UserInfoCard profile={profile} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <UserAddressCard profile={profile} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
