import React, { useState, useRef, useEffect } from "react";
import Typography from "../Typography";
import Column from "../Column";
import Row from "../Row";
import Box from "../Box";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { ChartType } from "./ChartCore";
import { parseCustomColor } from "../../theme";
import { getChartIcon } from "./Chart";

interface DetailedTotal {
  label: string;
  total: number;
  datasetIndex: number;
}

interface ChartTotalsProps {
  showDetailedTotals: boolean;
  totalValue: number;
  detailedTotals: DetailedTotal[];
  chartType: ChartType;
  datasets: any[];
  hiddenDatasets?: Set<number>;
  hiddenDataPoints?: Set<number>;
  hoveredDataset?: number | null;
  onToggleDataset?: (index: number) => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
  /**
   * Symbol to display after the total value (e.g., "€", "$", "%")
   */
  totalSymbol?: string;
  /**
   * Number of decimal places to display for totals
   * @default undefined (uses default toLocaleString behavior)
   */
  decimalPlaces?: number;
  /**
   * Enable compact display for large numbers (1000 -> 1k, 1000000 -> 1M, etc.)
   * Maximum 4 digits before decimal point
   * @default false
   */
  compactDisplay?: boolean;
}

const ChartTotals: React.FC<ChartTotalsProps> = ({
  showDetailedTotals,
  totalValue,
  detailedTotals,
  chartType,
  datasets,
  hiddenDatasets = new Set(),
  hiddenDataPoints = new Set(),
  hoveredDataset = null,
  onToggleDataset = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  totalSymbol,
  decimalPlaces,
  compactDisplay = false,
}) => {
  const formatTotal = (value: number): string => {
    let formattedNumber: string;

    if (compactDisplay) {
      // Compact notation: afficher maximum 4 chiffres avant la virgule
      const absValue = Math.abs(value);
      let scaledValue = absValue;
      let suffix = "";

      if (absValue >= 1_000_000_000) {
        // Milliards
        scaledValue = absValue / 1_000_000_000;
        suffix = "B";
      } else if (absValue >= 1_000_000) {
        // Millions
        scaledValue = absValue / 1_000_000;
        suffix = "M";
      } else if (absValue >= 10_000) {
        // Milliers (à partir de 10 000 pour avoir max 4 chiffres)
        scaledValue = absValue / 1_000;
        suffix = "k";
      }

      // Déterminer le nombre de décimales en fonction de la taille du nombre
      let decimals = decimalPlaces;
      if (decimals === undefined) {
        if (scaledValue >= 1000) {
          decimals = 0; // 1234B -> pas de décimale
        } else if (scaledValue >= 100) {
          decimals = 1; // 123.4M -> 1 décimale
        } else if (scaledValue >= 10) {
          decimals = 1; // 12.3k -> 1 décimale
        } else {
          decimals = 2; // 1.23k -> 2 décimales
        }
      }

      const sign = value < 0 ? "-" : "";
      formattedNumber =
        sign +
        scaledValue.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;
    } else {
      // Format standard
      formattedNumber =
        decimalPlaces !== undefined
          ? value.toLocaleString(undefined, {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            })
          : value.toLocaleString();
    }

    return totalSymbol ? `${formattedNumber} ${totalSymbol}` : formattedNumber;
  };
  const isPieOrDoughnut = chartType === "pie" || chartType === "doughnut";
  const currentHiddenDatasets = isPieOrDoughnut
    ? hiddenDataPoints
    : hiddenDatasets;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + itemsPerView < detailedTotals.length;

  useEffect(() => {
    const calculateItemsPerView = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 120
        const gap = 5 * 4;
        const effectiveWidth = containerWidth - gap;
        const maxItems = Math.max(
          2,
          Math.min(6, Math.floor(effectiveWidth / itemWidth))
        );
        setItemsPerView(maxItems);
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, detailedTotals.length - maxItems);
          return Math.min(prev, maxIndex);
        });
      }
    };

    calculateItemsPerView();
    window.addEventListener("resize", calculateItemsPerView);
    return () => window.removeEventListener("resize", calculateItemsPerView);
  }, [detailedTotals.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerView));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, detailedTotals.length - itemsPerView);
      return Math.min(maxIndex, prev + itemsPerView);
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const touch = e.touches[0];
    const x = touch.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  if (showDetailedTotals) {
    const visibleTotals = detailedTotals.slice(
      currentIndex,
      currentIndex + itemsPerView
    );

    return (
      <Row alignItems="center" width="100%" gap={2}>
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            overflowX: "hidden",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            position: "relative",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Row
            gap={5}
            flexWrap="nowrap"
            justifyContent="flex-start"
            sx={{
              transition: "all 0.3s ease-in-out",
              opacity: isDragging ? 0.8 : 1,
            }}
          >
            {visibleTotals.map((item, index) => {
              let datasetColor = "#666666";
              
              if (isPieOrDoughnut) {
                // Pour pie/doughnut, il n'y a qu'un dataset mais plusieurs couleurs
                const dataset = datasets[0];
                if (dataset?.backgroundColor && Array.isArray(dataset.backgroundColor)) {
                  const colorAtIndex = dataset.backgroundColor[item.datasetIndex];
                  if (colorAtIndex) {
                    datasetColor = parseCustomColor(colorAtIndex) ?? "#666666";
                  }
                }
              } else {
                // Pour les autres charts, chaque dataset a sa couleur
                const dataset = datasets[item.datasetIndex];
                if (dataset?.backgroundColor) {
                  if (typeof dataset.backgroundColor === "string") {
                    datasetColor =
                      parseCustomColor(dataset.backgroundColor) ?? "#666666";
                  } else if (Array.isArray(dataset.backgroundColor) && dataset.backgroundColor[0]) {
                    datasetColor =
                      parseCustomColor(dataset.backgroundColor[0]) ?? "#666666";
                  }
                }
              }

              const isHidden = currentHiddenDatasets.has(item.datasetIndex);
              const isHovered = hoveredDataset === item.datasetIndex;
              const iconOpacity = isHidden || isHovered ? 0 : 1;
              const eyeIconOpacity = isHidden || isHovered ? 1 : 0;

              return (
                <Column
                  key={`${item.label}-${currentIndex + index}`}
                  justifyContent="space-between"
                  width="fit-content"
                  sx={{ flexShrink: 0 }}
                >
                  <Typography variant="displaySSemiBold" color="neutral/10">
                    {formatTotal(item.total)}
                  </Typography>
                  <Row
                    alignItems="center"
                    gap={4}
                    mt={1}
                    onClick={() => onToggleDataset(item.datasetIndex)}
                    onMouseEnter={() => onMouseEnter(item.datasetIndex)}
                    onMouseLeave={onMouseLeave}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      width={12}
                      height={12}
                      display="flex"
                      position="relative"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        position="absolute"
                        display="flex"
                        sx={{
                          opacity: iconOpacity,
                          transition: "opacity 200ms ease-in-out",
                        }}
                      >
                        {getChartIcon(chartType, datasetColor)}
                      </Box>
                      <Box
                        display="flex"
                        sx={{
                          opacity: eyeIconOpacity,
                          transition: "opacity 200ms ease-in-out",
                        }}
                      >
                        <Icon
                          variant="stroke"
                          style="rounded"
                          color="neutral/50"
                          size={12}
                        >
                          {isHidden ? "view-off-slash" : "view"}
                        </Icon>
                      </Box>
                    </Box>
                    <Typography variant="bodySMedium" color="neutral/50">
                      {item.label}
                    </Typography>
                  </Row>
                </Column>
              );
            })}
          </Row>
        </Box>
        <IconButton
          color="neutral"
          variant="iconOnly"
          size="small"
          onClick={handlePrevious}
          disabled={!canScrollLeft}
        >
          <Icon size={16} variant="stroke">
            arrow-left-01
          </Icon>
        </IconButton>
        <IconButton
          color="neutral"
          variant="iconOnly"
          size="small"
          onClick={handleNext}
          disabled={!canScrollRight}
        >
          <Icon size={16} variant="stroke">
            arrow-right-01
          </Icon>
        </IconButton>
      </Row>
    );
  }

  return (
    <Column>
      <Typography variant="bodyMMedium" color="neutral/50">
        Total Value
      </Typography>
      <Typography variant="displaySSemiBold" color="neutral/10">
        {formatTotal(totalValue)}
      </Typography>
    </Column>
  );
};

export default ChartTotals;
