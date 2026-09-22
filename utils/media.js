/**
 * Helper to ensure media URLs (images, videos, datasheets) are safely loaded over HTTPS 
 * and avoid browser mixed-content (HTTP on HTTPS) blocking when using self-hosted Supabase.
 */
export function getSafeMediaUrl(src, fallback = '/assets/placeholder-product.png') {
  if (!src || typeof src !== 'string' || !src.trim()) {
    return fallback;
  }

  const trimmed = src.trim();

  // If the URL contains Supabase storage path '/storage/v1/object/public/'
  // (e.g., http://76.13.209.182:8000/storage/v1/object/public/images/...)
  // Convert it to relative '/storage/v1/object/public/...' so the browser requests it securely via HTTPS.
  if (trimmed.includes('/storage/v1/object/public/')) {
    const relativePath = trimmed.substring(trimmed.indexOf('/storage/v1/object/public/'));
    return relativePath;
  }

  // If URL contains '/storage/v1/object/sign/' or similar
  if (trimmed.includes('/storage/')) {
    const relativePath = trimmed.substring(trimmed.indexOf('/storage/'));
    return relativePath;
  }

  return trimmed;
}
