import $axios from "@/utils/axios";


export const decimal2Percent = (val, fractionDigits = 2, ignoreSign = true) => {
  if(ignoreSign) {
    val = Math.abs(val)
  }
  let str = Math.round(Number(val * 100 * Math.pow(10, fractionDigits))) / 100
  str += "%";
  return str;
}

export const calcSignClass = (val) => {
  return val >=0 ? 'rate-up' : 'rate-down'
}

export const thousands = (val) => {
  let nu = parseInt(val, 10)
  return nu.toLocaleString()
}

export const generatePromise = () => {
  let resolve, reject
  const p = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return [p, resolve ,reject]
}


// 日志信息接口的开始
export  const  Information_log=(title_name,info_log,usernameO)=>{

  // info_log=JSON.stringify(info_log);
  // console.log(typeof(info_log));
  // console.log(info_log);

  $axios.get('/bi-mobile/api/user/common/log/save',{params:{qualifiedName:title_name,description:info_log,username:usernameO,logLevel:'Info',logType:'Web'}})
      .then(({success})=>{
        console.log(success+'信息已记录！');

      });

}
// 日志信息接口的结束


