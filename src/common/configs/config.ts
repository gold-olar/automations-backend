import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3007,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Automations',
    description: 'Automation APIS',
    version: '1',
    path: 'docs/api',
  },
  firebase: {
    projectId: 'new-plasmo-auth',
  },
};

export default (): Config => config;
