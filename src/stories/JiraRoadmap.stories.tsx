import React, { useState, useEffect, useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Column from "../components/Column";
import Row from "../components/Row";
import Typography from "../components/Typography";
import Box from "../components/Box";
import Badge from "../components/Badge";
import { CustomColorString } from "../theme/colors";

const meta = {
  title: "📚 Resources/Jira Roadmap",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface JiraIssue {
  key: string;
  summary: string;
  status: string;
  labels: string[];
}

interface StatusGroup {
  status: string;
  issues: JiraIssue[];
  color: CustomColorString;
  icon: string;
}

const JIRA_API_TOKEN = (import.meta as any).env?.STORYBOOK_JIRA_API_TOKEN || "";
const JIRA_API_URL = "/api/jira/design-system";
const JIRA_USER_NAME =
  (import.meta as any).env?.STORYBOOK_JIRA_USER_NAME || "beuquila jérémy";

const STATUS_CONFIG: Record<
  string,
  { color: CustomColorString; icon: string; order: number }
> = {
  "To Do": { color: "info/60" as CustomColorString, icon: "📋", order: 1 },
  "In Progress": {
    color: "yellow/60" as CustomColorString,
    icon: "⚡",
    order: 2,
  },
  Done: { color: "success/60" as CustomColorString, icon: "✅", order: 3 },
  Blocked: { color: "error/60" as CustomColorString, icon: "🚫", order: 4 },
};

const useJiraIssues = () => {
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        if (!JIRA_API_TOKEN) {
          throw new Error(
            "JIRA API token is not configured. Please set STORYBOOK_JIRA_API_TOKEN in your .env.local file."
          );
        }

        const url = new URL(JIRA_API_URL, window.location.origin);
        url.searchParams.append("user_name", JIRA_USER_NAME);

        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${JIRA_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        setIssues(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return { issues, loading, error };
};

const JiraRoadmapComponent: React.FC = () => {
  const { issues, loading, error } = useJiraIssues();

  const groupedIssues = useMemo(() => {
    const groups: StatusGroup[] = [];
    const statusMap = new Map<string, JiraIssue[]>();

    issues.forEach((issue) => {
      const statusIssues = statusMap.get(issue.status) || [];
      statusIssues.push(issue);
      statusMap.set(issue.status, statusIssues);
    });

    statusMap.forEach((issuesList, status) => {
      const config = STATUS_CONFIG[status] || {
        color: "neutral/60" as CustomColorString,
        icon: "📌",
        order: 999,
      };
      groups.push({
        status,
        issues: issuesList,
        color: config.color,
        icon: config.icon,
      });
    });

    groups.sort((a, b) => {
      const orderA = STATUS_CONFIG[a.status]?.order || 999;
      const orderB = STATUS_CONFIG[b.status]?.order || 999;
      return orderA - orderB;
    });

    return groups;
  }, [issues]);

  if (loading) {
    return (
      <Column gap={4} alignItems="center" justifyContent="center" py={12}>
        <Typography variant="displayMSemiBold" color="neutral/30">
          Loading Jira roadmap...
        </Typography>
      </Column>
    );
  }

  if (error) {
    return (
      <Column gap={4} alignItems="center" justifyContent="center" py={12}>
        <Typography variant="displayMSemiBold" color="critical/50">
          Error loading roadmap
        </Typography>
        <Typography variant="bodyMRegular" color="neutral/50">
          {error}
        </Typography>
      </Column>
    );
  }

  return groupedIssues.length === 0 ? (
    <Column gap={4} alignItems="center" py={12}>
      <Typography variant="displayMSemiBold" color="neutral/30">
        No tasks found
      </Typography>
      <Typography variant="bodyMRegular" color="neutral/50">
        Try adjusting your search or filters
      </Typography>
    </Column>
  ) : (
    <Row
      gap={3}
      alignItems="flex-start"
      sx={{
        overflowX: "auto",
        minHeight: "500px",
      }}
    >
      {groupedIssues.map((group) => (
        <Column
          key={group.status}
          gap={3}
          sx={{
            minWidth: "320px",
            flex: "1 1 320px",
            maxWidth: "400px",
          }}
        >
          <Box
            p={3}
            borderRadius={3}
            backgroundColor={group.color}
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <Row gap={2} alignItems="center" justifyContent="space-between">
              <Row gap={2} alignItems="center">
                <Typography variant="bodyMSemiBold" color="white">
                  {group.icon} {group.status}
                </Typography>
              </Row>
              <Badge size="medium" color="neutral" variant="tonal">
                {group.issues.length}
              </Badge>
            </Row>
          </Box>

          <Column gap={2}>
            {group.issues.map((issue) => (
              <Box
                key={issue.key}
                p={3}
                borderRadius={3}
                backgroundColor="white"
                border={{ width: 1, color: "neutral/90", style: "solid" }}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: group.color,
                    backgroundColor: "neutral/99",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() =>
                  window.open(
                    `https://boby-app.atlassian.net/browse/${issue.key}`,
                    "_blank"
                  )
                }
              >
                <Column gap={2}>
                  <Typography
                    variant="bodyMSemiBold"
                    color="primary/50"
                    sx={{ fontFamily: "monospace", fontSize: "12px" }}
                  >
                    {issue.key}
                  </Typography>
                  <Typography variant="bodyMRegular" color="neutral/10">
                    {issue.summary}
                  </Typography>
                  {issue.labels && issue.labels.length > 0 && (
                    <Row gap={1} flexWrap="wrap">
                      {issue.labels.slice(0, 3).map((label) => (
                        <Badge key={label} color="neutral" size="large">
                          {label}
                        </Badge>
                      ))}
                    </Row>
                  )}
                </Column>
              </Box>
            ))}
          </Column>
        </Column>
      ))}
    </Row>
  );
};

export const Roadmap: Story = {
  render: () => <JiraRoadmapComponent />,
};
