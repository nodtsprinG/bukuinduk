import axios from "axios";
import resetAll from "./resetAll";

const detailPreparing = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda belum login!");
      return false;
    }

    const response = await axios.get(`http://localhost:8080/admin/akun/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data;
    console.log("Data Akun:", data);

    resetAll();

    // Fungsi helper untuk menyimpan ke localStorage dengan nilai default jika null/undefined
    const setLocalStorage = (key, value, defaultValue = null) => {
      localStorage.setItem(key, value ?? defaultValue);
    };

    // Menangani tanggal dengan format khusus
    const formatDate = (date) => (date === "0000-00-00" || !date ? new Date().toISOString().split("T")[0] : date);

    setLocalStorage("akun-nisn", data.nisn);
    setLocalStorage("akun-jurusanId", data.jurusan_id);
    setLocalStorage("akun-angkatanId", data.angkatan_id);

    setLocalStorage("biodata-nama", data.data_diri?.nama_lengkap);
    setLocalStorage("biodata-panggilan", data.data_diri?.nama_panggilan);
    setLocalStorage("biodata-jeniskelamin", data.data_diri?.jenis_kelamin);
    setLocalStorage("biodata-tempatlahir", data.data_diri?.tempat_lahir);
    setLocalStorage("biodata-tanggallahir", formatDate(data.data_diri?.tanggal_lahir));
    setLocalStorage("biodata-agama", data.data_diri?.agama);
    setLocalStorage("biodata-kewarganegaraan", data.data_diri?.kewarganegaraan);
    setLocalStorage("biodata-anakke", data.data_diri?.anak_ke);
    setLocalStorage("biodata-kandung", data.data_diri?.jml_saudara_kandung);
    setLocalStorage("biodata-angkat", data.data_diri?.jml_saudara_angkat);
    setLocalStorage("biodata-tiri", data.data_diri?.jml_saudara_tiri);
    setLocalStorage("biodata-status", data.data_diri?.kelengkapan_ortu);
    setLocalStorage("biodata-bahasa", data.data_diri?.bahasa_sehari_hari);

    setLocalStorage("hobi-kesenian", data.hobi_siswa?.kesenian);
    setLocalStorage("hobi-olahraga", data.hobi_siswa?.olahraga);
    setLocalStorage("hobi-organisasi", data.hobi_siswa?.organisasi);
    setLocalStorage("hobi-lainlain", data.hobi_siswa?.lain_lain);

    ["ayah", "ibu", "wali"].forEach((role) => {
      setLocalStorage(`${role}-nama`, data[`${role}_kandung`]?.nama);
      setLocalStorage(`${role}-tempatlahir`, data[`${role}_kandung`]?.tempat_lahir);
      setLocalStorage(`${role}-tanggallahir`, formatDate(data[`${role}_kandung`]?.tanggal_lahir));
      setLocalStorage(`${role}-agama`, data[`${role}_kandung`]?.agama);
      setLocalStorage(`${role}-kewarganegaraan`, data[`${role}_kandung`]?.kewarganegaraan);
      setLocalStorage(`${role}-pendidikan`, data[`${role}_kandung`]?.pendidikan);
      setLocalStorage(`${role}-pekerjaan`, data[`${role}_kandung`]?.pekerjaan);
      setLocalStorage(`${role}-pengeluaran`, data[`${role}_kandung`]?.pengeluaran_per_bulan);
      setLocalStorage(`${role}-alamatdantelpon`, data[`${role}_kandung`]?.alamat_dan_no_telepon);
      setLocalStorage(`${role}-status`, data[`${role}_kandung`]?.status);
    });

    setLocalStorage("tempattinggal-alamat", data.tempat_tinggal?.alamat);
    setLocalStorage("tempattinggal-telp", data.tempat_tinggal?.no_telepon);
    setLocalStorage("tempattinggal-tinggal", data.tempat_tinggal?.tinggal_dengan);
    setLocalStorage("tempattinggal-jarak", data.tempat_tinggal?.jarak_ke_sekolah);

    setLocalStorage("pendidikan-tanggal", data.pendidikan?.diterima_tanggal);
    setLocalStorage("pendidikan-tamatan", data.pendidikan?.sebelumnya_tamatan_dari);
    setLocalStorage("pendidikan-nomorijazah", data.pendidikan?.sebelumnya_tanggal_dan_ijazah);
    setLocalStorage("pendidikan-skhun", data.pendidikan?.sebelumnya_tanggal_skhun_dan_);
    setLocalStorage("pendidikan-sebelumnyalamabelajar", data.pendidikan?.sebelumnya_lama_belajar);
    setLocalStorage("pendidikan-darisekolah", data.pendidikan?.pindahan_dari_sekolah);
    setLocalStorage("pendidikan-alasan", data.pendidikan?.pindahan_alasan);
    setLocalStorage("pendidikan-bidangkeahlian", data.pendidikan?.diterima_di_bidang_keahlian);
    setLocalStorage("pendidikan-programkeahlian", data.pendidikan?.diterima_di_program_keahlian);
    setLocalStorage("pendidikan-paketkeahlian", data.pendidikan?.diterima_di_paket_keahlian);
    setLocalStorage("pendidikan-kelas", data.pendidikan?.diterima_di_kelas);

    setLocalStorage("kesehatan-goldarah", data.kesehatan?.gol_darah);
    setLocalStorage("kesehatan-penyakit", data.kesehatan?.penyakit_pernah_diderita);
    setLocalStorage("kesehatan-jasmani", data.kesehatan?.kelainan_jasmani);
    setLocalStorage("kesehatan-tinggi", data.kesehatan?.tinggi);
    setLocalStorage("kesehatan-berat", data.kesehatan?.berat_badan);

    setLocalStorage("selesaipendidikan-melanjutkan", data.setelah_pendidikan?.melanjutkan_ke);
    setLocalStorage("selesaipendidikan-perusahaan", data.setelah_pendidikan?.bekerja_nama_perusahaan);
    setLocalStorage("selesaipendidikan-tanggal", formatDate(data.setelah_pendidikan?.bekerja_tanggal_mulai));
    setLocalStorage("selesaipendidikan-penghasilan", data.setelah_pendidikan?.bekerja_penghasilan);

    setLocalStorage("perkembangan-beasiswa", data.perkembangan?.menerima_bea_siswa_tahun_kelas_dari);
    setLocalStorage("perkembangan-meninggalkansekolah", data.perkembangan?.meninggalkan_sekolah_ini_alasan);
    setLocalStorage("perkembangan-akhirpendidikan", data.perkembangan?.akhir_pendidikan_tamat_belajar_lulus_tahun);

    return true;
  } catch (err) {
    console.error("Error fetching akun data:", err);
    return false;
  }
};

export default detailPreparing;
