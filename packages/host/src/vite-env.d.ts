/// <reference types="vite/client" />

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '@netflix-lite/shared-components/Header/styles';
declare module '@netflix-lite/shared-components/MovieCard/styles';
declare module '@netflix-lite/shared-components/MovieRow/styles';
