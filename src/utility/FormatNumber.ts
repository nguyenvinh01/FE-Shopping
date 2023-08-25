import numeral from "numeral";

export const FormatNumber = (number: number | undefined) => {
  return numeral(number).format("0,0");
};
