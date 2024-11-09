export interface IBgColorStyles {
  primary: string;
  grey: string;
  littleGrey: string;
  lightGrey: string;
  darkBlue: string;

  greyBlue: string;
  lightBlue: string;
  yellow: string;
  white: string;
  darkGrey: string;
}

export interface ITextColors extends IBgColorStyles {
  primary: string;
}

export interface ITextStyles {
  default: string;
  p13: string;
}

export interface IDefaultStyles {
  bgColor: IBgColorStyles;
  textSize: ITextStyles;
  textColor: ITextColors;
}
