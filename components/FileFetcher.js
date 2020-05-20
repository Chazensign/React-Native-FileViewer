
import React, {Component} from 'react'
import {Image, View, Text} from 'react-native'

class FileFetcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileURLs: [],
    }
  }

  componentDidMount() {
    fetch('http://10.0.2.2:4040/files')
      .then(async res => {
        let response = await res.json()
        this.setState({fileURLs: response.data})
        this.downloadFiles(response.data)
      })
      .catch(err => console.log(err))
  }
  downloadFiles = async list => {
    let urls = []
    for (let i = 0; i < list.length; i++) {
    }
  }

  render() {
    console.log(this.state.fileURLs)
    return (
      <>
        {this.state.fileURLs.map((fileName, i) => {
          return <Text key={i}>{fileName}</Text>
        })}
      </>
    )
  }
}

export default FileFetcher
