// utils/sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input);
};
