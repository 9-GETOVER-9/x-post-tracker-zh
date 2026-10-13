const ICON_URL = chrome.runtime.getURL('assets/icon128.png');
const NOTIFICATION_PREFIX = 'xPostTracker:goal:';
const LABELS = {
  posts: '发帖',
  replies: '回复',
};

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== 'xPostTracker:goalAchieved') {
    return;
  }

  const goal = message.goal === 'replies' ? 'replies' : 'posts';
  const achieved = Number.parseInt(message.achieved, 10) || 0;
  const title = `${LABELS[goal]}目标已达成`;
  const body = `今天已完成 ${achieved} 条${LABELS[goal]}，达到设定目标。`;
  const notificationId = `${NOTIFICATION_PREFIX}${goal}:${message.dateKey || ''}`;

  chrome.notifications.create(notificationId, {
    type: 'basic',
    iconUrl: ICON_URL,
    title,
    message: body,
    priority: 1,
  }, () => chrome.runtime.lastError);
});
