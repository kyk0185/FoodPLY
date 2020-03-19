const data = [
    {
        key: 1,
        uri: 'https://www.sisaweek.com/news/photo/201512/58799_39887_2259.jpg',
        name: 'BBQ',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.1km',
        collection: 'chicken',
        foodData: [{
            key: 1,
            uri: 'https://i.pinimg.com/originals/32/0b/85/320b85477eccbd3ec891e69942b50729.png',
            name: '양념치킨',
            ref: '콜라(245ml)제공,토마토와 칠리...',
            pee: 17900
        }, {
            key: 2,
            uri: 'https://www.bhc.co.kr/upload/bhc/menu/410_0022_%EB%8B%AD%EB%8B%A4%EB%A6%AC%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C(0).jpg',
            name: '후라이드',
            ref: '콜라(245ml)제공,바삭함 속에 감...',
            pee: 17900
        }, {
            key: 3,
            uri: 'https://i.pinimg.com/736x/40/28/94/40289415e3f10d4218586a596e251534.jpg',
            name: '간장치킨',
            ref: '콜라(245ml)제공,마늘과 간장의...',
            pee: 18900
        }]
    },
    {
        key: 2,
        uri: 'https://img.hankyung.com/photo/201912/99.11408081.1.jpg',
        name: '교촌치킨',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.5km',
        collection: 'chicken'
    },
    {
        key: 3,
        uri: 'https://www.theborn.co.kr/wp-content/uploads/2017/06/%ED%99%8D%EC%BD%A9.jpg',
        name: '북경루',
        type: '배달팁: 무료',
        pee: '최소 주문금액: 1,500원',
        location: '1.1km',
        collection: 'ramen'
    },
    {
        key: 4,
        uri: 'https://www.hotelrestaurant.co.kr/data/photos/20180205/art_15175330519518_43b250.bmp',
        name: '토담',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.1km',
        collection: 'rice'
    },
    {
        key: 5,
        uri: 'https://t1.daumcdn.net/liveboard/dailylife/4efc5ab6d41c42fca9ce7ea96c990343.png',
        name: '공차',
        type: '배달팁: 무료(10,000원 이상)',
        pee: '최소 주문금액: 1,0000원',
        location: '5km',
        collection: 'coffee',
        foodData: [{
            key: 1,
            uri: 'https://img2.tmon.kr/cdn3/deals/2020/02/08/1539481602/1539481602_front_2ee90_fc191.jpg',
            name: '블랙 밀크티',
            ref: '진한 향과 맛을 느낄 수 있는 블랙티(홍차)와 밀크의 만남',
            pee: 4000
        }, {
            key: 2,
            uri: 'https://www.gong-cha.co.kr/uploads/product/20200107/6fgx2kKsC70cQFNH_20200107.png',
            name: '딸기&요구르트 크러쉬 ',
            ref: '얼그레이티로 만든 딸기,피나콜라다 크러쉬에 리얼 과즙 딸기 쥬얼리를 더한 음료입니다.',
            pee: 5500
        }, {
            key: 3,
            uri: 'https://www.gong-cha.co.kr/uploads/product/20180102/MxdE3F9Wt7cvfnRU_20180102.jpg',
            name: '제주 그린티 스무디',
            ref: '녹차가루와 부드러운 밀크폼을 함께 즐길 수 있는 제주 그린티 스무디',
            pee: 5300
        }]
    },
    {
        key: 6,
        uri: 'https://i.ytimg.com/vi/W1w5c4RrZ8g/hqdefault.jpg',
        name: '돈까스 클럽',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 11,000원',
        location: '2.1km',
        collection: 'rice'
    },
    {
        key: 7,
        uri: 'https://freshdon.com/wp-content/uploads/2017/09/K-006.jpg',
        name: '생생돈까스',
        type: '배달팁: 무료(11,000원 이상)',
        pee: '최소 주문금액: 10,000원',
        location: '3.1km',
        collection: 'rice'
    },
    {
        key: 8,
        uri: 'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20181106100048_photo1_e0419d9ef174.jpg',
        name: '홍콩반점',
        type: '배달팁: 무료(11,000원 이상)',
        pee: '최소 주문금액: 9,000원',
        location: '10.1km',
        collection: 'ramen'
    },
    {
        key: 9,
        uri: 'https://dtd31o1ybbmk8.cloudfront.net/photos/ba1b1c1b8c7f1c3475980282a46e4fa5/thumb.jpg',
        name: '스타벅스',
        type: '배달팁: 무료(13,000원 이상)',
        pee: '최소 주문금액: 9,000원',
        location: '2.1km',
        collection: 'coffee'
    },
    {
        key: 10,
        uri: 'https://www.menupan.com/common/service/img_proxy.asp?src=http%3A%2F%2Fblogfiles.naver.net%2F20150917_92%2F77770309_1442497114658XOnvv_JPEG%2FIMG_8756.JPG',
        name: '불고기 브라더스',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 15,000원',
        location: '5.1km',
        collection: 'rice'
    },
    {
        key: 11,
        uri: 'https://i.pinimg.com/originals/ae/b3/b7/aeb3b787a4ff4e4fcc764f568a28ab13.jpg',
        name: '리춘시장',
        type: '배달팁: 없음',
        pee: '최소 주문금액: 18,000원',
        location: '10km',
        collection: 'ramen'
    },
    {
        key: 12,
        uri: 'https://www.sisaweek.com/news/photo/201509/52460_33993_1423.jpg',
        name: '메이징에이',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 19,000원',
        location: '5km',
        collection: 'ramen'
    },
    {
        key: 13,
        uri: 'https://www.futurekorea.co.kr/news/photo/201909/120814_122058_2951.jpg',
        name: '이디야',
        type: '배달팁: 무료(25,000원 이상)',
        pee: '최소 주문금액: 10,000원',
        location: '1.2km',
        collection: 'coffee'
    },
    {
        key: 14,
        uri: 'https://file.mk.co.kr/meet/neds/2019/03/image_readtop_2019_182038_15535795603684193.jpg',
        name: '커피베이',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 12,000원',
        location: '6km',
        collection: 'coffee'
    },
    {
        key: 15,
        uri: 'https://img.hankyung.com/photo/201908/15671310291567131029_pabw_origin.jpg',
        name: 'BHC',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 13,000원',
        location: '3km',
        collection: 'chicken'
    },
    {
        key: 16,
        uri: 'https://t1.daumcdn.net/liveboard/ziptoss/f83acdd638e041d5bca4bcbf48adef23.JPG',
        name: '네네치킨',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 15,000원',
        location: '2km',
        collection: 'chicken'
    }
]

export default data