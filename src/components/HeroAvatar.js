// @flow

import {LIGHT_WHITE, ELITE_RED, REBEL_RED} from '../styles/colors';
import Arrow from 'react-svg-arrow';
import Button from './Button';
import {positionAbsolute} from '../styles/mixins';
import React from 'react';
import rebelPng from '../assets/icons/rebel.png';

const styles = {
  activated: {
    border: '3px solid green',
    opacity: 0.4,
  },
  avatar: {
    alignItems: 'center',
    border: '3px solid black',
    borderRadius: '42px',
    display: 'flex',
    fontSize: '32px',
    height: '80px',
    justifyContent: 'center',
    marginBottom: '10px',
    width: '80px',
  },
  base: {
    width: '84px',
  },
  eliteAvatar: {
    border: `3px solid ${ELITE_RED}`,
  },
  image: {
    height: '60%',
    width: '60%',
  },
  name: {
    fontSize: '13px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  outer: {
    cursor: 'pointer',
    position: 'relative',
  },
  popup: {
    ...positionAbsolute(-22, null, null, 100),
    alignItems: 'center',
    backgroundColor: LIGHT_WHITE,
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'column',
    height: '125px',
    justifyContent: 'space-between',
    width: '175px',
    zIndex: 1,
  },
  popupAccent: {
    backgroundColor: REBEL_RED,
    height: '5px',
    width: '100%',
  },
  popupArrow: {
    ...positionAbsolute(52, null, null, -11),
  },
};

type HeroAvatarPropsType = {
  activated: boolean,
  elite: boolean,
  firstName: string,
  id: string,
  isRebelPlayerTurn: boolean,
  setRebelHeroActivated: Function,
};

type HeroAvatarStateType = {
  displayPopup: boolean,
};

class HeroAvatar extends React.Component<HeroAvatarPropsType, HeroAvatarStateType> {
  state = {
    displayPopup: false,
  };

  togglePopup() {
    this.setState((state: HeroAvatarStateType) => ({displayPopup: !state.displayPopup}));
  }

  handleClick = () => {
    this.togglePopup();
  };

  handleEndActivation = () => {
    this.props.setRebelHeroActivated(this.props.id);
    this.togglePopup();
  };

  renderPopup() {
    return (
      <div style={styles.popup}>
        <div style={styles.popupArrow}>
          <Arrow
            size={8}
            color={LIGHT_WHITE}
            direction="left"
            borderWidth={2}
            borderColor="black"
          />
        </div>
        <div style={styles.popupAccent} />
        {!this.props.activated && this.props.isRebelPlayerTurn ? (
          <Button text="End activation" onClick={this.handleEndActivation} />
        ) : null}
        <Button text="Set wounded" />
        <div style={styles.popupAccent} />
      </div>
    );
  }

  render() {
    const avatarStyles = Object.assign(
      {},
      styles.avatar,
      this.props.elite ? styles.eliteAvatar : {},
      this.props.activated ? styles.activated : {}
    );

    return (
      <div style={styles.outer}>
        <div style={styles.base} onClick={this.handleClick}>
          <div style={avatarStyles}>
            <img alt={this.props.firstName} src={rebelPng} style={styles.image} />
          </div>
          <div style={styles.name}>{this.props.firstName}</div>
        </div>
        {this.state.displayPopup ? this.renderPopup() : null}
      </div>
    );
  }
}

export default HeroAvatar;