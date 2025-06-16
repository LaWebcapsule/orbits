#!/usr/bin/env npx tsx
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// do not start any runtime
process.env['ORBITS_AUTOSTART'] = 'false';

import(path.resolve(__dirname + '/../src/index.js'));
