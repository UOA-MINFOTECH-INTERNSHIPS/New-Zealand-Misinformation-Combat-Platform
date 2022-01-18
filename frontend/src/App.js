import {Routes, Route, useSearchParams} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/signin';
import Register from  './components/Auth/signup';
import Mission_list from './components/Create/Create/Edit/Delete/Delete/MissionDisplay';
import MissionCheck from './components/Create/Create/Edit/Delete/Delete/MissionCheck';
import FactCheckerVerify from './components/Create/Create/Edit/Delete/Delete/FactCheckerVerify';
import Editor from './components/Create/Create/Edit/Delete/Delete/NewMission';
import AppContext from './AppContextProvider';
import { useState } from 'react';
import PageNotFound from './components/pageNotFound';
import EditMission from './components/Create/Create/Edit/Delete/Delete/MissionModify';
import Article from './components/Article/article';
import Results from './components/Results/resultsContainer';
import Mission from './components/Mission/missionsContainer'
import Home from './components/Home/home'
import UserContext, { UserContextProvider } from './UserContextProvider';
import Recommendation from './components/Article/RecommendationPage';



export default function App() {
  const {loggedIn} = useState(AppContext);
  const {user, setUser} = useState(UserContext);

  return (
    <UserContextProvider value = {{user, setUser}}>
  <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path ='/result' element = {<Results/>} />
      <Route path='/mission' element ={<Mission/>}/>
      <Route path='/recommendation' element ={<Recommendation/>}/>
      <Route path='/profile' element ={<Profile/>}/>
      <Route path='/editor' element ={<Editor/>}/>
      <Route path='/MissionDisplay' element ={<Mission_list/>}/> 
      <Route path='/MissionDisplay/:_id' element ={<EditMission/>}/> 
      <Route path='/MissionCheck' element ={<MissionCheck/>}/> 
      <Route path='/MissionCheck/:_id' element ={<FactCheckerVerify />}/> 
      <Route path='/articles' element ={<ArticlesPage/>}/>
      <Route path='/articles/:id' element ={<Article/>}/>
        

      {!loggedIn ?
      (
        <>
           <Route path="/signin" element={<Login />} /> 
        <Route path="/signup" element ={<Register />} />
          
        </>
      ) :
      (
        <>
          <Route path='/profile' element ={<Profile/>}/>
          <Route path='/editor' element ={<Editor/>}/>
          <Route path='/MissionDisplay/:_id' element ={<EditMission/>}/> 
        </>
      ) }


      <Route path= "/*" element={<PageNotFound/> } />
      </Routes>
    </UserContextProvider>

  );

}