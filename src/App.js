import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const App = () => {
  const webcamRef = useRef(null);

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
      });
    }
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
      />
      <button onClick={capture}>Capture</button>
    </div>
  );
};

export default App;
