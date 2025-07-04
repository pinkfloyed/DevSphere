const DEV_TO_API = 'https://dev.to/api/articles?per_page=10';
const REDDIT_PROGRAMMING_API = 'https://www.reddit.com/r/programming/top.json?limit=10';
const TECHCRUNCH_RSS = 'http://feeds.feedburner.com/TechCrunch/';
const STACKOVERFLOW_BLOG_RSS = 'https://stackoverflow.blog/feed/';

export const fetchDevToArticles = async () => {
  const res = await fetch(DEV_TO_API);
  if (!res.ok) throw new Error('Failed to fetch Dev.to articles');
  const data = await res.json();
  return data.map(item => ({
    id: item.id,
    title: item.title,
    user: { name: item.user.name },
    url: item.url,
    published_at: item.published_at,
  }));
};

export const fetchHackerNewsArticles = async () => {
  const topRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  if (!topRes.ok) throw new Error('Failed to fetch HackerNews top stories');
  const topIds = await topRes.json();
  const top10 = topIds.slice(0, 10);

  const storyPromises = top10.map(async (id) => {
    const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    if (!storyRes.ok) return null;
    const story = await storyRes.json();
    return {
      id: story.id,
      title: story.title,
      user: { name: story.by },
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      published_at: story.time ? new Date(story.time * 1000).toISOString() : null,
    };
  });

  const stories = await Promise.all(storyPromises);
  return stories.filter(Boolean);
};

export const fetchMediumArticles = async () => {
  const mediumRssFeed = 'https://medium.com/feed/tag/technology';
  const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumRssFeed)}`;

  const res = await fetch(rss2jsonUrl);
  if (!res.ok) throw new Error('Failed to fetch Medium articles');
  const data = await res.json();

  return data.items.map((item) => ({
    id: item.guid,
    title: item.title,
    user: { name: item.author },
    url: item.link,
    published_at: item.pubDate,
  }));
};

export const fetchRedditArticles = async () => {
  const res = await fetch(REDDIT_PROGRAMMING_API);
  if (!res.ok) throw new Error('Failed to fetch Reddit articles');
  const data = await res.json();
  return data.data.children.map((post) => ({
    id: post.data.id,
    title: post.data.title,
    user: { name: post.data.author },
    url: `https://reddit.com${post.data.permalink}`,
    published_at: new Date(post.data.created_utc * 1000).toISOString(),
  }));
};

export const fetchTechCrunchArticles = async () => {
  const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(TECHCRUNCH_RSS)}`;
  const res = await fetch(rss2jsonUrl);
  if (!res.ok) throw new Error('Failed to fetch TechCrunch articles');
  const data = await res.json();

  return data.items.map((item) => ({
    id: item.guid,
    title: item.title,
    user: { name: item.author || 'TechCrunch' },
    url: item.link,
    published_at: item.pubDate,
  }));
};

export const fetchStackOverflowBlogArticles = async () => {
  const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(STACKOVERFLOW_BLOG_RSS)}`;
  const res = await fetch(rss2jsonUrl);
  if (!res.ok) throw new Error('Failed to fetch Stack Overflow Blog articles');
  const data = await res.json();

  return data.items.map((item) => ({
    id: item.guid,
    title: item.title,
    user: { name: item.author || 'Stack Overflow Blog' },
    url: item.link,
    published_at: item.pubDate,
  }));
};
