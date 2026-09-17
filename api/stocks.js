import { json } from './_utils';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, { error: 'Method not allowed' }, 405);
  }
  try {
    const resp = await fetch('https://wgsh.hxwgame.cn/dish1/GetStockInfo', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://wgsh.hxwgame.cn/'
      }
    });
    const text = await resp.text();
    let raw;
    try {
      raw = JSON.parse(text);
    } catch (e) {
      return json(res, { success: false, error: 'JSON解析失败: ' + e.message, raw: text.substring(0, 200) });
    }
    const stocks = raw?.data?.list || [];
    json(res, { success: true, data: stocks, time: new Date().toISOString(), count: stocks.length });
  } catch (e) {
    json(res, { success: false, error: '请求失败: ' + e.message });
  }
}
