INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('melbourne', '墨尔本 (Melbourne)', '全球咖啡之都，充满街头艺术与慢节奏巷弄的文化之城', 'google', -37.8136, 144.9631)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('fitzroy', 'melbourne', '菲茨罗伊 (Fitzroy)', '波希米亚文艺与街头艺术的发源地', '{"budget":7,"safety":8,"transit":8,"shopping":9,"nightlife":9,"quiet":7,"cafe":10}'::jsonb, '{"全墨尔本最棒的独立咖啡店与素食餐厅聚集区","街头壁画艺术与中古/设计师精品店随处可见","夜间有许多文艺复古的黑胶爵士酒吧与Livehouse"}', '{"周末夜晚部分酒吧周边略显嘈杂","主要是精品公寓或民宿，大型连锁高端酒店较少"}', -37.801, 144.979, '中等 (¥¥¥)', '咖啡发烧友、古着与黑胶迷、追求先锋文化体验的旅行者', '菲茨罗伊是墨尔本的潮流文化心脏。Brunswick 街与 Gertrude 街纵横交错，沿街开满了世界顶尖级的单源豆手冲咖啡馆（如 Industry Beans）。这里的建筑外墙被五彩斑斓的街头涂鸦覆盖，氛围随性且极具创造力，是全世界最 Chill 的街区之一。')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('cbd', 'melbourne', '市中心 (Melbourne CBD)', '涂鸦巷弄与世界级咖啡排挡的交错', '{"budget":6,"safety":9,"transit":10,"shopping":10,"nightlife":8,"quiet":4,"cafe":9}'::jsonb, '{"市中心有完全免费的电车区 (Free Tram Zone)，交通极便利","著名的霍西尔巷 (Hosier Lane) 和迪格雷夫街 (Degraves St) 咖啡巷近在咫尺","生活极其方便，维多利亚女王市场近旁"}', '{"高楼林立，车水马龙，缺乏宁静居住感","住宿房间普遍较小且偏向公寓式酒店"}', -37.8136, 144.9631, '中等偏高 (¥¥¥)', '初次到访、追求高效出行与购物便利的旅行者', '墨尔本 CBD 绝非冷冰冰的金融区，而是充满了著名的“巷弄文化 (Laneway Culture)”。无数的地下室、小窄巷里挤满了水准极高的独立咖啡馆（如 Brother Baba Budan）。免费的环城电车让你无需交通卡即可玩遍主要景点，非常适合快节奏的旅行者。')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('stkilda', 'melbourne', '圣基尔达 (St Kilda)', '海滩、棕榈树与日落小企鹅的度假港湾', '{"budget":5,"safety":7,"transit":7,"shopping":7,"nightlife":8,"quiet":7,"cafe":8}'::jsonb, '{"紧邻圣基尔达海滩，日落时能在防波堤看野生神仙小企鹅归巢","拥有历史悠久的月亮公园游乐场 (Luna Park)","海滨大道风景优美，休闲度假感极强"}', '{"距离 CBD 较远，需乘有轨电车，且不包含在免费区内","Fitzroy St 部分区域深夜治安较杂乱"}', -37.868, 144.9739, '中等 (¥¥¥)', '热爱大海、家庭出游、追求海滨度假风的旅人', '圣基尔达是墨尔本的游乐港湾。这里海风徐徐，两旁种满了高耸的棕榈树。在阿克兰街 (Acland St) 可以品尝欧式糕点，下午在海滩晒太阳，傍晚喝一杯精酿啤酒等待小企鹅归巢，是一种慵懒闲适的海滨 Chill 方式。')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('carlton', 'melbourne', '卡尔顿 (Carlton)', '小意大利的意式浓缩与皇家展览馆绿荫', '{"budget":7,"safety":9,"transit":9,"shopping":8,"nightlife":6,"quiet":9,"cafe":10}'::jsonb, '{"紧邻皇家展览馆与卡尔顿花园，绿化极佳，漫步体验极佳","著名的“小意大利”莱贡街 (Lygon St) 发源地，意式餐饮绝佳","步行即可到墨尔本大学，治安极好，学术氛围浓"}', '{"高档酒店偏少，主要是学生公寓和经典维多利亚式联排别墅改造的民宿","夜生活以餐饮和意式甜品店为主，缺乏喧闹夜店"}', -37.8, 144.9667, '中等 (¥¥¥)', '美食家、偏爱静谧大公园、喜爱意式咖啡文化的旅行者', '卡尔顿是墨尔本咖啡文化的奠基之地。意大利移民在莱贡街引入了墨尔本第一台意式浓缩咖啡机。这里有著名的 Pidapipó 冰淇淋店与 Brunetti 咖啡馆。午后在皇家展览馆的喷泉旁看鸽子、晒太阳，喝一杯纯正的 Macchiato，是卡尔顿独有的慢节奏浪漫。')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('southyarra', 'melbourne', '南雅拉 (South Yarra)', '优雅奢华的雅皮士住宅区与时尚Chapel街', '{"budget":4,"safety":9,"transit":9,"shopping":10,"nightlife":7,"quiet":8,"cafe":9}'::jsonb, '{"Chapel 街拥有顶级买手店、百货大楼与时尚餐饮","靠近雅拉河畔绿带与皇家植物园，自然空气怡人","高星级精品公寓酒店众多，住宿环境极具质感"}', '{"生活成本高昂，餐饮及车租较贵","周末晚间时尚酒吧周边车辆较为拥堵"}', -37.8398, 144.9953, '高档奢华 (¥¥¥¥)', '高品质旅行者、购物达人、追求优雅住宿环境的商务客', '南雅拉是墨尔本著名的富人区。这里绿树成荫，古老的维多利亚式排屋与现代化的轻奢公寓交相辉映。著名的 Chapel St 集中了全城水准极高的潮流服饰、高端咖啡厅与创意 Brunch，靠近雅拉河的清晨慢跑体验在墨尔本堪称一绝。')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('brunswick', 'melbourne', '布伦瑞克 (Brunswick)', '极简工业风、现场摇滚与移民风味食街', '{"budget":8,"safety":8,"transit":8,"shopping":8,"nightlife":9,"quiet":7,"cafe":10}'::jsonb, '{"拥有众多由旧仓库改建而成的超大独立咖啡馆与烘焙厂","悉尼路 (Sydney Road) 汇聚了地道地中海、中东与意式平民小吃","拥有墨尔本最活跃的青年摇滚现场与小众服装零售店"}', '{"部分老旧工业厂房改造区，市容缺乏皇家贵气","距离南部海滩景区较远"}', -37.7684, 144.9608, '经济实惠 (¥¥)', '摇滚乐迷、咖啡烘焙深度发烧友、寻求性价比平民街区体验的旅行者', '布伦瑞克是墨尔本北部典型的多元文化与创意社区。这里是澳洲烘焙名店（如 Code Black Coffee）的大本营。仓库改建的挑高咖啡馆里随处可见带着电脑写作或画画的年轻人。这里有最接地气的生活物价、随性的街头涂鸦以及丰富且性价比极高的现场 Live演出。')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('richmond', 'melbourne', '里士满 (Richmond)', '厂区奥特莱斯与香浓越南风情的融合', '{"budget":7,"safety":8,"transit":9,"shopping":8,"nightlife":8,"quiet":6,"cafe":9}'::jsonb, '{"拥有著名的越南美食街（维多利亚街）与最地道的越南粉 (Pho)","奥特莱斯折扣店密布，靠近墨尔本板球场 (MCG)，观赛首选","交通网格四通八达，火车地铁数站即可直达 CBD"}', '{"维多利亚街部分路段白天较嘈杂市井","高星豪华传统大酒店偏少，多为新潮设计民宿"}', -37.8202, 144.9996, '中等 (¥¥¥)', '亚洲美食家、运动观赛爱好者、喜欢工厂店淘折扣的旅行者', '里士满是一个充满了反差萌的街区。这里既有大型的运动和折扣工厂店，又有北京/亚洲旅人最爱的“墨尔本小西贡”。这里的咖啡馆（如 Top Paddock）是墨尔本创意 Brunch 界的神话。里士满保留了工人阶级街区的质朴与如今雅皮互联网企业的交融风情。')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;