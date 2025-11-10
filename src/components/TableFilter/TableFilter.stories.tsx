import type { Meta, StoryObj } from "@storybook/react-vite";

import TableFilter from "./TableFilter";
import Table from "../Table";
import TableHead from "../TableHead";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableContainer from "../TableContainer";
import Icon from "../Icon";
import Box from "../Box";
import Typography from "../Typography";
import Column from "../Column";
import Tabs from "../Tabs";
import Tab from "../Tab";

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
  createdDate: string;
  expiryDate: string;
  labels: string;
}

const products: ProductData[] = [
  {
    name: "Laptop",
    category: "Electronics",
    price: 999,
    stock: 15,
    status: "Available",
    createdDate: "2024-01-15",
    expiryDate: "2025-01-15",
    labels: "urgent,featured",
  },
  {
    name: "Mouse",
    category: "Accessories",
    price: 29,
    stock: 50,
    status: "Available",
    createdDate: "2024-03-20",
    expiryDate: "2025-03-20",
    labels: "new",
  },
  {
    name: "Keyboard",
    category: "Accessories",
    price: 79,
    stock: 0,
    status: "Out of stock",
    createdDate: "2024-02-10",
    expiryDate: "2025-02-10",
    labels: "sale",
  },
  {
    name: "Monitor",
    category: "Electronics",
    price: 299,
    stock: 8,
    status: "Available",
    createdDate: "2024-04-05",
    expiryDate: "2025-04-05",
    labels: "featured",
  },
  {
    name: "Webcam",
    category: "Electronics",
    price: 149,
    stock: 3,
    status: "Low stock",
    createdDate: "2024-05-12",
    expiryDate: "2025-05-12",
    labels: "urgent,new",
  },
];

const sampleProduct: ProductData = products[0];

export const Default: Story = {
  args: {},
  render: (args) => {
    const [activeFilters, setActiveFilters] = useState<(keyof ProductData)[]>(
      []
    );
    const [filterValues, setFilterValues] = useState<
      Partial<Record<keyof ProductData, string>>
    >({});
    const [tabsValue, setTabsValue] = useState(0);

    const handleFilterApply = (
      key: keyof ProductData,
      value: string,
      updatedActiveFilters: (keyof ProductData)[]
    ) => {
      console.log(`Filter applied - Key: ${String(key)}, Value: ${value}`);
      console.log(`Active filters:`, updatedActiveFilters);
      setActiveFilters(updatedActiveFilters);
      setFilterValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabsValue(newValue);
    };

    const filteredProducts = products.filter((product) => {
      return activeFilters.every((filterKey) => {
        const filterValue = filterValues[filterKey];
        if (!filterValue) return true;

        const productValue = product[filterKey];

        // Gestion des différents types de filtres
        switch (filterKey) {
          case "price":
          case "stock":
            // NumberRange: "min-max"
            const [min, max] = filterValue.split("-");
            const numValue = Number(productValue);
            const minNum = min ? Number(min) : -Infinity;
            const maxNum = max ? Number(max) : Infinity;
            return numValue >= minNum && numValue <= maxNum;

          case "createdDate":
          case "expiryDate":
            // Date: ISO string
            return String(productValue).startsWith(filterValue.split("T")[0]);

          case "labels":
            // Labels: "urgent,featured"
            const selectedLabels = filterValue.split(",").filter(Boolean);
            const productLabels = String(productValue).split(",").filter(Boolean);
            return selectedLabels.every((label) => productLabels.includes(label));

          default:
            // Text ou select: correspondance exacte (case insensitive)
            return String(productValue)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());
        }
      });
    });

    return (
      <TableContainer sx={{minWidth: 875}}>
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
              type: "numberRange",
              inputSuffix: "€",
            },
            stock: {
              label: "Stock",
              icon: () => <Icon size={12}>package</Icon>,
              type: "numberRange",
            },
            status: {
              label: "Statut",
              icon: () => <Icon size={12}>check-circle</Icon>,
              type: "select",
              selectOptions: [
                { value: "Available", label: "Disponible" },
                { value: "Out of stock", label: "Rupture de stock" },
                { value: "Low stock", label: "Stock faible" },
              ],
            },
            createdDate: {
              label: "Date de création",
              icon: () => <Icon size={12}>calendar-01</Icon>,
              type: "date",
            },
            expiryDate: {
              label: "Date d'expiration",
              icon: () => <Icon size={12}>calendar-check-01</Icon>,
              type: "date",
            },
            labels: {
              label: "Étiquettes",
              icon: () => <Icon size={12}>tag-01</Icon>,
              type: "labels",
              labelOptions: [
                { value: "urgent", label: "Urgent" },
                { value: "featured", label: "En vedette" },
                { value: "new", label: "Nouveau" },
                { value: "sale", label: "En solde" },
                { value: "popular", label: "Populaire" },
              ],
            },
          }}
          sampleData={sampleProduct}
          onFilterApply={handleFilterApply}
          activeFilters={activeFilters}
          leftContent={
            <Tabs
              value={tabsValue}
              onChange={handleTabsChange}
              bottomLine={false}
            >
              <Tab label="Particulier" />
              <Tab label="Professionnel" />
            </Tabs>
          }
          searchPlaceholder="Cherchez par nom, tél, type..."
        />
        <Table aria-label="products table with filters">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Labels</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.name} hover>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}€</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.createdDate}</TableCell>
                <TableCell>{product.expiryDate}</TableCell>
                <TableCell>{product.labels}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box mt={8} p={6} borderRadius={4} sx={{ backgroundColor: "#f5f5f5" }}>
          <Column gap={4}>
            <Typography variant="h6">Filtres actifs</Typography>
            {activeFilters.length === 0 ? (
              <Typography variant="bodyMRegular" color="neutral/50">
                Aucun filtre actif
              </Typography>
            ) : (
              <Column gap={2}>
                {activeFilters.map((key) => (
                  <Box key={String(key)}>
                    <Typography variant="bodyMSemiBold">
                      {String(key)}:{" "}
                      <Typography
                        variant="bodyMRegular"
                        component="span"
                        color="primary/50"
                      >
                        {filterValues[key] || ""}
                      </Typography>
                    </Typography>
                  </Box>
                ))}
              </Column>
            )}
          </Column>
        </Box>
      </TableContainer>
    );
  },
};
