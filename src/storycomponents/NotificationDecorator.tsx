import { Icon, Row, Typography } from "../components";
import type { Decorator } from "@storybook/react";

interface NotificationDecoratorProps {
  severity?: "warning" | "critical";
  message?: string;
  children: React.ReactNode;
}

const NotificationDecoratorComponent: React.FC<NotificationDecoratorProps> = ({ 
  severity = "critical",
  message = "Ce composant est en test et n'est pas encore disponible",
  children 
}) => (
  <>
    <Row
      backgroundColor={severity === "critical" ? "critical/99" : "yellow/99"}
      p={4}
      mb={6}
      borderRadius={4}
      gap={6}
      alignItems="center"
      justifyContent="center"
      border={{ color: severity === "critical" ? "critical/30" : "yellow/30", opacity: 30 }}
    >
      <Icon size={16} color={severity === "critical" ? "critical/30" : "yellow/30"}>
        alert-01
      </Icon>
      <Typography variant="bodyMSemiBold" color={severity === "critical" ? "critical/30" : "yellow/30"}>
        {message}
      </Typography>
    </Row>
    {children}
  </>
);

const NotificationDecorator: Decorator = (Story) => (
  <NotificationDecoratorComponent>
    <Story />
  </NotificationDecoratorComponent>
);

export default NotificationDecorator;
export { NotificationDecoratorComponent };
