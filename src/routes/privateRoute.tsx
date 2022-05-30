import { useNavigate } from "react-router-dom";
import AdminTemplate from "../templates/AdminTemplate";

interface Props{
    children : JSX.Element | JSX.Element[],
}

const PrivateRoute = ({children} : Props) : JSX.Element=>{
      return (
        <AdminTemplate>{children}</AdminTemplate>
      )
  };
  
  export default PrivateRoute
