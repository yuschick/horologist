export type ColorAux =
  | "aux-50"
  | "aux-100"
  | "aux-200"
  | "aux-300"
  | "aux-400"
  | "aux-500"
  | "aux-600"
  | "aux-700"
  | "aux-800"
  | "aux-900"
  | "aux-950";

export type ColorBrand = "brand-primary" | "brand-secondary";

export type Color = ColorAux | ColorBrand;

export type FontFamily = "primary" | "secondary" | "mono";

export type FontSize = "-1" | "0" | "1" | "2" | "3" | "4" | "5";

export type FontWeight = "300" | "400" | "500" | "700";

export type Space =
  | "auto"
  | "0"
  | "half"
  | "half-fluid"
  | "1"
  | "1-fluid"
  | "2"
  | "2-fluid"
  | "3"
  | "3-fluid"
  | "4"
  | "4-fluid"
  | "6"
  | "6-fluid"
  | "8"
  | "8-fluid"
  | "12"
  | "12-fluid"
  | "16"
  | "16-fluid"
  | "24"
  | "24x-fluid";
