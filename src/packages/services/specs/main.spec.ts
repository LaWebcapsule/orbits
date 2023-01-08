import jasmin from "jasmine";
import mongoose from "mongoose";
import { environment } from "../../environments/environment";

let j = new jasmin({
    spec_dir: '.',
    spec_files: [
        '*[sS]pec.js',
    ],
});

j.loadConfig({
    spec_dir: '.',
    spec_files: [
        'chemin.spec.ts',
    ],
    random : false,
    env : {
        random : false
    }
})


jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

j.execute();
