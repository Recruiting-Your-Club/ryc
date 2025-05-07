export const handleNewRange = (node: Node, selection: Selection) => {
    const newRange = document.createRange();
    newRange.setStart(node, 1);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
};

export const getTextNodes = (range: Range): Text[] => {
    // 범위 내 TEXT 노드 탐색
    const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) =>
            range.intersectsNode(node) && node.textContent?.trim()
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT,
    });

    const textNodes: Text[] = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
        // commonAncestor 내부 노드 순회
        textNodes.push(currentNode as Text);
        currentNode = walker.nextNode();
    }

    return textNodes;
};
