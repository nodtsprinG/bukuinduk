import HeaderInput from "../../../Components/headerInputV2";
import { useState, useEffect } from "react";
import {
  TextInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import { useNavigate, useParams } from "react-router";

import uploadAll from "../../../utils/uploadAll";

/* 

=====================================================================================================
                    D A T A _ H O B I _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const Hobi = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [olahraga, setOlahraga] = useState("");
  const [kesenian, setKesenian] = useState("");
  const [organisasi, setOrganisasi] = useState("");
  const [lainlain, setLainlain] = useState("");

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("hobi-kesenian") !== "null")
      setKesenian(localStorage.getItem("hobi-kesenian"));
    if (localStorage.getItem("hobi-olahraga") !== "null")
      setOlahraga(localStorage.getItem("hobi-olahraga"));
    if (localStorage.getItem("hobi-organisasi") !== "null")
      setOrganisasi(localStorage.getItem("hobi-organisasi"));
    if (localStorage.getItem("hobi-lainlain") !== "null")
      setLainlain(localStorage.getItem("hobi-lainlain"));
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/wali`);
  };

  const nextButton = () => {
    console.log(kesenian, olahraga, organisasi, lainlain);
      if (params.action === "upload") {
        localStorage.setItem("hobi-kesenian", kesenian ? kesenian : null);
        localStorage.setItem("hobi-olahraga", olahraga ? olahraga : null);
        localStorage.setItem("hobi-organisasi", organisasi ? organisasi : null);
        localStorage.setItem("hobi-lainlain", lainlain ? lainlain : null);
      }
      uploadAll()
      navigate("/siswa");
  };
  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <HeaderInput title={"Hobi"} word={"H"} form={"siswa"} lastpage={true}/>
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Kesenian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={kesenian}
                  onChange={(e) => setKesenian(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Olahraga</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={olahraga}
                  onChange={(e) => setOlahraga(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Organisasi/Kemasyarakatan</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={organisasi}
                  onChange={(e) => setOrganisasi(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Lain-lain</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={lainlain}
                  onChange={(e) => setLainlain(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} lastpage={true} />
    </div>
  );
};
export default Hobi;
