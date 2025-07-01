import { keyframes, styled } from "@cegid/cds-react";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { useState } from "react";

const rotateForward = keyframes`
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(180deg); }
`;
const rotateBackward = keyframes`
  from { transform: rotateY(180deg); }
  to   { transform: rotateY(0deg); }
`;

const AnimatedToggleIcon = styled(Icon, {
  shouldForwardProp: p => !['expanded','playanimation'].includes(String(p)),
})<{ expanded: boolean; playanimation: boolean }>(({ expanded, playanimation }) => {

  let animation = 'none';

  if (playanimation) {
    animation = `${ expanded ? rotateForward : rotateBackward } 0.4s ease forwards`;
  }

  return {
    display: 'inline-block',
    animation,
  }

});

interface MenuToggleButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const MenuToggleButton = ({ isExpanded, onToggle }: MenuToggleButtonProps) => {
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState<boolean>(false);

  const handleClick = () => {
    if (!shouldPlayAnimation) {
      setShouldPlayAnimation(true);
    }
    onToggle();
  };

  return (
    <IconButton variant="iconOnly" onClick={handleClick} title="Basculer la navigation">
      <AnimatedToggleIcon
        expanded={isExpanded}
        playanimation={shouldPlayAnimation}
        size="14px"
        color="primary/10"
      >
        sidebar-right-01
      </AnimatedToggleIcon>
    </IconButton>
  );
}

export default MenuToggleButton;

