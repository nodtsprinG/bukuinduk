import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
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
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 rounded-lg text-lg overflow-y-auto">
      <HeaderInput title="Tempat Tinggal Siswa" word="B" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Alamat */}
          <div className="col-span-2">
            <label className="block font-medium mb-1">Alamat</label>
            <TextInput value={alamat} onChange={(e) => setAlamat(e.target.value)} />
          </div>

          {/* No Telepon */}
          <div>
            <label className="block font-medium mb-1">No Telp/HP</label>
            <TextInput value={telp} onChange={(e) => setTelp(e.target.value)} />
          </div>

          {/* Tinggal Dengan */}
          <div>
            <label className="block font-medium mb-1">Tinggal Dengan</label>
            <select
              value={tinggal}
              onChange={(e) => setTinggal(e.target.value)}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[75%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
            >
              <option value="default" hidden>Pilih</option>
              <option value="ortu">Orang Tua</option>
              <option value="saudara">Saudara</option>
              <option value="lainnya">Lainnya</option>
              <option value="wali">Wali</option>
            </select>
          </div>

          {/* Jarak Tempat Tinggal ke Sekolah */}
          <div>
            <label className="block font-medium mb-1">Jarak Tempat Tinggal ke Sekolah (Km)</label>
            <div className="flex items-center">
              <IntegerInput value={jarak} onChange={(e) => setJarak(e.target.value)} />
              <span className="ml-2 text-lg text-gray-700">Km</span>
            </div>
          </div>
        </div>

      </div>

      {/* Tombol Next & Back */}
      <div className="flex justify-end space-x-4">
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default TempatTinggal;