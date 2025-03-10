import {
  isAkunFilled,
  isAyahFilled,
  isBiodataFilled,
  isHobiFilled,
  isIbuFilled,
  isKesehatanFilled,
  isPendidikanFilled,
  isTempattinggalFilled,
  isWaliFilled,
} from "../Utils/check";
import axios from "axios";
import { baseUrl } from "../Utils/constan";

const uploadAll = async () => {
  try {
    // Pengecekan data terisi
    const checks = [
      isAkunFilled,
      isAyahFilled,
      isBiodataFilled,
      isHobiFilled,
      isIbuFilled,
      isKesehatanFilled,
      isPendidikanFilled,
      isTempattinggalFilled,
      isWaliFilled,
    ];

    if (checks.some((check) => !check())) {
      throw new Error("Pastikan semua data telah diisi dengan benar.");
    }

    // Fungsi getItem dengan pengecekan null
    const getItem = (key, defaultValue = null) => {
      const item = localStorage.getItem(key);
      return item === "null" || item === "" ? defaultValue : item;
    };

    // Data yang akan dikirim
    const data = {
      siswa: {
        nisn: getItem("akun-nisn"),
        jurusan_id: getItem("akun-jurusanId"),
        angkatan_id: getItem("akun-angkatanId"),
      },
      data_diri: {
        nama_lengkap: getItem("biodata-nama"),
        nama_panggilan: getItem("biodata-panggilan"),
        jenis_kelamin: getItem("biodata-jeniskelamin"),
        tempat_lahir: getItem("biodata-tempatlahir"),
        tanggal_lahir: getItem("biodata-tanggallahir"),
        agama: getItem("biodata-agama"),
        kewarganegaraan: getItem("biodata-kewarganegaraan"),
        anak_ke: getItem("biodata-anakke"),
        jml_saudara_kandung: getItem("biodata-kandung"),
        jml_saudara_angkat: getItem("biodata-angkat"),
        jml_saudara_tiri: getItem("biodata-tiri"),
        kelengkapan_ortu: getItem("biodata-status"),
        bahasa_sehari_hari: getItem("biodata-bahasa"),
        status_perubahan: "approved"
      },
      tempat_tinggal: {
        alamat: getItem("tempattinggal-alamat"),
        no_telepon: getItem("tempattinggal-telp"),
        tinggal_dengan: getItem("tempattinggal-tinggal"),
        jarak_ke_sekolah: getItem("tempattinggal-jarak"),
        status_perubahan: "approved"
      },
      kesehatan: {
        gol_darah: getItem("kesehatan-goldarah"),
        penyakit_pernah_diderita: getItem("kesehatan-penyakit"),
        kelainan_jasmani: getItem("kesehatan-jasmani"),
        tinggi: getItem("kesehatan-tinggi"),
        berat_badan: getItem("kesehatan-berat"),
        status_perubahan: "approved"
      },
      pendidikan: {
        diterima_tanggal: getItem("pendidikan-tanggal"),
        sebelumnya_tamatan_dari: getItem("pendidikan-tamatan"),
        sebelumnya_tanggal_ijazah: getItem("pendidikan-tanggal-ijazah"),
        sebelumnya_no_ijazah: getItem("pendidikan-nomor-ijazah"),
        sebelumnya_tanggal_skhun: getItem("pendidikan-tanggal-skhun"),
        sebelumnya_no_skhun: getItem("pendidikan-nomor-skhun"),
        sebelumnya_lama_belajar: getItem("pendidikan-sebelumnyalamabelajar"),
        pindahan_dari_sekolah : getItem("pendidikan-darisekolah"),
        pindahan_alasan: getItem("pendidikan-alasan"),
        diterima_di_kelas: getItem("pendidikan-kelas"),
        diterima_di_bidang_keahlian: getItem("pendidikan-bidangkeahlian"),
        diterima_di_program_keahlian: getItem("pendidikan-programkeahlian"),
        diterima_di_paket_keahlian : getItem("pendidikan-paketkeahlian"),
        status_perubahan: "approved"
      },
      ayah_kandung: {
        nama: getItem("ayah-nama"),
        tempat_lahir: getItem("ayah-tempatlahir"),
        tanggal_lahir: getItem("ayah-tanggallahir"),
        agama: getItem("ayah-agama"),
        kewarganegaraan: getItem("ayah-kewarganegaraan"),
        pendidikan: getItem("ayah-pendidikan"),
        pekerjaan: getItem("ayah-pekerjaan"),
        pengeluaran_per_bulan: getItem("ayah-pengeluaran"),
        alamat_dan_no_telepon: getItem("ayah-alamatdantelpon"),
        status: getItem("ayah-status"),
        status_perubahan: "approved"
      },
      ibu_kandung: {
        nama: getItem("ibu-nama"),
        tempat_lahir: getItem("ibu-tempatlahir"),
        tanggal_lahir: getItem("ibu-tanggallahir"),
        agama: getItem("ibu-agama"),
        kewarganegaraan: getItem("ibu-kewarganegaraan"),
        pendidikan: getItem("ibu-pendidikan"),
        pekerjaan: getItem("ibu-pekerjaan"),
        pengeluaran_per_bulan: getItem("ibu-pengeluaran"),
        alamat_dan_no_telepon: getItem("ibu-alamatdantelpon"),
        status: getItem("ibu-status"),
        status_perubahan: "approved"
      },
      wali: {
        nama: getItem("wali-nama"),
        tempat_lahir: getItem("wali-tempatlahir"),
        tanggal_lahir: getItem("wali-tanggallahir"),
        agama: getItem("wali-agama"),
        kewarganegaraan: getItem("wali-kewarganegaraan"),
        pendidikan: getItem("wali-pendidikan"),
        pekerjaan: getItem("wali-pekerjaan"),
        pengeluaran_per_bulan: getItem("wali-pengeluaran"),
        alamat_dan_no_telepon: getItem("wali-alamatdantelpon"),
        status_perubahan: "approved"
      },
      hobi_siswa: {
        kesenian: getItem("hobi-kesenian"),
        olahraga: getItem("hobi-olahraga"),
        organisasi: getItem("hobi-organisasi"),
        lain_lain: getItem("hobi-lainlain"),
        status_perubahan: "approved"
      },
    };

    // Log data kosong
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(value).some((v) => v === null || v === "")) {
        console.log(`Ada data kosong di bagian: ${key}`);
      }
    });

    console.log("Data yang dikirim:", data);

    // Kirim data ke server
    const response = await axios.post(`${baseUrl}/siswa/data-diri`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response.data);
    window.alert("Data berhasil diunggah!");
    return response.data.message;

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Gagal mengunggah data";
    window.alert(errorMessage);
    console.error("Error saat mengunggah data:", error.response?.data || error);
    throw new Error(errorMessage);
  }
};

export default uploadAll;
