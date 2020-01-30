import { DynamicModule } from '@nestjs/common';
import { BullModuleAsyncOptions, BullModuleOptions } from './interfaces/bull-module-options.interface';
export declare class BullModule {
    static registerQueue(...options: BullModuleOptions[]): DynamicModule;
    static registerQueueAsync(...options: BullModuleAsyncOptions[]): DynamicModule;
    private static forRoot;
    private static getUniqImports;
}
