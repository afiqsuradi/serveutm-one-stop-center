import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  fonts: {
    poppins: "Poppins",
    borel: "Borel",
    satisfy: "Satisfy",
  },
  components: {
    Button: {
      variants: {
        lessDanger: {
          bg: "#ED5980",
          color: "#fff",
          _hover: {
            bg: "#C65AED",
          },
        },
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
    Card: {
      variants: {
        secondary: {
          container: {
            backgroundColor: "#3c566c",
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
