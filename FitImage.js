import React, {
  Component,
  Image,
  PropTypes,
} from 'react-native';

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  originalHeight: PropTypes.number,
  originalWidth: PropTypes.number,
  source: PropTypes.object.isRequired,
  style: PropTypes.number,
};

class FitImage extends Component {
  constructor(props) {
    super(props);

    const size = [props.width, props.height];
    const originalSize = [props.originalWidth, props.originalHeight];

    if (size.filter(e => e).length === 1) {
      throw new Error('Props error: size props must be present ' +
                      'none or both of width and height.');
    }

    if (originalSize.filter(e => e).length === 1) {
      throw new Error('Props error: originalSize props must be present ' +
                      'none or both of originalWidth and originalHeight.');
    }

    this.state = {
      height: 0,
      layoutWidth: undefined,
      originalWidth: undefined,
      originalHeight: undefined,
    };
  }

  componentDidMount() {
    if(!this.props.originalWidth || !this.props.originalHeight) {
      Image.getSize(this.props.source.uri, (width, height) => {
        const newHeight = this.state.layoutWidth / width;

        this.setState({
          height: newHeight,
          originalWidth: width,
          originalHeight: height,
        });
      });
    }
  }

  _getStyle() {
    if (this.props.width) {
      return { width: this.props.width };
    }
    return { flex: 1 };
  }

  _getRatio(width) {
    return width / (this.props.originalWidth || this.state.originalWidth);
  }

  _getHeight(width) {
    if (this.props.height) {
      return this.props.height;
    }
    return (this.props.originalHeight || this.state.originalHeight) * this._getRatio(width);
  }

  _setHeight(event) {
    const { width } = event.nativeEvent.layout;
    const height = this._getHeight(width);

    this.setState({
      height,
      layoutWidth: width,
    });
  }

  render() {
    return (
      <Image
        source={this.props.source}
        style={[
          { height: this.state.height },
          this.props.style,
          this._getStyle(),
        ]}
        onLayout={(event) => this._setHeight(event)}
      />
    );
  }
}

FitImage.propTypes = propTypes;

export default FitImage;
