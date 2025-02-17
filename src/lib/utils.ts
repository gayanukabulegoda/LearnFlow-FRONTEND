import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
/**
 * This function Combines class names and tailwind classes.
 * A wrapper around clsx and tailwind-merge.
 * Developed to use both class names and tailwind classes in the same function.
 * @param inputs - The class names and tailwind classes to combine.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}