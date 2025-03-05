import axios from "axios";
import { useEffect, useState } from "react";
import client from "../Utils/client";


function DataDiriNav({data}) {
    const excludeKeys =  ["data_diri_approved", "id", "nisn", "jurusan_id", "angkatan_id", "token", "jurusan", "angkatan"];
    const filteredKeys = Object.keys(data).filter((val) => !excludeKeys.includes(val)).filter((val) => data[val]);
    const [active, setActive] = useState(filteredKeys[0] || "");
    const [oldData, setOldData] = useState({});
    
    useEffect(() => {
        client.get("/admin/akun/" + data.id)
        .then((res) => {
            setOldData(res.data)
            console.log(res.data)
        })
    }, [])

    function acceptChanges(e){
        e.preventDefault()
        client.post("/admin/data-diri/pending/" + data.id)
        .then(() => {
            alert("All data sucessfully changed")
        })
    }

    function rejectChanges(e){
        e.preventDefault()
        client.delete("/admin/data-diri/pending/" + data.id)
        .then(() => {
            alert("All data sucessfully changed")
        })
    }



  
  return (
    <>
    <div className="flex overflow-auto gap-2">
    {
        filteredKeys.map((val, index) => {
            if(!data[val]) {
                return
            }
            return (
                <div key={index} onClick={() => setActive(val)} className={`p-2 border-b-2 ${active === val ? "border-blue-600" : "border-transparent"} text-blue-600`}>
                    {val.replace("_", " ")}
                </div>
            )
        })
    }

    </div>
    <div className="h-[70%] overflow-auto">
        <div className="font-bold mt-5">
            Data Baru
        </div>
        <table className="w-full">
                    {
                    active && data[active] && typeof data[active] === "object" && (
                        Object.keys(data[active]).map((val, index) => {
                            if(["id", "user_id", "status_perubahan"].includes(val)) {
                                return
                            }
                            return (
                                <tr key={index} className={`p-2 `}>
                                    <td className="w-[40%]">{val.replaceAll("_", " ")}</td>
                                    <td> : </td>
                                    <td>{data[active][val]}</td>
                                </tr>
                            )
                        })
                    )
                }
        </table>
        <div className="font-bold mt-5">
            Data Lama
        </div>
        <table className="w-full">
                    {
                    active && data[active] && typeof data[active] === "object" && (
                        Object.keys(data[active]).map((val, index) => {
                            if(["id", "user_id", "status_perubahan"].includes(val)) {
                                return
                            }
                            return (
                                <tr key={index} className={`p-2 `}>
                                    <td className="w-[40%]">{val.replaceAll("_", " ")}</td>
                                    <td> : </td>
                                    <td className={`${oldData?.[active]?.[val] === data?.[active]?.[val] ? "" : "font-bold"}`}>{oldData?.[active]?.[val]}</td>
                                </tr>
                            )
                        })
                    )
                }
        </table>
    </div>

        <div className="flex w-full justify-end gap-3">
            <button onClick={(e) => {rejectChanges(e)}} className="px-3 py-1 bg-red-600 border hover:bg-red-900 duration-150 text-white rounded">Tolak</button>
            <button onClick={(e) => {acceptChanges(e)}} className="px-3 py-1 bg-green-600 border hover:bg-green-900 duration-150 text-white rounded">Terima</button>
        </div>
    </>

  )
}

export default DataDiriNav