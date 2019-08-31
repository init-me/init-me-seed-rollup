interface IConfig {
  path: string;
  hooks: {
    beforeStart(op: { env?: IEnv}): Promise<any>;
    beforeCopy(op: { fileMap: IFileMap, targetPath: string}): Promise<IFileMap>;
  };
}
interface IEnv {
  type?: string
}
interface IFileMap {
  [orgPath: string]: string[]
}


declare const config: IConfig;

export = config;