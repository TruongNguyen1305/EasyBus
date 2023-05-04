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

  BLACK100 = 'black',
  BLACK60 = '#666666',
  BLACK30 = '#E4E4E4',

  RED100 = 'red',
  RED60 = '#FF5C5C',
  RED30 = '#FF8080',


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
  HEADLINE1 = 26,
  HEADLINE2 = 20,
  HEADLINE3 = 18,
  HEADLINE4 = 16,

  BODY_LARGE = 16,
  BODY_SMALL = 14,
  BODY_SMALL1 = 12,
  BODY_SMALL2 = 10,

  BUTTON_LARGE = 18,
  BUTTON_NORMAL = 14,
  BUTTON_SMALL = 12,
  BUTTON_SMALL1 = 10,

  SUBTITLES_NORMAL = 13,
  SUBTITLES_SMALL = 12,
}

export enum FontWeight {
  HEADLINE1 = '500',
  HEADLINE2 = '500',
  HEADLINE3 = '500',
  HEADLINE4 = '500',

  BODY_LARGE = '400',
  BODY_SMALL = '400',
  BODY_SMALL1 = '500',
  BODY_SMALL2 = '500',

  BUTTON_LARGE = '700',
  BUTTON_NORMAL = '700',
  BUTTON_SMALL = '700',
  BUTTON_SMALL1 = '700',

  SUBTITLES_NORMAL = '500',
  SUBTITLES_SMALL = '500',
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
