"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = (array) => {
    const source = [...array];
    const target = [];
    while (source.length) {
        target.push(source.splice(Math.floor(Math.random() * source.length), 1)[0]);
    }
    return target;
};
