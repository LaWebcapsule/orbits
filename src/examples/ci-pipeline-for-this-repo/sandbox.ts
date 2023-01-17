const deepCopy = (src : any, dest : any)=>{
  //!! this copy has to be free of prototype pollution.
  //that why we use recursive assign
  Object.assign(dest, src);
  for(const key in dest){
      if(dest[key] && typeof dest[key] === 'object'){
        if(Array.isArray(dest[key])){
          dest[key] = []
        }
        else{
          dest[key] = {}
        }
        //dest[key] = new src[key].constructor();//doesn't work if the constructor expects parameters.
        deepCopy(src[key], dest[key])
      }
  }
}

const z = {};
const x ={ x : {y : [1, 2, null, "a"] }} 
deepCopy(x , z);
console.log("zzzzzzzzzzzzzzzzzzzzzzzzz")
console.log(z);
console.log((z as any).x.y[0]);
(z as any).x.y[0] = "aa"
console.log((x as any))
console.log(z);