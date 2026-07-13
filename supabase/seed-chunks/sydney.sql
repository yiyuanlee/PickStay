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