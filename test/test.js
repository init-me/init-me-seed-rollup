const seed = require('../index');
const path = require('path');
const fs = require('fs');
it('usage test', () => {
  expect(seed.name).not.toEqual('');
  expect(seed.seeds.length > 0).toEqual(true);
  seed.seeds.forEach((item) => {
    expect(item.name).not.toEqual('');
    const iPath = path.join(__dirname, '../', item.path);
    expect(fs.existsSync(iPath)).toEqual(true);
    if (item.rename) {
      expect(typeof item.rename).toEqual('object');
      Object.keys(item.rename).forEach((key) => {
        const renamePath = path.join(iPath, key);
        expect(fs.existsSync(renamePath)).toEqual(true);
      });
    }
  });
});