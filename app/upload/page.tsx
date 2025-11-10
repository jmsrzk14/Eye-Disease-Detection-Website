// app/uploadpage/page.tsx
import { Suspense } from 'react';
import UploadClient from './UploadClient';
import LoadingFallback from './loading';

export default function UploadPage({
  searchParams,
}: {
  searchParams: { result?: string };
}) {
  const showResult = searchParams.result === 'true';

  return (
    <Suspense fallback={<LoadingFallback />}>
      <UploadClient initialShowResult={showResult} />
    </Suspense>
  );
}