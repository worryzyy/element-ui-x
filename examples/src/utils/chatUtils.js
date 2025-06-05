// 兄弟消息处理函数

const UUID_NIL = '00000000-0000-0000-0000-000000000000';

/**
 * 从聊天列表构建聊天项目树
 * @param {Array} allMessages - 聊天列表，从最旧到最新排序
 * @returns {Array} 聊天项目树
 */
export function buildChatItemTree(allMessages) {
  const map = {};
  const rootNodes = [];
  const childrenCount = {};

  let lastAppendedLegacyAnswer = null;

  for (let i = 0; i < allMessages.length; i += 2) {
    const question = allMessages[i];
    const answer = allMessages[i + 1];

    if (!question || !answer) continue;
    console.log(question);
    const isLegacy = question.parentMessageId === UUID_NIL;
    const parentMessageId = isLegacy
      ? (lastAppendedLegacyAnswer && lastAppendedLegacyAnswer.id) || ''
      : question.parentMessageId || '';

    // 处理问题
    childrenCount[parentMessageId] = (childrenCount[parentMessageId] || 0) + 1;
    const questionNode = {
      ...question,
      children: [],
    };
    map[question.id] = questionNode;

    // 处理回答
    childrenCount[question.id] = 1;
    const answerNode = {
      ...answer,
      children: [],
      siblingIndex: isLegacy ? 0 : childrenCount[parentMessageId] - 1,
    };
    map[answer.id] = answerNode;

    // 连接问题和回答
    questionNode.children.push(answerNode);

    // 添加到父节点或根节点
    if (isLegacy) {
      if (!lastAppendedLegacyAnswer) {
        rootNodes.push(questionNode);
      } else {
        lastAppendedLegacyAnswer.children.push(questionNode);
      }
      lastAppendedLegacyAnswer = answerNode;
    } else {
      if (
        !parentMessageId ||
        !allMessages.some(item => item.id === parentMessageId) // 父消息可能还未获取，此时将问题添加到根节点
      ) {
        rootNodes.push(questionNode);
      } else {
        if (map[parentMessageId]) {
          map[parentMessageId].children.push(questionNode);
        }
      }
    }
  }

  return rootNodes;
}

/**
 * 获取线程消息
 * @param {Array} tree - 聊天树
 * @param {string} targetMessageId - 目标消息ID
 * @returns {Array} 线程消息数组
 */
export function getThreadMessages(tree, targetMessageId) {
  let ret = [];
  let targetNode = null;

  // 查找到目标消息的路径
  const stack = tree
    .slice()
    .reverse()
    .map(rootNode => ({
      node: rootNode,
      path: [rootNode],
    }));

  while (stack.length > 0) {
    const { node, path } = stack.pop();

    if (
      node.id === targetMessageId ||
      (!targetMessageId && (!node.children || !node.children.length) && !stack.length) // 如果没有提供targetMessageId，使用树中的最后一条消息作为目标
    ) {
      targetNode = node;
      ret = path.map((item, index) => {
        if (!item.isAnswer) {
          return item;
        }

        const parentAnswer = path[index - 2];
        const siblingCount = !parentAnswer ? tree.length : parentAnswer.children.length;
        const prevSibling = !parentAnswer
          ? (tree[item.siblingIndex - 1] &&
              tree[item.siblingIndex - 1].children &&
              tree[item.siblingIndex - 1].children[0] &&
              tree[item.siblingIndex - 1].children[0].id) ||
            null
          : (parentAnswer.children[item.siblingIndex - 1] &&
              parentAnswer.children[item.siblingIndex - 1].children &&
              parentAnswer.children[item.siblingIndex - 1].children[0] &&
              parentAnswer.children[item.siblingIndex - 1].children[0].id) ||
            null;
        const nextSibling = !parentAnswer
          ? (tree[item.siblingIndex + 1] &&
              tree[item.siblingIndex + 1].children &&
              tree[item.siblingIndex + 1].children[0] &&
              tree[item.siblingIndex + 1].children[0].id) ||
            null
          : (parentAnswer.children[item.siblingIndex + 1] &&
              parentAnswer.children[item.siblingIndex + 1].children &&
              parentAnswer.children[item.siblingIndex + 1].children[0] &&
              parentAnswer.children[item.siblingIndex + 1].children[0].id) ||
            null;

        return {
          ...item,
          siblingCount,
          prevSibling,
          nextSibling,
        };
      });
      break;
    }

    if (node.children && node.children.length > 0) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({
          node: node.children[i],
          path: [...path, node.children[i]],
        });
      }
    }
  }

  // 将所有后代消息添加到路径中
  if (targetNode) {
    const stack = [targetNode];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node !== targetNode) {
        ret.push(node);
      }

      if (node.children && node.children.length > 0) {
        const lastChild = node.children[node.children.length - 1];

        if (!lastChild.isAnswer) {
          stack.push(lastChild);
          continue;
        }

        const parentAnswer = ret[ret.length - 2];
        const siblingCount =
          (parentAnswer && parentAnswer.children && parentAnswer.children.length) || 0;
        const prevSibling =
          (parentAnswer &&
            parentAnswer.children &&
            parentAnswer.children[parentAnswer.children.length - 2] &&
            parentAnswer.children[parentAnswer.children.length - 2].children &&
            parentAnswer.children[parentAnswer.children.length - 2].children[0] &&
            parentAnswer.children[parentAnswer.children.length - 2].children[0].id) ||
          null;

        stack.push({
          ...lastChild,
          siblingCount,
          prevSibling,
        });
      }
    }
  }

  return ret;
}
