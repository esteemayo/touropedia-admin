export function init() {}

export function log(error) {
  console.error(error);
}

const logger = {
  init,
  log,
};

export default logger;
