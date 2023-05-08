import type { HTMLAttributes, PropsWithChildren } from "react";
import type { As } from "~/types/utils.types";

export interface VisuallyHiddenProps
  extends PropsWithChildren,
    Omit<HTMLAttributes<Element>, "style">,
    As<keyof JSX.IntrinsicElements> {}
