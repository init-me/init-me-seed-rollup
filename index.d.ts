interface IRename {
  [key: string]: any; // 原名字: 新名字
}

interface ISeedItem {
  name: string;     // seed 包名称
  path: string;     // seed 包路径
  rename: IRename;  // seed 内重命名映射表
}

interface ISeed {
  name: string;      // 插件名字
  seeds: ISeedItem[] // seed 包 array
}
declare const seed: ISeed;

export = seed;