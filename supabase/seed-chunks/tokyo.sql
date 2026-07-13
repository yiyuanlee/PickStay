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