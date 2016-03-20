const jade = require('jade');
const path = require('path');

module.exports = {
  id: 'disqus',
  name: 'Disqus',
  settings: [
    {
      id: 'disqusid',
      name: 'Disqus Id',
      type: 'text'
    },
    {
      id: 'include',
      name: 'Include Templates',
      type: 'selectmultiple',
      optionsSource: 'templates',
      defaultSelected: 'all'
    }
  ],
  render: function(name, post, settings) {
    const ignore = ['_404'];

    if (ignore.indexOf(post.template) === -1 && (settings.include||[]).indexOf(post.template) > -1) {
      if (name === 'afterContent') {
        return jade.renderFile(path.resolve(__dirname, 'template.jade'), {
          disqusid: settings.disqusid,
          post: post
        });
      }
    }
    return null;
  }
};
