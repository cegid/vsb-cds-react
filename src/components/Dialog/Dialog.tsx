import Box from "../Box";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { white } from "../../theme";
import Column from "../Column";
import Row from "../Row";
import Icon from "../Icon";
import Typography from "../Typography";
import Button from "../Button";

export interface DialogProps {
  title: string;
  content?: React.ReactElement;
  actions?: Array<React.ReactElement<typeof Button>>;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { title, content, actions } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mobileStyle = {
    width: "343px",
    background: white,
  };

  const DesktopStyle = {
    width: "720px",
  };

  return (
    <Box
      {...(isMobile ? mobileStyle : DesktopStyle)}
      p={2}
      backgroundColor="white"
      borderRadius={6}
    >
      <Column
        border={{ color: "neutral/95", style: "solid", width: 1 }}
        backgroundColor="white"
        p={6}
        borderRadius={5}
      >
        <Row gap={4} alignItems="center" mb={4}>
          <Box
            backgroundColor="neutral/99"
            width={24}
            height={24}
            borderRadius={2}
            display="flex"
            justifyContent="center"
          >
            <Icon size={14} variant="solid">
              add-01
            </Icon>
          </Box>
          <Typography variant="bodySSemiBold">{title}</Typography>
        </Row>
        <Box p={4}>{content}</Box>
        {actions && actions.length > 0 && (
          <Box mt={4} mx={6}>
            {isMobile ? (
              <Column gap={4}>
                {actions.map((action, index) => (
                  <Box key={index} width="100%">
                    {action}
                  </Box>
                ))}
              </Column>
            ) : (
              <Row gap={2} justifyContent="flex-end">
                {actions.map((action, index) => (
                  <Box key={index}>
                    {action}
                  </Box>
                ))}
              </Row>
            )}
          </Box>
        )}
      </Column>
    </Box>
  );
};

export default Dialog;