import { Coins } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/**
         * <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
        >
          <Coins size={24}/>
        </span>
         */}
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          Lançamento de moeda
        </h1>
      </div>
      <p className="text-lg sm:text-xl">
        Quantas vezes precisamos lançar uma moeda para verificar se ela é{" "}
        <b className="text-brand-dark">realmente</b> justa?
      </p>
      <p className="max-w-3xl text-sm text-slate-600 sm:text-base">
        Faça seus próprios lançamentos, altere as chances da moeda, compare os resultados com as probabilidades esperadas e veja a Lei dos Grandes Números em ação!
      </p>
    </header>
  );
}