import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './CodeBlock.css';

class CodeBlock extends Component {
  render() {
    return (
      <code>
        <pre className={`prettyprint lang-${this.props.lang || 'js'} linenums`}>{`${this.props.children}`}</pre>
      </code>
    );
  }
}

CodeBlock.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.string,
}

export default CodeBlock;
