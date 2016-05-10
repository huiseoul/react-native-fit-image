var React = require('react');
var ReactNative = require('react-native');
var PropTypes = React.PropTypes;
var Image = ReactNative.Image;

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  originalHeight: PropTypes.number,
  originalWidth: PropTypes.number,
  source: PropTypes.object.isRequired,
  style: Image.propTypes.style,
};

var FitImage = React.createClass({
  getInitialState: function() {
    var size = [this.props.width, this.props.height];
    var originalSize = [this.props.originalWidth, this.props.originalHeight];

    if (size.filter(function(e) { return e }).length === 1) {
      throw new Error('Props error: size props must be present ' +
                      'none or both of width and height.');
    }

    if (originalSize.filter(function(e) { return e }).length === 1) {
      throw new Error('Props error: originalSize props must be present ' +
                      'none or both of originalWidth and originalHeight.');
    }

    return {
      height: 0,
      layoutWidth: undefined,
      originalWidth: undefined,
      originalHeight: undefined,
    };
  },
  componentDidMount: function() {
    if (!this.props.originalWidth || !this.props.originalHeight) {
      Image.getSize(this.props.source.uri, function(width, height) {
        var newHeight = this.state.layoutWidth / width;

        this.setState({
          height: newHeight,
          originalWidth: width,
          originalHeight: height,
        });
      });
    }
  },
  getStyle: function() {
    if (this.props.width) {
      return { width: this.props.width };
    }
    return { flex: 1 };
  },
  getOriginalWidth: function() {
    return this.props.originalWidth || this.state.originalWidth;
  },
  getOriginalHeight: function() {
    return this.props.originalHeight || this.state.originalHeight;
  },
  getRatio: function(width) {
    var layoutWidth = width || this.state.layoutWidth;

    return layoutWidth / this.getOriginalWidth();
  },
  getHeight: function(layoutWidth) {
    if (this.props.height) {
      return this.props.height;
    }
    return this.getOriginalHeight() * this.getRatio(layoutWidth);
  },
  resize: function(event) {
    var { width } = event.nativeEvent.layout;
    var height = this.getHeight(width);

    this.setState({
      height,
      layoutWidth: width,
    });
  },
  render: function() {
    return (
      <Image
        source={this.props.source}
        style={[
          { height: this.state.height },
          this.props.style,
          this.getStyle(),
        ]}
        onLayout={this.resize}
      />
    );
  }
});

FitImage.propTypes = propTypes;

module.exports = FitImage;
