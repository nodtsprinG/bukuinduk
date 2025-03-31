import { useLocation } from "react-router-dom";

const TambahPage = () => {
    const location = useLocation();
    const id = location.state?.id;

    console.log("ID yang diterima:", id);

    return <h1>Halaman Tambah dengan ID: {id}</h1>;
};
export default TambahPage;