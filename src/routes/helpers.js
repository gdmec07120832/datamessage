import $axios from "@/utils/axios";
import * as dd from 'dingtalk-jsapi/entry/union'
import requestAuthCode from 'dingtalk-jsapi/api/runtime/permission/requestAuthCode'

export let permissionListResolved = false;
export let OnData = null;


export const dingTalkAuth = () => {

    if (dd.env.platform !== 'notInDingTalk') {
        return requestAuthCode({
            corpId: process.env.VUE_APP_CORP_ID,
        }).then(({
            code
        }) => {
            return $axios.post('/bi-sys/dd/login', null, {
                params: {
                    authCode: code
                },
                failedTip: false
            }).then(({
                data
            }) => {
                OnData = data;
            })
        }).then(() => {
            return Promise.resolve()
        }).catch((err) => {
            return Promise.reject(err)
        })
    } else {
        return Promise.resolve()
    }
}

export const getLoginUser = () => {

    if (!permissionListResolved) {
        return dingTalkAuth().then(() => {
            if (OnData) {
                sessionStorage.setItem("UserInfo", JSON.stringify({
                    userName: OnData.user.userName,
                    nickName: OnData.user.nickName,
                    nameCn: OnData.user.nameCn
                }));
                permissionListResolved = true
            }else{
                return Promise.reject({msg: '没有权限访问本系统,请联系管理员'})
            }
        });
    } else {
        return Promise.resolve()
    }

}