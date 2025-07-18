import * as k8s from '@kubernetes/client-node';
import { utils } from '@orbi-ts/services';

export class KubeApi {
    config: k8s.KubeConfig;
    client: k8s.AppsV1Api;
    coreApi: k8s.CoreV1Api;
    extensionApi: k8s.ApiextensionsV1Api;
    objectApi: k8s.KubernetesObjectApi;
    customObjectApi: k8s.CustomObjectsApi;
    batchApi: k8s.BatchV1Api;

    constructor(opts?: {
        from: {
            file?: string;
            cluster?: boolean;
        };
    }) {
        this.config = new k8s.KubeConfig();
        if (opts?.from?.file) {
            this.config.loadFromFile(opts.from.file);
        } else if (opts?.from?.cluster) {
            this.config.loadFromCluster();
        } else {
            this.config.loadFromDefault();
        }
        this.client = this.config.makeApiClient(k8s.AppsV1Api);
        this.coreApi = this.config.makeApiClient(k8s.CoreV1Api);
        this.extensionApi = this.config.makeApiClient(k8s.ApiextensionsV1Api);
        this.objectApi = this.config.makeApiClient(k8s.KubernetesObjectApi);
        this.customObjectApi = this.config.makeApiClient(k8s.CustomObjectsApi);
        this.batchApi = this.config.makeApiClient(k8s.BatchV1Api);
    }

    /**
     * Delete given kubernetes object
     *
     * @param object object to delete
     * @returns promise
     */
    deleteObject(object: k8s.KubernetesObject) {
        return this.objectApi.delete(object);
    }

    async getSecret(
        name: string,
        opts = {
            ns: 'default',
        }
    ) {
        return this.coreApi
            .readNamespacedSecret({ name, namespace: opts.ns })
            .then((secret) => {
                const result: { [key: string]: string } = {};
                for (const key in secret.data) {
                    result[key] = utils.base64Decode(secret.data[key]);
                }
                return result;
            });
    }

    async checkSecretExists(
        name: string,
        opts = {
            ns: 'default',
        }
    ) {
        try {
            await this.getSecret(name, opts);
        } catch {
            return false;
        }
        return true;
    }

    async createSecret(
        mainKey: string,
        value: { [key: string]: string | undefined },
        opts = {
            ns: 'default',
        }
    ) {
        return this.coreApi.createNamespacedSecret({
            namespace: opts.ns,
            body: {
                stringData: this.generateSecretValue(value),
                metadata: {
                    name: mainKey,
                },
            },
        });
    }

    async updateSecret(
        mainKey: string,
        value: { [key: string]: string | undefined },
        opts = {
            ns: 'default',
        }
    ) {
        return this.coreApi.replaceNamespacedSecret({
            name: mainKey,
            namespace: opts.ns,
            body: {
                stringData: this.generateSecretValue(value),
                metadata: {
                    name: mainKey,
                },
            },
        });
    }

    async setSecret(
        mainKey: string,
        value: { [key: string]: string | undefined },
        opts = {
            ns: 'default',
        }
    ) {
        if (await this.checkSecretExists(mainKey, opts))
            return this.updateSecret(mainKey, value, opts);

        return this.createSecret(mainKey, value, opts);
    }

    async deleteSecret(
        mainKey: string,
        opts = {
            ns: 'default',
        }
    ) {
        return this.coreApi.deleteNamespacedSecret({
            name: mainKey,
            namespace: opts.ns,
        });
    }

    generateSecretString() {
        const chars =
            '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const secretLength = 24;
        let result = '';
        for (let i = 0; i < secretLength; i++) {
            result = result + chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    generateSecretValue(value: { [key: string]: string | undefined }) {
        const secretValue: { [key: string]: string } = {};
        for (const key in value) {
            secretValue[key] = value[key] ?? this.generateSecretString();
        }
        return secretValue;
    }
}
