import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1e293b",
          color: "#fff",
          borderRadius: "10px",
          fontWeight: 500,
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#ffffff",
          },
          style: {
            background: "#22c55e",
            color: "#ffffff",
          },
        },
        error: {
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
