import { getBoards, getPoints, getPointNodes, debounce } from './util';

const updateDisplayPoint = () => {
  getBoards().forEach((board) => {
    if (board) {
      const pointNodes = getPointNodes(board);
      if (!pointNodes) {
        return;
      }

      const pointLabel = `${getPoints(pointNodes)}pt`;

      const pointLabelNode = board.querySelector(
        '.js-github-project-story-point',
      ) as HTMLSpanElement;

      if (pointLabelNode) {
        pointLabelNode.innerText = pointLabel;
      } else {
        const columnCounter = board.querySelector(
          '[data-test-id="column-counter"]',
        );
        if (columnCounter) {
          let tmpPointNode = columnCounter.cloneNode(false) as HTMLSpanElement;
          tmpPointNode.classList.add('js-github-project-story-point');
          tmpPointNode.innerText = pointLabel;
          columnCounter.insertAdjacentHTML('afterend', tmpPointNode.outerHTML);
        }
      }
    }
  });
};

const WAIT_MILL_SECONDS = 300;
const observer = new MutationObserver(
  debounce(updateDisplayPoint, WAIT_MILL_SECONDS),
);
const target = document.querySelector('[data-test-id="board-view"]');

if (!!target) {
  updateDisplayPoint();
  observer.observe(target, { attributes: true, subtree: true });
} else {
  throw new Error('[GitHub Project Story Points] board-view is missing');
}
