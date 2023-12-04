'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';

const UploadButton = () => {
  return (
    <button className="bg-hr-primary text-white rounded-lg">
      <div className="flex flex-col min-w-[35rem] min-h-[22rem] rounded-lg border-dashed border-2 p-6 justify-center items-center text-center">
        <FileUp />
        <p className="text-hr-text">Upload Digital ECG Recording <br/> (.mat or .dat)</p>
      </div>
    </button>
  )
}

export default function FileUpload({ setFilename, setRecordId }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    file.extension = file.name.split('.').pop(); // FIX: Better implementation of extension

    const response = await fetch('/api/r2-file-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.extension
      })
    });

    const response_json = await response.json();
    const { url, recordId } = response_json;
    setFilename(file.name)
    setRecordId(recordId)

    const signedUrl = await fetch('/api/signUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        file: file
      })
    });
    const signedUrlResponse = await signedUrl.json();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <UploadButton />
      }
    </div>
  );
}
