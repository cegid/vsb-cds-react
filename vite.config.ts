import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { glob } from "glob";

const componentEntries = glob
  .sync("src/components/*/index.ts")
  .reduce((acc, file) => {
    const name = path.basename(path.dirname(file));
    acc[`components/${name}/index`] = file;
    return acc;
  }, {});

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
      rollupTypes: true,
    }),
    // ✅ Plugin custom pour copier les assets d'icônes
    {
      name: "copy-icon-assets",
      generateBundle() {
        // Copie des fichiers d'icônes
        const iconFiles = glob.sync("src/theme/icons/**/*");
        iconFiles.forEach((file) => {
          if (file.match(/\.(eot|svg|ttf|woff2?|css)$/)) {
            const fileName = path.basename(file);
            const relativePath = path.relative("src/theme/icons", file);
            this.emitFile({
              type: "asset",
              fileName: `icons/${relativePath}`,
              source: require("fs").readFileSync(file),
            });
          }
        });
      },
    },
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        "components/index": path.resolve(__dirname, "src/components/index.ts"),
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
      output: [
        {
          format: "es",
          dir: "dist",
          entryFileNames: (chunkInfo) => `${chunkInfo.name}.es.js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              if (
                assetInfo.name.includes("hugeicons") ||
                assetInfo.name.includes("icons")
              ) {
                return "icons/[name][extname]";
              }
              return "styles/[name][extname]";
            }
            if (assetInfo.name?.match(/\.(woff2?|eot|ttf|otf)$/)) {
              if (
                assetInfo.name.includes("hgr-") ||
                assetInfo.name.includes("hugeicons")
              ) {
                return "icons/[name][extname]";
              }
              return "fonts/[name][extname]";
            }
            if (assetInfo.name?.endsWith(".svg")) {
              return "icons/[name][extname]";
            }
            return "assets/[name][extname]";
          },
        },
        {
          format: "cjs",
          dir: "dist",
          entryFileNames: (chunkInfo) => `${chunkInfo.name}.cjs.js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              if (
                assetInfo.name.includes("hugeicons") ||
                assetInfo.name.includes("icons")
              ) {
                return "icons/[name][extname]";
              }
              return "styles/[name][extname]";
            }
            if (assetInfo.name?.match(/\.(woff2?|eot|ttf|otf)$/)) {
              if (
                assetInfo.name.includes("hgr-") ||
                assetInfo.name.includes("hugeicons")
              ) {
                return "icons/[name][extname]";
              }
              return "fonts/[name][extname]";
            }
            if (assetInfo.name?.endsWith(".svg")) {
              return "icons/[name][extname]";
            }
            return "assets/[name][extname]";
          },
        },
      ],
      treeshake: {
        moduleSideEffects: false,
      },
    },
    sourcemap: true,
    assetsInlineLimit: 0,
    copyPublicDir: false,
  },
  assetsInclude: [
    "**/*.woff2",
    "**/*.woff",
    "**/*.ttf",
    "**/*.eot",
    "**/*.svg",
    "**/hugeicons-font.css",
    "src/theme/icons/**/*",
  ],
});
