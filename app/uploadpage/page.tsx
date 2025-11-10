'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

interface FileData {
  id: string;
  file: File;
  preview: string;
  result?: string;
  detectedLabels?: string[];
  status: 'pending' | 'analyzing' | 'completed' | 'error';
}

export default function UploadPage() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const resultParam = searchParams?.get('result');
    if (resultParam === 'true') {
      console.log('✅ Deteksi berhasil, result sudah tersedia.');
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    const fileData = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
    }));
    setFiles((prev) => [...prev, ...fileData]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Pilih file terlebih dahulu!',
      });
      return;
    }

    setIsUploading(true);

    const updatedFiles = await Promise.all(
      files.map(async (file) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'analyzing' } : f
          )
        );

        const formData = new FormData();
        formData.append('file', file.file);

        try {
          const res = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            },
          });

          if (!res.ok) throw new Error('Upload failed');
          const data = await res.json();

          return {
            ...file,
            result: `data:image/png;base64,${data.overlay}`,
            detectedLabels: data.detected_labels,
            status: 'completed' as const,
          };
        } catch (err) {
          console.error('Error:', err);
          return { ...file, status: 'error' as const };
        }
      })
    );

    setFiles(updatedFiles);
    setIsUploading(false);

    // ✅ Ubah URL tanpa reload halaman
    const hasResult = updatedFiles.some((f) => f.status === 'completed');
    if (hasResult) {
      const newUrl = `${window.location.pathname}?result=true`;
      router.push(newUrl, { scroll: false });
    }
  };

  const resetUpload = () => {
    setFiles([]);
    const newUrl = window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Upload className="w-6 h-6 text-blue-500" /> Upload & Analyze Image
        </h2>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex flex-col items-center"
          >
            <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-gray-600">Pilih gambar untuk dianalisis</span>
          </label>
        </div>

        {files.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {files.map((file) => (
              <div
                key={file.id}
                className="border rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-48 h-48 object-cover rounded-md mb-2"
                />
                <p className="text-sm text-gray-700">{file.file.name}</p>
                <p className="text-xs text-gray-500 mb-2">
                  Status: {file.status}
                </p>

                {file.status === 'completed' && file.result && (
                  <img
                    src={file.result}
                    alt="Result"
                    className="w-48 h-48 object-cover rounded-md mt-2 border"
                  />
                )}
                {file.status === 'error' && (
                  <div className="flex items-center text-red-500 mt-2">
                    <AlertCircle className="w-4 h-4 mr-1" /> Gagal memproses file
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={resetUpload}
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={isUploading}
          >
            Reset
          </button>
          <button
            onClick={handleUpload}
            className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? 'Mengunggah...' : 'Analisis Gambar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
