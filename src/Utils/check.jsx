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
  return true
};
export const isSelesaipendidikanFilled = () => {
  return (
    localStorage.getItem("selesaipendidikan-melanjutkan") &&
    localStorage.getItem("selesaipendidikan-perusahaan") &&
    localStorage.getItem("selesaipendidikan-tanggal") &&
    localStorage.getItem("selesaipendidikan-penghasilan")
  );
};
export const isPerkembangansiswaFilled = () => {
  return (
    localStorage.getItem("perkembangan-beasiswa") &&
    localStorage.getItem("perkembangan-meninggalkansekolah") &&
    localStorage.getItem("perkembangan-akhirpendidikan")
  );
};
export const isHobiFilled = () => {
  return true;
};
export const isPendidikanFilled = () => {
  return (
    localStorage.getItem("pendidikan-tanggal") &&
    localStorage.getItem("pendidikan-tamatan") &&
    localStorage.getItem("pendidikan-tanggal-ijazah") &&
    localStorage.getItem("pendidikan-nomor-ijazah") &&
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
export const isKesehatanFilled = () => {
  return (
    localStorage.getItem("kesehatan-goldarah") &&
    localStorage.getItem("kesehatan-penyakit") &&
    localStorage.getItem("kesehatan-jasmani") &&
    localStorage.getItem("kesehatan-tinggi") &&
    localStorage.getItem("kesehatan-berat")
  );
};

export const isAkunFilled = () => {
  return (
    localStorage.getItem("akun-nisn") &&
    localStorage.getItem("akun-jurusanId") &&
    localStorage.getItem("akun-angkatanId")
  );
};
