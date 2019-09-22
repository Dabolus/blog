import React, { FunctionComponent } from 'react';
import Pencil from '../icons/pencil';
import Update from '../icons/Update';
import Timer from '../icons/Timer';

export interface PostInfoProps {
  createdAt: string;
  updatedAt: string;
  readingTime: number;
}

const PostInfo: FunctionComponent<PostInfoProps> = ({
  createdAt,
  updatedAt,
  readingTime,
}) => (
  <>
    <Pencil />
    &nbsp;{createdAt}
    {createdAt === updatedAt ? null : (
      <>
        &nbsp;·&nbsp;
        <Update />
        &nbsp;{updatedAt}
      </>
    )}
    &nbsp;·&nbsp;
    <Timer />
    &nbsp;≈{readingTime}min
  </>
);

export default PostInfo;
