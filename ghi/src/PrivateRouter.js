import { Outlet, Navigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/authApi";


const PrivateRoutes = () => {
    let {data} = useGetTokenQuery();
    console.log(data)
    return(
        data == undefined ? <Outlet/> : <Navigate to="login"/>
    )
}
export default PrivateRoutes;
