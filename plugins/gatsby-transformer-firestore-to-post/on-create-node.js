const _ = require('lodash');

module.exports = async (
  {
    node,
    actions: { createNode, createParentChildLink },
    createNodeId,
    reporter,
    createContentDigest,
  },
  pluginOptions,
) => {
  // We only care about posts.
  if (node.internal.type !== 'Post') {
    return {};
  }

  const data = node;

  try {
    let markdownNode = {
      ...data,
      slug: node.id,
      id: createNodeId(`${node.id} >>> MarkdownRemark`),
      children: [],
      parent: node.id,
      internal: {
        content: data.content,
        type: 'MarkdownRemark',
      },
      rawMarkdownBody: data.content,
    };

    markdownNode.internal.contentDigest = createContentDigest(markdownNode);

    createNode(markdownNode);
    createParentChildLink({ parent: node, child: markdownNode });

    return markdownNode;
  } catch (err) {
    reporter.panicOnBuild(
      `Error processing Markdown ${
        node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`
      }:\n
      ${err.message}`,
    );

    return {}; // eslint
  }
};
