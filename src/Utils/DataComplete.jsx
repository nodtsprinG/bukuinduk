import axios from "axios";

export const isAkunFilled = async (id) => {
    try {
        const { data } = await axios.get(`/admin/akun/${id}`);
        return data.user.nisn && data.user.jurusan_id && data.user.angkatan_id;
    } catch (error) {
        console.error("Error fetching akun data:", error);
        return false;
    }
};

export const isBiodataFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.data_diri.nama_lengkap &&
            data.data_diri.nama_panggilan &&
            data.data_diri.jenis_kelamin &&
            data.data_diri.tempat_lahir &&
            data.data_diri.tanggal_lahir &&
            data.data_diri.agama &&
            data.data_diri.kewarganegaraan &&
            data.data_diri.anak_ke &&
            data.data_diri?.jml_saudara_kandung	|| "-" &&
            data.data_diri?.jml_saudara_angkat || "-" &&
            data.data_diri?.jml_saudara_tiri || "-" &&
            data.data_diri.kelengkapan_ortu &&
            data.data_diri.bahasa_sehari_hari
        );
    } catch (error) {
        console.error("Error fetching biodata:", error);
        return false;
    }
};

export const isTempattinggalFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return data.tempat_tinggal.alamat && data.tempat_tinggal.no_telepon && data.tempat_tinggal.tinggal_dengan && data.tempat_tinggal.jarak_ke_sekolah;
    } catch (error) {
        console.error("Error fetching tempat tinggal:", error);
        return false;
    }
};

export const isKesehatanFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return data.kesehatan.gol_darah && data.kesehatan.penyakit_pernah_diderita && data.kesehatan.kelainan_jasmani && data.kesehatan.tinggi && data.kesehatan.berat_badan;
    } catch (error) {
        console.error("Error fetching kesehatan:", error);
        return false;
    }
};

export const isPendidikanFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.pendidikan.diterima_tanggal &&
            data.pendidikan.sebelumnya_tamatan_dari &&
            data.pendidikan.sebelumnya_tanggal_ijazah &&
            data.pendidikan.sebelumnya_no_ijazah &&
            data.pendidikan.sebelumnya_tanggal_skhun &&
            data.pendidikan.sebelumnya_no_skhun &&
            data.pendidikan.sebelumnya_lama_belajar &&
            data.pendidikan.pindahan_dari_sekolah &&
            data.pendidikan.pindahan_alasan &&
            data.pendidikan.diterima_di_kelas &&
            data.pendidikan.diterima_di_bidang_keahlian &&
            data.pendidikan.diterima_di_program_keahlian &&
            data.pendidikan.diterima_di_paket_keahlian
        );
    } catch (error) {
        console.error("Error fetching pendidikan:", error);
        return false;
    }
};

export const isAyahFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.ayah_kandung.nama &&
            data.ayah_kandung.tempat_lahir &&
            data.ayah_kandung.tanggal_lahir &&
            data.ayah_kandung.agama &&
            data.ayah_kandung.kewarganegaraan &&
            data.ayah_kandung.pendidikan &&
            data.ayah_kandung.pekerjaan &&
            data.ayah_kandung.pengeluaran_per_bulan &&
            data.ayah_kandung.alamat_dan_no_telepon &&
            data.ayah_kandung.status
        );
    } catch (error) {
        console.error("Error fetching ayah data:", error);
        return false;
    }
};

export const isIbuFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.ibu_kandung.nama &&
            data.ibu_kandung.tempat_lahir &&
            data.ibu_kandung.tanggal_lahir &&
            data.ibu_kandung.agama &&
            data.ibu_kandung.kewarganegaraan &&
            data.ibu_kandung.pendidikan &&
            data.ibu_kandung.pekerjaan &&
            data.ibu_kandung.pengeluaran_per_bulan &&
            data.ibu_kandung.alamat_dan_no_telepon &&
            data.ibu_kandung.status
        );
    } catch (error) {
        console.error("Error fetching ibu data:", error);
        return false;
    }
};

export const isWaliFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.wali?.nama &&
            data.wali?.tempat_lahir &&
            data.wali?.tanggal_lahir &&
            data.wali?.agama &&
            data.wali?.kewarganegaraan &&
            data.wali?.pendidikan &&
            data.wali?.pekerjaan &&
            data.wali?.pengeluaran_per_bulan &&
            data.wali?.alamat_dan_no_telepon
        );
    } catch (error) {
        console.error("Error fetching wali data:", error);
        return false;
    }
};

export const isHobiFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.hobi?.kesenian &&
            data.hobi?.olahraga &&
            data.hobi?.organisasi &&
            data.hobi?.lainlain
        );
    } catch (error) {
        console.error("Error fetching hobi data:", error);
        return false;
    }
};

export const isPerkembangansiswaFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.perkembangan?.beasiswa &&
            data.perkembangan?.meninggalkansekolah?.tanggal &&
            data.perkembangan?.meninggalkansekolah?.alasan &&
            data.perkembangan?.akhirpendidikan?.tamat &&
            data.perkembangan?.akhirpendidikan?.noIjazah &&
            data.perkembangan?.akhirpendidikan?.tanggalIjazah &&
            data.perkembangan?.akhirpendidikan?.noSkhun &&
            data.perkembangan?.akhirpendidikan?.tanggalSkhun
        );
    } catch (error) {
        console.error("Error fetching perkembangan siswa:", error);
        return false;
    }
};

export const isSelesaipendidikanFilled = async () => {
    try {
        const { data } = await axios.get("/admin/akun");
        return (
            data.setelah_pendidikan?.melanjutkan_ke &&
            data.setelah_pendidikan?.bekerja_nama_perusahaan &&
            data.setelah_pendidikan?.bekerja_tanggal_mulai &&
            data.setelah_pendidikan?.bekerja_penghasilan
        );
    } catch (error) {
        console.error("Error fetching selesaipendidikan:", error);
        return false;
    }
};
