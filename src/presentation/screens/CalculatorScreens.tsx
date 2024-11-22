/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';
import {CalcularorButton } from './CalcularorButton';
import { useCalculator } from '../hooks/useCalculator';

export const CalculatorScreens = () => {
    const {
        formula,
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        calculateResult,
        addOperation,
        prevNumber,
    } = useCalculator();
  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={styles.mainResult}>{formula}</Text>
        {
          ( formula === prevNumber )
          ? <Text style = { styles.subResults } />
          : (
        <Text
        adjustsFontSizeToFit
        numberOfLines={ 1 }
        style={styles.subResults}>
          {prevNumber}
          </Text>
          )
        }
      </View>
      <View style={styles.row}>
        <CalcularorButton onPress= {clean} label="C" color={colors.lightGray} blackText/>
        <CalcularorButton onPress= { toggleSign } label="+/-" color={colors.lightGray} blackText/>
        <CalcularorButton onPress=  { deleteOperation } label="del" color={colors.lightGray} blackText/>
        <CalcularorButton onPress= { divideOperation } label="/" color={colors.orange} />
      </View>
      <View style={styles.row}>
        <CalcularorButton onPress= {() => buildNumber('7')} label="7" />
        <CalcularorButton onPress= {() => buildNumber('8')} label="8" />
        <CalcularorButton onPress= {() => buildNumber('9')} label="9" />
        <CalcularorButton onPress= {multiplyOperation} label="x" color={colors.orange} />
      </View>
      <View style={styles.row}>
        <CalcularorButton onPress= {() => buildNumber('4')} label="4" />
        <CalcularorButton onPress= {() => buildNumber('5')} label="5" />
        <CalcularorButton onPress= {() => buildNumber('6')} label="6" />
        <CalcularorButton onPress= {subtractOperation} label="-" color={colors.orange} />
      </View>
      <View style={styles.row}>
        <CalcularorButton onPress= {() => buildNumber('1')} label="1" />
        <CalcularorButton onPress= {() => buildNumber('2')} label="2" />
        <CalcularorButton onPress= {() => buildNumber('3')} label="3" />
        <CalcularorButton onPress= {addOperation} label="+" color={colors.orange} />
      </View>
      <View style={styles.row}>
        <CalcularorButton onPress= {() => buildNumber('0')} label="0" doubleSize/>
        <CalcularorButton onPress= {() => buildNumber('.')} label="." />
        <CalcularorButton onPress= { calculateResult } label="=" color={colors.orange}/>
      </View>
    </View>
  );
};
