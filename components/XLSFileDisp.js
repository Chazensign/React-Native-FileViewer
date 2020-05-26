import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

export default class XLSFileDisp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: props.array[0],
      tableData: [...props.array.slice(1)],
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#3590b8'}}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows
            data={state.tableData}
            textStyle={styles.text}
          />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 5, backgroundColor: '#fff'},
  head: {height: 45, backgroundColor: '#d6ebff'},
  text: {margin: 2, textAlign: 'center'},
});
