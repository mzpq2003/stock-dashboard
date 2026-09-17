import { saveAccount, json, DEFAULT_ACCOUNT } from './_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }
  try {
    const account = { ...DEFAULT_ACCOUNT, holdings: {} };
    await saveAccount(account);
    json(res, { success: true, message: '账户已重置', account });
  } catch (e) {
    json(res, { success: false, message: '重置失败: ' + e.message });
  }
}
