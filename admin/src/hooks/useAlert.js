import { useCallback } from "react";
import { message } from "antd";

// Custom hook to show alert messages
export const useMessage = () => {
  const showMessage = useCallback((type, content) => {
    message[type](content);
  }, []);

  return { showMessage };
};
