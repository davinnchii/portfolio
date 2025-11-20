import { notFound } from 'next/navigation';

// This catch-all route explicitly handles unmatched routes
// Similar to React Router's <Route path="*" element={<NotFoundPage />} />
// Using [...slug] (required) instead of [[...slug]] (optional) to avoid conflict with root page
export default function CatchAll() {
  notFound();
}

