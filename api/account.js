import { getAccount, json } from './_utils';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, { error: 'Method not allowed' }, 405);
  }
  try {
    const account = await getAccount();
    json(res, account);
  } catch (e) {
    json(res, { error: e.message }, 500);
  }
}
