import {Routes, Route} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
//import Profile from './components/Profile/Profile';
import Profile from './components/Profile/UserProfile';
import Login from './components/Auth/signin';
import Register from  './components/Auth/signup';
import AppContext from './AppContextProvider';
import { useContext} from 'react';
import PageNotFound from './components/pageNotFound';
import Article from './components/Article/article';
import Results from './components/Results/resultsContainer';
import Missions from './components/Mission/missionsContainer';
import Mission from './components/Mission/missionDetail';
import Home from './components/Home/home';
import VerifiedArticle from './components/Results/verifiedArticle'
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
//mission
import Editor from './components/Modify/NewMission';
import MyMissions from './components/Profile/MyMissions';
import EditMission from './components/Modify/MissionModify';
import CreateMissionByArticle from './components/Modify/CreateMissionByArticle';
//verify
import FactCheckerVerify from './components/Modify/FactCheckerVerify';
import MyResults from './components/Profile_FactChecker/MyResults';
import EditResults from './components/Modify/ResultsModify';
import Liked from './components/Results/userLiked';


export default function App() {
  const {loggedIn} = useContext(AppContext);


  return (
<Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/articles' element ={<ArticlesPage/>}/>
      <Route path='/articles/:id' element ={<Article/>}/>
      <Route path ='/result' element = {<Results/>} />
      <Route path ='/result/:id/read' element = {<VerifiedArticle/>} />
      <Route path='/mission' element ={<Missions/>}/>
      <Route path='/mission/:id/read' element ={<Mission/>}/>

      <Route element={<PrivateRoute isLogged={loggedIn} />}>
        <Route path='/profile' element ={<Profile/>}/> 
        <Route path='/mission/:_id/verify' element ={<FactCheckerVerify />}/>  {/* fact checker verify mission的界面*/}
        <Route path='/NewMission' element ={<Editor/>}/>              {/*创建新的mission*/}
        <Route path='/NewMission/:_id' element ={<CreateMissionByArticle/>}/>
        <Route path='/MyMissions' element ={<MyMissions/>}/> 
        <Route path='/MyMissions/:_id' element ={<EditMission/>}/>   {/* 编辑某用户创建的某个mission */}
        <Route path='/MyResults' element ={<MyResults/>}/> 
        <Route path='/ResultsModify/:_id' element ={<EditResults />}/>
        <Route path='/liked' element ={<Liked/>}/> 
      </Route>
    
      <Route element={<RestrictedRoute isLogged={loggedIn} />}>
        <Route path="/signup" element ={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Route>
    

      </Routes>

)
}