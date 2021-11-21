Object.onPropertySet = function onPropertySet(obj, prop, ...callback_or_once){
  let callback, once;
  for(let arg of callback_or_once){
      switch(typeof arg){
      case "function": callback = arg; break;
      case "boolean": once = arg; break;
      }
  }


  let inner_value = obj[prop];
  let p = new Promise(resolve => Object.defineProperty(obj, prop, {
      configurable: true,
      // enumerable: true,
      get(){ return inner_value; },
      set(v){
          inner_value = v;
          if(once){
              Object.defineProperty(obj, prop, {
                  configurable: true,
                  // enumerable: true,
                  value: v,
                  writable: true,
              });
          }
          (callback || resolve)(v);
      }
  }));
  if(!callback) return p;
};

const userStore = {
  user: null
}

export default userStore