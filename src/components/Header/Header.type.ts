export enum ButtonTypeEnum {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

export enum ButtonVariantEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  LINK = "link",
  ICON = "icon",
}

export enum ButtonSizeEnum {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export interface ButtonPropsType {
  onClick: () => void;
  children: React.ReactNode;
  type: ButtonTypeEnum;
  disabled: boolean;
  size: ButtonSizeEnum;
  variant: ButtonVariantEnum;
}
