import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Settings from './pages/Settings';
import Game from './pages/Game/Game';
import Feedback from './pages/FeedBack/Feedback';
import Ranking from './pages/Ranking/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
