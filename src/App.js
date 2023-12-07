import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const App = () => {
  const webcamRef = useRef(null);
  const [ocrText, setOcrText] = useState(''); // State to store OCR results

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      Tesseract.recognize(
        imageSrc,
        'eng',
        {
          logger: m => console.log(m),
        }
      ).then(({ data: { text } }) => {
        console.log(text);
        setOcrText(text); // Update state with OCR results
      });
    }
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment',
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture</button>
      <div>
        <h2>OCR Results:</h2>
        <p>{ocrText}</p> {/* Display OCR results here */}
      </div>
    </div>
  );
};

export default App;
