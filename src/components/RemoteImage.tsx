import React, { useState, type ReactNode } from 'react';
import { StyleSheet, View, type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';
import { Image, type ImageContentFit } from 'expo-image';
import { useTheme } from '../context/ThemeContext';

interface RemoteImageProps {
  uri: string | null;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  placeholder?: ReactNode;
}

export default function RemoteImage({
  uri,
  style,
  contentFit = 'cover',
  placeholder,
}: RemoteImageProps) {
  const { colors } = useTheme();
  const [failed, setFailed] = useState(false);

  if (!uri || failed) {
    return (
      <View style={[styles.fallback, { backgroundColor: colors.border }, style]}>
        {placeholder}
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      contentFit={contentFit}
      transition={200}
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
