/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {},
  plugins: [require("daisyui")],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        catppuccin: {
          "primary": "#1e66f5", // Blue
          "secondary": "#209fb5", // Sapphire
          "accent": "#ea76cb", // Pink
          "neutral": "#4c4f69", // Text
          "base-100": "#1f222e", // Mycket mörk grå för huvudbakgrunden
          "base-200": "#191a23", // Ännu mörkare nyans för mellanlager
          "base-300": "#121317", // Den mörkaste nyansen för djupare lager
          "info": "#04a5e5", // Sky
          "success": "#40a02b", // Green
          "warning": "#df8e1d", // Yellow
          "error": "#d20f39", // Red
        },
      },
    ],
    // themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "dark", // name of one of the included themes for dark mode
    // base: true, // applies background color and foreground color for root element by default
    // styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    // prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    // logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    // themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
