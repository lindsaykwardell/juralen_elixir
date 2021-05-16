/**
 * @type {import("@gqless/cli").GQlessConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: "string" },
  introspection: {
    endpoint: "http://localhost:4000/api",
    headers: {},
  },
  destination: "./src/gqless/index.ts",
  subscriptions: true,
  javascriptOutput: false,
};

module.exports = config;
