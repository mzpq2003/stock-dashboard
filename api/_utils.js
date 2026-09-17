import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.kv_KV_REST_API_URL || process.env.KV_REST_API_URL,
  token: process.env.kv_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN,
});

export const NAME_MAP = {
  '1000':'幻想屋','1001':'四季','1002':'绿野','1003':'星露','1004':'彩虹',
  '1005':'晨露','1006':'丰收','1007':'星辰','1008':'梦幻','1009':'花舞',
  '1010':'幻影','1011':'夏威','1012':'月光','1013':'宝石','1014':'星光',
  '1015':'慧光','1016':'星耀','1017':'晨星','1018':'弧光','1019':'冬星',
  '1020':'风铃','1021':'极光','1022':'暮光','1023':'星尘','1024':'水晶',
  '1025':'琥珀','1026':'翡翠','1027':'银河','1028':'迷雾','1029':'钻石',
  '1030':'黎明','1031':'暮色','1032':'珊瑚',
  '2001':'炼金','2002':'银行','2003':'汽车','2004':'农园','2005':'酒馆',
  '2006':'工坊','2007':'商会','2008':'畜牧','2009':'典当','2010':'公会',
  '2011':'市场','2012':'仓储','2013':'食品','2014':'餐馆','2015':'旅店',
  '2016':'渔业','2017':'医院','2018':'码头','2019':'航运','2020':'矿场',
  '2021':'机车','2022':'保险','2023':'电力','2024':'物流','2025':'地产',
  '2026':'娱乐','2027':'咖啡','2028':'烘焙','2029':'酿酒','2030':'广告',
  '2031':'安保','2032':'机械',
  '10000':'幻想屋','10001':'未知'
};

export const DEFAULT_ACCOUNT = { cash: 100000, holdings: {} };

export async function getAccount() {
  const data = await kv.get('account');
  return data || DEFAULT_ACCOUNT;
}

export async function saveAccount(account) {
  await kv.set('account', account);
}

export function json(res, data, status = 200) {
  res.status(status).json(data);
}
