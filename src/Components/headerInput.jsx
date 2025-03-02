/* eslint-disable no-unused-vars */
import { FaDownload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import {
  isAkunFilled,
  isBiodataFilled,
  isTempattinggalFilled,
  isKesehatanFilled,
  isPendidikanFilled,
  isAyahFilled,
  isIbuFilled,
  isHobiFilled,
} from "../utils/check";
import { baseUrl } from "../utils/constan";
import axios from "axios";


/* 

=====================================================================================================
                    H E A D E R _ I N P U T _ C O M P O N E N T 
  >> Developed By. Ananda Eka <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const HeaderButton = ({ nama, isActive = false, to }) => {
  const navigate = useNavigate();

  const bukaDanCek = () => {
    switch (nama) {
      case "Biodata":
        if (!isAkunFilled()) return alert("Semua data belum terisi");
        break;
      case "Tempat Tinggal":
        if (!(isAkunFilled() && isBiodataFilled()))
          return alert("Semua data belum terisi");
        break;
      case "Kesehatan":
        if (!(isAkunFilled() && isBiodataFilled() && isTempattinggalFilled()))
          return alert("Semua data belum terisi");
        break;
      case "Pendidikan":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Ayah":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Ibu":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled() &&
            isAyahFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Wali":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled() &&
            isAyahFilled() &&
            isIbuFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Hobi":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled() &&
            isAyahFilled() &&
            isIbuFilled() &&
            isHobiFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
    }
    navigate(to);
  };

  if (!isActive) {
    return (
      <button
        onClick={bukaDanCek}
        className="px-2 py-2 text-center text-lg font-bold font-body bg-white text-gray-500"
      >
        {nama}
      </button>
    );
  } else {
    return (
      <button
        onClick={bukaDanCek}
        className="px-2 py-2 text-center text-lg font-bold font-body bg-white text-gray-500 border-b-2  border-b-blue-700"
      >
        {nama}
      </button>
    );
  }
};

const HeaderInput = ({ title, word, form, lastpage }) => {
  const params = useParams();
  const ButtonList = [
    { a: "Data Diri Siswa", b: "biodata" },
    { a: "Tempat Tinggal Siswa", b: "tempattinggal" },
    { a: "Kesehatan Siswa", b: "kesehatan" },
    { a: "Pendidikan Siswa", b: "pendidikan" },
    { a: "Keterangan Ayah", b: "ayah" },
    { a: "Keterangan Ibu", b: "ibu" },
    { a: "Keterangan Wali", b: "wali" },
    { a: "Hobi Siswa", b: "hobi" },
    {
      a: "Perkembangan Siswa",
      b: "perkembangansiswa",
      c: true
    },
    { a: "Selesai Pendidikan", b: "selesaipend", c: true },
  ];

  const downloadPdf = async () => {
    console.log(baseUrl, params.id)
    const response = await axios.get(`${baseUrl}/admin/export-pdf/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: 'blob', // Untuk menerima data dalam format blob (binary large object)
    });
    console.log(localStorage.getItem("token"))
    // Buat URL dari blob yang diterima
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); // Nama file yang diunduh
    document.body.appendChild(link);
    link.click();

    // Hapus URL dan elemen link setelah selesai
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  
  const totalCols = ButtonList.some((t) => t.b === "perkembangansiswa" || t.b === "selesaipend") ? "grid grid-cols-10" : "grid grid-cols-10";

  return (
    <div className="pt-5">
      <div className="flex flex-row items-center w-full">
        <div className="w-[63%] h-full">
          <p className="font-header font-bold text-xl">
            {word}. {title}
          </p>
        </div>
        <div className="w-[63%] h-full flex justify-end items-center my-10">
          {!isNaN(params.id) ? (
            <button
              onClick={downloadPdf}
              className="flex flex-row justify-center items-center px-5 py-2 mr-6 text-center text-m font-bold font-body rounded-md"
            >
              <FaDownload className="mr-2" /> Download
            </button>
          ) : null}
          {params.action === "upload" && lastpage ? (
            <div className="px-5 py-2 text-center text-m font-bold font-body bg-[#0C7FDA] text-white rounded-md">
              Simpan
            </div>
          ) : null}
        </div>
      </div>
      <div className={`grid md:${totalCols} border-b-gray-400`}>
        {ButtonList.map((t, i) => {
          if (t.c && form !== "admin") return null;
          return (
            <HeaderButton
              key={i}
              to={
                form == "admin"
                  ? `/${form}/lihat/${params.id}/${t.b}`
                  : `/${form}/data/${params.action}/${t.b}`
              }
              nama={t.a}
              isActive={title === t.a ? true : false}
              
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeaderInput;
