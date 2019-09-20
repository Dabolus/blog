import * as functions from 'firebase-functions';
import { resolve } from 'path';
import { exec as execCb } from 'child_process';
import { tmpdir } from 'os';
import git from 'nodegit';

const tmp = tmpdir();

const exec = (command: string) =>
  new Promise((resolve, reject) =>
    execCb(command, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      resolve(stdout);
    }),
  );

export const updateBlog = functions.firestore
  .document('posts/{slug}')
  .onWrite(async () => {
    await git.Clone.clone(
      'https://github.com/Dabolus/blog.git',
      resolve(tmp, 'blog'),
    );
    process.chdir(resolve(tmp, 'blog'));
    await exec('yarn build');
  });
