/// <reference types="react-scripts" />

import axios from 'axios'

declare module 'axios'{
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}
