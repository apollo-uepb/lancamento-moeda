import type { CSSProperties } from "react";
import {
  COIN_DIAMETER,
  JUMP_HEIGHT,
  SPIN_SECONDS,
  TURNS,
} from "@/lib/constants";
import type { CoinFace } from "@/types/simulation";

interface CoinProps {
  face: CoinFace | null;
  previousFace: CoinFace | null;
  animate: boolean;
  spinId: number;
}

export default function Coin({ face, previousFace, animate, spinId }: CoinProps) {
  const base = face === 0 ? 180 : 0; // 180° mostra o verso (COROA)
  const from = previousFace === 0 ? 180 : 0;

  const style = {
    "--coin-size": `${COIN_DIAMETER}px`,
    "--jump-height": `${JUMP_HEIGHT}px`,
    "--spin-duration": `${SPIN_SECONDS}s`,
    "--coin-angle": `${base}deg`,
    "--coin-from": `${from}deg`,
    "--coin-to": `${TURNS * 360 + base}deg`,
  } as CSSProperties;

  const front = face === null ? "?" : "CARA";
  const back = face === null ? "?" : "COROA";
  const label =
    face === null ? "Ainda sem lançamentos" : face === 1 ? "Cara" : "Coroa";
  const animating = animate && face !== null;

  return (
    <div className="flex flex-col items-center gap-1">
      {/* A key muda a cada lançamento: reinicia a animação mesmo com resultados iguais. */}
      <div
        key={animating ? `spin-${spinId}` : "static"}
        className={`coin-stage${animating ? " coin-animating" : ""}`}
        style={style}
        role="img"
        aria-label={`Moeda mostrando ${label}`}
      >
        <div className="coin-shadow" />
        <div className="coin-jump">
          <div className="coin">
            <div className="coin-face">{front}</div>
            <div className="coin-face coin-back">{back}</div>
          </div>
        </div>
      </div>
      <p aria-live="polite" className="text-sm text-slate-600">
        {face === null ? (
          "Lance a moeda para começar!"
        ) : (
          <>
            Último resultado: <b className="text-brand-dark">{label}</b>
          </>
        )}
      </p>
    </div>
  );
}