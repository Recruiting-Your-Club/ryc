import React from 'react';
import { Tooltip } from '@components/_common/Tooltip';
import { FileUpLoader } from '@components/FileUpLoader';
import { useRef, useEffect, useState } from 'react';

function TestPage() {
    const [imageSetting, setImageSetting] = useState({ width: 300, height: 300, x: 0, y: 0 });
    const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const updateImageSetting = (newSettings: Partial<typeof imageSetting>) => {
        setImageSetting((prev) => ({ ...prev, ...newSettings }));
    };
    const processImage = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            // 캔버스 크기 설정
            canvas.width = imageSetting.width;
            canvas.height = imageSetting.height;

            ctx?.drawImage(
                img,
                imageSetting.x,
                imageSetting.y,
                imageSetting.width,
                imageSetting.height,
            );
        };
        img.src = 'https://cdn.pixabay.com/photo/2025/05/30/17/16/mountain-9631830_1280.jpg';
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setIsDragging(true);
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setDragStartPosition({
            x: x - imageSetting.x,
            y: y - imageSetting.y,
        });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        //console.log(x, y);
        updateImageSetting({
            x: x - dragStartPosition.x,
            y: y - dragStartPosition.y,
        });
    };

    const getMousePoint = (e: MouseEvent | React.MouseEvent) => {
        updateImageSetting({
            x: Number(e.clientX),
            y: Number(e.clientY),
        });
    };
    //canvasRef.current?.addEventListener('mousemove', getMousePoint);

    useEffect(() => {
        //processImage();
        divRef.current?.addEventListener('mousemove', getMousePoint);
    }, []);

    return (
        <div css={{ display: 'flex', gap: '20px' }}>
            <div
                css={{
                    backgroundColor: '#fff',
                    width: '400px',
                    height: '400px',
                    border: '1px solid black',
                }}
                ref={divRef}
            >
                <img
                    src="https://cdn.pixabay.com/photo/2025/05/30/17/16/mountain-9631830_1280.jpg"
                    alt="test"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        transform: `translate(${imageSetting.x}px, ${imageSetting.y}px)`,
                    }}
                />
            </div>
            <div
                css={{
                    backgroundColor: '#fff',
                    width: '400px',
                    height: '400px',
                    border: '1px solid black',
                }}
                ref={containerRef}
            >
                <canvas
                    id="imageCanvas"
                    ref={canvasRef}
                    //onMouseDown={(event) => handleMouseDown(event)}
                    //onMouseMove={(event) => handleMouseMove(event)}
                    //onMouseUp={handleMouseUp}
                    //onMouseLeave={handleMouseUp}
                    style={{
                        border: '1px solid #ddd',
                        width: '300px',
                        height: '300px',
                        borderRadius: '10px',
                        backgroundColor: '#f0f0f0',
                    }}
                />
            </div>
        </div>
    );
}
export { TestPage };
