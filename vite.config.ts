import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { glob } from "glob";

const componentEntries = glob
  .sync("src/components/*/index.ts")
  .reduce((acc, file) => {
    const name = path.basename(path.dirname(file));
    acc[`components/${name}`] = file;
    return acc;
  }, {});

componentEntries["components"] = path.resolve(
  __dirname,
  "src/components/index.ts"
);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "react",
    }),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
      outDir: "dist",
      rollupTypes: false,
      beforeWriteFile: (filePath, content) => {
        return {
          filePath,
          content,
        };
      },
    }),
    {
      name: "copy-assets",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "fonts/fonts.css",
          source: require("fs").readFileSync(
            "src/theme/fonts/fonts.css",
            "utf8"
          ),
        });
        const fontFiles = glob.sync("src/theme/fonts/*.{woff2,woff,ttf}");
        fontFiles.forEach((file) => {
          const fileName = path.basename(file);
          this.emitFile({
            type: "asset",
            fileName: `fonts/${fileName}`,
            source: require("fs").readFileSync(file),
          });
        });
        this.emitFile({
          type: "asset",
          fileName: "icons/hugeicons-font.css",
          source: require("fs").readFileSync(
            "src/theme/icons/hugeicons-font.css",
            "utf8"
          ),
        });
        const iconFiles = glob.sync("src/theme/icons/*.{woff2,woff,ttf}");
        iconFiles.forEach((file) => {
          const fileName = path.basename(file);
          this.emitFile({
            type: "asset",
            fileName: `icons/${fileName}`,
            source: require("fs").readFileSync(file),
          });
        });
      },
    },
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        ...componentEntries,
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@mui/material",
        "react/jsx-runtime",
        "@emotion/react",
        "@emotion/styled",
        "@cegid/cds-react",
        "@cegid/icons-react",
      ],
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name.startsWith("components/")) {
            const parts = chunkInfo.name.split("/");
            const component = parts[1];
            if (component === "index") {
              return `components/index.[format].js`;
            }
            return `components/${component}/index.[format].js`;
          }
          return "[name].[format].js";
        },
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MuiMaterial",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
          "@cegid/cds-react": "CegidCdsReact",
          "@cegid/icons-react": "CegidIconsReact",
        },
      },
    },
  },
});
