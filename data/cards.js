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
      title: "Hành động tôn thờ các vị thần địa phương",
      description:
        "người dân tập hợp tại đền chùa và tổ chức múa và sinh hoạt",
      media: "media/card_1.mp4",
      difficulty: "easy",
      correctAnswer: false,
      explanation:
        "Đây là hành vi mê tín dị đoan cho rằng các vị thần địa phương có tồn tại và nhập thể vào con người",
      whyBelief:
        "Có tổ chức công khai, không dọa nạt hay bán \"linh nghiệm\" để vơ tiền — đúng bản chất sinh hoạt tín ngưỡng lành mạnh.",
      whySuperstition:
        "Nếu gắn mác mê tín thì không khớp: không có hứa hẹn phi lý, không ép đóng góp để \"giải họa\" — điển hình không phải mê tín dị đoan.",
    },
    {
      id: "card_2",
      title: "Hoạt động tu tập văn hóa địa phương để cùng nhau chiêu mời những vị thần và sùng bái họ",
      description:
        "Đám đông tập trung nhảy múa để cầu mùa màng bội thu",
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
    title: "Sự xuất hiện của người tự xưng được trời chọn để dẫn dắt và ban phát phúc lành cho bá tánh",
    description:
    "Buổi truyền giảng diễn ra công khai khi một người đàn ông tuyên bố mình chính là Tôn Ngộ Không hạ phàm để cứu độ người dân.",
    media: "media/card_3.mp4",
    difficulty: "easy",
    correctAnswer: false,
    explanation:
    "Đây là biểu hiện của mê tín dị đoan khi một cá nhân tự nhận mình là nhân vật thần thoại có quyền năng siêu nhiên nhằm tạo niềm tin và ảnh hưởng đến người khác.",
    whyBelief:
    "Không phải tín ngưỡng chính đáng vì nội dung dựa trên việc một cá nhân tự xưng là thần thánh hoặc nhân vật huyền thoại hạ phàm để dẫn dắt con người.",
    whySuperstition:
    "Tự nhận là Tôn Ngộ Không chuyển thế và có khả năng cứu độ, ban phúc là dấu hiệu điển hình của mê tín dị đoan, dễ gây hoang mang và tạo niềm tin mù quáng.",
    },
    {
id: "card_4",
title: "Buổi liên lạc tâm linh với người cõi âm được tổ chức vào ban đêm",
description:
"Một nhóm người ngồi quanh bàn, đặt tay lên tấm bảng cầu cơ và liên tục hỏi chuyện các linh hồn để xin lời chỉ dẫn.",
media: "media/card_4.mp4",
difficulty: "medium",
correctAnswer: false,
explanation:
"Cầu cơ là hoạt động mang tính mê tín dị đoan vì tin rằng có thể giao tiếp trực tiếp với linh hồn hoặc thế lực siêu nhiên để nhận lời tiên đoán.",
whyBelief:
"Không phải tín ngưỡng chính đáng vì dựa trên niềm tin giao tiếp với linh hồn nhằm xin thông tin, dự đoán hoặc can thiệp vào đời sống thực tế.",
whySuperstition:
"Tin rằng linh hồn điều khiển bàn cầu cơ và đưa ra lời phán là biểu hiện phổ biến của mê tín dị đoan.",
},

{
id: "card_5",
title: "Đại lễ cúng sao giải hạn quy mô lớn nhằm hấp thụ năng lượng vũ trụ",
description:
"Người tham gia mang theo danh sách họ tên, ngày sinh và ví tiền với niềm tin càng cúng nhiều thì sao xấu càng né mình ra xa.",
media: "media/card_5.mp4",
difficulty: "medium",
correctAnswer: false,
explanation:
"Hoạt động lợi dụng niềm tin tâm linh để khiến mọi người tin rằng có thể dùng nghi lễ hoặc tiền bạc nhằm thay đổi vận hạn.",
whyBelief:
"Không còn là tín ngưỡng đơn thuần khi nghi lễ bị gắn với việc bỏ tiền để đổi vận hoặc xóa bỏ tai họa cá nhân.",
whySuperstition:
"Tin rằng chỉ cần cúng sao và đóng tiền là có thể né vận xui, đổi số mệnh là biểu hiện điển hình của mê tín dị đoan.",
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
