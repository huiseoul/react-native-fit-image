import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Component, ReactElement } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageProperties,
  ImageStyle,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';

export interface IFitImageProps extends ImageProperties {
  children?: ReactElement<any>;
  /**
   * Whether should display activity indicator or not
   */
  indicator?: boolean;

  /**
   * Color of activity indicator in string
   */
  indicatorColor?: string;

  /**
   * Size of activity indicator
   */
  indicatorSize?: 'small' | 'large' | number;

  /**
   * Original height of the image
   *
   * @description
   * If you already know the height of the image you can pass it here.
   * Then it will be used instead of fetching the size information remotely.
   */
  originalHeight?: number;

  /**
   * Original width of the image
   *
   * @description
   * If you already know the width of the image you can pass it here.
   * Then it will be used instead of fetching the size information remotely.
   */
  originalWidth?: number;
}

export interface IFitImageState {
  isLoading: boolean;
  layoutWidth: number;
  originalHeight: number;
  originalWidth: number;
}

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

class FitImage extends Component<IFitImageProps, IFitImageState> {
  public static propTypes = propTypes;
  private ImageComponent = ImageBackground || Image;
  private isFirstLoad: boolean;
  private mounted: boolean = false;
  private sizeStyle: ImageStyle = {};
  private style: ImageStyle;

  constructor(props: IFitImageProps) {
    super(props);

    this.style = StyleSheet.flatten(props.style);

    if (this.style) {
      const size = [this.style.width, this.style.height];

      if (size.filter(Boolean).length === 1) {
        throw new Error('Props error: size props must be present ' +
                        'none or both of width and height.');
      }

      if (this.style.width) {
        this.sizeStyle = { width: this.style.width };
      } else {
        this.sizeStyle = { flexGrow: 1 };
      }
    }

    const originalSize = [props.originalWidth, props.originalHeight];
    if (originalSize.filter(Boolean).length === 1) {
      throw new Error('Props error: originalSize props must be present ' +
                      'none or both of originalWidth and originalHeight.');
    }

    this.isFirstLoad = true;

    this.state = {
      isLoading: false,
      layoutWidth: 0,
      originalHeight: 0,
      originalWidth: 0,
    };
  }

  public componentDidMount() {
    this.mounted = true;

    if (this.props.originalWidth && this.props.originalHeight) {
      return;
    }

    this.fetchOriginalSizeFromRemoteImage();
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public render() {
    const ImageComponent = this.ImageComponent;

    return (
      <ImageComponent
        {...this.props}
        onLayout={this.onLayout}
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        onError={this.onError}
        source={this.props.source}
        style={[
          this.style,
          this.sizeStyle,
          { height: this.getHeight() },
          styles.container,
        ]}
      >
        {this.shouldDisplayIndicator() ? this.renderActivityIndicator() : this.props.children}
      </ImageComponent>
    );
  }

  private shouldDisplayIndicator = () => {
    return this.state.isLoading && this.props.indicator !== false;
  }

  private onLoad = () => {
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }

    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad();
    }
  }

  private onLoadStart = () => {
    if (this.isFirstLoad) {
      this.setState({ isLoading: true });
      this.isFirstLoad = false;
    }
  }

  private onError = () => {
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }

    if (typeof this.props.onError === 'function') {
      this.props.onError();
    }
  }

  private getHeight = () => {
    if (this.style && this.style.height) {
      return Number(this.style.height);
    }

    return Math.round(this.getOriginalHeight() * this.getRatio());
  }

  private getOriginalHeight = () => (
    this.props.originalHeight || this.state.originalHeight || 0
  )

  private getOriginalWidth = () => (
    this.props.originalWidth || this.state.originalWidth || 0
  )

  private getRatio = () => {
    if (this.getOriginalWidth() === 0) {
      return 0;
    }

    return this.state.layoutWidth / this.getOriginalWidth();
  }

  private onLayout = (event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;

    this.setState({ layoutWidth });
  }

  private fetchOriginalSizeFromRemoteImage = () => {
    let uri;

    if (this.props.source instanceof Array) {
      uri = this.props.source[0].uri;
    } else {
      uri = this.props.source.uri;
    }

    if (!uri) {
      return;
    }

    Image.getSize(
      uri,
      (originalWidth, originalHeight) => {
        if (!this.mounted) {
          return;
        }

        this.setOriginalSize(originalWidth, originalHeight);
      },
      () => null,
    );
  }

  private setOriginalSize = (originalWidth: number, originalHeight: number) => {
    this.setState({
      originalHeight,
      originalWidth,
    });
  }

  private renderActivityIndicator = () => {
    return (
      <ActivityIndicator
        color={this.props.indicatorColor}
        size={this.props.indicatorSize}
      />
    );
  }
}

export default FitImage;
