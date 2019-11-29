const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const extOs = require('yyl-os');
const print = require('yyl-print');

const lang = {
  QUEATION_SELECT_TYPE: '请选择构建方式',
  TYPE_ERROR: 'env.type 不存在',
  INSTALL_START: '正在安装依赖',
  INSTALL_FINISHED: '安装依赖完成'
};

const SEED_PATH = path.join(__dirname, 'seeds');

const config = {
  hooks: {
    async beforeStart({ env }) {
      let iType = '';
      const types = fs.readdirSync(SEED_PATH).filter((iPath) => {
        if (/^\./.test(iPath)) {
          return false;
        }
        return true;
      });

      if (env && env.type) {
        if (types.indexOf(env.type) !== -1) {
          iType = env.type;
        } else {
          throw new Error(`${lang.TYPE_ERROR}: ${env.type}`);
        }
      } else if (types.length === 1) {
        iType = types[0];
      } else {
        const r = await inquirer.prompt([{
          type: 'list',
          name: 'type',
          message: `${lang.QUEATION_SELECT_TYPE}:`,
          default: types[0],
          choices: types
        }]);
        iType = r.type;
      }

      config.path = path.join(SEED_PATH, iType);
    },
    beforeCopy({ fileMap, targetPath }) {
      fileMap[path.join(config.path, 'gitignore')] = [
        path.join(targetPath, '.gitignore')
      ];

      fileMap[path.join(config.path, 'npmignore')] = [
        path.join(targetPath, '.npmignore')
      ];
      return Promise.resolve(fileMap);
    },
    async afterCopy({ targetPath }) {
      const installPath = [
        path.join(targetPath),
        path.join(targetPath, 'test/case/base')
      ]
      print.log.info(lang.INSTALL_START)

      await extOs.runCMD(`npm i`, installPath[0]);
      await extOs.runCMD(`npm i`, installPath[1]);
      await extOs.runSpawn(`npm init`, installPath[0]);

      print.log.success(lang.INSTALL_FINISHED)
    }
  },
  path: './seeds'
};
module.exports = config;