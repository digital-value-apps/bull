import { Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Queue } from 'bull';
import { BullMetadataAccessor } from './bull-metadata.accessor';
import { BullQueueEventOptions } from './bull.types';
import { ProcessOptions } from './decorators';
export declare class BullExplorer implements OnModuleInit {
    private readonly moduleRef;
    private readonly discoveryService;
    private readonly metadataAccessor;
    private readonly metadataScanner;
    private readonly logger;
    constructor(moduleRef: ModuleRef, discoveryService: DiscoveryService, metadataAccessor: BullMetadataAccessor, metadataScanner: MetadataScanner, logger: Logger);
    onModuleInit(): void;
    explore(): void;
    getQueue(queueToken: string, queueName: string): Queue;
    handleProcessor(instance: object, key: string, queue: Queue, options?: ProcessOptions): void;
    handleListener(instance: object, key: string, queue: Queue, options: BullQueueEventOptions): void;
}
