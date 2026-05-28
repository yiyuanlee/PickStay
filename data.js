// PickStay - 预设数据与 API 配置 (扩展版数据集)

// 地图 API 基础配置（保存在本地 localStorage 中，允许用户在界面上动态更新）
window.MAP_CONFIG = {
  activeProvider: "mock", // "mock" | "amap" | "google"
  amap: {
    key: "",             // 高德地图端 Key
    securityJsCode: ""  // 高德安全密钥
  },
  google: {
    apiKey: ""          // Google Maps API Key
  }
};

// 城市与街区核心数据
window.CITIES_DATA = {
  tokyo: {
    name: "东京 (Tokyo)",
    description: "传统与现代交织的超级大都市",
    center: { lat: 35.6762, lng: 139.6503 },
    neighborhoods: [
      {
        id: "shinjuku",
        name: "新宿 (Shinjuku)",
        tagline: "霓虹闪烁的繁华不夜城",
        center: { lat: 35.6938, lng: 139.7034 },
        scores: { budget: 5, safety: 7, transit: 10, shopping: 9, nightlife: 10, quiet: 3, cafe: 6 },
        pros: ["全东京最强的交通枢纽，去哪都方便", "百货商场与药妆店极多，购物天堂", "夜生活极其丰富（歌舞伎町、思出横丁）"],
        cons: ["人流量巨大，街道环境相对嘈杂", "深夜部分繁华街区治安需稍微留心"],
        priceLevel: "中等偏高 (¥¥¥)",
        bestFor: "初次到访、喜欢繁华便利和夜生活的旅行者",
        detailText: "新宿是东京最著名的商业与娱乐中心。这里有全世界最繁忙的火车站，无论是去箱根、富士山还是东京市内其他地方都极其便利。尽管节奏飞快、喧闹嘈杂，但这里能让你体验到最原汁原味的东京都市感。"
      },
      {
        id: "shibuya",
        name: "涩谷 (Shibuya)",
        tagline: "潮流风向标与年轻人的游乐场",
        center: { lat: 35.6580, lng: 139.7016 },
        scores: { budget: 4, safety: 8, transit: 9, shopping: 10, nightlife: 9, quiet: 4, cafe: 9 },
        pros: ["引领全球潮流的购物街区", "咖啡馆与时尚买手店极多", "步行即可到表参道、原宿和代代木公园"],
        cons: ["周末和节假日人潮拥拥挤", "住宿成本普遍较高"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "潮流爱好者、年轻一族、咖啡馆打卡达人",
        detailText: "涩谷不仅有著名的十字路口，更是东京的时尚中心。从涩谷往北延伸至原宿和表参道，一路上遍布着各式精品咖啡店、潮牌店和设计师买手店。这里的氛围充满活力与艺术气息，非常适合喜欢探索小巷与淘货的旅行者。"
      },
      {
        id: "asakusa",
        name: "浅草 (Asakusa)",
        tagline: "江户风情与传统文化的落脚点",
        center: { lat: 35.7148, lng: 139.7967 },
        scores: { budget: 8, safety: 9, transit: 7, shopping: 6, nightlife: 4, quiet: 8, cafe: 7 },
        pros: ["富有传统日式风情，邻近浅草寺与隅田川", "性价比较高，平价民宿与设计青旅多", "入夜后十分安静，安全系数极高"],
        cons: ["距离新宿、涩谷等西部主要商圈较远", "夜生活相对匮乏，店铺大多在晚上8-9点打烊"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "家庭出行、预算有限的背包客、喜爱传统文化的旅行者",
        detailText: "浅草保留了东京少有的下町风情（江户时代的平民区氛围）。在这里你可以穿着和服漫步，远眺晴空塔。虽然交通没有新宿那么四通八达，但住宿性价比极高，环境古朴安详，是体验慢节奏东京的理想之地。"
      },
      {
        id: "nakameguro",
        name: "中目黑 (Nakameguro)",
        tagline: "目黑川畔的精致文艺慢生活",
        center: { lat: 35.6443, lng: 139.6991 },
        scores: { budget: 4, safety: 10, transit: 8, shopping: 8, nightlife: 5, quiet: 9, cafe: 10 },
        pros: ["目黑川两旁风景如画（特别是樱花季）", "东京独立咖啡店与小众设计师店的聚集地", "极具高品质生活气息，静谧优雅"],
        cons: ["樱花季时人山人海，交通受限", "奢华精品酒店较少，多为高价民宿或精品公寓"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "文艺青年、喜欢慢节奏散步、对居住品质要求高的旅行者",
        detailText: "中目黑是东京当地人最向往的居住区之一。目黑川穿城而过，两旁散落着全东京最棒的手冲咖啡馆（如星巴克臻选烘焙工坊）、面包房和中古家具店。它距离涩谷仅一站地铁，却完美隔绝了涩谷的喧嚣，展现出一种慵懒而精致的 Chill 氛围。"
      },
      {
        id: "shimokitazawa",
        name: "下北泽 (Shimokitazawa)",
        tagline: "古着、音乐与青年次文化的圣地",
        center: { lat: 35.6616, lng: 139.6666 },
        scores: { budget: 7, safety: 9, transit: 8, shopping: 9, nightlife: 7, quiet: 7, cafe: 10 },
        pros: ["全东京最好的古着屋（Vintage）和黑胶唱片店聚集区", "充满市井烟火气和随性的街头艺术", "拥有极多高水准的独立咖啡馆与精酿酒吧"],
        cons: ["街道狭窄如迷宫，带大件行李步行不便", "大型豪华连锁酒店极少，以特色青年旅馆和民宿为主"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "古着爱好者、小众音乐迷、寻找独特在地生活体验的年轻人",
        detailText: "下北泽（简称下北）是一个散发着叛逆与自由气息的街区。这里没有摩天大楼，只有密密麻麻的小巷，藏着数不清的古着店、小剧场、Livehouse 以及品质极高且价格亲民的咖啡馆。这里的节奏缓慢，处处流露出随性与舒适，是东京最迷人的 Chill 街区之一。"
      },
      {
        id: "ginza",
        name: "银座 (Ginza)",
        tagline: "极尽奢华的高端商业百货区",
        center: { lat: 35.6719, lng: 139.7639 },
        scores: { budget: 2, safety: 10, transit: 10, shopping: 10, nightlife: 4, quiet: 8, cafe: 7 },
        pros: ["东京最高端的购物区，奢侈品牌与高级餐厅密布", "多条地铁线交汇，治安极佳，街区整洁优雅", "拥有许多高水平的老派咖啡沙龙"],
        cons: ["物价高昂，平价住宿和餐饮极少", "缺乏街头烟火气与小众潮流文化"],
        priceLevel: "至尊奢华 (¥¥¥¥¥)",
        bestFor: "高预算旅行者、喜爱奢华购物与精致生活的游客",
        detailText: "银座是东京最老牌的繁华街区。在这里你能体验到顶级的日式服务与一流的治安环境。尽管物价高昂，但这里汇集了东京最高品质的精品酒店、米其林餐厅以及极具历史沉淀的老牌咖啡馆（如 Cafe de L'Ambre），非常适合追求从容与高品质的旅行者。"
      },
      {
        id: "ueno",
        name: "上野 (Ueno)",
        tagline: "公园绿荫与便利机场线枢纽",
        center: { lat: 35.7138, lng: 139.7772 },
        scores: { budget: 7, safety: 8, transit: 10, shopping: 8, nightlife: 5, quiet: 7, cafe: 6 },
        pros: ["京成电铁直达机场，多条新干线交汇，交通极优", "紧邻上野恩赐公园与众多国立博物馆", "阿美横町市场有大量平价药妆与街头美食"],
        cons: ["上野火车站周边人流嘈杂，部分区域深夜流浪汉较多", "夜生活选择相对保守，多为传统居酒屋"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "注重机场交通效率、喜爱博物馆与自然绿荫的家庭或背包客",
        detailText: "上野是东京北部的门户枢纽。这里有宽阔的上野公园，樱花季时是赏樱圣地。交通极为便利，可以直接搭乘 Skyliner 快速直达机场，也可以轻松坐新干线前往日本东北地区。附近的阿美横町充满了市井杂货铺风情，住宿性价比极高。"
      },
      {
        id: "koenji",
        name: "高圆寺 (Koenji)",
        tagline: "朋克乐手、平民酒馆与慵懒时光",
        center: { lat: 35.7053, lng: 139.6498 },
        scores: { budget: 8, safety: 9, transit: 7, shopping: 9, nightlife: 7, quiet: 8, cafe: 9 },
        pros: ["廉价美食与性价比极高的日式出租公寓聚集区", "拥有独特的朋克、现场Live与独立旧货店文化", "远离喧嚣，生活气息极其纯粹、缓慢"],
        cons: ["距离筑地、银座等东部景点较远", "大型商业街较少，酒店大多为小规模公寓民宿"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "文艺青年、寻找小众在地生活感、爱淘便宜古着的旅行者",
        detailText: "高圆寺距离新宿仅几站车程，却散发着截然不同的悠闲氛围。这里是东京独立摇滚与平民文化的中心，充满着各种小型的中古商店、独立咖啡馆和夜晚热闹的串烧小摊。在这里生活有一种说不出的轻松与随性，非常适合想要‘假装生活在东京’的旅行者。"
      }
    ]
  },
  beijing: {
    name: "北京 (Beijing)",
    description: "帝都气象与胡同烟火的交融",
    center: { lat: 39.9042, lng: 116.4074 },
    neighborhoods: [
      {
        id: "sanlitun",
        name: "三里屯/东直门 (Sanlitun)",
        tagline: "时尚潮流地标与使馆区绿荫",
        center: { lat: 39.9333, lng: 116.4554 },
        scores: { budget: 4, safety: 9, transit: 9, shopping: 10, nightlife: 10, quiet: 5, cafe: 9 },
        pros: ["北京最顶级的时尚商圈（太古里）与美食汇聚地", "酒吧和夜生活冠绝京城", "使馆区绿树成荫，步行体验好，交通便利"],
        cons: ["酒店均价非常昂贵", "周末晚间打车困难，交通拥堵"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "喜欢购物、夜生活、时尚潮流的年轻旅行者",
        detailText: "三里屯是北京的潮流风向标，在这里能找到各种首店、旗舰店以及高水准的西餐和酒吧。而紧邻的使馆区又极为安静舒适，街道宽阔，非常适合骑行或散步。这里的咖啡馆密度极大，工作日下午也随处可见在室外喝咖啡聊天的人，极具都市 Chill 感。"
      },
      {
        id: "gulou",
        name: "鼓楼/什刹海 (Gulou)",
        tagline: "老北京胡同里的文艺新浪潮",
        center: { lat: 39.9412, lng: 116.3972 },
        scores: { budget: 6, safety: 9, transit: 8, shopping: 8, nightlife: 7, quiet: 6, cafe: 10 },
        pros: ["最地道的老北京胡同与四合院风貌", "独立咖啡馆、Livehouse与手作小店密集", "紧邻什刹海，风景如画，充满生活气息"],
        cons: ["胡同内部分老旧住宿设施隔音一般", "胡同内无法通车，需步行较长距离"],
        priceLevel: "中等偏高 (¥¥¥)",
        bestFor: "文艺青年、喜欢老北京胡同文化、爱骑行的旅行者",
        detailText: "鼓楼和五道营胡同周边是北京独立咖啡与青年文化的核心产地。红砖灰瓦的胡同里隐藏着各种手冲咖啡馆、黑胶唱片店和独立设计师工作室。清晨能听到鸽哨，下午可以在胡同里叹一杯冰美式，晚上去后海或 Livehouse 听歌，是把老北京传统与现代 Chill 结合得最完美的地区。"
      },
      {
        id: "guomao",
        name: "国贸/CBD (Guomao)",
        tagline: "摩天大楼林立的现代商务中心",
        center: { lat: 39.9085, lng: 116.4595 },
        scores: { budget: 3, safety: 10, transit: 10, shopping: 9, nightlife: 6, quiet: 7, cafe: 8 },
        pros: ["交通网络发达，双地铁枢纽，出行极其高效", "高品质豪华酒店与高空景观公寓林立", "治安极佳，服务业配套水准极高"],
        cons: ["生活成本极高，餐饮普遍价格偏贵", "夜晚写字楼区域缺乏生活烟火气"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "商务出行、追求高品质标准化酒店服务与夜景的旅行者",
        detailText: "国贸是北京的金融中心，以标志性的“大裤衩”及其他摩天大楼为主景。这里集中了众多国际超豪华酒店（如国贸大酒店、新国贸饭店），地下商圈极其庞大。这里虽然商务感略重，但咖啡馆（特别是适合办公和开会的连锁及精品咖啡）随处可见，效率极高。"
      },
      {
        id: "qianmen",
        name: "前门/大栅栏 (Qianmen)",
        tagline: "百年老字号与复古创客街区",
        center: { lat: 39.8973, lng: 116.3976 },
        scores: { budget: 7, safety: 9, transit: 9, shopping: 7, nightlife: 4, quiet: 8, cafe: 8 },
        pros: ["步行即可到达天安门广场与故宫，看升旗首选", "拥有很多新改建的四合院精品民宿和青年旅社", "前门步行街和杨梅竹斜街极具老北京韵味"],
        cons: ["属于热门景区，白天游人如织，老字号餐饮口味偏游客化", "夜间街道相对冷清，酒吧娱乐较少"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "初次来京看景点、家庭出游、追求步行看升旗的旅行者",
        detailText: "前门地区紧邻故宫 and 天安门，是北京的历史核心地带。这里经过近年的城市更新，诞生了像北京坊、杨梅竹斜街这样既保留了历史建筑，又引入了高品质独立书店（如PageOne）、精品咖啡馆与艺术展厅的复古 Chill 空间，在喧嚣的景区中闹中取静。"
      },
      {
        id: "wudaokou",
        name: "五道口 (Wudaokou)",
        tagline: "宇宙中心的青年活力与高性价比食街",
        center: { lat: 39.9928, lng: 116.3378 },
        scores: { budget: 8, safety: 9, transit: 8, shopping: 7, nightlife: 9, quiet: 5, cafe: 8 },
        pros: ["高校环绕，充满年轻活力，餐饮消费十分亲民", "韩式烧烤、小吃及特色小酒馆选择极其丰富", "有极多适合自习、办公的特色咖啡店"],
        cons: ["早晚高峰地铁13号线极其拥挤", "缺少高星级豪华酒店"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "学生党、背包客、注重餐饮性价比和年轻氛围的旅行者",
        detailText: "五道口被称为“宇宙中心”，周围聚集了清华、北大、语言大学等数万名中外学子。这里的街头充满着青春蓬勃的朝气，拥有无数好吃不贵的异国美食和小吃。这里的咖啡馆大都带有宽敞的桌椅与安静的氛围，极具求知与休闲交融的 Chill 气息。"
      },
      {
        id: "wangfujing",
        name: "王府井/东单 (Wangfujing)",
        tagline: "底蕴深厚的经典商业步行街",
        center: { lat: 39.9113, lng: 116.4116 },
        scores: { budget: 4, safety: 10, transit: 10, shopping: 10, nightlife: 4, quiet: 8, cafe: 7 },
        pros: ["传统老牌商业街区，百货大楼林立，服务业配套顶级", "临近故宫东华门，交通网络密布，极为安全", "拥有很多隐秘于四合院或高端商场内的精致下午茶"],
        cons: ["游客密集，物价较高，缺少本土小众文艺氛围", "晚上商业街打烊较早，缺乏夜生活"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "商务出行、合家欢出游、追求便利和安全的老牌品质旅行者",
        detailText: "王府井是北京最负盛名的商业名片。这里聚集了王府中环、北京apm等现代化高端商圈，同时保留着王府井天主堂等历史遗存。这里安全系数极高，酒店管理极为专业规范。虽然街区商业感重，但各种茶室与高档咖啡厅也为疲惫的旅人提供了一处优雅的避风港。"
      },
      {
        id: "wangjing",
        name: "望京 (Wangjing)",
        tagline: "前沿互联网高地与韩式文艺咖啡汇聚区",
        center: { lat: 39.9934, lng: 116.4746 },
        scores: { budget: 6, safety: 9, transit: 8, shopping: 8, nightlife: 7, quiet: 7, cafe: 9 },
        pros: ["汇集了全北京最地道的韩式美食、烤肉与餐吧", "高设计感的精品独立咖啡馆遍地开花", "街区现代，邻近798艺术区，极具潮流感"],
        cons: ["距离市中心（故宫、天坛）距离较远，乘车时间较长", "早晚高峰部分路段容易堵车"],
        priceLevel: "中等 (¥¥¥)",
        bestFor: "美食饕餮、互联网从业者、喜爱逛展与韩式文艺的年轻人",
        detailText: "望京是北京的新兴科技与创意中心。由于长期有大量韩裔及互联网精英居住，这里形成了极富特色的“咖啡与brunch文化”。这里的店面装潢极为现代和上镜，周末去隔壁的798艺术区看展，下午在望京喝一杯特色特调咖啡，体验极为Chill。"
      }
    ]
  },
  paris: {
    name: "巴黎 (Paris)",
    description: "浪漫塞纳河畔的流动的盛宴",
    center: { lat: 48.8566, lng: 2.3522 },
    neighborhoods: [
      {
        id: "marais",
        name: "玛黑区 (Le Marais - 3/4区)",
        tagline: "前卫画廊、精品店与中世纪石板路",
        center: { lat: 48.8584, lng: 2.3621 },
        scores: { budget: 4, safety: 8, transit: 9, shopping: 10, nightlife: 8, quiet: 7, cafe: 10 },
        pros: ["巴黎最时髦的区域，遍布先锋买手店与艺术画廊", "保存有大量中世纪优雅建筑，街景极美", "星期天大部分商店依然开门（巴黎少有）"],
        cons: ["狭窄的历史街道容易拥堵", "热门季节住宿一房难求且昂贵"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "时尚达人、艺术爱好者、喜欢步行探索小巷的旅行者",
        detailText: "玛黑区跨越巴黎第3和第4区，是巴黎当之无愧的潮流中心。这里有浮士德式的古老庭院、各种独立香水店、小众时装店和著名的蓬皮杜艺术中心。这儿的街角遍布露天咖啡馆，下午点一杯 Café au lait 坐在路边静静观察行人，就是最具法式风情的 Chill 体验。"
      },
      {
        id: "montmartre",
        name: "蒙马特 (Montmartre - 18区)",
        tagline: "圣心堂下的波希米亚艺术家高地",
        center: { lat: 48.8867, lng: 2.3431 },
        scores: { budget: 7, safety: 5, transit: 7, shopping: 8, nightlife: 8, quiet: 6, cafe: 9 },
        pros: ["浪漫文艺的至高点，可俯瞰巴黎全景", "物价在巴黎相对亲民，充满小餐馆与面包房", "有浓厚艺术气息与电影感（《天使爱美丽》取景地）"],
        cons: ["山丘地形台阶极多，携带大件行李非常吃力", "晚上圣心堂周边及红灯区（皮加勒）治安需要高度防范"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "情侣、追求艺术浪漫、预算有限的年轻旅行者",
        detailText: "蒙马特位于巴黎北部山丘，曾是毕加索、梵高等艺术家生活的地方。这里有爬满常春藤的石砌小屋、双风车咖啡馆和街头画家聚集的特尔特广场。这里的节奏相比巴黎市中心更慢、更自由，有着别样的波希米亚式 Chill 氛围。"
      },
      {
        id: "latinquarter",
        name: "拉丁区 (Latin Quarter - 5区)",
        tagline: "索邦大学旁的左岸学术与书香气",
        center: { lat: 48.8474, lng: 2.3458 },
        scores: { budget: 6, safety: 9, transit: 9, shopping: 7, nightlife: 7, quiet: 8, cafe: 8 },
        pros: ["极其安全的治安，治安情况在巴黎首屈一指", "充满学术氛围，紧邻卢森堡公园和莎士比亚书店", "交通极其便利，靠近塞纳河畔"],
        cons: ["老旧建筑多，很多住宿无电梯且房间较小", "缺乏大型现代购物商场"],
        priceLevel: "中等 (¥¥¥)",
        bestFor: "独自旅行者、学者书迷、注重安全和宁静的旅行者",
        detailText: "拉丁区自中世纪起就是巴黎的大学区。这里洋溢着年轻的学术气息和书香。这里的狭窄街道（如胡格波街）藏着许多历史悠久的独立电影院、古旧书店和舒适的学生咖啡馆。紧邻的卢森堡公园更是巴黎人最爱的晒太阳、看书和发呆的 Chill 圣地。"
      },
      {
        id: "stgermain",
        name: "圣日耳曼德佩 (Saint-Germain-des-Prés - 6区)",
        tagline: "花神与双叟咖啡馆的萨特遗风",
        center: { lat: 48.8538, lng: 2.3333 },
        scores: { budget: 3, safety: 10, transit: 9, shopping: 9, nightlife: 6, quiet: 9, cafe: 10 },
        pros: ["巴黎最安全、最优雅尊贵的街区之一", "拥有全巴黎最著名的传奇咖啡馆与高级时装店", "艺术品商店与精品书店极多，法式优雅的天花板"],
        cons: ["高昂的住宿价格，生活消费成本极高", "酒店以精品复古小酒店为主，房间面积较小"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "追求极致法式优雅、历史文化爱好者、高预算旅行者",
        detailText: "圣日耳曼区是二十世纪存在主义哲学和文学运动的摇篮。萨特、西蒙·波娃和毕加索曾是花神咖啡馆（Café de Flore）和双叟咖啡馆（Les Deux Magots）的常客。如今这里已成为顶级奢侈品、独立画廊与高级住宅的代名词。虽然昂贵，但在这里喝咖啡聊天、闲逛画廊是巴黎最经典、最具质感的 Chill 体验。"
      },
      {
        id: "canal",
        name: "圣马丁运河区 (Canal Saint-Martin - 10/11区)",
        tagline: "塞纳河支流畔的波希米亚潮流慢生活",
        center: { lat: 48.8718, lng: 2.3683 },
        scores: { budget: 6, safety: 7, transit: 8, shopping: 8, nightlife: 8, quiet: 6, cafe: 10 },
        pros: ["运河两岸风光无限，是当地年轻一代野餐、小憩的潮流圣地", "汇聚了大量新潮的手工面包房、独立咖啡馆与精酿酒吧", "避开了传统旅行景区的喧嚣，极富生活感"],
        cons: ["深夜运河两旁偶尔会有聚会噪音", "部分旧式公寓隔音相对欠佳"],
        priceLevel: "中等 (¥¥¥)",
        bestFor: "文青情侣、寻找生活化法式 Chill 的年轻背包客",
        detailText: "圣马丁运河是一条充满活力的绿带。在这里，本地人比游客更多。下午坐在运河边的铁桥上，点一杯大热的 Du Pain et des Idées 面包与一杯手冲咖啡，看着过往小船，你能体会到巴黎极其现代、活力且毫不做作的慢节奏生活。"
      },
      {
        id: "champs",
        name: "香榭丽舍/第8区 (Champs-Élysées)",
        tagline: "凯旋门畔的宏大皇家大道与奢侈名店",
        center: { lat: 48.8725, lng: 2.3025 },
        scores: { budget: 2, safety: 9, transit: 10, shopping: 10, nightlife: 6, quiet: 7, cafe: 7 },
        pros: ["紧邻凯旋门与香街，大道宏阔，安全系数极高", "汇集了全球各大高端奢侈品牌旗舰店与米其林奢华法餐", "多条主力地铁线贯穿，前往各核心地标无缝衔接"],
        cons: ["住宿与日常物价高昂，缺少市井生活的烟火气", "游客密度极大，白天大道略显喧闹"],
        priceLevel: "至尊奢华 (¥¥¥¥¥)",
        bestFor: "奢华游旅人、蜜月情侣、对出行效率与治安有极高要求的旅行者",
        detailText: "第8区是巴黎皇家风范的代表。这里街道宽广、治安严密，酒店大都拥有极高规格的服务保障（如经典的巴黎乔治五世四季酒店）。虽然少了左岸那般文艺的羊肠小巷，但清晨在豪华公寓窗前喝杯浓缩，看着金色的凯旋门日出，也是极具法式优雅感的体验。"
      },
      {
        id: "eiffel",
        name: "铁塔/格勒内勒 (Eiffel Tower - 15区)",
        tagline: "开窗即见铁塔的静谧中产住宅区",
        center: { lat: 48.8583, lng: 2.2945 },
        scores: { budget: 4, safety: 9, transit: 8, shopping: 7, nightlife: 4, quiet: 9, cafe: 8 },
        pros: ["步行即可达战神广场，看巴黎铁塔夜间闪光秀最方便", "巴黎高品质的中产住宅区，环境优雅，极其安静安全", "有很多精致的法式小烘焙坊与社区咖啡店"],
        cons: ["缺乏大型的夜生活设施与吵闹酒吧", "住宿价格随着铁塔景观的优劣波动极大"],
        priceLevel: "中等偏高 (¥¥¥)",
        bestFor: "亲子出游、长辈同行、注重夜间绝对安静与安全的旅行者",
        detailText: "15区是一片极其迷人且高雅的法式中产生活区。这里远离了大多数旅游区的嘈杂与混乱，治安极佳，步行街上散发着法式社区特有的慵懒步伐。在这里住下，清晨买根刚出炉的法棍，走在铁塔下的塞纳河边晒晒太阳，是最舒服的体验。"
      }
    ]
  },
  melbourne: {
    name: "墨尔本 (Melbourne)",
    description: "全球咖啡之都，充满街头艺术与慢节奏巷弄的文化之城",
    center: { lat: -37.8136, lng: 144.9631 },
    neighborhoods: [
      {
        id: "fitzroy",
        name: "菲茨罗伊 (Fitzroy)",
        tagline: "波希米亚文艺与街头艺术的发源地",
        center: { lat: -37.8010, lng: 144.9790 },
        scores: { budget: 7, safety: 8, transit: 8, shopping: 9, nightlife: 9, quiet: 7, cafe: 10 },
        pros: ["全墨尔本最棒的独立咖啡店与素食餐厅聚集区", "街头壁画艺术与中古/设计师精品店随处可见", "夜间有许多文艺复古的黑胶爵士酒吧与Livehouse"],
        cons: ["周末夜晚部分酒吧周边略显嘈杂", "主要是精品公寓或民宿，大型连锁高端酒店较少"],
        priceLevel: "中等 (¥¥¥)",
        bestFor: "咖啡发烧友、古着与黑胶迷、追求先锋文化体验的旅行者",
        detailText: "菲茨罗伊是墨尔本的潮流文化心脏。Brunswick 街与 Gertrude 街纵横交错，沿街开满了世界顶尖级的单源豆手冲咖啡馆（如 Industry Beans）。这里的建筑外墙被五彩斑斓的街头涂鸦覆盖，氛围随性且极具创造力，是全世界最 Chill 的街区之一。"
      },
      {
        id: "cbd",
        name: "市中心 (Melbourne CBD)",
        tagline: "涂鸦巷弄与世界级咖啡排挡的交错",
        center: { lat: -37.8136, lng: 144.9631 },
        scores: { budget: 6, safety: 9, transit: 10, shopping: 10, nightlife: 8, quiet: 4, cafe: 9 },
        pros: ["市中心有完全免费的电车区 (Free Tram Zone)，交通极便利", "著名的霍西尔巷 (Hosier Lane) 和迪格雷夫街 (Degraves St) 咖啡巷近在咫尺", "生活极其方便，维多利亚女王市场近旁"],
        cons: ["高楼林立，车水马龙，缺乏宁静居住感", "住宿房间普遍较小且偏向公寓式酒店"],
        priceLevel: "中等偏高 (¥¥¥)",
        bestFor: "初次到访、追求高效出行与购物便利的旅行者",
        detailText: "墨尔本 CBD 绝非冷冰冰的金融区，而是充满了著名的“巷弄文化 (Laneway Culture)”。无数的地下室、小窄巷里挤满了水准极高的独立咖啡馆（如 Brother Baba Budan）。免费的环城电车让你无需交通卡即可玩遍主要景点，非常适合快节奏的旅行者。"
      },
      {
        id: "stkilda",
        name: "圣基尔达 (St Kilda)",
        tagline: "海滩、棕榈树与日落小企鹅的度假港湾",
        center: { lat: -37.8680, lng: 144.9739 },
        scores: { budget: 5, safety: 7, transit: 7, shopping: 7, nightlife: 8, quiet: 7, cafe: 8 },
        pros: ["紧邻圣基尔达海滩，日落时能在防波堤看野生神仙小企鹅归巢", "拥有历史悠久的月亮公园游乐场 (Luna Park)", "海滨大道风景优美，休闲度假感极强"],
        cons: ["距离 CBD 较远，需乘有轨电车，且不包含在免费区内", "Fitzroy St 部分区域深夜治安较杂乱"],
        priceLevel: "中等 (¥¥¥)",
        bestFor: "热爱大海、家庭出游、追求海滨度假风的旅人",
        detailText: "圣基尔达是墨尔本的游乐港湾。这里海风徐徐，两旁种满了高耸的棕榈树。在阿克兰街 (Acland St) 可以品尝欧式糕点，下午在海滩晒太阳，傍晚喝一杯精酿啤酒等待小企鹅归巢，是一种慵懒闲适的海滨 Chill 方式。"
      },
      {
        id: "carlton",
        name: "卡尔顿 (Carlton)",
        tagline: "小意大利的意式浓缩与皇家展览馆绿荫",
        center: { lat: -37.8000, lng: 144.9667 },
        scores: { budget: 7, safety: 9, transit: 9, shopping: 8, nightlife: 6, quiet: 9, cafe: 10 },
        pros: ["紧邻皇家展览馆与卡尔顿花园，绿化极佳，漫步体验极佳", "著名的“小意大利”莱贡街 (Lygon St) 发源地，意式餐饮绝佳", "步行即可到墨尔本大学，治安极好，学术氛围浓"],
        cons: ["高档酒店偏少，主要是学生公寓和经典维多利亚式联排别墅改造的民宿", "夜生活以餐饮和意式甜品店为主，缺乏喧闹夜店"],
        priceLevel: "中等 (¥¥¥)",
        bestFor: "美食家、偏爱静谧大公园、喜爱意式咖啡文化的旅行者",
        detailText: "卡尔顿是墨尔本咖啡文化的奠基之地。意大利移民在莱贡街引入了墨尔本第一台意式浓缩咖啡机。这里有著名的 Pidapipó 冰淇淋店与 Brunetti 咖啡馆。午后在皇家展览馆的喷泉旁看鸽子、晒太阳，喝一杯纯正的 Macchiato，是卡尔顿独有的慢节奏浪漫。"
      },
      {
        id: "southyarra",
        name: "南雅拉 (South Yarra)",
        tagline: "优雅奢华的雅皮士住宅区与时尚Chapel街",
        center: { lat: -37.8398, lng: 144.9953 },
        scores: { budget: 4, safety: 9, transit: 9, shopping: 10, nightlife: 7, quiet: 8, cafe: 9 },
        pros: ["Chapel 街拥有顶级买手店、百货大楼与时尚餐饮", "靠近雅拉河畔绿带与皇家植物园，自然空气怡人", "高星级精品公寓酒店众多，住宿环境极具质感"],
        cons: ["生活成本高昂，餐饮及车租较贵", "周末晚间时尚酒吧周边车辆较为拥堵"],
        priceLevel: "高档奢华 (¥¥¥¥)",
        bestFor: "高品质旅行者、购物达人、追求优雅住宿环境的商务客",
        detailText: "南雅拉是墨尔本著名的富人区。这里绿树成荫，古老的维多利亚式排屋与现代化的轻奢公寓交相辉映。著名的 Chapel St 集中了全城水准极高的潮流服饰、高端咖啡厅与创意 Brunch，靠近雅拉河的清晨慢跑体验在墨尔本堪称一绝。"
      },
      {
        id: "brunswick",
        name: "布伦瑞克 (Brunswick)",
        tagline: "极简工业风、现场摇滚与移民风味食街",
        center: { lat: -37.7684, lng: 144.9608 },
        scores: { budget: 8, safety: 8, transit: 8, shopping: 8, nightlife: 9, quiet: 7, cafe: 10 },
        pros: ["拥有众多由旧仓库改建而成的超大独立咖啡馆与烘焙厂", "悉尼路 (Sydney Road) 汇聚了地道地中海、中东与意式平民小吃", "拥有墨尔本最活跃的青年摇滚现场与小众服装零售店"],
        cons: ["部分老旧工业厂房改造区，市容缺乏皇家贵气", "距离南部海滩景区较远"],
        priceLevel: "经济实惠 (¥¥)",
        bestFor: "摇滚乐迷、咖啡烘焙深度发烧友、寻求性价比平民街区体验的旅行者",
        detailText: "布伦瑞克是墨尔本北部典型的多元文化与创意社区。这里是澳洲烘焙名店（如 Code Black Coffee）的大本营。仓库改建的挑高咖啡馆里随处可见带着电脑写作或画画的年轻人。这里有最接地气的生活物价、随性的街头涂鸦以及丰富且性价比极高的现场 Live演出。"
      },
      {
        id: "richmond",
        name: "里士满 (Richmond)",
        tagline: "厂区奥特莱斯与香浓越南风情的融合",
        center: { lat: -37.8202, lng: 144.9996 },
        scores: { budget: 7, safety: 8, transit: 9, shopping: 8, nightlife: 8, quiet: 6, cafe: 9 },
        pros: ["拥有著名的越南美食街（维多利亚街）与最地道的越南粉 (Pho)", "奥特莱斯折扣店密布，靠近墨尔本板球场 (MCG)，观赛首选", "交通网格四通八达，火车地铁数站即可直达 CBD"],
        cons: ["维多利亚街部分路段白天较嘈杂市井", "高星豪华传统大酒店偏少，多为新潮设计民宿"],
        priceLevel: "中等 (¥¥¥)",
        bestFor: "亚洲美食家、运动观赛爱好者、喜欢工厂店淘折扣的旅行者",
        detailText: "里士满是一个充满了反差萌的街区。这里既有大型的运动和折扣工厂店，又有北京/亚洲旅人最爱的“墨尔本小西贡”。这里的咖啡馆（如 Top Paddock）是墨尔本创意 Brunch 界的神话。里士满保留了工人阶级街区的质朴与如今雅皮互联网企业的交融风情。"
      }
    ]
  }
};
