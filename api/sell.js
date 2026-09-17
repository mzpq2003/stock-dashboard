import { getAccount, saveAccount, json } from './_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }
  try {
    const { stocks = [] } = req.body;
    const stockMap = {};
    stocks.forEach(s => { stockMap[String(s.id)] = s; });

    let account = await getAccount();
    let totalRevenue = 0;

    for (const [sid, hold] of Object.entries(account.holdings)) {
      if (stockMap[sid]) {
        const price = parseFloat(stockMap[sid].price) || 0;
        if (price > 0) {
          totalRevenue += hold.qty * price;
        }
      }
    }

    account.cash += totalRevenue;
    account.holdings = {};
    await saveAccount(account);
    json(res, {
      success: true,
      message: `已全部卖出，回款 ¥${totalRevenue.toFixed(2)}`,
      account
    });
  } catch (e) {
    json(res, { success: false, message: '卖出失败: ' + e.message });
  }
}
