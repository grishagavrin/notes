// Swapping two variables let or var, not const
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);

// String to number or number to string
a = "123";
console.log(+a);
b = "";
console.log(+b);
a = 123;
console.log(a + "");
