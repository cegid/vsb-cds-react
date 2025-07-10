import React from "react";
import { Breadcrumbs as CegidBreadcrumbs, styled } from "@cegid/cds-react";
import BreadcrumbsHelpers from "./BreadcrumbsHelpers";
import BreadcrumbSegmentItem from "./BreadcrumbSegment";

const StyledBreadcrumbs = styled(CegidBreadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-separator": {
    margin: 0,
  },

  "& > ol": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4),
  },
}));

export interface BreadcrumbsItem {
  id: string;
  label: string;
  icon?: string;
  children?: BreadcrumbsItem[];
  path?: string;
  onClick?: () => void;
}

/** Segment to print in the Breadcrumb */
export interface BreadcrumbSegment {
  breadcrumbNode: BreadcrumbsItem;
  isActive: boolean;
  siblings: BreadcrumbsItem[];      // brother nodes on the same level
  children: BreadcrumbsItem[];     // his children nodes
}

export type BreadcrumbsProps = Omit<React.ComponentProps<typeof CegidBreadcrumbs>, "separator"> & {
  breadcrumbsTree: BreadcrumbsItem[];
  currentPath: string;
};

const Breadcrumbs = (props: BreadcrumbsProps) => {

  const { breadcrumbsTree, currentPath, ...rest } = props;

  const breadCrumbsSegments = BreadcrumbsHelpers.generateBreadcrumbsSegments(breadcrumbsTree, currentPath);

  return (
    <StyledBreadcrumbs {...rest} aria-label="breadcrumb" separator="/">
      { breadCrumbsSegments.map((segment, index) => {
        return (
          <BreadcrumbSegmentItem
            key={segment.breadcrumbNode.id}
            segment={segment}
            shouldDisplayLogo={index === 0}
          />
        )
      })}
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;