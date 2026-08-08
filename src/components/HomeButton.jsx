import { ensureAudio, playTap } from '../sounds';

export default function HomeButton({ onHome }) {
  function goHome() {
    ensureAudio().catch(() => {});
    playTap();
    onHome();
  }

  return (
    <button className="home-btn" onClick={goHome} aria-label="Back to home">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3.5 L21 11.5 H18 V20 H14 V14.5 H10 V20 H6 V11.5 H3 Z" fill="white" />
      </svg>
    </button>
  );
}
