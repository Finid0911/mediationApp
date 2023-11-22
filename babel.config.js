module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            assets: "./src/assets",
            icon: "./src/assets/icon",
            audio: "./src/assets/audio",
            backgroundImg: "./src/assets/backgroundImg",
            components: "./src/components",
            screens: "./src/screens",
            login: "./src/screens/login",
            signup: "./src/screens/signup",
            home: "./src/screens/home",
            account: "./src/screens/account",
            explore: "./src/screens/explore",
            main: "./src/screens/main",
          },
        },
      ],
    ],
  };
};
