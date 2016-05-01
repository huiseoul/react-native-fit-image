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
    if (!this.props.originalWidth || !this.props.originalHeight) {
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

  getStyle() {
    if (this.props.width) {
      return { width: this.props.width };
    }
    return { flex: 1 };
  }

  getOriginalWidth() {
    return this.props.originalWidth || this.state.originalWidth;
  }

  getOriginalHeight() {
    return this.props.originalHeight || this.state.originalHeight;
  }

  getRatio(width) {
    const layoutWidth = width || this.state.layoutWidth;

    return layoutWidth / this.getOriginalWidth();
  }

  getHeight(layoutWidth) {
    if (this.props.height) {
      return this.props.height;
    }
    return this.getOriginalHeight() * this.getRatio(layoutWidth);
  }

  resize(event) {
    const { width } = event.nativeEvent.layout;
    const height = this.getHeight(width);

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
          this.getStyle(),
        ]}
        onLayout={(event) => this.resize(event)}
      />
    );
  }
}

FitImage.propTypes = propTypes;

export default FitImage;
