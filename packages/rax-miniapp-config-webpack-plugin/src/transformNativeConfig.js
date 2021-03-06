const { join } = require('path');

const safeWriteFile = require('./safeWriteFile');
const { MINIAPP, WECHAT_MINIPROGRAM, BYTEDANCE_MICROAPP } = require('./constants');

const fileNameMap = {
  [MINIAPP]: 'mini.project.json',
  [WECHAT_MINIPROGRAM]: 'project.config.json',
  [BYTEDANCE_MICROAPP]: 'project.config.json'
};

module.exports = function(outputPath, nativeConfig = {}, target) {
  // project.config.json in wechat miniprogram is necessary without which the project won't bootstrap
  const configContent = target === WECHAT_MINIPROGRAM ? Object.assign({ appid: '<your-app-id>' }, nativeConfig) : nativeConfig;
  safeWriteFile(join(outputPath, fileNameMap[target]), configContent, true);
};
