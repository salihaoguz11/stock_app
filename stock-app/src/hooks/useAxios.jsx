import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosPublic = axios.create({
    baseURL: "https://stockapi-server.onrender.com",
  });

  const axiosWithToken = axios.create({
    baseURL: "https://stockapi-server.onrender.com",
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken, axiosPublic };
};

export default useAxios;
