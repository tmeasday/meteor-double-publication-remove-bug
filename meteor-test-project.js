Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Meteor.subscribe('posts');
}

if (Meteor.isServer) {
  var publish = function(pub) {
    Posts.find().observeChanges({
      added: function(id, fields) {
        console.log('added document', id);
        pub.added('posts', id, fields);
      },
      removed: function(id) {
        console.log('removed document', id);
        pub.removed('posts', id);
      }
    });
  }
  
  Meteor.publish('posts', function() {
    // publish twice
    publish(this);
    publish(this);
  });
  
  Meteor.methods({
    removePosts: function() {
      // Meteor.defer(function() {
        Posts.remove({});
      // });
    }
  })
}