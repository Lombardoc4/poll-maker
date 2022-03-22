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

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import Dashboard from './Dashboard';
import EditPoll from './EditPoll';
Amplify.configure(awsExports);


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/> } />
          <Route path="/dashboard/edit/:pollId" element={<EditPoll/> } />
          <Route path="/dashboard/*" element={<Dashboard/> } />
          <Route path="/preview/:pollId" element={<PollMain/> } />
          <Route path="/poll/:pollId" element={<PollMain/> } />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();