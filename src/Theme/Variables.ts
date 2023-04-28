/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export enum Colors {
  TRANSPARENT = "rgba(0,0,0,0)",
  INPUT_BACKGROUND = "#FFFFFF",
  WHITE = "#ffffff",
  TEXT = "#212529",
  
  PRIMARY100 = "#05C552",
  PRIMARY80 = "#15D562",
  PRIMARY60 = "#4ACF80",
  PRIMARY40 = "#85C28C",
  PRIMARY20 = "#D9F0DC",

  SECONDARY100 = "#0093FF",
  SECONDARY80 = "#33A9FF",
  SECONDARY60 = "#2BBEFF",
  SECONDARY40 = "#8ADBFF",
  SECONDARY20 = "#DDF0FF",



  SUCCESS = "#28a745",
  ERROR = "#dc3545",
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY40,
}

/**
 * FontSize
 */
export enum FontSize {
  SMALL = 16,
  REGULAR = 20,
  LARGE = 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

export enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}















// export function Icon(size: Number, color: String): JSX.Element {


// }
