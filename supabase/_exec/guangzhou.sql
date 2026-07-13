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