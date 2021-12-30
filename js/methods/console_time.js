//  #!/bin/sh node --allow-natives-syntax console_time.js
"use strict";

const LOOP_COUNT = 10000;
// Optimization status of func
// 0 0 0 0 0 1 0 0 0 0 0 1
// ┬ ┬ ┬ ┬ ┬ ┬ ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ │ │ │ │ │ │ └─╸ is function
// │ │ │ │ │ │ │ │ │ │ └───╸ is never optimized
// │ │ │ │ │ │ │ │ │ └─────╸ is always optimized
// │ │ │ │ │ │ │ │ └───────╸ is maybe deoptimized
// │ │ │ │ │ │ │ └─────────╸ is optimized
// │ │ │ │ │ │ └───────────╸ is optimized by TurboFan
// │ │ │ │ │ └─────────────╸ is interpreted
// │ │ │ │ └───────────────╸ is marked for optimization
// │ │ │ └─────────────────╸ is marked for concurrent optimization
// │ │ └───────────────────╸ is optimizing concurrently
// │ └─────────────────────╸ is executing
// └───────────────────────╸ topmost frame is turbo fanned

const OPT_BITS = [
  /*  1 */ "function",
  /*  2 */ "never",
  /*  4 */ "always",
  /*  8 */ "maybe",
  /* 16 */ "opt",
  /* 32 */ "turbofan",
  /* 64 */ "interp",
];

const getOptimization = (f) => %GetOptimizationStatus(f);

const opt = (f) => {
  const optStatus = getOptimization(f);
  const results = [];
  OPT_BITS.forEach((name, n) => {
    if (n === 0) return;
    if (Math.pow(2, n) & optStatus) results.push(name);
  });
  return results.length ? results.join(", ") : "no preopt";
};

const fn = () => {
  const a = [];
  for (let i = 0; i < LOOP_COUNT; i++) {
    a.push(Array(i).join("A").length);
  }
  return a;
};

// Optimization status before callings
console.log();
console.log(`Func status: ${opt(fn)}`);

// console.time
console.log();
console.time("experiment");
const res1 = fn();
console.log("res1.length", res1.length);
console.timeEnd("experiment");

// Date()
console.log();
const begin2 = new Date().getTime();
const res2 = fn();
const end2 = new Date().getTime();
const diff2 = end2 - begin2;
console.dir({ length: res2.length, diff: diff2 });

// NodeJS <= 10v
console.log();
const begin3 = process.hrtime();
const res3 = fn();
const end3 = process.hrtime(begin3);
const diff3 = end3[0] * 1e9 + end3[1];
const sec3 = diff3 / 1e9;
console.dir({ length: res3.length, msec: diff3, sec: sec3 });

// NodeJS > 10v
console.log();
const begin4 = process.hrtime.bigint();
const res4 = fn();
const end4 = process.hrtime.bigint();
const diff4 = end4 - begin4;
console.dir({ length: res4.length, msec: diff4 });

// Optimization status after callings
console.log();
console.log(`Func status: ${opt(fn)}`);
console.log();
