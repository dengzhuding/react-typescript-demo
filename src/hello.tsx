interface Options {
  str: string;
  [propName: string]: any;
}

function printHello(ops: Options) {
  console.log(ops.str);
}
