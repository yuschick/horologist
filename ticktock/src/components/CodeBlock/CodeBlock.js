import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CodeBlock extends Component {
  constructor() {
    super();
    this.getCodeBlock = this.getCodeBlock.bind(this);
  }

  getCodeBlock() {
    let block;
    switch (this.props.id) {
      case 'dials':
        block = `let settings = {
  dials: [{
    name: 'primary',
    hands: {
      hour: 'dial-primary-hour-hand',
      minute: 'dial-primary-minute-hand',
      second: 'dial-primary-second-hand'
    }
  },
  {
    name: 'secondary',
    hands: {
      hour: 'dial-secondary-hour-hand',
      minute: 'dial-secondary-minute-hand',
      second: 'dial-secondary-second-hand'
    },
    offset: '+6',
    sweep: true
  }]
};

let demo = new Watch(settings);
`;
        break;
      case 'perpetual-calendar':
        block = `let settings = {
  dials: [{
    hands: {
      hour: 'perpetual-hour-hand',
      minute: 'perpetual-minute-hand',
      second: 'perpetual-second-hand'
    }
  }],
  day: {
    id: 'day-indicator-disc'
  },
  date: {
    id: 'date-disc'
  },
  month: {
    id: 'month-disc'
  },
  year: {
    id: 'year-hand'
  }
};

let demo = new Watch(settings);
`;

      break;
      case 'day-night-indicator':
        block = `let settings = {
  dials: [{
    hands: {
      hour: 'day-night-hour-hand',
      minute: 'day-night-minute-hand',
      second: 'day-night-second-hand'
    }
  }],
  dayNightIndicator: {
    id: 'day-night-dial'
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'manual-time':
        block = `let settings = {
  dials: [{
      name: 'primary',
      hands: {
        hour: 'crown-primary-hour-hand',
        minute: 'crown-primary-minute-hand',
        second: 'crown-primary-second-hand'
      }
    },
    {
      name: 'secondary',
      hands: {
        hour: 'crown-secondary-hour-hand',
        minute: 'crown-secondary-minute-hand'
      },
      offset: '+6'
    }
  ],
  crown: {
    id: 'the-crown'
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'minute-repeater':
        block = `let settings = {
  dials: [{
    hands: {
      hour: 'repeater-hour-hand',
      minute: 'repeater-minute-hand',
      second: 'repeater-second-hand'
    }
  }],
  repeater: {
    id: 'play-repeater',
    chimes: {
      hour: './dist/sounds/chime-01.mp4',
      quarter: './dist/sounds/chime-02.mp4',
      minute: './dist/sounds/chime-03.mp4'
    }
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'moonphase':
        block = `let settings = {
  dials: [{
    hands: {
      hour: 'moonphase-hour-hand',
      minute: 'moonphase-minute-hand',
      second: 'moonphase-second-hand'
    }
  }],
  moonphase: {
    id: 'moonphase-dial'
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'power-reserve':
        block = `let settings = {
  dials: [{
    hands: {
      hour: 'reserve-hour-hand',
      minute: 'reserve-minute-hand',
      second: 'reserve-second-hand'
    }
  }],
  reserve: {
    id: 'reserve-hand',
    range: [-90, 90]
  }
};

let demo = new Watch(settings);
`;
      break;
    default:
      return false;
    }

    return block;
  }
  render() {
    return (
      <code>
        <pre className='prettyprint lang-js linenums'>{`${this.getCodeBlock(this.props.id)}`}</pre>
      </code>
    );
  }
}

CodeBlock.propTypes = {
  id: PropTypes.string.isRequired,
}

export default CodeBlock;
