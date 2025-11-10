// app/uploadpage/page.tsx
import { Suspense } from 'react';
import UploadClient from './UploadClient';
import LoadingFallback from './loading';

export default function UploadPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UploadClient />
    </Suspense>
  );
}