import React, {
  Component,
  Dimensions,
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

    if(size.filter((e) => { return e; }).length == 1) {
      throw("Props error: size props must be present " +
            "none or both of width and height.");
    }

    if(originalSize.filter((e) => { return e; }).length === 1) {
      throw("Props error: originalSize props must be present " +
            "none or both of originalWidth and originalHeight.");
    }

    if([...size, ...originalSize].filter((e) => { return e; }).length === 0) {
      throw("Props error: at least one props must be present " +
            "among (originalWidth, originalHeight) and (width, height).");
    }

    this.state = {
      height: 0,
    };
  }

  _getWidthObject() {
    if(this.props.width) {
      return { width: this.props.width };
    }
    return null;
  }

  _getRatio(width) {
    return this._getWidthObject() ? 1 : width / this.props.originalWidth;
  }

  _getHeight(width) {
    if(this.props.height) {
      return this.props.height;
    } else {
      return this.props.originalHeight * this._getRatio(width);
    }
  }

  _setHeight(event) {
    var { width } = event.nativeEvent.layout;
    console.log('width', width);

    const height = this._getHeight(width);

    this.setState({
      height,
    });
  }

  render() {
    console.log(this.state.height);

    return (
      <Image
        source={this.props.source}
        style={[
          {
            flex: 1,
            height: this.state.height,
          },
          this.props.style,
          this._getWidthObject(),
        ]}
        onLayout={(event) => this._setHeight(event)}
      />
    );
  }
}

export default FitImage;
