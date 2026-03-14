export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

type AddToastOptions = {
  message: string;
  type: ToastType;
  duration?: number;
};

export const useToast = () => {
  // Nuxt SSR-safe global state (per-request on server; shared on client)
  const toasts = useState<Toast[]>("toasts", () => []);
  const counter = useState<number>("toastCounter", () => 0);

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) toasts.value.splice(index, 1);
  };

  const addToast = (options: AddToastOptions) => {
    const id =
      globalThis.crypto?.randomUUID?.() ?? `toast-${++counter.value}`;

    const toast: Toast = {
      id,
      message: options.message,
      type: options.type,
      duration: options.duration ?? 3000,
    };

    toasts.value.push(toast);

    if (import.meta.client && toast.duration > 0) {
      setTimeout(() => removeToast(id), toast.duration);
    }

    return id;
  };

  const success = (message: string, duration?: number) =>
    addToast({ message, type: "success", duration });

  const error = (message: string, duration?: number) =>
    addToast({ message, type: "error", duration });

  const info = (message: string, duration?: number) =>
    addToast({ message, type: "info", duration });

  const warning = (message: string, duration?: number) =>
    addToast({ message, type: "warning", duration });

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
};

