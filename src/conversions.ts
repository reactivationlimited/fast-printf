const builtIn = 'BCESbcdefghiosux'
let letters = builtIn;

// probably Array using char code indices is faster
export const conversions = new Map();

const makeTokenRule = (letters: string) => new RegExp(`(?:%(?<flag>([+0-]|-\\+))?(?<width>\\d+)?(?<position>\\d+\\$)?(?<precision>\\.\\d+)?(?<conversion>[%${letters}]))|(\\\\%)`,'g');

export const customConversion = (letter: string, handler: Function) => {
  if(!/^[A-Z]$/i.test(letter)) {
    throw new Error('fast-printf: conversion is not a letter');
  }
  // maybe allow this so debug string can stay compatible
  if(letters.indexOf(letter) >= 0) {
    throw new Error('fast-printf: conversion already exists');
  }
  if(!(handler instanceof Function)) {
    throw new Error('fast-printf: conversion handler must be a function')
  }
  letters += letter;
  conversions.set(letter,handler);
  TokenRule = makeTokenRule(letters);
}

export let TokenRule = makeTokenRule(builtIn);
