import HeaderInput from "../../../components/headerInputV2";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import { useNavigate, useParams } from "react-router-dom";
/* 

=====================================================================================================
                    D A T A _ T E M P A T _ T I N G G A L_ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

! Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const TempatTinggal = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [alamat, setAlamat] = useState("")
  const [telp, setTelp] = useState("")
  const [tinggal, setTinggal] = useState("")
  const [jarak, setJarak] = useState("")

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("tempattinggal-alamat"))
      setAlamat(localStorage.getItem("tempattinggal-alamat"));
    if (localStorage.getItem("tempattinggal-telp"))
      setTelp(localStorage.getItem("tempattinggal-telp"));
    if (localStorage.getItem("tempattinggal-tinggal"))
      setTinggal(localStorage.getItem("tempattinggal-tinggal"));
    if (localStorage.getItem("tempattinggal-jarak"))
      setJarak(localStorage.getItem("tempattinggal-jarak"));
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/biodata`);
  };

  const nextButton = () => {
    console.log(
      alamat, telp, tinggal, jarak
    );
    if (
      alamat && telp && tinggal && jarak
    ) {
      localStorage.setItem("tempattinggal-alamat", alamat);
      localStorage.setItem("tempattinggal-telp", telp);
      localStorage.setItem("tempattinggal-tinggal", tinggal);
      localStorage.setItem("tempattinggal-jarak", jarak);
      navigate(`/siswa/data/${params.action}/kesehatan`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <HeaderInput title={"Tempat Tinggal"} word={"B"} form={"siswa"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Alamat</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput value={alamat} onChange={(e) => setAlamat(e.target.value)} className="h-full" />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">No Telp/HP</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput value={telp} onChange={(e) => setTelp(e.target.value)} className="h-full" />
              </td>
            </tr>

            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tinggal Dengan</label>
              </td>
              <td className="w-[37%] h-full">
                <select value={tinggal} onChange={(e) => setTinggal(e.target.value)} className="w-[50%] bg-[#DEE0E1] text-black p-2 rounded outline-none shadow-md" defaultValue={"default"}>
                  <option value={"default"} hidden>Pilih</option>
                  <option value={"ortu"}>Orang Tua</option>
                  <option value={"saudara"}>Saudara</option>
                  <option value={"lainnya"}>Lainnya</option>
                  <option value={"wali"}>Wali</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">
                  Jarak Tempat Tinggal ke sekolah (Dalam Kilometer)
                </label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput value={jarak} onChange={(e) => setJarak(e.target.value)} className="h-full" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* tambahan */}
      <div>
        <Nextbefore back={backButton} next={nextButton} />
      </div>
    </div>
  );
};

export default TempatTinggal;