/* Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License. */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// import en from '@/locales/en/translation.json';
// import zh from '@/locales/zh-CN/translation.json';
import { localeTransitions } from "./loadLangsToResouerce.ts";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// const resources = {
//     "en": {
//        translation: en
//     },
//     "zh-CN": {
//         translation: zh
//     }
// }

// console.log('localeTransitions...', localeTransitions)

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // ns: Object.keys(localeTransitions),
        fallbackLng: 'zh-CN',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
      resources: localeTransitions
    });


export default i18n;


