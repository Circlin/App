import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Portal, Dialog, Button, List} from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const PickerInput = styled.TouchableOpacity`
  height: 56px;
  justify-content: center;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.32);
`;

const Placeholder = styled.Text`
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
`;

const ScrollMargin = styled.View`
  height: 8px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

class Picker extends Component {
  state = {
    text: '',
    pickerData: this.props.data,
    pickerValue: '',
  };

  dialogShow = () => {
    this.setState({dialogVisible: true});
  };

  dialogHide = () => {
    this.setState({dialogVisible: false});
  };

  changeValue(value) {
    this.dialogHide();

    this.props.itemSelect(value.label, this.props.dataType, value.keyValue);

    // this.setState({pickerValue: value.LARGCD_NM});
  }

  render() {
    const {dialogVisible} = this.state;
    const arrayValue = this.props.data;
    const selectValue = this.props.value;
    return (
      <Container>
        <PickerInput activeOpacity={1} onPress={this.dialogShow}>
          <Text style={{color: 'rgba(0,0,0,0.54)', fontSize: 16}}>
            {selectValue}
          </Text>
        </PickerInput>
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={this.dialogHide}
            style={[styles.dialog]}>
            <Dialog.ScrollArea style={[styles.dialogScrollArea]}>
              <ScrollView>
                <ScrollMargin />

                {arrayValue.map((data) => {
                  return (
                    <List.Item
                      key={data.keyValue}
                      title={data.label}
                      titleStyle={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                      }}
                      onPress={this.changeValue.bind(this, data)}
                    />
                  );
                })}
                <ScrollMargin />
              </ScrollView>
            </Dialog.ScrollArea>
            <ButtonContainer>
              <Button
                mode="contained"
                style={[styles.button]}
                contentStyle={[styles.buttonContent]}
                onPress={this.dialogHide}>
                닫기
              </Button>
            </ButtonContainer>
          </Dialog>
        </Portal>
      </Container>
    );
  }
}

export default Picker;

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    borderRadius: 8,
    maxHeight: 0.8 * Dimensions.get('window').height,
  },
  dialogMap: {
    flex: 1,
    borderRadius: 8,
    maxHeight: 0.5 * Dimensions.get('window').height,
    marginHorizontal: 48,
  },
  dialogScrollArea: {
    flex: 1,
    paddingHorizontal: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  dialogMapContent: {
    flex: 1,
  },
  button: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonContent: {
    height: 48,
  },
});
