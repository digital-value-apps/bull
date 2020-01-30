"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bull = require("bull");
const utils_1 = require("./utils");
const helpers_1 = require("./utils/helpers");
function buildQueue(option) {
    const queue = new Bull(option.name ? option.name : 'default', option);
    if (option.processors) {
        option.processors.forEach((processor) => {
            let args = [];
            if (helpers_1.isAdvancedProcessor(processor)) {
                args.push(processor.name, processor.concurrency, processor.callback);
            }
            else if (helpers_1.isAdvancedSeparateProcessor(processor)) {
                args.push(processor.name, processor.concurrency, processor.path);
            }
            else if (helpers_1.isSeparateProcessor(processor)) {
                args.push(processor);
            }
            else if (helpers_1.isProcessorCallback(processor)) {
                args.push(processor);
            }
            args = args.filter(arg => !!arg);
            queue.process.call(queue, ...args);
        });
    }
    queue.onApplicationShutdown = function () {
        return this.close();
    };
    return queue;
}
function createQueueOptionProviders(options) {
    return options.map(option => ({
        provide: utils_1.getQueueOptionsToken(option.name),
        useValue: option,
    }));
}
exports.createQueueOptionProviders = createQueueOptionProviders;
function createQueueProviders(options) {
    return options.map(option => ({
        provide: utils_1.getQueueToken(option.name),
        useFactory: (o) => buildQueue(o),
        inject: [utils_1.getQueueOptionsToken(option.name)],
    }));
}
exports.createQueueProviders = createQueueProviders;
function createAsyncQueueOptionsProviders(options) {
    return options.map(option => ({
        provide: utils_1.getQueueOptionsToken(option.name),
        useFactory: option.useFactory,
        useClass: option.useClass,
        useExisting: option.useExisting,
        inject: option.inject,
    }));
}
exports.createAsyncQueueOptionsProviders = createAsyncQueueOptionsProviders;
