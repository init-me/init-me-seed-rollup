# init-me-seed-rollup
用于 插件 `init-me` 的 seed 包
## API
```js
const config: IConfig = require('init-me-seed-rollup');
```

```typescript
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
```