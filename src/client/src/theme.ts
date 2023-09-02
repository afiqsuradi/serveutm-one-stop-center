import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  components: {
    Button: {
      variants: {
        danger: {
          bg: "#bb2d3b",
          color: "#fff",
          _hover: {
            bg: "#b02a37",
          },
        },
        base: {
          bg: "#9e47e5",
          color: "#fff",
          _hover: {
            bg: "#7037d9",
          },
        },
      },
    },
  },
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#2D3748",
      800: "#111827",
      900: "#111",
    },
  },
});

export default theme;
