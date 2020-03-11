const data = [
    {
        key: 1,
        uri: 'https://pds.joins.com/news/component/htmlphoto_mmdata/201903/08/52cf07ea-c8da-4574-b0e9-21e0e3b31118.jpg',
        name: 'BBQ',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.1km',
        collection: '치킨'
    },
    {
        key: 2,
        uri: 'https://img.hankyung.com/photo/201912/99.11408081.1.jpg',
        name: '교촌치킨',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.5km',
        collection: '치킨'
    },
    {
        key: 3,
        uri: 'https://www.theborn.co.kr/wp-content/uploads/2017/06/%ED%99%8D%EC%BD%A9.jpg',
        name: '북경루',
        type: '배달팁: 무료',
        pee: '최소 주문금액: 1,500원',
        location: '1.1km',
        collection: '중식'
    },
    {
        key: 4,
        uri: 'https://www.hotelrestaurant.co.kr/data/photos/20180205/art_15175330519518_43b250.bmp',
        name: '토담',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.1km',
        collection: '한식'
    },
    {
        key: 5,
        uri: 'https://t1.daumcdn.net/liveboard/dailylife/4efc5ab6d41c42fca9ce7ea96c990343.png',
        name: '공차',
        type: '배달팁: 무료(10,000원 이상)',
        pee: '최소 주문금액: 1,0000원',
        location: '5km',
        collection: '카페'
    },
    {
        key: 6,
        uri: 'https://i.ytimg.com/vi/W1w5c4RrZ8g/hqdefault.jpg',
        name: '돈까스 클럽',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 11,000원',
        location: '2.1km',
        collection: '한식'
    },
    {
        key: 7,
        uri: 'https://freshdon.com/wp-content/uploads/2017/09/K-006.jpg',
        name: '생생돈까스',
        type: '배달팁: 무료(11,000원 이상)',
        pee: '최소 주문금액: 10,000원',
        location: '3.1km',
        collection: '한식'
    },
    {
        key: 8,
        uri: 'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20181106100048_photo1_e0419d9ef174.jpg',
        name: '홍콩반점',
        type: '배달팁: 무료(11,000원 이상)',
        pee: '최소 주문금액: 9,000원',
        location: '10.1km',
        collection: '중식'
    },
    {
        key: 9,
        uri: 'https://dtd31o1ybbmk8.cloudfront.net/photos/ba1b1c1b8c7f1c3475980282a46e4fa5/thumb.jpg',
        name: '스타벅스',
        type: '배달팁: 무료(13,000원 이상)',
        pee: '최소 주문금액: 9,000원',
        location: '2.1km',
        collection: '카페'
    },
    {
        key: 10,
        uri: 'https://www.menupan.com/common/service/img_proxy.asp?src=http%3A%2F%2Fblogfiles.naver.net%2F20150917_92%2F77770309_1442497114658XOnvv_JPEG%2FIMG_8756.JPG',
        name: '불고기 브라더스',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 15,000원',
        location: '5.1km',
        collection: '한식'
    },
    {
        key: 11,
        uri: 'https://i.pinimg.com/originals/ae/b3/b7/aeb3b787a4ff4e4fcc764f568a28ab13.jpg',
        name: '리춘시장',
        type: '배달팁: 없음',
        pee: '최소 주문금액: 18,000원',
        location: '10km',
        collection: '중식'
    },
    {
        key: 12,
        uri: 'https://www.sisaweek.com/news/photo/201509/52460_33993_1423.jpg',
        name: '메이징에이',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 19,000원',
        location: '5km',
        collection: '중식'
    },
    {
        key: 13,
        uri: 'https://www.futurekorea.co.kr/news/photo/201909/120814_122058_2951.jpg',
        name: '이디야',
        type: '배달팁: 무료(25,000원 이상)',
        pee: '최소 주문금액: 10,000원',
        location: '1.2km',
        collection: '카페'
    },
    {
        key: 14,
        uri: 'https://file.mk.co.kr/meet/neds/2019/03/image_readtop_2019_182038_15535795603684193.jpg',
        name: '커피베이',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 12,000원',
        location: '6km',
        collection: '카페'
    },
    {
        key: 15,
        uri: 'https://img.hankyung.com/photo/201908/15671310291567131029_pabw_origin.jpg',
        name: 'BHC',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 13,000원',
        location: '3km',
        collection: '치킨'
    },
    {
        key: 16,
        uri: 'https://t1.daumcdn.net/liveboard/ziptoss/f83acdd638e041d5bca4bcbf48adef23.JPG',
        name: '네네치킨',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 15,000원',
        location: '2km',
        collection: '치킨'
    }

]

export default data