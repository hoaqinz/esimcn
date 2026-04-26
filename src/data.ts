export type Plan = {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  priceUsd: number;
  priceVnd: string;
  validity: string;
  dataAllowance: string;
  coverage: string;
  speed: string;
  hotspot: string;
  delivery: string;
  idealFor: string;
  highlights: string[];
  cities: string[];
  groups?: string[];
  catalogGroup?: 'mainland' | 'combo' | 'regional' | 'daily';
  catalogSource?: 'static' | 'esimaccess';
  packageCode?: string;
  dataType?: number;
  supportTopUpType?: number;
  fupPolicy?: string;
  ipExport?: string;
  googleAccess?: boolean;
  tiktokPreferred?: boolean;
  operators?: string[];
  locations?: string[];
  periodRequired?: boolean;
  durationDays?: number;
  hiddenFromCatalog?: boolean;
  sourcePriceUsd?: number;
  sourcePriceVnd?: string;
  priceOverrideVnd?: number | null;
  priceOverrideNote?: string | null;
  priceOverrideUpdatedAt?: string | null;
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  updatedAt: string;
  updatedLabel: string;
  readingTime: string;
  sections: ArticleSection[];
};

export type FeatureBlock = {
  title: string;
  copy: string;
};

export type Step = {
  title: string;
  copy: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const brand = {
  name: 'eSIM CN',
  domain: 'esimcn.net',
  supportEmail: 'support@esimcn.net',
  heroTitle: 'Chọn gói eSIM Trung Quốc phù hợp trước chuyến đi.',
  heroDescription:
    'Chọn gói theo số ngày và dung lượng cần dùng. Thanh toán xong là nhận QR qua email để cài trước chuyến đi.',
  primaryKeyword: 'esim china',
  alternateKeywords: ['china esim', 'esim trung quoc', 'mua esim trung quoc'],
};

export const serviceHighlights: FeatureBlock[] = [
  {
    title: 'Nhận QR nhanh',
    copy: 'Đặt gói xong là có thể nhận hướng dẫn cài đặt để sẵn sàng trước lúc lên máy bay.',
  },
  {
    title: 'Hỗ trợ tiếng Việt',
    copy: 'Khách cần tư vấn cách kích hoạt, đổi gói hoặc chọn data phù hợp đều có thể liên hệ để được hướng dẫn.',
  },
  {
    title: 'Dùng được ở nhiều thành phố',
    copy: 'Phù hợp cho hành trình Bắc Kinh, Thượng Hải, Quảng Châu, Thâm Quyến, Hong Kong và Macau.',
  },
  {
    title: 'Không cần tháo SIM chính',
    copy: 'Nếu máy hỗ trợ eSIM và đã được mở mạng, bạn có thể giữ SIM Việt Nam làm line chính.',
  },
];

export const plans: Plan[] = [
  {
    slug: 'china-esim-1gb-7-days',
    name: 'eSIM China 1GB / 7 ngày',
    shortLabel: 'Tiết kiệm',
    description:
      'Gói nhẹ cho khách đi ngắn ngày, quá cảnh hoặc chỉ cần maps, đặt xe, nhắn tin và tìm đường cơ bản.',
    priceUsd: 4.9,
    priceVnd: '119.000đ',
    validity: '7 ngày',
    dataAllowance: '1GB',
    coverage: 'Trung Quốc đại lục',
    speed: '4G / LTE',
    hotspot: 'Hỗ trợ trên máy tương thích',
    delivery: 'QR gửi nhanh',
    ipExport: 'HK',
    googleAccess: true,
    idealFor: 'Đi ngắn ngày, transit, công tác gấp',
    highlights: ['Giá dễ vào', 'Nhận QR nhanh', 'Dễ kích hoạt trước chuyến bay'],
    cities: ['Bắc Kinh', 'Thượng Hải', 'Quảng Châu', 'Thâm Quyến', 'Thành Đô'],
  },
  {
    slug: 'china-esim-3gb-15-days',
    name: 'eSIM China 3GB / 15 ngày',
    shortLabel: 'Bán chạy',
    description:
      'Gói cân bằng cho phần lớn khách du lịch và công tác, đủ data để xem bản đồ, dịch thuật, liên lạc và đặt xe hằng ngày.',
    priceUsd: 8.9,
    priceVnd: '219.000đ',
    validity: '15 ngày',
    dataAllowance: '3GB',
    coverage: 'Trung Quốc đại lục',
    speed: '4G / LTE',
    hotspot: 'Hỗ trợ trên máy tương thích',
    delivery: 'QR gửi nhanh',
    ipExport: 'HK',
    googleAccess: true,
    idealFor: 'Du lịch 1 đến 2 tuần, đi hội chợ, đi công tác',
    highlights: ['Tỷ lệ giá / data tốt', 'Dễ dùng cho chuyến đi phổ biến', 'Phù hợp nhiều loại lịch trình'],
    cities: ['Bắc Kinh', 'Thượng Hải', 'Hàng Châu', 'Quảng Châu', 'Nam Kinh', 'Thâm Quyến'],
  },
  {
    slug: 'china-esim-10gb-30-days',
    name: 'eSIM China 10GB / 30 ngày',
    shortLabel: 'Nhiều data',
    description:
      'Gói data lớn cho khách ở lâu, cần phát hotspot, làm việc từ xa hoặc đi nhiều thành phố trong 1 tháng.',
    priceUsd: 18.9,
    priceVnd: '459.000đ',
    validity: '30 ngày',
    dataAllowance: '10GB',
    coverage: 'Trung Quốc đại lục',
    speed: '4G / LTE',
    hotspot: 'Hỗ trợ trên máy tương thích',
    delivery: 'QR gửi nhanh',
    ipExport: 'HK',
    googleAccess: true,
    idealFor: 'Ở lâu, dùng data nhiều, phát wifi',
    highlights: ['Data rộng rãi hơn', 'Giá tốt theo từng GB', 'Phù hợp cho lịch trình dài ngày'],
    cities: ['Bắc Kinh', 'Thượng Hải', 'Tô Châu', 'Trùng Khánh', 'Quảng Châu', 'Thâm Quyến'],
  },
  {
    slug: 'greater-china-esim-20gb-30-days',
    name: 'eSIM Greater China 20GB / 30 ngày',
    shortLabel: 'Liên vùng',
    description:
      'Một eSIM cho hành trình kết hợp Trung Quốc đại lục, Hong Kong và Macau, giúp bạn không phải đổi gói khi di chuyển qua lại.',
    priceUsd: 29.9,
    priceVnd: '729.000đ',
    validity: '30 ngày',
    dataAllowance: '20GB',
    coverage: 'Trung Quốc, Hong Kong, Macau',
    speed: '4G / LTE',
    hotspot: 'Hỗ trợ trên máy tương thích',
    delivery: 'QR gửi nhanh',
    ipExport: 'HK',
    googleAccess: true,
    idealFor: 'Đi nhiều điểm, kết hợp đại lục và Hong Kong',
    highlights: ['Một gói cho 3 thị trường', 'Tiện cho lịch trình liên tỉnh', 'Phù hợp khách công tác'],
    cities: ['Bắc Kinh', 'Thượng Hải', 'Thâm Quyến', 'Hong Kong', 'Macau', 'Quảng Châu'],
  },
];

export const proofPoints: FeatureBlock[] = [
  {
    title: 'Trang bán hàng tập trung vào một nhu cầu',
    copy: 'Vào site là thấy ngay gói, giá, số ngày dùng và nút đặt mua.',
  },
  {
    title: 'Nhìn vào là biết nên chọn gói nào',
    copy: 'Mỗi gói có tag rõ: tiết kiệm, bán chạy, nhiều data và liên vùng.',
  },
  {
    title: 'Vận hành được ngay cả khi chưa nối cổng thanh toán',
    copy: 'Form đặt mua lưu đơn trực tiếp, đủ để chốt lead và xử lý thủ công ngay.',
  },
];

export const buyingSteps: Step[] = [
  {
    title: 'Chọn gói theo lịch trình',
    copy: 'Đi ngắn chọn gói nhẹ, đi 1 đến 2 tuần chọn gói cân bằng, ở lâu hoặc cần hotspot thì chọn gói data lớn hơn.',
  },
  {
    title: 'Điền thông tin và thanh toán',
    copy: 'Điền họ tên, email và số điện thoại để chuyển sang bước thanh toán.',
  },
  {
    title: 'Nhận QR qua email',
    copy: 'Nhận QR và hướng dẫn cài đặt để cài trước chuyến đi, tới nơi chỉ cần bật line data là dùng.',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Lan Anh',
    role: 'Du lịch Thượng Hải 8 ngày',
    quote: 'Nhận QR khá nhanh, cài trước khi bay nên tới nơi chỉ cần bật data là dùng.',
  },
  {
    name: 'Minh Khoa',
    role: 'Đi hội chợ Quảng Châu',
    quote: 'Cần maps và hotspot cho laptop nên tôi chọn gói 10GB. Dùng ổn và gọn hơn mua SIM vật lý.',
  },
  {
    name: 'Thùy Dương',
    role: 'Lịch trình Thâm Quyến - Hong Kong',
    quote: 'Gói liên vùng rất tiện vì đi qua lại 2 nơi mà không phải đổi SIM giữa chuyến đi.',
  },
];

export const faqs = [
  {
    question: 'Máy nào dùng được eSIM Trung Quốc?',
    answer:
      'Máy cần hỗ trợ eSIM và đã mở mạng. Nếu chưa chắc model có dùng được hay không, có thể nhắn để kiểm tra trước.',
  },
  {
    question: 'Có thể cài eSIM trước khi bay không?',
    answer:
      'Có. Cách tiện nhất là nhận QR rồi cài trước ở nhà, đến Trung Quốc mới bật line data để dùng.',
  },
  {
    question: 'eSIM có số điện thoại Trung Quốc không?',
    answer:
      'Phần lớn gói du lịch là gói data, không kèm số nghe gọi nội địa. Nếu cần số riêng để nhận cuộc gọi hoặc OTP, nên hỏi trước khi mua.',
  },
  {
    question: 'Có phát hotspot được không?',
    answer:
      'Phần lớn gói du lịch có hỗ trợ hotspot trên máy tương thích. Nếu định phát cho laptop hoặc dùng nhiều thiết bị, nên chọn gói data cao hơn một chút.',
  },
  {
    question: 'Đặt xong có được hỗ trợ nếu chưa biết kích hoạt không?',
    answer:
      'Có. Sau khi thanh toán sẽ có hướng dẫn cài đặt tiếng Việt để làm từng bước trước chuyến đi.',
  },
];

export const articles: Article[] = [
  {
    slug: 'nen-mua-esim-trung-quoc-goi-nao',
    title: 'Nên mua eSIM Trung Quốc gói nào để vừa tiết kiệm vừa dễ dùng?',
    description:
      'Hướng dẫn chọn gói eSIM China theo số ngày đi, mức độ dùng data và lộ trình thực tế của bạn.',
    excerpt:
      'Chọn đúng gói eSIM sẽ giúp bạn không mua thừa data nhưng vẫn đủ dùng cho maps, đặt xe, liên lạc và các app cần thiết trong suốt chuyến đi.',
    updatedAt: '2026-03-27',
    updatedLabel: '27/03/2026',
    readingTime: '6 phút đọc',
    sections: [
      {
        heading: 'Chọn theo lịch trình thật luôn dễ trúng hơn chọn theo cảm giác',
        paragraphs: [
          'Sai lầm phổ biến nhất là chỉ nhìn giá rồi chọn gói rẻ nhất. Với eSIM Trung Quốc, điều quan trọng hơn là bạn đi bao nhiêu ngày, dùng maps nhiều hay ít, có đặt xe thường xuyên không, có cần phát hotspot cho laptop hay không và có đi nhiều điểm trong cùng một chuyến hay không.',
          'Nếu chỉ đi 3 đến 5 ngày và chủ yếu dùng maps, nhắn tin, gọi xe, gói nhẹ thường đã đủ. Nếu đi 1 đến 2 tuần, nhóm gói cân bằng sẽ dễ dùng hơn vì đỡ phải canh từng GB. Nếu ở lâu hoặc cần internet ổn định để làm việc, nên nhìn sang gói nhiều data hoặc gói có thể mua thêm dung lượng trong quá trình sử dụng.',
        ],
        bullets: [
          'Đi ngắn ngày: ưu tiên gói tiết kiệm và dễ kích hoạt',
          'Đi 1 đến 2 tuần: ưu tiên gói cân bằng, đỡ áp lực canh data',
          'Đi lâu hoặc công tác: ưu tiên gói nhiều data hoặc gói có hỗ trợ nạp thêm',
        ],
      },
      {
        heading: 'Đừng chỉ nhìn dung lượng, hãy nhìn cả cách dùng app',
        paragraphs: [
          'Với nhiều khách đi Trung Quốc, nhu cầu thật không chỉ là có mạng. Họ cần Google Maps, Gmail, Translate, đặt xe, Facebook hoặc TikTok dùng ổn định trong lúc di chuyển. Vì vậy khi xem gói, nên nhìn rõ phần mô tả hỗ trợ ứng dụng chứ không chỉ nhìn giá.',
          'Nếu lịch trình phụ thuộc mạnh vào chỉ đường, dịch thuật và liên lạc nhanh, nên ưu tiên các gói đã được ghi rõ là phù hợp cho nhóm nhu cầu đó. Cách này thực tế hơn nhiều so với việc mua một gói thật rẻ rồi đến lúc dùng mới phát hiện trải nghiệm không đúng kỳ vọng.',
        ],
      },
      {
        heading: 'Cách chọn nhanh nếu bạn không muốn đọc quá nhiều',
        paragraphs: [
          'Nếu chưa biết bắt đầu từ đâu, cứ dùng logic đơn giản: đi ít ngày chọn gói nhẹ, đi 1 đến 2 tuần chọn gói cân bằng, đi lâu chọn gói data cao hơn. Nếu có cả Hong Kong hoặc Macau trong lịch trình, nên cân nhắc gói liên vùng để khỏi đổi gói giữa chuyến.',
          'Một website bán eSIM tốt không bắt khách đoán. Nó phải cho bạn nhìn rõ gói nào hợp với chuyến đi nào, gói nào có thể nạp thêm, và gói nào phù hợp hơn nếu bạn cần các app phổ biến dùng ổn định.',
        ],
      },
    ],
  },
  {
    slug: 'cach-cai-esim-trung-quoc-truoc-khi-bay',
    title: 'Cách cài eSIM Trung Quốc trước khi bay để đến nơi dùng ngay',
    description:
      'Quy trình cài và bật eSIM China đúng cách để đến sân bay là có mạng dùng ngay.',
    excerpt:
      'Cách nhanh nhất là cài profile trước, đặt tên line rõ ràng và bật line data khi đến Trung Quốc.',
    updatedAt: '2026-03-27',
    updatedLabel: '27/03/2026',
    readingTime: '6 phút đọc',
    sections: [
      {
        heading: 'Kiểm tra máy trước khi mua',
        paragraphs: [
          'Việc đầu tiên luôn là kiểm tra máy có hỗ trợ eSIM và đã mở mạng hay chưa. Nếu bỏ qua bước này, bạn có thể nghĩ rằng gói bị lỗi trong khi thực tế nguyên nhân nằm ở thiết bị.',
          'Chỉ cần chắc được hai việc đó, phần còn lại sẽ đơn giản hơn rất nhiều. Đây là bước nên làm trước cả khi so giá, vì giá tốt cũng không có ý nghĩa nếu máy không cài được.',
        ],
      },
      {
        heading: 'Nên cài profile trước ở Việt Nam, nhưng không cần bật line data ngay',
        paragraphs: [
          'Sau khi nhận QR, bạn có thể cài profile trước ở nhà, đặt tên line thật rõ như “eSIM Trung Quốc” để tránh nhầm với SIM chính. Làm vậy sẽ giúp bạn phát hiện sớm nếu có vướng ở bước cài đặt.',
          'Đến khi hạ cánh, bạn chỉ cần bật đúng line data và kiểm tra lại cài đặt dữ liệu di động. Cách làm này chủ động hơn nhiều so với việc đến nơi mới bắt đầu xử lý từng bước.',
        ],
      },
      {
        heading: 'Vì sao nên làm xong từ trước chuyến đi',
        paragraphs: [
          'Khách đi lần đầu thường chỉ thấy lợi ở việc “đỡ phải tìm SIM vật lý”, nhưng lợi lớn hơn là bạn sẽ có internet ngay khi cần gọi xe, xem bản đồ, nhắn cho khách sạn hoặc liên hệ người đón tại sân bay.',
          'Nếu để đến nơi mới cài, bất kỳ lỗi nhỏ nào cũng khiến bạn mất thời gian hơn nhiều. Với chuyến đi ngắn hoặc lịch trình sát giờ, xử lý trước vẫn là phương án an toàn nhất.',
        ],
      },
    ],
  },
  {
    slug: 'esim-trung-quoc-va-sim-vat-ly-khac-gi',
    title: 'eSIM Trung Quốc và SIM vật lý khác nhau ở điểm nào?',
    description:
      'So sánh nhanh giữa eSIM du lịch và SIM vật lý để bạn chọn đúng cách lên mạng cho chuyến đi.',
    excerpt:
      'Với nhiều người, lợi thế lớn nhất của eSIM không chỉ là giá, mà là sự chủ động trước khi hạ cánh.',
    updatedAt: '2026-03-27',
    updatedLabel: '27/03/2026',
    readingTime: '5 phút đọc',
    sections: [
      {
        heading: 'eSIM mạnh ở độ chủ động',
        paragraphs: [
          'Điểm mạnh lớn nhất của eSIM là bạn có thể xử lý xong phần data trước khi bay. Khi đến nơi, bật máy lên là có internet để tìm đường, đặt xe và liên lạc ngay.',
          'Với khách du lịch ngắn ngày hoặc khách công tác cần sự gọn gàng, eSIM thường hợp hơn vì không phải tháo SIM chính và không phải mất thời gian đi mua tại quầy.',
        ],
      },
      {
        heading: 'SIM vật lý vẫn có chỗ đứng riêng',
        paragraphs: [
          'SIM vật lý vẫn phù hợp với người cần số nội địa hoặc cần một giải pháp dùng dài hạn gắn với nhu cầu nghe gọi địa phương. Đây là điểm eSIM du lịch không phải lúc nào cũng thay thế hoàn toàn.',
          'Vì vậy cách chọn đúng không phải là hỏi cái nào “tốt hơn tuyệt đối”, mà là hỏi chuyến đi của bạn đang ưu tiên sự chủ động, sự tiện hay một nhu cầu rất cụ thể như số nội địa.',
        ],
      },
      {
        heading: 'Nếu mục tiêu là lên mạng ngay khi hạ cánh, eSIM thường hợp hơn',
        paragraphs: [
          'Với phần lớn khách du lịch và khách đi ngắn ngày, eSIM đủ để giải quyết đúng nhu cầu quan trọng nhất: có internet sớm, không rối thao tác và không phải thay SIM chính.',
          'Một website bán hàng nên nói rõ điểm này để khách chọn đúng ngay từ đầu, thay vì so sánh kiểu chung chung. Khi chọn đúng mục đích, trải nghiệm dùng sẽ tốt hơn nhiều.',
        ],
      },
    ],
  },
  {
    slug: 'esim-trung-quoc-co-dung-duoc-google-khong',
    title: 'eSIM Trung Quốc có dùng được Google, Gmail, Maps và TikTok không?',
    description:
      'Giải thích rõ việc dùng Google trên eSIM Trung Quốc, khi nào dùng được và nên chọn gói nào để đỡ rủi ro trước chuyến đi.',
    excerpt:
      'Đây là câu hỏi khách hỏi nhiều nhất trước khi mua. Không phải gói nào cũng cho trải nghiệm giống nhau, nên phải nhìn rõ mô tả hỗ trợ ứng dụng của từng gói.',
    updatedAt: '2026-04-05',
    updatedLabel: '05/04/2026',
    readingTime: '7 phút đọc',
    sections: [
      {
        heading: 'Khách hỏi nhiều nhất vẫn là: có dùng được Google với TikTok không?',
        paragraphs: [
          'Với khách đi Trung Quốc, chuyện có mạng chỉ là điều kiện đầu tiên. Điều họ thật sự quan tâm là có dùng được Google Maps, Gmail, Google Translate, Facebook và TikTok ổn định trong lúc di chuyển hay không.',
          'Đó cũng là lý do website của mình đang ưu tiên hiển thị rõ các gói phù hợp với nhóm nhu cầu này. Khách không nên phải tự đoán sau khi đã thanh toán.',
        ],
        bullets: [
          'Nếu cần Maps, Gmail và Translate: chọn gói có mô tả rõ hỗ trợ ứng dụng',
          'Nếu cần TikTok ổn định: ưu tiên gói có badge hoặc note hỗ trợ TikTok',
          'Nếu chỉ cần data cơ bản: có thể chọn gói nhẹ hơn để tiết kiệm',
        ],
      },
      {
        heading: 'Không nên mua chỉ theo dung lượng nếu app sử dụng mới là nhu cầu chính',
        paragraphs: [
          'Ví dụ cùng là 3GB hoặc 5GB nhưng trải nghiệm thực tế với khách cần chỉ đường, dịch thuật và xem thông tin nhanh có thể rất khác nếu gói đó không được mô tả rõ về nhóm ứng dụng hỗ trợ.',
          'Nếu bạn đi tự túc, cần chỉ đường liên tục, gọi xe, mở mail công việc hoặc cần dùng TikTok, hãy xem phần note của gói trước. Đây là chỗ đáng đọc hơn cả con số GB.',
        ],
      },
      {
        heading: 'Một số gói còn hỗ trợ mua thêm dung lượng nếu lịch trình kéo dài hơn dự kiến',
        paragraphs: [
          'Không phải gói nào cũng có tính năng này, nhưng với một số gói phù hợp, khách có thể mua thêm dung lượng trong quá trình sử dụng thay vì phải đổi sang một eSIM khác. Đây là điểm rất tiện nếu chuyến đi phát sinh hoặc mức dùng data thực tế cao hơn dự tính ban đầu.',
          'Cách an toàn nhất vẫn là chọn đúng gói ngay từ đầu. Nhưng nếu bạn là kiểu khách hay phát sinh lịch trình, nên ưu tiên những gói có ghi rõ là có thể nạp thêm để đỡ bị động.',
        ],
      },
      {
        heading: 'Kết luận ngắn gọn: muốn đỡ rủi ro, chọn gói đã được website chọn sẵn',
        paragraphs: [
          'Nếu mục tiêu của bạn là cài xong dùng được luôn cho Google, Gmail, Maps và TikTok, đừng chọn chỉ theo giá. Hãy ưu tiên các gói đã được website đánh dấu rõ cho nhóm nhu cầu đó.',
          'Cách này thực tế hơn, ít phải support hơn và cũng đúng với tinh thần của website: nhìn vào là biết gói nào hợp với mình, thay vì mua xong mới kiểm tra lại từng thứ.',
        ],
      },
    ],
  },
  {
    slug: 'mua-esim-trung-quoc-o-viet-nam-hay-den-noi-moi-mua',
    title: 'Nên mua eSIM Trung Quốc ở Việt Nam hay đến nơi rồi mới mua?',
    description:
      'So sánh hai cách mua phổ biến để biết thời điểm nào hợp lý hơn cho chuyến đi Trung Quốc, Hong Kong hoặc Macau.',
    excerpt:
      'Đa số khách du lịch ngắn ngày sẽ lợi hơn khi xử lý xong phần data trước lúc bay, thay vì tới nơi mới đi tìm quầy SIM hoặc tự mò gói phù hợp.',
    updatedAt: '2026-04-05',
    updatedLabel: '05/04/2026',
    readingTime: '6 phút đọc',
    sections: [
      {
        heading: 'Mua trước ở Việt Nam thường chủ động hơn',
        paragraphs: [
          'Nếu mua trước, bạn sẽ có thời gian kiểm tra máy, nhận QR, cài profile và lưu sẵn hướng dẫn. Khi hạ cánh chỉ cần bật đúng line data là có thể dùng ngay.',
          'Điều này đặc biệt quan trọng với khách cần internet ngay để gọi xe, mở bản đồ, liên lạc với khách sạn hoặc xử lý việc nhập cảnh và di chuyển nội địa.',
        ],
      },
      {
        heading: 'Đến nơi mới mua chỉ hợp khi bạn chấp nhận đổi lấy sự linh hoạt',
        paragraphs: [
          'Một số khách muốn tới nơi mới quyết định vì lịch trình chưa chốt hoặc chưa chắc mức dùng data. Cách này không sai, nhưng đổi lại là bạn phải dành thời gian tìm điểm bán, so gói, chờ hỗ trợ và xử lý ngay lúc đang cần internet nhất.',
          'Với khách đi ngắn ngày, phần thời gian và công sức mất đi thường lớn hơn nhiều so với chênh lệch giá giữa các gói phổ biến.',
        ],
        bullets: [
          'Đi công tác hoặc cần online ngay: nên mua trước',
          'Đi tự túc lần đầu: nên mua trước để giảm rủi ro',
          'Lịch trình chưa chốt và không gấp: có thể cân nhắc mua sau',
        ],
      },
      {
        heading: 'Nếu website đã chọn sẵn gói theo nhu cầu thì mua trước càng có lợi',
        paragraphs: [
          'Lợi thế của một website bán eSIM tốt là khách có thể nhìn thấy ngay nhóm gói theo ngày, gói trọn gói, gói hỗ trợ ứng dụng phổ biến và cả các gói có thể mua thêm dung lượng. Như vậy quyết định mua trước sẽ dễ hơn nhiều.',
          'Nói ngắn gọn: nếu bạn đã xác định được lịch trình và mục đích chuyến đi, mua trước ở Việt Nam gần như luôn là cách gọn hơn.',
        ],
      },
    ],
  },
  {
    slug: 'esim-trung-quoc-cho-iphone-can-luu-y-gi',
    title: 'Mua eSIM Trung Quốc cho iPhone cần lưu ý gì trước chuyến đi?',
    description:
      'Những điểm cần kiểm tra trên iPhone trước khi mua eSIM Trung Quốc để tránh lỗi cài đặt hoặc lỗi không kích hoạt được khi đã đến nơi.',
    excerpt:
      'Khách dùng iPhone thường nghĩ cứ có QR là cài được, nhưng thực tế vẫn cần kiểm tra model, khóa mạng và cách đặt line data cho đúng.',
    updatedAt: '2026-04-05',
    updatedLabel: '05/04/2026',
    readingTime: '6 phút đọc',
    sections: [
      {
        heading: 'Ba việc nên kiểm tra trước khi mua',
        paragraphs: [
          'Đầu tiên là iPhone có hỗ trợ eSIM hay không. Thứ hai là máy có bị khóa mạng hay không. Thứ ba là bạn đã sẵn sàng tách line chính và line data để lúc dùng không bị nhầm chưa.',
          'Ba bước này nghe đơn giản nhưng lại là nguyên nhân chính khiến nhiều khách nghĩ rằng eSIM có vấn đề. Thực tế đa số lỗi phát sinh đều nằm ở bước kiểm tra máy hoặc cài đặt line.',
        ],
        bullets: [
          'Kiểm tra mục eSIM trong cài đặt di động',
          'Kiểm tra tình trạng khóa mạng trước khi bay',
          'Đặt tên line rõ ràng: SIM chính và eSIM Trung Quốc',
        ],
      },
      {
        heading: 'Nên cài trước, nhưng chỉ bật data khi đến nơi',
        paragraphs: [
          'Cách làm an toàn là cài profile tại Việt Nam để chắc rằng QR hoạt động bình thường. Sau đó giữ line ở trạng thái chưa dùng data cho đến khi tới điểm đến.',
          'Nếu có vướng ở bước cài, bạn vẫn còn thời gian xử lý trước chuyến bay thay vì đứng ở sân bay rồi mới bắt đầu thử từng cách một.',
        ],
      },
      {
        heading: 'Nếu cần Google Maps, Gmail hoặc TikTok thì nên nhìn kỹ mô tả gói ngay từ đầu',
        paragraphs: [
          'Với khách dùng iPhone, phần cài đặt thường không khó bằng phần chọn nhầm gói. Nếu chuyến đi phụ thuộc nhiều vào Maps, Gmail, Translate hoặc TikTok, hãy ưu tiên gói có mô tả rõ phần hỗ trợ ứng dụng.',
          'iPhone cài được không có nghĩa là trải nghiệm dùng app nào cũng giống nhau. Chọn đúng gói từ đầu vẫn là bước quan trọng nhất.',
        ],
      },
    ],
  },
  {
    slug: 'di-hong-kong-macau-co-nen-mua-goi-lien-vung-khong',
    title: 'Đi Hong Kong và Macau có nên mua gói liên vùng không?',
    description:
      'Khi lịch trình có cả Trung Quốc đại lục, Hong Kong hoặc Macau, gói liên vùng thường tiện hơn việc tách nhiều gói nhỏ.',
    excerpt:
      'Đi nhiều điểm trong một chuyến là lúc gói liên vùng phát huy giá trị, vì bạn không phải đổi gói giữa hành trình.',
    updatedAt: '2026-04-05',
    updatedLabel: '05/04/2026',
    readingTime: '6 phút đọc',
    sections: [
      {
        heading: 'Gói liên vùng hợp nhất khi lịch trình di chuyển liên tục',
        paragraphs: [
          'Nếu bạn bay đến Hong Kong rồi sang Thâm Quyến, hoặc đi kết hợp Macau trong cùng chuyến, dùng một gói liên vùng thường gọn hơn nhiều so với việc mua rời từng nơi.',
          'Lợi ích rõ nhất là không phải đổi eSIM giữa chuyến, không phải theo dõi nhiều QR và không sợ đang di chuyển lại phải kiểm tra xem mình đang bật đúng gói nào.',
        ],
      },
      {
        heading: 'Không phải lúc nào cũng cần mua liên vùng',
        paragraphs: [
          'Nếu bạn chỉ ở một nơi trong suốt chuyến đi, gói chuyên cho đúng điểm đến vẫn có thể tiết kiệm hơn. Gói liên vùng chỉ thật sự đáng tiền khi nó giúp giảm thao tác và giảm rủi ro cho cả hành trình.',
          'Cách chọn đúng là nhìn vào số chặng thực tế, số lần đổi vùng và mức độ phụ thuộc vào internet khi đang di chuyển giữa các điểm.',
        ],
        bullets: [
          'Chỉ ở đại lục: chọn gói đại lục',
          'Chỉ ở Hong Kong hoặc Macau: chọn gói riêng đúng điểm đến',
          'Đi nhiều nơi trong một chuyến: ưu tiên gói liên vùng',
        ],
      },
      {
        heading: 'Nếu cần dùng app liên tục trên đường, gói liên vùng càng đáng giá',
        paragraphs: [
          'Khách đi nhiều chặng thường không chỉ cần có mạng, mà cần mạng có ngay lúc vừa qua biên, vừa xuống tàu hoặc vừa gọi xe. Trong tình huống đó, việc không phải đổi gói giữa chuyến có giá trị thực tế rất lớn.',
          'Nếu hành trình của bạn còn cần Google Maps, Gmail, TikTok hoặc các app phổ biến dùng ổn định, nên ưu tiên gói liên vùng đã được ghi mô tả rõ và dễ nhìn ngay từ trang bán hàng.',
        ],
      },
    ],
  },
  {
    slug: 'dang-ky-tour-son-hang-travel-nhan-uu-dai-esim',
    title: 'Đăng ký tour cùng Sơn Hằng Travel, nhận ưu đãi eSIM như thế nào?',
    description:
      'Giải thích rõ cách ưu đãi eSIM được áp dụng cho khách đăng ký tour cùng Sơn Hằng Travel và khi nào nên nhận gói tặng, khi nào nên nâng cấp thêm data.',
    excerpt:
      'Nếu đi theo tour, cách chọn eSIM sẽ khác một chút so với khách đi tự túc. Quan trọng nhất là biết mình được tặng gì, có đủ dùng không và khi nào nên nâng cấp thêm.',
    updatedAt: '2026-04-09',
    updatedLabel: '09/04/2026',
    readingTime: '5 phút đọc',
    sections: [
      {
        heading: 'Khách đi tour thường cần một phương án gọn, không phải tự mò lại từ đầu',
        paragraphs: [
          'Với khách đi tour, điều quan trọng không chỉ là có mạng. Họ cần một phương án đủ rõ để trước ngày khởi hành không phải ngồi so lại từng gói, từng số ngày và từng mức dung lượng một lần nữa.',
          'Vì vậy cách làm hợp lý là gắn luôn ưu đãi eSIM vào chương trình tour. Khi đó khách hiểu ngay mình được hỗ trợ ở mức nào, có cần mua thêm hay chỉ cần nhận QR và cài trước chuyến đi.',
        ],
      },
      {
        heading: 'Ưu đãi nên được hiểu là điểm cộng cho hành trình, không phải lời hứa chung chung',
        paragraphs: [
          'Có tour chỉ cần một mức data cơ bản để khách dùng maps, liên hệ và nhận thông tin đoàn. Có tour dài ngày hơn hoặc lịch trình di chuyển dày hơn thì mức tặng ban đầu có thể chưa đủ cho nhu cầu phát sinh thực tế.',
          'Nói rõ ngay từ đầu sẽ tốt hơn: khách được tặng eSIM hoặc được ưu đãi data theo chương trình phù hợp của từng hành trình. Nếu cần nhiều hơn, vẫn có thể chọn nâng cấp gói ngay trên website cho đúng cách dùng của mình.',
        ],
        bullets: [
          'Đi tour ngắn và dùng cơ bản: gói tặng thường đã đủ',
          'Đi dài ngày hoặc dùng nhiều app: nên xem thêm gói nâng cấp',
          'Muốn chủ động hơn: cài QR trước chuyến đi để tới nơi dùng luôn',
        ],
      },
      {
        heading: 'Cách kết hợp hợp lý nhất là để tour và eSIM bổ trợ cho nhau',
        paragraphs: [
          'Sơn Hằng Travel lo phần lịch trình, vé và trải nghiệm chuyến đi. eSIM CN lo phần kết nối để khách tới nơi có thể dùng mạng ngay cho bản đồ, liên lạc và các ứng dụng cần thiết. Hai phần này đi cùng nhau sẽ tạo cảm giác dịch vụ liền mạch hơn nhiều.',
          'Nếu đưa thông điệp này lên rõ trên website, khách sẽ dễ hiểu đây không phải hai bên rời nhau, mà là một hệ hỗ trợ chung cho cả hành trình.',
        ],
      },
    ],
  },
];
