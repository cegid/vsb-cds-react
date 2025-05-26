'use client';

import { Tabs as CegidTabs, TabsProps as CegidTabsProps, styled } from "@cegid/cds-react";
import { primary } from "@vsb-cds/theme";
import React from "react";

const StyledTabs = styled(CegidTabs)({
    height: '40px',
    '& .MuiTabs-indicator': {
        backgroundColor: primary[55]
    }
});

const Tabs = React.forwardRef<HTMLDivElement, CegidTabsProps>((props, ref) => {
    const { children } = props;

    return (
        <StyledTabs
            ref={ref}
            {...props}
        >
            {children}
        </StyledTabs>
    );
});

export default Tabs;