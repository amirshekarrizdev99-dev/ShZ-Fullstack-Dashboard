import { Metadata } from "next";

import ProductUploadForm from "@/features/products/components/ProductUploadForm";

export const metadata: Metadata = {
  title: "Upload",
  description: "Upload",
};

export default function UploadPage() {
  return (
    <div className="w-full min-w-0">
      <ProductUploadForm />
    </div>
  );
}
