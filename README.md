# init-me-seed-rollup
用于 插件 `init-me` 的 seed 包
## API
```js
const seed: ISeed = require('init-me-seed-rollup');
```

```typescript
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
```