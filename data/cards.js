/**
 * Map thẻ — cú pháp giống JSON (object literal).
 * Mở index.html trực tiếp (file://) vẫn chạy; không cần server.
 * correctAnswer: true = đáp án đúng là tín ngưỡng đúng đắn; false = mê tín dị đoan.
 * whyBelief / whySuperstition: giải thích cho popup sau khi trả lời (hai phía).
 */
window.CARDS_DATA = {
  cards: [
    {
      id: "card_1",
      title: "Lễ hội làng, đình làng, tế tổ tiên theo phong tục truyền thống",
      description:
        "Người dân tập trung tại đình làng, có ban tổ chức, không ép buộc đóng góp, không hứa \"cầu được ước thấy\" bằng tiền.",
      media: "media/card_1.mp4",
      difficulty: "easy",
      correctAnswer: false,
      explanation:
        "Đây là sinh hoạt văn hóa, tín ngưỡng truyền thống thường được pháp luật và cộng đồng công nhận khi tổ chức lành mạnh, minh bạch.",
      whyBelief:
        "Có tổ chức công khai, không dọa nạt hay bán \"linh nghiệm\" để vơ tiền — đúng bản chất sinh hoạt tín ngưỡng lành mạnh.",
      whySuperstition:
        "Nếu gắn mác mê tín thì không khớp: không có hứa hẹn phi lý, không ép đóng góp để \"giải họa\" — điển hình không phải mê tín dị đoan.",
    },
    {
      id: "card_2",
      title: "Thầy bói nói nhà có \"vong\" theo, yêu cầu nộp tiền triệu để \"giải\"",
      description:
        "Dọa tai họa nếu không làm lễ ngay, không cho gia đình suy nghĩ, yêu cầu chuyển khoản gấp.",
      media: "media/card_2.mp4",
      difficulty: "easy",
      correctAnswer: false,
      explanation:
        "Lợi dụng mê tín để chiếm đoạt tài sản, gây hoang mang — thuộc mê tín dị đoan, có dấu hiệu lừa đảo.",
      whyBelief:
        "Không phải tín ngưỡng chính đáng vì dùng nỗi sợ để moi tiền, không minh bạch — trái với sinh hoạt tín ngưỡng lành mạnh.",
      whySuperstition:
        "Dọa \"vong\", ép chuyển tiền gấp, không cho thời gian cân nhắc — đúng dấu hiệu mê tín dị đoan / lợi dụng tâm linh.",
    },
    {
      id: "card_3",
      title: "Đi lễ chùa dịp Tết, thắp hương, cầu bình an, không bị thu phí \"cứng\"",
      description:
        "Tự nguyện dâng hương hoa, giữ trật tự, không ai hứa chắc chắn \"đổi vận\" bằng tiền.",
      media: "media/card_3.mp4",
      difficulty: "easy",
      correctAnswer: true,
      explanation: "Hoạt động tín ngưỡng tôn giáo/tâm linh chính đáng, minh bạch, không ép buộc tài chính.",
      whyBelief:
        "Tự nguyện, trật tự, không bán chắc chắn \"đổi vận\" — phù hợp hoạt động tín ngưỡng/tôn giáo bình thường.",
      whySuperstition:
        "Không có dấu hiệu mê tín dị đoan: không dọa dẫm, không tính phí ép buộc để hứa hẹn phi lý.",
    },
    {
      id: "card_4",
      title: "Bán \"nước thánh\" chữa ung thư, cam kết khỏi bệnh trong 7 ngày",
      description:
        "Quảng cáo trên mạng, yêu cầu bỏ thuốc bệnh viện, chỉ uống nước họ bán.",
      media: "media/card_4.mp4",
      difficulty: "medium",
      correctAnswer: false,
      explanation:
        "Lừa đảo, gây hại sức khỏe — mê tín dị đoan, vi phạm pháp luật về khám chữa bệnh và quảng cáo.",
      whyBelief:
        "Không thể là tín ngưỡng chính đáng: hứa chữa bệnh hiểm nghèo bằng sản phẩm phi y học, bảo người bệnh bỏ điều trị.",
      whySuperstition:
        "Cam kết chữa ung thư trong 7 ngày, bỏ thuốy — điển hình mê tín dị đoan và có thể cấu thành hành vi lừa đảo.",
    },
    {
      id: "card_5",
      title: "Họp mặt cộng đồng cầu siêu, tưởng nhớ nạn nhân thiên tai",
      description:
        "Ban tổ chức công khai, không thu phí bất thường, mục đích chia sẻ, an ủi tinh thần.",
      media: "media/card_5.mp4",
      difficulty: "medium",
      correctAnswer: true,
      explanation: "Sinh hoạt tín ngưỡng nhân văn, hướng thiện, không lợi dụng tâm lý để trục lợi.",
      whyBelief:
        "Công khai, nhân văn, không thu phí bất thường — gần với nghi lễ tưởng niệm / tín ngưỡng lành mạnh.",
      whySuperstition:
        "Không có dọa nạt hay bán \"công đức\" — khó xếp vào mê tín dị đoan theo mô tả này.",
    },
    {
      id: "card_6",
      title: "\"Thầy\" online xem ảnh mặt là biết tang sự, đòi tiền gỡ họa",
      description: "Chat qua mạng, đoán mơ hồ áp vào nhiều người, luôn kết luận \"có vong\".",
      media: "media/card_6.mp4",
      difficulty: "medium",
      correctAnswer: false,
      explanation: "Chiêu trò chung chung, ép tài chính — điển hình mê tín dị đoan/lừa đảo.",
      whyBelief:
        "Không phải tín ngưỡng đúng đắn: kết luận áp đặt, moi tiền \"gỡ họa\" từ ảnh mặt — mang tính lừa đảo.",
      whySuperstition:
        "Kết luận mơ hồ áp dụng cho nhiều người, luôn \"có vong\", đòi tiền — mô hình mê tín dị đoan trực tuyến.",
    },
    {
      id: "card_7",
      title: "Lễ Giáng sinh trong nhà thờ, có chương trình công bố, tự nguyện tham dự",
      description:
        "Hoạt động tôn giáo đăng ký, không cấm cửa tín đồ khác, không thu tiền để \"mua ơn thánh\".",
      media: "media/card_7.mp4",
      difficulty: "medium",
      correctAnswer: true,
      explanation: "Sinh hoạt tôn giáo bình thường theo quy định pháp luật về tôn giáo.",
      whyBelief:
        "Hoạt động tôn giáo đăng ký, minh bạch, tự nguyện — thuộc tín ngưỡng/tôn giáo chính đáng.",
      whySuperstition:
        "Không có dấu hiệu bán \"ơn thánh\" hay ép tài chính — không đúng mô tả mê tín dị đoan.",
    },
    {
      id: "card_8",
      title: "Cho tiền để được \"phong\" làm trợ lý thần linh, hứa đổi đời",
      description: "Tuyển người qua livestream, cam kết thu nhập nếu làm theo nghi thức bí mật.",
      media: "media/card_8.mp4",
      difficulty: "hard",
      correctAnswer: false,
      explanation: "Biến tướng lừa đảo, kiểm soát tâm lý và tài chính — không phải tín ngưỡng chính đáng.",
      whyBelief:
        "Không phải tín ngưỡng: mua danh \"trợ lý thần linh\", hứa đổi đời bằng tiền — là lợi dụng tâm linh trục lợi.",
      whySuperstition:
        "Thu tiền để \"phong chức\" thần thánh, hứa thu nhập — điển hình mê tín dị đoan / đa cấp tinh thần.",
    },
    {
      id: "card_9",
      title: "Cúng rằm, giỗ họ trong gia đình, không công khai hứa \"linh nghiệm\"",
      description: "Tập tục tưởng nhớ, giáo dục con cháu hiếu thảo, không bán dịch vụ \"cầu cơ\".",
      media: "media/card_9.mp4",
      difficulty: "hard",
      correctAnswer: true,
      explanation: "Tín ngưỡng dân gian, gắn đạo lý gia đình — khác với mê tín vụ lợi.",
      whyBelief:
        "Nghi thức gia đình, tưởng nhớ, không bán dịch vụ cầu cơ — phù hợp tín ngưỡng dân gian lành mạnh.",
      whySuperstition:
        "Không hứa linh nghiệm để thu tiền — không mang tính mê tín dị đoan theo mô tả.",
    },
    {
      id: "card_10",
      title: "Xem bói chọn ngày cưới — chỉ gợi ý, không đòi tiền \"giải hạn\"",
      description:
        "Phí dịch vụ rõ ràng, không dọa \"ly hôn\" hay \"tang chế\" nếu không làm lễ thêm.",
      media: "media/card_10.mp4",
      difficulty: "hard",
      correctAnswer: true,
      explanation:
        "Ranh giới mỏng: nếu chỉ là tục lệ, không ép tài chính và không dọa dẫm thì gần với sinh hoạt văn hóa; khi có dọa nạt, thu tiền \"giải\" thì trở thành mê tín. Ở đây mô tả lành mạnh nên chọn tín ngưỡng/tập quán chính đáng.",
      whyBelief:
        "Phí rõ ràng, không dọa hậu quả nếu không làm thêm lễ — trong mô tả này gần với tập quán/tín ngưỡng lành mạnh.",
      whySuperstition:
        "Nếu có dọa \"ly hôn/tang chế\" và thu tiền giải hạn thì mới rõ mê tín; ở đây không có các dấu hiệu đó.",
    },
  ],
};
