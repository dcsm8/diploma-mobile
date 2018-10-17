import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, List } from 'react-native-paper';
import moment from 'moment';
import 'moment/min/moment-with-locales';
import 'moment/locale/es';
import axios from 'axios';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle';

moment.locale('es');

class HomeScreen extends Component {
  state = {
    diplomaList: [],
    programList: [],
  };

  componentDidMount = () => {
    this.getDiplomaDescriptions();
  };

  /**
 *
    $class: "org.example.mynetwork.Diploma"
    date: "2018-10-09T05:00:00.000Z"
    diplomaId: "a8b2e340-cb9d-11e8-8c9d-bda2958ffab8"
    ipfsUrl: "QmNqva3QFARVuNgUNXi7CdkrKhsT62qbsyvwU1rYzsFG9Q"
    program: "resource:org.example.mynetwork.Program#1554"
    student: "resource:org.example.mynetwork.Student#deividsanchez96@hotmail.com"
    university: "resource:org.example.mynetwork.University#2880"
    valid: true
 *
 */
  getDiplomaDescriptions = async () => {
    const diplomaList = await axios.get('http://192.168.0.6:3005/api/Diploma', {
      withCredentials: true,
    });

    const programList = await axios.get(`http://192.168.0.6:3005/api/Program`, {
      withCredentials: true,
    });

    console.log('diplomaList', diplomaList);
    console.log('programList', programList);

    this.setState({
      diplomaList: diplomaList.data,
      programList: programList.data,
    });
  };

  renderDiplomas = () => {
    const { diplomaList, programList } = this.state;

    const dataSource = [];
    diplomaList.map(diploma => {
      const { program, ipfsUrl, date } = diploma;
      const programId = program.split('#')[1];

      const { title, typeProgram } = _.find(programList, ['programId', programId]);
      const formattedDate = moment(date).format('DD MMMM YYYY');
      const dataItem = {
        title,
        typeProgram,
        date: formattedDate,
        ipfsUrl,
      };
      dataSource.push(dataItem);
    });

    return dataSource.map(item => (
      <List.Item
        onPress={() => this.onPress(item)}
        title={item.title}
        description={item.date}
        left={() => <List.Icon icon="verified-user" />}
      />
    ));
  };

  onPress = certificate => {
    this.props.navigation.navigate('CertificateScreen', {
      certificate,
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Appbar.Header>
          <Appbar.Content title="Certificados" />
        </Appbar.Header>
        <ScrollView>
          <List.Section title="Facultad Tecnológica UDFJC">{this.renderDiplomas()}</List.Section>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
