module.exports = {
  name: 'rollup',
  seeds: [{
    name: 'typescript',
    path: './seeds/typescript/',
    rename: {
      'gitignore': '.gitignore',
      'npmignore': '.npmignore'
    }
  }]
};