// Coded by Lucky
/**
 * sanitize.js — Input sanitization utility
 * Strips script injections, HTML tags, dangerous URI schemes, and limits length.
 */

const MAX_INPUT_LENGTH = 2048;

/**
 * Sanitizes a user-supplied string for use as a URL/domain input.
 * - Removes leading/trailing whitespace
 * - Strips HTML tags
 * - Blocks javascript:, data:, vbscript: URI schemes
 * - Truncates to MAX_INPUT_LENGTH characters
 * @param {string} input
 * @returns {string}
 */
export function sanitizeUrl(input) {
  if (typeof input !== 'string') return '';
  let clean = input.trim().slice(0, MAX_INPUT_LENGTH);
  clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Strip HTML tags
  clean = clean.replace(/<[^>]*>/g, '');
  // Block dangerous URI schemes
  clean = clean.replace(/^(javascript|data|vbscript):/i, '');
  // Remove null bytes and control characters (except tab \t, newline \n, CR \r)
  clean = clean.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ''); // eslint-disable-line no-control-regex
  return clean;
}

/**
 * Sanitizes a bulk textarea input — splits by newline, sanitizes each line,
 * filters empty/invalid lines, and rejoins.
 * @param {string} input
 * @returns {string}
 */
export function sanitizeBulk(input) {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, MAX_INPUT_LENGTH * 10)
    .split('\n')
    .map(line => sanitizeUrl(line))
    .filter(line => line.length > 0)
    .join('\n');
}

/**
 * Sanitizes a generic text input (e.g., decoder input).
 * Less strict than URL sanitization — primarily prevents XSS.
 * @param {string} input
 * @returns {string}
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, MAX_INPUT_LENGTH)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ''); // eslint-disable-line no-control-regex
}
