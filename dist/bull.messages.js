"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_QUEUE_FOUND = (name) => name
    ? `No Queue was found with the given name (${name}). Check your configuration.`
    : 'No Queue was found. Check your configuration.';
