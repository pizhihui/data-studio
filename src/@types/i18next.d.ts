import { localeTransitions } from '@/locales/loadLangsToResouerce';

declare module 'i18next' {
  interface Resources {
    // translation: (typeof localeTransitions)["zh-CN"]
    translation: typeof import('@/locales/zh-CN/translation.json')
  }
  interface CustomTypeOptions {
    //resources: typeof resources;
    // defaultNS: "zh-CN";
    // @ts-ignore
    resources: (typeof localeTransitions)["zh-CN"];
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next init options)
    // returnNull: false;
  }
}
