import React, { useState } from 'react';
import {View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {WebView} from 'react-native-webview';

const ViewOnLoad = () => {


  const getFile = () => {
    RNFetchBlob.config({fileCache: true})
      .fetch('GET', `http://10.0.2.2:4040/file/employees.xls`)
      .then(res => {
        return res.path()
      })
    };

  return (
    <View>
      <WebView
        originWhitelist={['*']}
        source={{baseUrl: `http://localhost:4040/file/sample.pdf`}}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        // style={{width: 400, height: 400}}
      />
    </View>
  );
};

export default ViewOnLoad;
