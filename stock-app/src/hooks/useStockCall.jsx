import { useDispatch } from "react-redux";
import {
  fetchFail,
  getSuccess,
  fetchStart,
  getProCatBrandSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`stock/${url}/`);

      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatchEvent(fetchFail());
    }
  };
  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`stock/${url}/${id}`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const postStockData = async (url, info) => {
    try {
      dispatch(fetchStart());
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} succesfully posted`);
      getStockData(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be posted`);
    }
  };
  const putStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} succesfully updated`);
      getStockData(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be updated`);
    }
  };
  const getProCatBrand = async () => {
    dispatch(fetchStart());
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("/stock/products/"),
        axiosWithToken.get("/stock/categories/"),
        axiosWithToken.get("/stock/brands"),
      ]);
      dispatch(
        getProCatBrandSuccess([products?.data, categories?.data, brands?.data])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`Data can not be updated`);
    }
  };

  return {
    getStockData,
    deleteStockData,
    postStockData,
    putStockData,
    getProCatBrand,
  };
};

export default useStockCall;
