/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'ikun',
        mongodb_password: '02151353',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'blog-dev'
      },
    };
  }

  return {
    env: {
      mongodb_username: 'ikun',
      mongodb_password: '02151353',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'blog'
    },
  };
}

