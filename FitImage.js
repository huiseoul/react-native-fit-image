import React, {
  Component,
  Dimensions,
  Image,
} from 'react-native';

class FitImage extends Component {
  _getSize() {
    const width = Dimensions.get('window').width;
    const ratio = width / this.props.originalWidth;
    const height = this.props.originalHeight * ratio;

    return { height, width };
  }

  render() {
    return (
      <Image
        source={this.props.source}
        style={[this._getSize(), this.props.style]}
      />
    );
  }
}

export default FitImage;
