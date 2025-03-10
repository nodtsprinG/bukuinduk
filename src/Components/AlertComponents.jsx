// src/components/AlertComponent.jsx
import React from "react";
import Swal from "sweetalert2";

const AlertComponent = () => {
  const showCustomAlert = () => {
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil disimpan.",
      icon: "success",
      confirmButtonText: "Mantap!"
    });
  };

  return (
    <button
      onClick={showCustomAlert}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Tampilkan Alert
    </button>
  );
};

export default AlertComponent;
