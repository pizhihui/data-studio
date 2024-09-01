//  加载所有语言包
const modules = require("@/locales/**/*.json") as Record<string, { default: never }>;

console.log('module........', modules)

export const localeTransitions = Object.entries(modules).reduce(
  (prev, current) => {
    const [path, module] = current;
    const lang = path.match(/\/locales\/([\w-]+)\//);
    const filename = path.match(/\/([\w-_]+)\.json$/);

    // if (filename && lang) {
    //   prev[lang[1]] = prev[lang[1]] || {};
    //   prev[lang[1]][filename[1]] = module.default;
    // } else {
    //   console.error(`无法解析文件名称 path:${path}`);
    // }

    return prev;
  },
  {}
);
