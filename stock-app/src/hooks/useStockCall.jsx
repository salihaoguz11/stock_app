import { useDispatch, useSelector } from "react-redux"
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import useAxios from "./useAxios"


const useStockCall = () => {
    const dispatch = useDispatch()



    const getStockData = async(url)=>{
        dispatchEvent(fetchStart())
        try {
            const {data}= await 
            
        } catch (error) {
            console.log(error)
            dispatchEvent(fetchFail())
            
        }
    }
    const deleteStockData= async(url,id)=>{
        dispatch(fetchStart())
        try {

            getStockData(url)
        } catch (error) {
            console.log(error)
            dispatch(fetchFail())
            
        }
    }



  return {getStockData,deleteStockData}
  
}

export default useStockCall
