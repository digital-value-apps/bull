"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BullModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const bull_metadata_accessor_1 = require("./bull-metadata.accessor");
const bull_explorer_1 = require("./bull.explorer");
const bull_providers_1 = require("./bull.providers");
let BullModule = BullModule_1 = class BullModule {
    static registerQueue(...options) {
        const queueProviders = bull_providers_1.createQueueProviders([].concat(options));
        const queueOptionProviders = bull_providers_1.createQueueOptionProviders([].concat(options));
        return {
            module: BullModule_1,
            imports: [BullModule_1.forRoot()],
            providers: [...queueOptionProviders, ...queueProviders],
            exports: queueProviders,
        };
    }
    static registerQueueAsync(...options) {
        const optionsArr = [].concat(options);
        const queueProviders = bull_providers_1.createQueueProviders(optionsArr);
        const queueOptionProviders = bull_providers_1.createAsyncQueueOptionsProviders(optionsArr);
        const imports = this.getUniqImports(optionsArr);
        return {
            global: true,
            imports: imports.concat(BullModule_1.forRoot()),
            module: BullModule_1,
            providers: [...queueOptionProviders, ...queueProviders],
            exports: queueProviders,
        };
    }
    static forRoot() {
        return {
            global: true,
            module: BullModule_1,
            imports: [core_1.DiscoveryModule],
            providers: [
                bull_explorer_1.BullExplorer,
                bull_metadata_accessor_1.BullMetadataAccessor,
                { provide: common_1.Logger, useValue: new common_1.Logger('BullModule') },
            ],
        };
    }
    static getUniqImports(options) {
        return (options
            .map(option => option.imports)
            .reduce((acc, i) => acc.concat(i || []), [])
            .filter((v, i, a) => a.indexOf(v) === i) || []);
    }
};
BullModule = BullModule_1 = __decorate([
    common_1.Module({})
], BullModule);
exports.BullModule = BullModule;
