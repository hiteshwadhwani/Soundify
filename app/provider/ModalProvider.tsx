"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal"
import AuthModal from "@/components/AuthModel";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted == false) {
    return null;
  }
  return (
    <AuthModal />
  );
};
export default ModalProvider