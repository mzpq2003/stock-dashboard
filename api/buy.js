import { getAccount, saveAccount, json, NAME_MAP } from './_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }
  try {
    const { stocks = [] } = req.body;
    let account = await getAccount();

    if (account.cash < 100) {
      return json(res, { success: false, message: '可用资金不足' });
    }
    if (stocks.length === 0) {
      return json(res, { success: false, message: '没有可买入的股票' });
    }

    const investPer = account.cash / stocks.length;
    let totalCost = 0;

    for (const s of stocks) {
      const sid = String(s.id);
      const price = parseFloat(s.price) || 0;
      if (price <= 0) continue;
      const qty = investPer / price;

      if (account.holdings[sid]) {
        const old = account.holdings[sid];
        const totalCostOld = old.qty * old.buyPrice;
        const newQty = old.qty + qty;
        const newCost = totalCostOld + investPer;
        account.holdings[sid] = { ...old, qty: newQty, buyPrice: newCost / newQty };
      } else {
        const name1Code = String(s.name1);
        const name2Code = String(s.name2);
        account.holdings[sid] = {
          name1: s.name1,
          name2: s.name2,
          name1_cn: NAME_MAP[name1Code] || name1Code,
          name2_cn: NAME_MAP[name2Code] || name2Code,
          qty,
          buyPrice: price
        };
      }
      totalCost += investPer;
    }

    account.cash -= totalCost;
    await saveAccount(account);
    json(res, {
      success: true,
      message: `已买入 ${stocks.length} 只股票，每只投入 ¥${investPer.toFixed(2)}`,
      account
    });
  } catch (e) {
    json(res, { success: false, message: '买入失败: ' + e.message });
  }
}
