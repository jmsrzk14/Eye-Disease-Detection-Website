import { Suspense } from "react";
import UploadPage from "./upload";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading upload page...</div>}>
      <UploadPage />
    </Suspense>
  );
}
