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