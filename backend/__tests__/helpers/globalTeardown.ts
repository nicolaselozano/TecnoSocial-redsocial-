import { down } from 'docker-compose';
import isCI from 'is-ci';

export default async () => {
  if (isCI) {
    await down({
      log: true,
    });
  }
};
