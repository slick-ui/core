import { BaseTextType as TextTypes } from '@slick-ui/core';

// and extend them!
declare module '@slick-ui/core' {
  export type BaseTextTypes = TextTypes | 'error';
}
