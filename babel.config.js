const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "20",
        firefox: "27",
        chrome: "32",
        safari: "7",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };