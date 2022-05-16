import Hometemplate from "../templates/HomeTemplate";

interface Props{
    children : JSX.Element | JSX.Element[],
}

const PublicRoute = ({children} : Props) : JSX.Element=>{
      return (
        <Hometemplate>{children}</Hometemplate>
      )
  };
  
  export default PublicRoute
