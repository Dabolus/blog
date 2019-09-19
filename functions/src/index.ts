import * as functions from 'firebase-functions';

export const updateBlog = functions.firestore
  .document('posts/{slug}')
  .onWrite((change, context) => {
    // Do the magic
  });
