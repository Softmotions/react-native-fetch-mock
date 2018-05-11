Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _immutable=require('immutable');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Response=function(){
function Response(_ref)




{var status=_ref.status,_ref$data=_ref.data,data=_ref$data===undefined?{}:_ref$data,_ref$headers=_ref.headers,headers=_ref$headers===undefined?{}:_ref$headers,_ref$statusText=_ref.statusText,statusText=_ref$statusText===undefined?'':_ref$statusText;_classCallCheck(this,Response);
this.status=status;
this.data=data;
this.headers=(0,_immutable.Map)(headers);
this.statusText=statusText;
}_createClass(Response,[{key:'text',value:function text()









{
try{
return Promise.resolve(JSON.stringify(this.data));
}catch(err){
return Promise.reject(new Error('failed text invoke.'));
}
}},{key:'json',value:function json()

{
return this.data;
}},{key:'ok',get:function get(){if(this.status>=200&&this.status<300){return true;}else{return false;}}}]);return Response;}();exports.default=



Response;