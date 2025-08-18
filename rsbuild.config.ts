import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  tools: {
    rspack: {
      resolve: {
        alias: {
          "@": "/src",
          "@mocks": "/src/mocks",
          "@apis": "/src/apis",
        },
      },
    },
  },
  plugins: [pluginReact()],
});
