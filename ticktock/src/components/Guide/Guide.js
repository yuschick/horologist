import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Guide extends Component {
  constructor() {
    super();

    this.getGuide = this.getGuide.bind(this);

    this.state = {
      guides: [{
          id: 1,
          title: 'Building Your First Watch',
          content: 'garbage 1',
        },
      ],
    }
  }

  getGuide() {
    const arr = this.state.guides;
    const field = 'id';
    const val = this.props.id;

    let match;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][field] === val) {
            match = arr[i];
            break;
        }
    }
    return match;
  }

  render() {
    const guide = this.getGuide();

    return (
      <div>
        <h4 className='has-spacer'>{guide.title}</h4>

      </div>
    );
  }
}

Guide.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Guide;
