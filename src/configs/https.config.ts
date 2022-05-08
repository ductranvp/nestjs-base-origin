import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('dist/src/configs/cert/localhost.decrypted.key'),
  cert: fs.readFileSync('dist/src/configs/cert/localhost.crt'),
};

export default httpsOptions;
