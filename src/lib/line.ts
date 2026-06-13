// Normalize an admin-entered LINE OA value into an openable URL.
// Accepts a full link (https://lin.ee/... or https://line.me/...) or a LINE ID
// (with or without a leading "@"). Returns '' when there is nothing to link to.
export function resolveLineUrl(value?: string): string {
  if (!value) return '';
  const v = value.trim();
  if (!v) return '';
  if (/^https?:\/\//i.test(v)) return v;
  const id = v.startsWith('@') ? v : `@${v}`;
  return `https://line.me/R/ti/p/${encodeURIComponent(id)}`;
}
