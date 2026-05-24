import type { Request } from 'express';
import type { UploadedFile } from 'express-fileupload';

export interface FileRequest extends Request {
    files: {
        img: UploadedFile;
    };
}
