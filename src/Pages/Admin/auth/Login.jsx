import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import Logo from "../../../assets/logosekolah.png"
import { baseUrl } from "../../../utils/constan";
import GoBack from "../../../Components/goback"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate("/admin/dashboard")
        }
    })

    const verify = () => {
        if(email.length == 0) {
            alert("Email kosong")
        } else if (password.length == 0) {
            alert("Password kosong")
        }
        console.log(email, password)
        axios.post(baseUrl + "/auth/login-admin", {
            email, password
        }).then((res) => {
            const { code } = res.data
            navigate("/admin/auth/verification/" + code)
        })
    }

    return (
        <div className="flex items-center justify-center bg-[#ACABAF] bg-no-repeat w-screen h-screen">
            <div className="flex flex-row items-center justify-center w-11/12">
                <div className="flex flex-col items-center justify-center w-1/2">
                    <img src={Logo} alt="Logo Sekolah" className="w-44"/>
                    <p className="font-header text-white font-bold text-3xl text-center mt-3">Buku Induk</p>
                </div>
                <div className="bg-[#D9D9D9] w-1/2 px-10 py-9 rounded-md border-4 border-[#A4A4A4]">
                    <p className="font-body opacity-30 text-sm">Langkah 1 dari 2</p>
                    <p className="font-header font-bold text-3xl mt-2">Masuk</p>
                    <div className="flex flex-col mt-10 pt-10 border-t border-black">
                        <label className="opacity-20">Alamat email</label>
                        <input onChange={(e) => setEmail(e.currentTarget.value)} className="bg-transparent border-b border-black focus:outline-none p-2"></input>
                        <label className="opacity-20 pt-5">Kata sandi</label>
                        <input onChange={(e) => setPassword(e.currentTarget.value)} className="bg-transparent border-b border-black focus:outline-none p-2" type="password"></input>
                        <div className="flex flex-row pt-10 w-full">
                            <div className="flex flex-row justify-start items-center w-1/2">
                                <GoBack to={'/'} className="font-header font-bold bg-[#0083FB] px-4 py-2 text-l text-white rounded-sm" />
                            </div>
                            <div className="flex flex-row justify-end items-center w-1/2">
                                <button onClick={verify} className="font-header font-bold bg-[#0083FB] px-4 py-2 text-l text-white rounded-sm">Masuk</button>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Login;