import type { Meta, StoryObj } from "@storybook/react";

import Table from "./Table";
import TableContainer from "../TableContainer";
import Tabs from "../Tabs";
import Tab from "../Tab";
import TableHead from "../TableHead";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableFooter from "../TableFooter";
import Column from "../Column";
import Row from "../Row";
import Chip from "../Chip";

import { useState } from "react";

const meta = {
  title: "Components/Data/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): any {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}
const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    return (
      <TableContainer
        sx={{
          backgroundColor: "background.paper",
        }}
      >
        <Column gap={6} pb={6}>
          <Tabs
            aria-label="Customer tabs"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Particulier" />
            <Tab label="Professionnel" />
            <Tab label="Entreprise" />
            <Tab label="Association" />
          </Tabs>
          <Row gap={4}>
            <Chip
              label="N de Devis"
              onClick={() => console.log("click")}
            ></Chip>
            <Chip
              label="Montant TTC"
              onClick={() => console.log("click")}
            ></Chip>
            <Chip
              label="Montant HT "
              onClick={() => console.log("click")}
            ></Chip>
            <Chip
              label="Date document"
              onClick={() => console.log("click")}
            ></Chip>
          </Row>
        </Column>
        <Table aria-labelledby="tableTitle" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat&nbsp;(g)</TableCell>
              <TableCell>Carbs&nbsp;(g)</TableCell>
              <TableCell>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell align="right">
                {rows.reduce((acc, item) => acc + item.calories, 0).toFixed(1)}
              </TableCell>
              <TableCell align="right">
                {rows.reduce((acc, item) => acc + item.fat, 0).toFixed(1)}
              </TableCell>
              <TableCell align="right">
                {rows.reduce((acc, item) => acc + item.carbs, 0).toFixed(1)}
              </TableCell>
              <TableCell align="right">
                {rows.reduce((acc, item) => acc + item.protein, 0).toFixed(1)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  },
};
