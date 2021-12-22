import TIM from '@/modules/tim-js-sdk'
// import COS from "@/modules/cos-js-sdk-v5";
//发送图片、文件等消息需要腾讯云即时通信 IM 上传插件
import TIMUploadPlugin from '@/modules/tim-upload-plugin';
import LibGenerateTestUserSig from './lib-generate-test-usersig.js'

const options = {
  SDKAppID: 1400586733 // 接入时需要将0替换为您的即时通信应用的 SDKAppID  1400603479  1400586733
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
const tim = TIM.create(options); // SDK 实例通常用 tim 表示
const TIMData = TIM
// 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});
// 注册腾讯云即时通信 IM 上传插件
tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});



/* eslint-disable require-jsdoc */
function genTestUserSig(userID) {
  const SDKAPPID = 1400586733;//1400277699  1400603479  1400586733
  const EXPIRETIME = 604800;
  //dee0a2cf90991afd72ef3c2f8117d835cd65e5e3bd9d4c38af8a355d0342dcd0
  const SECRETKEY = 'dee0a2cf90991afd72ef3c2f8117d835cd65e5e3bd9d4c38af8a355d0342dcd0'; //613a59178df353bed7e232e016f8ebe01b373f223ea3ea18f94c8c7861975b82
 
  if (SDKAPPID === '' || SECRETKEY === '') {
    alert(
      '请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ' +
        '\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js'
    );
  }
  const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userID);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}

export default {
	tim,
	TIMData,
	genTestUserSig
}