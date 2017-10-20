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
  height: number;
  isLoading: boolean;
  layoutWidth: number | undefined;
  originalHeight: number | undefined;
  originalWidth: number | undefined;
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
  private style: ImageStyle;
  private isFirstLoad: boolean;
  private mounted: boolean;
  private ImageComponent = ImageBackground || Image;

  constructor(props: IFitImageProps) {
    super(props);

    this.style = StyleSheet.flatten(props.style);

    if (this.style) {
      const size = [this.style.width, this.style.height];

      if (size.filter(Boolean).length === 1) {
        throw new Error('Props error: size props must be present ' +
                        'none or both of width and height.');
      }
    }

    const originalSize = [props.originalWidth, props.originalHeight];
    if (originalSize.filter(Boolean).length === 1) {
      throw new Error('Props error: originalSize props must be present ' +
                      'none or both of originalWidth and originalHeight.');
    }

    this.isFirstLoad = true;

    this.state = {
      height: 0,
      isLoading: false,
      layoutWidth: undefined,
      originalHeight: undefined,
      originalWidth: undefined,
    };
  }

  public componentDidMount() {
    if (this.props.originalWidth && this.props.originalHeight) {
      return;
    }

    this.mounted = true;
    this.refreshStateSize();
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public render() {
    const ImageComponent = this.ImageComponent;
    let children = this.props.children;

    if (this.state.isLoading && this.props.indicator !== false) {
      children = this.renderActivityIndicator();
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

  private getHeight = (layoutWidth: number) => {
    if (this.style && this.style.height) {
      return Number(this.style.height);
    }

    return this.getOriginalHeight() * this.getRatio(layoutWidth);
  }

  private getOriginalHeight = () => (
    this.props.originalHeight || this.state.originalHeight || 0
  )

  private getOriginalWidth = () => (
    this.props.originalWidth || this.state.originalWidth || 0
  )

  private getRatio = (width: number) => {
    const originalWidth = this.getOriginalWidth();

    if (originalWidth === 0) {
      return 0;
    }

    const layoutWidth = width || this.state.layoutWidth || 0;

    return layoutWidth / this.getOriginalWidth();
  }

  private getStyle = () => {
    if (this.style && this.style.width) {
      return { width: this.style.width };
    }
    return { flexGrow: 1 };
  }

  private resize = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    const height = Number(this.getHeight(width));

    this.setState({
      height,
      layoutWidth: width,
    });
  }

  private refreshStateSize = () => {
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

        this.setStateSize(originalWidth, originalHeight);
      },
      () => null,
    );
  }

  private setStateSize = (originalWidth: number, originalHeight: number) => {
    const height = this.getHeight(this.state.layoutWidth || originalWidth);

    this.setState({
      height,
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
