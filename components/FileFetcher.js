
import React, {Component} from 'react'
import {Image, View, Text} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';

class FileFetcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileNames: [],
      files: []
    }
  }

  componentDidMount() {
    fetch('http://10.0.2.2:4040/files')
      .then(async res => {
        let response = await res.json()
        this.setState({fileNames: response.data})
        this.downloadFiles(response.data)
      })
      .catch(err => console.log(err))
  }
  downloadFiles = async list => {
    let filesArr = []
    for (let i = 0; i < list.length; i++) {
      RNFetchBlob.config({ fileCache: true })
        .fetch('GET', `http://10.0.2.2:4040/file/${list[i]}`)
        .then(res => {
          console.log(res.path())
          filesArr.push({name: list[i], path: res.path(), type: list[i].split('.')[1]})
          if (i === list.length -1) this.setState({ files: filesArr });
        });
    }
  }

  

  render() {
    console.log(this.state)
    return (
      <>
        {this.state.fileNames.map((fileName, i) => {
          return <Text key={i}>{fileName}</Text>
        })}
      </>
    )
  }
}

export default FileFetcher
