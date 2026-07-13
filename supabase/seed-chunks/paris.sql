INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('paris', '巴黎 (Paris)', '浪漫塞纳河畔的流动的盛宴', 'google', 48.8566, 2.3522)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('marais', 'paris', '玛黑区 (Le Marais - 3/4区)', '前卫画廊、精品店与中世纪石板路', '{"budget":4,"safety":8,"transit":9,"shopping":10,"nightlife":8,"quiet":7,"cafe":10}'::jsonb, '{"巴黎最时髦的区域，遍布先锋买手店与艺术画廊","保存有大量中世纪优雅建筑，街景极美","星期天大部分商店依然开门（巴黎少有）"}', '{"狭窄的历史街道容易拥堵","热门季节住宿一房难求且昂贵"}', 48.8584, 2.3621, '高档奢华 (¥¥¥¥)', '时尚达人、艺术爱好者、喜欢步行探索小巷的旅行者', '玛黑区跨越巴黎第3和第4区，是巴黎当之无愧的潮流中心。这里有浮士德式的古老庭院、各种独立香水店、小众时装店和著名的蓬皮杜艺术中心。这儿的街角遍布露天咖啡馆，下午点一杯 Café au lait 坐在路边静静观察行人，就是最具法式风情的 Chill 体验。')
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
VALUES ('montmartre', 'paris', '蒙马特 (Montmartre - 18区)', '圣心堂下的波希米亚艺术家高地', '{"budget":7,"safety":5,"transit":7,"shopping":8,"nightlife":8,"quiet":6,"cafe":9}'::jsonb, '{"浪漫文艺的至高点，可俯瞰巴黎全景","物价在巴黎相对亲民，充满小餐馆与面包房","有浓厚艺术气息与电影感（《天使爱美丽》取景地）"}', '{"山丘地形台阶极多，携带大件行李非常吃力","晚上圣心堂周边及红灯区（皮加勒）治安需要高度防范"}', 48.8867, 2.3431, '经济实惠 (¥¥)', '情侣、追求艺术浪漫、预算有限的年轻旅行者', '蒙马特位于巴黎北部山丘，曾是毕加索、梵高等艺术家生活的地方。这里有爬满常春藤的石砌小屋、双风车咖啡馆和街头画家聚集的特尔特广场。这里的节奏相比巴黎市中心更慢、更自由，有着别样的波希米亚式 Chill 氛围。')
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
VALUES ('latinquarter', 'paris', '拉丁区 (Latin Quarter - 5区)', '索邦大学旁的左岸学术与书香气', '{"budget":6,"safety":9,"transit":9,"shopping":7,"nightlife":7,"quiet":8,"cafe":8}'::jsonb, '{"极其安全的治安，治安情况在巴黎首屈一指","充满学术氛围，紧邻卢森堡公园和莎士比亚书店","交通极其便利，靠近塞纳河畔"}', '{"老旧建筑多，很多住宿无电梯且房间较小","缺乏大型现代购物商场"}', 48.8474, 2.3458, '中等 (¥¥¥)', '独自旅行者、学者书迷、注重安全和宁静的旅行者', '拉丁区自中世纪起就是巴黎的大学区。这里洋溢着年轻的学术气息和书香。这里的狭窄街道（如胡格波街）藏着许多历史悠久的独立电影院、古旧书店和舒适的学生咖啡馆。紧邻的卢森堡公园更是巴黎人最爱的晒太阳、看书和发呆的 Chill 圣地。')
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
VALUES ('stgermain', 'paris', '圣日耳曼德佩 (Saint-Germain-des-Prés - 6区)', '花神与双叟咖啡馆的萨特遗风', '{"budget":3,"safety":10,"transit":9,"shopping":9,"nightlife":6,"quiet":9,"cafe":10}'::jsonb, '{"巴黎最安全、最优雅尊贵的街区之一","拥有全巴黎最著名的传奇咖啡馆与高级时装店","艺术品商店与精品书店极多，法式优雅的天花板"}', '{"高昂的住宿价格，生活消费成本极高","酒店以精品复古小酒店为主，房间面积较小"}', 48.8538, 2.3333, '高档奢华 (¥¥¥¥)', '追求极致法式优雅、历史文化爱好者、高预算旅行者', '圣日耳曼区是二十世纪存在主义哲学和文学运动的摇篮。萨特、西蒙·波娃和毕加索曾是花神咖啡馆（Café de Flore）和双叟咖啡馆（Les Deux Magots）的常客。如今这里已成为顶级奢侈品、独立画廊与高级住宅的代名词。虽然昂贵，但在这里喝咖啡聊天、闲逛画廊是巴黎最经典、最具质感的 Chill 体验。')
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
VALUES ('canal', 'paris', '圣马丁运河区 (Canal Saint-Martin - 10/11区)', '塞纳河支流畔的波希米亚潮流慢生活', '{"budget":6,"safety":7,"transit":8,"shopping":8,"nightlife":8,"quiet":6,"cafe":10}'::jsonb, '{"运河两岸风光无限，是当地年轻一代野餐、小憩的潮流圣地","汇聚了大量新潮的手工面包房、独立咖啡馆与精酿酒吧","避开了传统旅行景区的喧嚣，极富生活感"}', '{"深夜运河两旁偶尔会有聚会噪音","部分旧式公寓隔音相对欠佳"}', 48.8718, 2.3683, '中等 (¥¥¥)', '文青情侣、寻找生活化法式 Chill 的年轻背包客', '圣马丁运河是一条充满活力的绿带。在这里，本地人比游客更多。下午坐在运河边的铁桥上，点一杯大热的 Du Pain et des Idées 面包与一杯手冲咖啡，看着过往小船，你能体会到巴黎极其现代、活力且毫不做作的慢节奏生活。')
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
VALUES ('champs', 'paris', '香榭丽舍/第8区 (Champs-Élysées)', '凯旋门畔的宏大皇家大道与奢侈名店', '{"budget":2,"safety":9,"transit":10,"shopping":10,"nightlife":6,"quiet":7,"cafe":7}'::jsonb, '{"紧邻凯旋门与香街，大道宏阔，安全系数极高","汇集了全球各大高端奢侈品牌旗舰店与米其林奢华法餐","多条主力地铁线贯穿，前往各核心地标无缝衔接"}', '{"住宿与日常物价高昂，缺少市井生活的烟火气","游客密度极大，白天大道略显喧闹"}', 48.8725, 2.3025, '至尊奢华 (¥¥¥¥¥)', '奢华游旅人、蜜月情侣、对出行效率与治安有极高要求的旅行者', '第8区是巴黎皇家风范的代表。这里街道宽广、治安严密，酒店大都拥有极高规格的服务保障（如经典的巴黎乔治五世四季酒店）。虽然少了左岸那般文艺的羊肠小巷，但清晨在豪华公寓窗前喝杯浓缩，看着金色的凯旋门日出，也是极具法式优雅感的体验。')
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
VALUES ('eiffel', 'paris', '铁塔/格勒内勒 (Eiffel Tower - 15区)', '开窗即见铁塔的静谧中产住宅区', '{"budget":4,"safety":9,"transit":8,"shopping":7,"nightlife":4,"quiet":9,"cafe":8}'::jsonb, '{"步行即可达战神广场，看巴黎铁塔夜间闪光秀最方便","巴黎高品质的中产住宅区，环境优雅，极其安静安全","有很多精致的法式小烘焙坊与社区咖啡店"}', '{"缺乏大型的夜生活设施与吵闹酒吧","住宿价格随着铁塔景观的优劣波动极大"}', 48.8583, 2.2945, '中等偏高 (¥¥¥)', '亲子出游、长辈同行、注重夜间绝对安静与安全的旅行者', '15区是一片极其迷人且高雅的法式中产生活区。这里远离了大多数旅游区的嘈杂与混乱，治安极佳，步行街上散发着法式社区特有的慵懒步伐。在这里住下，清晨买根刚出炉的法棍，走在铁塔下的塞纳河边晒晒太阳，是最舒服的体验。')
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