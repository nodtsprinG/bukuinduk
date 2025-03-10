export const isAkunFilled = () => {
  return (
    localStorage.getItem("akun-nisn") &&
    localStorage.getItem("akun-jurusanId") &&
    localStorage.getItem("akun-angkatanId")
  );
};
export const isBiodataFilled = () => {
  return (
    localStorage.getItem("biodata-nama") &&
    localStorage.getItem("biodata-panggilan") &&
    localStorage.getItem("biodata-jeniskelamin") &&
    localStorage.getItem("biodata-tempatlahir") &&
    localStorage.getItem("biodata-tanggallahir") &&
    localStorage.getItem("biodata-agama") &&
    localStorage.getItem("biodata-kewarganegaraan") &&
    localStorage.getItem("biodata-anakke") &&
    localStorage.getItem("biodata-kandung") &&
    localStorage.getItem("biodata-angkat") &&
    localStorage.getItem("biodata-tiri") &&
    localStorage.getItem("biodata-status") &&
    localStorage.getItem("biodata-bahasa")
  );
};
export const isTempattinggalFilled = () => {
  return (
    localStorage.getItem("tempattinggal-alamat") &&
    localStorage.getItem("tempattinggal-telp") &&
    localStorage.getItem("tempattinggal-tinggal") &&
    localStorage.getItem("tempattinggal-jarak")
  );
};
export const isKesehatanFilled = () => {
  return (
    localStorage.getItem("kesehatan-goldarah") &&
    localStorage.getItem("kesehatan-penyakit") &&
    localStorage.getItem("kesehatan-jasmani") &&
    localStorage.getItem("kesehatan-tinggi") &&
    localStorage.getItem("kesehatan-berat")
  );
};
export const isPendidikanFilled = () => {
  return (
    localStorage.getItem("pendidikan-tanggal") &&
    localStorage.getItem("pendidikan-tamatan") &&
    localStorage.getItem("pendidikan-tanggal-ijazah") &&
    localStorage.getItem("pendidikan-nomor-ijazah") &&
    localStorage.getItem("pendidikan-tanggal-skhun") &&
    localStorage.getItem("pendidikan-nomor-skhun") &&
    localStorage.getItem("pendidikan-sebelumnyalamabelajar") &&
    localStorage.getItem("pendidikan-darisekolah") &&
    localStorage.getItem("pendidikan-alasan") &&
    localStorage.getItem("pendidikan-kelas") &&
    localStorage.getItem("pendidikan-bidangkeahlian") &&
    localStorage.getItem("pendidikan-programkeahlian") &&
    localStorage.getItem("pendidikan-paketkeahlian")
  );
};
export const isAyahFilled = () => {
  return (
    localStorage.getItem("ayah-nama") &&
    localStorage.getItem("ayah-tempatlahir") &&
    localStorage.getItem("ayah-tanggallahir") &&
    localStorage.getItem("ayah-agama") &&
    localStorage.getItem("ayah-kewarganegaraan") &&
    localStorage.getItem("ayah-pendidikan") &&
    localStorage.getItem("ayah-pekerjaan") &&
    localStorage.getItem("ayah-pengeluaran") &&
    localStorage.getItem("ayah-alamatdantelpon") &&
    localStorage.getItem("ayah-status")
  );
};
export const isIbuFilled = () => {
  return (
    localStorage.getItem("ibu-nama") &&
    localStorage.getItem("ibu-tempatlahir") &&
    localStorage.getItem("ibu-tanggallahir") &&
    localStorage.getItem("ibu-agama") &&
    localStorage.getItem("ibu-kewarganegaraan") &&
    localStorage.getItem("ibu-pendidikan") &&
    localStorage.getItem("ibu-pekerjaan") &&
    localStorage.getItem("ibu-pengeluaran") &&
    localStorage.getItem("ibu-alamatdantelpon") &&
    localStorage.getItem("ibu-status")
  );
};
export const isWaliFilled = () => {
  return (
    localStorage.getItem("wali-nama")?.trim() &&
    localStorage.getItem("wali-tempatlahir")?.trim() &&
    localStorage.getItem("wali-tanggallahir")?.trim() &&
    localStorage.getItem("wali-agama")?.trim() &&
    localStorage.getItem("wali-kewarganegaraan")?.trim() &&
    localStorage.getItem("wali-pendidikan")?.trim() &&
    localStorage.getItem("wali-pekerjaan")?.trim() &&
    localStorage.getItem("wali-pengeluaran")?.trim() &&
    localStorage.getItem("wali-alamatdantelpon")?.trim()
  );
};
export const isHobiFilled = () => {
  return (
    localStorage.getItem("hobi-kesenian")?.trim() &&
    localStorage.getItem("hobi-olahraga")?.trim() &&
    localStorage.getItem("hobi-organisasi")?.trim() &&
    localStorage.getItem("hobi-lainlain")?.trim()
  );
};
export const isPerkembangansiswaFilled = () => {
  return (
    localStorage.getItem("perkembangan-beasiswa") &&

    // Meninggalkan Sekolah
    localStorage.getItem("perkembangan-meninggalkansekolah-tanggal") &&
    localStorage.getItem("perkembangan-meninggalkansekolah-alasan") &&

    // Akhir Pendidikan
    localStorage.getItem("perkembangan-akhirpendidikan-tamat") &&
    localStorage.getItem("perkembangan-akhirpendidikan-no-ijazah") &&
    localStorage.getItem("perkembangan-akhirpendidikan-tanggal-ijazah") &&
    localStorage.getItem("perkembangan-akhirpendidikan-no-skhun") &&
    localStorage.getItem("perkembangan-akhirpendidikan-tanggal-skhun")
  );
};

export const isSelesaipendidikanFilled = () => {
  return (
    localStorage.getItem("selesaipendidikan-melanjutkan") &&
    localStorage.getItem("selesaipendidikan-perusahaan") &&
    localStorage.getItem("selesaipendidikan-tanggal") &&
    localStorage.getItem("selesaipendidikan-penghasilan")
  );
};





