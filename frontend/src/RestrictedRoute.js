import { Outlet} from "react-router-dom";
import Error from './components/pageNotFound';


export default function RestrictedRoute( {isLogged} ) {
  return !isLogged ? <Outlet /> : <Error message={'Please Log out to access this page'}/> ;
}
