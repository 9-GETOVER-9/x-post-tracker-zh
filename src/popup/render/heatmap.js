import { HEATMAP_BUCKETS } from '../../shared/constants.js';

export function renderHeatmap(container, summary) {
  const { today, posts, replies, reposts, likes, total } = summary;
  container.innerHTML = '';
  container.classList.add('single-day');

  const card = document.createElement('div');
  card.className = 'today-card';

  const label = document.createElement('span');
  label.className = 'today-card-label';
  label.textContent = today.toLocaleDateString('zh-CN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  card.appendChild(label);

  const cell = document.createElement('div');
  cell.className = 'day-cell';
  const bucket = HEATMAP_BUCKETS.find(item => total <= item.max) || HEATMAP_BUCKETS[HEATMAP_BUCKETS.length - 1];
  cell.style.backgroundColor = bucket.color;
  cell.dataset.count = String(total);
  const tooltipDate = today.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  cell.title = `${tooltipDate}\n发帖 ${posts} 条，回复 ${replies} 条`;
  card.appendChild(cell);

  const counts = document.createElement('div');
  counts.className = 'today-card-counts';

  const totalLabel = document.createElement('span');
  totalLabel.className = 'today-total';
  totalLabel.textContent = `发帖与回复共 ${total} 条`;
  counts.appendChild(totalLabel);

  const primary = document.createElement('span');
  primary.className = 'today-breakdown';
  primary.textContent = `发帖 ${posts} · 回复 ${replies}`;
  counts.appendChild(primary);

  const secondary = document.createElement('span');
  secondary.className = 'today-breakdown today-breakdown-secondary';
  secondary.textContent = `转发 ${reposts} · 点赞 ${likes}`;
  counts.appendChild(secondary);

  card.appendChild(counts);
  container.appendChild(card);
}
