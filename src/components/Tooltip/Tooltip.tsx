import React from 'react';
import { styled } from '@mui/material';
import { Tooltip as CegidTooltip } from "@cegid/cds-react";
import { neutral, RADIUS, white } from '../../theme';
import typography from '../../theme/typography';
import { ELEVATION } from '../../theme/shadows';

interface CustomTooltipProps {
    color?: 'dark' | 'light';
    children: React.ReactElement;
    title: React.ReactNode;
    [key: string]: any;
}

const StyledTooltip = styled(({ className, color, ...props }: CustomTooltipProps) => (
    <CegidTooltip {...props} classes={{ popper: className }} />
))<{ color?: 'dark' | 'light' }>(({ color = 'light' }) => ({
    '& .MuiTooltip-tooltip': {
        borderRadius: RADIUS.S,
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '8px',
        paddingRight: '8px',
        backgroundColor: color === 'dark' ? neutral[10] : neutral[99],
        color: color === 'dark' ? white : neutral[10],
        ...typography.captionSemiBold,
        boxShadow: ELEVATION.LEVEL_2,
        '& .MuiTooltip-arrow': {
            color: color === 'dark' ? neutral[10] : white,
        }
    }
}));

const Tooltip: React.FC<CustomTooltipProps> = ({
    color = 'light',
    children,
    title,
    ...props
}) => {
    return (
        <StyledTooltip
            color={color}
            title={title}
            {...props}
        >
            {children}
        </StyledTooltip>
    );
};

export default Tooltip;