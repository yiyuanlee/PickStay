-- Auto-generated from legacy/data.js
BEGIN;

INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('tokyo', '东京 (Tokyo)', '传统与现代交织的超级大都市', 'google', 35.6762, 139.6503)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('shinjuku', 'tokyo', '新宿 (Shinjuku)', '霓虹闪烁的繁华不夜城', '{"budget":5,"safety":7,"transit":10,"shopping":9,"nightlife":10,"quiet":3,"cafe":6}'::jsonb, '{"全东京最强的交通枢纽，去哪都方便","百货商场与药妆店极多，购物天堂","夜生活极其丰富（歌舞伎町、思出横丁）"}', '{"人流量巨大，街道环境相对嘈杂","深夜部分繁华街区治安需稍微留心"}', 35.6938, 139.7034, '中等偏高 (¥¥¥)', '初次到访、喜欢繁华便利和夜生活的旅行者', '新宿是东京最著名的商业与娱乐中心。这里有全世界最繁忙的火车站，无论是去箱根、富士山还是东京市内其他地方都极其便利。尽管节奏飞快、喧闹嘈杂，但这里能让你体验到最原汁原味的东京都市感。')
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
VALUES ('shibuya', 'tokyo', '涩谷 (Shibuya)', '潮流风向标与年轻人的游乐场', '{"budget":4,"safety":8,"transit":9,"shopping":10,"nightlife":9,"quiet":4,"cafe":9}'::jsonb, '{"引领全球潮流的购物街区","咖啡馆与时尚买手店极多","步行即可到表参道、原宿和代代木公园"}', '{"周末和节假日人潮拥拥挤","住宿成本普遍较高"}', 35.658, 139.7016, '高档奢华 (¥¥¥¥)', '潮流爱好者、年轻一族、咖啡馆打卡达人', '涩谷不仅有著名的十字路口，更是东京的时尚中心。从涩谷往北延伸至原宿和表参道，一路上遍布着各式精品咖啡店、潮牌店和设计师买手店。这里的氛围充满活力与艺术气息，非常适合喜欢探索小巷与淘货的旅行者。')
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
VALUES ('asakusa', 'tokyo', '浅草 (Asakusa)', '江户风情与传统文化的落脚点', '{"budget":8,"safety":9,"transit":7,"shopping":6,"nightlife":4,"quiet":8,"cafe":7}'::jsonb, '{"富有传统日式风情，邻近浅草寺与隅田川","性价比较高，平价民宿与设计青旅多","入夜后十分安静，安全系数极高"}', '{"距离新宿、涩谷等西部主要商圈较远","夜生活相对匮乏，店铺大多在晚上8-9点打烊"}', 35.7148, 139.7967, '经济实惠 (¥¥)', '家庭出行、预算有限的背包客、喜爱传统文化的旅行者', '浅草保留了东京少有的下町风情（江户时代的平民区氛围）。在这里你可以穿着和服漫步，远眺晴空塔。虽然交通没有新宿那么四通八达，但住宿性价比极高，环境古朴安详，是体验慢节奏东京的理想之地。')
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
VALUES ('nakameguro', 'tokyo', '中目黑 (Nakameguro)', '目黑川畔的精致文艺慢生活', '{"budget":4,"safety":10,"transit":8,"shopping":8,"nightlife":5,"quiet":9,"cafe":10}'::jsonb, '{"目黑川两旁风景如画（特别是樱花季）","东京独立咖啡店与小众设计师店的聚集地","极具高品质生活气息，静谧优雅"}', '{"樱花季时人山人海，交通受限","奢华精品酒店较少，多为高价民宿或精品公寓"}', 35.6443, 139.6991, '高档奢华 (¥¥¥¥)', '文艺青年、喜欢慢节奏散步、对居住品质要求高的旅行者', '中目黑是东京当地人最向往的居住区之一。目黑川穿城而过，两旁散落着全东京最棒的手冲咖啡馆（如星巴克臻选烘焙工坊）、面包房和中古家具店。它距离涩谷仅一站地铁，却完美隔绝了涩谷的喧嚣，展现出一种慵懒而精致的 Chill 氛围。')
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
VALUES ('shimokitazawa', 'tokyo', '下北泽 (Shimokitazawa)', '古着、音乐与青年次文化的圣地', '{"budget":7,"safety":9,"transit":8,"shopping":9,"nightlife":7,"quiet":7,"cafe":10}'::jsonb, '{"全东京最好的古着屋（Vintage）和黑胶唱片店聚集区","充满市井烟火气和随性的街头艺术","拥有极多高水准的独立咖啡馆与精酿酒吧"}', '{"街道狭窄如迷宫，带大件行李步行不便","大型豪华连锁酒店极少，以特色青年旅馆和民宿为主"}', 35.6616, 139.6666, '经济实惠 (¥¥)', '古着爱好者、小众音乐迷、寻找独特在地生活体验的年轻人', '下北泽（简称下北）是一个散发着叛逆与自由气息的街区。这里没有摩天大楼，只有密密麻麻的小巷，藏着数不清的古着店、小剧场、Livehouse 以及品质极高且价格亲民的咖啡馆。这里的节奏缓慢，处处流露出随性与舒适，是东京最迷人的 Chill 街区之一。')
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
VALUES ('ginza', 'tokyo', '银座 (Ginza)', '极尽奢华的高端商业百货区', '{"budget":2,"safety":10,"transit":10,"shopping":10,"nightlife":4,"quiet":8,"cafe":7}'::jsonb, '{"东京最高端的购物区，奢侈品牌与高级餐厅密布","多条地铁线交汇，治安极佳，街区整洁优雅","拥有许多高水平的老派咖啡沙龙"}', '{"物价高昂，平价住宿和餐饮极少","缺乏街头烟火气与小众潮流文化"}', 35.6719, 139.7639, '至尊奢华 (¥¥¥¥¥)', '高预算旅行者、喜爱奢华购物与精致生活的游客', '银座是东京最老牌的繁华街区。在这里你能体验到顶级的日式服务与一流的治安环境。尽管物价高昂，但这里汇集了东京最高品质的精品酒店、米其林餐厅以及极具历史沉淀的老牌咖啡馆（如 Cafe de L''Ambre），非常适合追求从容与高品质的旅行者。')
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
VALUES ('ueno', 'tokyo', '上野 (Ueno)', '公园绿荫与便利机场线枢纽', '{"budget":7,"safety":8,"transit":10,"shopping":8,"nightlife":5,"quiet":7,"cafe":6}'::jsonb, '{"京成电铁直达机场，多条新干线交汇，交通极优","紧邻上野恩赐公园与众多国立博物馆","阿美横町市场有大量平价药妆与街头美食"}', '{"上野火车站周边人流嘈杂，部分区域深夜流浪汉较多","夜生活选择相对保守，多为传统居酒屋"}', 35.7138, 139.7772, '经济实惠 (¥¥)', '注重机场交通效率、喜爱博物馆与自然绿荫的家庭或背包客', '上野是东京北部的门户枢纽。这里有宽阔的上野公园，樱花季时是赏樱圣地。交通极为便利，可以直接搭乘 Skyliner 快速直达机场，也可以轻松坐新干线前往日本东北地区。附近的阿美横町充满了市井杂货铺风情，住宿性价比极高。')
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
VALUES ('koenji', 'tokyo', '高圆寺 (Koenji)', '朋克乐手、平民酒馆与慵懒时光', '{"budget":8,"safety":9,"transit":7,"shopping":9,"nightlife":7,"quiet":8,"cafe":9}'::jsonb, '{"廉价美食与性价比极高的日式出租公寓聚集区","拥有独特的朋克、现场Live与独立旧货店文化","远离喧嚣，生活气息极其纯粹、缓慢"}', '{"距离筑地、银座等东部景点较远","大型商业街较少，酒店大多为小规模公寓民宿"}', 35.7053, 139.6498, '经济实惠 (¥¥)', '文艺青年、寻找小众在地生活感、爱淘便宜古着的旅行者', '高圆寺距离新宿仅几站车程，却散发着截然不同的悠闲氛围。这里是东京独立摇滚与平民文化的中心，充满着各种小型的中古商店、独立咖啡馆和夜晚热闹的串烧小摊。在这里生活有一种说不出的轻松与随性，非常适合想要‘假装生活在东京’的旅行者。')
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

INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('sydney', '悉尼 (Sydney)', '海港大桥与阳光海滩交织的南半球都会', 'google', -33.8688, 151.2093)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('surry-hills', 'sydney', '萨里山 (Surry Hills)', '精品咖啡与创意餐饮的文艺高地', '{"budget":5,"safety":9,"transit":9,"shopping":8,"nightlife":8,"quiet":7,"cafe":10}'::jsonb, '{"全悉尼密度最高的独立咖啡馆与早午餐餐厅聚集区","步行可达 CBD，Central 火车站近在咫尺","维多利亚式排屋街景优美，文艺画廊与买手店林立"}', '{"周末 Crown St 一带餐饮排队较长","精品民宿与公寓为主，大型连锁酒店较少"}', -33.8847, 151.2098, '中等偏高 (¥¥¥)', '咖啡控、美食爱好者、追求文艺慢节奏都市生活的旅行者', '萨里山是悉尼公认的 Brunch 与咖啡圣地。Crown Street 与 Bourke Street 两旁开满了水准极高的独立咖啡馆（如 Single O、Bourke Street Bakery）。这里保留了大量维多利亚时代排屋，街角涂鸦与精品买手店交织，距离 CBD 仅数站公交，是体验悉尼 Chill 都市感的最佳落脚点之一。')
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
VALUES ('sydney-cbd', 'sydney', '悉尼 CBD/岩石区 (Sydney CBD & The Rocks)', '歌剧院与环形码头旁的经典枢纽', '{"budget":4,"safety":9,"transit":10,"shopping":10,"nightlife":7,"quiet":4,"cafe":8}'::jsonb, '{"步行可达悉尼歌剧院、海港大桥与岩石区周末市集","火车、轻轨、渡轮枢纽密集，出行效率极高","高端酒店与精品公寓选择丰富，服务业配套顶级"}', '{"工作日通勤人流密集，部分路段较为喧闹","住宿价格偏高，平价选择相对有限"}', -33.8651, 151.2099, '高档奢华 (¥¥¥¥)', '初次到访、商务出行、追求地标步行距离与极致交通便利的旅行者', '悉尼 CBD 与历史悠久的岩石区（The Rocks）构成了城市最核心的旅行枢纽。清晨在 Circular Quay 看歌剧院日出，傍晚漫步岩石区 cobblestone 小巷，周末逛周末市集。虽然节奏偏快、人流较多，但这里是把悉尼经典地标一网打尽的最优基地。')
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
VALUES ('bondi', 'sydney', '邦迪海滩 (Bondi Beach)', '冲浪文化与海岸慢生活的代名词', '{"budget":5,"safety":8,"transit":7,"shopping":7,"nightlife":7,"quiet":6,"cafe":9}'::jsonb, '{"澳洲最具标志性的金色沙滩，冲浪与日光浴体验一流","Campbell Parade 沿岸咖啡馆与海鲜餐厅密度极高","邦迪至库吉（Coogee）六公里海岸步道风景绝美"}', '{"夏季周末人潮拥挤，停车位极为紧张","距 CBD 约 30–40 分钟公交，不在免费轻轨区内"}', -33.8915, 151.2767, '中等偏高 (¥¥¥)', '海滩爱好者、冲浪新手、追求阳光海岸度假感的旅行者', '邦迪海滩是悉尼乃至全澳洲的海滩文化图腾。Campbell Parade 上开满了面朝大海的咖啡馆与早午餐店，Icebergs 泳池悬于悬崖之上是经典打卡点。清晨在 Bondi to Bronte 步道慢跑、下午冲浪、傍晚看日落，是南半球最 Chill 的海滨生活方式。')
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
VALUES ('newtown', 'sydney', '纽镇 (Newtown)', '朋克涂鸦与多元亚文化的活力街区', '{"budget":7,"safety":8,"transit":9,"shopping":9,"nightlife":9,"quiet":5,"cafe":9}'::jsonb, '{"King Street 是全悉尼最长的独立零售与餐饮街之一","二手唱片店、古着屋、Livehouse 与 LGBTQ+ 友好酒吧云集","火车直达 Central，餐饮性价比远高于 CBD"}', '{"周末 King Street 人流与噪音较大","以特色民宿与青年旅舍为主，豪华酒店极少"}', -33.8989, 151.1794, '经济实惠 (¥¥)', '年轻背包客、亚文化爱好者、追求在地生活感与夜生活的旅行者', '纽镇是悉尼最具叛逆精神的 inner-west 街区。King Street 绵延数公里，两侧遍布越南粉店、精酿酒吧、独立唱片店与街头涂鸦。这里的氛围自由包容，Live 演出与二手淘货文化极为活跃，是体验「非明信片式悉尼」的最佳选择。')
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
VALUES ('manly', 'sydney', '曼利 (Manly)', '北岸渡轮港湾与双面海滩的度假秘境', '{"budget":5,"safety":9,"transit":7,"shopping":7,"nightlife":6,"quiet":8,"cafe":8}'::jsonb, '{"从 Circular Quay 乘渡轮 30 分钟直达，航程本身即是经典体验","Manly Beach 与 Shelly Beach 一动一静，浮潜条件佳","Corso 步行街餐饮与精品店齐全，度假感极强"}', '{"依赖渡轮或长途公交，深夜返程班次有限","旺季住宿价格随海景品质波动较大"}', -33.797, 151.288, '中等 (¥¥¥)', '家庭出游、情侣度假、追求「渡轮通勤+海滩生活」的慢节奏旅行者', '曼利位于悉尼北岸半岛尖端，是本地人周末逃离 CBD 的首选。从环形码头乘渡轮穿越海港，抵达 Manly Wharf 后步行即可到主海滩。Corso 步行街两旁咖啡馆与海鲜餐厅林立，Shelly Beach 适合浮潜与皮划艇，整体氛围比邦迪更悠闲私密。')
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
VALUES ('darlinghurst', 'sydney', '达令赫斯特 (Darlinghurst)', '牛津街夜生活与东端画廊的交汇', '{"budget":5,"safety":8,"transit":9,"shopping":8,"nightlife":10,"quiet":5,"cafe":8}'::jsonb, '{"Oxford Street 是悉尼 LGBTQ+ 文化与夜生活的核心地带","邻近 Potts Point 精品餐饮与东端画廊区","火车与公交接驳 CBD 与 Bondi Junction 极为便利"}', '{"周末深夜 Oxford Street 较为喧闹","部分老旧公寓隔音一般，停车困难"}', -33.8794, 151.2193, '中等偏高 (¥¥¥)', '夜生活爱好者、艺术迷、喜欢多元包容都市氛围的旅行者', '达令赫斯特与 Potts Point 构成悉尼东区的文化心脏。Oxford Street 上酒吧、俱乐部与深夜餐饮营业至凌晨，白天则可步行至东端画廊（Paddington Galleries）或维多利亚公园。这里兼具都市活力与艺术气质，是悉尼夜生活最 vibrant 的落脚点。')
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
VALUES ('paddington', 'sydney', '帕丁顿 (Paddington)', '维多利亚排屋与精品买手店的优雅街区', '{"budget":4,"safety":10,"transit":8,"shopping":10,"nightlife":5,"quiet":9,"cafe":9}'::jsonb, '{"Oxford Street Paddington 段汇聚顶级设计师买手店与画廊","五街（Five Ways）周边精品咖啡馆与早午餐水准极高","治安极佳，维多利亚式排屋街景是悉尼最美之一"}', '{"物价偏高，平价住宿选择有限","夜生活以精致小酒吧为主，缺乏大型夜店"}', -33.8841, 151.23, '高档奢华 (¥¥¥¥)', '时尚达人、艺术爱好者、追求高品质安静住宿的旅行者', '帕丁顿是悉尼最优雅的 inner-east 街区之一。Oxford Street 在此段从夜生活转向高端时装与画廊，Five Ways  roundabout 周围开满了精品 Brunch 与手冲咖啡馆。周末可逛 Paddington Markets，在绿树成荫的排屋街道散步，感受悉尼最具质感的慢生活。')
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

INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('guangzhou', '广州 (Guangzhou)', '千年商都的骑楼烟火与早茶文化', 'amap', 23.1291, 113.2644)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('tianhe', 'guangzhou', '天河/体育西 (Tianhe)', '地铁枢纽与摩登商圈交织的都市核心', '{"budget":5,"safety":9,"transit":10,"shopping":10,"nightlife":8,"quiet":5,"cafe":8}'::jsonb, '{"体育西路、珠江新城多条地铁线交汇，全城出行极便利","正佳广场、天河城、太古汇等顶级商圈步行可达","餐饮选择从平价粤菜到黑珍珠餐厅一应俱全"}', '{"早晚高峰地铁极其拥挤","周末商圈人流密集，部分路段较为喧闹"}', 23.1375, 113.33, '中等偏高 (¥¥¥)', '初次来穗、追求交通便利与购物便利的旅行者', '天河区是广州现代都市生活的缩影。体育西路站是地铁 1/3 号线枢纽，步行即可抵达天河路商圈。这里既有天河城的平民购物，也有太古汇的精品体验，周边早茶、粤菜、咖啡与茶饮密度极高，是兼顾效率与品质的万能落脚点。')
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
VALUES ('zhujiang-new-town', 'guangzhou', '珠江新城 (Zhujiang New Town)', '小蛮腰天际线下的高端商务新中轴', '{"budget":3,"safety":10,"transit":10,"shopping":9,"nightlife":7,"quiet":7,"cafe":8}'::jsonb, '{"广州塔、花城广场、广东省博物馆等地标步行可达","高星级酒店与 serviced apartment 林立，治安与服务水准顶级","APM 线与多条地铁交汇，前往白云机场与广州南站高效"}', '{"住宿与餐饮价格高昂","工作日商务感重，部分区域夜间缺乏市井烟火气"}', 23.1195, 113.3215, '高档奢华 (¥¥¥¥)', '商务出行、高预算旅行者、追求地标景观与现代酒店服务的游客', '珠江新城是广州新世纪的城市名片。花城广场正对广州塔（小蛮腰），广东省博物馆与广州图书馆环绕两侧。这里的酒店普遍拥有江景或塔景，咖啡馆与高端餐饮集中在 K11、IGC 等商场内，适合追求现代都市质感与极致安全的旅行者。')
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
VALUES ('beijing-road', 'guangzhou', '北京路/越秀 (Beijing Road)', '千年古道与骑楼商街的岭南记忆', '{"budget":7,"safety":9,"transit":10,"shopping":9,"nightlife":6,"quiet":6,"cafe":7}'::jsonb, '{"北京路步行街汇聚老字号与潮流首店，步行游览极为方便","地铁 1/2/6 号线交汇，前往沙面、陈家祠等景点便捷","周边平价住宿与连锁酒店选择丰富，性价比突出"}', '{"白天游客密集，部分老字号口味偏游客化","夜间以餐饮为主，酒吧娱乐相对保守"}', 23.1255, 113.2675, '经济实惠 (¥¥)', '初次来穗看景点、家庭出游、预算有限的旅行者', '北京路是广州历史最悠久的商业中轴，地下考古遗址展示千年古道原貌。步行街两旁骑楼林立，既有莲香楼、陶陶居等老字号，也有新兴潮流品牌。毗邻海珠广场与越秀公园，住宿性价比远高于天河，是体验老广州商业记忆的经典落脚点。')
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
VALUES ('shamian-liwan', 'guangzhou', '沙面/永庆坊 (Shamian & Yongqingfang)', '欧陆风情岛与西关骑楼的文艺慢游', '{"budget":6,"safety":9,"transit":7,"shopping":7,"nightlife":5,"quiet":9,"cafe":9}'::jsonb, '{"沙面岛保留完整殖民时期欧式建筑群，拍照极为出片","永庆坊、恩宁路粤剧艺术博物馆与老字号汇聚，西关风情浓郁","独立咖啡馆、文创小店与精品民宿密度高，文艺 Chill 氛围浓厚"}', '{"地铁需步行 10–15 分钟，部分区域公交为主","大型商场较少，购物以文创与小众为主"}', 23.108, 113.243, '中等 (¥¥¥)', '文艺青年、摄影爱好者、喜欢老建筑与慢节奏散步的旅行者', '沙面是珠江上的欧式小岛，榕树成荫的街道两旁是领事馆旧址改造的咖啡馆与餐厅。步行过桥即可到永庆坊——广州旧城微改造的标杆，粤剧博物馆、钟书阁与各种手作工坊藏身在骑楼深处。这里节奏缓慢，是广州最具 Chill 气质的文艺街区。')
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
VALUES ('dongshankou', 'guangzhou', '东山口 (Dongshankou)', '红砖洋楼与独立咖啡的新潮老钱区', '{"budget":5,"safety":9,"transit":8,"shopping":8,"nightlife":6,"quiet":8,"cafe":10}'::jsonb, '{"新河浦一带保留大量 1920 年代红砖洋楼与名人故居","广州独立咖啡馆密度最高的区域之一，Brunch 文化领先全城","地铁 1/6 号线东山口站，前往天河与越秀均便利"}', '{"部分洋楼改造民宿价格偏高","商业以小型精品为主，缺乏大型购物中心"}', 23.125, 113.297, '中等偏高 (¥¥¥)', '咖啡控、文艺青年、喜欢历史建筑与精品小店的旅行者', '东山口是广州「东山少爷」文化的发源地。培正路、恤孤院路两旁的红砖洋楼如今被改造成独立咖啡馆、买手店与艺术空间。周末在庙前西街散步，找一家手冲咖啡馆坐一下午，是广州年轻人最钟爱的 Chill 方式。这里既有历史沉淀，又不乏当代潮流感。')
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
VALUES ('chimelong', 'guangzhou', '长隆/番禺 (Chimelong)', '主题乐园与野生动物世界的亲子天堂', '{"budget":6,"safety":10,"transit":6,"shopping":6,"nightlife":3,"quiet":7,"cafe":5}'::jsonb, '{"长隆野生动物世界、欢乐世界、水上乐园一站式亲子体验","园区配套酒店可提前入园，家庭出行极为便利","番禺区餐饮性价比高于市中心，粤菜选择丰富"}', '{"距市中心约 30–40 分钟地铁，日常城市探索不便","周边以主题乐园为主，缺乏深度城市文化体验"}', 22.998, 113.329, '中等 (¥¥¥)', '亲子家庭、主题乐园爱好者、多日停留专注长隆的旅行者', '长隆旅游度假区是华南地区规模最大的主题乐园集群。番禺区地铁 3/7 号线可直达，园区酒店提供与动物共眠、优先入园等特色体验。若行程以亲子游乐为主，住在此区域可最大化游玩时间，避免每日长途通勤的疲惫。')
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
VALUES ('jiangnanxi', 'guangzhou', '江南西/海珠 (Jiangnanxi)', '本地食街与市井烟火的性价比之选', '{"budget":8,"safety":9,"transit":8,"shopping":7,"nightlife":7,"quiet":6,"cafe":7}'::jsonb, '{"江南新地、富力海珠城周边食肆林立，粤菜小馆性价比极高","地铁 2/8 号线江南西站，前往北京路、琶洲均方便","本地居民为主，游客较少，生活气息真实"}', '{"缺乏顶级地标与豪华酒店","部分老旧社区环境较为市井，拍照出片率一般"}', 23.097, 113.272, '经济实惠 (¥¥)', '美食爱好者、背包客、追求本地生活感与高性价比的旅行者', '江南西是广州海珠区的本地生活中心。这里不是典型旅游区，却藏着无数口碑粤菜小馆、牛杂档与糖水铺。江南新地商圈满足日常购物，地铁接驳便利。若想体验「广州人真正在吃什么、怎么生活」，江南西是比北京路更接地气的选择。')
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

INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('osaka', '大阪 (Osaka)', '关西食都的章鱼烧香气与下町人情', 'google', 34.6937, 135.5023)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;

INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('namba', 'osaka', '难波/道顿堀 (Namba & Dotonbori)', '霓虹食街与关西美食的绝对中心', '{"budget":7,"safety":7,"transit":10,"shopping":9,"nightlife":10,"quiet":3,"cafe":6}'::jsonb, '{"道顿堀、心斋桥筋商店街步行可达，关西美食密度全日本顶尖","难波站汇聚南海、近铁与多条地铁线，前往奈良、和歌山极便","夜生活极其丰富，居酒屋与串炸店营业至深夜"}', '{"深夜道顿堀人流嘈杂，部分区域需注意扒手","住宿多为商务酒店，安静度普遍一般"}', 34.6686, 135.5028, '经济实惠 (¥¥)', '美食爱好者、初次到访关西、喜欢夜生活与市井烟火的旅行者', '难波与道顿堀是大阪的代名词。格力高跑男看板、蟹道乐招牌与章鱼烧、大阪烧、串炸店铺林立的食街，构成了最原汁原味的关西体验。南海难波站可直达关西机场，是大多数旅行者落地后的第一选择。虽然喧闹，但这里是「吃在大阪」的终极基地。')
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
VALUES ('umeda', 'osaka', '梅田 (Umeda)', '北区枢纽与天空庭院的现代都会', '{"budget":5,"safety":9,"transit":10,"shopping":10,"nightlife":7,"quiet":6,"cafe":8}'::jsonb, '{"大阪站、梅田站是全关西最大铁路枢纽，前往京都、神户极便","Grand Front、Lucua、阪急百货等超大型商厦林立","梅田蓝天大厦空中庭园可俯瞰大阪夜景，治安极佳"}', '{"工作日通勤人流巨大，部分时段极为拥挤","住宿价格偏高，缺乏传统下町风情"}', 34.7024, 135.4959, '中等偏高 (¥¥¥)', '需要频繁往返京都/神户、追求购物便利与交通枢纽的旅行者', '梅田是大阪北部的商业与交通心脏。大阪站周边地下街绵延数公里，从平价药妆到奢侈品牌一应俱全。梅田蓝天大厦的空中庭园是经典夜景打卡点。若行程需要多次搭乘新干线或前往京都，住梅田可节省大量通勤时间。')
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
VALUES ('shinsaibashi', 'osaka', '心斋桥 (Shinsaibashi)', '拱廊商店街与潮流购物的步行天堂', '{"budget":6,"safety":8,"transit":9,"shopping":10,"nightlife":8,"quiet":4,"cafe":7}'::jsonb, '{"心斋桥筋商店街全长 580 米，拱廊设计雨天亦可漫步购物","美国村、堀江一带潮流买手店与古着店密集","长堀桥站、心斋桥站地铁交汇，前往环球影城方便"}', '{"周末与节假日人潮拥挤，购物街较为喧闹","平价连锁酒店为主，特色民宿较少"}', 34.6727, 135.5013, '中等 (¥¥¥)', '购物达人、年轻潮流爱好者、以心斋桥为活动半径的旅行者', '心斋桥是大阪最经典的购物动脉。拱廊商店街两旁从药妆、快时尚到本土设计师品牌应有尽有。向北延伸的美国村（Amerikamura）是大阪的「原宿」，聚集潮牌与二手店。这里与难波无缝衔接，步行即可覆盖大阪最繁华的商业带。')
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
VALUES ('tennoji', 'osaka', '天王寺/阿倍野 (Tennoji & Abeno)', '通天阁与阿倍野 Harukas 的南大阪门户', '{"budget":7,"safety":8,"transit":9,"shopping":8,"nightlife":6,"quiet":7,"cafe":7}'::jsonb, '{"阿倍野 Harukas 是日本最高楼之一，展望台与百货一体","通天阁、新世界筋串炸与下町风情步行可达","JR 天王寺站可直达关西机场与奈良，性价比高于梅田"}', '{"部分区域保留昭和下町风貌，与北区现代感形成反差","高端精品酒店选择少于梅田与难波"}', 34.6462, 135.5066, '经济实惠 (¥¥)', '预算有限、需要机场直达、喜爱下町风情与通天阁的旅行者', '天王寺是大阪南区的枢纽。阿倍野 Harukas 300 展望台提供 360° 大阪全景，新世界区域的通天阁与串炸店保留着浓厚的昭和下町氛围。JR 天王寺站可搭乘 Haruka 直达关西机场，住宿性价比优于梅田，适合注重交通效率的务实型旅行者。')
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
VALUES ('osaka-castle', 'osaka', '大阪城/京桥 (Osaka Castle & Kyobashi)', '天守阁绿荫与京桥居酒屋街的平衡之选', '{"budget":7,"safety":9,"transit":8,"shopping":7,"nightlife":6,"quiet":8,"cafe":6}'::jsonb, '{"大阪城公园四季皆宜，樱花季与红叶季尤为出片","京桥站周边居酒屋与本地食肆林立，物价亲民","环境安静，家庭友好，距梅田仅数站地铁"}', '{"缺乏心斋桥级别的潮流购物与夜生活","部分区域以本地居民为主，英文标识相对有限"}', 34.6873, 135.5262, '中等 (¥¥¥)', '家庭出行、历史爱好者、追求安静与绿化的旅行者', '大阪城公园是大阪的绿色心脏。天守阁复建建筑与宽阔护城河构成经典景观，清晨慢跑与傍晚散步极为舒适。邻近的京桥是本地上班族的居酒屋聚集地，物价远低于道顿堀。这里兼顾历史、自然与便利，是带长辈或孩子出行的稳妥选择。')
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
VALUES ('amerikamura', 'osaka', '美国村/堀江 (Amerikamura & Horie)', '关西原宿与二手潮牌的青年文化区', '{"budget":7,"safety":8,"transit":8,"shopping":9,"nightlife":8,"quiet":5,"cafe":9}'::jsonb, '{"美国村是大阪潮流与街头文化的发源地，古着与潮牌店密集","堀江一带独立咖啡馆与精酿酒吧水准极高","步行可达心斋桥，年轻旅行者聚集，氛围活跃"}', '{"周末美国村三角公园周边较为嘈杂","以小型酒店与 guesthouse 为主，大型连锁酒店较少"}', 34.672, 135.497, '经济实惠 (¥¥)', '年轻背包客、古着爱好者、追求关西亚文化与咖啡文化的旅行者', '美国村（アメ村）是大阪的潮流心脏，三角公园旁的二手店与潮牌买手店吸引着全关西的年轻人。向西延伸的堀江（Horie）则更为精致，独立咖啡馆与设计师小店藏在小巷深处。这里的心斋桥站步行 5 分钟，却保留着与主街不同的亚文化气质，是大阪最 Chill 的青年街区之一。')
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
VALUES ('tenma', 'osaka', '天满/天神桥筋 (Tenma & Tenjinbashisuji)', '日本最长商店街与本地居酒屋的深夜食堂', '{"budget":8,"safety":8,"transit":8,"shopping":8,"nightlife":7,"quiet":7,"cafe":6}'::jsonb, '{"天神桥筋商店街全长 2.6 公里，是日本最长的拱廊商店街","天满站周边居酒屋与立饮酒吧密度极高，本地食客为主","距梅田仅两站，住宿性价比优于北区核心"}', '{"缺乏英文服务与国际化配套","旅游知名度低，不适合以打卡地标为主的行程"}', 34.704, 135.511, '经济实惠 (¥¥)', '深度游爱好者、美食探索者、追求本地生活感与性价比的旅行者', '天满与天神桥筋是大阪人自己的食堂。天神桥筋商店街从南到北绵延 2.6 公里，药妆、百元店、生鲜与日常用品一应俱全。天满站周边的居酒屋 alley 在下班后极为热闹，物价远低于道顿堀。若想体验「大阪人真正在吃什么」，天满是比游客区更 authentic 的选择。')
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
COMMIT;