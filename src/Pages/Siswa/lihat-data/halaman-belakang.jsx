/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import InputHalaman from "../../../Components/pilihHalaman";
import Profil from "../../../Components/profileCard";
import { baseUrl } from "../../../utils/constan";
import { useParams } from "react-router";
import fileDownload from "js-file-download";

const ERaport = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [mapelList, setMapelList] = useState([]);  // Menyimpan daftar mapel dari API
  const [nilaiList, setNilaiList] = useState([]); // Menyimpan daftar nilai yang bisa ditambahkan

  useEffect(() => {
    fetchMapel();
    fetchNilai()
    console.log(nilaiList)
  }, [activeSemester]);

  const params = useParams()

  const fetchMapel = async () => {
    try {
      const response = await axios.get(baseUrl + "/admin/mapel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMapelList(response.data);
    } catch (error) {
      console.error("Error fetching mapel:", error);
    }
  };

  const fetchNilai = async () => {
    const id = localStorage.getItem("akun-id")
    try {
      const response = await axios.get(baseUrl + `/admin/nilai/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      
      if(response.data[`Semester ${activeSemester}`].length != 0){
        setNilaiList(response.data[`Semester ${activeSemester}`].map((val, index) => {
          return {
            sia : {
              sakit : val.SIA?.sakit ?? 0,
              izin : val.SIA?.izin ?? 0,
              alpha : val.SIA?.alpha ?? 0
            },
            mapel : {
              id : val.mapel_id,
              nama : val.mapel.nama
            },
            nilai : val.r,
            keterangan : val.keterangan,
          }
        }));
      }else {
        setNilaiList([])
      }
    } catch (error) {
      console.error("Error fetching mapel:", error);
    }
  }

  const deleteNilai = (index) => {
    const newNilaiList = [...nilaiList];
    newNilaiList.splice(index, 1); // Remove item at the given index
    setNilaiList(newNilaiList);
  };
  

  const handleAddRow = () => {
    setNilaiList([...nilaiList, { mapel: "", nilai: "", keterangan: "" }]);
    console.log(nilaiList)
  };

  const handleInputChange = (index, field, value) => {
    const newNilaiList = [...nilaiList];
    newNilaiList[index][field] = value;
    setNilaiList(newNilaiList);
  };

  const exportData = () => {
    axios.get(`${baseUrl}/admin/export-raport-pdf/${params.id}`, {
      responseType: 'blob', // Important: indicates that the response should be treated as a Blob
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        fileDownload(response.data, 'nilai-siswa.pdf');
      })
      .catch((error) => {
        console.error('Download error:', error);
      });
  }

  const handleSIAChange = (field, value) => {

    setNilaiList((prevList) => {
      if (prevList.length === 0) return prevList; // Ensure there's at least one item
      const updatedList = [...prevList];
      updatedList[0] = {
        ...updatedList[0],
        sia: {
          ...updatedList[0].sia,
          [field]: parseInt(value),
        },
      };
      return updatedList;
    });
  };
  
  const handleSave = async () => {
    try {
      const data = nilaiList.map((val) => ({
        mapel_id: val.mapel.id,
        r: val.nilai,
        keterangan: val.keterangan,
      }));
  
      const sia = nilaiList.length > 0 ? nilaiList[0].sia : { sakit: 0, izin: 0, alpha: 0 };
  
      const response = await axios.post(
        baseUrl + "/admin/nilai",
        {
          semester: activeSemester,
          user_id: params.id,
          sia,
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      alert("Data berhasil disimpan!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving nilai:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };
  

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman id={params.id} /></div>
      <h1 className="text-2xl font-bold my-4">E - Raport (Semester {activeSemester})</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[...Array(6)].map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSemester(index + 1)}
            className={`px-4 py-2 rounded-md ${activeSemester === index + 1 ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
          >
            Semester {index + 1}
          </button>
        ))}
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">Simpan</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={exportData}>Expor</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 p-2 font-header font-normal text-[24px] text-center">
                <td className="border p-2">MATA PELAJARAN</td>
                <td className="border p-2">NILAI</td>
                <td className="border p-2">KETERANGAN</td>
                <td className="border p-2">AKSI</td>
              </tr>
            </thead>
            <tbody>
              {nilaiList.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <select
                      className="w-full p-1 outline-none"
                      defaultValue={item.mapel.id}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedMapel = mapelList.find((mapel) => mapel.id == selectedId);
                        console.log(selectedMapel, mapelList)
                        
                        handleInputChange(index, "mapel", {
                          id: selectedId,
                          nama: selectedMapel ? selectedMapel.nama : ""
                        });
                      }}
                    >
                      <option value="">Pilih Mapel</option>
                      {mapelList.map((mapel) => (
                        <option key={mapel.id} value={mapel.id}>{mapel.nama}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 outline-none"
                      placeholder="Nilai"
                      value={item.nilai}
                      onChange={(e) => handleInputChange(index, "nilai", e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <textarea
                      className="w-full p-1 outline-none resize-y"
                      placeholder="Deskripsi"
                      value={item.keterangan}
                      onChange={(e) => handleInputChange(index, "keterangan", e.target.value)}
                    />
                  </td>
                  <td className="border p-2 flex items-center ">
                    <button onClick={(e) => {deleteNilai(index)}} className="bg-red-700 p-2 text-white">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddRow} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            Tambah Nilai
          </button>
        </div>

        <div>
        {
           (
            <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 p-2 font-header font-normal text-[24px] text-center">
                <td className="border p-2">KETERANGAN</td>
                <td className="border p-2">HARI</td>
              </tr>
            </thead>
            <tbody>
             <tr className="border p-2">
                <td className="border p-2">Sakit</td>
                <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 outline-none"
                      placeholder="Nilai"
                      value={nilaiList[0]?.sia?.sakit}
                      onChange={(e) => handleSIAChange("sakit", e.target.value)}
                    />
                  </td>
             </tr>
             <tr className="border p-2">
                <td className="border p-2">Izin</td>
                <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 outline-none"
                      placeholder="Nilai"
                      value={nilaiList[0]?.sia?.izin}
                      onChange={(e) => handleSIAChange("izin", e.target.value)}
                    />
                  </td>
             </tr>
             <tr className="border p-2">
                <td className="border p-2">Alpha</td>
                <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 outline-none"
                      placeholder="Nilai"
                      value={nilaiList[0]?.sia?.alpha}
                      onChange={(e) => handleSIAChange("alpha", e.target.value)}
                    />
                  </td>
             </tr>
            </tbody>
          </table>
          )
        }
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">

      </div>
    </div>
  );
};

export default ERaport;