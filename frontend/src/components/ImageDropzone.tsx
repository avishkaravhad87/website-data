import React, { useEffect, useRef, useState } from 'react';

interface ImageDropzoneProps {
  value?: string;
  onChange: (file: File | null) => void;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');

  useEffect(() => {
    setPreview(value || '');
  }, [value]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2 MB.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
    onChange(file);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setPreview('');
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      className={`image-dropzone ${
        dragging ? 'dragging' : ''
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      {preview ? (
        <div className="upload-preview">
          <img
            src={preview}
            alt="Product preview"
          />

          <div className="upload-preview-overlay">
            <span>Click or drop another image</span>

            <button
              type="button"
              className="remove-image-button"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-icon">
            📷
          </div>

          <h3>Drag & Drop Image Here</h3>

          <p>
            or <strong>click to browse</strong>
          </p>

          <span>
            JPG, PNG or WEBP • Maximum 2 MB
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
