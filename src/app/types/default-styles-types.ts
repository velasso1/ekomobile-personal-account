export interface IBgColorStyles {
  primary: string;
  grey: string;
  lightGrey: string;
  darkBlue: string;
  lightBlue: string;
  yellow: string;
  white: string;
}

export interface ITextColors extends IBgColorStyles {
  primary: string;
}

export interface ITextStyles {
  default: string;
}

export interface IDefaultStyles {
  bgColor: IBgColorStyles;
  textSize: ITextStyles;
  textColor: ITextColors;
}
