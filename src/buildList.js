const { version } = require("../package.json");
const socotra = require("./tokens/socotra.json");
const june = require("./tokens/june.json");

const bridgeUtils = require('@uniswap/token-list-bridge-utils');

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "8-BitSwap Default",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "https://www.8bitswap.io/logo.png",
    keywords: ["8bitswap", "8-bitswap", "default"],
    tokens: [
      ...socotra,
      ...june
    ]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
  console.log(JSON.stringify(l1List))
  return bridgeUtils.chainify(l1List);
};
