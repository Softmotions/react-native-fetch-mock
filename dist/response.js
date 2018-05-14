Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _immutable=require('immutable');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Response=function(){
function Response(){_classCallCheck(this,Response);
this.status=200;
this.data={};
this.headers=(0,_immutable.Map)();
this.statusText='';
}_createClass(Response,[{key:'success',value:function success(

payload){
this.status=200;
this.data={
is_ok:true,
status:'ok',
description:'OK',
payload:payload};

}},{key:'failure',value:function failure(

description){var payload=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var status=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;
if(payload*1+''===payload+''){
status=payload;
payload=null;
}

if(!status){
status=500;
}

this.status=status;

this.data={
is_ok:false,
status:'error',
description:description,
payload:payload};

}},{key:'text',value:function text()









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