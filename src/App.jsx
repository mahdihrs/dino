import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import DinoHatch from './games/DinoHatch';
import BubblePop from './games/BubblePop';
import FeedTheDino from './games/FeedTheDino';
import DinoWash from './games/DinoWash';
import DinoRun from './games/DinoRun';
import DinoMatch from './games/DinoMatch';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('home');
  const goHome = () => setScreen('home');

  if (screen === 'hatch') return <DinoHatch onHome={goHome} />;
  if (screen === 'bubble') return <BubblePop onHome={goHome} />;
  if (screen === 'feed') return <FeedTheDino onHome={goHome} />;
  if (screen === 'wash') return <DinoWash onHome={goHome} />;
  if (screen === 'run') return <DinoRun onHome={goHome} />;
  if (screen === 'match') return <DinoMatch onHome={goHome} />;
  return <HomeScreen onSelect={setScreen} />;
}
