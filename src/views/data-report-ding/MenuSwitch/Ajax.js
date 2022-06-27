import $axios from "@/utils/axios";
export const ajax_fun=(array,Parameter)=>{

    Parameter=(Parameter)?Parameter:{};
    let num_api=0;
    let p_array=[];
    let variable={};
    let set_data={};
    // 数组处理开始
    Object.keys(array).forEach((key_fun) => {
      num_api++;
      [variable['p'+num_api],variable['resolve'+num_api]]=generatePromise();
      p_array.push(variable['p'+num_api]);
      array[key_fun].type=Array;
      array[key_fun]['resolve'+num_api]=variable['resolve'+num_api];
      array[key_fun]['num']=num_api;
    });
    // 数组处理结束
    Object.keys(array).forEach((key) => {
        const [, prefix, interfaceName] = key.split("-"); //把上面的拆分出来
        if (prefix && interfaceName) {
          $axios
            .post(`/bi-mobile/api/user/data/${prefix}/${interfaceName}/get`, Parameter)
            .then(({ data }) => {

              if (array[key].type === Array) {
                set_data[`${prefix}-${interfaceName}`]=data;
              } else {
                set_data[`${prefix}-${interfaceName}`]=data;
              }
              Object.keys(variable).forEach((key_var) => {
                if(key_var==('resolve'+array[key]['num'])){
                  array[key]['resolve'+array[key]['num']]();
                }
              });
            });
        }
    });
    return {p1:Promise.all(p_array),SetData:set_data}
    
}


export const generatePromise=()=>{
    let resolve, reject
    const p = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    return [p, resolve ,reject]
  }  