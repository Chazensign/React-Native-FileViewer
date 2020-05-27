import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import XLSX from 'xlsx';

export default class XLSFileDisp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableData: []
    };
  }

  componentDidMount = () => {
    var workbook = XLSX.read(this.props.file.data, {type: 'array'});
    var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var data = XLSX.utils.sheet_to_json(first_worksheet, {
      header: 1,
    });
    this.setState({
      tableHead: data[0],
      tableData: [...data.slice(1)]
    });
  }

  render() {
    const {thumbnail} = this.props
    const {tableHead, tableData} = this.state
    return (
      <View style={thumbnail ? styles.thumbCont : styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#3590b8'}}>
          <Row
            data={tableHead}
            style={thumbnail ? styles.thumbHead : styles.head}
            textStyle={thumbnail ? styles.thumbText : styles.text}
          />
          <Rows
            data={tableData}
            textStyle={thumbnail ? styles.thumbText : styles.text}
          />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 5},
  head: {height: 45, backgroundColor: '#d6ebff'},
  text: {margin: 2, textAlign: 'center'},
  thumbCont: { backgroundColor: '#fff'},
  thumbHead: {height: 15, backgroundColor: '#d6ebff'},
  thumbText: {margin: 0, textAlign: 'center', fontSize: 5},
});
