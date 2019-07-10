/// <reference types="next" />
/// <reference types="next/types/global" />

namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare module 'console' {
  export = typeof import('console');
}
