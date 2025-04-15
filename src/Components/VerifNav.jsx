/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import client from "../Utils/client";
import Swal from "sweetalert2";

function DataDiriNav({ data }) {
    const excludeKeys = [
        "data_diri_approved",
        "id",
        "nisn",
        "jurusan_id",
        "angkatan_id",
        "token",
        "jurusan",
        "angkatan",
    ];
    const filteredKeys = Object.keys(data)
        .filter((val) => !excludeKeys.includes(val))
        .filter((val) => data[val]);
    const [active, setActive] = useState(filteredKeys[0] || "");
    const [oldData, setOldData] = useState({});

    useEffect(() => {
        client.get("/admin/akun/" + data.id).then((res) => {
            setOldData(res.data);
            console.log("Old Data:", res.data);
        });
    }, []);

    function acceptChanges(e) {
        e.preventDefault();
        client.post("/admin/data-diri/unverified/" + data.id).then(() => {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil diterima",
                text: "Semua data berhasil diterima!",
                confirmButtonText: "OK",
            })
            window.reload()
        });
    }

    function rejectChanges(e) {
        e.preventDefault();
        client.delete("/admin/data-diri/unverified/" + data.id).then(() => {
            alert("Semua data berhasil ditolak!");
        });
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Navigasi Tab */}
            <div className="flex overflow-auto gap-2 mb-4 capitalize">
                {filteredKeys.map((val, index) => {
                    if (!data[val]) {
                        return null;
                    }
                    return (
                        <div
                            key={index}
                            onClick={() => setActive(val)}
                            className={`px-2 text-xl cursor-pointer ${active === val
                                ? "text-black border-b-2 border-b-blue-700"
                                : "text-gray-500"
                                } transition duration-150`}
                        >
                            {val.replace("_", " ")}
                        </div>
                    );
                })}
            </div>

            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-6">
                {/* Data Baru */}
                <div className="mb-6">
                    <div className="font-bold text-blue-600 mb-2">Data Masuk</div>
                    <table className="w-full table-fixed mb-4 border-collapse shadow rounded-lg overflow-hidden capitalize">
                        <tbody>
                            {active &&
                                data[active] &&
                                typeof data[active] === "object" &&
                                Object.keys(data[active]).map((val, index) => {
                                    if (["id", "user_id", "status_data"].includes(val)) return null;
                                    return (
                                        <tr
                                            key={index}
                                            className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                }`}
                                        >
                                            <td className="p-2 w-1/3 text-gray-600 border-b">{val.replaceAll("_", " ")}</td>
                                            <td className="p-2 w-10 border-b text-center">:</td>
                                            <td className="p-2 w-2/3 text-gray-800 border-b">{data[active][val]}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3">
                <button
                    onClick={rejectChanges}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-150"
                >
                    Tolak
                </button>
                <button
                    onClick={acceptChanges}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-150"
                >
                    Terima
                </button>
            </div>
        </div>
    );
}

export default DataDiriNav;
