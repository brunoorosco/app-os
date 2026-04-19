import { Colors, FontFamily } from '@presentation/styles';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TextProps } from 'react-native';

interface GradientTextProps extends Omit<TextProps, 'children'> {
  children: string;
  gradient: keyof typeof Colors.title;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export function GradientText({
  children,
  gradient,
  numberOfLines,
  style,
  start = { x: 0, y: 0.5 },
  end = { x: 1, y: 0.5 },
  ...rest
}: GradientTextProps) {
  const baseStyle = { fontFamily: FontFamily.outfit.bold, fontSize: 36 as const };

  return (
    <MaskedView
      maskElement={
        <Text
          {...rest}
          style={[baseStyle, style, { backgroundColor: 'transparent' }]}
          numberOfLines={numberOfLines}
        >
          {children}{' '}
        </Text>
      }
    >
      <LinearGradient colors={Colors.title[gradient]} start={start} end={end} locations={[0.5, 1]}>
        <Text {...rest} numberOfLines={numberOfLines} style={[baseStyle, style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
