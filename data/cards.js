/**
 * Map thẻ — cú pháp giống JSON (object literal).
 * Mở index.html trực tiếp (file://) vẫn chạy; không cần server.
 * correctAnswer: true = đáp án đúng là tín ngưỡng đúng đắn; false = mê tín dị đoan.
 * whyBelief / whySuperstition: giải thích cho popup sau khi trả lời (hai phía).
 */
window.CARDS_DATA = {
  cards: [
    // ============================================================
    // TÌNH HUỐNG VIDEO (có file media thực)
    // ============================================================
    {
      id: "card_1",
      title: "Hành động tôn thờ các vị thần địa phương",
      description:
        "Người dân tập hợp tại đền chùa và tổ chức múa và sinh hoạt",
      media: "media/card_1.mp4",
      difficulty: "easy",
      correctAnswer: false,
      whyBelief:
        "Có tổ chức công khai, không dọa nạt hay bán \"linh nghiệm\" để vơ tiền — đúng bản chất sinh hoạt tín ngưỡng lành mạnh.",
      whySuperstition:
        "Hành vi nhập đồng, nhập thể thần linh vào con người mang tính mê muội, không có cơ sở khoa học và dễ bị lợi dụng trục lợi.",
    },
    {
      id: "card_2",
      title: "Hoạt động tu tập văn hóa địa phương chiêu mời thần linh",
      description:
        "Đám đông tập trung nhảy múa để cầu mùa màng bội thu",
      media: "media/card_2.mp4",
      difficulty: "easy",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng chính đáng vì dùng nỗi sợ để moi tiền, không minh bạch — trái với sinh hoạt tín ngưỡng lành mạnh.",
      whySuperstition:
        "Dọa \"vong\", ép chuyển tiền gấp, không cho thời gian cân nhắc — đúng dấu hiệu mê tín dị đoan / lợi dụng tâm linh.",
    },
    {
      id: "card_3",
      title: "Sự xuất hiện của người tự xưng được trời chọn để dẫn dắt bá tánh",
      description:
        "Buổi truyền giảng diễn ra công khai khi một người đàn ông tuyên bố mình chính là Tôn Ngộ Không hạ phàm để cứu độ người dân.",
      media: "media/card_3.mp4",
      difficulty: "easy",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng chính đáng vì nội dung dựa trên việc một cá nhân tự xưng là thần thánh hạ phàm để dẫn dắt con người.",
      whySuperstition:
        "Tự nhận là Tôn Ngộ Không chuyển thế và có khả năng cứu độ là dấu hiệu điển hình của mê tín dị đoan, gây hoang mang và niềm tin mù quáng.",
    },
    {
      id: "card_4",
      title: "Buổi liên lạc tâm linh với người cõi âm",
      description:
        "Một nhóm người ngồi quanh bàn, đặt tay lên tấm bảng cầu cơ và liên tục hỏi chuyện các linh hồn để xin lời chỉ dẫn.",
      media: "media/card_4.mp4",
      difficulty: "medium",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng chính đáng vì dựa trên niềm tin giao tiếp với linh hồn nhằm xin thông tin, dự đoán hoặc can thiệp vào đời sống thực tế.",
      whySuperstition:
        "Tin rằng linh hồn điều khiển bàn cầu cơ và đưa ra lời phán là biểu hiện phổ biến của mê tín dị đoan.",
    },
    {
      id: "card_5",
      title: "Đại lễ cúng sao giải hạn quy mô lớn",
      description:
        "Người tham gia mang theo danh sách họ tên, ngày sinh và ví tiền với niềm tin càng cúng nhiều thì sao xấu càng né mình ra xa.",
      media: "media/card_5.mp4",
      difficulty: "medium",
      correctAnswer: false,
      whyBelief:
        "Không còn là tín ngưỡng đơn thuần khi nghi lễ bị gắn với việc bỏ tiền để đổi vận hoặc xóa bỏ tai họa cá nhân.",
      whySuperstition:
        "Tin rằng chỉ cần cúng sao và đóng tiền là có thể né vận xui, đổi số mệnh là biểu hiện điển hình của mê tín dị đoan.",
    },

    // ============================================================
    // TÌNH HUỐNG HÌNH ẢNH — TÍN NGƯỠNG LÀNH MẠNH
    // ============================================================
    {
      id: "card_s1",
      title: "Ngày giỗ ông bà trong gia đình",
      description:
        "Cả gia đình quây quần, dọn mâm cỗ tươm tất, thắp nhang tưởng nhớ ông bà, con cháu học lễ nghĩa hiếu thảo — không mời thầy cúng thu tiền, không hứa \"linh nghiệm\".",
      poster: "media/img_tho_to_tien.jpg",
      difficulty: "easy",
      correctAnswer: true,
      whyBelief:
        "Nghi thức gia đình, tưởng nhớ tổ tiên, dạy con cháu biết ơn — phù hợp tín ngưỡng dân gian lành mạnh, không có yếu tố trục lợi.",
      whySuperstition:
        "Không hứa linh nghiệm, không thu tiền, không ép buộc — hoàn toàn không mang dấu hiệu mê tín dị đoan.",
    },
    {
      id: "card_s2",
      title: "Lễ hội rước kiệu Thành hoàng làng",
      description:
        "Dân làng tổ chức rước kiệu hàng năm, có sự cấp phép của chính quyền địa phương, tự nguyện tham gia, không thu phí để \"được thần phù hộ\".",
      poster: "media/img_le_hoi.jpg",
      difficulty: "easy",
      correctAnswer: true,
      whyBelief:
        "Lễ hội truyền thống được tổ chức công khai, có phép, không ép tài chính — đúng bản chất sinh hoạt tín ngưỡng cộng đồng lành mạnh.",
      whySuperstition:
        "Không có yếu tố dọa nạt, không thu tiền mua \"phước lộc\" — không phải mê tín dị đoan.",
    },
    {
      id: "card_s3",
      title: "Đi chùa cầu an đầu năm",
      description:
        "Minh và gia đình đến chùa lễ Phật đầu xuân, thành tâm dâng hương, không mua xăm bói, không thuê ai cúng giải hạn — chỉ cầu bình an cho năm mới.",
      poster: "media/img_di_chua.jpg",
      difficulty: "easy",
      correctAnswer: true,
      whyBelief:
        "Hành vi sinh hoạt tôn giáo/tín ngưỡng bình thường, tự nguyện, không gắn với giao dịch tiền bạc để mua phước — hoàn toàn lành mạnh.",
      whySuperstition:
        "Không hứa hẹn kết quả cụ thể nếu cúng tiền, không dọa nạt — không mang tính mê tín dị đoan.",
    },
    {
      id: "card_s4",
      title: "Lễ ăn hỏi theo phong tục địa phương",
      description:
        "Hai gia đình tổ chức lễ ăn hỏi với tráp trầu cau, bánh phu thê theo tập tục — không cần thầy cúng thu tiền triệu để \"hợp tuổi\", chỉ theo nghi lễ văn hóa truyền thống.",
      poster: "media/img_cuoi_hoi.jpg",
      difficulty: "medium",
      correctAnswer: true,
      whyBelief:
        "Tập tục văn hóa hôn nhân lành mạnh, tôn trọng truyền thống, không gắn với ép tài chính hay hứa hẹn may rủi phi lý.",
      whySuperstition:
        "Không có thầy phán \"hợp / không hợp\" thu tiền triệu, không dọa điều xấu xảy ra nếu không làm — không phải mê tín.",
    },
    {
      id: "card_s5",
      title: "Thờ phụng anh hùng liệt sĩ tại đình làng",
      description:
        "Xã tổ chức lễ tưởng niệm liệt sĩ hàng năm, thắp hương, đọc tên — miễn phí, tự nguyện, tôn vinh người có công với đất nước.",
      poster: "media/img_tho_liet_si.jpg",
      difficulty: "medium",
      correctAnswer: true,
      whyBelief:
        "Tín ngưỡng thờ anh hùng dân tộc là nét đẹp truyền thống được pháp luật Việt Nam công nhận và bảo vệ (trang 216).",
      whySuperstition:
        "Không gắn với mua bán 'phước lộc', không dọa dẫm — hoàn toàn phù hợp tín ngưỡng dân gian chính đáng.",
    },
    {
      id: "card_s6",
      title: "Cúng rằm tháng Bảy (Vu Lan)",
      description:
        "Gia đình bà Lan sắm đồ cúng, mời hàng xóm cùng dâng hương, nghe sư thầy giảng đạo hiếu — không ai phải trả tiền để \"mua\" phước cho người âm.",
      poster: "media/img_cung_vu_lan.jpg",
      difficulty: "hard",
      correctAnswer: true,
      whyBelief:
        "Lễ Vu Lan tưởng nhớ cha mẹ, thực hành đạo hiếu — tín ngưỡng dân gian kết hợp Phật giáo lành mạnh, không trục lợi.",
      whySuperstition:
        "Không hứa hẹn người âm được siêu thoát nếu nộp tiền, không ép đốt vàng mã số lượng lớn — không mang tính mê tín.",
    },
    {
      id: "card_s13",
      title: "Lễ hội Katê của đồng bào Chăm",
      description:
        "Đồng bào Chăm mặc trang phục truyền thống, ca múa nhạc dân gian dâng cúng thần linh tại tháp Po Klong Garai để cầu bình an và tưởng nhớ tổ tiên — sinh hoạt văn hóa dân tộc công khai, tự nguyện.",
      poster: "media/img_le_hoi_kate.jpg",
      difficulty: "easy",
      correctAnswer: true,
      whyBelief:
        "Lễ hội dân tộc đặc sắc, tôn vinh tổ tiên và thần linh bảo hộ, tổ chức công khai văn minh — tín ngưỡng lành mạnh.",
      whySuperstition:
        "Không có yếu tố dọa nạt rủi ro, không thu tiền mua phước giải tai ương — không phải mê tín dị đoan.",
    },
    {
      id: "card_s15",
      title: "Nghi lễ cúng trăng (Ok Om Bok) cầu mùa",
      description:
        "Đồng bào Khmer tổ chức cúng trăng vào rằm tháng Mười âm lịch, dâng sản vật nông nghiệp (cốm dẹt, chuối) cầu thời tiết thuận lợi, kết hợp đua ghe ngo vui tươi — tự nguyện, phi thương mại.",
      poster: "media/img_cung_trang.jpg",
      difficulty: "hard",
      correctAnswer: true,
      whyBelief:
        "Nghi lễ nông nghiệp truyền thống, tạ ơn thiên nhiên, thắt chặt tình đoàn kết cộng đồng Khmer — tín ngưỡng dân gian lành mạnh.",
      whySuperstition:
        "Không hứa hẹn đổi số mệnh cá nhân, không có yếu tố dọa dẫm trục lợi tài chính — hoàn toàn không phải mê tín.",
    },
    {
      id: "card_s17",
      title: "Thắp hương tại ban thờ Phật bản mệnh tại nhà",
      description:
        "Chị H. đặt bức tượng Phật nhỏ tại góc bàn làm việc, thắp hương trầm tĩnh lặng vào buổi tối để thư giãn tinh thần và nhắc nhở bản thân làm điều thiện — không cầu tài lộc phi lý.",
      poster: "media/img_phat_ban_menh.jpg",
      difficulty: "easy",
      correctAnswer: true,
      whyBelief:
        "Hướng thiện, tìm bình an tinh thần, không đòi hỏi đổi vận phi lý — tín ngưỡng lành mạnh.",
      whySuperstition:
        "Không dọa nạt, không tốn tiền cúng bái giải hạn — không phải mê tín.",
    },
    {
      id: "card_s19",
      title: "Lễ hội cầu ngư (thờ Cá Ông) miền Trung",
      description:
        "Ngư dân ven biển miền Trung tổ chức lễ hội cúng Cá Ông (cá voi), cầu trời yên biển lặng, tạ ơn biển cả đã chở che và giúp đánh bắt thuận lợi — sinh hoạt văn hóa dân gian truyền thống.",
      poster: "media/img_le_hoi_cau_ngu.jpg",
      difficulty: "hard",
      correctAnswer: true,
      whyBelief:
        "Nghi lễ thờ cúng ngư nghiệp lâu đời, bày tỏ lòng biết ơn thiên nhiên và tổ tiên, gắn kết cộng đồng miền biển — tín ngưỡng lành mạnh.",
      whySuperstition:
        "Không mang tính dọa nạt để tống tiền, không bắt buộc đóng góp lớn vì vụ lợi — không phải mê tín.",
    },
    {
      id: "card_s21",
      title: "Thắp hương tại đền thờ danh nhân lịch sử",
      description:
        "Học sinh lớp 12 đến thắp hương tại đền thờ cụ Chu Văn An trước kỳ thi để bày tỏ lòng kính trọng với người thầy tiêu biểu của nước nhà, lấy động lực ôn thi học tập.",
      poster: "media/img_chu_van_an.jpg",
      difficulty: "easy",
      correctAnswer: true,
      whyBelief:
        "Thờ cúng danh nhân có công với đất nước là nét đẹp đạo lý 'uống nước nhớ nguồn' — tín ngưỡng lành mạnh.",
      whySuperstition:
        "Không cúng tiền triệu để đổi điểm thi, không có dọa nạt — hoàn toàn không phải mê tín.",
    },

    // ============================================================
    // TÌNH HUỐNG HÌNH ẢNH — MÊ TÍN DỊ ĐOAN
    // ============================================================
    {
      id: "card_s7",
      title: "Thầy cúng 'trị bệnh' thay thế bệnh viện",
      description:
        "Bé 8 tuổi sốt cao 3 ngày, gia đình không đưa đi khám mà mời thầy cúng về làm lễ trừ tà suốt đêm. Thầy phán do \"vong ám\" và yêu cầu mâm lễ 5 triệu đồng.",
      poster: "media/img_thay_boi.jpg",
      difficulty: "easy",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng đúng đắn vì thay thế y tế bằng nghi lễ không có cơ sở, gây nguy hiểm tính mạng và thu tiền từ nỗi sợ.",
      whySuperstition:
        "Phán bệnh là do vong, thu tiền mâm lễ, không khuyến nghị đi viện — điển hình mê tín dị đoan gây hại sức khỏe.",
    },
    {
      id: "card_s8",
      title: "Bán 'nước thánh' chữa ung thư",
      description:
        "Ông H. quảng cáo trên mạng bán chai nước đã được \"thần ban phép\" giá 2 triệu/chai, cam kết chữa khỏi ung thư giai đoạn cuối trong 30 ngày.",
      poster: "media/img_nuoc_thanh.jpg",
      difficulty: "easy",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng đúng đắn vì dùng tên thần linh để bán sản phẩm với lời cam kết chữa bệnh phi khoa học, lừa đảo người bệnh.",
      whySuperstition:
        "Bán vật phẩm \"thần ban\" với cam kết chữa bách bệnh, thu tiền từ tuyệt vọng của người bệnh — điển hình mê tín dị đoan / lừa đảo.",
    },
    {
      id: "card_s9",
      title: "Livestream 'phong thần' nhận đệ tử",
      description:
        "Tài khoản TikTok 500k follow livestream nghi lễ \"phong\" người xem làm \"đệ tử thần linh\", yêu cầu chuyển khoản từ 500.000đ để nhận \"ngọc phù\" bảo vệ cả năm.",
      poster: "media/img_lua_dao_online.jpg",
      difficulty: "medium",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng vì lợi dụng nền tảng số để bán \"danh hiệu\" tâm linh, thu tiền qua chuyển khoản — hoàn toàn trục lợi.",
      whySuperstition:
        "Thu tiền để \"phong\" danh hiệu thần linh qua livestream, hứa bảo vệ bằng vật phẩm — mê tín dị đoan biến tướng thời công nghệ số.",
    },
    {
      id: "card_s10",
      title: "Mua bùa đảm bảo trúng số",
      description:
        "Bà T. chi 3 triệu mua \"bùa trúng số\" từ thầy phong thủy với cam kết \"100% trúng đề trong tháng\". Thầy hứa hoàn tiền nếu không trúng nhưng không có hợp đồng.",
      poster: "media/img_bua_trung_so.jpg",
      difficulty: "medium",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng lành mạnh vì hứa hẹn kết quả cụ thể (trúng số) bằng vật phẩm tâm linh thu tiền — hoàn toàn trục lợi.",
      whySuperstition:
        "Cam kết trúng số bằng bùa chú, thu tiền không có hợp đồng — điển hình mê tín dị đoan / lừa đảo tài chính.",
    },
    {
      id: "card_s11",
      title: "Nhóm 'nhân điện' phán bệnh qua ảnh",
      description:
        "Hội nhóm Facebook 200.000 thành viên, admin nhận ảnh chân dung rồi phán bệnh từ xa, yêu cầu chuyển tiền mua gói \"điều trị nhân điện\" 5–10 triệu đồng.",
      poster: "media/img_nhan_dien.jpg",
      difficulty: "hard",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng vì tuyên bố chữa bệnh từ xa qua ảnh và thu tiền — hoàn toàn không có cơ sở khoa học và mang tính lừa đảo.",
      whySuperstition:
        "Chẩn đoán và \"điều trị\" bệnh qua ảnh, thu tiền triệu — điển hình mê tín dị đoan công nghệ số, vi phạm pháp luật về hành nghề y.",
    },
    {
      id: "card_s12",
      title: "Bùa yêu online 'đảm bảo' lấy lại người yêu",
      description:
        "Trang web quảng cáo dịch vụ \"bùa yêu\" giá 2 triệu, cam kết người yêu cũ quay lại trong 7 ngày. Thanh toán trước, không hoàn tiền nếu thất bại.",
      poster: "media/img_bua_yeu.jpg",
      difficulty: "hard",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng đúng đắn: dùng tên tâm linh để bán dịch vụ với cam kết phi thực tế, thu tiền từ cảm xúc tổn thương của người khác.",
      whySuperstition:
        "Cam kết \"đảm bảo\" kết quả tình cảm bằng bùa chú, không hoàn tiền — mê tín dị đoan biến tướng, trục lợi từ nỗi đau cá nhân.",
    },
    {
      id: "card_s14",
      title: "Thuê dịch vụ 'di căn hoán số' đổi mệnh",
      description:
        "Gia đình ông Q. chi 100 triệu đồng thuê nhóm thầy pháp làm lễ cúng 'di căn hoán số' để chuyển bệnh tật từ người cha sang một con búp bê thế thân, thầy hứa chắc chắn sẽ khỏi bệnh.",
      poster: "media/img_di_can_hoan_so.jpg",
      difficulty: "medium",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng vì hứa hẹn thay đổi số mệnh và trị bệnh bằng hình thức phi khoa học (búp bê thế thân) để lấy khoản tiền lớn.",
      whySuperstition:
        "Tin vào việc tráo đổi số mệnh qua búp bê, thu tiền khủng từ sự hoang mang của gia đình người bệnh — điển hình mê tín dị đoan gây hại tài chính.",
    },
    {
      id: "card_s16",
      title: "Bán bùa 'đỗ đạt' kỳ thi quốc gia",
      description:
        "Một tài khoản ẩn danh rao bán 'bùa trạng nguyên' giá 1 triệu đồng trên các hội nhóm học sinh, cam kết 100% học sinh đeo bùa sẽ đỗ đại học nguyện vọng 1 mà không cần học bài.",
      poster: "media/img_bua_do_dat.jpg",
      difficulty: "easy",
      correctAnswer: false,
      whyBelief:
        "Lợi dụng kỳ thi và tâm lý lo lắng của học sinh để bán sản phẩm tâm linh, cam kết kết quả học tập phi lý — trục lợi rõ ràng.",
      whySuperstition:
        "Tin rằng bùa giấy có thể thay thế học tập và đảm bảo đỗ đại học — mê tín dị đoan đánh vào nỗi sợ trượt thi của học sinh.",
    },
    {
      id: "card_s18",
      title: "Mua 'gói thần số học' cam kết thay đổi vận mệnh",
      description:
        "Một trang mạng dụ dỗ bà M. mua gói báo cáo Thần số học giá 5 triệu đồng với lời hứa hẹn 'chỉ cần đổi tên theo tần số rung động là chắc chắn giàu sang, hóa giải mọi bệnh tật'.",
      poster: "media/img_than_so_hoc.jpg",
      difficulty: "medium",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng vì hứa hẹn thay đổi số phận và sức khỏe chắc chắn bằng tên gọi để bán gói dịch vụ tâm linh.",
      whySuperstition:
        "Cam kết chắc chắn đổi vận, giàu sang và chữa bệnh thông qua việc đổi tên, thu tiền triệu — biểu hiện mê tín dị đoan / lừa đảo.",
    },
    {
      id: "card_s20",
      title: "Thầy bói phán 'hạn tam tai' bắt làm lễ trùng tang",
      description:
        "Thầy bói hù dọa chị V. năm nay gặp hạn tam tai, nếu không nộp 30 triệu đồng làm lễ giải hạn 'trùng tang' thì gia đình sẽ có người qua đời trong tháng.",
      poster: "media/img_le_giai_han.jpg",
      difficulty: "hard",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng vì dùng nỗi sợ hãi cái chết của người thân để ép buộc thực hiện nghi lễ và thu tiền lớn.",
      whySuperstition:
        "Hù dọa chết chóc, bắt nộp khoản tiền lớn làm lễ giải hạn tâm linh — biểu hiện cực đoan, lừa đảo của mê tín dị đoan.",
    },
    {
      id: "card_s22",
      title: "Dịch vụ 'vật phẩm phong thủy' khai quang đắc lộc",
      description:
        "Một cửa hàng online bán chiếc vòng đá giá gốc 50.000đ với giá 2 triệu đồng, quảng cáo vòng đã được 'khai quang, trì chú' cam kết người đeo chắc chắn sẽ thăng chức trong tuần.",
      poster: "media/img_vong_phong_thuy.jpg",
      difficulty: "medium",
      correctAnswer: false,
      whyBelief:
        "Không phải tín ngưỡng vì thần thánh hóa một vật phẩm bình thường để thổi giá và hứa hẹn kết quả thăng tiến sự nghiệp phi lý.",
      whySuperstition:
        "Thần thánh hóa quá đà, cam kết thăng chức chắc chắn bằng vật phẩm đeo tay để trục lợi kinh tế — mê tín dị đoan trục lợi.",
    },

    // ============================================================
    // CÂU HỎI LÝ THUYẾT (ABCD)
    // ============================================================
    {
      id: "theory_1",
      type: "theory",
      difficulty: "easy",
      title: "Định nghĩa Tôn giáo",
      description: "Theo Giáo trình CNXHKH, tôn giáo được định nghĩa là một hình thái nào?",
      options: [
        "A. Hình thái ý thức chính trị của xã hội.",
        "B. Hình thái tổ chức kinh tế đặc thù.",
        "C. Hình thái ý thức xã hội phản ánh hư ảo.",
        "D. Hình thái cấu trúc xã hội nguyên thủy."
      ],
      correctAnswer: "C",
      explanation: "Theo giáo trình (trang 214), tôn giáo là một hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan vào đầu óc con người."
    },
    {
      id: "theory_2",
      type: "theory",
      difficulty: "easy",
      title: "Bản chất Tôn giáo",
      description: "Bản chất của tôn giáo là phản ánh hiện thực khách quan một cách như thế nào?",
      options: [
        "A. Phản ánh một cách khoa học và chính xác.",
        "B. Phản ánh một cách trực quan và sinh động.",
        "C. Phản ánh một cách biện chứng và thực tế.",
        "D. Phản ánh một cách hư ảo và xuyên tạc."
      ],
      correctAnswer: "D",
      explanation: "Bản chất tôn giáo (trang 216) là một hiện tượng xã hội phản ánh hiện thực khách quan một cách hư ảo, duy tâm."
    },
    {
      id: "theory_3",
      type: "theory",
      difficulty: "easy",
      title: "Yếu tố cấu thành",
      description: "Đâu KHÔNG phải là một yếu tố cấu thành nên một tôn giáo hoàn chỉnh theo giáo trình?",
      options: [
        "A. Hệ thống giáo thuyết và lễ nghi.",
        "B. Cơ sở thờ tự và hệ thống tín đồ.",
        "C. Tổ chức nhân sự quản lý giáo hội.",
        "D. Các bài bói toán phương Tây hiện đại."
      ],
      correctAnswer: "D",
      explanation: "5 yếu tố cấu thành tôn giáo gồm: Đấng siêu nhiên, Giáo lý/Giáo luật, Cơ sở thờ tự, Tổ chức (Giáo hội), Tín đồ (trang 215). Bói toán không thuộc các yếu tố này."
    },
    {
      id: "theory_4",
      type: "theory",
      difficulty: "medium",
      title: "Nguồn gốc Nhận thức",
      description: "Sự tuyệt đối hóa, cường điệu mặt chủ thể của nhận thức con người sẽ dẫn đến điều gì?",
      options: [
        "A. Nhận thức khoa học chân chính.",
        "B. Thần thánh hóa các hiện tượng.",
        "C. Phát triển tư duy logic biện chứng.",
        "D. Xóa bỏ hoàn toàn các tôn giáo cũ."
      ],
      correctAnswer: "B",
      explanation: "Trong nguồn gốc nhận thức (trang 217), sự cường điệu mặt chủ thể nhận thức khiến con người thần thánh hóa các hiện tượng chưa giải thích được."
    },
    {
      id: "theory_5",
      type: "theory",
      difficulty: "medium",
      title: "Tín ngưỡng Việt Nam",
      description: "Việc thờ cúng tổ tiên và các anh hùng dân tộc ở Việt Nam được xếp vào hình thức nào?",
      options: [
        "A. Tôn giáo quốc tế.",
        "B. Tín ngưỡng truyền thống.",
        "C. Mê tín dị đoan.",
        "D. Giáo phái cực đoan."
      ],
      correctAnswer: "B",
      explanation: "Thờ cúng tổ tiên, Thành hoàng, anh hùng dân tộc là nét đẹp tín ngưỡng truyền thống lành mạnh của người Việt (trang 216)."
    },
    {
      id: "theory_6",
      type: "theory",
      difficulty: "medium",
      title: "Ranh giới Niềm tin",
      description: "Điểm khác biệt cốt lõi giữa tín ngưỡng lành mạnh và mê tín dị đoan là gì?",
      options: [
        "A. Số lượng người tham gia hành lễ công khai.",
        "B. Số tiền chi trả cho các dịch vụ đi kèm.",
        "C. Tính chất cực đoan và tác hại xã hội.",
        "D. Công nghệ được sử dụng để hành lễ."
      ],
      correctAnswer: "C",
      explanation: "Mê tín dị đoan mang tính mê muội, cuồng tín, gây ra hành vi cực đoan, vi phạm pháp luật và gây hại xã hội (trang 217)."
    },
    {
      id: "theory_7",
      type: "theory",
      difficulty: "hard",
      title: "Biến đổi Tôn giáo",
      description: "Theo chủ nghĩa Mác - Lênin, tôn giáo sẽ thay đổi và biến đổi theo sự thay đổi của yếu tố nào?",
      options: [
        "A. Theo sở thích của các tầng lớp giáo sĩ.",
        "B. Theo sự phát triển của các loại vũ khí.",
        "C. Theo sự biến đổi của cơ sở kinh tế.",
        "D. Theo các trào lưu nghệ thuật đương đại."
      ],
      correctAnswer: "C",
      explanation: "Tôn giáo thuộc kiến trúc thượng tầng, do đó sẽ biến đổi theo sự biến đổi của cơ sở kinh tế (hạ tầng vật chất) (trang 218)."
    },
    {
      id: "theory_8",
      type: "theory",
      difficulty: "hard",
      title: "Điểm chung Lý luận",
      description: "Điểm chung giữa tín ngưỡng và tôn giáo theo giáo trình CNXHKH là gì?",
      options: [
        "A. Đều có hệ thống giáo hội chặt chẽ toàn cầu.",
        "B. Đều chứa đựng niềm tin vào điều linh thiêng.",
        "C. Đều bị pháp luật nghiêm cấm hoạt động.",
        "D. Đều ra đời từ khi công nghệ AI xuất hiện."
      ],
      correctAnswer: "B",
      explanation: "Cả tín ngưỡng và tôn giáo đều chứa đựng niềm tin vào điều thiêng liêng, hướng thiện và cầu che chở (trang 216)."
    },
    {
      id: "theory_9",
      type: "theory",
      difficulty: "hard",
      title: "Biến tướng Niềm tin",
      description: "Hành vi lợi dụng niềm tin tâm linh để trục lợi kinh tế, lừa đảo được gọi là gì?",
      options: [
        "A. Hoạt động tín ngưỡng lành mạnh.",
        "B. Nghiên cứu văn hóa dân gian.",
        "C. Nghiêm túc thực hành tôn giáo.",
        "D. Biến tướng mê tín dị đoan."
      ],
      correctAnswer: "D",
      explanation: "Biến tướng mê tín dị đoan (trang 217) lợi dụng lòng tin để trục lợi, làm lệch lạc văn hóa và vi phạm pháp luật."
    },
    {
      id: "theory_10",
      type: "theory",
      difficulty: "hard",
      title: "Quyền Tự do",
      description: "Quyền tự do tín ngưỡng, tôn giáo của công dân phải luôn đi kèm với điều kiện nào?",
      options: [
        "A. Phải đóng thuế đầy đủ cho các cơ sở thờ tự.",
        "B. Phải tuân thủ các quy định của pháp luật.",
        "C. Phải tham gia tất cả các ngày lễ hội lớn.",
        "D. Phải từ bỏ hoàn toàn tư duy khoa học hiện đại."
      ],
      correctAnswer: "B",
      explanation: "Tự do tín ngưỡng, tôn giáo (trang 220-221) phải đi đôi với tuân thủ Hiến pháp và pháp luật, không lợi dụng để chống phá."
    },
    {
      id: "theory_11",
      type: "theory",
      difficulty: "easy",
      title: "Tình huống gieo quẻ AI",
      description: "Ứng dụng AI gieo quẻ phán Điềm Điềm sẽ gặp họa lớn, yêu cầu nộp tiền mua gói \"thanh tẩy năng lượng xấu\".",
      options: [
        "A. Mê tín dị đoan.",
        "B. Tín ngưỡng lành mạnh.",
        "C. Cả 2 đều đúng"
      ],
      correctAnswer: "A",
      explanation: "Đây là biểu hiện của mê tín dị đoan công nghệ số: dùng thuật toán dọa nạt rủi ro và ép buộc đóng tiền để giải họa (trang 217)."
    },
    {
      id: "theory_12",
      type: "theory",
      difficulty: "medium",
      title: "Tình huống Tarot online",
      description: "Kiều Kiều nghe Tarot online giải mã tính cách để hiểu bản thân hơn, không phụ thuộc vào kết quả.",
      options: [
        "A. Mê tín dị đoan.",
        "B. Tín ngưỡng lành mạnh. (Lưu ý: Mang tính giải trí/chiêm nghiệm tinh thần không cuồng tín)",
        "C. Cả 2 đều đúng"
      ],
      correctAnswer: "B",
      explanation: "Xem Tarot chỉ mang tính giải trí, chiêm nghiệm bản thân lành mạnh và không phụ thuộc mù quáng vào kết quả thì được xem là một sinh hoạt tinh thần lành mạnh."
    },
    {
      id: "theory_13",
      type: "theory",
      difficulty: "hard",
      title: "Tình huống thầy bói phán",
      description: "An An thi trượt đại học, thầy bói phán do hướng nhà xấu và bắt gia đình phải vay tiền mua đất đổi nhà.",
      options: [
        "A. Mê tín dị đoan.",
        "B. Tín ngưỡng lành mạnh.",
        "C. Cả 2 đều đúng"
      ],
      correctAnswer: "A",
      explanation: "Dùng chuyện xui xẻo để phán xét nguyên nhân phi lý và thúc ép gia đình vay mượn đổi nhà là hành vi trục lợi, mê tín dị đoan gây hại gia đình (trang 217)."
    }
  ],
};
