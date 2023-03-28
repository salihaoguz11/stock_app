import { useDispatch, useSelector } from "react-redux";
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice";
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
    try {
      dispatch(fetchStart());
      await axiosWithToken.post(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} succesfully updated`);
      getStockData(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be updated`);
    }
  };

  return { getStockData, deleteStockData, postStockData, putStockData };
};

export default useStockCall;
