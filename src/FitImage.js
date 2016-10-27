import React, { PropTypes } from 'react';
import { Image } from 'react-native';

const propTypes = {
  ...Image.propTypes,
  height: PropTypes.number,
  width: PropTypes.number,
  originalHeight: PropTypes.number,
  originalWidth: PropTypes.number,
};

class FitImage extends Image {
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

    this.getHeight = this.getHeight.bind(this);
    this.getOriginalHeight = this.getOriginalHeight.bind(this);
    this.getOriginalWidth = this.getOriginalWidth.bind(this);
    this.getRatio = this.getRatio.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.resize = this.resize.bind(this);
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

  getHeight(layoutWidth) {
    if (this.props.height) {
      return this.props.height;
    }

    return this.getOriginalHeight() * this.getRatio(layoutWidth);
  }

  getOriginalHeight() {
    return this.props.originalHeight || this.state.originalHeight;
  }

  getOriginalWidth() {
    return this.props.originalWidth || this.state.originalWidth;
  }

  getRatio(width) {
    const layoutWidth = width || this.state.layoutWidth;

    return layoutWidth / this.getOriginalWidth();
  }

  getStyle() {
    if (this.props.width) {
      return { width: this.props.width };
    }
    return { flex: 1 };
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
        onLayout={this.resize}
      >
        {this.props.children}
      </Image>
    );
  }
}

FitImage.propTypes = propTypes;

export default FitImage;
