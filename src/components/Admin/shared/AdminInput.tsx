"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const baseInputStyles =
  "w-full rounded-lg border bg-white dark:bg-[#1e2836] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200";

const normalBorder =
  "border-gray-300 dark:border-gray-600 focus:border-[#1E468C] focus:ring-[#1E468C]/20";

const errorBorder =
  "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20";

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
  ({ label, error, helpText, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseInputStyles} ${
            error ? errorBorder : normalBorder
          } px-4 py-2.5 text-sm ${className}`}
          {...props}
        />
        {helpText && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

AdminInput.displayName = "AdminInput";

export const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ label, error, helpText, className = "", id, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`${baseInputStyles} ${
            error ? errorBorder : normalBorder
          } px-4 py-2.5 text-sm resize-none ${className}`}
          {...props}
        />
        {helpText && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

AdminTextarea.displayName = "AdminTextarea";

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`${baseInputStyles} ${
            error ? errorBorder : normalBorder
          } px-4 py-2.5 text-sm ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

AdminSelect.displayName = "AdminSelect";
