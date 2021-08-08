import React from 'react';
import {StyleSheet, Text as DefaultText} from 'react-native';

// Lookup table for finding a font style given a font weight.
const RegularFontMap = {
  normal: 'Poppins_400Regular',
  bold: 'Poppins_700Bold',
  '100': 'Poppins_100Thin',
  '200': 'Poppins_200ExtraLight',
  '300': 'Poppins_300Light',
  '400': 'Poppins_400Regular',
  '500': 'Poppins_500Medium',
  '600': 'Poppins_600SemiBold',
  '700': 'Poppins_700Bold',
  '800': 'Poppins_800ExtraBold',
  '900': 'Poppins_900Black',
};

// Lookup table for finding a font style given a font weight, italic version.
const ItalicFontMap = {
  normal: 'Poppins_400Regular_Italic',
  bold: 'Poppins_700Bold_Italic',
  '100': 'Poppins_100Thin_Italic',
  '200': 'Poppins_200ExtraLight_Italic',
  '300': 'Poppins_300Light_Italic',
  '400': 'Poppins_400Regular_Italic',
  '500': 'Poppins_500Medium_Italic',
  '600': 'Poppins_600SemiBold_Italic',
  '700': 'Poppins_700Bold_Italic',
  '800': 'Poppins_800ExtraBold_Italic',
  '900': 'Poppins_900Black_Italic',
};

export type TextProps = DefaultText['props'];

/**
 * A styled text component, behaves identically to the default React Native
 * text component, but provides a custom font.
 * 
 * This is needed because;
 *  a. React Native doesn't have a way to apply a font to the whole application.
 *  b. The font library does not provide a single font which
 *     contains bold and italic versions, instead it provides each different
 *     style as a separate font family (as seen above in the lookup tables).
 * 
 * This means we must determine the font weight and font style manually, and
 * select the correct font ourselves.
 */
export default function Text(props: TextProps) {
  const {style = {}, ...rest} = props;

  // Pull out the font weight and font style, setting reasonable defaults.
  const {
    fontWeight = '400',
    fontStyle = 'normal',
    ...otherStyles
  } = StyleSheet.flatten(style);

  return (
    <DefaultText
      style={[
        {
          fontFamily:
            fontStyle === 'normal'
              ? RegularFontMap[fontWeight]
              : ItalicFontMap[fontWeight],
        },
        otherStyles,
      ]}
      {...rest}
    />
  );
}
