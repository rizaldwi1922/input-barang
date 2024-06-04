import React, { useRef, useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected }) => {
    const videoRef = useRef();

    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: videoRef.current,
                    constraints: {
                        width: 480,
                        height: 320,
                        facingMode: "environment", // atau "user" untuk kamera depan
                    },
                },
                decoder: {
                    readers: ["ean_reader"], // atau jenis barcode lainnya yang ingin Anda pindai
                },
            },
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
                Quagga.onDetected(handleDetected);
            }
        );

        return () => {
            Quagga.stop();
        };
    }, []);

    const handleDetected = (result) => {
        if (onDetected) {
            onDetected(result.codeResult.code);
        }
    };

    return (
        <div>
            <button onClick={() => console.log(videoRef)}>test</button>
            <video ref={videoRef} />
        </div>
    );
};

export default BarcodeScanner;
