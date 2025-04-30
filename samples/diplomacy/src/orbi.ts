import { ActionApp } from "@wbce/orbits-core";

new ActionApp({
    workers: {
        quantity: 1,
    },
    db: {
        noDatabase: true
    }
})