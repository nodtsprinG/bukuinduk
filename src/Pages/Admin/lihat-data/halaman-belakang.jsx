import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router";
import fileDownload from "js-file-download";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../Components/profileCard"
import PilihHalaman from "../../../Components/pilihHalaman"
import { Edit, Save } from "lucide-react"

const ERaport = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [mapelList, setMapelList] = useState([]);
  const [nilaiList, setNilaiList] = useState([]);
  const [file, setFile] = useState(null);
  const [editing, setIsEditing] = useState(false)

  // const params = useParams();

  useEffect(() => {
    fetchMapel();
  }, []);

  useEffect(() => {
    if (mapelList.length > 0) {
      fetchNilai();
    }
  }, [activeSemester, mapelList]);

  const fetchMapel = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/mapel`, {
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
    try {
      const response = await axios.get(baseUrl + `/admin/nilai/${localStorage.getItem("akun-id")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data[`Semester ${activeSemester}`]) {
        setNilaiList(
          response.data[`Semester ${activeSemester}`].map((val) => ({
            sia: {
              sakit: val.SIA?.sakit ?? 0,
              izin: val.SIA?.izin ?? 0,
              alpha: val.SIA?.alpha ?? 0,
            },
            mapel: {
              id: val.mapel_id,
              nama: val.mapel.nama,
            },
            nilai: val.r,
            keterangan: val.keterangan,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching nilai:", error);
    }
  };

  const handleInputChange = (index, field, value, mapel) => {
    const newNilaiList = [...nilaiList];
    console.log(nilaiList)

    if (index === -1) {
      console.log("not found")
      newNilaiList.push({
        mapel: {
          id: mapelList.find(item => item.nama === mapel).id,
          nama: mapel
        }, nilai: "", keterangan: ""
      })
      index = newNilaiList.length - 1;
    }
    newNilaiList[index][field] = value;
    setNilaiList(newNilaiList);
  };


  // const handleDelete = (index) => {
  //   setNilaiList((prevList) => prevList.filter((_, i) => i !== index));
  // };

  const handleSave = async () => {
    try {
      const data = nilaiList.map((val) => ({
        mapel_id: val.mapel.id,
        r: val.nilai,
        keterangan: val.keterangan,
      }));

      await axios.post(
        `${baseUrl}/admin/nilai`,
        {
          sia: nilaiList[0].sia,
          semester: activeSemester,
          user_id: localStorage.getItem("akun-id"),
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsEditing(false)
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error saving nilai:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const kelompokUmum = [
    "Pendidikan Agama dan Budi Pekerti",
    "Pendidikan Pancasila",
    "Bahasa Indonesia",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "Sejarah",
    "Seni Budaya",
    "Bahasa Jawa",
    "Matematika",
    "Bahasa Inggris",
    "Informatika",
    "Projek IPAS",
    "Dasar Program Keahlian",
    "Mata Pelajaran Konsentrasi Keahlian",
    "Projek Kreatif dan Kewirausahaan",
    // "Mata Pelajaran Pilihan",
  ];

  const [pelajaranUmum, setPelajaranUmum] = useState(kelompokUmum)


  useEffect(() => {
    let filteredMapel;
    if (activeSemester == '1' || activeSemester == '2') {
      filteredMapel = kelompokUmum.filter(mapel =>
        !['Mata Pelajaran Konsentrasi Keahlian', 'Projek Kreatif dan Kewirausahaan'].includes(mapel)
      );
    } else if (activeSemester == '3' || activeSemester == '4') {
      filteredMapel = kelompokUmum.filter(mapel =>
        !['Seni Budaya', 'Informatika', 'Projek IPAS', 'Dasar Program Keahlian'].includes(mapel)
      );
    } else if (activeSemester == '5' || activeSemester == '6') {
      filteredMapel = kelompokUmum.filter(mapel =>
        !['Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Seni Budaya', 'Informatika', 'Projek IPAS', 'Dasar Program Keahlian'].includes(mapel)
      );
    }

    console.log(filteredMapel)

    setPelajaranUmum(filteredMapel)
  }, [activeSemester])

  const exportData = () => {
    axios
      .get(`${baseUrl}/admin/export-raport-pdf/${localStorage.getItem("akun-id")}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        fileDownload(response.data, "nilai-siswa.pdf");
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };

  const exportExcel = () => {
    axios
      .get(`${baseUrl}/admin/export-raport-excel/${localStorage.getItem("akun-id")}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        fileDownload(response.data, "nilai-siswa.xlsx");
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  }

  const exportDummy = () => {
    axios
      .get(`${baseUrl}/admin/export-raport-excel-dummy`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        fileDownload(response.data, "format-nilai-siswa.xlsx");
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  }

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih data terlebih dahulu");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", localStorage.getItem("akun-id"));
    try {
      await axios.post(`${baseUrl}/admin/import-individual-raport`, formData, {
        headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + localStorage.getItem("token") },
      });
      alert("File berhasil diunggah");
    } catch {
      alert("File gagal diunggah");
    }
  };



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

    console.log(nilaiList)
  };

  const handleOptionMPP = (index, field, value) => {
    const newNilaiList = [...nilaiList];
    const mpp = newNilaiList.findIndex((val) => val?.type === "mpp");
    if (mpp === -1 && field === "mapel") {
      const mapel = mapelList.find((val) => val.id == value).nama;
      newNilaiList.push({
        type: "mpp",
        mapel: {
          id: value,
          nama: mapel,
        },
        nilai: "",
        keterangan: "",
      });
      setNilaiList(newNilaiList);
      return;
    }
    if (field !== "mapel") {
      newNilaiList[mpp][field] = value;
    } else {
      const mapel = mapelList.find((val) => val.id == value).nama;
      newNilaiList[mpp]["mapel"] = {
        id: value,
        nama: mapel,
      };
    }
    setNilaiList(newNilaiList);
    console.log(newNilaiList);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-[20px]">
      <Profil />
      <div className="mt-4"><PilihHalaman /></div>
      <h1 className="text-2xl font-bold my-4">E - Raport (Semester {activeSemester})</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[...Array(6)].map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSemester(index + 1)}
            className={`px-4 py-2 rounded-md ${activeSemester === index + 1 ? "bg-blue-700" : "bg-gray-500"} text-white`}
          >
            Semester {index + 1}
          </button>
        ))}

        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={exportData}>
          Unduh PDF
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={exportDummy}>
          Unduh Format
        </button>
        <button className="bg-green-700 text-white px-4 py-2 rounded-md" onClick={exportExcel}>
          Unduh Excel
        </button>
        <form onSubmit={handleImport} className="flex gap-2">
          <input type="file" onChange={handleFileChange} className="border border-black rounded-md p-2" />
          <button type="submit" className="bg-green-800 rounded-md px-4 py-2 text-white">Impor</button>
        </form>
        {!editing ? (
          <button
            onClick={handleEdit}
            className={`flex items-center gap-2 px-6 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg bg-blue-600 hover:bg-blue-700 text-white`}
          >
            <Edit className="w-5 h-5" />
            Ubah
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition duration-300 shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            Simpan
          </button>
        )}
      </div>

      <div className="bg-white p-4 flex">
        <table className="w-[75%]">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="border border-gray-400 p-2">MATA PELAJARAN</td>
              <td className="border border-gray-400 p-2">NILAI</td>
              <td className="border border-gray-400 p-2">KETERANGAN</td>
            </tr>
          </thead>
          <tbody>
            {pelajaranUmum.map((mapel, index) => {
              // Find the matching item in nilaiList
              const nilaiItem = nilaiList.find(item => item.mapel?.nama === mapel) || {};

              return (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">{mapel}</td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="number"
                      className="w-full h-full outline-none"
                      placeholder="Nilai"
                      value={nilaiItem.nilai || ""}
                      onChange={(e) =>
                        handleInputChange(nilaiList.findIndex(item => item.mapel?.nama === mapel), "nilai", e.target.value, mapel)
                      }
                    />
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <textarea
                      className="w-full h-full outline-none"
                      placeholder="Deskripsi"
                      value={nilaiItem.keterangan || ""}
                      onChange={(e) =>
                        handleInputChange(nilaiList.findIndex(item => item.mapel?.nama === mapel), "keterangan", e.target.value, mapel)
                      }
                    />
                  </td>
                  {/* <td>
                    <button
                      onClick={() => deleteNilai(index)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>

              );
            })}
            {activeSemester > 2 && (
              <tr>
                <td className="border border-gray-400 p-2">
                  <div className="grid grid-cols-2">
                    <label className="flex items-center justify-start">
                      Mata Pelajaran Pilihan :
                    </label>
                    <select
                      className="w-full mt-1 p-2 border rounded-sm"
                      value={
                        nilaiList.find((obj) => obj?.mapel?.nama.includes("@"))?.mapel.id || ""
                      }
                      onChange={(e) => handleOptionMPP(1, "mapel", e.target.value, "")}
                    >
                      <option value="" className="text-gray-500 rounded">Pilih Mapel</option>
                      {mapelList
                        .filter((subject) => subject.nama.includes("@"))
                        .map((mapel) => (
                          <option key={mapel.id} value={mapel.id}>
                            {mapel.nama.replace("@", "")}
                          </option>
                        ))}
                    </select>
                  </div>
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    type="number"
                    className="w-full h-full outline-none"
                    placeholder="Nilai"
                    value={
                      nilaiList.find((obj) => obj?.mapel?.nama.includes("@"))?.nilai || ""
                    }
                    onChange={(e) => handleOptionMPP(1, "nilai", e.target.value, "")}
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <textarea
                    className="w-full h-full outline-none"
                    placeholder="Deskripsi"
                    value={
                      nilaiList.find((obj) => obj?.mapel?.nama.includes("@"))?.keterangan ||
                      ""
                    }
                    onChange={(e) => handleOptionMPP(1, "keterangan", e.target.value, "")}
                  />
                </td>
              </tr>
            )}
          </tbody>

        </table>
        <div className="w-full md:w-1/3 px-4">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100 text-center text-black">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Keterangan</th>
                <th className="py-2 px-4 border border-gray-300">Hari</th>
              </tr>
            </thead>
            <tbody>
              {["sakit", "izin", "alpha"].map((field) => (
                <tr key={field} className="text-center">
                  <td className="px-4 py-2 capitalize border border-gray-300">{field}</td>
                  <td className="px-4 py-2 border border-gray-300 grid grid-cols-2">
                    <input
                      type="number"
                      className="w-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      value={nilaiList[0]?.sia?.[field] || ""}
                      onChange={(e) => handleSIAChange(field, e.target.value)}
                    />
                    <label className="ml-4">Hari</label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ERaport;