import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './styles.css'; // Import your CSS file

export default function Testing() {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!image) {
      alert('Please select an image file.');
      return;
    }

    Tesseract.recognize(
      image,
      'eng', // Language
      { logger: (m) => console.log(m) } // Optional logger
    ).then(({ data: { text } }) => {
      setOcrResult(text);
    }).catch((error) => {
      console.error(error);
      alert('Error performing OCR.');
    });
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">OCR Demo</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Perform OCR</button>
      {ocrResult && (
        <div>
          <h2>OCR Result</h2>
          <p>{ocrResult}</p>
        </div>
      )}
    </div>
  );
}
