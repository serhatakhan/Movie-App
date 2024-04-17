import 'react-native-gesture-handler';
import React, {Component} from 'react';
import AppNavigation from './src/navigation/appNavigation';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();
// LogBox.ignoreLogs(['Warning: ...']);

const App = () => {
  return <AppNavigation />;
};

export default App;
