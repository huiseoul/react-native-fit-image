Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);



var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}



var propTypes={
height:_react.PropTypes.number,
width:_react.PropTypes.number,
originalHeight:_react.PropTypes.number,
originalWidth:_react.PropTypes.number,
source:_react.PropTypes.object.isRequired,
style:_reactNative.Image.propTypes.style};var 


FitImage=function(_Component){_inherits(FitImage,_Component);
function FitImage(props){_classCallCheck(this,FitImage);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(FitImage).call(this,
props));

var size=[props.width,props.height];
var originalSize=[props.originalWidth,props.originalHeight];

if(size.filter(function(e){return e;}).length===1){
throw new Error('Props error: size props must be present '+
'none or both of width and height.');}


if(originalSize.filter(function(e){return e;}).length===1){
throw new Error('Props error: originalSize props must be present '+
'none or both of originalWidth and originalHeight.');}


_this.state={
height:0,
layoutWidth:undefined,
originalWidth:undefined,
originalHeight:undefined};return _this;}_createClass(FitImage,[{key:'componentDidMount',value:function componentDidMount()



{var _this2=this;
if(!this.props.originalWidth||!this.props.originalHeight){
_reactNative.Image.getSize(this.props.source.uri,function(width,height){
var newHeight=_this2.state.layoutWidth/width;

_this2.setState({
height:newHeight,
originalWidth:width,
originalHeight:height});});}}},{key:'getStyle',value:function getStyle()





{
if(this.props.width){
return {width:this.props.width};}

return {flex:1};}},{key:'getOriginalWidth',value:function getOriginalWidth()


{
return this.props.originalWidth||this.state.originalWidth;}},{key:'getOriginalHeight',value:function getOriginalHeight()


{
return this.props.originalHeight||this.state.originalHeight;}},{key:'getRatio',value:function getRatio(


width){
var layoutWidth=width||this.state.layoutWidth;

return layoutWidth/this.getOriginalWidth();}},{key:'getHeight',value:function getHeight(


layoutWidth){
if(this.props.height){
return this.props.height;}

return this.getOriginalHeight()*this.getRatio(layoutWidth);}},{key:'resize',value:function resize(


event){var 
width=event.nativeEvent.layout.width;
var height=this.getHeight(width);

this.setState({
height:height,
layoutWidth:width});}},{key:'render',value:function render()



{var _this3=this;
return (
_react2.default.createElement(_reactNative.Image,{
source:this.props.source,
style:[
{height:this.state.height},
this.props.style,
this.getStyle()],

onLayout:function onLayout(event){return _this3.resize(event);}}));}}]);return FitImage;}(_react.Component);





FitImage.propTypes=propTypes;exports.default=

FitImage;