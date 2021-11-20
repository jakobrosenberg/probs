import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const createDirname = meta => dirname(fileURLToPath(meta.url));
