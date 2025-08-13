import React, { useState, useRef, useEffect } from "react";
import Typography from "../Typography";
import Row from "../Row";
import Box from "../Box";
import Icon from "../Icon";
import { ChartType } from "./ChartCore";
import { RADIUS, parseCustomColor } from "../../theme";
import { getChartIcon } from "./Chart";

interface ChartLegendProps {
  datasets: any[];
  chartType: ChartType;
  hiddenDatasets: Set<number>;
  hoveredDataset: number | null;
  onToggleDataset: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  datasets,
  chartType,
  hiddenDatasets,
  hoveredDataset,
  onToggleDataset,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const gap = 8;
      const plusButtonWidth = 70;

      let totalWidth = 0;
      let maxItems = 0;

      for (let i = 0; i < datasets.length; i++) {
        const labelLength = datasets[i].label?.length || 10;
        const estimatedWidth = Math.max(100, labelLength * 8 + 60); // 60px pour l'icône et padding

        if (
          totalWidth + estimatedWidth + (i > 0 ? gap : 0) <=
          containerWidth - plusButtonWidth
        ) {
          totalWidth += estimatedWidth + (i > 0 ? gap : 0);
          maxItems = i + 1;
        } else {
          break;
        }
      }

      if (maxItems === datasets.length) {
        setVisibleCount(datasets.length);
      } else {
        totalWidth = 0;
        let allItemsWidth = 0;

        for (let i = 0; i < datasets.length; i++) {
          const labelLength = datasets[i].label?.length || 10;
          const estimatedWidth = Math.max(100, labelLength * 8 + 60);
          allItemsWidth += estimatedWidth + (i > 0 ? gap : 0);
        }

        if (allItemsWidth <= containerWidth) {
          setVisibleCount(datasets.length);
        } else {
          setVisibleCount(Math.max(1, maxItems));
        }
      }
    };

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

    return (
      <Row
        alignItems="center"
        key={`${dataset.label}-${index}`}
        gap={4}
        backgroundColor="white"
        border={{ color: "neutral/60", opacity: 30 }}
        py={2}
        px={4}
        width={isInModal ? "auto" : "auto"}
        borderRadius={RADIUS.FULL}
        onClick={() => onToggleDataset(index)}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        sx={{
          cursor: "pointer",
          flexShrink: isInModal ? 1 : 0,
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
              opacity: hiddenDatasets.has(index)
                ? 0
                : hoveredDataset === index
                ? 0
                : 1,
              transition: "opacity 200ms ease-in-out",
            }}
          >
            {getChartIcon(chartType, datasetColor)}
          </Box>
          <Box
            display="flex"
            sx={{
              opacity: hiddenDatasets.has(index)
                ? 1
                : hoveredDataset === index
                ? 1
                : 0,
              transition: "opacity 200ms ease-in-out",
            }}
          >
            <Icon variant="stroke" style="rounded" color="neutral/50" size={12}>
              {hiddenDatasets.has(index) ? "view-off-slash" : "view"}
            </Icon>
          </Box>
        </Box>
        <Typography variant="bodySMedium" color="neutral/50">
          {dataset.label}
        </Typography>
      </Row>
    );
  };

  return (
    <Box position="relative">
      <Row ref={containerRef} gap={2} flexWrap="nowrap" overflow="hidden">
        {displayedDatasets.map((dataset, index) =>
          renderDatasetItem(dataset, index)
        )}

        {remainingCount > 0 && (
          <Row
            ref={plusButtonRef}
            alignItems="center"
            gap={4}
            backgroundColor="white"
            border={{ color: "neutral/60", opacity: 30 }}
            py={2}
            px={4}
            width={"auto"}
            minWidth={50}
            borderRadius={RADIUS.FULL}
            onClick={() => setShowModal(!showModal)}
            sx={{
              cursor: "pointer",
              flexShrink: 0,
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
