'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, FileText, CheckCircle, Eye, Activity } from 'lucide-react';
import Link from 'next/link';
import { Form } from 'react-hook-form';

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  };

  const processFiles = (fileList: File[]) => {
    const imageFiles = fileList.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          file,
          preview: e.target?.result as string,
          id: Math.random().toString(36).substring(7),
        };
        setFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    
    // Show success message or redirect
    alert('Photos uploaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Eye Disease Detection
            </h1>
          </div>
          
          <Link href="/login">
            <Button variant="outline" className="transition-all duration-200 hover:scale-105">
              Logout
            </Button>
          </Link>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto p-6 space-y-8 mt-6 flex flex-col relative">
        {/* Welcome Section */}
        <div className="text-center space-y-4 pt-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
            Welcome to Dashboard
          </h2>
        </div>

        {/* Upload Section */}
        <CardContent className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Upload Fundus Image
            </CardTitle>
            <CardDescription className="text-gray-600">
              Support for PDF, JPG, PNG, DOC files up to 10MB each
            </CardDescription>
          </CardHeader>
          
          <form className="space-y-6">
            {/* Drag & Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-300 cursor-pointer group ${
                dragActive 
                  ? 'border-green-500 bg-green-50 scale-105' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Drop your fundus image here
                  </h3>
                  <p className="text-gray-500">
                    or click to browse your files
                  </p>
                </div>
              </div>
              
              {dragActive && (
                <div className="absolute inset-0 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <p className="text-green-600 font-medium text-lg">Drop files here!</p>
                </div>
              )}
            </div>

            {/* File Preview Grid */}
            {files.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Selected Documents ({files.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      {file.file.type.startsWith('image/') ? (
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                          <FileText className="w-12 h-12 text-green-600" />
                        </div>
                      )}
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate" title={file.file.name}>
                          {file.file.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(file.file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                      
                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Upload Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Upload {files.length} Document{files.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}