/* eslint-disable no-unused-vars */
import { FaDownload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { baseUrl } from "../utils/constan";
import { 
  isAkunFilled, isBiodataFilled, isTempattinggalFilled, isKesehatanFilled, 
  isPendidikanFilled, isAyahFilled, isIbuFilled, isHobiFilled 
} from "../utils/check";

const validationRules = {
  "Biodata": [isAkunFilled],
  "Tempat Tinggal": [isAkunFilled, isBiodataFilled],
  "Kesehatan": [isAkunFilled, isBiodataFilled, isTempattinggalFilled],
  "Pendidikan": [isAkunFilled, isBiodataFilled, isTempattinggalFilled, isKesehatanFilled],
  "Ayah": [isAkunFilled, isBiodataFilled, isTempattinggalFilled, isKesehatanFilled, isPendidikanFilled],
  "Ibu": [isAkunFilled, isBiodataFilled, isTempattinggalFilled, isKesehatanFilled, isPendidikanFilled, isAyahFilled],
  "Wali": [isAkunFilled, isBiodataFilled, isTempattinggalFilled, isKesehatanFilled, isPendidikanFilled, isAyahFilled, isIbuFilled],
  "Hobi": [isAkunFilled, isBiodataFilled, isTempattinggalFilled, isKesehatanFilled, isPendidikanFilled, isAyahFilled, isIbuFilled, isHobiFilled],
};

const HeaderButton = ({ nama, isActive = false, to }) => {
  const navigate = useNavigate();
  
  const bukaDanCek = () => {
    if (validationRules[nama]?.some(fn => !fn())) {
      return alert("Semua data belum terisi");
    }
    navigate(to);
  };

  return (
    <button
      onClick={bukaDanCek}
      className={`px-2 py-4 text-center text-2xl font-bold font-body bg-white text-gray-500 ${isActive ? "border-b-4 border-b-blue-700" : ""}`}
    >
      {nama}
    </button>
  );
};

const HeaderInput = ({ title, word, form, lastpage }) => {
  const params = useParams();
  const ButtonList = [
    { a: "Biodata", b: "biodata" },
    { a: "Tempat Tinggal", b: "tempa" },
    { a: "Kesehatan", b: "kesehatan" },
    { a: "Pendidikan", b: "pendidikan" },
    { a: "Ayah", b: "ayah" },
    { a: "Ibu", b: "ibu" },
    { a: "Wali", b: "wali" },
    { a: "Hobi", b: "hobi" },
    { a: "Perkembangan Siswa", b: "perkembangansiswa", c: true },
    { a: "Selesai Pendidikan", b: "selesaipend", c: true },
  ];

  const downloadPdf = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/export-pdf/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="pt-5">
      <div className="flex flex-row items-center w-full">
        <div className="w-2/3">
          <p className="font-header font-bold text-xl">{word}. {title}</p>
        </div>
        <div className="w-1/3 flex justify-end items-center my-10">
          {!isNaN(params.id) && (
            <button onClick={downloadPdf} className="btn-primary">
              <FaDownload className="mr-2" /> Download
            </button>
          )}
          {!isNaN(params.id) && (
            <div className="btn-secondary">
              <FaDownload className="mr-2" /> Print
            </div>
          )}
          {params.action === "upload" && lastpage && (
            <div className="btn-submit">Simpan</div>
          )}
        </div>
      </div>
      <div className={`grid grid-cols-${Math.min(ButtonList.length, 10)} border w-full`}>
        {ButtonList.map((t, i) => (
          (!t.c || form === "admin") && (
            <HeaderButton
              key={i}
              to={`/${form}/${form === "admin" ? "audit" : "data"}/${params.action}/${t.b}`}
              nama={t.a}
              isActive={title === t.a}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default HeaderInput;