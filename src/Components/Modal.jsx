import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Prevents rendering when closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000006a]  z-50">
      <div className="bg-white p-6 relative h-[90%] m-10 my-20 rounded-lg shadow-lg w-full ">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
