import { createLogger } from '../frameworks/Logger';

/**
 * @description Handle creating a new log.
 */
export function LogUsecase(body: any): void {
  const logger = createLogger();
  logger.log(body);
}
