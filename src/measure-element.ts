import type {DOMElement} from './dom';

export default (node: DOMElement): number => {
	return node.yogaNode?.getComputedWidth() || 0;
};
