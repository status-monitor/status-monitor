import Color from 'color';

// COLORS
export const green = '#04aec6';
export const orange = '#ffcb6b';
export const red = '#ff2d78';
export const primary = '#4c418b';

// GENERAL
export const backgroundColor = '#18191c';
export const textColor = 'white';

// TOP BAR
export const appBarBackground = '#202226';
export const appBarHeight = '64px';
export const appBarColor = 'white';

// CARD
export const cardBackground = appBarBackground;

// FORM
export const inputBackground = Color(primary)
  .darken(0.4)
  .hsl()
  .string();
export const inputBorderColor = Color(primary)
  .darken(0.8)
  .hsl()
  .string();
export const inputActiveBorderColor = '#80bdff';

// BUTTON
export const primaryButtonBackground = primary;
export const primaryButtonHoverBackground = Color(primary)
  .darken(0.2)
  .hsl()
  .string();
export const primaryButtonActiveBackground = Color(primary)
  .darken(0.3)
  .hsl()
  .string();
export const primaryButtonFocusShadowColor = Color(primary)
  .darken(0.1)
  .hsl()
  .string();

export const dangerButtonBackground = red;
export const dangerButtonHoverBackground = Color(red)
  .darken(0.2)
  .hsl()
  .string();
export const dangerButtonActiveBackground = Color(red)
  .darken(0.3)
  .hsl()
  .string();
export const dangerButtonFocusShadowColor = Color(red)
  .darken(0.1)
  .hsl()
  .string();
