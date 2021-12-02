export const getBoards = () => {
  const boards = document.querySelectorAll('[data-board-column]');
  const boardIds = Array.from(boards).map((board) => board.id);
  return boardIds.map((boardId) => document.getElementById(boardId));
};

export const getPointNodes = (board: HTMLElement) => {
  return board.querySelectorAll('[data-test-id="custom-label-Point"]');
};

export const getPoints = (pointNodes: NodeListOf<Element>) => {
  return Array.from(pointNodes)
    .map((p) => Number(p.textContent))
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
};

export const getTargetBoardPoint = (boardName: string) => {
  let targetPoint = 0;
  getBoards().forEach((board) => {
    if (board && board.dataset.boardColumn === boardName) {
      const targetPointNodes = getPointNodes(board);
      if (targetPointNodes.length !== 0) {
        targetPoint = getPoints(targetPointNodes);
      }
    }
  });
  return targetPoint;
};

// ref: https://gist.github.com/fr-ser/ded7690b245223094cd876069456ed6c
export const debounce = <F extends Function>(func: F, waitMs: number): F => {
  let timeoutID: number;
  return <F>(<any>function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    const context = this;
    timeoutID = window.setTimeout(function () {
      func.apply(context, args);
    }, waitMs);
  });
};
