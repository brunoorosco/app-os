import { Feather } from '@expo/vector-icons';
import { Colors } from '@presentation/styles';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

export default function SignatureScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const ref = useRef<any>(null);

  useEffect(() => {
    // Force landscape on mount
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    lockOrientation();

    // Revert to portrait on unmount
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const handleOK = (signature: string) => {
    // signature is a base64 string
    router.replace({
      pathname: '/(app)/order/[id]',
      params: { id, signature: signature },
    });
  };

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <Feather name="x" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Assinatura do Cliente</Text>
        <TouchableOpacity onPress={handleClear} style={styles.textButton}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Signature Area */}
      <View style={styles.canvasContainer}>
        <SignatureCanvas
          ref={ref}
          onOK={handleOK}
          descriptionText=""
          clearText="Limpar"
          confirmText="Confirmar"
          webStyle={canvasStyle}
          autoClear={false}
          imageType="image/png"
        />
        {/* Baseline for rubrica */}
        <View style={styles.baseline} pointerEvents="none" />
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <Text style={styles.helperText}>Assine sobre a linha acima</Text>
        <TouchableOpacity style={styles.saveButton} onPress={() => ref.current?.readSignature()}>
          <Text style={styles.saveButtonText}>Confirmar Assinatura</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const canvasStyle = `
  .m-signature-pad { 
    box-shadow: none; 
    border: none; 
    background-color: #FFFFFF;
  }
  .m-signature-pad--body {
    border: none;
  }
  .m-signature-pad--footer {
    display: none;
  }
  body, html {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  textButton: {
    paddingHorizontal: 12,
  },
  clearText: {
    color: Colors.error,
    fontWeight: '600',
  },
  canvasContainer: {
    flex: 1,
    position: 'relative',
  },
  baseline: {
    position: 'absolute',
    bottom: '30%',
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: '#E5E7EB',
  },
  footer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
  },
  helperText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: Colors.main,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
