import HeaderInput from "../../../Components/headerInputV2";
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
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll h-min:h-screen text-[24px]">
      <HeaderInput title={"Kesehatan Siswa"} word={"C"} form={"siswa"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Golongan Darah</label>
              </td>
              <td className="w-[63%] h-full">
                <select
                  value={goldarah}
                  onChange={(e) => setGoldarah(e.target.value)}
                  className="w-[50%] bg-[#DEE0E1] text-black p-2 rounded outline-none shadow-md"
                  defaultValue={"default"}
                >
                  <option value="default" hidden>
                    Pilih
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                  <option value="lainnya">Lainnya</option>
                  <option value="tidak diketahui">Tidak Diketahui</option>
                </select>
              </td>
            </tr>
            {goldarah === "lainnya" ? (
              <tr>
                <td className="w-[63%] h-full">
                  <label className="py-1">Lainnya</label>
                </td>
                <td className="w-[63%] h-full">
                  <TextInput
                    value={goldarahlain}
                    onChange={(e) => setGoldarahlain(e.target.value)}
                    className="h-full"
                  />
                </td>
              </tr>
            ) : null}
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Penyakit Yang Pernah Diderita</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={penyakit}
                  onChange={(e) => setPenyakit(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Kelainan Jasmani</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={jasmani}
                  onChange={(e) => setJasmani(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tinggi Badan (*cm)</label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput
                  value={tinggi}
                  onChange={(e) => setTinggi(e.target.value)}
                  className="h-full"
                />
                <span className="ml-2 text-lg text-black">
                  CM
                </span>
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Berat Badan (*kg)</label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput
                  value={berat}
                  onChange={(e) => setBerat(e.target.value)}
                  className="h-full"
                />
                <span className="ml-2 text-lg text-black">
                  KG
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} />
    </div>
  );
};

export default Kesehatan;
