import TRex from '../dinos/TRex';
import Raptor from '../dinos/Raptor';
import Stego from '../dinos/Stego';
import Trice from '../dinos/Trice';
import './home.css';

export default function HomeScreen({ onSelect }) {
  return (
    <div className="home-screen">
      <h1 className="home-title">🦕 Dino Games!</h1>
      <p className="home-subtitle">Pick a game to play</p>

      <div className="home-cards">
        <button className="game-card card-hatch" onClick={() => onSelect('hatch')}>
          <span className="card-art">
            <svg viewBox="0 0 60 76" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="30" cy="42" rx="25" ry="32" fill="#FDD835" />
              <ellipse cx="24" cy="30" rx="9" ry="7" fill="rgba(255,255,255,.4)" />
              <circle cx="22" cy="46" r="5" fill="#F9A825" opacity=".6" />
              <circle cx="38" cy="34" r="4" fill="#F9A825" opacity=".6" />
              <path d="M16 54 L23 48 L29 56 L36 48 L44 56" stroke="rgba(0,0,0,.22)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span className="card-text">
            <span className="card-name">Dino Hatch</span>
            <span className="card-tag">Crack the eggs!</span>
          </span>
          <span className="card-go">▶</span>
        </button>

        <button className="game-card card-bubble" onClick={() => onSelect('bubble')}>
          <span className="card-art">
            <span className="card-bubble-skin">
              <Raptor />
            </span>
          </span>
          <span className="card-text">
            <span className="card-name">Bubble Pop</span>
            <span className="card-tag">Free the baby dinos!</span>
          </span>
          <span className="card-go">▶</span>
        </button>

        <button className="game-card card-feed" onClick={() => onSelect('feed')}>
          <span className="card-art">
            <TRex />
          </span>
          <span className="card-text">
            <span className="card-name">Feed the Dino</span>
            <span className="card-tag">Yum… or yuck!</span>
          </span>
          <span className="card-go">▶</span>
        </button>

        <button className="game-card card-wash" onClick={() => onSelect('wash')}>
          <span className="card-art card-art-wash">
            <Stego />
            <span className="card-suds s1" />
            <span className="card-suds s2" />
            <span className="card-suds s3" />
          </span>
          <span className="card-text">
            <span className="card-name">Dino Wash</span>
            <span className="card-tag">Scrub-a-dub-dub!</span>
          </span>
          <span className="card-go">▶</span>
        </button>

        <button className="game-card card-run" onClick={() => onSelect('run')}>
          <span className="card-art card-art-run">
            <Raptor />
            <svg className="card-coin" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#FBC02D" />
              <circle cx="16" cy="16" r="10" fill="#FDD835" />
            </svg>
          </span>
          <span className="card-text">
            <span className="card-name">Dino Run</span>
            <span className="card-tag">Run and jump!</span>
          </span>
          <span className="card-go">▶</span>
        </button>

        <button className="game-card card-match" onClick={() => onSelect('match')}>
          <span className="card-art card-art-match">
            <span className="mini-card mini-card-back">?</span>
            <span className="mini-card mini-card-front">
              <Trice />
            </span>
          </span>
          <span className="card-text">
            <span className="card-name">Dino Match</span>
            <span className="card-tag">Find the pairs!</span>
          </span>
          <span className="card-go">▶</span>
        </button>
      </div>
    </div>
  );
}
