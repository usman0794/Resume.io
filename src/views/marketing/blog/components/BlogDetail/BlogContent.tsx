import React from 'react';

interface Props { html: string; }

const BlogContent: React.FC<Props> = ({ html }) => (
  <div
    className="prose prose-slate max-w-none"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default BlogContent;
