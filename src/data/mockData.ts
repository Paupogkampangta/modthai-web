import { GameMod, DonationConfig, DonorMessage, WishlistItem } from '../types';

export const INITIAL_MODS: GameMod[] = [
  {
    id: 'stardew-valley-thai',
    title: 'Stardew Valley: ภาษาไทย ฉบับสมบูรณ์',
    originalTitle: 'Stardew Valley',
    category: 'Simulation',
    status: 'completed',
    progress: 100,
    progressDetails: {
      story: 100,
      ui: 100,
      quests: 100,
      items: 100,
    },
    version: 'v2.4.0',
    gameVersion: 'PC 1.6.8+ (รองรับ Steam & GOG)',
    platform: ['Steam', 'GOG', 'Game Pass'],
    releaseDate: '2025-08-14',
    lastUpdated: '2026-03-20',
    author: 'Loli is My Life',
    coverImage: '/src/assets/images/stardew_farm_cover_1793170196165.jpg',
    summary: 'มอดภาษาไทยสำหรับเกมทำฟาร์มในตำนาน แปลเองเล่นเอง ตรวจทานบทสนทนาชาวบ้าน เทศกาล และไอเทมครบ 100% อ่านง่าย สบายตา',
    description: `มอดแปลภาษาไทยสำหรับเกม Stardew Valley โดย Loli is My Life ผ่านการเล่นจริงและเกลาสำนวนให้เข้ากับบรรยากาศชนบทอันอบอุ่น ปรับแต่งแบบอักษรภาษาไทยขนาดพอดีสายตา ไม่ทับซ้อนกับ UI เดิม และรองรับระบบ Co-op เล่นร่วมกับเพื่อนได้อย่างราบรื่น`,
    features: [
      'แปลบทสนทนาตัวละครในเมืองทั้งหมดครบ 100%',
      'แปลเควส, จดหมาย, กิจกรรมเทศกาล และสมุดสะสมไอเทมทั้งหมด',
      'ฟอนต์ภาษาไทยคัสตอมอ่านง่าย ไม่ติดสระลอย',
      'ติดตั้งง่ายผ่าน SMAPI หรือนำไฟล์ไปวางทับได้ทันที',
      'รองรับโหมดเล่นคนเดียวและผู้เล่นหลายคน (Multiplayer)',
    ],
    downloads: {
      primary: {
        name: 'StardewThai_v2.4.0_Full.zip',
        url: 'https://drive.google.com/uc?export=download&id=mock_stardew_thai',
        provider: 'Google Drive',
        fileSize: '48.5 MB',
      },
      mirrors: [
        {
          name: 'Mega Mirror (ลิงก์สำรอง)',
          url: 'https://mega.nz/file/mock_stardew_mirror',
          provider: 'Mega',
          fileSize: '48.5 MB',
        },
        {
          name: 'GitHub Direct Release',
          url: 'https://github.com/mock/stardew-thai/releases',
          provider: 'GitHub',
          fileSize: '48.5 MB',
        },
      ],
    },
    downloadCount: 48920,
    likes: 3120,
    installationGuide: {
      steps: [
        'ดาวน์โหลดไฟล์มอด StardewThai_v2.4.0_Full.zip จากปุ่มดาวน์โหลดด้านบน',
        'ทำการแตกไฟล์ zip จะได้โฟลเดอร์ชื่อ [CP] ThaiLanguageMod',
        'เปิดไปยังโฟลเดอร์ Mods ของตัวเกม (เช่น C:\\Program Files (x86)\\Steam\\steamapps\\common\\Stardew Valley\\Mods)',
        'นำโฟลเดอร์ [CP] ThaiLanguageMod ไปวางไว้ในโฟลเดอร์ Mods',
        'เปิดเกมผ่าน StardewModdingAPI.exe ภาษาจะเปลี่ยนเป็นภาษาไทยโดยอัตโนมัติ',
      ],
      notes: [
        'จำเป็นต้องติดตั้ง SMAPI 4.0 ขึ้นไปก่อนใช้งาน',
        'หากภาษาไม่เปลี่ยน ให้ตรวจสอบการตั้งค่าภาษาในเกมว่าเลือกภาษาไทยแล้วหรือไม่',
        'แนะนำให้สำรองไฟล์เซฟที่ %appdata%/StardewValley/Saves ก่อนลงมอดเสมอ',
      ],
      uninstallSteps: [
        'ไปที่โฟลเดอร์ Stardew Valley\\Mods',
        'ลบโฟลเดอร์ [CP] ThaiLanguageMod ทิ้ง',
        'เปิดเกมตามปกติเพื่อกลับเป็นภาษาอังกฤษ',
      ],
    },
    changelog: [
      {
        version: 'v2.4.0',
        date: '2026-03-20',
        changes: [
          'อัปเดตรองรับเนื้อหาเกมแพตช์ 1.6.8 ล่าสุด',
          'แก้ไขคำผิดในบทสนทนาเทศกาลฤดูหนาว และบทพูดของ Robin',
          'ปรับปรุงขนาดฟอนต์เมนูด้านข้างให้อ่านชัดเจนยิ่งขึ้น',
        ],
      },
      {
        version: 'v2.3.1',
        date: '2025-11-15',
        changes: [
          'แก้ไขปัญหาฟอนต์แสดงผลซ้อนกันบนจอแสดงผลความละเอียด 4K',
          'ตรวจทานบทสนทนาเควสของ Qi',
        ],
      },
    ],
    comments: [
      {
        id: 'c1',
        author: 'NongFarm99',
        comment: 'ขอบคุณมากครับ แปลได้ละมุนมาก เล่นแล้วอินกับชาวบ้านกว่าเดิมเยอะเลย',
        date: '2 วันที่แล้ว',
        rating: 5,
      },
      {
        id: 'c2',
        author: 'Artit_K',
        comment: 'ติดตั้งง่ายตามขั้นตอนเป๊ะๆ เล่น Co-op กับแฟนไม่มีปัญหาเลยครับ',
        date: '1 สัปดาห์ที่แล้ว',
        rating: 5,
      },
    ],
  },
  {
    id: 'cyberpunk-2077-thai',
    title: 'Cyberpunk 2077: ซับไตเติลภาษาไทย คมชัดทุกการสนทนา',
    originalTitle: 'Cyberpunk 2077 & Phantom Liberty',
    category: 'RPG',
    status: 'in_progress',
    progress: 92,
    progressDetails: {
      story: 100,
      ui: 98,
      quests: 86,
      items: 84,
    },
    version: 'v0.9.2 Beta',
    gameVersion: 'PC 2.13 (รวม Phantom Liberty)',
    platform: ['Steam', 'GOG', 'Epic Games'],
    releaseDate: '2025-11-01',
    lastUpdated: '2026-04-12',
    author: 'Loli is My Life',
    coverImage: '/src/assets/images/cyberpunk_city_cover_1793170197404.jpg',
    summary: 'สัมผัสบรรยากาศดิสโทเปียสุดดุเดือด แปลบทสนทนาหลักครบถ้วน แปลศัพท์สแลงไนท์ซิตี้และข้อความในชิปอย่างเข้าถึงอารมณ์',
    description: `โครงการแปลภาษาไทย Cyberpunk 2077 โดย Loli is My Life เน้นการแปลที่มีชีวิตชีวา ถ่ายทอดความดิบ ความเท่ และศัพท์แสงของโลกไซเบอร์พังก์ได้อย่างลงตัว โดยแปลเนื้อเรื่องหลักและบทพูดตัวละครสำคัญ เช่น Johnny Silverhand และ Judy ครบ 100% แล้ว`,
    features: [
      'เนื้อเรื่องหลักทั้ง V และ Johnny Silverhand แปลครบ 100%',
      'เกลาสำนวนสแลงยุคไซเบอร์พังก์ให้เข้าถึงง่ายแต่ยังคงความดิบ',
      'รองรับ REDmod ในการจัดการมอดแบบไร้รอยต่อ',
      'แปลเมนู อินเทอร์เฟซคราฟต์ของ และระบบทักษะ Perk ครบถ้วน',
    ],
    downloads: {
      primary: {
        name: 'CyberpunkThai_v0.9.2_Beta.rar',
        url: 'https://drive.google.com/uc?export=download&id=mock_cyberpunk_thai',
        provider: 'Google Drive',
        fileSize: '124 MB',
      },
      mirrors: [
        {
          name: 'Mega Mirror',
          url: 'https://mega.nz/file/mock_cyberpunk_mirror',
          provider: 'Mega',
          fileSize: '124 MB',
        },
      ],
    },
    downloadCount: 36400,
    likes: 2450,
    installationGuide: {
      steps: [
        'ดาวน์โหลด CyberpunkThai_v0.9.2_Beta.rar',
        'แตกไฟล์ทั้งหมดออกมาไว้ที่หน้าเดสก์ท็อป',
        'คัดลอกโฟลเดอร์ archive และ r6 ไปวางในไดเรกทอรีเกมหลัก (เช่น ...\\Cyberpunk 2077\\)',
        'กดเลือก Replace the files in the destination หากมีกล่องข้อความถามยืนยัน',
        'เข้าเกม ไปที่ Settings > Language แล้วตั้งค่า Subtitle และ Interface เป็น Thai/English ตามสะดวก',
      ],
      notes: [
        'สามารถใช้งานร่วมกับมอดกราฟิกอื่นๆ ได้โดยไม่เกิดปัญหาตีกัน',
        'หากลงผ่าน Vortex ให้ลากไฟล์ .rar ใส่ Vortex ได้เลย',
      ],
      uninstallSteps: [
        'ลบไฟล์ .archive ของมอดแปลภาษาใน Cyberpunk 2077\\archive\\pc\\mod\\',
        'ตรวจสอบความสมบูรณ์ของไฟล์เกมบน Steam (Verify integrity of game files)',
      ],
    },
    changelog: [
      {
        version: 'v0.9.2',
        date: '2026-04-12',
        changes: [
          'แปลบทสนทนาภารกิจเสริมย่าน Dogtown เพิ่มเติมอีก 45 เควส',
          'ปรับการแปลคำศัพท์เทคนิคเกี่ยวกับการแฮ็กและเน็ตเวิร์กให้สอดคล้องกัน',
        ],
      },
    ],
    comments: [
      {
        id: 'c3',
        author: 'NeonChopper',
        comment: 'สำนวนแปลจอห์นนี่ ซิลเวอร์แฮนด์กวนได้ใจมาก เข้ากับคาแรคเตอร์สุดๆ ครับ ขอบคุณท่าน Loli is My Life',
        date: '3 วันที่แล้ว',
        rating: 5,
      },
    ],
  },
  {
    id: 'elden-ring-thai',
    title: 'Elden Ring: บันทึกแดนมัชฌิมา ภาษาไทยฉบับแปลละเอียด',
    originalTitle: 'Elden Ring & Shadow of the Erdtree',
    category: 'Action',
    status: 'completed',
    progress: 100,
    progressDetails: {
      story: 100,
      ui: 100,
      quests: 100,
      items: 100,
    },
    version: 'v3.1.0',
    gameVersion: 'PC App Ver 1.14 / Calibrations 1.14.1',
    platform: ['Steam'],
    releaseDate: '2025-06-25',
    lastUpdated: '2026-02-18',
    author: 'Loli is My Life',
    coverImage: '/src/assets/images/fantasy_rpg_cover_1793170197599.jpg',
    summary: 'มอดคำบรรยายไทยสำหรับผู้มัวหมอง แปลเองเล่นเอง แปลประวัติไอเทม อาวุธ เวทมนตร์ บทสนทนา NPC และบทกวีโบราณอย่างลึกซึ้ง ไพเราะ และทรงคุณค่า',
    description: `โครงการที่ใช้เวลาแปลและค้นคว้าความหมายอย่างตั้งใจโดย Loli is My Life ถ่ายทอดประวัติศาสตร์อันลึกลับของแดนมัชฌิมาและพฤกษาทองอย่างประณีต คำอธิบายไอเทมทุกชิ้นถูกแปลให้คงความหมายแฝงและปริศนาตามที่ FromSoftware ตั้งใจสื่อสาร`,
    features: [
      'แปลคำอธิบายไอเทม อาวุธ ชุดเกราะ และเครื่องรางมากกว่า 3,000 รายการ',
      'แปลบทสนทนาและเควสของ NPC ทุกคน รวมถึงเนื้อหา DLC Shadow of the Erdtree',
      'ใช้ฟอนต์สไตล์โบราณที่เข้ากับธีม Dark Fantasy ของเกม',
      'รองรับ Mod Engine 2 และ Seamless Co-op',
    ],
    downloads: {
      primary: {
        name: 'EldenRingThai_v3.1.0_Full.zip',
        url: 'https://drive.google.com/uc?export=download&id=mock_eldenring_thai',
        provider: 'Google Drive',
        fileSize: '86.2 MB',
      },
      mirrors: [
        {
          name: 'Direct Fast Mirror',
          url: 'https://download.mock.modthai.org/eldenring_thai_v3.1.0.zip',
          provider: 'Direct',
          fileSize: '86.2 MB',
        },
      ],
    },
    downloadCount: 62450,
    likes: 4890,
    installationGuide: {
      steps: [
        'ดาวน์โหลด EldenRingThai_v3.1.0_Full.zip',
        'แตกไฟล์จะได้โฟลเดอร์ mod และไฟล์ launchmod_eldenring.bat',
        'วางไว้ในโฟลเดอร์ Mod Engine 2 หรือแทนที่โฟลเดอร์ mod เดิม',
        'รันเกมผ่าน launchmod_eldenring.bat โดยไม่ต้องปิด Easy Anti-Cheat ด้วยตนเอง',
      ],
      notes: [
        'มอดนี้ออกแบบมาสำหรับโหมด Offline หรือเล่น Co-op ผ่านมอด Seamless Co-op เท่านั้น เพื่อป้องกันปัญหาแบนจากระบบตรวจจับของ FromSoftware',
      ],
      uninstallSteps: [
        'ลบโฟลเดอร์ mod ใน Mod Engine 2 ออก',
        'เปิดเกมผ่าน Steam ตามปกติ',
      ],
    },
    changelog: [
      {
        version: 'v3.1.0',
        date: '2026-02-18',
        changes: [
          'ตรวจทานและปรับปรุงคำแปลบอสและอุปกรณ์จาก DLC Shadow of the Erdtree ให้สละสลวยขึ้น',
          'แก้ไขชื่อสถานที่ในแผนที่โลกให้ตรงตามบริบทตำนานเดิม',
        ],
      },
    ],
    comments: [
      {
        id: 'c4',
        author: 'TarnishedBlade',
        comment: 'คำแปล Lore ในไอเทมลึกซึ้งมาก ภาษาเหมือนวรรณกรรมโบราณเลย นับถือความตั้งใจครับ',
        date: '2 สัปดาห์ที่แล้ว',
        rating: 5,
      },
    ],
  },
  {
    id: 're4-remake-thai',
    title: 'Resident Evil 4 Remake: บทบรรยายภาษาไทย ชุมชนปรสิตสยองขวัญ',
    originalTitle: 'Resident Evil 4 (Remake)',
    category: 'Horror',
    status: 'completed',
    progress: 100,
    progressDetails: {
      story: 100,
      ui: 100,
      quests: 100,
      items: 100,
    },
    version: 'v1.6.0',
    gameVersion: 'PC Steam ล่าสุด (รวม Separate Ways)',
    platform: ['Steam'],
    releaseDate: '2025-04-10',
    lastUpdated: '2026-01-30',
    author: 'Loli is My Life',
    coverImage: '/src/assets/images/gothic_horror_cover_1793170197184.jpg',
    summary: 'ดำดิ่งสู่คฤหาสน์และหมู่บ้านสยองขวัญ แปลบทพูดลีออน, แอชลีย์, ลูอิส และเอด้า วอง อย่างถึงพริกถึงขิง พร้อมบันทึกเอกสารลับทุกชิ้น',
    description: `มอดคำบรรยายไทย Resident Evil 4 Remake โดย Loli is My Life ที่รวบรวมบทพูด มุกตลกของลีออน และเอกสารบันทึกการวิจัยปรสิต Las Plagas ไว้อย่างครบถ้วน 100% เล่นจบได้ทั้งเนื้อเรื่องหลักของ Leon และเนื้อเรื่อง Separate Ways ของ Ada Wong`,
    features: [
      'แปลบทพูดของ Leon, Ashley, Luis, Krauser และ Ada Wong ครบทุก Chapter',
      'แปลเอกสารบันทึก (Files) และคำแนะนำการผสมสมุนไพรครบทุกชิ้น',
      'ติดตั้งง่ายผ่าน Fluffy Mod Manager เพียงคลิกเดียว',
      'รองรับทั้งภาษาไทยตัวเต็มและปรับขนาดฟอนต์ให้สบายตาเวลาเล็งปืน',
    ],
    downloads: {
      primary: {
        name: 'RE4RemakeThai_v1.6.0.rar',
        url: 'https://drive.google.com/uc?export=download&id=mock_re4_thai',
        provider: 'Google Drive',
        fileSize: '62.4 MB',
      },
    },
    downloadCount: 41200,
    likes: 2980,
    installationGuide: {
      steps: [
        'ดาวน์โหลดโปรแกรม Fluffy Mod Manager (หากยังไม่มี)',
        'ดาวน์โหลดไฟล์มอด RE4RemakeThai_v1.6.0.rar',
        'นำไฟล์ .rar ไปใส่ไว้ใน Fluffy Mod Manager\\Games\\RE4R\\Mods\\',
        'เปิดโปรแกรม Fluffy Mod Manager กด Refresh แล้วคลิกสวิตช์เปิดใช้งานมอด',
        'กด Launch Game ผ่านโปรแกรมได้ทันที',
      ],
      notes: [
        'สามารถเปิด/ปิดมอดได้ตลอดเวลาผ่าน Fluffy Mod Manager โดยไม่กระทบไฟล์เกมหลัก',
      ],
      uninstallSteps: [
        'เปิด Fluffy Mod Manager แล้วคลิกปิดสวิตช์มอด',
      ],
    },
    changelog: [
      {
        version: 'v1.6.0',
        date: '2026-01-30',
        changes: [
          'อัปเดตรองรับเนื้อเรื่องเสริม Separate Ways ของ Ada Wong ครบทุกบท',
          'ปรับปรุงคำแปลคำใบ้ในการหมุนแก้ปริศนาตามประตูและโบสถ์',
        ],
      },
    ],
    comments: [
      {
        id: 'c5',
        author: 'LeonFanClub',
        comment: 'เล่นแล้วมันส์มาก บทพูดลีออนกวนโอ๊ยเหมือนเดิมเป๊ะๆ เยี่ยมครับ',
        date: '1 เดือนที่แล้ว',
        rating: 5,
      },
    ],
  },
];

export const INITIAL_DONATION_CONFIG: DonationConfig = {
  promptPayPhone: '089-170-1050',
  promptPayName: 'นาย ธิดามาศ / Loli is My Life',
  bankName: 'ธนาคารกสิกรไทย (KBANK)',
  bankAccount: '142-8-39482-1',
  bankHolder: 'นาย ธิดามาศ (THIDAMAS T.)',
  trueMoneyPhone: '089-170-1050',
  trueMoneyGiftUrl: 'https://gift.truemoney.com/campaign/?v=thai_mod_support',
  kofiUrl: 'https://ko-fi.com/thaigamemod',
  targetGoal: 10000,
  currentGoalAmount: 6450,
  goalTitle: 'กองทุนสนับสนุนค่ากาแฟและเซิร์ฟเวอร์แปลเกม (By Loli is My Life)',
};

export const INITIAL_DONOR_MESSAGES: DonorMessage[] = [
  {
    id: 'd1',
    name: 'พี่เสือสายฟาร์ม',
    amount: 300,
    message: 'ขอบคุณสำหรับมอด Stardew Valley มากครับ เล่นกับครอบครัวสนุกขึ้นเยอะเลย เป็นกำลังใจให้นะครับ!',
    gameSupported: 'Stardew Valley',
    timestamp: 'เมื่อวานนี้ 21:14',
    isVerified: true,
  },
  {
    id: 'd2',
    name: 'คุณนนท์ NightCity',
    amount: 150,
    message: 'ซับ Cyberpunk แปลได้อารมณ์มาก สำนวนลื่นไหลสุดๆ ขอเลี้ยงกาแฟ 3 แก้วครับ',
    gameSupported: 'Cyberpunk 2077',
    timestamp: '2 วันที่แล้ว',
    isVerified: true,
  },
  {
    id: 'd3',
    name: 'TarnishedNoob',
    amount: 500,
    message: 'คำแปล Elden Ring คือที่สุด ยอมใจคนแปล Lore มาก ละเอียดระดับตำรา ขอบคุณที่ทำมอดฟรีดีๆ แบบนี้',
    gameSupported: 'Elden Ring',
    timestamp: '4 วันที่แล้ว',
    isVerified: true,
  },
  {
    id: 'd4',
    name: 'ผู้ไม่ประสงค์ออกนาม',
    amount: 50,
    message: 'สนับสนุนเล็กๆ น้อยๆ นะครับ ขอให้มีกำลังใจแปลเกมต่อไปเรื่อยๆ ครับผม',
    timestamp: '5 วันที่แล้ว',
    isVerified: false,
  },
];

export const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 'w1',
    title: 'Black Myth: Wukong (ไซอิ๋ว กำเนิดวานร)',
    originalTitle: 'Black Myth: Wukong',
    genre: 'Action RPG',
    votes: 384,
    votedByMe: false,
    requestedBy: 'Community',
    reason: 'เนื้อเรื่องและบทกวีลึกซึ้ง ถ้ามีซับไตเติลภาษาไทยจะเข้าใจตำนานจีนและบทพูดของเทพได้ลึกซึ้งยิ่งขึ้น',
  },
  {
    id: 'w2',
    title: 'Hades II (ฮาเดส 2)',
    originalTitle: 'Hades II',
    genre: 'Rogue-like Action',
    votes: 295,
    votedByMe: false,
    requestedBy: 'MelinoeFan',
    reason: 'ภาคแรกแปลได้ดีมาก อยากให้มีแปลไทยภาค 2 รองรับเทพีองค์ใหม่และระบบคาถา',
  },
  {
    id: 'w3',
    title: 'Silent Hill 2 Remake',
    originalTitle: 'Silent Hill 2 Remake',
    genre: 'Psychological Horror',
    votes: 241,
    votedByMe: false,
    requestedBy: 'JamesSunderland',
    reason: 'จดหมายและบันทึกทางจิตวิทยาในเมืองสายหมอก อยากอ่านภาษาไทยเพื่อรับรู้ความสิ้นหวังของเจมส์',
  },
  {
    id: 'w4',
    title: 'Persona 3 Reload',
    originalTitle: 'Persona 3 Reload',
    genre: 'JRPG',
    votes: 188,
    votedByMe: false,
    requestedBy: 'GekkoukanHigh',
    reason: 'บทสนทนาชีวิตวัยรุ่นและ Social Link มีปริมาณเยอะมาก แปลไทยจะช่วยให้อินขึ้นเยอะมาก',
  },
];

export const FAQ_DATA = [
  {
    question: 'มอดภาษาไทยนี้ดาวน์โหลดฟรีจริงหรือไม่ มีการเรียกเก็บเงินไหม?',
    answer: 'มอดทุกเกมในเว็บไซต์นี้เปิดให้ดาวน์โหลดและใช้งานฟรี 100% ไม่มีระบบปิดกั้นการเข้าถึง การโดเนทเป็นไปตามความสมัครใจของแฟนเกมเพื่อเป็นกำลังใจและค่าใช้จ่ายของทีมงานแปลเท่านั้น',
  },
  {
    question: 'ติดตั้งมอดแล้วจะโดนแบนจาก Steam หรือ Epic Games ไหม?',
    answer: 'สำหรับเกมเล่นคนเดียว (Single Player) จะไม่มีการแบนแน่นอน 100% ส่วนเกมที่มีระบบออนไลน์ร่วมด้วย (เช่น Elden Ring) ทางทีมงานจะระบุคำแนะนำและวิธีเล่นผ่านโหมดออฟไลน์หรือมอดเซิร์ฟเวอร์เฉพาะเสมอ เพื่อความปลอดภัยสูงสุดของผู้เล่น',
  },
  {
    question: 'หากลงมอดแล้วภาษาในเกมไม่เปลี่ยนเป็นภาษาไทย ต้องแก้ไขอย่างไร?',
    answer: '1. ตรวจสอบเวอร์ชันของตัวเกมว่าตรงกับที่มอดรองรับหรือไม่\n2. เช็กโฟลเดอร์ที่นำไฟล์ไปวางว่าถูกต้องตามคู่มือการติดตั้งหรือไม่\n3. เข้าไปดูในเมนู Settings > Audio/Language ของตัวเกมว่ามีตัวเลือกภาษาไทยให้กดสลับหรือไม่\n4. ลองกด Verify integrity of game files แล้วลงมอดใหม่อีกครั้ง',
  },
  {
    question: 'สามารถลงมอดบนเครื่องคอนโซลหรือ Steam Deck ได้ไหม?',
    answer: 'บนเครื่อง Steam Deck (Desktop Mode) สามารถลงมอดได้เหมือนพีซีเกือบทุกเกม สำหรับคอนโซลอย่าง Nintendo Switch หรือเครื่องแปลงบางรุ่น สามารถลงมอดได้หากเกมนั้นๆ รองรับ LayeredFS โดยทางเราจะระบุไว้ที่รายละเอียดของแต่ละมอด',
  },
];
