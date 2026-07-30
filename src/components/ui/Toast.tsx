"use client";

import { useEffect, useState } from "react";
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ToastProps {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export function Toast({ id, type, message, onClose, duration = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const icons = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
    error: <ExclamationCircleIcon className="h-5 w-5 text-red-400" />,
    info: <InformationCircleIcon className="h-5 w-5 text-blue-400" />,
    warning: <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" />,
  };

  const backgrounds = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center p-4 rounded-card border shadow-lg transition-all duration-300",
        backgrounds[type],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <div className="flex items-center space-x-3">
        {icons[type]}
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

interface ToastItem {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
}
