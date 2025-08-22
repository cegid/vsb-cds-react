import React, { useState, useRef, useEffect } from "react";
import Typography from "../Typography";
import Row from "../Row";
import Box from "../Box";
import Icon from "../Icon";
import { ChartType } from "./ChartCore";
import { RADIUS, parseCustomColor } from "../../theme";
import { getChartIcon } from "./Chart";
import Column from "../Column";

interface ChartLegendProps {
  datasets: any[];
  chartType: ChartType;
  hiddenDatasets: Set<number>;
  hoveredDataset: number | null;
  onToggleDataset: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  labels?: string[];
  isMobileLayout?: boolean;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  datasets,
  chartType,
  hiddenDatasets,
  hoveredDataset,
  onToggleDataset,
  onMouseEnter,
  onMouseLeave,
  labels = [],
  isMobileLayout = false,
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLDivElement>(null);

  const getEstimatedWidth = (dataset: any) => {
    const labelLength = dataset.label?.length || 10;
    return Math.max(100, labelLength * 8 + 60);
  };

  const calculateMaxItemsWithButton = (
    containerWidth: number,
    gap: number,
    plusButtonWidth: number
  ) => {
    let totalWidth = 0;
    let maxItems = 0;

    for (let i = 0; i < datasets.length; i++) {
      const estimatedWidth = getEstimatedWidth(datasets[i]);
      const gapWidth = i > 0 ? gap : 0;

      if (
        totalWidth + estimatedWidth + gapWidth <=
        containerWidth - plusButtonWidth
      ) {
        totalWidth += estimatedWidth + gapWidth;
        maxItems = i + 1;
      } else {
        break;
      }
    }

    return maxItems;
  };

  const calculateTotalWidth = (gap: number) => {
    return datasets.reduce((total, dataset, i) => {
      const estimatedWidth = getEstimatedWidth(dataset);
      const gapWidth = i > 0 ? gap : 0;
      return total + estimatedWidth + gapWidth;
    }, 0);
  };

  const calculateVisibleItems = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const gap = 8;
    const plusButtonWidth = 70;

    const maxItems = calculateMaxItemsWithButton(
      containerWidth,
      gap,
      plusButtonWidth
    );

    if (maxItems === datasets.length) {
      setVisibleCount(datasets.length);
    } else {
      const allItemsWidth = calculateTotalWidth(gap);

      if (allItemsWidth <= containerWidth) {
        setVisibleCount(datasets.length);
      } else {
        setVisibleCount(Math.max(1, maxItems));
      }
    }
  };

  useEffect(() => {
    setTimeout(calculateVisibleItems, 100);
    window.addEventListener("resize", calculateVisibleItems);
    return () => window.removeEventListener("resize", calculateVisibleItems);
  }, [datasets]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        plusButtonRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !plusButtonRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showModal]);

  const displayedDatasets = datasets.slice(0, visibleCount);
  const remainingDatasets = datasets.slice(visibleCount);
  const remainingCount = datasets.length - visibleCount;

  const isVerticalLayout = chartType === "pie" || chartType === "doughnut";

  const renderDatasetItem = (
    dataset: any,
    index: number,
    isInModal = false
  ) => {
    let datasetColor = "#666666";

    if (
      dataset.backgroundColor &&
      typeof dataset.backgroundColor === "string"
    ) {
      datasetColor = parseCustomColor(dataset.backgroundColor) ?? "white";
    } else if (
      dataset.backgroundColor &&
      Array.isArray(dataset.backgroundColor) &&
      dataset.backgroundColor[0]
    ) {
      datasetColor = parseCustomColor(dataset.backgroundColor[0]) ?? "white";
    }

    const isHidden = hiddenDatasets.has(index);
    const isHovered = hoveredDataset === index;
    const iconOpacity = isHidden || isHovered ? 0 : 1;
    const eyeIconOpacity = isHidden || isHovered ? 1 : 0;

    return (
      <Row
        alignItems="center"
        key={`${dataset.label}-${index}`}
        gap={4}
        backgroundColor="white"
        py={2}
        px={4}
        width="fit-content"
        borderRadius={RADIUS.FULL}
        onClick={() => onToggleDataset(index)}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        sx={{
          cursor: "pointer",
          flexShrink: isInModal ? 1 : 0,
          border: isInModal || isVerticalLayout ? "none" : "1px solid #E6E7EA",
          display: "inline-flex",
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
            <Icon variant="stroke" style="rounded" color="neutral/50" size={12}>
              {isHidden ? "view-off-slash" : "view"}
            </Icon>
          </Box>
        </Box>
        <Typography variant="bodySMedium" color="neutral/50">
          {dataset.label}
        </Typography>
      </Row>
    );
  };

  const getPieDatasets = () => {
    if (!isVerticalLayout) return datasets;

    const pieDataset = datasets[0];
    if (!pieDataset) return [];

    return pieDataset.data.map((value: number, index: number) => ({
      label: labels[index] || `Item ${index + 1}`,
      data: [value],
      backgroundColor: Array.isArray(pieDataset.backgroundColor)
        ? pieDataset.backgroundColor[index]
        : pieDataset.backgroundColor,
      borderColor: Array.isArray(pieDataset.borderColor)
        ? pieDataset.borderColor[index]
        : pieDataset.borderColor,
    }));
  };

  const renderDatasets = getPieDatasets();

  return isVerticalLayout ? (
    isMobileLayout ? (
      <Row gap={2} flexWrap="wrap">
        {renderDatasets.map((dataset: any, index: number) =>
          renderDatasetItem(dataset, index, false)
        )}
      </Row>
    ) : (
      <Column gap={2}>
        {renderDatasets.map((dataset: any, index: number) =>
          renderDatasetItem(dataset, index, false)
        )}
      </Column>
    )
  ) : (
    <Box position="relative">
      <Row ref={containerRef} gap={2} flexWrap="nowrap" overflow="hidden">
        {displayedDatasets.map((dataset, index) =>
          renderDatasetItem(dataset, index)
        )}

        {remainingCount > 0 && (
          <Box
            ref={plusButtonRef}
            position="relative"
            onClick={() => setShowModal(!showModal)}
            sx={{
              cursor: "pointer",
              flexShrink: 0,
            }}
            ml={2}
          >
            <Box
              position="absolute"
              height="100%"
              left={-4}
              backgroundColor="white"
              borderRadius={RADIUS.FULL}
              py={2}
              px={4}
              minWidth={50}
              sx={{
                border: "1px solid #E6E7EA",
                zIndex: 1,
              }}
            />
            <Box
              height="100%"
              position="absolute"
              left={-2}
              backgroundColor="white"
              borderRadius={RADIUS.FULL}
              py={2}
              px={4}
              minWidth={50}
              sx={{
                border: "1px solid #E6E7EA",
                zIndex: 2,
              }}
            />
            <Row
              alignItems="center"
              gap={4}
              backgroundColor="white"
              py={2}
              px={4}
              width={"auto"}
              minWidth={50}
              borderRadius={RADIUS.FULL}
              sx={{
                border: "1px solid #E6E7EA",
                zIndex: 3,
                position: "relative",
              }}
            >
              <Box
                width={12}
                height={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {getChartIcon(chartType, "#666666")}
              </Box>
              <Typography variant="bodySMedium" color="neutral/50">
                +{remainingCount}
              </Typography>
            </Row>
          </Box>
        )}
      </Row>

      {showModal && remainingCount > 0 && (
        <Box
          ref={modalRef}
          position="absolute"
          bottom="100%"
          right={0}
          mb={1}
          backgroundColor="white"
          border={{ color: "neutral/60", opacity: 30 }}
          borderRadius={3}
          p={3}
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.15)"
          zIndex={1000}
          width="fit-content"
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {remainingDatasets.map((dataset, index) =>
              renderDatasetItem(dataset, visibleCount + index, true)
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChartLegend;
