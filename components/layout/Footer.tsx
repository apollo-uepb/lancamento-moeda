import { TEAM } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 pt-4 text-sm text-slate-600">
      <p>
        Projeto desenvolvido por alunos do 2º período de Estatística e Ciência
        de Dados da UEPB para a II SECT-CCT.
      </p>
      <p className="mt-1">Equipe: {TEAM}.</p>
    </footer>
  );
}