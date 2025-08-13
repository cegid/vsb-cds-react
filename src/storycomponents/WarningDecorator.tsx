import { Icon, Row, Typography } from "../components";
import type { Decorator } from "@storybook/react";

const WarningDecorator: Decorator = (Story) => (
  <>
    <Row
      backgroundColor="yellow/99"
      p={4}
      mb={6}
      borderRadius={4}
      gap={6}
      alignItems="center"
      justifyContent="center"
      border={{ color: "yellow/30", opacity: 30 }}
    >
      <Icon size={16} color="yellow/30">
        alert-01
      </Icon>
      <Typography variant="bodyMSemiBold" color="yellow/30">
        Ce composant est en test et n'est pas encore disponible
      </Typography>
    </Row>
    <Story />
  </>
);

export default WarningDecorator;
