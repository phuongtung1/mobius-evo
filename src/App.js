import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Spin } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthContext } from './Contexts';
import HeaderComponent from './components/HeaderComponent';
import MainSection from './components/MainSection';

function App(){
  const [ cognitoPayload, setCognitoPayload ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  async function authUser()
  { 
    try 
    {
      let currSession = await Auth.currentSession();
      setCognitoPayload(currSession.getIdToken().payload);
    } 
    catch (err) 
    {
      if (err !== "No current user") 
      { // no current user on page load
        alert(err);
      }
    }
    finally
    {
      setIsLoading(false);
    }
  };
  useEffect(()=>{authUser()}, []);

  return(
    <Spin
      spinning={isLoading}
      tip="loading..."    
    >
      <AuthContext.Provider value={{ cognitoPayload, setCognitoPayload, isLoading }}>
        <BrowserRouter>
          <div id="app-body">
            <HeaderComponent />
            <main>
              <MainSection />
            </main>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </Spin>
  );
};


export default App;
