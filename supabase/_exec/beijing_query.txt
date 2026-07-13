INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('beijing', '北京 (Beijing)', '帝都气象与胡同烟火的交融', 'amap', 39.9042, 116.4074)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('sanlitun', 'beijing', '三里屯/东直门 (Sanlitun)', '时尚潮流地标与使馆区绿荫', '{"budget":4,"safety":9,"transit":9,"shopping":10,"nightlife":10,"quiet":5,"cafe":9}'::jsonb, '{"北京最顶级的时尚商圈（太古里）与美食汇聚地","酒吧和夜生活冠绝京城","使馆区绿树成荫，步行体验好，交通便利"}', '{"酒店均价非常昂贵","周末晚间打车困难，交通拥堵"}', 39.9333, 116.4554, '高档奢华 (¥¥¥¥)', '喜欢购物、夜生活、时尚潮流的年轻旅行者', '三里屯是北京的潮流风向标，在这里能找到各种首店、旗舰店以及高水准的西餐和酒吧。而紧邻的使馆区又极为安静舒适，街道宽阔，非常适合骑行或散步。这里的咖啡馆密度极大，工作日下午也随处可见在室外喝咖啡聊天的人，极具都市 Chill 感。')
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
VALUES ('gulou', 'beijing', '鼓楼/什刹海 (Gulou)', '老北京胡同里的文艺新浪潮', '{"budget":6,"safety":9,"transit":8,"shopping":8,"nightlife":7,"quiet":6,"cafe":10}'::jsonb, '{"最地道的老北京胡同与四合院风貌","独立咖啡馆、Livehouse与手作小店密集","紧邻什刹海，风景如画，充满生活气息"}', '{"胡同内部分老旧住宿设施隔音一般","胡同内无法通车，需步行较长距离"}', 39.9412, 116.3972, '中等偏高 (¥¥¥)', '文艺青年、喜欢老北京胡同文化、爱骑行的旅行者', '鼓楼和五道营胡同周边是北京独立咖啡与青年文化的核心产地。红砖灰瓦的胡同里隐藏着各种手冲咖啡馆、黑胶唱片店和独立设计师工作室。清晨能听到鸽哨，下午可以在胡同里叹一杯冰美式，晚上去后海或 Livehouse 听歌，是把老北京传统与现代 Chill 结合得最完美的地区。')
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
VALUES ('guomao', 'beijing', '国贸/CBD (Guomao)', '摩天大楼林立的现代商务中心', '{"budget":3,"safety":10,"transit":10,"shopping":9,"nightlife":6,"quiet":7,"cafe":8}'::jsonb, '{"交通网络发达，双地铁枢纽，出行极其高效","高品质豪华酒店与高空景观公寓林立","治安极佳，服务业配套水准极高"}', '{"生活成本极高，餐饮普遍价格偏贵","夜晚写字楼区域缺乏生活烟火气"}', 39.9085, 116.4595, '高档奢华 (¥¥¥¥)', '商务出行、追求高品质标准化酒店服务与夜景的旅行者', '国贸是北京的金融中心，以标志性的“大裤衩”及其他摩天大楼为主景。这里集中了众多国际超豪华酒店（如国贸大酒店、新国贸饭店），地下商圈极其庞大。这里虽然商务感略重，但咖啡馆（特别是适合办公和开会的连锁及精品咖啡）随处可见，效率极高。')
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
VALUES ('qianmen', 'beijing', '前门/大栅栏 (Qianmen)', '百年老字号与复古创客街区', '{"budget":7,"safety":9,"transit":9,"shopping":7,"nightlife":4,"quiet":8,"cafe":8}'::jsonb, '{"步行即可到达天安门广场与故宫，看升旗首选","拥有很多新改建的四合院精品民宿和青年旅社","前门步行街和杨梅竹斜街极具老北京韵味"}', '{"属于热门景区，白天游人如织，老字号餐饮口味偏游客化","夜间街道相对冷清，酒吧娱乐较少"}', 39.8973, 116.3976, '经济实惠 (¥¥)', '初次来京看景点、家庭出游、追求步行看升旗的旅行者', '前门地区紧邻故宫 and 天安门，是北京的历史核心地带。这里经过近年的城市更新，诞生了像北京坊、杨梅竹斜街这样既保留了历史建筑，又引入了高品质独立书店（如PageOne）、精品咖啡馆与艺术展厅的复古 Chill 空间，在喧嚣的景区中闹中取静。')
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
VALUES ('wudaokou', 'beijing', '五道口 (Wudaokou)', '宇宙中心的青年活力与高性价比食街', '{"budget":8,"safety":9,"transit":8,"shopping":7,"nightlife":9,"quiet":5,"cafe":8}'::jsonb, '{"高校环绕，充满年轻活力，餐饮消费十分亲民","韩式烧烤、小吃及特色小酒馆选择极其丰富","有极多适合自习、办公的特色咖啡店"}', '{"早晚高峰地铁13号线极其拥挤","缺少高星级豪华酒店"}', 39.9928, 116.3378, '经济实惠 (¥¥)', '学生党、背包客、注重餐饮性价比和年轻氛围的旅行者', '五道口被称为“宇宙中心”，周围聚集了清华、北大、语言大学等数万名中外学子。这里的街头充满着青春蓬勃的朝气，拥有无数好吃不贵的异国美食和小吃。这里的咖啡馆大都带有宽敞的桌椅与安静的氛围，极具求知与休闲交融的 Chill 气息。')
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
VALUES ('wangfujing', 'beijing', '王府井/东单 (Wangfujing)', '底蕴深厚的经典商业步行街', '{"budget":4,"safety":10,"transit":10,"shopping":10,"nightlife":4,"quiet":8,"cafe":7}'::jsonb, '{"传统老牌商业街区，百货大楼林立，服务业配套顶级","临近故宫东华门，交通网络密布，极为安全","拥有很多隐秘于四合院或高端商场内的精致下午茶"}', '{"游客密集，物价较高，缺少本土小众文艺氛围","晚上商业街打烊较早，缺乏夜生活"}', 39.9113, 116.4116, '高档奢华 (¥¥¥¥)', '商务出行、合家欢出游、追求便利和安全的老牌品质旅行者', '王府井是北京最负盛名的商业名片。这里聚集了王府中环、北京apm等现代化高端商圈，同时保留着王府井天主堂等历史遗存。这里安全系数极高，酒店管理极为专业规范。虽然街区商业感重，但各种茶室与高档咖啡厅也为疲惫的旅人提供了一处优雅的避风港。')
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
VALUES ('wangjing', 'beijing', '望京 (Wangjing)', '前沿互联网高地与韩式文艺咖啡汇聚区', '{"budget":6,"safety":9,"transit":8,"shopping":8,"nightlife":7,"quiet":7,"cafe":9}'::jsonb, '{"汇集了全北京最地道的韩式美食、烤肉与餐吧","高设计感的精品独立咖啡馆遍地开花","街区现代，邻近798艺术区，极具潮流感"}', '{"距离市中心（故宫、天坛）距离较远，乘车时间较长","早晚高峰部分路段容易堵车"}', 39.9934, 116.4746, '中等 (¥¥¥)', '美食饕餮、互联网从业者、喜爱逛展与韩式文艺的年轻人', '望京是北京的新兴科技与创意中心。由于长期有大量韩裔及互联网精英居住，这里形成了极富特色的“咖啡与brunch文化”。这里的店面装潢极为现代和上镜，周末去隔壁的798艺术区看展，下午在望京喝一杯特色特调咖啡，体验极为Chill。')
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