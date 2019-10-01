import React from 'react';
import Particles from 'react-particles-js';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  particles: {
    position: 'relative',
    width: '100%',
    height: 500,
    backgroundColor: '#222534',
  },
}));

const particleStyles = {
  "particles": {
    "number": {
      "value": 300,
      "density": {
        "enable": true,
        "value_area": 2000
      }
    },
    "color": {
      "value": "#7b85b9"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.2,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 3,
        "size_min": 1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 189.39842325812623,
      "color": "#7b85b9",
      "opacity": 0.15783201938177185,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.5,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "bubble": {
        "distance": 150,
        "size": 5,
        "duration": 1,
        "opacity": 1,
        "speed": 3
      },
      "push": {
        "particles_nb": 1
      },
    }
  },
  "retina_detect": true
}

export default () => {
  const classes = useStyles();
  return (
    <div> 
      <Particles params={particleStyles} height={500} className={classes.particles}/>
    </div>
  );
};