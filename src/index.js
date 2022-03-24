import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import PollMain from './PollMain';
import './index.scss';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';

import Amplify, { AuthModeStrategyType } from "aws-amplify";
import awsExports from "./aws-exports";
import Dashboard from './Dashboard';
import EditPoll from './EditPoll';
import CustomNav from './Nav/CustomNav';
import DashboardNav from './Nav/DashboardNav';
import AccountAccess from './AccountAccess';
Amplify.configure({...awsExports, DataStore: {
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
}});



ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/> } />
          <Route path="login" element={<AccountAccess/> } />
          <Route path="dashboard" element={<Dashboard/> } >
            <Route path="edit/:pollId" element={<EditPoll home='/dashboard'><DashboardNav/></EditPoll> } />
            <Route path="*" element={<Dashboard/> } />
          </Route>
          <Route path="edit/:pollId" element={<EditPoll home='/'><CustomNav/></EditPoll> } />
          <Route path="preview/:pollId" element={<PollMain preview={true}/> } />
          <Route path="poll/:pollId" element={<PollMain/> } />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();