import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import Quagga from '@ericblade/quagga2'; // Import Quagga2

const App = () => {
  const webcamRef = useRef(null);
  const [qrCode, setQrCode] = useState(''); // State to store QR code results

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      Quagga.decodeSingle({
        src: imageSrc,
        numOfWorkers: 0,  // Needs to be 0 when used in Node
        inputStream: {
          size: 800  // restrict input-size to be 800px in width (long-side)
        },
        decoder: {
          readers: ["qr_reader"]  // Use QR code reader
        },
      }, (result) => {
        if (result && result.codeResult) {
          console.log(result.codeResult.code);
          setQrCode(result.codeResult.code); // Update state with QR code results
        } else {
          console.log("No QR code detected");
        }
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
      <button onClick={capture}>Capture QR Code</button>
      <div>
        <h2>QR Code Results:</h2>
        <p>{qrCode}</p> {/* Display QR code results here */}
      </div>
    </div>
  );
};

export default App;
