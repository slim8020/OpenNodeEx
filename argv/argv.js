var args = process.argv;

console.log(args);
console.log('A');
if(args[2] === 'y'){
    console.log("save");
}
else{
    console.log("cancel");
}