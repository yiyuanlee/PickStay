"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import type { ActionResult } from "@/lib/actions/types";

type AdminAction = (formData: FormData) => Promise<ActionResult>;

interface AdminActionFormProps {
  action: AdminAction;
  children: ReactNode;
  className?: string;
}

async function runAction(
  action: AdminAction,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  return action(formData);
}

export function AdminActionForm({
  action,
  children,
  className,
}: AdminActionFormProps) {
  const [state, formAction, pending] = useActionState(
    runAction.bind(null, action),
    null as ActionResult | null
  );

  return (
    <form action={formAction} className={className}>
      {children}
      {pending && (
        <p className="mt-2 text-xs text-apple-text-secondary">Saving…</p>
      )}
      {state && !state.success && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state && state.success && state.message && (
        <p className="mt-2 text-xs text-apple-blue" role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}

export function AdminBoundActionForm({
  action,
  children,
  className,
}: {
  action: () => Promise<ActionResult>;
  children: ReactNode;
  className?: string;
}) {
  const wrapped = async (
    previous: ActionResult | null,
    formData: FormData
  ): Promise<ActionResult> => {
    void previous;
    void formData;
    return action();
  };

  const [state, formAction, pending] = useActionState(
    wrapped,
    null as ActionResult | null
  );

  return (
    <form action={formAction} className={className}>
      {children}
      {pending && (
        <p className="mt-2 text-xs text-apple-text-secondary">Working…</p>
      )}
      {state && !state.success && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state && state.success && state.message && (
        <p className="mt-2 text-xs text-apple-blue" role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
