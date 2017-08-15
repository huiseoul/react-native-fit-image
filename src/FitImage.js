import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';

const propTypes = {
  ...Image.propTypes,
  indicator: PropTypes.bool,
  indicatorColor: PropTypes.string,
  indicatorSize: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'large']),
    PropTypes.number,
  ]),
  originalHeight: PropTypes.number,
  originalWidth: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class FitImage extends Image {
  constructor(props) {
    super(props);

    this.style = StyleSheet.flatten(props.style);

    if (this.style) {
      const size = [this.style.width, this.style.height];

      if (size.filter(e => e).length === 1) {
        throw new Error('Props error: size props must be present ' +
                        'none or both of width and height.');
      }
    }

    const originalSize = [props.originalWidth, props.originalHeight];
    if (originalSize.filter(e => e).length === 1) {
      throw new Error('Props error: originalSize props must be present ' +
                      'none or both of originalWidth and originalHeight.');
    }

    this.isFirstLoad = true;

    this.state = {
      height: 0,
      isLoading: false,
      layoutWidth: undefined,
      originalWidth: undefined,
      originalHeight: undefined,
    };

    this.getHeight = this.getHeight.bind(this);
    this.getOriginalHeight = this.getOriginalHeight.bind(this);
    this.getOriginalWidth = this.getOriginalWidth.bind(this);
    this.getRatio = this.getRatio.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.renderActivityIndicator = this.renderActivityIndicator.bind(this);
    this.resize = this.resize.bind(this);
    this.setStateSize = this.setStateSize.bind(this);
  }

  componentDidMount() {
    if (this.props.originalWidth && this.props.originalHeight) return;

    this.mounted = true;
    this.refreshStateSize();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLoad() {
    this.setState({ isLoading: false });
    this.refreshStateSize();

    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad();
    }
  }

  onLoadStart() {
    if (this.isFirstLoad) {
      this.setState({ isLoading: true });
      this.isFirstLoad = false;
    }
  }

  getHeight(layoutWidth) {
    if (this.style && this.style.height) {
      return this.style.height;
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
    if (this.style && this.style.width) {
      return { width: this.style.width };
    }
    return { flexGrow: 1 };
  }

  resize(event) {
    const { width } = event.nativeEvent.layout;
    const height = this.getHeight(width);

    this.setState({
      height,
      layoutWidth: width,
    });
  }

  refreshStateSize() {
    if (!this.props.source.uri) {
      return;
    }

    Image.getSize(this.props.source.uri, (originalWidth, originalHeight) => {
      if (!this.mounted) {
        return;
      }

      this.setStateSize(originalWidth, originalHeight);
    });
  }

  setStateSize(originalWidth, originalHeight) {
    const height = this.state.layoutWidth / originalWidth;

    this.setState({
      height,
      originalHeight,
      originalWidth,
    });
  }

  renderActivityIndicator() {
    return (
      <ActivityIndicator
        color={this.props.indicatorColor}
        size={this.props.indicatorSize}
      />
    );
  }

  render() {
    let children = this.props.children;
    let ImageComponent = Image;

    if (this.state.isLoading && this.props.indicator === true) {
      children = this.renderActivityIndicator();
    }

    if (children && ImageBackground) {
      ImageComponent = ImageBackground;
    }

    return (
      <ImageComponent
        {...this.props}
        onLayout={this.resize}
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        source={this.props.source}
        style={[
          this.style,
          this.getStyle(),
          { height: this.state.height },
          styles.container,
        ]}
      >
        {children}
      </ImageComponent>
    );
  }
}

FitImage.propTypes = propTypes;

export default FitImage;
