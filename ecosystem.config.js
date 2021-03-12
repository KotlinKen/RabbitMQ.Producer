module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  }],

  deploy : {
    prod : {
      key : "/Users/hotekim/.ssh/thunder.hk.pem",
      user : 'ubuntu',
      host : ['18.166.215.3'],
      ref  : 'origin/master',
      repo : 'https://github.com/KotlinKen/RabbitMQ.Producer.git',
      path : '/home/ubuntu/emoji.producer/',
      'pre-deploy-local': '',
      // 'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js',
      'pre-setup': ''
    },
    dev : {
      key : "/Users/hotekim/.ssh/thunder.hk.pem",
      user : 'ubuntu',
      host : ['18.166.215.3'],
      ref  : 'origin/master',
      repo : 'https://github.com/KotlinKen/RabbitMQ.Producer.git',
      path : '/home/ubuntu/emoji.producer/',
      'pre-deploy-local': '',
      // 'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'post-deploy' : 'echo done',
      'pre-setup': ''
    }
  },
  
};
