'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';
import axios from 'axios';

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

export default function FileUpload({ setUrl, setRecordId }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    file.extension = file.name.split('.').pop(); // FIX: Better implementation of extension

    const response = await axios.post('/api/r2-file-upload', {
      fileName: file.name,
      fileType: file.extension
    });

    const { url, recordId } = response.data;
    setUrl(url)
    setRecordId(recordId)

    const formData = new FormData();
    formData.append('file', file);

    await axios.put(url, formData, {
      headers: {
        'Content-Type': file.type,
      },
    });
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
