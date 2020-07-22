import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faPen,
  faDumbbell,
  faTshirt,
  faUtensilsAlt,
  faEllipsisH,
} from '@fortawesome/pro-regular-svg-icons';
import styled from 'styled-components/native';

const IconContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Fab = () => {
  const [state, setState] = React.useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  return (
    <Portal>
      <FAB.Group
        style={[styles.fabLocation]}
        open={open}
        fabStyle={[styles.fab]}
        icon={
          open
            ? (props) => (
                <FontAwesomeIcon
                  icon={faPen}
                  style={[styles.icon]}
                  {...props}
                />
              )
            : (props) => (
                <FontAwesomeIcon icon={faPlus} color="#ffffff" {...props} />
              )
        }
        actions={[
          {
            icon: (props) => <FontAwesomeIcon icon={faEllipsisH} {...props} />,
            label: '기타',
            onPress: () => console.log('Pressed add'),
          },
          {
            icon: (props) => <FontAwesomeIcon icon={faTshirt} {...props} />,
            label: '아이템',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: (props) => (
              <FontAwesomeIcon icon={faUtensilsAlt} {...props} />
            ),
            label: '식단',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: (props) => <FontAwesomeIcon icon={faDumbbell} {...props} />,
            label: '운동',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default Fab;

const styles = StyleSheet.create({
  fabLocation: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingBottom: 100,
  },
  fab: {
    backgroundColor: "#262828",
  },
  icon: {
    color: '#ffffff',
  },
});
