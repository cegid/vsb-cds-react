import type { Meta, StoryObj } from "@storybook/react-vite";

import TableFilter from "./TableFilter";
import Table from "../Table";
import TableHead from "../TableHead";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableContainer from "../TableContainer";
import Icon from "../Icon";

import { useState } from "react";

const meta = {
  title: "🚧 WIP/TableFilter",
  component: TableFilter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

interface ProductData {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const products: ProductData[] = [
  {
    name: "Laptop",
    category: "Electronics",
    price: 999,
    stock: 15,
    status: "Available",
  },
  {
    name: "Mouse",
    category: "Accessories",
    price: 29,
    stock: 50,
    status: "Available",
  },
  {
    name: "Keyboard",
    category: "Accessories",
    price: 79,
    stock: 0,
    status: "Out of stock",
  },
  {
    name: "Monitor",
    category: "Electronics",
    price: 299,
    stock: 8,
    status: "Available",
  },
  {
    name: "Webcam",
    category: "Electronics",
    price: 149,
    stock: 3,
    status: "Low stock",
  },
];

const sampleProduct: ProductData = products[0];

export const Default: Story = {
  args: {},
  render: (args) => {
    const [activeFilters, setActiveFilters] = useState<(keyof ProductData)[]>(
      []
    );

    const handleFilterApply = (key: keyof ProductData, value: string) => {
      console.log(`Filter applied - Key: ${String(key)}, Value: ${value}`);
      if (!activeFilters.includes(key)) {
        setActiveFilters((prev) => [...prev, key]);
      }
    };

    return (
      <TableContainer>
        <TableFilter<ProductData>
          filterConfig={{
            name: {
              label: "Nom du produit",
              icon: () => <Icon size={12}>user</Icon>,
            },
            category: {
              label: "Catégorie",
              icon: () => <Icon size={12}>tag-01</Icon>,
            },
            price: {
              label: "Prix",
              icon: () => <Icon size={12}>bitcoin-03</Icon>,
            },
            stock: {
              label: "Stock",
              icon: () => <Icon size={12}>package</Icon>,
            },
            status: {
              label: "Statut",
              icon: () => <Icon size={12}>check-circle</Icon>,
            },
          }}
          sampleData={sampleProduct}
          onFilterApply={handleFilterApply}
          activeFilters={activeFilters}
        />
        <Table aria-label="products table with filters">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name} hover>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};
