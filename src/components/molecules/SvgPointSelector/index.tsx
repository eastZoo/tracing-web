import React, { useState, useRef } from "react";

function SvgPointSelector() {
  const [strokes, setStrokes] = useState<any>({});
  const [currentStrokeNumber, setCurrentStrokeNumber] = useState(1);
  const svgRef = useRef(null);

  const handleSvgClick = (event: any) => {
    const svg = svgRef.current;
    const point = getSVGCoordinates(event, svg);

    setStrokes((prevStrokes: any) => {
      const strokePoints = prevStrokes[currentStrokeNumber] || [];
      return {
        ...prevStrokes,
        [currentStrokeNumber]: [...strokePoints, point],
      };
    });
  };

  const getSVGCoordinates = (event: any, svg: any) => {
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());

    return {
      x: svgPoint.x,
      y: svgPoint.y,
    };
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(strokes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // 파일 다운로드 트리거
    const link = document.createElement("a");
    link.href = url;
    link.download = "strokes.json";
    link.click();

    // 리소스 해제
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setStrokes({});
  };

  const handleStrokeNumberChange = (event: any) => {
    setCurrentStrokeNumber(Number(event.target.value));
  };

  return (
    <div>
      <h1>SVG 획 포인트 선택기</h1>
      <div>
        <label>
          현재 획 번호:
          <input
            type="number"
            min="1"
            value={currentStrokeNumber}
            onChange={handleStrokeNumberChange}
          />
        </label>
      </div>
      <svg
        ref={svgRef}
        width="500"
        height="500"
        viewBox="0 0 1407 1407"
        onClick={handleSvgClick}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      >
        <image
          href="http://fileserver.eastzoo.xyz/files/tracing-app/f7772945-38a7-4a5b-8a34-4648df41c139.svg"
          width="100%"
          height="100%"
        />
        {/* 각 획의 포인트 표시 */}
        {Object.entries(strokes).map(([strokeNumber, points]: any) =>
          points?.map((point: any, index: number) => (
            <circle
              key={`${strokeNumber}-${index}`}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={`hsl(${(strokeNumber * 50) % 360}, 100%, 50%)`}
            />
          ))
        )}
      </svg>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleExport}>포인트 내보내기</button>
        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          초기화
        </button>
      </div>
      <h3>획별 포인트 좌표:</h3>
      <pre>{JSON.stringify(strokes, null, 2)}</pre>
    </div>
  );
}

export default SvgPointSelector;
