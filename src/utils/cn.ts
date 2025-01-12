import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for combining and managing CSS classes/Tailwind classes.
 *
 * Reference: @see {@link https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper | shadcn/ui}
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
