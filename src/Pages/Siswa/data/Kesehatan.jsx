import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import { useNavigate, useParams } from "react-router";
/* 

=====================================================================================================
                    D A T A _ K E S E H A T A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const Kesehatan = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [goldarah, setGoldarah] = useState("");
  const [goldarahlain, setGoldarahlain] = useState("");
  const [penyakit, setPenyakit] = useState("");
  const [jasmani, setJasmani] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [berat, setBerat] = useState("");

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("kesehatan-goldarah")) {
      const storedGoldarah = localStorage.getItem("kesehatan-goldarah");
      let darah = ["A", "B", "O", "AB"];
      if (!darah.includes(storedGoldarah)) {
        setGoldarah("lainnya");
        setGoldarahlain(localStorage.getItem("kesehatan-goldarahlain"));
      } else if (storedGoldarah === "tidak diketahui") {
        setGoldarah("tidak diketahui");
      } else {
        setGoldarah(storedGoldarah);
      }
    }
    if (localStorage.getItem("kesehatan-penyakit") !== "null")
      setPenyakit(localStorage.getItem("kesehatan-penyakit"));
    if (localStorage.getItem("kesehatan-jasmani") !== "null")
      setJasmani(localStorage.getItem("kesehatan-jasmani"));
    if (localStorage.getItem("kesehatan-tinggi"))
      setTinggi(localStorage.getItem("kesehatan-tinggi"));
    if (localStorage.getItem("kesehatan-berat"))
      setBerat(localStorage.getItem("kesehatan-berat"));
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/tempattinggal`);
  };

  const nextButton = () => {
    console.log(
      goldarah == "lainnya"
        ? goldarahlain
        : goldarah, penyakit, jasmani, tinggi, berat
    );
    if (
      goldarah == "lainnya"
        ? goldarahlain
        : goldarah && tinggi && berat
    ) {
      localStorage.setItem(
        "kesehatan-goldarah",
        goldarah == "lainnya" ? goldarahlain : goldarah
      );
      localStorage.setItem("kesehatan-penyakit", penyakit ? penyakit : null);
      localStorage.setItem("kesehatan-jasmani", jasmani ? jasmani : null);
      localStorage.setItem("kesehatan-tinggi", tinggi);
      localStorage.setItem("kesehatan-berat", berat);
      navigate(`/siswa/data/${params.action}/pendidikan`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 rounded-lg text-lg overflow-y-auto">
      <HeaderInput title="Kesehatan Siswa" word="C" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Golongan Darah */}
          <div className="col-span-2">
            <div className="w-[75%]">
              <label className="block font-medium mb-1">Golongan Darah</label>
              <select
                value={goldarah}
                onChange={(e) => setGoldarah(e.target.value)}
                className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              >
                <option value="default" hidden>Pilih</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
                <option value="lainnya">Lainnya</option>
                <option value="tidak diketahui">Tidak Diketahui</option>
              </select>
            </div>
          </div>

          {/* Penyakit yang Pernah Diderita */}
          <div>
            <label className="block font-medium mb-1">Penyakit yang Pernah Diderita</label>
            <TextInput value={penyakit} onChange={(e) => setPenyakit(e.target.value)} />
          </div>

          {/* Kelainan Jasmani */}
          <div>
            <label className="block font-medium mb-1">Kelainan Jasmani</label>
            <TextInput value={jasmani} onChange={(e) => setJasmani(e.target.value)} />
          </div>

          {/* Tinggi Badan */}
          <div>
            <label className="block font-medium mb-1">Tinggi Badan (cm)</label>
            <div className="flex items-center">
              <IntegerInput value={tinggi} onChange={(e) => setTinggi(e.target.value)} />
              <span className="ml-2 text-lg text-gray-700">CM</span>
            </div>
          </div>

          {/* Berat Badan */}
          <div>
            <label className="block font-medium mb-1">Berat Badan (kg)</label>
            <div className="flex items-center">
              <IntegerInput value={berat} onChange={(e) => setBerat(e.target.value)} />
              <span className="ml-2 text-lg text-gray-700">KG</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Navigasi */}
      <div className="grid grid-cols-2 space-x-2 mt-4">
        <Nextbefore back={backButton} next={nextButton} />
      </div>
    </div>
  );
};

export default Kesehatan;
