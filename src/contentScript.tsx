import { getTargetBoardPoint } from './util';

interface GetPointMessage {
  doneStatusName: string;
}

chrome.runtime.onMessage.addListener(function (
  msg: GetPointMessage,
  _,
  sendResponse,
) {
  const donePoint = getTargetBoardPoint(msg.doneStatusName);
  sendResponse(donePoint);
});
