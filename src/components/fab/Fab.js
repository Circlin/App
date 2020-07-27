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


const Fab = () => {
  const [state, setState] = React.useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  return (
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
          
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
  );
};

export default Fab;

const styles = StyleSheet.create({
  fabLocation: {
  },
  fab: {
    backgroundColor: "#262828",
  },
  icon: {
    color: '#ffffff',
  },
});
