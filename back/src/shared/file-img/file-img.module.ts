import { Module } from '@nestjs/common';
import { FileImgService } from './file-img.service';

@Module({
    providers: [FileImgService],
    exports: [FileImgService],
})
export class FileImgModule { }
