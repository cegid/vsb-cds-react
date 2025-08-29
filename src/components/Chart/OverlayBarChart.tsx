"use client";

import React, { useRef, useEffect } from 'react';
import { parseCustomColor } from '../../theme';
import { CustomChartData } from './ChartCore';

interface OverlayBarChartProps {
  data: CustomChartData;
  width?: number | string;
  height?: number | string;
  showGrid?: boolean;
  onHover?: (datasetIndex: number, labelIndex: number, event: MouseEvent, barRect?: { x: number, y: number, width: number, height: number }) => void;
  onMouseLeave?: () => void;
}

interface BarGroup {
  label: string;
  datasets: Array<{
    label: string;
    value: number;
    color: string;
    isBackground: boolean;
  }>;
}

const OverlayBarChart: React.FC<OverlayBarChartProps> = ({
  data,
  width = '100%',
  height = 400,
  showGrid = true,
  onHover,
  onMouseLeave
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartDataRef = useRef<{
    sections: Array<{
      labelIndex: number;
      x: number;
      width: number;
      stacks: Array<{
        datasetIndex: number;
        x: number;
        y: number;
        width: number;
        height: number;
      }>;
    }>;
    linePoints: Array<{
      datasetIndex: number;
      x: number;
      y: number;
      labelIndex: number;
    }>;
  }>({ sections: [], linePoints: [] });

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x, y + height); 
    ctx.lineTo(x, y + radius); 
    ctx.arcTo(x, y, x + radius, y, radius); 
    ctx.lineTo(x + width - radius, y); 
    ctx.arcTo(x + width, y, x + width, y + radius, radius); 
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height); 
    ctx.closePath();
    ctx.fill();
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    const padding = { top: 20, right: 40, bottom: 40, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;
    
    const maxValue = Math.max(
      ...data.datasets.flatMap(d => d.data)
    );
    
    if (showGrid) {
      ctx.strokeStyle = '#E6E7EA';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 5; i++) {
        const y = padding.top + (chartHeight * i / 5);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
        
        const value = maxValue * (1 - i / 5);
        ctx.fillStyle = '#666666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(value).toLocaleString(), padding.left - 10, y + 4);
      }
    }
   
    const totalSections = data.labels.length;
    const stacksPerSection = Math.max(...data.labels.map((_, labelIndex) => {
      const stacksForLabel = new Set();
      data.datasets.forEach(dataset => {
        if (dataset.type !== 'line') {
          stacksForLabel.add(dataset.stack || 'default');
        }
      });
      return stacksForLabel.size;
    }));
    
    const minGapBetweenStacks = 6;
    const minGapBetweenSections = 16;
    
    const totalSectionGaps = (totalSections - 1) * minGapBetweenSections;
    const availableWidthForSections = chartWidth - totalSectionGaps;
    const sectionContentWidth = availableWidthForSections / totalSections;
    
    const availableWidthPerSection = sectionContentWidth - (minGapBetweenStacks * Math.max(0, stacksPerSection - 1));
    const stackWidth = Math.max(availableWidthPerSection / stacksPerSection, 20); // Minimum 20px per stack
    const actualGapBetweenStacks = minGapBetweenStacks;
    
    chartDataRef.current.sections = [];
    chartDataRef.current.linePoints = [];
    
    data.labels.forEach((label, labelIndex) => {
      const sectionX = padding.left + (labelIndex * (sectionContentWidth + minGapBetweenSections));
      
      const stackGroups: Record<string, { background?: number, foreground?: number, bgColor?: string, fgColor?: string }> = {};
      
      data.datasets.forEach(dataset => {
        if (dataset.type === 'line') return;
        
        const stack = dataset.stack || 'default';
        const isBackground = dataset.label?.toLowerCase().includes('prévision') || false;
        const value = dataset.data[labelIndex];
        
        let color = '#666666';
        if (typeof dataset.backgroundColor === 'string') {
          color = parseCustomColor(dataset.backgroundColor) || color;
        }
        
        if (!stackGroups[stack]) {
          stackGroups[stack] = {};
        }
        
        if (isBackground) {
          stackGroups[stack].background = value;
          stackGroups[stack].bgColor = color;
        } else {
          stackGroups[stack].foreground = value;
          stackGroups[stack].fgColor = color;
        }
      });
      
      let stackOffset = 0;
      const sectionStacks: Array<{
        datasetIndex: number;
        x: number;
        y: number;
        width: number;
        height: number;
      }> = [];
      
      Object.entries(stackGroups).forEach(([stackName, stackData], stackIndex) => {
        const stackX = sectionX + stackOffset;
        
        if (stackData.background && stackData.bgColor) {
          const bgHeight = (stackData.background / maxValue) * chartHeight;
          const bgY = padding.top + chartHeight - bgHeight;
          
          ctx.fillStyle = stackData.bgColor;
          drawRoundedRect(ctx, stackX, bgY, stackWidth, bgHeight, 4);
          
          const bgDatasetIndex = data.datasets.findIndex(d => 
            d.stack === stackName && d.label?.toLowerCase().includes('prévision')
          );
          if (bgDatasetIndex !== -1) {
            sectionStacks.push({
              datasetIndex: bgDatasetIndex,
              x: stackX,
              y: bgY,
              width: stackWidth,
              height: bgHeight
            });
          }
        }
        
        if (stackData.foreground && stackData.fgColor) {
          const fgHeight = (stackData.foreground / maxValue) * chartHeight;
          const fgY = padding.top + chartHeight - fgHeight;
          
          ctx.fillStyle = stackData.fgColor;
          drawRoundedRect(ctx, stackX, fgY, stackWidth, fgHeight, 4);
          
          const fgDatasetIndex = data.datasets.findIndex(d => 
            d.stack === stackName && !d.label?.toLowerCase().includes('prévision')
          );
          if (fgDatasetIndex !== -1) {
            sectionStacks.push({
              datasetIndex: fgDatasetIndex,
              x: stackX,
              y: fgY,
              width: stackWidth,
              height: fgHeight
            });
          }
        }
        
        stackOffset += stackWidth + (stackIndex < Object.keys(stackGroups).length - 1 ? actualGapBetweenStacks : 0);
      });
      
      chartDataRef.current.sections.push({
        labelIndex,
        x: sectionX,
        width: sectionContentWidth,
        stacks: sectionStacks
      });
      
      ctx.fillStyle = '#666666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(label, sectionX + sectionContentWidth / 2, rect.height - 10);
    });

    const lineDatasets = data.datasets.filter(dataset => dataset.type === 'line');
    
    lineDatasets.forEach((dataset, lineDatasetIndex) => {
      const datasetIndex = data.datasets.findIndex(d => d === dataset);
      
      let lineColor = '#666666';
      if (typeof dataset.borderColor === 'string') {
        lineColor = parseCustomColor(dataset.borderColor) || lineColor;
      }
      
      const points: Array<{ x: number; y: number }> = [];
      
      data.labels.forEach((label, labelIndex) => {
        const value = dataset.data[labelIndex];
        const sectionX = padding.left + (labelIndex * (sectionContentWidth + minGapBetweenSections));
        const pointX = sectionX + sectionContentWidth / 2;
        const pointY = padding.top + chartHeight - (value / maxValue) * chartHeight;
        
        points.push({ x: pointX, y: pointY });
        
        chartDataRef.current.linePoints.push({
          datasetIndex: datasetIndex,
          x: pointX,
          y: pointY,
          labelIndex: labelIndex
        });
      });
      
      if (points.length > 1) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = dataset.borderWidth || 3;
        ctx.beginPath();
        
        const tension = dataset.tension || 0.4;
        
        if (tension > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let i = 1; i < points.length; i++) {
            const prevPoint = points[i - 1];
            const currentPoint = points[i];
            
            const cpx = prevPoint.x + (currentPoint.x - prevPoint.x) * tension;
            const cpy = prevPoint.y + (currentPoint.y - prevPoint.y) * tension;
            ctx.quadraticCurveTo(cpx, cpy, currentPoint.x, currentPoint.y);
          }
        } else {
          ctx.moveTo(points[0].x, points[0].y);
          points.slice(1).forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
        }
        
        ctx.stroke();
        const pointRadius = dataset.pointRadius || 4;
        
        points.forEach((point, pointIndex) => {
          const backgroundColor = Array.isArray(dataset.backgroundColor) 
            ? dataset.backgroundColor[0] 
            : dataset.backgroundColor;
          ctx.fillStyle = backgroundColor || lineColor;
          ctx.beginPath();
          ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
          ctx.fill();
          
          if (dataset.borderColor) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      }
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onHover) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (const point of chartDataRef.current.linePoints) {
      const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
      const hoverRadius = 8; 

      if (distance <= hoverRadius) {
        const barRect = {
          x: point.x - hoverRadius,
          y: point.y - hoverRadius,
          width: hoverRadius * 2,
          height: hoverRadius * 2
        };
        onHover(point.datasetIndex, point.labelIndex, event.nativeEvent, barRect);
        return;
      }
    }
    
    for (const section of chartDataRef.current.sections) {
      for (const stack of section.stacks) {
        if (x >= stack.x && x <= stack.x + stack.width && 
            y >= stack.y && y <= stack.y + stack.height) {
          const barRect = {
            x: stack.x,
            y: stack.y,
            width: stack.width,
            height: stack.height
          };
          onHover(stack.datasetIndex, section.labelIndex, event.nativeEvent, barRect);
          return;
        }
      }
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  useEffect(() => {
    drawChart();
    
    const handleResize = () => {
      setTimeout(drawChart, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data, showGrid]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height,
        position: 'relative'
      }}
    >
      <canvas 
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

export default OverlayBarChart;