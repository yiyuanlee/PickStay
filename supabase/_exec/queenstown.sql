INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('queenstown', '皇后镇 (Queenstown)', '南阿尔卑斯山脚下的极限运动与湖光山色之都', 'google', -45.0312, 168.6626)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('queenstown-central', 'queenstown', '皇后镇中心 (Queenstown Central)', '瓦卡蒂普湖畔的冒险枢纽与美食夜生活中心', '{"budget":4,"safety":9,"transit":9,"shopping":9,"nightlife":9,"quiet":4,"cafe":8}'::jsonb, '{"步行即可抵达湖畔步道、餐厅与冒险项目预订中心","Orbus 巴士与水上 taxi 接驳便利，信息咨询点密集","Fergburger 等网红美食与精酿酒吧林立，夜生活活跃"}', '{"旅游旺季人潮拥挤，核心街区停车与住宿价格偏高","部分酒吧街深夜较喧闹，湖畔高端酒店一房难求"}', -45.0312, 168.6626, '中等偏高 (¥¥¥)', '初次到访、喜欢湖畔漫步与丰富餐饮夜生活的旅行者', '皇后镇中心是南岛最炙手可热的旅行枢纽。瓦卡蒂普湖（Lake Wakatipu）沿岸步道串联起精品酒店、冒险运动预订柜台与各式西餐厅。清晨在湖边慢跑，傍晚找一家 lakeside 餐厅看日落，是体验皇后镇都市 Chill 感的经典方式。')
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
VALUES ('frankton', 'queenstown', '弗兰顿 (Frankton)', '机场旁的高性价比实用落脚点', '{"budget":7,"safety":9,"transit":8,"shopping":6,"nightlife":4,"quiet":8,"cafe":6}'::jsonb, '{"紧邻皇后镇机场，抵达与离境极其便利","Five Mile 购物中心与超市配套完善，生活成本相对中心更低","Orbus 巴士 10 分钟直达镇中心，适合自驾中转"}', '{"缺乏皇后镇标志性的湖畔核心景观","夜生活与精品餐饮选择远少于市中心"}', -45.0214, 168.7392, '中等 (¥¥)', '注重机场交通效率、自驾中转或预算有限的旅行者', '弗兰顿是皇后镇的门户区，许多自驾旅客选择在此取还车或短暂停留。Five Mile 商圈提供超市、连锁餐饮与基础购物，性价比优于镇中心。虽然少了些「明信片风景」，但作为实用型住宿基地非常高效。')
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
VALUES ('arrowtown', 'queenstown', '箭镇 (Arrowtown)', '淘金时代遗风与秋意枫林的慢节奏古镇', '{"budget":6,"safety":10,"transit":5,"shopping":7,"nightlife":3,"quiet":10,"cafe":9}'::jsonb, '{"保留完整的维多利亚式淘金小镇风貌，治安极佳","四月金秋枫叶季是全新西兰最上镜的赏叶圣地之一","独立咖啡馆、画廊与精品民宿密度高，文艺 Chill 氛围浓厚"}', '{"距皇后镇中心约 20 分钟车程，依赖自驾或巴士","餐饮与夜生活以日间为主，晚间店铺较早打烊"}', -44.9386, 168.8108, '中等偏高 (¥¥¥)', '情侣、摄影爱好者、追求慢节奏古镇生活与高品质咖啡文化的旅行者', '箭镇是皇后镇周边最迷人的历史卫星城。巴克利街（Buckingham Street）两旁林立着百年石砌建筑、手作面包房与精品酒庄。这里远离镇中心的喧嚣，却能在 20 分钟内回到冒险运动现场，是「白天古镇发呆、傍晚回皇后镇嗨」的理想组合。')
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
VALUES ('fernhill', 'queenstown', '芬山 (Fernhill)', '俯瞰瓦卡蒂普湖的山坡静谧住宅区', '{"budget":5,"safety":10,"transit":6,"shopping":5,"nightlife":3,"quiet":9,"cafe":7}'::jsonb, '{"多数住宿可俯瞰瓦卡蒂普湖与 Remarkables 山脉全景","远离酒吧街喧嚣，夜间极其安静，安全系数极高","Skyline Gondola 缆车与 luge 赛道近在咫尺"}', '{"地势较陡，部分民宿需驾车或步行上下坡","步行至镇中心需 15–20 分钟，公交班次相对有限"}', -45.0186, 168.6486, '中等偏高 (¥¥¥)', '家庭出行、追求湖景与安静环境的旅行者', '芬山是皇后镇本地人最爱的 hillside 居住区之一。这里的民宿与公寓普遍拥有开阔湖景，Skyline 缆车从山脚直达 Bob''s Peak 观景台。适合不想住在闹市区、又希望随时俯瞰皇后镇全景的旅人。')
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
VALUES ('kelvin-heights', 'queenstown', '开尔文高地 (Kelvin Heights)', '半岛尖端上的高端湖景度假秘境', '{"budget":3,"safety":10,"transit":5,"shopping":5,"nightlife":3,"quiet":10,"cafe":7}'::jsonb, '{"瓦卡蒂普湖半岛尖端，360° 湖山景观极为震撼","Kelvin Heights 高尔夫球场与高端度假公寓林立","环境优雅私密，适合蜜月与高品质家庭度假"}', '{"住宿与餐饮价格高昂，平价选择极少","距镇中心需驾车或巴士，不适合无车且频繁外出的旅客"}', -45.0458, 168.6786, '高档奢华 (¥¥¥¥)', '蜜月情侣、高预算旅行者、追求极致湖景与私密度假感的家庭', '开尔文高地是皇后镇最顶级的 lakeside 半岛。这里远离游客人潮，却拥有全区域最开阔的瓦卡蒂普湖 vista。许多高端度假公寓与精品 B&B 坐拥私人湖岸通道，清晨在半岛步道慢跑、傍晚看雪山镀金，是皇后镇最 Chill 的奢华体验。')
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
VALUES ('glenorchy', 'queenstown', '格莱诺基 (Glenorchy)', '魔戒取景地与中土世界般的原始湖光', '{"budget":6,"safety":9,"transit":3,"shopping":3,"nightlife":1,"quiet":10,"cafe":6}'::jsonb, '{"《指环王》与《纳尼亚》系列经典取景地，原始自然震撼","达特河（Dart River）与 Routeburn Track 徒步起点","远离旅游团，体验最纯粹的南阿尔卑斯山湖风光"}', '{"距皇后镇约 45 分钟车程，无公共交通，必须自驾","餐饮、购物与夜生活配套极为有限，以小型咖啡馆和旅社为主"}', -44.8506, 168.3889, '中等 (¥¥)', '徒步爱好者、摄影发烧友、追求原始自然与《魔戒》朝圣体验的旅行者', '格莱诺基被《孤独星球》誉为「全球最上镜公路终点之一」。从皇后镇沿瓦卡蒂普湖北端驱车北上，两侧雪山与翡翠色湖水交织成中土世界般的画卷。这里适合作为 1–2 晚的深度自然停留点，或当日往返的摄影与徒步圣地。')
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
VALUES ('arthur-point', 'queenstown', '亚瑟角/肖托弗 (Arthur''s Point)', '峡谷激流与蹦极冒险的极限运动大本营', '{"budget":6,"safety":8,"transit":7,"shopping":5,"nightlife":6,"quiet":6,"cafe":6}'::jsonb, '{"Shotover Jet 喷射快艇、峡谷秋千与蹦极项目集中区","距镇中心仅 5 分钟车程，却保留峡谷自然氛围","多家冒险主题 lodge 与青年旅舍，年轻旅行者聚集"}', '{"峡谷地带部分路段夜间照明不足，需注意行车安全","非冒险爱好者可能觉得周边略显「太刺激」而缺乏文艺气息"}', -45.0136, 168.6364, '中等 (¥¥)', '极限运动爱好者、年轻背包客、追求刺激与独特住宿体验的冒险型旅行者', '亚瑟角位于肖托弗河（Shotover River）峡谷入口，是皇后镇冒险运动的地理心脏。从这里出发可体验世界闻名的 Shotover Jet 与 Nevis 高空蹦极。住宿以冒险 lodge 与性价比民宿为主，适合把「玩极限运动」当作旅行主题的旅人。')
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