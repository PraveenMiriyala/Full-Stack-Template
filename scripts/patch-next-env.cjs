const Module = require("module");
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  const res = originalRequire.apply(this, arguments);
  if (id === "@next/env" && res) {
    let fn = res.loadEnvConfig;
    if (!fn && res.default) fn = res.default.loadEnvConfig;
    if (!fn && res.default && res.default.default)
      fn = res.default.default.loadEnvConfig;
    return {
      ...res,
      loadEnvConfig: fn || (() => ({})),
    };
  }
  return res;
};
