import { Outlet} from "react-router-dom";
import Error from './components/pageNotFound';


function PrivateRoute({isLogged}) {
  return isLogged ? <Outlet /> : <Error message={'You are not authorized to access this page, Please sign in. '}/> ;
}

export default PrivateRoute;
