import { ActionRuntime } from "@wbce/orbits-core";

new ActionRuntime({
    workers: {
        quantity: 1,
    },
    db: {
        noDatabase: true
    }
})