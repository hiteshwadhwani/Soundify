"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal"
import AuthModal from "@/components/AuthModel";
import UploadModal from '@/components/UploadModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted == false) {
    return null;
  }
  return (
    <>
    <AuthModal />
    <UploadModal />
    </>
  );
};
export default ModalProvider