"use client";

import { useEffect, useRef } from "react";
import { formatInt, plural } from "@/lib/formatting";

interface ProbabilityConfirmationProps {
  open: boolean;
  total: number;
  appliedPercent: number;
  pendingPercent: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ProbabilityConfirmation({
  open,
  total,
  appliedPercent,
  pendingPercent,
  onConfirm,
  onCancel,
}: ProbabilityConfirmationProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 text-slate-800 shadow-xl backdrop:bg-slate-900/50"
    >
      <h2 id="confirm-title" className="text-xl font-bold">
        Aplicar nova probabilidade?
      </h2>
      <p className="mt-3 text-slate-700">
        Você quer mudar a chance de cara de <b>{appliedPercent}%</b> para{" "}
        <b>{pendingPercent}%</b>. Para não misturar lançamentos de moedas
        diferentes, os{" "}
        <b>
          {formatInt(total)} {plural(total, "lançamento", "lançamentos")}
        </b>{" "}
        atuais serão apagados.
      </p>
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-lg border border-slate-300 px-4 font-bold hover:border-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="min-h-11 rounded-lg bg-brand px-4 font-bold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Apagar e aplicar
        </button>
      </div>
    </dialog>
  );
}