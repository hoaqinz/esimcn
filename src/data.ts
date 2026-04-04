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
      'Chọn đúng gói eSIM sẽ giúp bạn không mua thừa data, nhưng vẫn đủ dùng cho maps, đặt xe, liên lạc và hotspot.',
    updatedAt: '2026-03-27',
    updatedLabel: '27/03/2026',
    readingTime: '5 phút đọc',
    sections: [
      {
        heading: 'Đúng nhất vẫn là chọn theo lịch trình thật',
        paragraphs: [
          'Nếu bạn chỉ đi 3 đến 5 ngày, gói nhỏ sẽ hợp hơn. Nếu đi 1 đến 2 tuần, gói 3GB thường là để cân bằng chi phí và trải nghiệm sử dụng.',
          'Với khách ở lâu hoặc cần phát hotspot cho laptop, gói 10GB hoặc gói liên vùng sẽ hợp lý hơn nhiều.',
        ],
        bullets: [
          'Đi ngắn ngày: ưu tiên gói tiết kiệm',
          'Đi 1 đến 2 tuần: ưu tiên gói cân bằng',
          'Đi lâu hoặc công tác: ưu tiên gói nhiều data',
        ],
      },
      {
        heading: 'Không nên nhìn giá mà bỏ qua cách dùng',
        paragraphs: [
          'Giá rẻ nhất không có nghĩa là hợp nhất. Nếu mua gói quá nhỏ, bạn có thể phải bổ sung hoặc bị hụt data quá nhanh vì maps, dịch thuật và video call.',
          'Trang bán hàng tốt là trang giúp khách nhìn rõ đối tượng phù hợp cho từng gói, không bắt khách đoán.',
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
    readingTime: '4 phút đọc',
    sections: [
      {
        heading: 'Kiểm tra máy trước khi mua',
        paragraphs: [
          'Máy phải hỗ trợ eSIM và đã mở mạng. Đây là bước quan trọng nhất vì nếu máy không hỗ trợ thì gói data tốt đến đâu cũng không dùng được.',
        ],
      },
      {
        heading: 'Cài profile trước chuyến bay',
        paragraphs: [
          'Sau khi nhận QR, bạn có thể cài profile trước, đặt tên để dễ nhận biết và giữ line chính gọn gàng.',
          'Khi đến nơi, chỉ cần bật line data đúng cách là có thể sử dụng ngay mà không phải tìm điểm bán SIM vật lý.',
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
    readingTime: '4 phút đọc',
    sections: [
      {
        heading: 'eSIM mạnh ở độ chủ động',
        paragraphs: [
          'Bạn có thể xử lý xong phần data trước khi bay, đến nơi bật máy lên là có internet để tìm đường, đặt xe và liên lạc.',
          'SIM vật lý vẫn có lợi thế riêng với người cần số nội địa, nhưng đối với khách du lịch ngắn ngày thì eSIM thường gọn hơn.',
        ],
      },
      {
        heading: 'Nên chọn theo mục đích chuyến đi',
        paragraphs: [
          'Nếu cần online ngay, không muốn thay SIM và ưu tiên sự tiện lợi, eSIM là lựa chọn hợp lý.',
          'Nếu cần một giải pháp dài hạn gắn với số nội địa, SIM vật lý có thể phù hợp hơn. Trang bán hàng cần nói rõ điều này để tránh kỳ vọng sai.',
        ],
      },
    ],
  },
];
