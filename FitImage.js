import React, {
  Component,
  Dimensions,
  Image,
  PropTypes,
} from 'react-native';

const propTypes = {
  originalHeight: PropTypes.number,
  originalWidth: PropTypes.number,
  source: PropTypes.object.isRequired,
  style: PropTypes.number,
};

class FitImage extends Component {
  constructor(props) {
    super(props);

    const height = 0;

    this.state = {
      height,
    };
  }

  _getRatio(width) {
    return width / this.props.originalWidth;
  }

  _getHeight(width) {
    return this.props.originalHeight * this._getRatio(width);
  }

  _setHeight(event) {
    var { width } = event.nativeEvent.layout;

    const height = this._getHeight(width);

    this.setState({
      height,
    });
  }

  render() {
    return (
      <Image
        source={this.props.source}
        style={[
          {
            flex: 1,
            height: this.state.height,
          },
          this.props.style
        ]}
        onLayout={(event) => this._setHeight(event)}
      />
    );
  }
}

export default FitImage;
