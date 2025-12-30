"use client";

import { ReactNode } from "react";

type AdminCardProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerAction?: ReactNode;
};

export default function AdminCard({
  children,
  title,
  description,
  className = "",
  headerAction,
}: AdminCardProps) {
  return (
    <div
      className={`bg-white dark:bg-[#2a3444] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      {(title || description || headerAction) && (
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
