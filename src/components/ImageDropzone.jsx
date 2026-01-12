import { useState } from "react";

export default function ImageDropzone({ onSelect }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onSelect(file);
  };

  return (
    <div
      className="dropzone"
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={e => handleFile(e.target.files[0])}
      />

      {preview ? (
        <img src={preview} alt="Preview" />
      ) : (
        <p>Drag & drop image here or click to upload</p>
      )}
    </div>
  );
}
